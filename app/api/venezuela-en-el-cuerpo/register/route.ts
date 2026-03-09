import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendVenezuelaRegistrationEmail } from '@/lib/mail';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, whatsapp, city, instagram } = body;

        if (!name || !email || !whatsapp || !city) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Check if email already exists
        const existingEmail = await db.venezuelaEnElCuerpoRegistration.findFirst({
            where: { email: email.trim().toLowerCase() }
        });

        if (existingEmail) {
            return NextResponse.json({
                error: 'duplicate',
                message: 'Ya existe un registro con este correo electrónico.'
            }, { status: 400 });
        }

        // 2. Check if WhatsApp already exists
        const existingPhone = await db.venezuelaEnElCuerpoRegistration.findFirst({
            where: { whatsapp: whatsapp.trim() }
        });

        if (existingPhone) {
            return NextResponse.json({
                error: 'duplicate',
                message: 'Ya existe un registro con este número de WhatsApp.'
            }, { status: 400 });
        }

        const registration = await db.venezuelaEnElCuerpoRegistration.create({
            data: {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                whatsapp: whatsapp.trim(),
                city: city.trim(),
                instagram: instagram?.trim(),
            },
        });

        // 3. Send confirmation email (Non-blocking)
        try {
            await sendVenezuelaRegistrationEmail({
                email: registration.email,
                name: registration.name,
                city: registration.city,
                registrationId: registration.id
            });
        } catch (mailError) {
            console.error('Email sending failed but registration was successful:', mailError);
        }

        return NextResponse.json(registration, { status: 201 });
    } catch (error: any) {
        console.error('Registration error details:', {
            message: error.message,
            code: error.code,
            meta: error.meta,
            stack: error.stack
        });

        // Check for specific Prisma errors (e.g., P2021: Table does not exist)
        if (error.code === 'P2021') {
            return NextResponse.json({
                error: 'Database table missing. Please run migrations on the server.',
                details: error.message
            }, { status: 500 });
        }

        return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 });
    }
}
