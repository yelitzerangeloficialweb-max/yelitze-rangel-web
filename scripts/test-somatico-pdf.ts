import * as dotenv from 'dotenv';
import { Resend } from 'resend';
import { generateSomaticPDF } from '../lib/pdf-generator';
import { sendSomaticEmail } from '../lib/mail';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

async function main() {
    console.log('--- Generating Somatic Test Muestra ---');

    const name = 'Kick-Off Development';
    const email = 'kickoffdevelopment@gmail.com';
    const reflection = 'Siento mucha tensión en mis hombros y mandíbula cuando trabajo bajo presión. Siento que mi respiración es muy corta.';
    
    const stressResult = {
        type: 'ALTA ACTIVACIÓN (SIMPÁTICO)',
        desc: 'Tu sistema nervioso está en un estado de alerta constante, preparándote para luchar o huir incluso cuando no hay un peligro real presente.'
    };

    const parsedAnalysis = {
        personalized_analysis: 'Tu cuerpo está sosteniendo una armadura de supervivencia que se manifiesta en la fascia de tus trapecios y el macetero. Esta rigidez es un eco de una necesidad ancestral de estar siempre listos para la defensa. Tu sistema nervioso simpático ha olvidado cómo regresar al reposo porque percibe el "hacer" como la única forma de seguridad. La tensión en la mandíbula sugiere palabras y límites que tu linaje no pudo expresar, y que hoy tu cuerpo encapsula.',
        somatic_insight: 'MI CUERPO YA NO TIENE QUE DEFENDERSE DE LO QUE YA PASÓ.',
        action_step: 'PRÁCTICA DE VIBRACIÓN: Sacude tus brazos y hombros durante 2 minutos al sentir la presión en el trabajo. Al finalizar, exhala con el sonido VOO profundo para invitar a tu nervio vago a la calma.',
        venezuela_connection: 'Tu patrón de alta activación encontrará en nuestro encuentro presencial el espacio seguro para que tu fascia finalmente aprenda a rendirse y florecer.'
    };

    try {
        console.log('1. Generating PDF...');
        const pdfBuffer = await generateSomaticPDF(name, parsedAnalysis, stressResult, reflection);
        
        const pdfPath = path.join(process.cwd(), 'tmp', 'Test_Somatico_Muestra.pdf');
        if (!fs.existsSync(path.join(process.cwd(), 'tmp'))) {
            fs.mkdirSync(path.join(process.cwd(), 'tmp'));
        }
        fs.writeFileSync(pdfPath, pdfBuffer);
        console.log(`- PDF saved to: ${pdfPath}`);

        console.log('2. Sending Email via Resend...');
        const result = await sendSomaticEmail({
            email,
            name,
            result: parsedAnalysis,
            pdfBuffer
        });

        if (result.success) {
            console.log(`- Email sent successfully! ID: ${result.data?.id}`);
        } else {
            console.error(`- Email failed:`, result.error);
        }

    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

main();
