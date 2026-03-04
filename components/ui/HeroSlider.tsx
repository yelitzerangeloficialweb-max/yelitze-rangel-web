"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        id: 1,
        badge: "ACTIVACIÓN SÁNATE MUJER",
        title: "Deja de Repetir la Historia de Desamor de tu Madre.",
        subtitle: "Identifica la Herida Raíz.",
        description: "Únete a la inmersión online gratuita diseñada para mujeres que están listas para romper patrones y reclamar su poder de merecimiento.",
        image: "/assets/images/coaching-ancestral-hero-new.jpg",
        primaryAction: { text: "UNIRME GRATIS", href: "/sanate-mujer" },
        secondaryAction: { text: "Ver Detalles", href: "/eventos/sanate-mujer" }
    },
    {
        id: 2,
        badge: "SANANDO EL LINAJE",
        title: "El Despertar de la Raíz",
        subtitle: "Sana tu historia familiar y libera las cargas que no te pertenecen.",
        description: "Un viaje profundo a través de tus ancestros para transformar lealtades invisibles en fuerza vital. Reclama tu lugar en el sistema y florece.",
        image: "/assets/images/slider-linaje.png",
        primaryAction: { text: "EMPEZAR VIAJE", href: "/servicios/sanando-linaje-femenino" },
        secondaryAction: { text: "Consultar Fechas", href: "/eventos" }
    },
    {
        id: 3,
        badge: "SESIONES CORPORALES",
        title: "Alquimia del Tacto",
        subtitle: "El lenguaje existencial que habita en el santuario de tu alma.",
        description: "Trabajamos con la disolución de defensas musculares y estrés. Una integración celular profunda para renovar tu estado de ánimo, cuerpo y mente.",
        image: "/assets/images/slider-corporales.png",
        primaryAction: { text: "AGENDAR RITUAL", href: "/reservas" },
        secondaryAction: { text: "Ver Técnicas", href: "/servicios/sesiones-corporales" }
    }
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0 h-full w-full"
                >
                    {/* Background Image */}
                    <Image
                        src={slides[current].image}
                        alt={slides[current].title}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Content Container */}
                    <div className="relative flex h-full items-center justify-center pt-20">
                        <div className="container mx-auto px-4 text-center">

                            {/* Top Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="mb-8"
                            >
                                <span className="inline-block px-6 py-2 rounded-full border border-white/30 bg-black/40 backdrop-blur-md text-white text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
                                    {slides[current].badge}
                                </span>
                            </motion.div>

                            {/* Main Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="text-4xl md:text-7xl lg:text-8xl font-heading text-white mb-6 leading-tight drop-shadow-2xl"
                            >
                                {slides[current].title}
                            </motion.h1>

                            {/* Highlighted Subtitle */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                className="inline-block bg-[#7b5735]/80 backdrop-blur-sm px-6 py-3 mb-10 shadow-2xl skew-x-[-2deg]"
                            >
                                <h2 className="text-xl md:text-3xl text-white font-serif italic m-0 skew-x-[2deg]">
                                    {slides[current].subtitle}
                                </h2>
                            </motion.div>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.9, duration: 1 }}
                                className="max-w-2xl mx-auto text-base md:text-lg text-white/80 font-light leading-relaxed mb-12 drop-shadow-lg"
                            >
                                {slides[current].description}
                            </motion.p>

                            {/* Actions */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1, duration: 0.8 }}
                                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                            >
                                <Link
                                    href={slides[current].primaryAction.href}
                                    className="btn-premium px-10 py-4 text-lg group w-full sm:w-auto"
                                >
                                    {slides[current].primaryAction.text}
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <a
                                    href={slides[current].secondaryAction.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 text-white backdrop-blur-sm transition-all text-sm font-medium flex items-center gap-2 w-full sm:w-auto justify-center"
                                >
                                    {slides[current].secondaryAction.text}
                                    <span className="text-lg">📲</span>
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-30">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 transition-all duration-500 rounded-full ${i === current ? "w-10 bg-[var(--color-accent)]" : "w-4 bg-white/30 hover:bg-white/50"
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Side Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hidden md:block z-30 group"
            >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hidden md:block z-30 group"
            >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
        </section>
    );
}
