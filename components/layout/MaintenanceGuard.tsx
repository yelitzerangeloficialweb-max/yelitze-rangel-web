'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function MaintenanceGuard({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Skip for maintenance page and assets
        if (pathname === '/maintenance' || pathname.startsWith('/api/') || pathname.includes('.')) {
            setIsChecking(false);
            return;
        }

        const checkMaintenance = async () => {
            try {
                // Check cookie manually for faster response
                const hasSession = document.cookie.includes('yelitze_access_session=true');

                if (!hasSession) {
                    // Even if the cookie is missing, we check if we should redirect
                    // This is a secondary check to middleware
                    router.push('/maintenance');
                } else {
                    setIsChecking(false);
                }
            } catch (error) {
                console.error('Maintenance check failed:', error);
                setIsChecking(false);
            }
        };

        checkMaintenance();
    }, [pathname, router]);

    // While checking, we can show a blank screen or a loading state
    // but we want to be fast. If we're not on /maintenance and not authenticated, 
    // we effectively hide the content.
    if (isChecking && pathname !== '/maintenance') {
        return (
            <div className="min-h-screen bg-[#F5EFE6] flex items-center justify-center">
                <div className="animate-pulse text-[#B8835A] font-serif italic">
                    Cargando...
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
