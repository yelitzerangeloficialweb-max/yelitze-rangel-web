"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { EyeGeometricIcon, CloseThinIcon } from "@/components/icons/CustomIcons";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "@/components/ui/ParticleBackground";
import TypewriterText from "@/components/ui/TypewriterText";

const slides = [
    {
        id: 1,
        title: "Coaching Ancestral",
        heading: "Anatomía del Alma",
        subheading: "donde lo invisible cobra voz\ny tu alma puede expresarse con verdad",
        description: "Sana tu linaje y libera tu presente. Reconecta con la fuerza de tus raíces.",
        link: "/servicios/coaching-ancestral",
        cta: "Conocer el Camino",
        bgImage: "/assets/images/hero/hero-fusion-lineage.jpg",
    },
    {
        id: 2,
        title: "Tests Gratuitos",
        heading: "Descubre tu Historia",
        subheading: "Los patrones que guían tu vida",
        description: "Identifica bloqueos y lealtades invisibles con nuestras herramientas de autoconocimiento.",
        link: "/tests",
        cta: "Iniciar mi Exploración",
        bgImage: "/assets/images/hero/hero-fusion-self.jpg",
    },
    {
        id: 3,
        title: "Programas y Formaciones",
        heading: "Expande tu Consciencia",
        subheading: "Caminos de aprendizaje",
        description: "Formaciones profundas que transforman vidas y despiertan tu potencial sanador.",
        link: "/servicios",
        cta: "Caminos de Expansión",
        bgImage: "/assets/images/hero/hero-fusion-group.jpg",
    },
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 12000); // Increased duration to 12 seconds for better readability of poetic text and animations
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
                            className="inline-block mb-10 md:mb-16"
                        >
                            <div className="flex items-center gap-3 px-4 py-2 md:px-6 md:py-3 rounded-md bg-[#F5EFE6] text-[#8C4005] font-bold text-[10px] md:text-xs tracking-[0.1em] uppercase shadow-lg">
                                <EyeGeometricIcon className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-70" />
                                <span>{slides[currentSlide].title}</span>
                                <CloseThinIcon className="w-3 h-3 md:w-3.5 md:h-3.5 opacity-70 ml-2" />
                            </div>
                        </motion.div>

                        {/* Heading with Typewriter Effect */}
                        <div className="flex flex-col items-center justify-center -space-y-2 md:-space-y-6">
                            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[130px] font-heading font-normal uppercase tracking-widest text-white drop-shadow-2xl leading-none w-full max-w-[100vw] px-4 break-words">
                                <TypewriterText text={slides[currentSlide].heading} delay={0.1} />
                            </h1>
                            <div className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-[80px] font-light italic lowercase font-heading leading-tight drop-shadow-lg z-10 opacity-90">
                                <TypewriterText text={slides[currentSlide].subheading} delay={1.5} />
                            </div>
                        </div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 3, duration: 0.8 }}
                            className="pt-16 flex flex-col items-center"
                        >
                            <Link
                                href={slides[currentSlide].link}
                                className="inline-flex items-center justify-center px-10 py-3 border-[1.5px] border-white text-white rounded-full text-sm md:text-base font-semibold tracking-widest transition-all bg-transparent hover:bg-white hover:text-black group uppercase shadow-lg"
                            >
                                {slides[currentSlide].cta}
                            </Link>

                            {/* Line Arrow Detail */}
                            <div className="mt-8 flex items-center justify-center gap-2 opacity-80">
                                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                <div className="h-px w-32 md:w-48 bg-gradient-to-r from-white/90 to-white/40" />
                                <ArrowRight className="w-3.5 h-3.5 text-white/50 -ml-2" />
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Absolute Left/Right Navigation */}
            <div className="absolute inset-y-0 left-4 right-4 z-30 flex justify-between items-center pointer-events-none">
                <button
                    onClick={prevSlide}
                    className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md transition-all text-white shadow-xl group"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                <button
                    onClick={nextSlide}
                    className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md transition-all text-white shadow-xl group"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>

            {/* Bottom Section: Logo & Dots */}
            <div className="absolute bottom-6 w-full z-30 flex flex-col items-center gap-6 pointer-events-none">
                <Image
                    src="/assets/images/logo-white.png"
                    alt="Yelitze Rangel"
                    width={180}
                    height={70}
                    className="opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] object-contain h-auto w-auto max-w-[140px] md:max-w-[180px]"
                />

                {/* Dots */}
                <div className="pointer-events-auto flex items-center gap-2">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`rounded-full transition-all duration-500 shadow-md ${idx === currentSlide
                                ? "bg-white w-2 h-2 opacity-100"
                                : "bg-white/50 w-1.5 h-1.5 hover:bg-white/80"
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
