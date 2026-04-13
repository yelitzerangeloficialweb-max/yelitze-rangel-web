"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WisdomChest() {
    return (
        <section className="relative py-48 bg-white overflow-x-clip" style={{ zIndex: 1, position: 'relative' }}>
            {/* Mobile Background: Gray box at top for continuity */}
            <div className="absolute inset-x-0 top-0 h-[75%] bg-[#2D2926] lg:hidden z-0" />

            {/* Mobile Background: Organic shape at bottom (fixed height) */}
            <div 
                className="absolute inset-x-0 bottom-0 h-[300px] bg-[#2D2926] lg:hidden z-0 translate-y-20"
                style={{
                    maskImage: 'url(/images/home_redesign/SVG/curva_inferiro2.svg)',
                    WebkitMaskImage: 'url(/images/home_redesign/SVG/curva_inferiro2.svg)',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'bottom center',
                    WebkitMaskPosition: 'bottom center',
                    maskSize: '100% 100%',
                    WebkitMaskSize: '100% 100%',
                }} 
            />

            {/* Desktop Background: EXACT RESTORATION of initial behavior */}
            <div 
                className="absolute inset-0 z-0 hidden lg:block scale-y-150 scale-x-125 md:scale-x-115 origin-bottom translate-y-32"
                style={{
                    maskImage: 'url(/images/home_redesign/SVG/curva_inferiro2.svg)',
                    WebkitMaskImage: 'url(/images/home_redesign/SVG/curva_inferiro2.svg)',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                    maskSize: '100% 100%',
                    WebkitMaskSize: '100% 100%',
                    backgroundColor: '#2D2926'
                }} 
            />
            
            <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    
                    {/* Text Content - Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 space-y-8 text-center lg:text-left order-2 lg:order-1"
                    >
                        <div className="space-y-4">
                            <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-white/40 uppercase">
                                BIBLIOTERAPIA
                            </span>
                            <h2 className="text-5xl md:text-7xl lg:text-[7.5rem] font-script text-[#B8835A] leading-[0.9] drop-shadow-sm tracking-[0.03em]">
                                Cofre de Sabiduría
                            </h2>
                        </div>

                        <p className="text-xl md:text-2xl text-white/70 font-body font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                            Libros diseñados para ser espejos de tu alma. El conocimiento que buscas ya habita en ti; estos libros solo te ayudan a recordarlo
                        </p>

                        <div className="pt-8">
                            <Link
                                href="/libros"
                                className="inline-block px-12 py-5 bg-[#B8835A] text-white rounded-2xl font-bold text-xs tracking-[0.2em] uppercase transition-all hover:scale-105 shadow-xl hover:shadow-[#B8835A]/20"
                            >
                                IR A LA BIBLIOTECA
                            </Link>
                        </div>
                    </motion.div>

                    {/* Image Content - Right (Vertical with organic rounded corner, absolute no background shapes) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2"
                    >
                        <div className="relative w-full aspect-[3/4] max-w-[450px] rounded-[40px] rounded-tr-[150px] overflow-hidden shadow-2xl">
                            <Image
                                src="/images/home_redesign/cofre-sabiduria-premium.png"
                                alt="Cofre de Sabiduría"
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Ambient Glow removed to keep it ultra clean as requested */}
                        </div>
                    </motion.div>
                </div>
            </div>


            {/* Bottom Corner Glows - Consistency with the rest of the landing page */}
            <div className="absolute bottom-[-10vh] left-[-12vw] w-[24vw] h-[24vw] bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.95)_0%,rgba(255,107,0,0.95)_60%,transparent_90%)] blur-[140px] pointer-events-none z-[9999]" />
            <div className="absolute bottom-[-10vh] right-[-12vw] w-[24vw] h-[24vw] bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.95)_0%,rgba(255,107,0,0.95)_60%,transparent_90%)] blur-[140px] pointer-events-none z-[9999]" />
        </section>
    );
}
