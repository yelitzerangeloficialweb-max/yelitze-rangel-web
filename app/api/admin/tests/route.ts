import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminAuth } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        const results = await db.testResult.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(results);
    } catch (error) {
        console.error('Error fetching test results:', error);
        return NextResponse.json({ error: 'Error fetching test results' }, { status: 500 });
    }
}
