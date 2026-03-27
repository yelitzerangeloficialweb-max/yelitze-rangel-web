import * as dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

const resend = new Resend(process.env.RESEND_API_KEY);

async function main() {
    const email = 'kickoffdevelopment@gmail.com';
    const name = 'Kick-Off Development';
    
    console.log(`--- Sending Test Copy to: ${email} ---`);

    const logoUrl = 'https://yelitzerangeloficial.com/assets/images/logo-yelitze-new.png';
    const toolsUrl = 'https://yelitzerangeloficial.com/venezuela-en-el-cuerpo/bonos';
    const instagramUrl = 'https://www.instagram.com/yelitzerangeloficial/';

    try {
        const { data, error } = await resend.emails.send({
            from: 'Yelitze Rangel <info@yelitzerangeloficial.com>',
            to: [email],
            subject: '¡Gracias por acompañarnos hoy! 🇻🇪✨ (COPIA DE PRUEBA)',
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

                        <div style="margin: 40px 0 20px 0; text-align: center; border-top: 1px solid #B8835A30; padding-top: 30px;">
                            <p style="font-size: 14px; color: #8C4005; margin-bottom: 20px;">Mantengamos el contacto y sigue este proceso en mis redes sociales:</p>
                            <a href="${instagramUrl}" style="background-color: transparent; color: #8C4005; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: bold; display: inline-block; border: 2px solid #8C4005;">
                                SÍGUEME EN INSTAGRAM ✨
                            </a>
                        </div>
                        
                        <p style="font-size: 15px; text-align: center; color: #8C4005; font-style: italic; margin-top: 40px;">
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
            console.error(`Error:`, error);
        } else {
            console.log(`Success! Copy sent. ID: ${data?.id}`);
        }
    } catch (err) {
        console.error(`Unexpected error:`, err);
    }
}

main();
