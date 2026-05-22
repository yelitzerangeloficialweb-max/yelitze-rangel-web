"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const slides = [
    {
        id: "sanate-mujer",
        badge: "Workshop Gratuito",
        title: "SÁNATE MUJER",
        subtitle: "libera tus lealtades invisibles",
        button: "RESERVAR MI CUPO",
        link: "/sanate-mujer",
        image: "/assets/images/landing/yelitze-sanate-hero.jpg",
        position: "center"
    },
    {
        id: "test",
        badge: "Test Gratuito",
        title: "DESCUBRE TU HISTORIA",
        subtitle: "los patrones que guía tu vida",
        button: "INICIA MI EXPLORACIÓN",
        link: "/tests",
        image: "/assets/images/hero/hero-new-bg.jpg",
        position: "center"
    },
    {
        id: "board",
        badge: "Método",
        title: "Coaching Ancestral",
        subtitle: "La anatomía del alma",
        button: "CONOCE EL TABLERO",
        link: "/servicios/coaching-ancestral",
        image: "/assets/images/hero/hero-fusion-group.jpg",
        position: "center"
    },
    {
        id: "services",
        badge: "Acompañamiento",
        title: "SANA DESDE LA RAÍZ",
        subtitle: "sesiones que transforman tu realidad",
        button: "VER SERVICIOS",
        link: "/servicios",
        image: "/assets/images/hero/hero-services-new-bg.jpg",
        position: "center 30%"
    },
    {
        id: "books",
        badge: "La Herramienta",
        title: "SABIDURÍA EN TUS MANOS",
        subtitle: "guías para tu evolución espiritual",
        button: "IR A LA TIENDA",
        link: "/libros",
        image: "/assets/images/hero/hero-books-bg.jpg",
        position: "center"
    }
];

export default function NewHero() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-[95vh] min-h-[750px] flex items-center justify-center bg-[#2D2926] z-20 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={slides[current].image}
                            alt={slides[current].title}
                            fill
                            className="object-cover"
                            style={{ objectPosition: slides[current].position || 'center' }}
                            priority
                        />
                        {/* Global Overlays - Softer for more visibility */}
                        <div className="absolute inset-0 bg-black/20" />
                        
                        {/* Bottom Seam Overlay */}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    </div>

                    {/* Content Container */}
                    <div className="container mx-auto px-4 relative z-10 h-full flex flex-col items-center justify-center text-center text-white pt-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1.2 }}
                            className="space-y-12"
                        >
                            <motion.span 
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 1.2 }}
                                className="block text-[10px] md:text-xs font-guide font-bold tracking-[0.7em] uppercase text-white/80"
                            >
                                {slides[current].badge}
                            </motion.span>

                            <div className="space-y-2 md:space-y-0">
                                <motion.h1 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1, duration: 1.5 }}
                                    className="text-4xl md:text-[60pt] font-sans font-semibold tracking-[0.02em] leading-none uppercase drop-shadow-2xl"
                                >
                                    {slides[current].title}
                                </motion.h1>
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.5, duration: 1.5 }}
                                    className="text-4xl md:text-[5.5rem] font-script text-white/95 leading-none drop-shadow-xl -mt-2 md:-mt-4 tracking-[0.03em]"
                                >
                                    {slides[current].subtitle}
                                </motion.p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2, duration: 1 }}
                                className="pt-0 flex justify-center -translate-y-8 md:-translate-y-12"
                            >
                                <Link
                                    href={slides[current].link}
                                    className="inline-block px-16 py-6 text-sm md:text-base font-body font-bold tracking-[0.25em] uppercase border border-[#b7835a] text-white rounded-full hover:bg-[#b7835a] hover:text-white transition-all bg-transparent backdrop-blur-md shadow-2xl group"
                                >
                                    {slides[current].button}
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>
 
            {/* Dots Navigation - Fixed Outside AnimatePresence */}
            <div className="absolute bottom-32 md:bottom-40 left-1/2 -translate-x-1/2 z-40 flex gap-4">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`transition-all duration-700 rounded-full ${
                            current === idx 
                            ? "w-10 h-1.5 bg-[#b7835a]" 
                            : "w-2 h-1.5 bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Organic Bottom Divider - WHITE BRUSH (FIXED) */}
            <div className="absolute bottom-0 left-[-100%] right-[-100%] z-30 pointer-events-none h-48 md:h-[600px] overflow-hidden">
                <div 
                    className="w-full h-full"
                    style={{
                        maskImage: 'url(/images/home_redesign/Lineas-Hero.svg)',
                        WebkitMaskImage: 'url(/images/home_redesign/Lineas-Hero.svg)',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'bottom center',
                        WebkitMaskPosition: 'bottom center',
                        maskSize: '100% 100%',
                        WebkitMaskSize: '100% 100%',
                        backgroundColor: 'white'
                    }} 
                />
            </div>
        </section>
    );
}
