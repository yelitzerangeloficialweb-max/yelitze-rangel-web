import { PrismaClient } from '@prisma/client';
// Use the absolute path to prisma/dev.db to be sure
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: 'file:./prisma/dev.db'
        }
    }
});
async function run() {
    const res1 = await prisma.sanateMujerRegistration.count();
    const res2 = await prisma.venezuelaEnElCuerpoRegistration.count();
    const res3 = await prisma.testResult.count();
    const res4 = await prisma.order.count();
    
    console.log(`PRISMA/DEV.DB SanateMujer: ${res1}`);
    console.log(`PRISMA/DEV.DB Venezuela: ${res2}`);
    console.log(`PRISMA/DEV.DB TestResults: ${res3}`);
    console.log(`PRISMA/DEV.DB Orders: ${res4}`);
}
run();
