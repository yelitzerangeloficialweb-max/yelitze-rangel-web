import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET all products
export async function GET() {
    try {
        const products = await db.product.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
    }
}

// POST create new product
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Generate slug from name if not provided
        const slug = data.slug || data.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        const product = await db.product.create({
            data: {
                slug,
                name: data.name,
                subtitle: data.subtitle || null,
                description: data.description,
                price: parseFloat(data.price),
                image: data.image || '/assets/images/shop/placeholder.jpg',
                category: data.category,
                stock: parseInt(data.stock) || 0,
                featured: data.featured || false,
                active: data.active ?? true
            }
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
    }
}
