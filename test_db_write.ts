import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
    try {
        console.log('Testing DB write...');
        const res = await prisma.testResult.create({
            data: {
                testTitle: 'Test Real Simulator',
                score: 10,
                maxScore: 10,
                answers: '{}',
                aiAnalysis: 'Self-check analysis',
                userName: 'Test User',
                userEmail: 'test@example.com'
            }
        });
        console.log('Success! ID:', res.id);
    } catch (e) {
        console.error('FAILED TO WRITE TO DB:', e);
    }
}
run();
