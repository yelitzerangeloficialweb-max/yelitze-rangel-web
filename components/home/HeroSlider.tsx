"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "@/components/ui/ParticleBackground";

const slides = [
    {
        id: 1,
        title: "Coaching Ancestral",
        heading: "Anatomía del Alma",
        subheading: "donde lo invisible cobra voz",
        description: "Sana tu linaje y libera tu presente.",
        link: "/servicios/coaching-ancestral",
        cta: "Descubrir Más",
        image: "/assets/images/hero-portrait.png", // Using existing portrait
        bgImage: "/assets/images/hero-background-new.jpg", // Using existing background
    },
    {
        id: 2,
        title: "Tests Gratuitos",
        heading: "Descubre tu Historia",
        subheading: "Los patrones que guían tu vida",
        description: "Identifica bloqueos y lealtades invisibles con nuestros tests.",
        link: "/tests",
        cta: "Realizar Tests",
        image: "/assets/images/hero-portrait.png", // Placeholder, ideally specific to tests
        bgImage: "/assets/images/hero-background-new.jpg",
    },
    {
        id: 3,
        title: "Programas y Formaciones",
        heading: "Expande tu Consciencia",
        subheading: "Caminos de aprendizaje",
        description: "Formaciones que transforman vidas y despiertan tu potencial.",
        link: "/servicios",
        cta: "Ver Programas",
        image: "/assets/images/hero-portrait.png", // Placeholder
        bgImage: "/assets/images/hero-background-new.jpg",
    },
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-black">
            {/* Background Transition */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[currentSlide].id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={slides[currentSlide].bgImage}
                        alt="Background"
                        fill
                        className="object-cover object-center opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                </motion.div>
            </AnimatePresence>

            <ParticleBackground />

            <div className="container mx-auto px-4 relative z-10 h-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
                    {/* Text Content */}
                    <div className="text-center lg:text-left pt-36 pb-20 lg:py-32">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={slides[currentSlide].id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                                    <Sparkles className="w-4 h-4 text-[var(--color-secondary)]" />
                                    <span className="text-white text-sm font-light tracking-wider">
                                        {slides[currentSlide].title}
                                    </span>
                                </div>

                                <h1 className="text-5xl md:text-7xl font-bold mb-6 font-sans leading-tight text-white drop-shadow-lg">
                                    {slides[currentSlide].heading} <br />
                                    <span className="text-[var(--color-secondary)]">
                                        {slides[currentSlide].subheading}
                                    </span>
                                </h1>

                                <p className="text-xl text-gray-200 mb-8 max-w-lg mx-auto lg:mx-0 font-light">
                                    {slides[currentSlide].description}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <Link
                                        href={slides[currentSlide].link}
                                        className="btn-premium group"
                                    >
                                        {slides[currentSlide].cta}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Hero Image */}
                    <div className="hidden lg:block absolute bottom-0 right-0 w-[50%] h-[90%] pointer-events-none">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={slides[currentSlide].id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src={slides[currentSlide].image}
                                    alt="Slide Image"
                                    fill
                                    className="object-contain object-bottom drop-shadow-2xl"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Mobile Image */}
                    <div className="lg:hidden relative h-[400px] w-full flex items-end justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={slides[currentSlide].id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src={slides[currentSlide].image}
                                    alt="Slide Image"
                                    fill
                                    className="object-contain object-bottom drop-shadow-2xl"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-4">
                <button
                    onClick={prevSlide}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors text-white border border-white/20"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? "bg-[var(--color-secondary)] w-8" : "bg-white/50 hover:bg-white/80"
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
                <button
                    onClick={nextSlide}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors text-white border border-white/20"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </section>
    );
}
