import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminAuth } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        const [
            productsCount,
            ordersCount,
            workshopCount,
            venezuelaCount,
            blogCount,
            testsCount
        ] = await Promise.all([
            db.product.count(),
            db.order.count(),
            db.sanateMujerRegistration.count(),
            db.venezuelaEnElCuerpoRegistration.count(),
            db.blogPost.count(),
            db.testResult.count()
        ]);

        // Get recent registrations for activity feed
        const recentWorkshop = await db.sanateMujerRegistration.findMany({
            take: 3,
            orderBy: { createdAt: 'desc' },
            select: { name: true, createdAt: true }
        });

        const recentOrders = await db.order.findMany({
            take: 3,
            orderBy: { createdAt: 'desc' },
            select: { customerName: true, total: true, createdAt: true }
        });

        return NextResponse.json({
            counts: {
                products: productsCount,
                orders: ordersCount,
                workshop: workshopCount,
                venezuela: venezuelaCount,
                blog: blogCount,
                tests: testsCount
            },
            recent: {
                workshop: recentWorkshop,
                orders: recentOrders
            }
        });
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        return NextResponse.json({ error: 'Error fetching admin stats' }, { status: 500 });
    }
}
