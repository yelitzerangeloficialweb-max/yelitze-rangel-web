import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const counts = {
        testResult: await prisma.testResult.count(),
        product: await prisma.product.count(),
        order: await prisma.order.count(),
        sanate: await prisma.sanateMujerRegistration.count(),
        venezuela: await prisma.venezuelaEnElCuerpoRegistration.count(),
    };
    console.log(counts);
}
main().finally(() => prisma.$disconnect());
