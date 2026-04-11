"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NewHero() {
    return (
        <section className="relative h-[95vh] min-h-[750px] flex items-center justify-center bg-[#2D2926] z-20">
            {/* We add z-20 here so this entire section stacks above the WelcomeSection below it */}
            {/* Background Image with Premium Overlays - Clips the image but allows elements outside to spill */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                    src="/assets/images/hero/hero-fusion-group.jpg"
                    alt="Ancestral Background"
                    fill
                    className="object-cover scale-110 opacity-100"
                    priority
                />
                {/* Global Overlays - Softer for more visibility */}
                <div className="absolute inset-0 bg-black/10" />
                
                {/* Bottom Seam Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
            </div>

            {/* Atmosphere - Intense 95% blur on bottom left (Moved outside the overflow-hidden container so it spills to the next section) */}
            <div className="absolute -bottom-[30%] -left-[40%] w-[50%] h-[60%] bg-[#FF6B00]/95 blur-[200px] rounded-full pointer-events-none z-50" />

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
                        <h1 className="text-4xl md:text-[60pt] font-sans font-semibold tracking-[0.02em] leading-none uppercase drop-shadow-2xl">
                            DESCUBRE TU HISTORIA
                        </h1>
                        <p className="text-4xl md:text-[5.5rem] font-script text-white/95 leading-none drop-shadow-xl -mt-2 md:-mt-4 tracking-[0.03em]">
                            los patrones que guía tu vida
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="pt-0 flex justify-center -translate-y-8 md:-translate-y-12"
                    >
                        <Link
                            href="/tests"
                            className="inline-block px-16 py-6 text-sm md:text-base font-body font-bold tracking-[0.25em] uppercase border border-[#b7835a] text-white rounded-full hover:bg-[#b7835a] hover:text-white transition-all bg-transparent backdrop-blur-md shadow-2xl group"
                        >
                            INICIA MI EXPLORACIÓN
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
 
            {/* Pagination/Scroll Indicator - Higher to be closer to button */}
            <div className="absolute bottom-28 md:bottom-44 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
                <div className="relative w-16 h-16 opacity-60 transition-opacity hover:opacity-100">
                    <Image
                        src="/assets/images/watermark-logo.png"
                        alt=""
                        fill
                        className="object-contain brightness-0 invert"
                    />
                </div>
            </div>


            {/* Organic Bottom Divider - WHITE BRUSH */}
            <div className="absolute bottom-0 left-[-100%] right-[-100%] z-30 pointer-events-none h-48 md:h-[600px] overflow-hidden">
                <div 
                    className="w-full h-full"
                    style={{
                        maskImage: 'url(/images/home_redesign/Lineas-Hero.svg)',
                        WebkitMaskImage: 'url(/images/home_redesign/Lineas-Hero.svg)',
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
