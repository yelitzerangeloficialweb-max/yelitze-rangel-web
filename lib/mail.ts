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
