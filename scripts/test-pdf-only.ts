import { generateSomaticPDF } from '../lib/pdf-generator';
import * as fs from 'fs';
import * as path from 'path';

async function test() {
    console.log('Testing PDF generation...');
    try {
        const name = 'Tester';
        const analysis = {
            personalized_analysis: 'Analisis de prueba.',
            somatic_insight: 'Insight de prueba.',
            action_step: 'Paso de prueba.'
        };
        const stressResult = {
            type: 'Test Stress',
            desc: 'Test description'
        };
        const reflection = 'Reflexion de prueba.';

        const buffer = await generateSomaticPDF(name, analysis, stressResult, reflection);
        console.log('PDF generated successfully, size:', buffer.length);
        
        const outPath = path.join(process.cwd(), 'tmp_test.pdf');
        fs.writeFileSync(outPath, buffer);
        console.log('PDF saved to:', outPath);
    } catch (err) {
        console.error('PDF Generation FAILED:', err);
    }
}

test();
