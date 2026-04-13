"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";


export default function ArchitectureSector() {
    return (
        <section className="relative w-full overflow-hidden bg-[#2D2926]">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] md:min-h-[850px]">
                {/* Left Column: Image Area */}
                <div className="relative h-full w-full min-h-[400px] lg:min-h-0">
                    <img 
                        src="/images/home_redesign/Arquitectura_intencional2.png"
                        alt="Arquitectura de Vida"
                        className="absolute inset-0 w-full h-full object-cover object-left"
                    />
                    {/* Subtle blend gradient on the right side of the image */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#2D2926]/40" />
                </div>

                {/* Right Column: Text Area */}
                <div className="flex items-center justify-center lg:justify-start px-6 py-20 md:p-24 lg:p-32 bg-[#2D2926]">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl space-y-8 text-center lg:text-left"
                    >
                        <div className="space-y-2">
                            <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-white/40 uppercase">
                                DIAGNÓSTICO DEL ALMA
                            </span>
                            <div className="space-y-0">
                                <h2 className="text-5xl md:text-7xl lg:text-[7.5rem] font-script text-[#B8835A] leading-[0.9] drop-shadow-sm tracking-[0.03em]">
                                    Arquitectura de Vida
                                </h2>
                                <h3 className="text-4xl md:text-6xl lg:text-[5.5rem] font-medium text-white leading-tight">
                                    Intencional
                                </h3>
                            </div>
                        </div>

                        <p className="text-xl md:text-2xl text-white/80 font-body font-light leading-relaxed">
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
