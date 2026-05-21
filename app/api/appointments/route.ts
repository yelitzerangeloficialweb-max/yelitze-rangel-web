import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendAppointmentConfirmationEmail } from '@/lib/mail';
import { ensureAvailabilityTables } from '@/lib/db-init';
import { verifyTurnstileToken } from '@/lib/turnstile';

export async function POST(request: NextRequest) {
    try {
        await ensureAvailabilityTables();
        const body = await request.json();
        const { date, slot, customerName, customerEmail, customerPhone, meetingType, paymentMethod, notes, turnstileToken } = body;

        // Basic presence validation
        if (!date || !slot || !customerName || !customerEmail || !customerPhone || !paymentMethod) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        // Verify Turnstile Token
        const isTokenValid = await verifyTurnstileToken(turnstileToken);
        if (!isTokenValid) {
            return NextResponse.json({ error: 'Verificación de seguridad fallida' }, { status: 400 });
        }

        // Sanitize and validate inputs
        const cleanName = customerName.replace(/<[^>]*>/g, '').trim().substring(0, 100);
        const cleanEmail = customerEmail.replace(/<[^>]*>/g, '').trim().toLowerCase().substring(0, 100);
        const cleanPhone = customerPhone.replace(/<[^>]*>/g, '').trim().substring(0, 30);
        const cleanNotes = notes ? notes.replace(/<[^>]*>/g, '').trim().substring(0, 500) : '';

        // Validate formats
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            return NextResponse.json({ error: 'Email con formato inválido' }, { status: 400 });
        }

        const validSlots = ['morning', 'afternoon'];
        if (!validSlots.includes(slot)) {
            return NextResponse.json({ error: 'Horario inválido' }, { status: 400 });
        }

        const validMeetingTypes = ['online', 'presencial'];
        if (meetingType && !validMeetingTypes.includes(meetingType)) {
            return NextResponse.json({ error: 'Tipo de reunión inválido' }, { status: 400 });
        }

        // Normalize to TRUE Midnight UTC using the face-value approach
        const rawDate = new Date(date);
        const dateObj = new Date(Date.UTC(rawDate.getUTCFullYear(), rawDate.getUTCMonth(), rawDate.getUTCDate()));

        // 1. Check if the slot is already booked
        const existingAppointment = await db.appointment.findFirst({
            where: {
                date: dateObj,
                slot: slot,
                status: { not: 'cancelled' }
            }
        });

        if (existingAppointment) {
            return NextResponse.json({ error: 'Este horario ya ha sido reservado' }, { status: 400 });
        }

        // 2. Check if the slot is offered by the office
        const availability = await db.availability.findUnique({
            where: { date: dateObj }
        });

        const isOffered = slot === 'morning' ? availability?.morningEnabled : availability?.afternoonEnabled;

        if (!isOffered) {
            return NextResponse.json({ error: 'Este horario no está disponible' }, { status: 400 });
        }

        // 3. Create the appointment
        const appointment = await db.appointment.create({
            data: {
                date: dateObj,
                slot,
                customerName: cleanName,
                customerEmail: cleanEmail,
                customerPhone: cleanPhone,
                meetingType: meetingType || 'online',
                paymentMethod,
                notes: cleanNotes,
                status: 'pending'
            }
        });

        // 4. Send confirmation email
        await sendAppointmentConfirmationEmail({
            email: cleanEmail,
            name: cleanName,
            date: dateObj,
            slot,
            paymentMethod
        });

        return NextResponse.json(appointment, { status: 201 });
    } catch (error) {
        console.error('Error creating appointment:', error);
        return NextResponse.json({ error: 'Error al procesar la reserva' }, { status: 500 });
    }
}

// GET all appointments (Admin)
export async function GET() {
    // Note: In a real app, you'd check admin auth here too. 
    // But since the task is about functionality, I'll keep it simple or follow the pattern.
    // However, this route is for public-facing POST, but GET should be protected.
    // I'll create a separate admin route for GETting appointments if needed.
    return NextResponse.json({ error: 'Metodo no permitido' }, { status: 405 });
}
