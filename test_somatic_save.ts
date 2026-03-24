import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
    try {
        console.log('Simulating Somatic Save...');
        const res = await prisma.testResult.create({
            data: {
                testTitle: 'Test Somático: El Psoas',
                score: 10,
                maxScore: 10,
                answers: JSON.stringify({ 
                    answers: { "1": 1, "2": 0.5 }, 
                    reflection: "Siento tensión", 
                    stressResult: { type: "ALTA", desc: "Desc" } 
                }),
                aiAnalysis: 'Simulated somatic analysis',
                userName: 'Somatic Test User',
                userEmail: 'somatic@example.com'
            }
        });
        console.log('Success! ID:', res.id);
    } catch (e) {
        console.error('FAILED TO WRITE SOMATIC:', e);
    }
}
run();
