"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NewHero() {
    return (
        <section className="relative h-[95vh] min-h-[750px] flex items-center justify-center overflow-hidden bg-background">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/home_redesign/hero_bg.png"
                    alt="Ancestral Background"
                    fill
                    className="object-cover scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content reached via z-10 */}
            <div className="container mx-auto px-4 relative z-10 text-center text-white -translate-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <span className="block text-xs md:text-sm font-body font-bold tracking-[0.4em] uppercase opacity-80 mb-4">
                        Test Gratuitos
                    </span>

                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-[5.5rem] font-heading font-normal tracking-[0.05em] leading-[1.1]">
                            DESCUBRE TU HISTORIA
                        </h1>
                        <p className="text-4xl md:text-7xl font-script text-white/90 italic leading-tight drop-shadow-sm">
                            los patrones que guía tu vida
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="pt-12 flex justify-center"
                    >
                        <Link
                            href="/tests"
                            className="inline-block px-14 py-4 text-sm md:text-base font-heading font-normal tracking-[0.2em] uppercase border border-white/40 text-white rounded-full hover:bg-white hover:text-black transition-all bg-black/10 backdrop-blur-sm shadow-xl"
                        >
                            Inicia mi exploración
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute inset-x-4 md:inset-x-12 top-1/2 -translate-y-1/2 flex justify-between z-20 text-white/40">
                <button className="p-4 hover:text-white transition-colors">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </button>
                <button className="p-4 hover:text-white transition-colors">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </button>
            </div>

            {/* Organic Bottom Curve with Brush Strokes */}
            <div className="absolute bottom-[-2px] left-0 right-0 z-30 pointer-events-none">
                {/* Logo/Watermark at bottom center */}
                <div className="absolute bottom-28 md:bottom-32 left-1/2 -translate-x-1/2 z-40 opacity-30">
                    <Image
                        src="/assets/images/watermark-logo.png"
                        alt="Logo"
                        width={120}
                        height={120}
                        className="w-16 h-16 md:w-24 md:h-24 brightness-200"
                    />
                </div>

                {/* Dark Brush Decoration Gradient Shadow */}
                <div className="absolute bottom-0 left-0 w-full h-[150px] md:h-[220px] bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

                {/* Main White Curve SVG */}
                <svg
                    viewBox="0 0 1440 240"
                    fill="none"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-[140px] md:h-[260px] relative z-20"
                >
                    <path
                        d="M0 240H1440V120C1440 120 1080 0 720 0C360 0 0 120 0 120V240Z"
                        fill="white"
                    />
                    {/* Artistic Line Detail */}
                    <path
                        d="M0 122C360 122 720 2 1080 2C1440 2 1440 122 1440 122"
                        stroke="black"
                        strokeWidth="0.5"
                        className="opacity-10"
                    />
                </svg>
            </div>
        </section>
    );
}
