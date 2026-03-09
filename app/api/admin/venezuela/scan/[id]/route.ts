import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        const registration = await db.venezuelaEnElCuerpoRegistration.update({
            where: { id },
            data: {
                scanned: true,
                scannedAt: new Date(),
            },
        });

        return NextResponse.json(registration);
    } catch (error) {
        console.error('Scan error:', error);
        return NextResponse.json({ error: 'Failed to mark as scanned' }, { status: 500 });
    }
}
