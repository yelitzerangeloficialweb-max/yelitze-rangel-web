'use client';

import { useCart } from '@/context/CartContext';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
    const { items, isOpen, closeCart, removeFromCart, updateQuantity, getTotal, getItemCount } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-stone-100">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-6 h-6 text-[var(--color-secondary)]" />
                                <h2 className="text-xl font-heading text-[var(--color-primary)]">
                                    Tu Carrito ({getItemCount()})
                                </h2>
                            </div>
                            <button
                                onClick={closeCart}
                                className="p-2 rounded-full hover:bg-stone-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <ShoppingBag className="w-16 h-16 text-stone-200 mb-4" />
                                    <p className="text-stone-500 mb-6">Tu carrito está vacío</p>
                                    <button
                                        onClick={closeCart}
                                        className="text-[var(--color-secondary)] font-medium hover:underline"
                                    >
                                        Continuar comprando
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {items.map(({ product, quantity }) => (
                                        <div key={product.id} className="flex gap-4 pb-6 border-b border-stone-100 last:border-0">
                                            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-[var(--color-primary)] truncate">
                                                    {product.name}
                                                </h3>
                                                <p className="text-sm text-stone-500 mb-2">
                                                    ${product.price.toFixed(2)} USD
                                                </p>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center border border-stone-200 rounded-full">
                                                        <button
                                                            onClick={() => updateQuantity(product.id, quantity - 1)}
                                                            className="p-1.5 hover:bg-stone-100 rounded-l-full transition-colors"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="px-3 text-sm font-medium">{quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(product.id, quantity + 1)}
                                                            className="p-1.5 hover:bg-stone-100 rounded-r-full transition-colors"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(product.id)}
                                                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-bold text-[var(--color-primary)]">
                                                    ${(product.price * quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-stone-100 p-6 space-y-4 bg-stone-50">
                                <div className="flex justify-between text-lg">
                                    <span className="text-stone-600">Subtotal</span>
                                    <span className="font-bold text-[var(--color-primary)]">
                                        ${getTotal().toFixed(2)} USD
                                    </span>
                                </div>
                                <p className="text-xs text-stone-500">
                                    Envío calculado al finalizar la compra
                                </p>
                                <Link
                                    href="/checkout"
                                    onClick={closeCart}
                                    className="block w-full py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white text-center font-bold rounded-xl transition-colors"
                                >
                                    Finalizar Compra
                                </Link>
                                <button
                                    onClick={closeCart}
                                    className="block w-full py-3 text-center text-[var(--color-secondary)] font-medium hover:underline"
                                >
                                    Seguir Comprando
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
