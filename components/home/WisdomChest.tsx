"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WisdomChest() {
    return (
        <section className="relative py-24 bg-[#2D2926] overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#B8835A]/10 blur-[120px] rounded-full pointer-events-none" />

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
                                BIBLIOTECA DEL ALMA
                            </span>
                            <h2 className="text-6xl md:text-[6.5rem] font-script text-[#B8835A] italic leading-[0.8] drop-shadow-sm">
                                Cofre de Sabiduría
                            </h2>
                        </div>

                        <p className="text-xl md:text-2xl text-white/70 font-body font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Libros diseñados para ser espejos de tu alma. El conocimiento que buscas ya habita dentro de ti, estos libros ahora te ayudarán a recordarlo.
                        </p>

                        <div className="pt-8">
                            <Link
                                href="/libros"
                                className="inline-block px-12 py-4 border border-[#B8835A] text-[#B8835A] rounded-2xl font-body font-bold tracking-widest uppercase transition-all hover:bg-[#B8835A] hover:text-white active:scale-95"
                            >
                                EXPLORAR EL COFRE
                            </Link>
                        </div>
                    </motion.div>

                    {/* Image Content - Right */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2"
                    >
                        <div className="relative w-full aspect-[4/5] max-w-[550px] rounded-[40px] rounded-tr-[150px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)]">
                            <Image
                                src="/images/home_redesign/wisdom_chest.png"
                                alt="Cofre de Sabiduría"
                                fill
                                className="object-cover"
                            />
                            {/* Inner Glow */}
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Transition Brush Separator at the Bottom - To transition to Newsletter */}
            <div className="absolute bottom-0 left-0 w-full h-[200px] lg:h-[400px] z-20 pointer-events-none translate-y-[80%]">
                <Image
                    src="/assets/images/brush-separator-black.png"
                    alt=""
                    fill
                    className="object-fill object-top brightness-[0.18] scale-y-125"
                />
            </div>
        </section>
    );
}
