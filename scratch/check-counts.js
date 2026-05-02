const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const smCount = await prisma.sanateMujerRegistration.count();
    const vecCount = await prisma.venezuelaEnElCuerpoRegistration.count();
    console.log('Sanate Mujer count:', smCount);
    console.log('Venezuela en el Cuerpo count:', vecCount);
    
    if (vecCount > 0) {
        const lastVec = await prisma.venezuelaEnElCuerpoRegistration.findFirst({
            orderBy: { createdAt: 'desc' }
        });
        console.log('Last Venezuela registration:', lastVec.name, lastVec.createdAt);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
