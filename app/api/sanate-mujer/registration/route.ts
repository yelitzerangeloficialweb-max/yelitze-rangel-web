import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendSanateMujerRegistrationEmail } from '@/lib/mail';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, whatsapp } = body;

        console.log(`Nueva inscripción recibida: ${name} (${email})`);

        if (!name || !email || !whatsapp) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        // 1. Guardar en la base de datos
        const registration = await db.sanateMujerRegistration.create({
            data: {
                name,
                email,
                whatsapp,
            },
        });

        // 2. Enviar correo de confirmación usando el servicio centralizado
        const emailResult = await sendSanateMujerRegistrationEmail(email, name);
        
        if (emailResult.success) {
            console.log(`Correo de confirmación enviado exitosamente a ${email}`);
        } else {
            console.error(`Fallo al enviar correo a ${email}:`, emailResult.error);
            // No fallamos la petición completa si solo falla el correo, 
            // pero lo dejamos registrado para auditoría.
        }

        return NextResponse.json({
            success: true,
            id: registration.id,
            message: 'Inscripción completada con éxito'
        });

    } catch (error: any) {
        console.error('CRITICAL: Registration API Failure');
        console.error('Error Details:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        });

        if (error.code === 'P2021') {
            return NextResponse.json({
                error: 'Base de datos desactualizada. Por favor, realiza el despliegue de nuevo.',
                details: error.message
            }, { status: 500 });
        }

        return NextResponse.json({
            error: 'Error interno al procesar la inscripción',
            details: error.message,
            code: error.code || 'UNKNOWN'
        }, { status: 500 });
    }
}
