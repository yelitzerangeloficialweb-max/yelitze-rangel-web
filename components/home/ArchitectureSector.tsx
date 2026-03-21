"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { WaveDivider } from "@/components/ui/MysticalElements";

export default function ArchitectureSector() {
    return (
        <section className="relative min-h-[850px] flex items-center overflow-hidden bg-[#2D2926] pt-72 pb-32">
            {/* Wave Transition Top */}
            <WaveDivider position="top" fill="#F5EFE6" />
            {/* Background Image Container with Gradient Fade */}
            <div className="absolute inset-0 top-20 z-0">
                <div className="relative w-full h-full lg:w-[80%] lg:-left-24">
                    <Image
                        src="/images/home_redesign/Web-Yelitze12.png"
                        alt="Arquitectura de Vida"
                        fill
                        className="object-cover object-left"
                        priority
                    />
                    {/* Gradient Overlays for smooth blending */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2D2926]/40 to-[#2D2926]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2D2926] via-transparent to-transparent" />
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-end">
                    
                    {/* Text Area - Aligned to the right */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 space-y-8 text-center lg:text-left"
                    >
                        <div className="space-y-2">
                            <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-white/50 uppercase">
                                DIAGNÓSTICO DEL ALMA
                            </span>
                            <div className="space-y-0">
                                <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-script text-[#B8835A] italic leading-[0.8] drop-shadow-sm">
                                    Arquitectura de Vida
                                </h2>
                                <h3 className="text-4xl md:text-6xl lg:text-[4.5rem] font-medium text-white leading-tight">
                                    Intencional
                                </h3>
                            </div>
                        </div>

                        <p className="text-lg md:text-xl text-white/80 font-body font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Un viaje diseñado para quienes deciden dejar de sobrevivir y comenzar a co-crear su realidad desde el alma. Descubre si estás listo para este movimiento
                        </p>

                        <div className="pt-8">
                            <Link
                                href="/eventos/arquitectura-vida"
                                className="inline-block px-12 py-5 bg-[#B8835A] text-white rounded-2xl font-body font-bold tracking-widest uppercase transition-all hover:scale-105 hover:bg-[#c9956d] shadow-2xl active:scale-95"
                            >
                                INICIAR MI TRANSFORMACIÓN
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Subtle light effects */}
            <div className="absolute top-1/4 right-[10%] w-96 h-96 bg-[#ff9a5c]/10 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}
