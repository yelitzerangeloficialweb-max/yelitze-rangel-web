import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
    try {
        const { email, result, pdfBase64, name = 'Explorador/a' } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        if (!resend) {
            console.error('RESEND_API_KEY is not set');
            return NextResponse.json({ success: true, message: 'Simulation mode: Email not sent' });
        }

        const { data, error } = await resend.emails.send({
            from: 'Yelitze Rangel <inscripciones@yelitzerangel.com>',
            to: email,
            subject: 'Tu Diagnóstico Somático: El cuerpo no miente 🌿',
            attachments: [
                {
                    filename: 'Diagnostico_Somatico_Yelitze_Rangel.pdf',
                    content: pdfBase64.split(',')[1], // Remove "data:application/pdf;base64," prefix
                },
            ],
            html: `
                <div style="font-family: 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #F5EFE6; color: #2D2926; border-radius: 20px;">
                    <div style="text-align: center; margin-bottom: 40px;">
                        <h1 style="color: #8C4005; font-style: italic; font-size: 2.5rem; margin-bottom: 10px;">Test Somático</h1>
                        <p style="text-transform: uppercase; letter-spacing: 0.3em; font-size: 0.8rem; color: #8C4005; font-weight: bold;">Tu cuerpo no miente, solo el orden libera.</p>
                    </div>

                    <p style="font-size: 1.2rem; line-height: 1.6;">Hola <strong>${name}</strong>,</p>
                    
                    <p style="line-height: 1.6;">Gracias por confiar en tu biología y por tomarte el tiempo para este espacio de escucha profunda. Aquí tienes los resultados de tu diagnóstico somático:</p>
                    
                    <div style="background-color: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 30px;">
                        <h2 style="color: #B8835A; margin-top: 0;">Tu Análisis Personalizado</h2>
                        <p style="font-size: 1.1rem; line-height: 1.6; font-style: italic;">
                            "${result.personalized_analysis}"
                        </p>
                        <div style="border-top: 1px solid #B8835A33; padding-top: 20px; margin-top: 20px;">
                            <p style="color: #8C4005; font-weight: bold;">Insight Somático:</p>
                            <p>${result.somatic_insight}</p>
                        </div>
                    </div>

                    <div style="background-color: #8C4005; color: white; padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
                        <h3 style="margin-top: 0;">Primer Paso de Regulación</h3>
                        <p style="font-size: 1.2rem;">${result.action_step}</p>
                    </div>

                    <p style="line-height: 1.6;">
                        Adjunto a este correo encontrarás tu diagnóstico completo en formato PDF para que puedas consultarlo cuando lo necesites.
                    </p>

                    <p style="line-height: 1.6;">
                        Este es solo el inicio de tu camino hacia la soberanía. Si sientes que es el momento de profundizar, te espero en mi tour nacional <strong>"Venezuela en el Cuerpo"</strong>.
                    </p>

                    <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #2D292622;">
                        <p style="font-size: 0.9rem; color: #8C4005;"><strong>Yelitze Rangel</strong></p>
                        <p style="font-size: 0.8rem; color: #2D292688;">Mentora de Vida | Somatización | Fascia Corporal</p>
                        <p style="font-size: 0.7rem; color: #2D292688; margin-top: 20px;">&copy; 2026 Yelitze Rangel. Todos los derechos reservados.</p>
                    </div>
                </div>
            `,
        });

        if (error) {
            console.error('Resend Error:', error);
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error('Email Route Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
