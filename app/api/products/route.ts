import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET active products for the store
export async function GET() {
    try {
        const products = await db.product.findMany({
            where: { active: true },
            orderBy: [
                { featured: 'desc' },
                { createdAt: 'desc' }
            ]
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
    }
}
