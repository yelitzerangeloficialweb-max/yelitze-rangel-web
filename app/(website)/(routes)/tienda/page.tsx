'use client';

import { useState } from 'react';
import { PRODUCTS, CATEGORY_LABELS, ProductCategory } from '@/lib/products-data';
import ProductCard from '@/components/shop/ProductCard';
import { FadeIn, StaggerContainer } from '@/components/ui/motion';
import { Sparkles, BookOpen, Gem, Star } from 'lucide-react';

const CATEGORY_ICONS: Record<ProductCategory, typeof BookOpen> = {
    libro: BookOpen,
    oraculo: Star,
    accesorio: Gem
};

export default function TiendaPage() {
    const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');

    const filteredProducts = activeCategory === 'all'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === activeCategory);

    const categories: (ProductCategory | 'all')[] = ['all', 'libro', 'oraculo', 'accesorio'];

    return (
        <main className="bg-[#FAF9F6] min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-b from-[var(--color-primary)] to-[#1a1510] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-secondary)] rounded-full blur-[100px]" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--color-secondary)] rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
                            <Sparkles className="w-4 h-4 text-[var(--color-secondary)]" />
                            <span className="text-sm font-medium tracking-wider uppercase">Productos Sagrados</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-heading mb-6 font-bold">
                            Tienda
                        </h1>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto italic">
                            Herramientas para tu viaje de sanación y autoconocimiento
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-8 border-b border-stone-100 sticky top-0 bg-[#FAF9F6]/95 backdrop-blur-md z-40">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map(cat => {
                            const isActive = activeCategory === cat;
                            const Icon = cat === 'all' ? Sparkles : CATEGORY_ICONS[cat as ProductCategory];
                            const label = cat === 'all' ? 'Todos' : CATEGORY_LABELS[cat as ProductCategory];

                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`
                                        flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all
                                        ${isActive
                                            ? 'bg-[var(--color-primary)] text-white shadow-lg'
                                            : 'bg-white text-stone-600 border border-stone-200 hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]'
                                        }
                                    `}
                                >
                                    <Icon className="w-4 h-4" />
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </StaggerContainer>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-stone-500 text-lg italic">
                                No hay productos en esta categoría todavía.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Trust Badges */}
            <section className="py-16 bg-white border-t border-stone-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
                        <div className="space-y-3">
                            <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto">
                                <span className="text-2xl">📦</span>
                            </div>
                            <h3 className="font-bold text-[var(--color-primary)]">Envío Cuidadoso</h3>
                            <p className="text-sm text-stone-500">Empaque especial para proteger tu pedido</p>
                        </div>
                        <div className="space-y-3">
                            <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto">
                                <span className="text-2xl">💳</span>
                            </div>
                            <h3 className="font-bold text-[var(--color-primary)]">Pago Seguro</h3>
                            <p className="text-sm text-stone-500">PayPal, Zelle o WhatsApp</p>
                        </div>
                        <div className="space-y-3">
                            <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto">
                                <span className="text-2xl">💜</span>
                            </div>
                            <h3 className="font-bold text-[var(--color-primary)]">Hecho con Amor</h3>
                            <p className="text-sm text-stone-500">Cada producto lleva una intención sagrada</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
