import * as XLSX from 'xlsx';
import * as dotenv from 'dotenv';
import { Resend } from 'resend';
import * as path from 'path';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

const resend = new Resend(process.env.RESEND_API_KEY);

async function main() {
    const excelPath = 'C:\\Users\\troni\\Downloads\\Asistentes_Evento.xlsx';
    console.log(`--- Reading Excel from: ${excelPath} ---`);

    try {
        const workbook = XLSX.readFile(excelPath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet) as any[];

        console.log(`Found ${data.length} rows in Excel.`);

        if (data.length === 0) {
            console.error('No data found in Excel.');
            return;
        }

        const scheduledTime = '2026-03-27T18:00:00-04:00';
        console.log(`Targeting scheduled time: ${scheduledTime}`);

        const logoUrl = 'https://yelitzerangeloficial.com/assets/images/logo-yelitze-new.png';
        const toolsUrl = 'https://yelitzerangeloficial.com/venezuela-en-el-cuerpo/bonos';
        const instagramUrl = 'https://www.instagram.com/yelitzerangeloficial/';

        let successCount = 0;
        let skipCount = 0;

        for (const row of data) {
            const name = row['Nombre'] || row['Nombre Completo'] || row['Name'] || row['Full Name'] || row['nombre'] || 'Asistente';
            const email = row['Correo'] || row['Email'] || row['Correo Electrónico'] || row['e-mail'] || row['correo'] || row['email'];

            if (!email || !email.includes('@')) {
                skipCount++;
                continue;
            }

            try {
                const { data: resData, error } = await resend.emails.send({
                    from: 'Yelitze Rangel <info@yelitzerangeloficial.com>',
                    to: [email],
                    subject: '¡Gracias por acompañarnos hoy! 🇻🇪✨',
                    scheduledAt: scheduledTime,
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

                if (!error) {
                    successCount++;
                }
            } catch (err) {}
        }

        console.log(`--- Finished ---`);
        console.log(`Scheduled (with social): ${successCount}`);

    } catch (err) {
        console.error('Error reading Excel:', err);
    }
}

main();
