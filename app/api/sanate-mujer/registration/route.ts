import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

        // 2. Enviar correo de confirmación (si hay API Key)
        if (resend) {
            try {
                await resend.emails.send({
                    from: 'Yelitze Rangel <inscripciones@yelitzerangel.com>',
                    to: email,
                    subject: '¡Bienvenida a la Activación Sánate Mujer! 🌸',
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                            <h2 style="color: #B8835A; text-align: center;">¡Bienvenida, ${name}!</h2>
                            <p>Tu lugar en la <strong>Activación Sánate Mujer</strong> ha sido reservado con éxito.</p>
                            <p>Estamos muy felices de acompañarte en este viaje de reconexión y soberanía.</p>
                            <div style="background-color: #F5EFE6; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                                <p style="margin: 0; font-weight: bold; color: #2D2926;">FECHA DEL WORKSHOP:</p>
                                <p style="margin: 5px 0; font-size: 1.5rem; color: #B8835A;">22 de Mayo, 2026</p>
                            </div>
                            <p>Próximamente recibirás más detalles sobre los rituales y la preparación necesaria.</p>
                            <p>Si tienes alguna duda, puedes contactarnos por WhatsApp respondiendo a este correo.</p>
                            <br />
                            <p style="font-style: italic;">"El puente entre la ciencia y el espíritu para reclamar tu soberanía."</p>
                            <p><strong>Yelitze Rangel</strong></p>
                            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                            <p style="font-size: 12px; color: #999; text-align: center;">&copy; 2026 Yelitze Rangel. Todos los derechos reservados.</p>
                        </div>
                    `,
                });
                console.log(`Correo enviado a ${email}`);
            } catch (emailError) {
                console.error("Error al enviar el correo:", emailError);
                // No fallamos la petición si solo falla el correo
            }
        } else {
            console.log("RESEND_API_KEY no detectada. Correo omitido (Modo simulación).");
        }

        return NextResponse.json({
            success: true,
            id: registration.id,
            message: 'Inscripción completada con éxito'
        });

    } catch (error: any) {
        console.error('Registration API Error:', error);
        return NextResponse.json({
            error: 'Error interno al procesar la inscripción',
            details: error.message
        }, { status: 500 });
    }
}
