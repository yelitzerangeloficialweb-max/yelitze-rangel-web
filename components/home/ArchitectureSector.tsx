"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ArchitectureSector() {
    return (
        <section
            className="relative w-full overflow-hidden"
            style={{ backgroundColor: "#2D2926", height: "800px" }}
        >
            {/* 
                LEFT HALF: Pure CSS background-image — zero dependency on Next.js Image.
                This is the most reliable way to ensure full height coverage.
            */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "50%",
                    height: "100%",
                    backgroundImage: "url('/images/home_redesign/Arquitectura_intencional2.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Right-edge gradient to blend into the dark background */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to right, transparent 50%, #2D2926 100%)",
                    }}
                />
            </div>

            {/* RIGHT HALF: Text Content */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "0 4rem",
                }}
            >
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-lg space-y-6 text-left"
                >
                    <div className="space-y-1">
                        <span className="text-xs font-bold tracking-[0.4em] text-[#B8835A]/70 uppercase block">
                            DIAGNÓSTICO DEL ALMA
                        </span>
                        <h2 className="text-6xl font-script text-[#B8835A] leading-[1] drop-shadow-sm tracking-[0.03em]">
                            Arquitectura de Vida
                        </h2>
                        <h3 className="text-5xl font-medium text-white leading-tight">
                            Intencional
                        </h3>
                    </div>

                    <p className="text-lg text-white/75 font-body font-light leading-relaxed">
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
