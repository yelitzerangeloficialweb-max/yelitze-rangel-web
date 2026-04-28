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

export async function PATCH(req: Request) {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        const body = await req.json();
        const { id, name, email, whatsapp, city } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const updated = await db.sanateMujerRegistration.update({
            where: { id },
            data: { name, email, whatsapp, city }
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error updating workshop registration:', error);
        return NextResponse.json({ error: 'Error updating workshop registration' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await db.sanateMujerRegistration.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting workshop registration:', error);
        return NextResponse.json({ error: 'Error deleting workshop registration' }, { status: 500 });
    }
}
