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
                        <p style="margin: 0; text-transform: uppercase;">YELITZE RANGEL • Arquitectura Intencional de Vida</p>
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
                        <p style="margin-top: 5px; opacity: 0.6;">Mentora de Vida y Diseño Intencional</p>
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
