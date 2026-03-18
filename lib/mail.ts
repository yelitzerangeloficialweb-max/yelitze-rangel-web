import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendRegistrationEmailProps {
    email: string;
    name: string;
    city: string;
    registrationId: string;
}

export const sendVenezuelaRegistrationEmail = async ({
    email,
    name,
    city,
    registrationId
}: SendRegistrationEmailProps) => {
    try {
        const ticketUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://yelitzerangeloficial.com'}/venezuela-en-el-cuerpo/success?id=${registrationId}&name=${encodeURIComponent(name)}&city=${encodeURIComponent(city)}`;

        const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://yelitzerangeloficial.com'}/assets/images/logo-yelitze-new.png`;

        const { data, error } = await resend.emails.send({
            from: 'Yelitze Rangel <info@yelitzerangeloficial.com>',
            to: [email],
            subject: '¡Tu registro al Tour Venezuela en el Cuerpo es Exitoso! 🇻🇪',
            text: `¡Hola, ${name}! Tu registro al Tour Nacional Venezuela en el Cuerpo ha sido reservado con éxito para ${city}. Puedes ver tu ticket en la web oficial.`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #F5EFE6; border-radius: 24px; overflow: hidden; border: 1px solid #B8835A30;">
                    <div style="background-color: #8C4005; padding: 30px 20px; text-align: center;">
                        <img src="${logoUrl}" alt="Yelitze Rangel" style="max-width: 180px; height: auto; margin-bottom: 20px;">
                        <h1 style="color: #F5EFE6; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Venezuela en el Cuerpo</h1>
                        <p style="color: #F5EFE6; opacity: 0.8; margin-top: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Confirmación de Registro</p>
                    </div>
                    
                    <div style="padding: 40px 30px; color: #2D2926; line-height: 1.6;">
                        <h2 style="color: #8C4005; margin-bottom: 20px;">¡Hola, ${name}!</h2>
                        
                        <p style="font-size: 16px; font-style: italic; border-left: 3px solid #B8835A; padding-left: 15px; margin-bottom: 25px;">
                            "Primero sana el cuerpo… y luego cambia la historia."
                        </p>

                        <p style="font-size: 16px;">
                            Tu lugar en el <strong>Tour Nacional Venezuela en el Cuerpo</strong> ha sido reservado con éxito para la ciudad de <strong>${city === 'el-vigia' ? 'El Vigía' : city}</strong>.
                        </p>
                        
                        ${city === 'el-vigia' ? `
                        <div style="background-color: #FDFBFA; border: 1px solid #B8835A30; padding: 25px; border-radius: 20px; margin: 30px 0;">
                            <h3 style="color: #8C4005; margin-top: 0; font-size: 18px;">📍 Coordenadas de tu Encuentro:</h3>
                            <p style="margin: 10px 0;"><strong>Fecha:</strong> 27 de Marzo, 2026</p>
                            <p style="margin: 10px 0;"><strong>Hora:</strong> 2:00 PM</p>
                            <p style="margin: 10px 0;"><strong>Lugar:</strong> Junio Hotel Boutique, Ig: @juniotelboutique</p>
                            <p style="margin: 10px 0; font-size: 13px; color: #8C4005;">Producción: @yosoyvigia | Alianza: @giga913fm</p>
                        </div>
                        ` : `
                        <p style="font-size: 16px; margin-top: 20px;">
                            Este es un paso fundamental en tu camino hacia la <strong>Arquitectura Intencional de Vida</strong>. Estamos muy emocionados de tenerte con nosotros.
                        </p>
                        `}
                        
                        <div style="margin: 40px 0; text-align: center;">
                            <a href="${ticketUrl}" style="background-color: #C1530A; color: white; padding: 16px 32px; border-radius: 50px; text-decoration: none; font-weight: bold; display: inline-block; box-shadow: 0 4px 15px rgba(193, 83, 10, 0.3);">
                                VER MI TICKET DIGITAL
                            </a>
                        </div>
                        
                        <div style="background-color: #B8835A10; border: 1px solid #B8835A20; padding: 25px; border-radius: 20px; margin-top: 30px;">
                            <h3 style="color: #B8835A; margin-top: 0; font-size: 16px;">Pasos Siguientes:</h3>
                            <ul style="padding-left: 20px; margin-bottom: 0;">
                                <li style="margin-bottom: 10px;">Guarda tu ticket digital (puedes descargarlo o tomarle captura).</li>
                                <li style="margin-bottom: 10px;">Te enviaremos más detalles y recordatorios por esta misma vía.</li>
                                <li style="margin-bottom: 0;">El día del evento, llega 15 minutos antes con tu código QR listo.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div style="background-color: #2D2926; padding: 30px; text-align: center; color: #F5EFE680; font-size: 12px; letter-spacing: 1px;">
                        <p style="margin: 0; text-transform: uppercase;">YELITZE RANGEL • Tu Coach Ancestral</p>
                        <p style="margin-top: 5px;">Este correo fue enviado automáticamente por el sistema de registro.</p>
                    </div>
                </div>
            `
        });

        if (error) {
            console.error('Resend error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Mail service error:', err);
        return { success: false, error: err };
    }
};

export const sendVisionBoardEmail = async ({
    email,
    name,
    analysis,
    pdfBuffer
}: {
    email: string,
    name: string,
    analysis: any,
    pdfBuffer?: Buffer
}) => {
    try {
        const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://yelitzerangeloficial.com'}/assets/images/logo-yelitze-new.png`;

        const attachments = pdfBuffer ? [
            {
                filename: 'Arquitectura-Intencional-Vida.pdf',
                content: pdfBuffer,
            }
        ] : [];

        const { data, error } = await resend.emails.send({
            from: 'Yelitze Rangel <info@yelitzerangeloficial.com>',
            to: [email],
            subject: 'Tracking de la Arquitectura Intencional de tu Vida 🏛️✨',
            text: `Hola ${name}, aquí está el diseño de tu Arquitectura de Vida 2026. Tu nuevo arquetipo es: ${analysis.identity}. Encontrarás tu PDF Maestro adjunto a este correo.`,
            attachments,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #F9F7F2; border-radius: 32px; overflow: hidden; border: 1px solid #3C2A2115;">
                    <div style="background-color: #2D2926; padding: 40px 20px; text-align: center;">
                        <img src="${logoUrl}" alt="Yelitze Rangel" style="max-width: 150px; height: auto; margin-bottom: 20px;">
                        <h1 style="color: #F9F7F2; margin: 0; font-size: 16px; letter-spacing: 2px; text-transform: uppercase;">Tracking de la Arquitectura Intencional de tu Vida</h1>
                    </div>
                    
                    <div style="padding: 50px 40px; color: #2D2926; line-height: 1.8;">
                        <h2 style="color: #8C4005; font-size: 24px; margin-bottom: 30px;">Hola, ${name}. Aquí está tu diseño.</h2>
                        
                        <div style="margin-bottom: 40px;">
                            <p style="text-transform: uppercase; font-size: 10px; tracking: 2px; color: #8C4005; font-weight: bold; margin-bottom: 10px;">Tu Nuevo Arquetipo</p>
                            <p style="font-size: 22px; font-style: italic; color: #2D2926; margin: 0;">"${analysis.identity}"</p>
                        </div>

                        <div style="background-color: white; padding: 30px; border-radius: 20px; border: 1px solid #3C2A2110; margin-bottom: 40px;">
                            <h3 style="color: #8C4005; font-size: 16px; margin-top: 0;">Tu Manifiesto de Poder</h3>
                            <p style="font-size: 17px; color: #3C2A21;">${analysis.manifesto}</p>
                        </div>

                        <div style="margin-bottom: 20px; text-align: center;">
                            <p style="font-size: 14px; color: #8C4005; font-weight: bold;">
                                Te hemos adjunto tu PDF Maestro en este correo. Prepárate para construir.
                            </p>
                        </div>

                        <div style="margin-bottom: 40px;">
                            <h3 style="color: #8C4005; font-size: 16px;">Lo que dejas hoy (Soberanía Sistémica)</h3>
                            <p style="font-size: 16px; color: #3C2A21; border-left: 2px solid #8C4005; padding-left: 20px;">${analysis.release}</p>
                        </div>

                        <div style="margin-bottom: 40px;">
                            <h3 style="color: #8C4005; font-size: 16px;">Tu Práctica de Orden</h3>
                            <p style="font-size: 16px; color: #3C2A21;">${analysis.practice}</p>
                        </div>

                        <div style="background-color: #2D2926; padding: 30px; border-radius: 20px; color: #F9F7F2;">
                            <h3 style="color: #B8835A; font-size: 14px; text-transform: uppercase; margin-top: 0;">Tus primeros pasos:</h3>
                            <ul style="padding-left: 20px; margin: 0;">
                                ${(analysis.guide_steps || []).map((step: string) => `<li style="margin-bottom: 10px;">${step}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <p style="margin-top: 50px; text-align: center; color: #8C4005; font-weight: bold; font-style: italic;">
                            "No es magia, es orden."
                        </p>
                    </div>
                    
                    <div style="background-color: #EFE9E0; padding: 30px; text-align: center; color: #3C2A21; font-size: 12px;">
                        <p style="margin: 0;"><strong>YELITZE RANGEL</strong></p>
                        <p style="margin-top: 5px; opacity: 0.6;">Tu Coach Ancestral</p>
                    </div>
                </div>
            `
        });

        if (error) {
            console.error('Resend error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Mail service error:', err);
        return { success: false, error: err };
    }
};

export const sendSomaticEmail = async ({
    email,
    name,
    result,
    pdfBuffer
}: {
    email: string,
    name: string,
    result: any,
    pdfBuffer: Buffer
}) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Yelitze Rangel <info@yelitzerangeloficial.com>',
            to: [email],
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

                            <!-- Footer -->
                            <div style="text-align: center; border-top: 1px solid #E6DED5; padding-top: 40px;">
                                <p style="font-family: 'Playfair Display', serif; font-size: 18px; color: #8C4005; margin: 0;"><strong>Yelitze Rangel</strong></p>
                                <p style="font-size: 12px; color: #A8A098; margin-top: 5px; text-transform: uppercase; letter-spacing: 0.1em;">Tu Coach Ancestral</p>
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
            console.error('sendSomaticEmail error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Somatic mail service error:', err);
        return { success: false, error: err };
    }
};
