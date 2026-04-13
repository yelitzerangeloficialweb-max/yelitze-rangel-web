"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";


export default function ArchitectureSector() {
    return (
        <section className="relative w-full h-[600px] md:h-[850px] flex items-center overflow-hidden bg-[#2D2926]">
            {/* Split Layout: Image on the RIGHT half, Dark background on the LEFT */}
            <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 z-0">
                <img 
                    src="/images/home_redesign/Arquitectura_intencional2.png"
                    alt="Arquitectura de Vida"
                    className="w-full h-full object-cover object-left"
                />
                {/* Gradient to blend the image into the dark grey on the left side */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-[#2D2926]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-start">
                    
                    {/* Text Area - Aligned to the left */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 space-y-8 text-center lg:text-left"
                    >
                        <div className="space-y-2">
                            <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-white/40 uppercase">
                                DIAGNÓSTICO DEL ALMA
                            </span>
                            <div className="space-y-0">
                                <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-script text-[#B8835A] leading-[0.9] drop-shadow-sm tracking-[0.03em]">
                                    Arquitectura de Vida
                                </h2>
                                <h3 className="text-4xl md:text-6xl lg:text-[4.5rem] font-medium text-white leading-tight">
                                    Intencional
                                </h3>
                            </div>
                        </div>

                        <p className="text-2xl text-white/80 font-body font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
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

        </section>
    );
}
