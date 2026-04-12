"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WelcomeSection() {
    return (
        <section className="py-16 md:py-32 bg-white relative overflow-hidden z-30">


            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Text Content - Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 space-y-8 text-center lg:text-left"
                    >
                        <div className="space-y-4">
                            <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-script text-[#B8835A] leading-tight drop-shadow-sm lg:whitespace-nowrap tracking-[0.03em]">
                                Bienvenida familia de Almas
                            </h2>
                        </div>

                        <div className="space-y-6 text-xl md:text-2xl text-text/90 leading-relaxed font-body max-w-xl mx-auto lg:mx-0">
                            <p>
                                Soy Yelitzé Rangel. Acompaño a personas valientes a mirar con amor su historia
                                para liberar cargas que no les pertenecen y tomen la fuerza de sus ancestros para vivir el presente.
                            </p>
                            <p>
                                Durante años he integrado la Psicología, la Tanatología, el descongelamiento del trauma
                                para crear un método que no solo se queda en la mente, sino que baja al corazón y al cuerpo.
                            </p>
                        </div>

                        <div className="pt-8">
                            <Link
                                href="/sobre-mi"
                                className="inline-block px-14 py-5 bg-[#B8835A] text-white rounded-2xl font-body font-bold tracking-[0.25em] uppercase transition-all hover:scale-105 hover:bg-[#c9956d] shadow-2xl active:scale-95"
                            >
                                CONOCE MI HISTORIA
                            </Link>
                        </div>
                    </motion.div>

                    {/* Portrait Image Content - Right */}
                    <motion.div
                        initial={{ opacity: 1, scale: 1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="flex-1 relative"
                    >




                        {/* Decorative squiggly line (svg for better control) */}
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-24 w-48 h-48 opacity-20 pointer-events-none">
                            <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#B8835A] fill-none stroke-[0.5]">
                                <path d="M0,50 C20,20 80,80 100,50 S180,20 200,50" />
                            </svg>
                        </div>

                        {/* Portrait Image with Organic Clipping/Rounding */}
                        <div className="relative z-10 w-full max-w-[550px] aspect-[4/5] rounded-[40px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] mx-auto lg:ml-auto">
                            <Image
                                src="/assets/images/yelitze-home-portrait.jpg"
                                alt="Yelitze Rangel"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>


                    </motion.div>
                </div>
            </div>
        </section>
    );
}
