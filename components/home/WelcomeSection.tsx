"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WelcomeSection() {
    return (
        <section className="py-32 bg-white relative overflow-hidden">


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

                        


                        {/* Portrait Image with Organic Clipping/Rounding */}
                        <div className="relative z-10 w-full max-w-[550px] aspect-[4/5] rounded-[40px] rounded-tr-[150px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] mx-auto lg:ml-auto">
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
