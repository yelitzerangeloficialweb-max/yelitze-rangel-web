import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const cities = await prisma.venezuelaEnElCuerpoRegistration.groupBy({
        by: ['city'],
        _count: {
            city: true
        }
    });
    console.log(cities);
}
main().finally(() => prisma.$disconnect());
