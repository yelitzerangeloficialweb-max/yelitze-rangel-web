import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { password } = await request.json();
        const sitePassword = process.env.ADMIN_PASSWORD || process.env.SITE_PASSWORD || 'lanzamiento2024';

        if (password === sitePassword) {
            const cookieStore = await cookies();

            // Set secure cookie valid for 30 days
            cookieStore.set('yelitze_access_session_v2', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { success: false, message: 'Contraseña incorrecta' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
