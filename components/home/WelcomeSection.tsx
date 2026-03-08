"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WelcomeSection() {
    return (
        <section className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 space-y-8"
                    >
                        <h2 className="text-4xl md:text-6xl font-script text-accent italic">
                            Bienvenida familia de Almas
                        </h2>

                        <div className="space-y-6 text-lg text-text/80 leading-relaxed font-body font-light">
                            <p>
                                Soy Yelitze Rangel, de origen, un puente de amor y sanación.
                                Mi propósito es acompañarte a recordar la sabiduría que ya habita en ti.
                            </p>
                            <p>
                                A través de las Constelaciones Familiares y la Sanación Ancestral,
                                exploramos juntos los hilos invisibles que tejen tu historia,
                                transformando el dolor en fuerza y la sombra en luz.
                            </p>
                        </div>

                        <Link
                            href="/sobre-mi"
                            className="btn-outline group font-heading"
                        >
                            Conocer mi historia
                        </Link>
                    </motion.div>

                    {/* Portrait Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotate: 5 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex-1 relative"
                    >
                        {/* Organic Border/Frame */}
                        <div className="absolute -inset-4 border border-accent/20 rounded-[40px] rotate-3 z-0" />
                        <div className="absolute -inset-4 border border-primary/10 rounded-[60px] -rotate-2 z-0" />

                        <div className="relative z-10 rounded-[30px] overflow-hidden shadow-2xl">
                            <Image
                                src="/images/home_redesign/yelitze.png"
                                alt="Yelitze Rangel"
                                width={600}
                                height={750}
                                className="object-cover w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Decorative Accent */}
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/10 rounded-full blur-3xl z-0" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
