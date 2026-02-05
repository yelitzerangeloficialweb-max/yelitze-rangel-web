'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

interface CartButtonProps {
    className?: string;
    iconColor?: string;
}

export default function CartButton({ className = '', iconColor }: CartButtonProps) {
    const { toggleCart, getItemCount } = useCart();
    const count = getItemCount();

    return (
        <button
            onClick={toggleCart}
            className={`relative p-2 rounded-full transition-colors hover:bg-primary/5 ${className}`}
        >
            <ShoppingCart className={`w-5 h-5 ${iconColor || ''}`} />

            <AnimatePresence>
                {count > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-secondary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                        {count > 99 ? '99+' : count}
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
}
