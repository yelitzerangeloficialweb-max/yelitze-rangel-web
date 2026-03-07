"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NewHero() {
    return (
        <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-background">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/home_redesign/hero_bg.png"
                    alt="Ancestral Background"
                    fill
                    className="object-cover transition-transform duration-[10s] hover:scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                {/* Organic Brush Overlay (Simulated with Gradient) */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* Content reached via z-10 */}
            <div className="container mx-auto px-4 relative z-10 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <span className="block text-sm md:text-base font-medium tracking-[0.3em] uppercase opacity-90">
                        Test Gratuitos
                    </span>

                    <div className="space-y-2">
                        <h1 className="text-5xl md:text-8xl font-serif font-normal tracking-wider leading-none">
                            DESCUBRE TU HISTORIA
                        </h1>
                        <p className="text-3xl md:text-6xl font-script text-accent-light italic leading-tight">
                            los patrones que guía tu vida
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="pt-10"
                    >
                        <Link
                            href="/tests"
                            className="inline-block group relative"
                        >
                            {/* Brush Stroke Effect Background (Decorative) */}
                            <div className="absolute inset-0 bg-accent transform -rotate-1 skew-x-12 opacity-80 group-hover:scale-105 transition-transform rounded-sm" />
                            <span className="relative z-10 block px-10 py-4 text-sm md:text-base font-bold tracking-[0.2em] uppercase border border-white/30 text-white">
                                Iniciar mi exploración
                            </span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-10 z-20"
            >
                <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
            </motion.div>
        </section>
    );
}
