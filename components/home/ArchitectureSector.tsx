"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ArchitectureSector() {
    return (
        /* 
          KEY FIX: The section MUST have an explicit height (not min-h) so that 
          absolute-positioned children (top-0 bottom-0) have a parent height to fill.
        */
        <section className="relative w-full h-[500px] md:h-[700px] lg:h-[800px] overflow-hidden bg-[#2D2926]">

            {/* LEFT HALF: Image — absolutely fills the left 50% of the section's fixed height */}
            <div className="absolute top-0 left-0 h-full w-full lg:w-1/2">
                <Image
                    src="/images/home_redesign/Arquitectura_intencional2.png"
                    alt="Arquitectura de Vida Intencional"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Right-edge gradient to blend image into the dark background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#2D2926]" />
                {/* Bottom gradient for mobile (image covers full width on mobile) */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#2D2926] lg:hidden" />
            </div>

            {/* RIGHT HALF: Text Content — positioned absolutely on the right */}
            <div className="absolute top-0 right-0 h-full w-full lg:w-1/2 flex items-center justify-center lg:justify-start px-8 lg:px-16 xl:px-24 pt-[300px] lg:pt-0">
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-lg space-y-6 text-center lg:text-left"
                >
                    <div className="space-y-1">
                        <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-[#B8835A]/70 uppercase">
                            DIAGNÓSTICO DEL ALMA
                        </span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-script text-[#B8835A] leading-[0.9] drop-shadow-sm tracking-[0.03em]">
                            Arquitectura de Vida
                        </h2>
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white leading-tight">
                            Intencional
                        </h3>
                    </div>

                    <p className="text-base md:text-xl text-white/75 font-body font-light leading-relaxed">
                        Un viaje diseñado para quienes deciden dejar de sobrevivir y comenzar a co-crear su realidad desde el alma. Descubre si estás listo para este movimiento
                    </p>

                    <div className="pt-4">
                        <Link
                            href="/eventos/arquitectura-vida"
                            className="inline-block px-10 py-4 bg-[#B8835A] text-white rounded-2xl font-body font-bold tracking-widest uppercase text-sm transition-all hover:scale-105 hover:bg-[#c9956d] shadow-2xl active:scale-95"
                        >
                            INICIAR MI TRANSFORMACIÓN
                        </Link>
                    </div>
                </motion.div>
            </div>

        </section>
    );
}
