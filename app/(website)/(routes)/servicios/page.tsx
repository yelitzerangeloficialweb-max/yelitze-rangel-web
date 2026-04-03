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
        <main className="bg-[#fafcfe] min-h-screen selection:bg-[var(--color-secondary)] selection:text-white pb-20">

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
                        unoptimized
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
                        unoptimized
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

            {/* 3. SECTION: CORPORATIVO (OBSIDIAN) */}
            <section className="relative min-h-[80vh] flex flex-col lg:flex-row-reverse overflow-hidden">
                {/* Right Panel (Content in Obsidian) */}
                <div className="lg:w-1/2 bg-stone-950 p-8 md:p-16 lg:p-24 flex flex-col justify-center relative overflow-hidden">
                    {/* Subtle Watermark - Larger & More Transparent */}
                    <div className="absolute -right-32 -bottom-32 w-[800px] h-[800px] opacity-[0.025] pointer-events-none rotate-[-12deg]">
                        <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                    </div>
                    <FadeIn>
                        <span className="text-[var(--color-secondary)] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Liderazgo & Origen</span>
                        <h2 className="text-white text-4xl md:text-6xl font-heading mb-8 leading-tight">Sesiones Corporativas</h2>
                        <p className="text-gray-400 text-lg md:text-xl mb-12 font-light italic">
                            Impulsa el potencial de tu equipo a través de la visión sistémica. Sanamos la cultura organizacional para alcanzar objetivos extraordinarios.
                        </p>
                        <ul className="space-y-6 mb-16">
                            {["Coaching para líderes y alta gerencia", "Dinámicas de equipo con mirada circular", "Resolución de conflictos sistémicos"].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-gray-300">
                                    <Sparkles className="w-5 h-5 text-[var(--color-secondary)]" />
                                    <span className="text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <a
                            href="https://wa.me/17867268717"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-premium px-10 py-4 group bg-white !text-stone-900 hover:!bg-stone-200 shadow-xl"
                        >
                            Solicitar Propuesta
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </FadeIn>
                </div>

                {/* Left Panel: Corporate Imagery */}
                <div className="lg:w-1/2 relative min-h-[500px] lg:min-h-full">
                    <Image
                        src="/assets/images/corporate-vortex.png"
                        alt="Estrategia y Alineación Corporativa"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-stone-950 to-transparent hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-stone-950 lg:to-stone-950/20" />
                </div>
            </section>

            {/* 4. SECTION: GRUPALES & LIBROS */}
            <section className="py-32 bg-[#fafcfe] relative overflow-hidden">
                {/* Subtle Watermark - Larger & More Transparent */}
                <div className="absolute -left-40 -bottom-40 w-[1200px] h-[1200px] opacity-[0.01] pointer-events-none rotate-[-6deg]">
                    <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                </div>
                <div className="container mx-auto px-4 relative">
                    <FadeIn className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-heading text-[var(--color-primary)] mb-6">Sabiduría & Legado</h2>
                        <p className="text-xl text-[var(--color-text-light)] italic">Espacios para sanar en tribu y herramientas para tu propio ritmo.</p>
                    </FadeIn>

                    <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto items-start">
                        {/* Eventos / Grupales */}
                        <FadeIn>
                            <div className="group space-y-8">
                                <Link href="/eventos" className="block relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-stone-100">
                                    <Image
                                        src="/assets/images/group-vortex.png"
                                        alt="Capacitaciones Grupales"
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="px-8 py-3 rounded-full border border-white/40 bg-white/10 text-white text-xs uppercase tracking-[0.2em] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">Ver Talleres</span>
                                    </div>
                                </Link>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-heading text-[var(--color-primary)]">Capacitaciones Grupales</h3>
                                    <p className="text-[var(--color-text-light)] leading-relaxed text-lg">Talleres intensivos para sanar en tribu. La energía del grupo potencia el trabajo individual mediante espejos sistémicos.</p>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Libros (Combined Image logic in section) */}
                        <FadeIn delay={0.2}>
                            <div className="group space-y-8">
                                <Link href="/libros" className="block relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-stone-100">
                                    <div className="grid grid-cols-2 h-full">
                                        <div className="relative h-full border-r border-white/10">
                                            <Image
                                                src="/assets/images/chamana-bg.png"
                                                alt="Conversaciones con mi Chamana"
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />
                                        </div>
                                        <div className="relative h-full">
                                            <Image
                                                src="/assets/images/hilos-bg.png"
                                                alt="Hilos de Conexión"
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="px-8 py-3 rounded-full border border-white/40 bg-white/10 text-white text-xs uppercase tracking-[0.2em] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">Ver Librería</span>
                                    </div>
                                </Link>
                                <div className="space-y-4 text-left">
                                    <h3 className="text-3xl font-heading text-[var(--color-primary)]">Libros y Recursos</h3>
                                    <p className="text-[var(--color-text-light)] leading-relaxed text-lg">'Hilos de Conexión' y 'Conversaciones con mi Chamana': herramientas para tu viaje de autodescubrimiento.</p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-white border-t border-stone-100">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-heading text-[var(--color-primary)] mb-10">¿Buscas una solución a medida?</h2>
                        <a
                            href="https://wa.me/17867268717"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-premium px-12 py-5 text-xl shadow-2xl"
                        >
                            Agenda una Llamada de Claridad
                            <ArrowRight className="w-6 h-6 ml-2" />
                        </a>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
