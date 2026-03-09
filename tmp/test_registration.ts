
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const testData = {
            name: 'Test Debug',
            email: `test_debug_${Date.now()}@example.com`,
            whatsapp: `+123456789${Date.now()}`,
            city: 'caracas',
            instagram: '@test_debug'
        };

        console.log('Attempting to create registration with data:', testData);
        const registration = await prisma.venezuelaEnElCuerpoRegistration.create({
            data: testData
        });
        console.log('Registration created successfully:', registration);

        const check = await prisma.venezuelaEnElCuerpoRegistration.findUnique({
            where: { id: registration.id }
        });
        console.log('Double check fetch:', check);

    } catch (error: any) {
        console.error('Error during test registration:', error);
        if (error.code) console.error('Error code:', error.code);
        if (error.meta) console.error('Error meta:', error.meta);
    } finally {
        await prisma.$disconnect();
    }
}

main();
