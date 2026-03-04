"use client";

import HeroSlider from "@/components/ui/HeroSlider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/shop/CartDrawer";

export default function HomePage() {
    return (
        <CartProvider>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    <HeroSlider />
                </main>
                <Footer />
                <CartDrawer />
            </div>
        </CartProvider>
    );
}
