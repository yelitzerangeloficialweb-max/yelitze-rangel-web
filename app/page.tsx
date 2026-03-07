"use client";

import NewHero from "@/components/home/NewHero";
import WelcomeSection from "@/components/home/WelcomeSection";
import ServiceSelector from "@/components/home/ServiceSelector";
import ArchitectureSector from "@/components/home/ArchitectureSector";
import WisdomChest from "@/components/home/WisdomChest";
import NewNewsletter from "@/components/home/NewNewsletter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/shop/CartDrawer";

export default function HomePage() {
    return (
        <CartProvider>
            <div className="flex flex-col min-h-screen bg-background">
                <Header />
                <main className="flex-grow">
                    {/* New Homepage Design Stack */}
                    <NewHero />
                    <WelcomeSection />
                    <ServiceSelector />
                    <ArchitectureSector />
                    <WisdomChest />
                    <NewNewsletter />
                </main>
                <Footer />
                <CartDrawer />
            </div>
        </CartProvider>
    );
}
