"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WelcomeSection() {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            {/* Ambient Orange Background Glow */}
            <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-[#ff9a5c]/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -top-[20%] right-[-10%] w-[500px] h-[700px] bg-[#ff9a5c]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    
                    {/* Text Content - Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 space-y-8 text-center lg:text-left"
                    >
                        <div className="space-y-4">
                            <h2 className="text-6xl md:text-[6.5rem] font-script text-[#B8835A] italic leading-[0.85] drop-shadow-sm">
                                Bienvenida familia de Almas
                            </h2>
                        </div>

                        <div className="space-y-6 text-xl md:text-2xl text-text/80 leading-relaxed font-body font-light max-w-xl mx-auto lg:mx-0">
                            <p>
                                Soy Yelitze Rangel, de origen, un puente de amor y sanación.
                                Mi propósito es acompañarte a recordar la sabiduría que ya habita en ti.
                            </p>
                            <p>
                                Especialista en Psicología Sistémica y Constelaciones Familiares, 
                                con un enfoque integral que une lo humano y lo divino.
                            </p>
                        </div>

                        <div className="pt-6">
                            <Link
                                href="/sobre-mi"
                                className="inline-block px-12 py-4 border border-[#B8835A] text-[#B8835A] rounded-2xl font-body font-bold tracking-widest uppercase transition-all hover:bg-[#B8835A] hover:text-white active:scale-95"
                            >
                                CONOCER MI HISTORIA
                            </Link>
                        </div>
                    </motion.div>

                    {/* Portrait Image Content - Right */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="flex-1 relative"
                    >
                        {/* Orange Brush Stroke/Glow behind image */}
                        <div className="absolute -top-12 -right-12 w-[120%] h-[120%] bg-[#ff9a5c]/15 blur-[80px] rounded-full pointer-events-none z-0" />
                        
                        {/* Decorative squiggly line (svg for better control) */}
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-24 w-48 h-48 opacity-20 pointer-events-none">
                            <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#B8835A] fill-none stroke-[0.5]">
                                <path d="M0,50 C20,20 80,80 100,50 S180,20 200,50" />
                            </svg>
                        </div>

                        {/* Portrait Image with Organic Clipping/Rounding */}
                        <div className="relative z-10 w-full max-w-[550px] aspect-[4/5] rounded-[40px] rounded-tr-[150px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] mx-auto lg:ml-auto">
                            <Image
                                src="/images/home_redesign/yelitze.png"
                                alt="Yelitze Rangel"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Subtle Floating Elements/Glows */}
                        <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#B8835A]/10 blur-[60px] rounded-full z-0" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
