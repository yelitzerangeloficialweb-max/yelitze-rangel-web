import * as dotenv from 'dotenv';
import { sendGenericTestEmail } from '../lib/mail';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

async function test() {
    console.log('Testing Generic Test Email...');
    const result = await sendGenericTestEmail({
        email: 'kickoffdevelopment@gmail.com',
        name: 'Tester',
        testTitle: 'Test de Prueba modelado',
        analysis: 'Este es un análisis de prueba para verificar el envío de correos.',
    });

    if (result.success) {
        console.log('SUCCESS:', result.data);
    } else {
        console.error('FAILED:', result.error);
    }
}

test();
