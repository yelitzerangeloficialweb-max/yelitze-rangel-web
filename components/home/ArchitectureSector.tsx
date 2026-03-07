"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ArchitectureSector() {
    return (
        <section className="relative min-h-[600px] flex items-center overflow-hidden bg-text text-background py-24">
            {/* Background Texture/Overlay */}
            <div className="absolute inset-0 z-0 opacity-20">
                <Image
                    src="/images/home_redesign/architecture_banner.png"
                    alt="Background Texture"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    {/* Image Area */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="flex-1"
                    >
                        <div className="relative rounded-[20px] overflow-hidden shadow-2xl border border-white/10">
                            <Image
                                src="/images/home_redesign/architecture_banner.png"
                                alt="Arquitectura de Vida"
                                width={800}
                                height={600}
                                className="object-cover w-full h-auto"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-text/60 to-transparent" />
                        </div>
                    </motion.div>

                    {/* Text Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 space-y-8"
                    >
                        <div className="space-y-4">
                            <span className="text-xs font-bold tracking-[0.3em] text-accent uppercase opacity-80">
                                Diagnóstico del Alma
                            </span>
                            <h2 className="text-4xl md:text-6xl font-serif leading-tight">
                                Arquitectura de Vida <br />
                                <span className="italic font-script text-accent-light">Intencional 2026</span>
                            </h2>
                        </div>

                        <p className="text-lg text-white/70 font-light leading-relaxed max-w-lg">
                            Un viaje único para que aprendas a dejar de sobrevivir y comiences a construir tu realidad desde el alma. Descubre el orden listo por este momento.
                        </p>

                        <div className="pt-6">
                            <Link
                                href="/eventos/arquitectura-vida-2026"
                                className="btn-premium px-12 py-5"
                            >
                                Iniciar mi transformación
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
