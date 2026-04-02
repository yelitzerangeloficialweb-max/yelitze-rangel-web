"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NewHero() {
    return (
        <section className="relative h-[95vh] min-h-[750px] flex items-center justify-center overflow-hidden bg-[#2D2926]">
            {/* Background Image with Premium Overlays */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/images/hero/hero-fusion-group.jpg"
                    alt="Ancestral Background"
                    fill
                    className="object-cover scale-110 opacity-100 blur-[2px] md:blur-[4px]"
                    priority
                />
                {/* Global Overlays - Softer for more visibility */}
                <div className="absolute inset-0 bg-black/25" />
                
                {/* Specific Orange Light Effect - Top Left - Warmer */}
                <div className="absolute -top-[15%] -left-[10%] w-[70%] h-[70%] bg-[#ff9a5c]/35 blur-[180px] rounded-full pointer-events-none" />
                
                {/* Bottom Seam Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 relative z-10 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    className="space-y-12"
                >
                    <motion.span 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1.2 }}
                        className="block text-[10px] md:text-xs font-guide font-bold tracking-[0.7em] uppercase text-white/80"
                    >
                        Test Gratuitos
                    </motion.span>

                    <div className="space-y-2 md:space-y-0">
                        <h1 className="text-5xl md:text-[7.5rem] font-sans font-black tracking-[0.02em] leading-none uppercase drop-shadow-2xl">
                            DESCUBRE TU HISTORIA
                        </h1>
                        <p className="text-4xl md:text-[5.5rem] font-script text-white/95 italic leading-none drop-shadow-xl -mt-2 md:-mt-4">
                            los patrones que guía tu vida
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="pt-12 md:pt-14 flex justify-center -translate-y-6 md:-translate-y-8"
                    >
                        <Link
                            href="/tests"
                            className="inline-block px-16 py-6 text-sm md:text-base font-body font-bold tracking-[0.25em] uppercase border border-white/40 text-white rounded-full hover:bg-white hover:text-black transition-all bg-transparent backdrop-blur-md shadow-2xl group"
                        >
                            INICIA MI EXPLORACIÓN
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Pagination/Scroll Indicator - Lowered to avoid button overlap */}
            <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-90">
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/70 to-white/90" />
                <div className="relative w-20 h-20">
                    <Image
                        src="/assets/images/watermark-logo.png"
                        alt=""
                        fill
                        className="object-contain"
                    />
                </div>
            </div>


            {/* Organic Bottom Divider - WHITE BRUSH */}
            <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none h-32 md:h-48 overflow-visible">
                <div 
                    className="absolute inset-0 z-0 origin-top scale-y-125"
                    style={{
                        maskImage: 'url(/images/home_redesign/hero.svg)',
                        WebkitMaskImage: 'url(/images/home_redesign/hero.svg)',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'bottom center',
                        WebkitMaskPosition: 'bottom center',
                        maskSize: '100% 100%',
                        WebkitMaskSize: '100% 100%',
                        backgroundColor: 'white'
                    }} 
                />
            </div>
        </section>
    );
}
