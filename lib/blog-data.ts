import { db } from './db';
import { BLOG_POSTS as STATIC_BLOG_POSTS } from './blog-data-static';
import { BlogPost } from './blog-types';

export { type BlogPost };

// Helper to fetch all posts from the database with AUTO-HEALING
export async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        let posts = await db.blogPost.findMany({
            orderBy: { createdAt: 'desc' }
        });

        // AUTO-HEALING: If DB is empty or missing articles, seed it from static data
        if (posts.length < STATIC_BLOG_POSTS.length && STATIC_BLOG_POSTS.length > 0) {
            console.log(`--- DB de Blog incompleta (${posts.length}/${STATIC_BLOG_POSTS.length}). Iniciando Sincronización ---`);
            for (const post of STATIC_BLOG_POSTS) {
                try {
                    await db.blogPost.upsert({
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
                        }
                    });
                } catch (e) {
                    console.error(`Error en seeding de ${post.slug}:`, e);
                }
            }
            // Fetch again after seeding
            posts = await db.blogPost.findMany({
                orderBy: { createdAt: 'desc' }
            });
        }

        return posts as unknown as BlogPost[];
    } catch (error) {
        console.error('Error fetching blog posts from DB:', error);
        return STATIC_BLOG_POSTS as unknown as BlogPost[]; // Final fallback to static
    }
}

// Helper to fetch a single post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const post = await db.blogPost.findUnique({
            where: { slug }
        });
        
        // If not in DB, fallback to static
        if (!post) {
            const staticPost = STATIC_BLOG_POSTS.find(p => p.slug === slug);
            return staticPost as unknown as BlogPost | null;
        }

        return post as unknown as BlogPost | null;
    } catch (error) {
        console.error(`Error fetching blog post with slug ${slug}:`, error);
        // Robust fallback: try static even on DB error
        const staticPost = STATIC_BLOG_POSTS.find(p => p.slug === slug);
        return staticPost as unknown as BlogPost | null;
    }
}

/**
 * BACKWARD COMPATIBILITY
 */
export const BLOG_POSTS: BlogPost[] = STATIC_BLOG_POSTS as unknown as BlogPost[];
