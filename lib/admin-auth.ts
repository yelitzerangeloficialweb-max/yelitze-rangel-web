import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Verifica que la solicitud provenga de una sesión admin autenticada.
 * Retorna un NextResponse 401 si no hay acceso; null si está autorizado.
 */
export async function requireAdminAuth(): Promise<NextResponse | null> {
    const cookieStore = await cookies();
    const hasAccess = cookieStore.get('yelitze_access_session_v2')?.value === 'true';
    if (!hasAccess) {
        return NextResponse.json({ error: 'Acceso denegado' }, { status: 401 });
    }
    return null;
}
