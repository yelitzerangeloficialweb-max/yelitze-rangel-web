const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const count = await prisma.venezuelaEnElCuerpoRegistration.count();
    console.log('Total registrations:', count);
    const all = await prisma.venezuelaEnElCuerpoRegistration.findMany();
    console.log('Registrations:', JSON.stringify(all, null, 2));
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
