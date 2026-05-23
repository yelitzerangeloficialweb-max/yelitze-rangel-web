import { db } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * One-time migration endpoint to fix product images that point to
 * ephemeral /uploads/ paths. Replaces them with permanent static assets
 * that are bundled with the deployed code.
 *
 * GET /api/admin/fix-images
 */
export async function GET() {
    const results: string[] = [];

    // Map of product slugs to their correct static image paths
    const imageFixMap: Record<string, { image: string; images: string }> = {
        'hilos-de-conexion': {
            image: '/assets/images/books/hilos-conexion-3d.png',
            images: JSON.stringify([]),
        },
        'conversaciones-con-mi-chamana': {
            image: '/assets/images/books/conversaciones-chamana-3d.png',
            images: JSON.stringify([]),
        },
        'cartas-corazon-chamanico': {
            image: '/assets/images/oraculo/oraculo-real-1.jpg',
            images: JSON.stringify([
                '/assets/images/oraculo/oraculo-real-2.jpg',
                '/assets/images/oraculo/oraculo-real-3.jpg'
            ]),
        },
    };

    try {
        for (const [slug, fix] of Object.entries(imageFixMap)) {
            try {
                const product = await db.product.findUnique({ where: { slug } });
                if (!product) {
                    results.push(`SKIP: Product "${slug}" not found in DB`);
                    continue;
                }

                // Only fix if the current image is different from the correct static image path
                const needsFix = product.image !== fix.image;
                if (!needsFix) {
                    results.push(`OK: Product "${slug}" already uses static image: ${product.image}`);
                    continue;
                }

                await db.product.update({
                    where: { slug },
                    data: {
                        image: fix.image,
                        images: fix.images,
                        featured: true,
                    },
                });
                results.push(`FIXED: Product "${slug}" image updated to ${fix.image}`);
            } catch (err: any) {
                results.push(`ERROR on "${slug}": ${err.message}`);
            }
        }

        return NextResponse.json({
            success: true,
            message: "Image fix migration completed",
            results,
        });
    } catch (error: any) {
        console.error("Fix-images migration error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
