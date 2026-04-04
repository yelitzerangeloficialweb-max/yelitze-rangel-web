"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight, Users, Building2, HeartHandshake,
    Calendar, BookOpen, Sparkles, Star
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import TypewriterText from "@/components/ui/TypewriterText";

export default function ServicesPage() {
    return (
        <main className="min-h-screen selection:bg-[var(--color-secondary)] selection:text-white bg-stone-950">

            {/* 1. SECTION: COACHING ANCESTRAL (Full Redesign) */}
            <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/home_redesign/servicios-hero-v1.png"
                        alt="Coaching Ancestral - Yelitze Rangel"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    {/* Subtle Overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-black/20 z-10" />
                </div>
                
                <div className="container mx-auto px-8 lg:px-40 relative z-20">
                    <div className="max-w-2xl ml-auto text-right space-y-12 lg:space-y-16">
                        <FadeIn>
                            {/* Pill Badge */}
                            <div className="inline-block border border-white/40 bg-black/20 backdrop-blur-sm px-8 py-3 rounded-full mb-8">
                                <span className="text-white text-xs lg:text-sm font-bold uppercase tracking-[0.4em]">
                                    Coaching Ancestral
                                </span>
                            </div>

                            {/* Main Heading */}
                            <div className="space-y-2 mb-12">
                                <h1 className="text-5xl lg:text-8xl font-bold text-white uppercase tracking-tight leading-none">
                                    NO ES MAGIA
                                </h1>
                                <p className="font-script text-5xl lg:text-9xl text-white leading-[0.6] lg:leading-[0.5] mt-[-0.1em] lg:mt-[-0.2em]">
                                    es alineación
                                </p>
                            </div>

                            {/* Description */}
                            <div className="space-y-8 max-w-sm ml-auto">
                                <p className="text-white text-lg lg:text-xl font-medium leading-relaxed opacity-90">
                                    Activación consciente del creador deliberado a través de la Anatomía del Alma.
                                </p>
                                
                                <Link
                                    href="/servicios/coaching-ancestral"
                                    className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group text-sm uppercase tracking-[0.3em] font-bold"
                                >
                                    ver sesiones íntimas »
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 2. SECTION: SESIONES CORPORALES (Full-bleed redesign with Grayscale effect) */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-stone-900">
                {/* Background Image Restored to Color */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/home_redesign/Web-Yelitze-servicios-03.png"
                        alt="Sesiones Corporales - Alquimia del Tacto"
                        fill
                        className="object-cover object-center brightness-90 transition-all duration-1000"
                        priority
                    />
                    {/* Charcoal/Dark Grey gradient overlay for editorial look */}
                    <div className="absolute inset-y-0 left-0 w-full lg:w-[65%] bg-gradient-to-r from-stone-950 via-stone-950/40 to-transparent z-10" />
                </div>

                <div className="container mx-auto px-8 lg:px-40 relative z-20">
                    <div className="max-w-2xl space-y-12">
                        <FadeIn>
                            {/* Accent Subtitle */}
                            <p className="text-[var(--color-secondary)] font-bold uppercase tracking-[0.4em] text-xs lg:text-sm mb-6">
                                Alquimia del Tacto
                            </p>

                            {/* Main Script Heading */}
                            <h2 className="font-script text-6xl lg:text-9xl text-[var(--color-secondary)] leading-none mb-12">
                                Sesiones Corporales
                            </h2>

                            {/* Narrative Content */}
                            <div className="space-y-8 max-w-lg">
                                <p className="text-white lg:text-xl font-light italic leading-relaxed opacity-90">
                                    “El lenguaje más antiguo que hace vibrar la piel, nutre el corazón y acaricia el alma.”
                                </p>
                                
                                <p className="text-white/80 text-lg lg:text-xl leading-relaxed font-light">
                                    Reconexión profunda a través del santuario del cuerpo. Liberamos memorias estancadas para que el alma pueda expresarse con libertad.
                                </p>

                                <div className="pt-8">
                                    <Link
                                        href="/servicios/sesiones-corporales"
                                        className="inline-flex items-center justify-center bg-[var(--color-secondary)] text-white hover:brightness-110 transition-all px-10 py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-xs lg:text-sm shadow-xl group"
                                    >
                                        Explorar Todas las Técnicas »
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 3. SECTION: SABIDURÍA & LEGADO (Exact Color Calibration) */}
            <section className="py-24 lg:py-40 bg-[#1c1c1c] relative overflow-hidden">
                {/* Background Glows to match mockup exactly */}
                <div className="absolute top-0 right-0 w-[80%] h-full bg-[radial-gradient(circle_at_top_right,_rgba(77,56,45,0.4),_transparent_70%)] pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
                    <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain scale-150 -rotate-12" />
                </div>
                
                <div className="container mx-auto px-8 lg:px-40 relative">
                    <FadeIn className="text-center mb-24 space-y-4">
                        <span className="text-white/40 text-[10px] lg:text-xs font-bold uppercase tracking-[0.6em] block mb-4">
                            ECOSISTEMA DE EVOLUCIÓN
                        </span>
                        <h2 className="font-script text-6xl lg:text-[10rem] text-[#b8835a] leading-[0.8] mb-8">
                            Sabiduría & Legado
                        </h2>
                        <p className="font-script text-2xl lg:text-4xl text-white/70 leading-relaxed max-w-3xl mx-auto italic">
                            Espacios para sanar en tribu y herramientas para tu propio ritmo.
                        </p>
                    </FadeIn>

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 max-w-7xl mx-auto">
                        {/* Eventos / Grupales */}
                        <FadeIn>
                            <div className="group space-y-10">
                                <Link href="/eventos" className="block relative aspect-[16/10] rounded-tl-[80px] rounded-br-[80px] rounded-tr-xl rounded-bl-xl overflow-hidden shadow-2xl border border-white/5">
                                    <Image
                                        src="/images/home_redesign/capacitacionesgrupales.png"
                                        alt="Capacitaciones Grupales"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
                                </Link>
                                <div className="space-y-6 px-2">
                                    <h3 className="font-script text-5xl lg:text-7xl text-[#b8835a] leading-none">
                                        Capacitaciones Grupales
                                    </h3>
                                    <p className="text-white/70 leading-relaxed text-lg lg:text-xl font-light">
                                        Talleres intensivos para sanar en tribu. La energía del grupo potencia el trabajo individual mediante espejos sistémicos.
                                    </p>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Libros & Recursos */}
                        <FadeIn delay={0.2}>
                            <div className="group space-y-10">
                                <Link href="/libros" className="block relative aspect-[16/10] rounded-tr-[80px] rounded-bl-[80px] rounded-tl-xl rounded-br-xl overflow-hidden shadow-2xl border border-white/5 group">
                                    <div className="grid grid-cols-2 h-full bg-white/5">
                                        <div className="relative h-full">
                                            <Image
                                                src="/assets/images/chamana-bg.png"
                                                alt="Conversaciones con mi Chamana"
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                                            />
                                        </div>
                                        <div className="relative h-full border-l border-white/5">
                                            <Image
                                                src="/assets/images/hilos-bg.png"
                                                alt="Hilos de Conexión"
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                                            />
                                        </div>
                                    </div>
                                    {/* Central Dissipate Gradient to blend both images */}
                                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-40 bg-gradient-to-r from-transparent via-[#1c1c1c]/90 to-transparent z-10" />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
                                </Link>
                                <div className="space-y-6 px-2">
                                    <h3 className="font-script text-5xl lg:text-7xl text-[#b8835a] leading-none">
                                        Libros y Recursos
                                    </h3>
                                    <p className="text-white/70 leading-relaxed text-lg lg:text-xl font-light">
                                        'Hilos de Conexión' y 'Conversaciones con mi Chamana': herramientas diseñadas para tu viaje de autodescubrimiento cotidiano.
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 4. SECTION: CORPORATIVO (Full Background Redesign - Forced Edge-to-Edge) */}
            <section className="py-24 lg:py-48 bg-[#1c1c1c] relative overflow-hidden w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
                {/* Full-bleed Background Image with Gradient Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/images/corporate-vortex.png"
                        alt="Sesiones Corporativas"
                        fill
                        className="object-cover grayscale-[0.2] brightness-75 transition-all duration-1000 w-full h-full"
                        priority
                    />
                    {/* Deep gradient from left to ensure text legibility */}
                    <div className="absolute inset-y-0 left-0 w-full lg:w-[70%] bg-gradient-to-r from-[#1c1c1c] via-[#1c1c1c]/60 to-transparent z-10" />
                </div>
                
                <div className="container mx-auto px-8 lg:px-40 relative z-20">
                    <div className="flex flex-col lg:flex-row items-center min-h-[80vh] lg:min-h-screen">
                        {/* Content Side Overlay */}
                        <div className="lg:w-3/5 space-y-12 py-24 lg:py-0">
                            <FadeIn>
                                <div className="space-y-4">
                                    <span className="font-script text-4xl lg:text-5xl text-[#b8835a] leading-none block">
                                        Liderazgo & Origen
                                    </span>
                                    <h2 className="text-4xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tighter uppercase">
                                        SESIONES <br /> CORPORATIVAS
                                    </h2>
                                </div>

                                <div className="space-y-10">
                                    <p className="text-xl lg:text-2xl text-white/90 font-serif italic border-l-4 border-[#b8835a] pl-8 py-2">
                                        Impulsa el potencial de tu equipo a través de la visión sistémica.
                                    </p>
                                    
                                    <p className="text-lg text-white/70 leading-relaxed font-light max-w-xl">
                                        Sanamos la cultura organizacional para alcanzar objetivos extraordinarios enfocándonos en el alma de la empresa y su propósito original.
                                    </p>

                                    <ul className="space-y-6">
                                        {[
                                            "Coaching para líderes y alta gerencia",
                                            "Dinámicas de equipo con mirada circular",
                                            "Resolución de conflictos sistémicos"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-4 text-white/80 font-light">
                                                <Sparkles className="w-5 h-5 text-[#b8835a]" />
                                                <span className="text-lg">{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="pt-8 text-left">
                                        <a
                                            href="https://wa.me/17867268717"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center bg-[#b8835a] text-white hover:brightness-110 transition-all px-10 py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-xs lg:text-sm shadow-2xl group"
                                        >
                                            Solicitar Propuesta »
                                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. FINAL CTA (Premium Redesign) */}
            <section className="relative py-48 md:py-64 overflow-hidden bg-stone-950">
                {/* Background Image: High-Fidelity Andean Landscape */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/home_redesign/cta-clarity-bg.png"
                        alt="Sesión de Claridad - Evolución Sistémica"
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                    {/* Deep Cinematic Vignette & Warm Glow */}
                    <div className="absolute inset-0 bg-stone-950/40 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/20 z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(224,159,106,0.15),_transparent_70%)] z-10" />
                </div>

                <div className="container mx-auto px-8 relative z-20 text-center">
                    <FadeIn>
                        <div className="space-y-6 mb-20 max-w-5xl mx-auto">
                            <span className="font-script text-7xl lg:text-[11rem] text-white/95 leading-none block drop-shadow-2xl">
                                ¿Buscas una solución...
                            </span>
                            <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-widest leading-none mt-[-0.2em] drop-shadow-xl">
                                A TU MEDIDA?
                            </h2>
                            <div className="w-24 h-[2px] bg-[var(--color-secondary)] mx-auto mt-12 opacity-60" />
                        </div>

                        <div className="flex justify-center flex-col items-center gap-8">
                            <p className="text-white/70 text-xl lg:text-2xl font-serif italic max-w-2xl">
                                Permíteme acompañarte en el proceso de encontrar la alineación perfecta para tu momento actual.
                            </p>
                            <div className="flex justify-center pt-8">
                                <a
                                    href="https://wa.me/17867268717"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center bg-[var(--color-secondary)] text-white hover:scale-105 hover:brightness-110 transition-all px-16 py-7 rounded-full font-bold uppercase tracking-[0.3em] text-sm lg:text-lg shadow-[0_20px_50px_rgba(184,131,90,0.3)] group"
                                >
                                    Agendar Sesión de Claridad »
                                </a>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
