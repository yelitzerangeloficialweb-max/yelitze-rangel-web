import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Skip middleware for static files and API routes
    const isAsset = pathname.includes('.') || pathname.startsWith('/_next') || pathname.startsWith('/api/auth/maintenance');
    const isMaintenancePage = pathname === '/maintenance';

    if (isAsset) {
        return NextResponse.next();
    }

    // 2. Check maintenance mode from environment variable
    const maintenanceMode = process.env.MAINTENANCE_MODE?.toLowerCase() === 'true';

    // 3. Check for the maintenance auth cookie
    const authCookie = request.cookies.get('yelitze_access_session');
    const isAuthenticated = authCookie?.value === 'true';

    if (maintenanceMode) {
        if (isAuthenticated) {
            // If already authenticated and trying to access maintenance page, redirect to home
            if (isMaintenancePage) {
                const url = request.nextUrl.clone();
                url.pathname = '/';
                return NextResponse.redirect(url);
            }
            return NextResponse.next();
        } else {
            // Not authenticated, redirect to maintenance unless already there
            if (!isMaintenancePage) {
                const url = request.nextUrl.clone();
                url.pathname = '/maintenance';
                return NextResponse.redirect(url);
            }
            return NextResponse.next();
        }
    } else {
        // Maintenance mode OFF: redirect away from maintenance page if user manually tries to visit it
        if (isMaintenancePage) {
            const url = request.nextUrl.clone();
            url.pathname = '/';
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
