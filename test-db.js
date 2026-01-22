const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    try {
        await prisma.testResult.create({
            data: {
                testTitle: 'Verificación de Sistema',
                score: 12,
                maxScore: 15,
                answers: JSON.stringify({ "1": 2, "2": 3, "3": 1 }),
                aiAnalysis: "**Sistema Conectado:**\n\nSi puedes leer esto, significa que la base de datos está funcionando correctamente.\n\nAhora cualquier usuario que complete el test aparecerá en esta lista."
            }
        })
        console.log("Record created")
    } catch (e) {
        console.error("Error creating record:", e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
