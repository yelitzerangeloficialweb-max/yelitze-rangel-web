import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminAuth } from '@/lib/admin-auth';

// GET specific blog post
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        const { id } = await params;
        const post = await db.blogPost.findUnique({
            where: { id }
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return NextResponse.json({ error: 'Error fetching blog post' }, { status: 500 });
    }
}

// PUT update blog post
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        const { id } = await params;
        const data = await request.json();

        const post = await db.blogPost.update({
            where: { id },
            data: {
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt,
                content: data.content,
                date: data.date,
                image: data.image,
                category: data.category,
                author: data.author
            }
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error updating blog post:', error);
        return NextResponse.json({ error: 'Error updating blog post' }, { status: 500 });
    }
}

// DELETE blog post
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        const { id } = await params;
        await db.blogPost.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return NextResponse.json({ error: 'Error deleting blog post' }, { status: 500 });
    }
}
