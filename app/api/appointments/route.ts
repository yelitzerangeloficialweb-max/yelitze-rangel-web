import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendAppointmentConfirmationEmail } from '@/lib/mail';

import { ensureAvailabilityTables } from '@/lib/db-init';

export async function POST(request: NextRequest) {
    try {
        await ensureAvailabilityTables();
        const { date, slot, customerName, customerEmail, customerPhone, paymentMethod, notes } = await request.json();

        if (!date || !slot || !customerName || !customerEmail) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
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
                customerName,
                customerEmail,
                customerPhone,
                paymentMethod,
                notes,
                status: 'pending'
            }
        });

        // 4. Send confirmation email
        await sendAppointmentConfirmationEmail({
            email: customerEmail,
            name: customerName,
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
