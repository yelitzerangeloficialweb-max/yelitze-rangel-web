import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { name, email, whatsapp, city, instagram, scanned, scannedAt } = body;

        const registration = await db.venezuelaEnElCuerpoRegistration.update({
            where: { id },
            data: {
                name,
                email,
                whatsapp,
                city,
                instagram,
                scanned,
                scannedAt: scannedAt === null ? null : (scannedAt ? new Date(scannedAt) : undefined),
            },
        });

        return NextResponse.json(registration);
    } catch (error) {
        console.error('Update registration error:', error);
        return NextResponse.json({ error: 'Failed to update registration' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await db.venezuelaEnElCuerpoRegistration.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Registration deleted successfully' });
    } catch (error) {
        console.error('Delete registration error:', error);
        return NextResponse.json({ error: 'Failed to delete registration' }, { status: 500 });
    }
}
