import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const posts = await db.blogPost.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching public blog posts:', error);
        return NextResponse.json({ error: 'Error fetching blog posts' }, { status: 500 });
    }
}
