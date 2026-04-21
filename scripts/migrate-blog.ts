import { PrismaClient } from '@prisma/client';
import { BLOG_POSTS } from '../lib/blog-data';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Iniciando Migración de Blog ---');
    console.log(`Artículos encontrados en lib/blog-data.ts: ${BLOG_POSTS.length}`);

    let createdCount = 0;
    let updatedCount = 0;

    for (const post of BLOG_POSTS) {
        try {
            // Usamos upsert para evitar duplicados si el script se corre varias veces
            // y para actualizar si ha habido cambios en el archivo estático
            const upsertedPost = await prisma.blogPost.upsert({
                where: { slug: post.slug },
                update: {
                    title: post.title,
                    excerpt: post.excerpt,
                    content: post.content,
                    date: post.date,
                    image: post.image,
                    category: post.category,
                    author: post.author,
                },
                create: {
                    slug: post.slug,
                    title: post.title,
                    excerpt: post.excerpt,
                    content: post.content,
                    date: post.date,
                    image: post.image,
                    category: post.category,
                    author: post.author,
                },
            });
            
            // Si el ID cambia o es nuevo, lo contamos. 
            // En este caso, upsert siempre devuelve el objeto, así que solo informamos.
            console.log(`✓ Procesado: ${post.slug}`);
            createdCount++;
        } catch (error) {
            console.error(`✗ Error procesando ${post.slug}:`, error);
        }
    }

    console.log('\n--- Resumen de Migración ---');
    console.log(`Total procesados: ${createdCount}`);
    console.log('---------------------------');
}

main()
    .catch((e) => {
        console.error('Error crítico en la migración:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
