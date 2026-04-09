import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminAuth } from '@/lib/admin-auth';

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET single product
export async function GET(request: NextRequest, { params }: RouteParams) {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        const { id } = await params;
        const product = await db.product.findUnique({
            where: { id }
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ error: 'Error fetching product' }, { status: 500 });
    }
}

// PUT update product
export async function PUT(request: NextRequest, { params }: RouteParams) {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        const { id } = await params;
        const data = await request.json();

        const product = await db.product.update({
            where: { id },
            data: {
                name: data.name,
                subtitle: data.subtitle || null,
                description: data.description,
                price: parseFloat(data.price),
                image: data.image,
                category: data.category,
                stock: parseInt(data.stock) || 0,
                featured: data.featured || false,
                active: data.active ?? true
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
    }
}

// DELETE product
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        const { id } = await params;
        await db.product.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
    }
}
