import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
    try {
        console.log('Simulating Heridas Save...');
        const res = await prisma.testResult.create({
            data: {
                testTitle: 'Test Heridas de la Infancia',
                score: 0,
                maxScore: 100,
                answers: JSON.stringify({ Abandono: 5, Rechazo: 10 }),
                aiAnalysis: 'Simulated analysis',
                userName: 'Test User',
                userEmail: '' // Empty string as in the bug
            }
        });
        console.log('Success! ID:', res.id);
    } catch (e) {
        console.error('FAILED TO WRITE HERIDAS:', e);
    }
}
run();
