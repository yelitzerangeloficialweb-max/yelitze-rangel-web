import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminAuth } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        const registrations = await db.sanateMujerRegistration.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(registrations);
    } catch (error) {
        console.error('Error fetching workshop registrations:', error);
        return NextResponse.json({ error: 'Error fetching workshop registrations' }, { status: 500 });
    }
}
