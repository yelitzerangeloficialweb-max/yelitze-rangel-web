import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Skip middleware for static files, API routes, and the maintenance page itself
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api/auth/maintenance') ||
        pathname === '/maintenance' ||
        pathname.includes('.') // for images, favicons, etc.
    ) {
        return NextResponse.next();
    }

    // 2. Check if maintenance mode is enabled
    const maintenanceMode = process.env.MAINTENANCE_MODE === 'true';

    if (maintenanceMode) {
        // 3. Check for the maintenance auth cookie
        const isAuthenticated = request.cookies.get('maintenance_auth')?.value === 'true';

        if (!isAuthenticated) {
            // Redirect to maintenance page if not authenticated
            const url = request.nextUrl.clone();
            url.pathname = '/maintenance';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
