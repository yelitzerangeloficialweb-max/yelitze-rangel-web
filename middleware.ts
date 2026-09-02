import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Skip middleware for static files, API routes, and specific public pages
    const isAsset = pathname.includes('.') || pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/cdn-cgi');
    const isMaintenancePage = pathname === '/maintenance';
    const isSanateMujer = pathname.startsWith('/sanate-mujer');
    const isVenezuelaCaracas = pathname.startsWith('/venezuela-en-el-cuerpo-caracas');
    const isArquitectura = pathname.startsWith('/arquitectura-de-vida-intencional');

    if (isAsset || isSanateMujer || isVenezuelaCaracas || isArquitectura) {
        return NextResponse.next();
    }

    // 2. Check for the auth cookie (v2 to invalidate old sessions)
    const authCookie = request.cookies.get('yelitze_access_session_v2');
    const isAuthenticated = authCookie?.value === 'true';

    // 3. Admin routes handling
    if (pathname.startsWith('/admin')) {
        const isLoginPage = pathname === '/admin/login';

        if (!isAuthenticated) {
            if (!isLoginPage) {
                const url = request.nextUrl.clone();
                url.pathname = '/admin/login';
                url.search = `redirect=${encodeURIComponent(pathname)}`;
                return NextResponse.redirect(url);
            }
            return NextResponse.next();
        } else {
            // Already authenticated, redirect away from login
            if (isLoginPage) {
                const url = request.nextUrl.clone();
                url.pathname = '/admin';
                url.search = '';
                return NextResponse.redirect(url);
            }
            return NextResponse.next();
        }
    }

    // 4. Check maintenance mode from env, default to false if not set
    const maintenanceMode = process.env.MAINTENANCE_MODE === 'true';

    console.log(`[Middleware] Path: ${pathname} | Maintenance: ${maintenanceMode} | Auth: ${isAuthenticated}`);

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
