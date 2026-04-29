import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendSanateMujerRegistrationEmail } from '@/lib/mail';

export async function POST(req: Request) {
    try {
        // Bloquear inscripciones después del 22 de mayo de 2026
        const deadline = new Date('2026-05-23T00:00:00');
        if (new Date() > deadline) {
            return NextResponse.json({ 
                error: 'Las inscripciones para este encuentro han finalizado.' 
            }, { status: 400 });
        }

        const body = await req.json();
        const { name, email, whatsapp, city } = body;

        console.log(`Nueva inscripción recibida: ${name} (${email}) - ${city}`);

        if (!name || !email || !whatsapp || !city) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        // 1. Validar que el registro sea único (por email)
        const existingRegistration = await db.sanateMujerRegistration.findFirst({
            where: { email: email.toLowerCase().trim() }
        });

        if (existingRegistration) {
            return NextResponse.json({ 
                error: 'Ya existe una suscripción activa con este correo electrónico.' 
            }, { status: 400 });
        }

        // 2. Guardar en la base de datos
        const registration = await db.sanateMujerRegistration.create({
            data: {
                name,
                email,
                whatsapp,
                city,
            },
        });

        // 3. Enviar correo de confirmación usando el servicio centralizado
        const emailResult = await sendSanateMujerRegistrationEmail(email, name, city);
        
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
                error: 'Base de datos desactualizada (Tabla no encontrada). Por favor, ejecuta npx prisma db push.',
                details: error.message
            }, { status: 500 });
        }

        if (error.code === 'P2022') {
            return NextResponse.json({
                error: 'Base de datos desactualizada (Columna no encontrada). Por favor, ejecuta npx prisma db push.',
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
