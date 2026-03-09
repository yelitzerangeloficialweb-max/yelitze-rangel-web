import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

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
