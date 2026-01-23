"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "@/components/ui/ParticleBackground";
import TypewriterText from "@/components/ui/TypewriterText";

const slides = [
    {
        id: 1,
        title: "Coaching Ancestral",
        heading: "Anatomía del Alma",
        subheading: "donde lo invisible cobra voz",
        description: "Sana tu linaje y libera tu presente. Reconecta con la fuerza de tus raíces.",
        link: "/servicios/coaching-ancestral",
        cta: "Conocer el Camino",
        bgImage: "/assets/images/hero-bg-coaching.png",
    },
    {
        id: 2,
        title: "Tests Gratuitos",
        heading: "Descubre tu Historia",
        subheading: "Los patrones que guían tu vida",
        description: "Identifica bloqueos y lealtades invisibles con nuestras herramientas de autoconocimiento.",
        link: "/tests",
        cta: "Iniciar mi Exploración",
        bgImage: "/assets/images/hero-background-new.jpg", // Placeholder until generation quota resets
    },
    {
        id: 3,
        title: "Programas y Formaciones",
        heading: "Expande tu Consciencia",
        subheading: "Caminos de aprendizaje",
        description: "Formaciones profundas que transforman vidas y despiertan tu potencial sanador.",
        link: "/servicios",
        cta: "Caminos de Expansión",
        bgImage: "/assets/images/hero-background-new.jpg", // Placeholder until generation quota resets
    },
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 8000); // Increased duration for readability of animations
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
            {/* Background Transition */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={slides[currentSlide].bgImage}
                        alt="Background"
                        fill
                        className="object-cover object-center opacity-70"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />
                    {/* Vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
                </motion.div>
            </AnimatePresence>

            {/* Particle Effect Overlay */}
            <div className="absolute inset-0 z-10">
                <ParticleBackground />
            </div>

            {/* Content Content - Centered */}
            <div className="container mx-auto px-4 relative z-20 text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={slides[currentSlide].id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl mx-auto space-y-8"
                    >
                        {/* Tag */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="inline-block"
                        >
                            <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-light tracking-[0.2em] uppercase">
                                {slides[currentSlide].title}
                            </span>
                        </motion.div>

                        {/* Heading with Typewriter Effect */}
                        <div className="min-h-[120px] md:min-h-[160px] flex flex-col items-center justify-center">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading text-white drop-shadow-2xl leading-tight">
                                <TypewriterText text={slides[currentSlide].heading} delay={0.1} /> <br />
                                <span className="text-[var(--color-secondary)] mt-2 block">
                                    <TypewriterText text={slides[currentSlide].subheading} delay={1.5} className="font-light italic" />
                                </span>
                            </h1>
                        </div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.5, duration: 1 }}
                            className="text-lg md:text-2xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed"
                        >
                            {slides[currentSlide].description}
                        </motion.p>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 3, duration: 0.8 }}
                            className="pt-8"
                        >
                            <Link
                                href={slides[currentSlide].link}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-secondary)] text-white rounded-full font-medium hover:bg-white hover:text-[var(--color-primary)] transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg tracking-wide group"
                            >
                                {slides[currentSlide].cta}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-12 w-full z-30 flex justify-between px-8 md:justify-center md:gap-8 pointer-events-none">
                <button
                    onClick={prevSlide}
                    className="pointer-events-auto p-4 rounded-full bg-white/5 hover:bg-white/20 backdrop-blur-sm transition-all text-white border border-white/10 hover:border-white/40 group"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </button>

                {/* Dots */}
                <div className="pointer-events-auto flex items-center gap-3">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-2 rounded-full transition-all duration-500 ${idx === currentSlide
                                    ? "bg-[var(--color-secondary)] w-12"
                                    : "bg-white/30 w-2 hover:bg-white/60"
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    className="pointer-events-auto p-4 rounded-full bg-white/5 hover:bg-white/20 backdrop-blur-sm transition-all text-white border border-white/10 hover:border-white/40 group"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </section>
    );
}
