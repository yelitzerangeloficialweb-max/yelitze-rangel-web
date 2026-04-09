import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminAuth } from '@/lib/admin-auth';

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        const { id } = await params;

        // Check current status
        const existing = await db.venezuelaEnElCuerpoRegistration.findUnique({
            where: { id }
        });

        if (existing?.scanned) {
            return NextResponse.json({ error: 'Already scanned', alreadyScanned: true }, { status: 400 });
        }

        const registration = await db.venezuelaEnElCuerpoRegistration.update({
            where: { id },
            data: {
                scanned: true,
                scannedAt: new Date(),
            },
        });

        // Schedule post-event email for 6:00 PM today (27 March 2026)
        try {
            const { sendVenezuelaPostEventEmail } = await import('@/lib/mail');
            const scheduledTime = '2026-03-27T18:00:00-04:00';
            const now = new Date();
            const scheduledDate = new Date(scheduledTime);

            if (now < scheduledDate) {
                // Schedule for 6 PM
                await sendVenezuelaPostEventEmail({
                    email: registration.email,
                    name: registration.name,
                    scheduledAt: scheduledTime
                });
            } else {
                // Already past 6 PM, send immediately
                await sendVenezuelaPostEventEmail({
                    email: registration.email,
                    name: registration.name
                });
            }
        } catch (mailError) {
            console.error('Failed to schedule/send post-event email during scan:', mailError);
        }

        return NextResponse.json(registration);
    } catch (error) {
        console.error('Scan error:', error);
        return NextResponse.json({ error: 'Failed to mark as scanned' }, { status: 500 });
    }
}
