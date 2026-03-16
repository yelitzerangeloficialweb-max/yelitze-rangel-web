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
];

export default function ServiceSelector() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextPortal = () => setActiveIndex((prev) => (prev + 1) % services.length);
    const prevPortal = () => setActiveIndex((prev) => (prev - 1 + services.length) % services.length);

    const activePortal = services[activeIndex];

    return (
        <section className="relative overflow-hidden bg-white">
            {/* White Header Area */}
            <div className="relative pt-32 pb-48 z-20">
                <div className="container mx-auto px-4 text-center">
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
                        className="mt-4 text-5xl md:text-6xl font-script text-[#B8835A] italic"
                    >
                        ¿Cómo quieres comenzar?
                    </motion.h2>
                </div>
            </div>

            {/* Transition Brush Separator - Moved to z-10 to be behind the circular image */}
            <div className="absolute top-[420px] left-0 w-full h-[300px] lg:h-[500px] z-10 pointer-events-none">
                <Image
                    src="/assets/images/brush-separator-black.png"
                    alt=""
                    fill
                    className="object-fill object-top brightness-[0.18] scale-y-125"
                    priority
                />
            </div>

            {/* Dark Portal Area - Moved to z-20 to allow z-50 children (circle) to be on top of z-10 brush */}
            <div className="relative bg-[#2D2926] pt-32 pb-48 z-20">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-[#ff9a5c]/15 via-transparent to-transparent pointer-events-none" />
                <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-[#ff9a5c]/15 blur-[150px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-4 relative max-w-7xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative flex flex-col lg:flex-row items-center gap-16 lg:gap-0"
                        >
                            {/* Circular Image Container - Overlapping with negative margin */}
                            <div className="lg:w-1/2 flex justify-center lg:justify-start">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="relative w-64 h-64 md:w-[480px] md:h-[480px] lg:w-[580px] lg:h-[580px] rounded-full overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9)] z-50 -mt-48 lg:-mt-[350px] lg:-ml-12"
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
                            <div className="lg:w-1/2 text-white space-y-8 text-center lg:text-left z-20 pt-12 lg:pt-0 lg:pl-12">
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="space-y-6"
                                >
                                    <span className="block text-xs font-bold tracking-[0.4em] uppercase text-white/50">
                                        {activePortal.tag}
                                    </span>
                                    <h3 className="text-6xl md:text-[7rem] font-script text-[#B8835A] italic leading-[0.75] drop-shadow-md pb-6">
                                        {activePortal.title}
                                    </h3>
                                    <p className="text-xl md:text-2xl font-body font-light leading-relaxed text-white/80 max-w-xl mx-auto lg:mx-0">
                                        {activePortal.description}
                                    </p>
                                    
                                    <div className="pt-10">
                                        <Link
                                            href={activePortal.link}
                                            className="inline-block px-14 py-5 bg-[#B8835A] text-white rounded-2xl font-body font-bold tracking-[0.2em] uppercase transition-all hover:scale-105 hover:bg-[#c9956d] shadow-2xl active:scale-95"
                                        >
                                            {activePortal.cta}
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Slider Controls */}
                    {services.length > 1 && (
                        <div className="flex justify-center lg:justify-end gap-8 mt-24 relative z-50 lg:pr-12">
                            <button
                                onClick={prevPortal}
                                className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-all hover:bg-white/10 text-white/60"
                                aria-label="Anterior"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                            <div className="flex items-center gap-4">
                                {services.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveIndex(idx)}
                                        className={`w-3 h-3 rounded-full transition-all duration-500 ${idx === activeIndex ? "bg-[#B8835A] w-12" : "bg-white/20 hover:bg-white/40"}`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={nextPortal}
                                className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-all hover:bg-white/10 text-white/60"
                                aria-label="Siguiente"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Bottom Section Detail Glow */}
                <div className="absolute bottom-[10%] left-[5%] w-[30%] h-[30%] bg-[#B8835A]/5 blur-[120px] rounded-full pointer-events-none" />
            </div>
        </section>
    );
}
