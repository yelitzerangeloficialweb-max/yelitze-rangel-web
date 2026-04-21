import { db } from './db';

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string; // HTML or Markdown
    date: string;
    image: string;
    category: string;
    author: string;
}

// Helper to fetch all posts from the database
export async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        const posts = await db.blogPost.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return posts as unknown as BlogPost[];
    } catch (error) {
        console.error('Error fetching blog posts from DB:', error);
        return []; // Fallback to empty if DB fails
    }
}

// Helper to fetch a single post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const post = await db.blogPost.findUnique({
            where: { slug }
        });
        return post as unknown as BlogPost | null;
    } catch (error) {
        console.error(`Error fetching blog post with slug ${slug}:`, error);
        return null;
    }
}

/**
 * DEPRECATED: Use getBlogPosts() instead.
 * This constant is kept for backward compatibility during migration.
 * It will be empty once the transition to the database is complete.
 */
export const BLOG_POSTS: BlogPost[] = [];
