import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { EVENTS_DATA } from '@/lib/events';
import { TESTS_DATA } from '@/lib/tests-data';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://yelitzerangel.com';

    // Static routes
    const staticRoutes = [
        '',
        '/sobre-mi',
        '/servicios',
        '/blog',
        '/eventos',
        '/galeria',
        '/libros',
        '/contacto',
        '/reservas',
        '/tests',
        '/venezuela-en-el-cuerpo',
        '/bio',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Blog routes
    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        const posts = await db.blogPost.findMany({
            select: { slug: true, updatedAt: true }
        });
        blogRoutes = posts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: post.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));
    } catch (error) {
        console.error('Error generating blog sitemap:', error);
        // Fallback: No extra blog routes if DB fails during build
    }

    // Dynamic Event routes
    const eventRoutes = EVENTS_DATA.map((event) => ({
        url: `${baseUrl}/eventos/${event.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    // Dynamic Test routes
    const testRoutes = TESTS_DATA.map((test) => ({
        url: `${baseUrl}/tests/${test.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }));

    return [...staticRoutes, ...blogRoutes, ...eventRoutes, ...testRoutes];
}
