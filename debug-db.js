const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const results = await prisma.testResult.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5
        });
        console.log("LAST RECORDS:");
        results.forEach(r => {
            console.log(`- ID: ${r.id}, Title: ${r.testTitle}, User: ${r.userName}, Email: ${r.userEmail}, Created: ${r.createdAt}`);
        });
    } catch (e) {
        console.error("Query Error:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}

check();
