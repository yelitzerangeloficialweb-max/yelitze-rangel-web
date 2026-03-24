import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
    const res = await prisma.testResult.count();
    console.log(`TestResults: ${res}`);
    const latest = await prisma.testResult.findFirst({ orderBy: { createdAt: 'desc' } });
    console.log(`Latest: ${JSON.stringify(latest, null, 2)}`);
}
run();
