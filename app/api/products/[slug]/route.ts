import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { PRODUCTS as STATIC_PRODUCTS } from '@/lib/products-data';

interface RouteParams {
    params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { slug } = await params;

        // 1. Search in Database
        const product = await db.product.findUnique({
            where: { slug }
        });

        if (product) {
            // Check if 'images' needs to be parsed (since DB stores it as JSON string)
            let additionalImages: string[] = [];
            try {
                if (product.images) {
                    const parsed = JSON.parse(product.images);
                    if (Array.isArray(parsed)) {
                        additionalImages = parsed.filter(img => img !== ''); // Filter out empty slots
                    }
                }
            } catch (e) {
                console.error('Error parsing product images from DB:', e);
            }

            // Return database product mapped to match the Product interface
            return NextResponse.json({
                ...product,
                currency: 'USD',
                images: additionalImages
            });
        }

        // 2. Search in Static Products as fallback
        const staticProduct = STATIC_PRODUCTS.find(p => p.slug === slug);
        if (staticProduct) {
            return NextResponse.json(staticProduct);
        }

        return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    } catch (error) {
        console.error('Error fetching product by slug:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
