import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminAuth } from '@/lib/admin-auth';

export async function POST() {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        const registrations = await db.venezuelaEnElCuerpoRegistration.findMany({
            orderBy: { createdAt: 'asc' }
        });

        const seenEmails = new Set();
        const seenPhones = new Set();
        const idsToDelete = [];

        for (const reg of registrations) {
            const email = reg.email.toLowerCase().trim();
            const phone = reg.whatsapp.trim();

            if (seenEmails.has(email) || seenPhones.has(phone)) {
                idsToDelete.push(reg.id);
            } else {
                seenEmails.add(email);
                seenPhones.add(phone);
            }
        }

        if (idsToDelete.length > 0) {
            await db.venezuelaEnElCuerpoRegistration.deleteMany({
                where: {
                    id: { in: idsToDelete }
                }
            });
        }

        return NextResponse.json({
            message: `Limpieza completada. Se eliminaron ${idsToDelete.length} registros duplicados.`,
            deletedCount: idsToDelete.length
        });
    } catch (error) {
        console.error('Deduplication error:', error);
        return NextResponse.json({ error: 'Error al eliminar duplicados' }, { status: 500 });
    }
}
