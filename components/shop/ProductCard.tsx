'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product, CATEGORY_LABELS } from '@/lib/products-data';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { CartThinIcon, EyeGeometricIcon } from '@/components/icons/CustomIcons';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-[#111111] overflow-hidden border border-white/5 shadow-lg hover:shadow-2xl hover:border-[var(--color-accent)]/80 transition-all duration-500"
        >
            <Link href={`/tienda/${product.slug}`}>
                <div className="relative aspect-square overflow-hidden bg-black/40">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md text-[9px] font-bold tracking-[0.2em] uppercase text-white/80 border border-white/20">
                            {CATEGORY_LABELS[product.category]}
                        </span>
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={handleAddToCart}
                            className="p-3 bg-[var(--color-accent)] text-black rounded-full shadow-lg hover:bg-white transition-colors"
                        >
                            <CartThinIcon className="w-5 h-5" />
                        </button>
                        <span className="p-3 bg-black/80 backdrop-blur-md border border-white/20 text-white rounded-full shadow-lg">
                            <EyeGeometricIcon className="w-5 h-5" />
                        </span>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-2xl font-heading text-white mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                        {product.name}
                    </h3>
                    {product.subtitle && (
                        <p className="text-sm text-white/50 italic mb-4 font-light">{product.subtitle}</p>
                    )}
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-[var(--color-accent)]">
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-white/40 tracking-widest uppercase">USD</span>
                    </div>
                </div>
            </Link>

            <div className="px-6 pb-6">
                <button
                    onClick={handleAddToCart}
                    className="w-full py-3 border border-[var(--color-accent)] text-[var(--color-accent)] uppercase text-xs tracking-widest font-bold hover:bg-[var(--color-accent)] hover:text-black transition-all flex items-center justify-center gap-3"
                >
                    <CartThinIcon className="w-4 h-4" />
                    Añadir al Carrito
                </button>
            </div>
        </motion.div>
    );
}
