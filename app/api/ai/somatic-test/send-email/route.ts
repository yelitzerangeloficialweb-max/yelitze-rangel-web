import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateSomaticPDF } from '@/lib/pdf-generator';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
    try {
        const { email, result, reflection, stressResult, name = 'Explorador/a' } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        if (!resend) {
            console.error('RESEND_API_KEY is not set in the environment');
            return NextResponse.json({ error: 'Resend API Key Missing', simulation: true }, { status: 500 });
        }

        // Generate PDF on server side
        console.log(`Generating server-side PDF for ${name}...`);
        const pdfBuffer = await generateSomaticPDF(name, result, stressResult, reflection);

        console.log(`Sending email to: ${email} from info@yelitzerangeloficial.com`);

        const { data, error } = await resend.emails.send({
            from: 'Yelitze Rangel <info@yelitzerangeloficial.com>',
            to: email,
            subject: 'Tu Diagnóstico Somático: El cuerpo no miente 🌿',
            attachments: [
                {
                    filename: 'Diagnostico_Somatico_Yelitze_Rangel.pdf',
                    content: pdfBuffer,
                },
            ],
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:italic,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap');
                    </style>
                </head>
                <body style="margin: 0; padding: 0; background-color: #FDFBFA; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased;">
                    <div style="max-width: 600px; margin: 40px auto; background-color: #F5EFE6; border-radius: 40px; overflow: hidden; box-shadow: 0 20px 50px rgba(140,64,5,0.1);">
                        
                        <!-- Header Decor -->
                        <div style="height: 8px; background: linear-gradient(90deg, #8C4005, #B8835A, #8C4005);"></div>
                        
                        <div style="padding: 50px 40px;">
                            <!-- Header -->
                            <div style="text-align: center; margin-bottom: 40px;">
                                <h1 style="font-family: 'Playfair Display', serif; color: #8C4005; font-style: italic; font-size: 32px; margin: 0; font-weight: 400;">Test Somático</h1>
                                <div style="height: 1px; width: 60px; background-color: #B8835A; margin: 15px auto; opacity: 0.3;"></div>
                                <p style="text-transform: uppercase; letter-spacing: 0.3em; font-size: 10px; color: #8C4005; font-weight: 700; margin: 0;">Tu cuerpo no miente</p>
                            </div>

                            <!-- Greeting -->
                            <div style="margin-bottom: 35px;">
                                <p style="font-family: 'Playfair Display', serif; font-size: 24px; color: #2D2926; margin-bottom: 15px;">Hola, <span style="font-style: italic; color: #8C4005;">${name}</span></p>
                                <p style="font-size: 16px; line-height: 1.7; color: #4A4540; font-weight: 300;">
                                    Gracias por permitirte este espacio de escucha profunda. El cuerpo es el mapa donde el alma escribe su historia, y hoy has dado un paso vital para recuperar tu soberanía biológica.
                                </p>
                            </div>

                            <!-- Analysis Card -->
                            <div style="background-color: #ffffff; padding: 40px; border-radius: 30px; border: 1px solid #E6DED5; margin-bottom: 30px;">
                                <h2 style="font-family: 'Playfair Display', serif; color: #B8835A; font-size: 22px; margin-top: 0; margin-bottom: 20px; font-weight: 400;">Tu Análisis Personalizado</h2>
                                <p style="font-size: 17px; line-height: 1.8; font-style: italic; color: #2D2926; margin-bottom: 25px; border-left: 3px solid #F5EFE6; padding-left: 20px;">
                                    "${result.personalized_analysis}"
                                </p>
                                <div style="background-color: #FDFBFA; padding: 20px; border-radius: 15px; border: 1px solid #F5EFE6;">
                                    <p style="color: #8C4005; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0; margin-bottom: 8px;">Insight Somático:</p>
                                    <p style="font-size: 15px; color: #4A4540; margin: 0; line-height: 1.5;">${result.somatic_insight}</p>
                                </div>
                            </div>

                            <!-- Regulation Step -->
                            <div style="background-color: #2D2926; color: #F5EFE6; padding: 40px; border-radius: 30px; text-align: center; margin-bottom: 40px; position: relative; overflow: hidden;">
                                <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background-color: #8C4005; opacity: 0.1; border-radius: 50%; translate: 50% -50%;"></div>
                                <p style="color: #B8835A; font-weight: 700; font-size: 10px; text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 15px;">Primer Paso de Regulación</p>
                                <h3 style="font-family: 'Playfair Display', serif; font-size: 20px; margin: 0; font-weight: 400; line-height: 1.4;">${result.action_step}</h3>
                            </div>

                            <!-- CTA & Info -->
                            <div style="text-align: center; padding: 0 20px; margin-bottom: 50px;">
                                <p style="font-size: 15px; line-height: 1.6; color: #4A4540; margin-bottom: 30px; font-weight: 300;">
                                    Adjunto encontrarás tu **Diagnóstico Completo en PDF**. Te invito a guardarlo en un lugar seguro y volver a él cuando sientas que tu cuerpo necesita ser escuchado.
                                </p>
                                <div style="padding: 25px; border: 1px dashed #B8835A; border-radius: 20px;">
                                    <p style="font-size: 14px; color: #2D2926; margin: 0;">
                                        ¿Sientes que es el momento de profundizar? Te espero en el tour nacional <br>
                                        <strong style="color: #8C4005; font-size: 16px;">"Venezuela en el Cuerpo"</strong>
                                    </p>
                                </div>
                            </div>

                            <!-- Footer -->
                            <div style="text-align: center; border-top: 1px solid #E6DED5; padding-top: 40px;">
                                <p style="font-family: 'Playfair Display', serif; font-size: 18px; color: #8C4005; margin: 0;"><strong>Yelitze Rangel</strong></p>
                                <p style="font-size: 12px; color: #A8A098; margin-top: 5px; text-transform: uppercase; letter-spacing: 0.1em;">Mentora de Vida | Fascia Corporal</p>
                                <div style="margin-top: 30px;">
                                    <a href="https://yelitzerangel.com" style="text-decoration: none; color: #B8835A; font-size: 13px; font-weight: 600;">yelitzerangel.com</a>
                                </div>
                                <p style="font-size: 10px; color: #C4BEB8; margin-top: 40px;">&copy; 2026 Yelitze Rangel. Todos los derechos reservados.</p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        if (error) {
            console.error('RESEND CRITICAL ERROR:', JSON.stringify(error, null, 2));
            return NextResponse.json({ error: error.message || 'Resend error', details: error }, { status: 500 });
        }

        console.log('RESEND SUCCESS:', JSON.stringify(data, null, 2));
        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error('Email Route Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
