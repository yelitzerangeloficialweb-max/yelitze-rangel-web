"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";


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
        description: "Libera las memorias atrapadas en tu cuerpo. Desde masajes ancestrales hasta shirodhara, el cuerpo es el templo donde ocurre la verdadera liberación.",
        cta: "ENTRAR AL PORTAL",
        link: "/servicios/sesiones-corporales",
        image: "/images/home_redesign/Web-Yelitze-03.png",
    },
];

export default function ServiceSelector() {
    return (
        <section id="como-comenzar" className="relative bg-white overflow-visible">
            {/* High Level Global Flares for this section - Targets the Title area */}
            <div className="absolute top-[-8vh] right-[-15vw] w-[35vw] h-[35vw] bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.95)_0%,rgba(255,107,0,0.85)_50%,transparent_90%)] blur-[140px] pointer-events-none z-[9999]" />

            {/* Main Header - Now above the dark section to avoid overlap */}
            <div className="relative pt-24 pb-12 md:pt-[220px] z-20">
                <div className="container mx-auto px-4 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-xs font-bold tracking-[0.4em] uppercase text-black"
                    >
                        ECOSISTEMA DE EVOLUCIÓN
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-6xl md:text-[8.5rem] font-script text-[#B8835A] leading-tight tracking-[0.03em] font-bold not-italic"
                    >
                        ¿Cómo quieres comenzar?
                    </motion.h2>
                </div>
            </div>



            {/* PORTAL 01 - WHITE SECTION WITH BRUSH BACKGROUND */}
            <div className="relative bg-white pt-20 pb-40 md:pt-40 md:pb-64 z-20 mt-16">
                {/* Huge Brush Shape Background */}
                <div
                    className="absolute inset-0 z-0 origin-bottom scale-y-125 translate-y-[calc(5%+15px)]"
                    style={{
                        maskImage: 'url(/images/home_redesign/brush-bottom.svg)',
                        WebkitMaskImage: 'url(/images/home_redesign/brush-bottom.svg)',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'bottom center',
                        WebkitMaskPosition: 'bottom center',
                        maskSize: '100% 100%',
                        WebkitMaskSize: '100% 100%',
                        backgroundColor: '#2D2926'
                    }}
                />

                {/* Background Glows (inside the brush) */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-white/10 via-transparent to-transparent pointer-events-none z-10" />


                <div className="container mx-auto px-4 relative max-w-7xl z-20">
                    <div className="relative flex flex-col lg:flex-row items-center gap-16 lg:gap-0">
                        {/* Circular Image Container */}
                        <div className="lg:w-1/2 flex justify-center lg:justify-start">
                            <motion.div
                                initial={{ scale: 1, opacity: 1 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative w-64 h-64 md:w-[480px] md:h-[480px] lg:w-[580px] lg:h-[580px] rounded-full overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,1)] z-50 -mt-32 lg:-mt-[150px] lg:-ml-12"
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

                        {/* Text Content - Moved up to keep button inside dark section */}
                        <div className="lg:w-1/2 text-white space-y-8 text-center lg:text-left z-20 pt-16 lg:pt-48 lg:pl-12">
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
                                <h3 className="text-5xl md:text-7xl lg:text-[6.5rem] font-script text-[#B8835A] leading-tight lg:whitespace-nowrap drop-shadow-md pb-6 tracking-[0.03em]">
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
            </div>

            {/* PORTAL 02 - LIGHT SECTION */}
            <div className="relative bg-white pt-24 pb-16 md:pt-48 md:pb-32 z-10">
                {/* Decorative Glows */}

                {/* Animated Subtle Rings - From maintenance page */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 45, 0],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] border-2 border-[#B8835A] rounded-full"
                    />
                    <motion.div
                        animate={{
                            scale: [1.1, 1, 1.1],
                            rotate: [0, -35, 0],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-[15%] -right-[10%] w-[70%] h-[70%] border-2 border-[#8C4005] rounded-full"
                    />
                </div>

                {/* Portal 02 Specific Flare - Right Side */}
                <div className="absolute top-[20%] right-[-15vw] w-[35vw] h-[35vw] bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.9)_0%,transparent_80%)] blur-[150px] pointer-events-none z-[9999]" />

                {/* CSS Based Glow - Bottom Left */}
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_left,_rgba(255,107,0,0.95)_0%,_transparent_75%)] pointer-events-none z-0" />


                <div className="container mx-auto px-4 relative max-w-7xl">
                    <div className="relative flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
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
                                <h3 className="text-5xl md:text-8xl lg:text-[9.5rem] font-script text-[#B8835A] leading-[1] pb-6 tracking-[0.03em]">
                                    {services[1].title}
                                </h3>
                                <p className="text-xl md:text-2xl font-body font-light leading-relaxed text-text/70 max-w-xl mx-auto lg:mx-0">
                                    {services[1].description}
                                </p>

                                <div className="pt-10 flex flex-col items-center lg:items-start gap-8">
                                    <Link
                                        href={services[1].link}
                                        className="inline-block px-14 py-5 bg-[#B8835A] text-white rounded-2xl font-body font-bold tracking-[0.2em] uppercase transition-all hover:scale-105 hover:bg-[#c9956d] shadow-[0_20px_40px_-10px_rgba(184,131,90,0.4)] active:scale-95"
                                    >
                                        {services[1].cta}
                                    </Link>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                    >
                                        <Link
                                            href="/servicios"
                                            className="group flex items-center gap-3 text-xs font-body font-bold tracking-[0.4em] uppercase text-text/40 hover:text-[#B8835A] transition-colors"
                                        >
                                            VER TODOS LOS SERVICIOS
                                            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:w-1/2 flex justify-center lg:justify-end">
                            <motion.div
                                initial={{ scale: 1, opacity: 1 }}
                                whileInView={{ scale: 1, opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative w-full aspect-[4/5] max-w-[550px] rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] lg:translate-x-12"
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


                </div>
            </div>



            {/* Bottom Corner Glows - Mirroring left and right for balance */}
            <div className="absolute bottom-[-15vh] left-[-12vw] w-[24vw] h-[24vw] bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.95)_0%,rgba(255,107,0,0.95)_60%,transparent_90%)] blur-[140px] pointer-events-none z-[9999]" />
            <div className="absolute bottom-[-15vh] right-[-12vw] w-[24vw] h-[24vw] bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.95)_0%,rgba(255,107,0,0.95)_60%,transparent_90%)] blur-[140px] pointer-events-none z-[9999]" />
        </section>
    );
}
