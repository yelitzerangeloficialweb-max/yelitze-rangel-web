import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminAuth } from '@/lib/admin-auth';

// GET all blog posts
export async function GET() {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        const posts = await db.blogPost.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return NextResponse.json({ error: 'Error fetching blog posts' }, { status: 500 });
    }
}

// POST create new blog post
export async function POST(request: NextRequest) {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        const data = await request.json();

        // Generate slug from title if not provided
        const slug = data.slug || data.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        const post = await db.blogPost.create({
            data: {
                slug,
                title: data.title,
                excerpt: data.excerpt,
                content: data.content,
                date: data.date || new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
                image: data.image || '/images/blog_portraits/placeholder.jpg',
                category: data.category || 'General',
                author: data.author || 'Yelitze Rangel'
            }
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error('Error creating blog post:', error);
        return NextResponse.json({ error: 'Error creating blog post' }, { status: 500 });
    }
}
