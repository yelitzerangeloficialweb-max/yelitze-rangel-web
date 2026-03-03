'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ProductCard from '@/components/shop/ProductCard';
import { FadeIn, StaggerContainer } from '@/components/ui/motion';
import { Sparkles, ArrowRight, ArrowDown, BookOpen, Star, Gem, Loader2 } from 'lucide-react';
import { EyeGeometricIcon } from '@/components/icons/CustomIcons';
import { PRODUCTS as STATIC_PRODUCTS, CATEGORY_LABELS, ProductCategory } from '@/lib/products-data';

interface Product {
    id: string;
    slug: string;
    name: string;
    subtitle?: string;
    description: string;
    price: number;
    currency: 'USD';
    image: string;
    category: ProductCategory;
    stock: number;
    featured?: boolean;
}

const CATEGORY_ICONS: Record<ProductCategory, typeof BookOpen> = {
    libro: BookOpen,
    oraculo: Star,
    accesorio: Gem
};

export default function TiendaPage() {
    const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    const dbProducts = await res.json();
                    // Use DB products if available, otherwise fall back to static
                    setProducts(dbProducts.length > 0 ? dbProducts : STATIC_PRODUCTS);
                } else {
                    setProducts(STATIC_PRODUCTS);
                }
            } catch {
                // Fall back to static products on error
                setProducts(STATIC_PRODUCTS);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const filteredProducts = activeCategory === 'all'
        ? products
        : products.filter(p => p.category === activeCategory);

    const categories: (ProductCategory | 'all')[] = ['all', 'libro', 'oraculo', 'accesorio'];

    return (
        <main className="bg-[#0a0a0a] min-h-screen">
            {/* Hero Section - Crónicas del Alma Layout */}
            <section className="relative w-full bg-[#0a0a0a] text-white border-b border-white/5 overflow-hidden flex flex-col md:flex-row items-stretch min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
                {/* Right side: Image Background (visible on mobile, takes right half on desktop) */}
                <div className="absolute md:relative inset-0 md:inset-auto md:w-1/2 md:ml-auto h-[400px] md:h-auto z-0 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />
                    <Image
                        src="/assets/images/cronicas-del-alma-hero.png"
                        alt="Crónicas del Alma"
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-1000"
                        priority
                    />
                </div>

                {/* Left side: Content */}
                <div className="container mx-auto px-4 relative z-20 flex flex-col justify-end md:justify-center md:absolute md:inset-0 pointer-events-none pb-12 pt-[250px] md:py-0">
                    {/* Watermark Logo */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] lg:w-[800px] lg:h-[800px] opacity-[0.03] pointer-events-none z-0">
                        <Image
                            src="/assets/images/watermark-logo.png"
                            alt="Watermark Logo"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <div className="max-w-2xl md:w-[55%] pointer-events-auto relative z-10">
                        <FadeIn>
                            <div className="inline-flex items-center px-5 py-2 rounded-full border border-[var(--color-accent)]/50 text-[var(--color-accent)] font-medium text-[10px] md:text-xs tracking-[0.2em] uppercase mb-8 shadow-lg bg-[#0a0a0a]/50 backdrop-blur-sm">
                                <span>Letras que Sanan</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-heading font-normal tracking-wide drop-shadow-2xl text-white mb-6 leading-[0.9]">
                                Crónicas<br />
                                del Alma
                            </h1>

                            <p className="text-base md:text-lg text-white/70 font-light italic leading-relaxed max-w-md mb-10 drop-shadow-md">
                                Reflexiones profundas, sabiduría ancestral y herramientas sistémicas para acompañar tu proceso de evolución.
                            </p>

                            <a href="#explorar" className="inline-flex items-center gap-3 text-white hover:text-[var(--color-accent)] transition-colors text-xs md:text-sm tracking-widest font-bold group">
                                Explorar la Bitácora
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section id="explorar" className="py-10 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl sticky top-0 z-40">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex overflow-x-auto no-scrollbar gap-4 pb-2 md:pb-0 md:justify-center">
                        {categories.map(cat => {
                            const isActive = activeCategory === cat;
                            const Icon = cat === 'all' ? EyeGeometricIcon : CATEGORY_ICONS[cat as ProductCategory];
                            const label = cat === 'all' ? 'Todos' : CATEGORY_LABELS[cat as ProductCategory];

                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`
                                        flex items-center gap-2 px-6 py-3 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase transition-all whitespace-nowrap
                                        ${isActive
                                            ? 'border border-[var(--color-accent)] text-[var(--color-accent)] shadow-[0_0_15px_rgba(184,131,90,0.2)]'
                                            : 'border border-white/10 text-white/60 hover:border-white/30 hover:text-white'
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
            <section className="py-24 bg-[#0a0a0a]">
                <div className="container mx-auto px-4 max-w-7xl">
                    {loading ? (
                        <div className="flex items-center justify-center py-32">
                            <Loader2 className="w-10 h-10 animate-spin text-[var(--color-accent)]" />
                        </div>
                    ) : (
                        <>
                            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </StaggerContainer>

                            {filteredProducts.length === 0 && (
                                <div className="text-center py-32">
                                    <p className="text-white/40 text-xl italic font-heading">
                                        No hay productos en esta categoría todavía.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Trust Badges */}
            <section className="py-20 bg-[#111111] border-t border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto text-center">
                        <div className="space-y-4">
                            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mx-auto bg-black/50 shadow-inner">
                                <span className="text-2xl opacity-80">📦</span>
                            </div>
                            <h3 className="font-heading text-xl text-white italic">Envío Cuidadoso</h3>
                            <p className="text-sm text-white/50 leading-relaxed font-light">Empaque especial y detallado<br />para proteger tu pedido.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mx-auto bg-black/50 shadow-inner">
                                <span className="text-2xl opacity-80">💳</span>
                            </div>
                            <h3 className="font-heading text-xl text-white italic">Pago Seguro</h3>
                            <p className="text-sm text-white/50 leading-relaxed font-light">Integración con PayPal,<br />Zelle o WhatsApp.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mx-auto bg-black/50 shadow-inner">
                                <span className="text-2xl opacity-80">💜</span>
                            </div>
                            <h3 className="font-heading text-xl text-white italic">Hecho con Amor</h3>
                            <p className="text-sm text-white/50 leading-relaxed font-light">Cada producto lleva en sí<br />una intención sagrada.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
