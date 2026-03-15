"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const services = [
    {
        id: "01",
        title: "Coaching Ancestral",
        tag: "PORTAL 01",
        description: "Un viaje profundo de 'Anatomía del Alma'. Utilizamos psicología sistémica y rituales para restaurar el orden en tus vínculos y propósitos.",
        cta: "ENTRAR AL PORTAL",
        link: "/servicios/coaching-ancestral",
        image: "/images/home_redesign/service_coaching.png",
        accent: "#B8835A",
    },
    {
        id: "02",
        title: "Cuerpo y Santuario",
        tag: "PORTAL 02",
        description: "Libera las memorias atrapadas en tu piel. Desde sesiones de sanación hasta alineación, entra en el templo donde ocurre la verdadera liberación.",
        cta: "CONOCER MI HISTORIA",
        link: "/servicios/sesiones-corporales",
        image: "/images/home_redesign/service_sanctuary.png",
        accent: "#B8835A",
    },
];

export default function ServiceSelector() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextPortal = () => setActiveIndex((prev) => (prev + 1) % services.length);
    const prevPortal = () => setActiveIndex((prev) => (prev - 1 + services.length) % services.length);

    const activePortal = services[activeIndex];

    return (
        <section className="relative py-24 bg-[#F5EFE6] overflow-hidden min-h-[900px] flex flex-col items-center">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#ff9a5c]/20 to-transparent rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
            
            <div className="absolute top-40 left-10 opacity-20 pointer-events-none">
                <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 10C50 50 150 10 190 60C230 110 50 140 10 140" stroke="#8C4005" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
            </div>

            {/* Header Text */}
            <div className="text-center mb-16 relative z-10">
                <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-xs font-bold tracking-[0.4em] uppercase text-text/60"
                >
                    ECOSISTEMA DE EVOLUCIÓN
                </motion.span>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 text-5xl md:text-7xl font-script text-[#B8835A] italic"
                >
                    ¿Cómo quieres comenzar?
                </motion.h2>
            </div>

            {/* Slider Content */}
            <div className="container mx-auto px-4 relative max-w-7xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative flex flex-col lg:flex-row items-center justify-between min-h-[600px]"
                    >
                        {/* Background Brush Stroke */}
                        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-end">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, x: 100 }}
                                animate={{ scale: 1, opacity: 1, x: 0 }}
                                transition={{ duration: 1.2, delay: 0.3 }}
                                className="relative w-full lg:w-[90%] h-full lg:h-[120%]"
                            >
                                <Image
                                    src="/images/home_redesign/brush_portal_bg.png"
                                    alt="Brush Background"
                                    fill
                                    className="object-contain object-right"
                                    priority
                                />
                            </motion.div>
                        </div>

                        {/* Image Side */}
                        <div className="relative z-10 lg:w-1/2 flex justify-center lg:justify-start">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="relative w-64 h-64 md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-[15px] border-[#F5EFE6] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
                            >
                                <Image
                                    src={activePortal.image}
                                    alt={activePortal.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </div>

                        {/* Text Content */}
                        <div className="relative z-20 lg:w-1/2 mt-12 lg:mt-0 text-white lg:pl-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="space-y-6 max-w-lg"
                            >
                                <span className="block text-sm font-bold tracking-[0.3em] uppercase opacity-70">
                                    {activePortal.tag}
                                </span>
                                <h3 className="text-5xl md:text-7xl font-script text-[#B8835A] italic">
                                    {activePortal.title}
                                </h3>
                                <p className="text-lg md:text-xl font-body font-light leading-relaxed text-background/80">
                                    {activePortal.description}
                                </p>
                                
                                <div className="pt-8">
                                    <Link
                                        href={activePortal.link}
                                        className="inline-block px-10 py-4 bg-[#B8835A] text-[#F5EFE6] rounded-xl font-heading font-bold tracking-widest uppercase transition-all hover:scale-105 hover:shadow-xl active:scale-95"
                                    >
                                        {activePortal.cta}
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Slider Controls */}
                <div className="flex justify-center gap-6 mt-16 relative z-30">
                    <button
                        onClick={prevPortal}
                        className="w-14 h-14 rounded-full border border-text/10 flex items-center justify-center transition-all hover:bg-text hover:text-background"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3">
                        {services.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`w-3 h-3 rounded-full transition-all ${idx === activeIndex ? "bg-[#B8835A] w-10" : "bg-text/20 hover:bg-text/40"}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={nextPortal}
                        className="w-14 h-14 rounded-full border border-text/10 flex items-center justify-center transition-all hover:bg-text hover:text-background"
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Bottom Border/Detail */}
            <div className="mt-20 w-32 h-1 bg-[#B8835A]/30 rounded-full" />
        </section>
    );
}
