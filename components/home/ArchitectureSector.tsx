"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ArchitectureSector() {
    return (
        /*
          DEFINITIVO: Flexbox row, sin overflow-hidden, sin heights abolutas que recorten.
          La sección adapta su altura al contenido del texto (columna derecha).
          La columna de imagen se estira automáticamente con `align-items: stretch` (default en flex).
        */
        <div
            className="w-full flex flex-col lg:flex-row relative z-[2] bg-[#2D2926] min-h-[600px]"
        >
            {/* LEFT COLUMN: Image - Stacks on top in mobile */}
            <div
                className="w-full lg:w-1/2 min-h-[400px] lg:min-h-full relative"
                style={{
                    backgroundImage: "url('/images/home_redesign/Arquitectura_intencional2.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Gradient Difuminado (Desktop: right, Mobile: bottom) */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2D2926] lg:bg-gradient-to-r lg:from-transparent lg:to-[#2D2926] pointer-events-none" />
            </div>

            {/* RIGHT COLUMN: Text Content */}
            <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start px-8 py-16 lg:px-20 lg:py-24">
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ maxWidth: "520px" }}
                >
                    <span
                        style={{
                            display: "block",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.4em",
                            color: "rgba(184,131,90,0.7)",
                            textTransform: "uppercase",
                            marginBottom: "16px",
                        }}
                    >
                        DIAGNÓSTICO DEL ALMA
                    </span>

                    <h2 className="font-script" style={{ fontSize: "clamp(2.5rem, 4vw, 5rem)", color: "#B8835A", lineHeight: 1, marginBottom: "8px" }}>
                        Arquitectura de Vida
                    </h2>
                    <h3 style={{ fontSize: "clamp(2rem, 3vw, 4rem)", fontWeight: 500, color: "#ffffff", lineHeight: 1.1, marginBottom: "24px" }}>
                        Intencional
                    </h3>

                    <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.75)", fontWeight: 300, lineHeight: 1.7, marginBottom: "40px" }}>
                        Un viaje diseñado para quienes deciden dejar de sobrevivir y comenzar a co-crear su realidad desde el alma. Descubre si estás listo para este movimiento
                    </p>

                    <Link
                        href="/eventos/arquitectura-vida"
                        style={{
                            display: "inline-block",
                            padding: "16px 40px",
                            backgroundColor: "#B8835A",
                            color: "#ffffff",
                            borderRadius: "16px",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                            transition: "transform 0.2s, background-color 0.2s",
                            boxShadow: "0 20px 40px rgba(184,131,90,0.3)",
                        }}
                        onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = "scale(1.05)"; (e.target as HTMLElement).style.backgroundColor = "#c9956d"; }}
                        onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = "scale(1)"; (e.target as HTMLElement).style.backgroundColor = "#B8835A"; }}
                    >
                        INICIAR MI TRANSFORMACIÓN
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
