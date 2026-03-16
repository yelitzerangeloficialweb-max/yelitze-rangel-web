"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NewHero() {
    return (
        <section className="relative h-[95vh] min-h-[750px] flex items-center justify-center overflow-hidden bg-black">
            {/* Background Image with Premium Overlays */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/home_redesign/hero_bg.png"
                    alt="Ancestral Background"
                    fill
                    className="object-cover scale-105 opacity-80"
                    priority
                />
                {/* Global Overlays */}
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Specific Orange Light Effect - Top Left */}
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#ff9a5c]/20 blur-[150px] rounded-full pointer-events-none" />
                
                {/* Bottom Seam Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 relative z-10 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="block text-xs md:text-sm font-body font-bold tracking-[0.5em] uppercase"
                    >
                        Test Gratuitos
                    </motion.span>

                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-[5.5rem] font-sans font-bold tracking-[0.05em] leading-[1.1] uppercase">
                            DESCUBRE TU HISTORIA
                        </h1>
                        <p className="text-4xl md:text-[5.5rem] font-script text-white/90 italic leading-tight drop-shadow-lg">
                            los patrones que guía tu vida
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="pt-12 flex justify-center"
                    >
                        <Link
                            href="/tests"
                            className="inline-block px-14 py-5 text-sm md:text-base font-body font-bold tracking-[0.2em] uppercase border border-white/60 text-white rounded-full hover:bg-white hover:text-black transition-all bg-transparent backdrop-blur-sm"
                        >
                            INICIA MI EXPLORACIÓN
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Pagination/Scroll Indicator */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
                <div className="w-[1px] h-12 bg-white/40" />
                <div className="relative w-10 h-10">
                    <Image
                        src="/assets/images/watermark-logo.png"
                        alt=""
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Organic Bottom Divider */}
            <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
                <div className="relative w-full flex justify-center overflow-hidden leading-none translate-y-[2px]">
                    <Image
                        src="/assets/images/brush-separator.png"
                        alt=""
                        width={2560}
                        height={600}
                        quality={100}
                        className="w-full h-auto min-h-[100px] object-cover object-bottom brightness-[0.95]"
                    />
                </div>
            </div>
        </section>
    );
}
