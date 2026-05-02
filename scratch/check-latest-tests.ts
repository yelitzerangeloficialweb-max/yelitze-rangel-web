import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const latest = await prisma.testResult.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5
    });
    console.log(JSON.stringify(latest, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
