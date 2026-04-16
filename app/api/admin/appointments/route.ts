import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminAuth } from '@/lib/admin-auth';

// GET all appointments for admin
export async function GET() {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        const appointments = await db.appointment.findMany({
            orderBy: { date: 'desc' }
        });
        return NextResponse.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return NextResponse.json({ error: 'Error fetching appointments' }, { status: 500 });
    }
}
