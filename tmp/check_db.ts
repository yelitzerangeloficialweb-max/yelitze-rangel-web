
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const count = await prisma.venezuelaEnElCuerpoRegistration.count();
        console.log(`Total registrations: ${count}`);

        const registrations = await prisma.venezuelaEnElCuerpoRegistration.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' }
        });
        console.log('Last 5 registrations:', JSON.stringify(registrations, null, 2));
    } catch (error) {
        console.error('Error querying database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
