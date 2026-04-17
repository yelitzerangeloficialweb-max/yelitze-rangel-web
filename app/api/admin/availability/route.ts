import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminAuth } from '@/lib/admin-auth';
import { ensureAvailabilityTables } from '@/lib/db-init';

// GET availability for admin (all configured days)
export async function GET(request: NextRequest) {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        await ensureAvailabilityTables();
        const availability = await db.availability.findMany({
            orderBy: { date: 'asc' }
        });
        return NextResponse.json(availability);
    } catch (error) {
        console.error('Error fetching availability:', error);
        return NextResponse.json({ error: 'Error fetching availability' }, { status: 500 });
    }
}

// POST/PUT availability (upsert)
export async function POST(request: NextRequest) {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        await ensureAvailabilityTables();
        const { date, morningEnabled, afternoonEnabled } = await request.json();
        
        if (!date) {
            return NextResponse.json({ error: 'Fecha requerida' }, { status: 400 });
        }

        // Create a TRUE Midnight UTC date from the face value of the raw date string/object
        const rawDate = new Date(date);
        const dateObj = new Date(Date.UTC(rawDate.getUTCFullYear(), rawDate.getUTCMonth(), rawDate.getUTCDate()));

        const availability = await db.availability.upsert({
            where: { date: dateObj },
            update: {
                morningEnabled,
                afternoonEnabled
            },
            create: {
                date: dateObj,
                morningEnabled,
                afternoonEnabled
            }
        });

        return NextResponse.json(availability);
    } catch (error) {
        console.error('Error updating availability:', error);
        return NextResponse.json({ 
            error: 'Error updating availability',
            details: error instanceof Error ? error.message : 'Error desconocido'
        }, { status: 500 });
    }
}
