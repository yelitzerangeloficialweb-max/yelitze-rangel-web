const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding products into database...');

    const products = [
        {
            id: 'cartas-corazon-chamanico-id',
            slug: 'cartas-corazon-chamanico',
            name: 'Cartas Corazón Chamánico',
            subtitle: 'Oráculo de 53 cartas',
            description: 'El oráculo Corazón Chamánico es mucho más que un mazo de 53 cartas; es un portal hacia tu sabiduría interior. Creado por la Sanadora Ancestral Yelitze Rangel, esta herramienta de crecimiento personal está diseñada para despertar los poderes femeninos y antiguos que residen en ti. Al igual que la tierra, tu energía está lista para germinar. Úsalo como una guía para escucharte, descubrirte, honrar tu linaje y transformar tu camino. Un homenaje a la maga, a la sabia y a la mujer que llevas dentro.',
            price: 35.00,
            image: '/assets/images/oraculo/oraculo-real-1.jpg', // Uses the stable static asset!
            images: JSON.stringify([
                '/assets/images/oraculo/oraculo-real-1.jpg',
                '/assets/images/oraculo/oraculo-real-2.jpg',
                '/assets/images/oraculo/oraculo-real-3.jpg'
            ]),
            category: 'oraculo',
            stock: 10,
            featured: true,
            active: true
        },
        {
            id: 'conversaciones-chamana-id',
            slug: 'conversaciones-con-mi-chamana',
            name: 'Conversaciones con mi Chamana',
            subtitle: '107 pláticas para despertar tu medicina interior',
            description: 'Hay una voz antigua que vive dentro de ti. Una abuela, una guía, una chamana que conoce los caminos del alma, que guarda las cenizas de las mujeres que vinieron antes, y enciende con ellas el fuego de tu despertar.\n\nEste libro nació en el umbral de un nuevo tiempo, cuando logré escuchar la voz de mi parte sabia. Esa mujer que habita en todas nosotras y que espera pacientemente a ser escuchada.\n\nUna recopilación de 107 reflexiones, meditaciones y diálogos internos para acompañarte en tu día a día.',
            price: 17.00,
            image: '/assets/images/books/conversaciones-chamana-3d.png', // Stable local asset!
            images: JSON.stringify([]),
            category: 'libro',
            stock: 10,
            featured: true,
            active: true
        },
        {
            id: 'hilos-conexion-id',
            slug: 'hilos-de-conexion',
            name: 'Hilos de Conexión',
            subtitle: 'Un viaje curativo a la memoria del origen',
            description: 'La vida es más que una espiral interminable. Es un círculo que siempre vuelve a empezar. Por lo tanto, vivenciamos en el camino eventos que a ratos nos distraen, agobian y nos llenan de información que puede llegar a convertirse en creencias erróneas.\n\nEl diseño que hizo Dios, la energía universal, para nosotros busca que seamos absolutamente plenos, por eso es tiempo de un despertar espiritual que no sea para el beneficio de uno solo, sino de todos.\n\nEste libro es una invitación a recordar, a sanar y a reconectar con esa memoria sagrada que habita en tu ADN.',
            price: 20.00,
            image: '/assets/images/books/hilos-conexion-3d.png', // Stable local asset!
            images: JSON.stringify([]),
            category: 'libro',
            stock: 20,
            featured: true,
            active: true
        }
    ];

    for (const p of products) {
        await prisma.product.upsert({
            where: { slug: p.slug },
            update: p,
            create: p
        });
        console.log(`Upserted product: ${p.name}`);
    }

    console.log('Database seeding completed successfully!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
