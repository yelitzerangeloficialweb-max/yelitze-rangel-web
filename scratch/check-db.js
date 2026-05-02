const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const count = await prisma.sanateMujerRegistration.count();
    console.log('Total registrations:', count);
    const last = await prisma.sanateMujerRegistration.findFirst({
        orderBy: { createdAt: 'desc' }
    });
    console.log('Last registration:', last);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
