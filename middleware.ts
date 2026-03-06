import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Skip middleware for static files, API routes, and the maintenance page itself
    const isAsset = pathname.includes('.') || pathname.startsWith('/_next') || pathname.startsWith('/api/auth/maintenance');
    const isMaintenancePage = pathname === '/maintenance';

    console.log('--- Middleware Request ---');
    console.log('Path:', pathname);
    console.log('isAsset:', isAsset);
    console.log('isMaintenancePage:', isMaintenancePage);

    if (isAsset || isMaintenancePage) {
        return NextResponse.next();
    }

    // 2. Force maintenance mode to true as requested by the user
    const maintenanceMode = (process.env.MAINTENANCE_MODE?.toLowerCase() === 'true') || true;
    console.log('Maintenance Mode Active:', maintenanceMode);

    if (maintenanceMode) {
        // 3. Check for the maintenance auth cookie
        const authCookie = request.cookies.get('yelitze_access_session');
        console.log('Access Cookie Value:', authCookie?.value);
        const isAuthenticated = authCookie?.value === 'true';
        console.log('Is Authenticated:', isAuthenticated);

        if (!isAuthenticated) {
            console.log('Redirecting to /maintenance');
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
