const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCounts() {
    const models = ['venezuelaEnElCuerpoRegistration', 'sanateMujerRegistration', 'order', 'product', 'testResult'];
    
    for (const model of models) {
        try {
            const count = await prisma[model].count();
            console.log(`${model}: ${count}`);
        } catch (e) {
            console.log(`${model}: Error - ${e.message}`);
        }
    }
    process.exit(0);
}

checkCounts();
