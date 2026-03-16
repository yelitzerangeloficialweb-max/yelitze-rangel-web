"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WisdomChest() {
    return (
        <section className="relative py-32 bg-[#2D2926] overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#B8835A]/5 blur-[120px] rounded-full pointer-events-none" />

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
                            <h2 className="text-6xl md:text-[7rem] font-script text-[#B8835A] italic leading-[0.8] drop-shadow-sm">
                                Cofre de Sabiduría
                            </h2>
                        </div>

                        <p className="text-xl md:text-2xl text-white/70 font-body font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                            Libros diseñados para ser espejos de tu alma. El conocimiento que buscas ya habita en ti; estos libros solo te ayudan a recordarlo
                        </p>
                    </motion.div>

                    {/* Image Content - Right (Vertical with organic rounded corner) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2"
                    >
                        <div className="relative w-full aspect-[3/4] max-w-[450px] rounded-[40px] rounded-tr-[150px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                            <Image
                                src="/images/home_redesign/wisdom_chest.png"
                                alt="Cofre de Sabiduría"
                                fill
                                className="object-cover"
                            />
                            {/* Ambient Glow */}
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* White Transition Brush Separator at the Bottom (Transitions to white Newsletter bg) */}
            <div className="absolute bottom-0 left-0 w-full h-[300px] lg:h-[500px] z-20 pointer-events-none translate-y-[60%]">
                <Image
                    src="/assets/images/brush-separator.png"
                    alt=""
                    fill
                    className="object-fill object-top brightness-100 scale-y-125"
                    priority
                />
            </div>

            {/* Floating curly line decoration on the left */}
            <div className="absolute bottom-24 left-10 w-32 h-32 opacity-20 pointer-events-none hidden lg:block">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#B8835A] fill-none stroke-[0.5]">
                    <path d="M0,50 C20,20 80,80 100,50 S180,20 200,50" />
                </svg>
            </div>
        </section>
    );
}
