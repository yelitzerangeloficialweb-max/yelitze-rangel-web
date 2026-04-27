import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminAuth } from '@/lib/admin-auth';

export async function GET() {
    const authError = await requireAdminAuth();
    if (authError) return authError;
    try {
        const orders = await db.order.findMany({
            include: {
                items: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error('[ORDERS_GET]', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
