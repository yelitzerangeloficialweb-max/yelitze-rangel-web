'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingWhatsApp() {
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Show the tooltip after 2.5 seconds for a gentle entry
        const timer = setTimeout(() => {
            setShowTooltip(true);
        }, 2500);

        // Hide tooltip automatically after 8 seconds so it's not intrusive
        const hideTimer = setTimeout(() => {
            setShowTooltip(false);
        }, 10500);

        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    const whatsappUrl = "https://wa.me/584142353431?text=Hola%20Yelitze,%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n.";

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex items-center gap-3 pointer-events-none">
            {/* Tooltip / Label */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 10, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="bg-stone-900/90 text-white backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/10 flex items-center gap-2 pointer-events-auto max-w-[220px] md:max-w-none"
                    >
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                        <span className="text-xs font-heading font-medium tracking-wide">
                            ¿Cómo puedo ayudarte hoy?
                        </span>
                        <button 
                            onClick={() => setShowTooltip(false)}
                            className="ml-2 text-white/40 hover:text-white text-[10px] transition-colors"
                            aria-label="Cerrar tooltip"
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Float Button */}
            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="pointer-events-auto relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#34E073] text-white shadow-[0_15px_30px_rgba(37,211,102,0.35)] cursor-pointer group"
                aria-label="Contactar por WhatsApp"
            >
                {/* Glowing Outer Rings */}
                <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping opacity-50 pointer-events-none" />
                <span className="absolute inset-0 rounded-full border border-white/20 scale-100 group-hover:scale-110 transition-transform duration-500 pointer-events-none" />

                {/* Glassmorphic overlay on hover */}
                <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />

                {/* WhatsApp Logo SVG */}
                <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8 fill-current drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.729-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.012 14.12 1.01 11.5 1.01c-5.436 0-9.86 4.37-9.864 9.8 0 1.958.525 3.869 1.517 5.568L2.09 20.738l4.557-1.584zM18.25 14.88c-.34-.17-2.013-.99-2.324-1.1-.311-.115-.539-.17-.763.17-.224.34-.868 1.1-1.064 1.325-.196.225-.392.25-.732.08-.34-.17-1.436-.53-2.736-1.69-1.012-.9-1.695-2.012-1.895-2.35-.2-.34-.02-.52.15-.69.153-.15.34-.4.51-.6.17-.2.22-.34.34-.57.112-.23.056-.43-.028-.6-.084-.17-.763-1.84-.105-2.24-.306-.72-.63-.619-.862-.619-.224-.007-.48-.01-.735-.01-.256 0-.671.1-1.024.48-.353.38-1.347 1.32-1.347 3.218 0 1.897 1.38 3.73 1.573 3.99.193.26 2.7 4.11 6.54 5.77 3.84 1.66 3.84 1.11 4.53 1.04.69-.07 2.013-.82 2.294-1.58.28-.76.28-1.42.196-1.56-.084-.14-.31-.225-.65-.395z" />
                </svg>
            </motion.a>
        </div>
    );
}
