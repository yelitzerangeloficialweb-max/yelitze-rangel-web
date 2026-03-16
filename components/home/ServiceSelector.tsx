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
    },
    {
        id: "02",
        title: "Cuerpo y Santuario",
        tag: "PORTAL 02",
        description: "Libera las memorias atrapadas en tu piel. Desde sesiones de sanación hasta alineación, entra en el templo donde ocurre la verdadera liberación.",
        cta: "CONOCER MI HISTORIA",
        link: "/servicios/sesiones-corporales",
        image: "/images/home_redesign/service_sanctuary.png",
    },
];

export default function ServiceSelector() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextPortal = () => setActiveIndex((prev) => (prev + 1) % services.length);
    const prevPortal = () => setActiveIndex((prev) => (prev - 1 + services.length) % services.length);

    const activePortal = services[activeIndex];

    return (
        <section className="relative py-32 bg-[#FFFFFF] overflow-hidden">
            {/* Header Text */}
            <div className="text-center mb-24 relative z-20">
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
                    className="mt-4 text-4xl md:text-5xl font-script text-[#B8835A] italic"
                >
                    ¿Cómo quieres comenzar?
                </motion.h2>
            </div>

            <div className="container mx-auto px-4 relative max-w-7xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative min-h-[500px] flex items-center"
                    >
                        {/* The Dark Block Container */}
                        <div className="absolute top-[10%] lg:top-[15%] left-0 w-full h-[90%] lg:h-[85%] z-0">
                            {/* Brush and Background Container */}
                            <div className="relative w-full h-full bg-[#2D2926] rounded-br-[100px] lg:rounded-br-[300px] overflow-visible">
                                {/* Top Brush Stroke - LARGE */}
                                <div className="absolute -top-[150px] lg:-top-[280px] left-0 w-full h-[300px] lg:h-[600px] pointer-events-none z-10">
                                    <Image
                                        src="/assets/images/brush-separator-black.png"
                                        alt=""
                                        fill
                                        className="object-fill object-bottom brightness-[0.15]"
                                        priority
                                    />
                                </div>
                                
                                {/* Top Right Orange Glow */}
                                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-[#ff9a5c]/40 to-transparent blur-[100px] rounded-full pointer-events-none z-0" />
                                
                                {/* Internal Right Accent */}
                                <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#ff9a5c]/10 to-transparent pointer-events-none" />
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] items-center gap-12 lg:gap-0">
                            {/* Circular Image */}
                            <div className="flex justify-center lg:justify-start lg:-ml-12">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="relative w-72 h-72 md:w-[520px] md:h-[520px] lg:w-[680px] lg:h-[680px] rounded-full overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.9)] border-[12px] border-white/5 lg:-ml-24"
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
                            <div className="text-white lg:pl-12 lg:pr-24 space-y-8 text-center lg:text-left">
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="space-y-6"
                                >
                                    <span className="block text-xs font-bold tracking-[0.4em] uppercase text-white/50">
                                        {activePortal.tag}
                                    </span>
                                    <h3 className="text-6xl md:text-[6.5rem] font-script text-[#B8835A] italic leading-[0.8] drop-shadow-sm pb-4">
                                        {activePortal.title}
                                    </h3>
                                    <p className="text-lg md:text-xl font-body font-light leading-relaxed text-white/80 max-w-xl mx-auto lg:mx-0">
                                        {activePortal.description}
                                    </p>
                                    
                                    <div className="pt-8">
                                        <Link
                                            href={activePortal.link}
                                            className="inline-block px-12 py-4 bg-[#B8835A] text-white rounded-2xl font-body font-bold tracking-widest uppercase transition-all hover:scale-105 hover:bg-[#c9956d] shadow-xl active:scale-95"
                                        >
                                            {activePortal.cta}
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Slider Controls */}
                <div className="flex justify-center lg:justify-end gap-6 mt-16 lg:-mt-40 relative z-30 lg:pr-32">
                    <button
                        onClick={prevPortal}
                        className="w-14 h-14 rounded-full border border-text/10 bg-white/5 flex items-center justify-center transition-all hover:bg-white/10 text-text/60"
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
                        className="w-14 h-14 rounded-full border border-text/10 bg-white/5 flex items-center justify-center transition-all hover:bg-white/10 text-text/60"
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Background Details */}
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-gradient-to-bl from-[#ff9a5c]/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}
