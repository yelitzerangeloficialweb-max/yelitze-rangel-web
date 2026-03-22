"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WisdomChest() {
    return (
        <section className="relative py-32 bg-[#2D2926] overflow-hidden">
            {/* Minimalist Background - No glows or shapes */}
            
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
                                src="/assets/images/yelitze-reading-books.jpg"
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




        </section>
    );
}
