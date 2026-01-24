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

            {/* 1. SECTION: COACHING ANCESTRAL (EL VÓRTICE) */}
            <section className="relative min-h-[90vh] flex flex-col lg:flex-row overflow-hidden pt-20">
                {/* Left Panel: Brand Color */}
                <div className="lg:w-[45%] bg-[var(--color-secondary)] p-8 md:p-16 lg:p-24 flex flex-col justify-center relative">
                    {/* Star Accents */}
                    <Star className="absolute top-8 left-8 text-white/40 w-8 h-8 font-light" />
                    <Star className="absolute bottom-8 right-8 text-white/40 w-8 h-8 font-light" />

                    <FadeIn>
                        <h2 className="text-white text-3xl md:text-5xl font-heading mb-12 leading-tight uppercase tracking-tighter">
                            Coaching <br /> Ancestral
                        </h2>
                        <div className="space-y-8 mb-16">
                            <h3 className="text-white text-4xl md:text-5xl lg:text-6xl font-light italic leading-none">
                                No es magia. <br /> Es alineación.
                            </h3>
                            <p className="text-white/80 text-lg md:text-xl font-light tracking-wide">
                                Activación consciente del creador deliberado a través de la Anatomía del Alma.
                            </p>
                        </div>
                        <Link
                            href="/servicios/coaching-ancestral"
                            className="inline-flex items-center gap-4 text-white group border-b border-white/20 pb-2 w-fit hover:border-white transition-all text-lg font-medium"
                        >
                            Ver Sesiones Íntimas
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </FadeIn>

                    {/* Logo detail at bottom */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-30 hidden lg:block">
                        <div className="relative w-32 h-12">
                            <Image
                                src="/assets/images/logo-white.png"
                                alt="Yelitze Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <p className="text-[10px] text-white text-center tracking-[0.3em] uppercase mt-2">"Por la Vida"</p>
                    </div>
                </div>

                {/* Right Panel: Ethereal Image */}
                <div className="lg:w-[55%] relative min-h-[500px] lg:min-h-full">
                    <Image
                        src="/assets/images/vortex-hero-clean.png"
                        alt="Alineación y Vórtice"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[var(--color-secondary)]/20 lg:to-transparent" />
                </div>
            </section>

            {/* 2. SECTION: SESIONES CORPORALES (LUMINOUS) */}
            <section className="py-32 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
                        <div className="lg:w-1/2 space-y-8">
                            <FadeIn>
                                <span className="text-[var(--color-secondary)] font-bold tracking-[0.3em] uppercase text-xs">Alquimia del Tacto</span>
                                <h2 className="text-4xl md:text-6xl font-heading text-[var(--color-primary)] leading-tight">Sesiones Corporales</h2>
                                <p className="text-xl text-[var(--color-text-light)] leading-relaxed italic border-l-2 border-[var(--color-secondary)] pl-6">
                                    “El lenguaje más antiguo que hace vibrar la piel, nutre el corazón y acaricia el alma.”
                                </p>
                                <p className="text-lg text-[var(--color-text-light)]">
                                    Reconexión profunda a través del santuario del cuerpo. Liberamos memorias estancadas para que el alma pueda expresarse con libertad.
                                </p>
                                <div className="pt-8">
                                    <Link href="/servicios/sesiones-corporales" className="btn-premium px-10 py-4 group">
                                        Explorar Todas las Técnicas
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <FadeIn>
                                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-stone-100 group">
                                    <Image
                                        src="/assets/images/body-alignment.png"
                                        alt="Sesiones Corporales Alignment"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SECTION: CORPORATIVO (OBSIDIAN) */}
            <section className="relative min-h-[80vh] flex flex-col lg:flex-row-reverse overflow-hidden">
                {/* Right Panel (Content in Obsidian) */}
                <div className="lg:w-1/2 bg-stone-950 p-8 md:p-16 lg:p-24 flex flex-col justify-center relative">
                    <Star className="absolute top-8 right-8 text-white/20 w-8 h-8" />
                    <FadeIn direction="left">
                        <span className="text-[var(--color-secondary)] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Liderazgo & Origen</span>
                        <h2 className="text-white text-4xl md:text-6xl font-heading mb-8 leading-tight">Sesiones Corporativas</h2>
                        <p className="text-gray-400 text-lg md:text-xl mb-12 font-light italic">
                            Sanamos la cultura organizacional desde la visión sistémica para alcanzar objetivos extraordinarios.
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
                            className="btn-premium px-10 py-4 group bg-white !text-stone-900 hover:!bg-stone-200"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-stone-950 lg:to-stone-950/20" />
                </div>
            </section>

            {/* 4. SECTION: GRUPALES & LIBROS (EDITORIAL) */}
            <section className="py-32 bg-[#fafcfe]">
                <div className="container mx-auto px-4">
                    <FadeIn className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-heading text-[var(--color-primary)] mb-6">Sabiduría & Legado</h2>
                        <p className="text-xl text-[var(--color-text-light)] italic italic">Espacios para sanar en tribu y herramientas para tu propio ritmo.</p>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Eventos */}
                        <FadeIn>
                            <div className="group cursor-pointer">
                                <div className="relative aspect-video rounded-3xl overflow-hidden mb-8 border border-stone-100 shadow-xl">
                                    <Image
                                        src="/assets/images/about-playing.jpg"
                                        alt="Capacitaciones Grupales"
                                        fill
                                        className="object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                </div>
                                <h3 className="text-3xl font-heading text-[var(--color-primary)] mb-4">Capacitaciones Grupales</h3>
                                <p className="text-[var(--color-text-light)] mb-6 leading-relaxed">Talleres intensivos para sanar en tribu. La energía del grupo potencia el trabajo individual mediante espejos sistémicos.</p>
                                <Link href="/eventos" className="text-[var(--color-secondary)] font-bold flex items-center gap-2 hover:translate-x-2 transition-transform">
                                    Ver Próximos Talleres <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </FadeIn>

                        {/* Libros */}
                        <FadeIn delay={0.2}>
                            <div className="group cursor-pointer">
                                <div className="relative aspect-video rounded-3xl overflow-hidden mb-8 border border-stone-100 shadow-xl">
                                    <Image
                                        src="/assets/images/manual-2026.jpg"
                                        alt="Libros y Recursos"
                                        fill
                                        className="object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                </div>
                                <h3 className="text-3xl font-heading text-[var(--color-primary)] mb-4">Libros y Recursos</h3>
                                <p className="text-[var(--color-text-light)] mb-6 leading-relaxed">'Hilos de Conexión' y otras herramientas para empezar tu viaje de autodescubrimiento a tu propio ritmo.</p>
                                <Link href="/libros" className="text-[var(--color-secondary)] font-bold flex items-center gap-2 hover:translate-x-2 transition-transform">
                                    Explorar Librería <ArrowRight className="w-4 h-4" />
                                </Link>
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
                        <p className="text-xl text-[var(--color-text-light)] mb-12 max-w-2xl mx-auto">Conversemos sobre tu proceso y encontremos el espacio que mejor se alinee con tu alma y tus objetivos.</p>
                        <a
                            href="https://wa.me/17867268717"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-premium px-12 py-5 text-xl"
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
