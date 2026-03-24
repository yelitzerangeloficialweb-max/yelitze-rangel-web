import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
    const res1 = await prisma.sanateMujerRegistration.count();
    const res2 = await prisma.venezuelaEnElCuerpoRegistration.count();
    const res3 = await prisma.testResult.count();
    const res4 = await prisma.order.count();
    
    console.log(`SanateMujer: ${res1}`);
    console.log(`Venezuela: ${res2}`);
    console.log(`TestResults: ${res3}`);
    console.log(`Orders: ${res4}`);
}
run();
