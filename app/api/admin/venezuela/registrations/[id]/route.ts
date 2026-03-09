import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();
        const { name, email, whatsapp, city } = body;

        const registration = await db.venezuelaEnElCuerpoRegistration.update({
            where: { id: params.id },
            data: {
                name,
                email,
                whatsapp,
                city,
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
    { params }: { params: { id: string } }
) {
    try {
        await db.venezuelaEnElCuerpoRegistration.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: 'Registration deleted successfully' });
    } catch (error) {
        console.error('Delete registration error:', error);
        return NextResponse.json({ error: 'Failed to delete registration' }, { status: 500 });
    }
}
