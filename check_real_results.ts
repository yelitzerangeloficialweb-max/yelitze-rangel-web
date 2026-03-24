import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: 'file:C:/Users/troni/Documents/Descarga-Antigravity/YelitzeRangel/prisma/dev.db'
        }
    }
});
async function run() {
    const res = await prisma.testResult.count();
    console.log(`TestResults in PRISMA/DEV.DB: ${res}`);
    const results = await prisma.testResult.findMany({ 
        take: 5, 
        orderBy: { createdAt: 'desc' } 
    });
    console.log(`Results: ${JSON.stringify(results, null, 2)}`);
}
run();
