"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { WaveDivider } from "@/components/ui/MysticalElements";


const services = [
    {
        id: "01",
        title: "Coaching Ancestral",
        tag: "PORTAL 01",
        description: "Un viaje profundo de 'Anatomía del Alma'. Utilizamos psicología sistémica y rituales para restaurar el orden en tus vínculos y propósitos.",
        cta: "ENTRAR AL PORTAL",
        link: "/servicios/coaching-ancestral",
        image: "/images/home_redesign/service_coaching_clean.jpg",
    },
    {
        id: "02",
        title: "Cuerpo y Santuario",
        tag: "PORTAL 02",
        description: "Libera las memorias atrapadas en tu piel. Desde masajes ancestrales hasta shirodhara, el cuerpo es el templo donde ocurre la verdadera liberación.",
        cta: "ENTRAR AL PORTAL",
        link: "/servicios/sesiones-corporales",
        image: "/images/home_redesign/service_sanctuary.png",
    },
];

export default function ServiceSelector() {
    return (
        <section className="relative overflow-hidden bg-white">
            {/* Corner Glow Effect */}
            <div className="absolute bottom-0 left-0 w-64 h-64 md:w-[600px] md:h-[600px] pointer-events-none opacity-50 z-0">
                <Image
                    src="/images/home_redesign/bluer.png"
                    alt=""
                    fill
                    className="object-contain object-left-bottom"
                />
            </div>
            {/* White Header Area */}
            <div className="relative pt-32 pb-48 z-20">
                <div className="container mx-auto px-4 text-center">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-xs font-bold tracking-[0.4em] uppercase text-text/60"
                    >
                        ECOSISTEMA DE EVOLUCIÓN
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-5xl md:text-6xl font-script text-[#B8835A] italic"
                    >
                        ¿Cómo quieres comenzar?
                    </motion.h2>
                </div>
            </div>



            {/* PORTAL 01 - DARK SECTION */}
            <div className="relative bg-[#2D2926] pt-40 pb-56 z-20 mt-16">
                {/* Wave Transition Top */}
                <WaveDivider position="top" fill="#FFFFFF" />


                
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-[#ff9a5c]/10 via-transparent to-transparent pointer-events-none" />


                <div className="container mx-auto px-4 relative max-w-7xl">
                    <div className="relative flex flex-col lg:flex-row items-center gap-16 lg:gap-0">
                        {/* Circular Image Container */}
                        <div className="lg:w-1/2 flex justify-center lg:justify-start">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative w-64 h-64 md:w-[480px] md:h-[480px] lg:w-[580px] lg:h-[580px] rounded-full overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,1)] z-50 -mt-56 lg:-mt-[380px] lg:-ml-12"
                            >
                                <Image
                                    src={services[0].image}
                                    alt={services[0].title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </div>

                        {/* Text Content */}
                        <div className="lg:w-1/2 text-white space-y-8 text-center lg:text-left z-20 pt-12 lg:pt-0 lg:pl-12">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="space-y-6"
                            >
                                <span className="block text-xs font-bold tracking-[0.4em] uppercase text-white/50">
                                    {services[0].tag}
                                </span>
                                <h3 className="text-6xl md:text-[7.5rem] font-script text-[#B8835A] italic leading-[0.75] drop-shadow-md pb-6">
                                    {services[0].title}
                                </h3>
                                <p className="text-xl md:text-2xl font-body font-light leading-relaxed text-white/80 max-w-xl mx-auto lg:mx-0">
                                    {services[0].description}
                                </p>
                                
                                <div className="pt-12">
                                    <Link
                                        href={services[0].link}
                                        className="inline-block px-14 py-5 bg-[#B8835A] text-white rounded-2xl font-body font-bold tracking-[0.2em] uppercase transition-all hover:scale-105 hover:bg-[#c9956d] shadow-2xl active:scale-95"
                                    >
                                        {services[0].cta}
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Wave Transition Bottom */}
                <WaveDivider position="bottom" fill="#FFFFFF" />
            </div>

            {/* PORTAL 02 - LIGHT SECTION */}
            <div className="relative bg-white pt-48 pb-32 z-10">
                {/* Decorative Lines and Glows */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-[#ff9a5c]/5 via-transparent to-[#ff9a5c]/10 pointer-events-none" />
                
                {/* Vertical Curly Line Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg pointer-events-none opacity-40 z-0">
                    <Image
                        src="/images/home_redesign/lineavertical.png"
                        alt=""
                        fill
                        className="object-contain"
                    />
                </div>


                <div className="container mx-auto px-4 relative max-w-7xl">
                    <div className="relative flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        {/* Text Content Left */}
                        <div className="lg:w-1/2 text-text space-y-8 text-center lg:text-left z-20">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="space-y-6"
                            >
                                <span className="block text-xs font-bold tracking-[0.4em] uppercase text-text/40">
                                    {services[1].tag}
                                </span>
                                <h3 className="text-6xl md:text-[7rem] font-script text-[#B8835A] italic leading-[0.75] pb-6">
                                    {services[1].title}
                                </h3>
                                <p className="text-xl md:text-2xl font-body font-light leading-relaxed text-text/70 max-w-xl mx-auto lg:mx-0">
                                    {services[1].description}
                                </p>
                                
                                <div className="pt-10">
                                    <Link
                                        href={services[1].link}
                                        className="inline-block px-14 py-5 bg-[#B8835A] text-white rounded-2xl font-body font-bold tracking-[0.2em] uppercase transition-all hover:scale-105 hover:bg-[#c9956d] shadow-[0_20px_40px_-10px_rgba(184,131,90,0.4)] active:scale-95"
                                    >
                                        {services[1].cta}
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        {/* Image Content Right - Rectangular with organic corner */}
                        <div className="lg:w-1/2 flex justify-center lg:justify-end">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative w-full aspect-[4/5] max-w-[550px] rounded-[40px] rounded-tr-[150px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]"
                            >
                                <Image
                                    src={services[1].image}
                                    alt={services[1].title}
                                    fill
                                    className="object-cover"
                                />
                                {/* Soft Inner Glow */}
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Ver Todos Los Servicios */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-32 flex justify-center lg:justify-start"
                    >
                        <Link 
                            href="/servicios" 
                            className="group flex items-center gap-3 text-xs font-bold tracking-[0.4em] uppercase text-text/40 hover:text-[#B8835A] transition-colors"
                        >
                            VER TODOS LOS SERVICIOS
                            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>
                
                {/* Wavy transition to the next dark section (ArchitectureSector) */}
                <WaveDivider position="bottom" fill="#2D2926" />
            </div>
        </section>
    );
}
