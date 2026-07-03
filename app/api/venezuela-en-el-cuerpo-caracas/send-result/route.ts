import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendCaracasSomaticEmail } from '@/lib/mail';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { registrationId, email: requestEmail, result, name } = body;

        if ((!registrationId && !requestEmail) || !result) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        // Find the user's email by their registration ID or direct email
        let registration;
        
        if (registrationId) {
            registration = await db.venezuelaEnElCuerpoRegistration.findUnique({
                where: { id: registrationId }
            });
        } else if (requestEmail) {
            // Find the most recent registration for this email
            registration = await db.venezuelaEnElCuerpoRegistration.findFirst({
                where: { email: requestEmail },
                orderBy: { createdAt: 'desc' }
            });
        }

        if (!registration) {
            return NextResponse.json({ error: 'Registro no encontrado. Verifica que usaste el correo con el que te registraste.' }, { status: 404 });
        }

        // Update the registration to mark the test as completed
        await db.venezuelaEnElCuerpoRegistration.update({
            where: { id: registration.id },
            data: {
                testCompleted: true,
                testResult: result
            }
        });

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
