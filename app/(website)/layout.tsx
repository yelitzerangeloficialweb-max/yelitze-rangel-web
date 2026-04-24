'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageGlows from '@/components/layout/PageGlows';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/shop/CartDrawer';
import { usePathname } from 'next/navigation';

export default function WebsiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isSomaticTest = pathname.startsWith('/test-somatico');

    return (
        <CartProvider>
            <div className="flex flex-col min-h-screen relative overflow-x-hidden">
                <PageGlows />
                {!isSomaticTest && <Header />}
                <main className="flex-grow relative z-10">
                    {children}
                </main>
                {!isSomaticTest && <Footer />}
                <CartDrawer />
            </div>
        </CartProvider>
    );
}
