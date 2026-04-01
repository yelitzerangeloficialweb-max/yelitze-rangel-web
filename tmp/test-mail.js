const fetch = require('node-fetch');

async function testVisionBoardMail() {
    const data = {
        registrationData: {
            name: "Test User",
            email: "troniae@gmail.com", // Assuming this is the user's email from conversation context or general test
            gender: "mujer"
        },
        pillars: [
            { id: '1', title: 'Abundancia Financiera', intention: 'Vivir en paz con el dinero', direction: 'Hacia mi libertad', action: 'Ahorrar 10% mensual', label: 'Propósito', images: [] },
            { id: '2', title: 'Vínculos de Poder', intention: 'Sanar la relación con mi madre', direction: 'Hacia el perdón', action: 'Llamarla semanalmente', label: 'Relaciones', images: [] },
            { id: '3', title: 'Expansión Vital', intention: 'Viajar a la selva', direction: 'Hacia lo salvaje', action: 'Comprar ticket en mayo', label: 'Vitalidad', images: [] },
            { id: '4', title: 'Orden Sistémico', intention: 'Honrar mi linaje', direction: 'Hacia la fuerza', action: 'Hacer mi árbol', label: 'Cierre', images: [] },
            { id: '5', title: 'Soberanía Emocional', intention: 'Decir NO sin culpa', direction: 'Hacia mi centro', action: 'Meditar 5 min diarios', label: 'Esencia', images: [] }
        ],
        reflections: {
            '1': 'Suelto la culpa de no ser suficiente.',
            '2': 'Fijo mi mirada en el futuro.',
            '3': 'Tomo la fuerza de mis ancestros.',
            '4': 'Habito mi lugar como la pequeña.'
        }
    };

    console.log('--- Iniciando Prueba de Envío (Vision Board) ---');
    try {
        const response = await fetch('http://localhost:3000/api/ai/analyze-board', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('STATUS:', response.status);
        console.log('RESULTADO:', JSON.stringify(result, null, 2));
    } catch (error) {
        console.error('ERROR EN LA PRUEBA:', error);
    }
}

testVisionBoardMail();
