import * as dotenv from 'dotenv';
import { generateSomaticPDF } from '../lib/pdf-generator';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

async function main() {
    console.log('--- Generating Somatic Test PDF locally (No Mail) ---');

    const name = 'Kick-Off Development';
    const reflection = 'Siento mucha tensión en mis hombros y mandíbula cuando trabajo bajo presión.';
    
    const stressResult = {
        type: 'ALTA ACTIVACIÓN (SIMPÁTICO)',
        desc: 'Tu sistema nervioso está en un estado de alerta constante.'
    };

    const parsedAnalysis = {
        personalized_analysis: 'Tu cuerpo está sosteniendo una armadura de supervivencia que se manifiesta en la fascia de tus trapecios...',
        somatic_insight: 'MI CUERPO YA NO TIENE QUE DEFENDERSE DE LO QUE YA PASÓ.',
        action_step: 'PRÁCTICA DE VIBRACIÓN: Sacude tus brazos y hombros durante 2 minutos.',
        venezuela_connection: 'Tu patrón de alta activación encontrará en nuestro encuentro presencial.'
    };

    try {
        console.log('Generating PDF...');
        const pdfBuffer = await generateSomaticPDF(name, parsedAnalysis, stressResult, reflection);
        
        const tmpDir = path.join(process.cwd(), 'tmp');
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir);
        }
        
        const pdfPath = path.join(tmpDir, 'Test_Somatico_Final.pdf');
        fs.writeFileSync(pdfPath, pdfBuffer);
        console.log(`- PDF successfully generated and saved to: ${pdfPath}`);
        console.log(`- Size: ${pdfBuffer.length} bytes`);

    } catch (err) {
        console.error('Error:', err);
    }
}

main();
