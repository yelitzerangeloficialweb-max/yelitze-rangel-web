import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Diagnostic log to verify API Key availability in production
if (!process.env.RESEND_API_KEY) {
    console.warn('[MAIL SERVICE] WARNING: RESEND_API_KEY is not defined in environment variables.');
} else {
    const key = process.env.RESEND_API_KEY;
    console.log(`[MAIL SERVICE] Resend API Key is configured. Length: ${key.length}, Starts with: ${key.substring(0, 7)}...`);
}

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
}: {
    email: string;
    name: string;
    city: string;
    registrationId: string;
}) => {
    try {
        const isCaracas = city.toLowerCase() === 'caracas';
        const ticketUrl = isCaracas 
            ? `https://wa.me/17867268717?text=Hola%20Yelitze%2C%20vengo%20de%20la%20p%C3%A1gina%20de%20Venezuela%20en%20el%20Cuerpo%20%28soy%20${encodeURIComponent(name)}%29%20y%20quiero%20tener%20acceso%20a%20las%20herramientas.`
            : `${process.env.NEXT_PUBLIC_APP_URL || 'https://yelitzerangeloficial.com'}/venezuela-en-el-cuerpo/success?id=${registrationId}&name=${encodeURIComponent(name)}&city=${encodeURIComponent(city)}`;
        
        const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://yelitzerangeloficial.com'}/assets/images/logo-yelitze-new.png`;

        const { data, error } = await resend.emails.send({
            from: 'Yelitze Rangel <info@yelitzerangeloficial.com>',
            to: [email],
            subject: isCaracas ? '¡Tu acceso a Venezuela en el Cuerpo está listo! 🌿' : '¡Tu registro al Tour Venezuela en el Cuerpo es Exitoso! 🇻🇪',
            text: isCaracas 
                ? `¡Hola, ${name}! Aquí tienes tu acceso a la guía somática y herramientas de regulación.`
                : `¡Hola, ${name}! Tu registro al Tour Nacional Venezuela en el Cuerpo ha sido reservado con éxito para ${city}. Puedes ver tu ticket en la web oficial.`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #F5EFE6; border-radius: 24px; overflow: hidden; border: 1px solid #B8835A30;">
                    <div style="background-color: #8C4005; padding: 30px 20px; text-align: center;">
                        <img src="${logoUrl}" alt="Yelitze Rangel" style="max-width: 180px; height: auto; margin-bottom: 20px;">
                        <h1 style="color: #F5EFE6; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Venezuela en el Cuerpo</h1>
                        <p style="color: #F5EFE6; opacity: 0.8; margin-top: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Confirmación de Acceso</p>
                    </div>
                    
                    <div style="padding: 40px 30px; color: #2D2926; line-height: 1.6;">
                        <h2 style="color: #8C4005; margin-bottom: 20px;">¡Hola, ${name}!</h2>
                        
                        <p style="font-size: 16px; font-style: italic; border-left: 3px solid #B8835A; padding-left: 15px; margin-bottom: 25px;">
                            "Primero sana el cuerpo… y luego cambia la historia."
                        </p>

                        ${isCaracas ? `
                        <p style="font-size: 16px;">
                            Tu acceso a las herramientas de regulación somática y al Ebook <strong>Venezuela en el Cuerpo</strong> ya está disponible.
                        </p>
                        <p style="font-size: 16px; margin-top: 20px;">
                            Recuerda: No tienes que hacerlo todo ahora. Solo empieza por un paso.
                        </p>
                        ` : `
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
                        `}
                        
                        <div style="margin: 40px 0; text-align: center;">
                            <a href="${ticketUrl}" style="background-color: #1C1C1C; color: #F5EFE6; padding: 18px 36px; border-radius: 50px; text-decoration: none; font-weight: bold; display: inline-block; box-shadow: 0 4px 15px rgba(28, 28, 28, 0.3);">
                                ${isCaracas ? 'ACCEDER A MIS HERRAMIENTAS' : 'VER MI TICKET DIGITAL'}
                            </a>
                        </div>
                        
                        ${!isCaracas ? `
                        <div style="background-color: #B8835A10; border: 1px solid #B8835A20; padding: 25px; border-radius: 20px; margin-top: 30px;">
                            <h3 style="color: #B8835A; margin-top: 0; font-size: 16px;">Pasos Siguientes:</h3>
                            <ul style="padding-left: 20px; margin-bottom: 0;">
                                <li style="margin-bottom: 10px;">Guarda tu ticket digital (puedes descargarlo o tomarle captura).</li>
                                <li style="margin-bottom: 10px;">Te enviaremos más detalles y recordatorios por esta misma vía.</li>
                                <li style="margin-bottom: 0;">El día del evento, llega 15 minutos antes con tu código QR listo.</li>
                            </ul>
                        </div>
                        ` : ''}
                    </div>                 </div>
                    
                    <div style="background-color: #2D2926; padding: 30px; text-align: center; color: #F5EFE680; font-size: 12px; letter-spacing: 1px;">
                        <p style="margin: 0; text-transform: uppercase;">YELITZE RANGEL • Tu Coach Ancestral</p>
                        <p style="margin-top: 5px;">Este correo fue enviado automáticamente por el sistema de registro.</p>
                    </div>
                </div>
            `
        });

        if (error) {
            console.error('[VisionBoard Mail] Resend client error:', error);
            return { success: false, error };
        }

        console.log('[VisionBoard Mail] SUCCESS. ID:', data?.id);
        return { success: true, data };
    } catch (err) {
        console.error('Mail service error:', err);
        return { success: false, error: err };
    }
};

export const sendVenezuelaPostEventEmail = async ({
    email,
    name,
    scheduledAt
}: {
    email: string;
    name: string;
    scheduledAt?: string;
}) => {
    try {
        const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://yelitzerangeloficial.com'}/assets/images/logo-yelitze-new.png`;
        const toolsUrl = 'https://yelitzerangeloficial.com/venezuela-en-el-cuerpo/bonos';

        const { data, error } = await resend.emails.send({
            from: 'Yelitze Rangel <info@yelitzerangeloficial.com>',
            to: [email],
            subject: '¡Gracias por acompañarnos hoy! 🇻🇪✨',
            scheduledAt: scheduledAt,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #F5EFE6; border-radius: 24px; overflow: hidden; border: 1px solid #B8835A30;">
                    <div style="background-color: #8C4005; padding: 30px 20px; text-align: center;">
                        <img src="${logoUrl}" alt="Yelitze Rangel" style="max-width: 180px; height: auto; margin-bottom: 20px;">
                        <h1 style="color: #F5EFE6; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Venezuela en el Cuerpo</h1>
                    </div>
                    
                    <div style="padding: 40px 30px; color: #2D2926; line-height: 1.6;">
                        <h2 style="color: #8C4005; margin-bottom: 20px;">¡Hola, ${name}!</h2>
                        
                        <p style="font-size: 16px; margin-bottom: 25px;">
                            Gracias por asistir a nuestro encuentro de hoy. Ha sido una experiencia poderosa de regulación y conexión profunda.
                        </p>

                        <p style="font-size: 16px; margin-bottom: 25px;">
                            Tal como lo mencionamos, te compartimos <strong>2 herramientas potentes</strong> que te ayudarán a complementar lo que vivimos hoy y a seguir integrando este proceso en tu día a día:
                        </p>
                        
                        <div style="margin: 40px 0; text-align: center;">
                            <a href="${toolsUrl}" style="background-color: #C1530A; color: white; padding: 18px 36px; border-radius: 50px; text-decoration: none; font-weight: bold; display: inline-block; box-shadow: 0 4px 15px rgba(193, 83, 10, 0.3);">
                                ACCEDER A MIS HERRAMIENTAS
                            </a>
                        </div>
                        
                        <p style="font-size: 15px; text-align: center; color: #8C4005; font-style: italic;">
                            "Primero sana el cuerpo… y luego cambia la historia."
                        </p>
                    </div>
                    
                    <div style="background-color: #2D2926; padding: 30px; text-align: center; color: #F5EFE680; font-size: 12px; letter-spacing: 1px;">
                        <p style="margin: 0; text-transform: uppercase;">YELITZE RANGEL • Tu Coach Ancestral</p>
                    </div>
                </div>
            `
        });

        if (error) {
            console.error('[Post-Event Mail] Resend client error:', error);
            return { success: false, error };
        }

        console.log('[Post-Event Mail] SUCCESS. ID:', data?.id);
        return { success: true, data };
    } catch (err) {
        console.error('Post-event mail service error:', err);
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

        console.log(`[VisionBoard Mail] Sending to: ${email}, hasPDF: ${!!pdfBuffer}`);
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
            console.error('[VisionBoard Mail] Resend client error:', error);
            return { success: false, error };
        }

        console.log('[VisionBoard Mail] SUCCESS. ID:', data?.id);
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
        console.log(`[Somatic Mail] Sending to: ${email}, PDF size: ${pdfBuffer?.length || 0} bytes`);
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
                <body style="margin: 0; padding: 0; background-color: #FDFBFA; font-family: sans-serif; -webkit-font-smoothing: antialiased;">
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
            console.error('[Somatic Mail] Resend client error:', error);
            return { success: false, error };
        }

        console.log('[Somatic Mail] SUCCESS. ID:', data?.id);
        return { success: true, data };
    } catch (err) {
        console.error('Somatic mail service error:', err);
        return { success: false, error: err };
    }
};

export const sendGenericTestEmail = async ({
    email,
    name,
    testTitle,
    analysis,
    pdfBuffer
}: {
    email: string,
    name: string,
    testTitle: string,
    analysis: string,
    pdfBuffer?: Buffer
}) => {
    try {
        const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://yelitzerangeloficial.com'}/assets/images/logo-yelitze-new.png`;

        const cleanTitle = testTitle.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_');
        const attachments = pdfBuffer ? [
            {
                filename: `Resultado_${cleanTitle}.pdf`,
                content: pdfBuffer,
            }
        ] : [];

        const { data, error } = await resend.emails.send({
            from: 'Yelitze Rangel <info@yelitzerangeloficial.com>',
            to: [email],
            subject: `Tu Resultado: ${testTitle} 🌿`,
            text: `Hola ${name}, aquí tienes el resultado de tu test: ${testTitle}.`,
            attachments,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #FDFBFA; border-radius: 32px; overflow: hidden; border: 1px solid #B8835A20;">
                    <div style="background-color: #2D2926; padding: 40px 20px; text-align: center;">
                        <img src="${logoUrl}" alt="Yelitze Rangel" style="max-width: 150px; height: auto; margin-bottom: 20px;">
                        <h1 style="color: #FDFBFA; margin: 0; font-size: 16px; letter-spacing: 2px; text-transform: uppercase;">${testTitle}</h1>
                    </div>
                    
                    <div style="padding: 50px 40px; color: #2D2926; line-height: 1.8;">
                        <h2 style="color: #8C4005; font-size: 24px; margin-bottom: 30px;">Hola, ${name}.</h2>
                        
                        <p style="font-size: 16px; color: #4A4540; margin-bottom: 30px;">
                            Has dado un paso valioso al realizar este test. El autoconocimiento es la base de cualquier transformación real. Aquí tienes el análisis de tus respuestas:
                        </p>

                        <div style="background-color: white; padding: 30px; border-radius: 20px; border: 1px solid #B8835A15; margin-bottom: 40px; font-size: 16px; color: #2D2926;">
                            ${analysis.replace(/\n/g, '<br/>')}
                        </div>

                        ${pdfBuffer ? `
                        <div style="margin-bottom: 30px; text-align: center; background-color: #F5EFE6; padding: 20px; border-radius: 15px;">
                            <p style="font-size: 14px; color: #8C4005; font-weight: bold; margin: 0;">
                                Hemos adjuntado tu reporte completo en formato PDF a este correo para que puedas conservarlo.
                            </p>
                        </div>
                        ` : ''}
                        
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
            console.error('[Generic Test Mail] Resend error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Generic test mail error:', err);
        return { success: false, error: err };
    }
};

export const sendNewsletterSubscriptionEmail = async (email: string) => {
    try {
        const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://yelitzerangeloficial.com'}/assets/images/logo-yelitze-new.png`;

        const { data, error } = await resend.emails.send({
            from: 'Yelitze Rangel <info@yelitzerangeloficial.com>',
            to: [email],
            subject: '¡Bienvenida al Círculo del Alma! 🌿✨',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #FDFBFA; border-radius: 32px; overflow: hidden; border: 1px solid #B8835A20;">
                    <div style="background-color: #2D2926; padding: 40px 20px; text-align: center;">
                        <img src="${logoUrl}" alt="Yelitze Rangel" style="max-width: 150px; height: auto; margin-bottom: 20px;">
                        <h1 style="color: #FDFBFA; margin: 0; font-size: 16px; letter-spacing: 2px; text-transform: uppercase;">El Círculo del Alma</h1>
                    </div>
                    
                    <div style="padding: 50px 40px; color: #2D2926; line-height: 1.8;">
                        <h2 style="color: #8C4005; font-size: 24px; margin-bottom: 30px;">¡Gracias por unirte!</h2>
                        
                        <p style="font-size: 16px; color: #4A4540; margin-bottom: 25px;">
                            Has tomado el primer paso para conectar con tu esencia y honrar tus raíces. A partir de ahora, recibirás reflexiones, herramientas y noticias exclusivas directamente en tu buzón.
                        </p>
                        
                        <div style="background-color: #F5EFE6; padding: 30px; border-radius: 20px; border: 1px solid #B8835A15; margin-bottom: 40px;">
                            <p style="font-size: 16px; color: #2D2926; font-style: italic; margin: 0;">
                                "Cuando sanamos nosotros, sanamos a siete generaciones hacia atrás y siete hacia adelante."
                            </p>
                        </div>

                        <p style="font-size: 16px; color: #4A4540; margin-bottom: 30px;">
                            Mantente atenta, pronto recibirás tu primera dosis de inspiración ancestral.
                        </p>

                        <div style="text-align: center;">
                            <a href="https://yelitzerangeloficial.com" style="background-color: #C1530A; color: white; padding: 16px 32px; border-radius: 50px; text-decoration: none; font-weight: bold; display: inline-block;">
                                VISITAR MI WEB
                            </a>
                        </div>
                        
                        <p style="margin-top: 50px; text-align: center; color: #8C4005; font-weight: bold; font-style: italic;">
                            "Primero sana el cuerpo… y luego cambia la historia."
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
            console.error('[Newsletter Mail] Resend error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Newsletter subscription email error:', err);
        return { success: false, error: err };
    }
};

export const sendAppointmentConfirmationEmail = async ({
    email,
    name,
    date,
    slot,
    paymentMethod
}: {
    email: string;
    name: string;
    date: Date;
    slot: string;
    paymentMethod: string;
}) => {
    try {
        const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://yelitzerangeloficial.com'}/assets/images/logo-yelitze-new.png`;
        const slotLabel = slot === 'morning' ? 'Mañana (9:00 AM - 1:00 PM)' : 'Tarde (2:00 PM - 6:00 PM)';
        const formattedDate = date.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        const { data, error } = await resend.emails.send({
            from: 'Yelitze Rangel <info@yelitzerangeloficial.com>',
            to: [email, 'info@yelitzerangeloficial.com'], // Send to user and admin
            subject: '¡Tu Sesión ha sido Reservada! 🌿✨',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #FDFBFA; border-radius: 32px; overflow: hidden; border: 1px solid #B8835A20;">
                    <div style="background-color: #2D2926; padding: 40px 20px; text-align: center;">
                        <img src="${logoUrl}" alt="Yelitze Rangel" style="max-width: 150px; height: auto; margin-bottom: 20px;">
                        <h1 style="color: #FDFBFA; margin: 0; font-size: 16px; letter-spacing: 2px; text-transform: uppercase;">Confirmación de Reserva</h1>
                    </div>
                    
                    <div style="padding: 50px 40px; color: #2D2926; line-height: 1.8;">
                        <h2 style="color: #8C4005; font-size: 24px; margin-bottom: 30px;">¡Hola, ${name}!</h2>
                        
                        <p style="font-size: 16px; color: #4A4540; margin-bottom: 25px;">
                            Tu espacio ha sido reservado con éxito. Este es un paso valioso en tu proceso de transformación.
                        </p>
                        
                        <div style="background-color: #F5EFE6; padding: 30px; border-radius: 20px; border: 1px solid #B8835A15; margin-bottom: 40px;">
                            <h3 style="color: #8C4005; font-size: 16px; margin-top: 0; margin-bottom: 15px;">Detalles de tu cita:</h3>
                            <p style="margin: 5px 0;"><strong>Fecha:</strong> ${formattedDate}</p>
                            <p style="margin: 5px 0;"><strong>Bloque:</strong> ${slotLabel}</p>
                            <p style="margin: 5px 0;"><strong>Método de Pago:</strong> ${paymentMethod.toUpperCase()}</p>
                        </div>

                        <p style="font-size: 14px; color: #4A4540; margin-bottom: 30px;">
                            Nos pondremos en contacto contigo pronto vía WhatsApp o Email para coordinar los detalles finales y el enlace de la sesión.
                        </p>

                        <p style="margin-top: 50px; text-align: center; color: #8C4005; font-weight: bold; font-style: italic;">
                            "Primero sana el cuerpo… y luego cambia la historia."
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
            console.error('[Appointment Mail] Resend error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Appointment confirmation email error:', err);
        return { success: false, error: err };
    }
};

export const sendSanateMujerRegistrationEmail = async (email: string, name: string, city: string) => {
    try {
        const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://yelitzerangeloficial.com'}/assets/images/logo-yelitze-new.png`;

        const { data, error } = await resend.emails.send({
            from: 'Yelitze Rangel <info@yelitzerangeloficial.com>',
            to: [email],
            subject: '¡Bienvenida a la Activación Sánate Mujer! 🌸',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #FDFBFA; border-radius: 32px; overflow: hidden; border: 1px solid #B8835A20;">
                    <div style="background-color: #2D2926; padding: 40px 20px; text-align: center;">
                        <img src="${logoUrl}" alt="Yelitze Rangel" style="max-width: 150px; height: auto; margin-bottom: 20px;">
                        <h1 style="color: #FDFBFA; margin: 0; font-size: 16px; letter-spacing: 2px; text-transform: uppercase;">Sánate Mujer: Activación</h1>
                    </div>
                    
                    <div style="padding: 50px 40px; color: #2D2926; line-height: 1.8;">
                        <h2 style="color: #8C4005; font-size: 24px; margin-bottom: 30px;">¡Bienvenida, ${name}!</h2>
                        
                        <p style="font-size: 16px; color: #4A4540; margin-bottom: 25px;">
                            Tu lugar en la <strong>Activación Sánate Mujer</strong> ha sido reservado con éxito. Este es un espacio sagrado de reconexión y restauración, abierto para mujeres de todo el mundo.
                        </p>
                        
                        <div style="background-color: #F5EFE6; padding: 30px; border-radius: 20px; border: 1px solid #B8835A15; margin: 30px 0; text-align: center;">
                            <p style="margin: 0; font-weight: bold; color: #2D2926; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">FECHA Y PLATAFORMA:</p>
                            <p style="margin: 10px 0; font-size: 22px; color: #B8835A; font-weight: bold;">10 de Julio, 2026</p>
                            <p style="margin: 5px 0; font-size: 18px; color: #2D2926; font-weight: bold;">7:00 PM (Hora Venezuela)</p>
                            <p style="margin: 5px 0; font-size: 16px; color: #2D2926;">Vía YouTube (En Vivo)</p>
                        </div>

                        <div style="background-color: #2D2926; padding: 30px; border-radius: 20px; color: #F9F7F2; text-align: center; margin-bottom: 30px;">
                            <p style="font-size: 14px; font-style: italic; margin: 0;">
                                "Anatomía del alma donde lo invisible cobra voz."
                            </p>
                        </div>

                        <p style="font-size: 16px; color: #4A4540; margin-bottom: 30px;">
                            Te enviaremos el enlace de acceso y los materiales de preparación (Workbook) a través de nuestro grupo VIP de WhatsApp y por este mismo correo unos días antes del evento.
                        </p>
                        
                        <p style="margin-top: 50px; text-align: center; color: #8C4005; font-weight: bold; font-style: italic;">
                            "Primero sana el cuerpo… y luego cambia la historia."
                        </p>
                    </div>
                    
                    <div style="background-color: #EFE9E0; padding: 30px; text-align: center; color: #3C2A21; font-size: 12px;">
                        <p style="margin: 0;"><strong>YELITZE RANGEL</strong> • Tu Coach Ancestral</p>
                        <p style="margin-top: 5px; opacity: 0.6;">&copy; 2026 Todos los derechos reservados.</p>
                    </div>
                </div>
            `
        });

        if (error) {
            console.error('[Sanate Mujer Mail] Resend error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Sanate Mujer registration email error:', err);
        return { success: false, error: err };
    }
};

export const sendContactEmail = async ({
    name,
    email,
    subject,
    message
}: {
    name: string;
    email: string;
    subject: string;
    message: string;
}) => {
    try {
        const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://yelitzerangeloficial.com'}/assets/images/logo-yelitze-new.png`;

        const { data, error } = await resend.emails.send({
            from: 'Yelitze Rangel <info@yelitzerangeloficial.com>',
            to: ['energyuniversal@gmail.com'], // The recipient requested by the user
            replyTo: email, // Allow replying directly to the person who wrote
            subject: `Nuevo mensaje de contacto: ${subject}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #FDFBFA; border-radius: 32px; overflow: hidden; border: 1px solid #B8835A20;">
                    <div style="background-color: #2D2926; padding: 40px 20px; text-align: center;">
                        <img src="${logoUrl}" alt="Yelitze Rangel" style="max-width: 150px; height: auto; margin-bottom: 20px;">
                        <h1 style="color: #FDFBFA; margin: 0; font-size: 16px; letter-spacing: 2px; text-transform: uppercase;">Nuevo Mensaje de Contacto</h1>
                    </div>
                    
                    <div style="padding: 50px 40px; color: #2D2926; line-height: 1.8;">
                        <div style="background-color: #F5EFE6; padding: 30px; border-radius: 20px; border: 1px solid #B8835A15; margin-bottom: 40px;">
                            <p style="margin: 5px 0;"><strong>Nombre:</strong> ${name}</p>
                            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                            <p style="margin: 5px 0;"><strong>Asunto:</strong> ${subject}</p>
                        </div>

                        <div style="margin-bottom: 40px;">
                            <h3 style="color: #8C4005; font-size: 16px; margin-top: 0;">Mensaje:</h3>
                            <p style="font-size: 16px; color: #4A4540; white-space: pre-wrap;">${message}</p>
                        </div>
                    </div>
                    
                    <div style="background-color: #EFE9E0; padding: 30px; text-align: center; color: #3C2A21; font-size: 12px;">
                        <p style="margin: 0;">Este mensaje fue enviado desde el formulario de contacto de yelitzerangeloficial.com</p>
                    </div>
                </div>
            `
        });

        if (error) {
            console.error('[Contact Mail] Resend error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Contact email error:', err);
        return { success: false, error: err };
    }
};

export const sendCaracasSomaticEmail = async ({
    email,
    name,
    profile,
}: {
    email: string;
    name: string;
    profile: string; // 'activacion' | 'congelamiento' | 'regulacion'
}) => {
    try {
        const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://yelitzerangeloficial.com'}/assets/images/logo-yelitze-new.png`;
        const ebookUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://yelitzerangeloficial.com'}/Ebook-VenezuelaeneLCuerpo(1).pdf`;
        const waUrl = `https://wa.me/17867268717?text=Hola%20Yelitze%2C%20vengo%20de%20la%20p%C3%A1gina%20de%20Venezuela%20en%20el%20Cuerpo%20%28soy%20${encodeURIComponent(name)}%29%20y%20quiero%20tener%20acceso%20a%20las%20herramientas.`;

        let profileTitle = '';
        let profileDesc = '';
        let profileColor = '';

        if (profile === 'activacion') {
            profileTitle = 'Alta Activación';
            profileDesc = 'Tu sistema nervioso se encuentra en estado de alerta sostenida. Tu cuerpo todavía está intentando asegurarse de que estás a salvo. Puede sentirse como tensión constante, ansiedad frecuente, hipervigilancia o dificultad para descansar.';
            profileColor = '#C97C5D';
        } else if (profile === 'congelamiento') {
            profileTitle = 'Bloqueo / Congelamiento';
            profileDesc = 'Tu sistema nervioso está reduciendo energía para protegerte. Tu cuerpo está tratando de estabilizarse después del impacto. Puede sentirse como desconexión, cansancio emocional, falta de motivación o sensación de apagamiento.';
            profileColor = '#C8A45D';
        } else {
            profileTitle = 'Regulación Parcial';
            profileDesc = 'Tu sistema nervioso está recuperando estabilidad progresivamente. Tu sistema está empezando a regularse. Puede sentirse como momentos de calma, mejor respiración y mayor presencia.';
            profileColor = '#7C8B6A';
        }

        const { data, error } = await resend.emails.send({
            from: 'Yelitze Rangel <info@yelitzerangeloficial.com>',
            to: [email],
            subject: 'Tus Resultados: Test Somático Caracas 🌿',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #F9F6F0; border-radius: 32px; overflow: hidden; border: 1px solid #B8835A20;">
                    <div style="background-color: #1C1C1C; padding: 40px 20px; text-align: center;">
                        <img src="${logoUrl}" alt="Yelitze Rangel" style="max-width: 150px; height: auto; margin-bottom: 20px;">
                        <h1 style="color: #F9F6F0; margin: 0; font-size: 16px; letter-spacing: 2px; text-transform: uppercase;">Resultados de tu Test Somático</h1>
                    </div>
                    
                    <div style="padding: 50px 40px; color: #1C1C1C; line-height: 1.8;">
                        <h2 style="color: ${profileColor}; font-size: 24px; margin-bottom: 30px;">¡Hola, ${name}!</h2>
                        
                        <p style="font-size: 16px; margin-bottom: 25px;">
                            Gracias por completar el test. Este es un paso valioso para generar autoconciencia corporal y entender cómo está respondiendo tu sistema nervioso en este momento.
                        </p>
                        
                        <div style="background-color: white; padding: 30px; border-radius: 20px; border-top: 8px solid ${profileColor}; margin-bottom: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                            <p style="margin: 0; font-weight: bold; color: ${profileColor}; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Tu Perfil Actual:</p>
                            <p style="margin: 10px 0 15px 0; font-size: 22px; color: #1C1C1C; font-weight: bold;">${profileTitle}</p>
                            <p style="margin: 0; font-size: 16px; color: #1C1C1C; line-height: 1.6;">${profileDesc}</p>
                        </div>

                        <p style="font-size: 16px; margin-bottom: 30px;">
                            Recuerda que no tienes que hacerlo todo ahora. Solo empieza por un paso. Te compartimos los recursos para acompañarte en este proceso:
                        </p>


                        <div style="text-align: center;">
                            <a href="${waUrl}" style="background-color: #25D366; color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: bold; display: inline-block; width: 80%; max-width: 300px;">
                                Hablar con alguien por WhatsApp
                            </a>
                        </div>
                        
                        <p style="margin-top: 50px; text-align: center; color: #1C1C1C; font-weight: bold; font-style: italic;">
                            "Primero sana el cuerpo… y luego cambia la historia."
                        </p>
                    </div>
                    
                    <div style="background-color: #EFE9E0; padding: 30px; text-align: center; color: #3C2A21; font-size: 12px;">
                        <p style="margin: 0;"><strong>YELITZE RANGEL</strong> • Tu Coach Ancestral</p>
                        <p style="margin-top: 5px; opacity: 0.6;">&copy; 2026 Todos los derechos reservados.</p>
                    </div>
                </div>
            `
        });

        if (error) {
            console.error('[Caracas Somatic Mail] Resend error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Caracas Somatic Mail service error:', err);
        return { success: false, error: err };
    }
};

