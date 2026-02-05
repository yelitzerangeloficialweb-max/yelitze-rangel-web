'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/shop/CartDrawer';

export default function WebsiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <CartProvider>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
                <CartDrawer />
            </div>
        </CartProvider>
    );
}
