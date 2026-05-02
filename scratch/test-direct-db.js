const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Attempting to create a test registration directly...');
    const registration = await prisma.sanateMujerRegistration.create({
      data: {
        name: 'Test Manual',
        email: 'manual@example.com',
        whatsapp: '123456',
        city: 'Caracas'
      },
    });
    console.log('Success:', registration);
    
    const count = await prisma.sanateMujerRegistration.count();
    console.log('New total registrations:', count);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
