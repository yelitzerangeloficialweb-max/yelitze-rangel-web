import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminAuth } from '@/lib/admin-auth';

export async function GET() {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        const registrations = await db.venezuelaEnElCuerpoRegistration.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(registrations);
    } catch (error) {
        console.error('Fetch registrations error:', error);
        return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
    }
}
