const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function main() {
    console.log('--- Sending Sample Post-Event Email (Self-contained) ---');
    
    const testEmail = 'kickoffdevelopment@gmail.com';
    const testName = 'Kick-Off Development';
    const logoUrl = 'https://yelitzerangeloficial.com/assets/images/logo-yelitze-new.png';
    const toolsUrl = 'https://yelitzerangeloficial.com/venezuela-en-el-cuerpo/bonos';

    const { data, error } = await resend.emails.send({
        from: 'Yelitze Rangel <info@yelitzerangeloficial.com>',
        to: [testEmail],
        subject: '¡Gracias por acompañarnos hoy! 🇻🇪✨',
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #F5EFE6; border-radius: 24px; overflow: hidden; border: 1px solid #B8835A30;">
                <div style="background-color: #8C4005; padding: 30px 20px; text-align: center;">
                    <img src="${logoUrl}" alt="Yelitze Rangel" style="max-width: 180px; height: auto; margin-bottom: 20px;">
                    <h1 style="color: #F5EFE6; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Venezuela en el Cuerpo</h1>
                </div>
                
                <div style="padding: 40px 30px; color: #2D2926; line-height: 1.6;">
                    <h2 style="color: #8C4005; margin-bottom: 20px;">¡Hola, ${testName}!</h2>
                    
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
        console.error(`Error sending for ${testEmail}:`, error);
    } else {
        console.log(`Success: Sample email sent ID ${data?.id}`);
    }
}

main().catch(console.error);
