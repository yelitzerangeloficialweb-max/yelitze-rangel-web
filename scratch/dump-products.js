require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('ENV DATABASE_URL:', process.env.DATABASE_URL);
    console.log('TestResult:', await prisma.testResult.count());
    console.log('Product:', await prisma.product.count());
    console.log('Order:', await prisma.order.count());
    console.log('OrderItem:', await prisma.orderItem.count());
    console.log('SanateMujerRegistration:', await prisma.sanateMujerRegistration.count());
    console.log('VenezuelaEnElCuerpoRegistration:', await prisma.venezuelaEnElCuerpoRegistration.count());
    console.log('Availability:', await prisma.availability.count());
    console.log('Appointment:', await prisma.appointment.count());
    console.log('BlogPost:', await prisma.blogPost.count());
    
    if (await prisma.product.count() > 0) {
        console.log('Products:', JSON.stringify(await prisma.product.findMany(), null, 2));
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
