"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
    {
        title: "Coaching Ancestral",
        tag: "ALMA",
        description: "Un viaje profundo de Maestría del Alma. Utilizamos pedagogía sistémica y rituales para restaurar el orden en tus vínculos y propósitos.",
        cta: "ENTRAR AL PORTAL",
        link: "/servicios/coaching-ancestral",
        image: "/images/home_redesign/service_coaching.png",
    },
    {
        title: "Cuerpo y Santuario",
        tag: "CUERPO",
        description: "Libera las memorias atrapadas en tu piel. Desde sesiones de sanación hasta alineación, entra en el templo donde ocurre la verdadera liberación.",
        cta: "CONOCER MI HISTORIA",
        link: "/servicios/sesiones-corporales",
        image: "/images/home_redesign/service_sanctuary.png",
    },
];

export default function ServiceSelector() {
    return (
        <section className="py-24 bg-surface/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <span className="text-sm font-medium tracking-[0.2em] uppercase opacity-60">
                        ENCUENTRA TU CAMINO
                    </span>
                    <h2 className="mt-4 text-4xl md:text-6xl font-script text-accent italic">
                        ¿Cómo quieres comenzar?
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            className="group"
                        >
                            <Link href={service.link} className="block space-y-8">
                                <div className="relative aspect-square rounded-[20px] overflow-hidden shadow-lg">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                <div className="space-y-4">
                                    <span className="text-xs font-bold tracking-[0.2em] text-accent opacity-80 uppercase">
                                        {service.tag}
                                    </span>
                                    <h3 className="text-3xl font-serif text-text">
                                        {service.title}
                                    </h3>
                                    <p className="text-text/70 font-light leading-relaxed max-w-md">
                                        {service.description}
                                    </p>
                                    <div className="pt-4">
                                        <span className="inline-block px-8 py-3 border border-accent text-accent group-hover:bg-accent group-hover:text-background transition-all rounded-full text-xs font-bold tracking-[0.1em] uppercase">
                                            {service.cta}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
