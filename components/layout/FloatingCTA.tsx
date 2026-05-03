'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';

export default function FloatingCTA() {
    const pathname = usePathname();
    
    // Don't show on the landing page itself or the oracle
    if (pathname === '/sanate-mujer' || pathname === '/oraculo') return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="fixed bottom-8 right-8 z-[100] hidden sm:block"
            >
                <Link
                    href="/sanate-mujer"
                    className="group relative flex items-center gap-3 bg-[#B8835A] text-white px-6 py-4 rounded-full shadow-[0_10px_30px_rgba(184,131,90,0.4)] hover:bg-[#a0724e] transition-all duration-300 hover:-translate-y-1"
                >
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-ping pointer-events-none opacity-40"></div>
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest leading-none opacity-80">Workshop Gratis</span>
                        <span className="text-sm font-heading font-medium">Inscribirme a Sánate Mujer</span>
                    </div>
                </Link>
            </motion.div>
            
            {/* Mobile version - more compact */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-0 left-0 right-0 z-[100] sm:hidden p-4 bg-gradient-to-t from-white/90 to-transparent"
            >
                <Link
                    href="/sanate-mujer"
                    className="w-full flex items-center justify-center gap-3 bg-[#B8835A] text-white py-4 rounded-2xl shadow-xl font-bold uppercase tracking-widest text-xs"
                >
                    <Sparkles className="w-4 h-4" />
                    Inscribirme a Sánate Mujer
                </Link>
            </motion.div>
        </AnimatePresence>
    );
}
