import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { registrationId, email: requestEmail } = body;

        if (!registrationId && !requestEmail) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        // Find the user's registration by ID or email
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

        // Update the registration to mark the ebook as downloaded
        await db.venezuelaEnElCuerpoRegistration.update({
            where: { id: registration.id },
            data: {
                ebookDownloaded: true
            }
        });

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error('Ebook download tracking error details:', error);
        return NextResponse.json({ error: 'Failed to track ebook download' }, { status: 500 });
    }
}
