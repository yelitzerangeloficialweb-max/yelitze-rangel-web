import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendCaracasSomaticEmail } from '@/lib/mail';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { registrationId, result, name } = body;

        if (!registrationId || !result) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Find the user's email by their registration ID
        const registration = await db.venezuelaEnElCuerpoRegistration.findUnique({
            where: { id: registrationId }
        });

        if (!registration) {
            return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
        }

        const email = registration.email;
        const userName = name || registration.name;

        // Send the result email
        const mailResult = await sendCaracasSomaticEmail({
            email,
            name: userName,
            profile: result
        });

        if (!mailResult.success) {
            console.error('RESEND ERROR:', mailResult.error);
            return NextResponse.json({ 
                error: 'Error al enviar el correo con los resultados',
                details: mailResult.error 
            }, { status: 500 });
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error('Send result email error details:', error);
        return NextResponse.json({ error: 'Failed to send result email' }, { status: 500 });
    }
}
