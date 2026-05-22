"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function WelcomeModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show after 1.5 seconds only if not shown before in the current session
        const hasBeenShown = localStorage.getItem("yelitze_welcome_banner_2026_shown");
        if (!hasBeenShown) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem("yelitze_welcome_banner_2026_shown", "true");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-10">
                    {/* Backdrop Overlay */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Image Lightbox Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: "spring", duration: 0.7, bounce: 0.1 }}
                        className="relative w-full max-w-4xl aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-[#B8835A]/30 z-10 group cursor-pointer bg-[#f6efe7]"
                        onClick={handleClose}
                    >
                        {/* The Welcome Banner Image */}
                        <Image
                            src="/assets/images/welcome-banner.png"
                            alt="Yelitze Rangel Bienvenida - Estás en el lugar que tu alma estaba buscando"
                            fill
                            sizes="(max-width: 768px) 100vw, 85vw"
                            className="object-cover sm:object-contain bg-[#f6efe7] transition-transform duration-700 group-hover:scale-[1.015]"
                            priority
                        />

                        {/* Interactive hover overlay effect to indicate clickability */}
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors duration-300 pointer-events-none" />

                        {/* Close button at the top-right corner */}
                        <button 
                            onClick={(e) => {
                                e.stopPropagation(); // Avoid triggering close twice
                                handleClose();
                            }}
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-[#8C4005] text-white/80 hover:text-white backdrop-blur-sm transition-all duration-300 shadow-md border border-white/10"
                            aria-label="Cerrar bienvenida"
                        >
                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
