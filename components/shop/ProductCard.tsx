'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product, CATEGORY_LABELS } from '@/lib/products-data';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

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
            className="group bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500"
        >
            <Link href={`/tienda/${product.slug}`}>
                <div className="relative aspect-square overflow-hidden bg-stone-50">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase text-stone-600 border border-white/50">
                            {CATEGORY_LABELS[product.category]}
                        </span>
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={handleAddToCart}
                            className="p-3 bg-[var(--color-primary)] text-white rounded-full shadow-lg hover:bg-[var(--color-secondary)] transition-colors"
                        >
                            <ShoppingCart className="w-4 h-4" />
                        </button>
                        <span className="p-3 bg-white text-[var(--color-primary)] rounded-full shadow-lg">
                            <Eye className="w-4 h-4" />
                        </span>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-heading text-[var(--color-primary)] mb-1 group-hover:text-[var(--color-secondary)] transition-colors">
                        {product.name}
                    </h3>
                    {product.subtitle && (
                        <p className="text-sm text-stone-500 italic mb-3">{product.subtitle}</p>
                    )}
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-[var(--color-secondary)]">
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-stone-400">USD</span>
                    </div>
                </div>
            </Link>

            <div className="px-6 pb-6">
                <button
                    onClick={handleAddToCart}
                    className="w-full py-3 border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold rounded-xl hover:bg-[var(--color-primary)] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                    <ShoppingCart className="w-4 h-4" />
                    Añadir al Carrito
                </button>
            </div>
        </motion.div>
    );
}
