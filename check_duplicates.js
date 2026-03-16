const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDuplicates() {
    console.log('--- Verificando Duplicados ---');
    const registrations = await prisma.venezuelaEnElCuerpoRegistration.findMany();
    console.log(`Total registros: ${registrations.length}`);

    const emailMap = new Map();
    const phoneMap = new Map();
    const duplicates = [];

    for (const reg of registrations) {
        const email = reg.email.toLowerCase().trim();
        const phone = reg.whatsapp.trim();

        if (emailMap.has(email)) {
            duplicates.push({ type: 'EMAIL', id: reg.id, email, name: reg.name });
        } else {
            emailMap.set(email, reg.id);
        }

        if (phoneMap.has(phone)) {
            // Only add if not already added by email match to avoid double counting
            if (!emailMap.has(email) || emailMap.get(email) !== reg.id) {
                 duplicates.push({ type: 'WHATSAPP', id: reg.id, phone, name: reg.name });
            }
        } else {
            phoneMap.set(phone, reg.id);
        }
    }

    console.log(`Encontrados ${duplicates.length} duplicados.`);
    duplicates.forEach(d => console.log(`- [${d.type}] ID: ${d.id}, Name: ${d.name}, Match: ${d.email || d.phone}`));

    process.exit(0);
}

checkDuplicates().catch(err => {
    console.error(err);
    process.exit(1);
});
