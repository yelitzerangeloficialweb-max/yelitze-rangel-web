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

            {/* 1. SECTION: COACHING ANCESTRAL */}
            <section className="relative min-h-[90vh] flex flex-col lg:flex-row overflow-hidden pt-20">
                {/* Left Panel: Brand Color */}
                <div className="lg:w-[45%] bg-[var(--color-secondary)] p-8 md:p-16 lg:p-24 flex flex-col justify-center relative overflow-hidden">
                    {/* Subtle Watermark - Larger & More Transparent */}
                    <div className="absolute -left-32 -bottom-32 w-[1000px] h-[1000px] opacity-[0.015] pointer-events-none">
                        <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                    </div>

                    <FadeIn>
                        {/* Pill Badge Style */}
                        <div className="inline-block mb-12">
                            <span className="px-8 py-3 rounded-full border border-white/30 bg-white/5 text-white text-sm md:text-base font-light tracking-[0.2em] uppercase backdrop-blur-sm shadow-xl">
                                Coaching Ancestral
                            </span>
                        </div>

                        <div className="space-y-8 mb-16">
                            <h3 className="text-white text-4xl md:text-5xl lg:text-7xl font-light italic leading-none">
                                No es magia. <br /> Es alineación.
                            </h3>
                            <p className="text-white/80 text-lg md:text-xl font-light tracking-wide max-w-md leading-relaxed">
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
                    {/* Soft gradient transition from the color panel */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--color-secondary)] to-transparent hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[var(--color-secondary)]/10 lg:to-transparent" />
                </div>
            </section>

            <section className="py-32 px-4 bg-white relative overflow-hidden">
                {/* Subtle Watermark - Larger & More Transparent */}
                <div className="absolute -left-32 -bottom-32 w-[900px] h-[900px] opacity-[0.015] pointer-events-none rotate-12">
                    <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                </div>
                <div className="container mx-auto relative">
                    <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
                        <div className="lg:w-1/2 space-y-8">
                            <FadeIn>
                                <span className="text-[var(--color-secondary)] font-bold tracking-[0.3em] uppercase text-xs">Alquimia del Tacto</span>
                                <h2 className="text-4xl md:text-6xl font-heading text-[var(--color-primary)] leading-tight">Sesiones Corporales</h2>
                                <p className="text-xl text-[var(--color-text-light)] leading-relaxed italic border-l-2 border-[var(--color-secondary)] pl-6">
                                    “El lenguaje más antiguo que hace vibrar la piel, nutre el corazón y acaricia el alma.”
                                </p>
                                <p className="text-lg text-[var(--color-text-light)] leading-relaxed">
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
