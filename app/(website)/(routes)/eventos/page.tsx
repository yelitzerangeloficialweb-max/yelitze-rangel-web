"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight, Calendar, MapPin, Users,
    Sparkles, Star, Anchor, Brain, Heart
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { EVENTS_DATA } from "@/lib/events";
import DynamicExperienceGallery from "@/components/home/DynamicExperienceGallery";

export default function EventsPage() {
    const [filter, setFilter] = useState<'Todos' | 'Semillas de consciencia' | 'Círculo de expansión'>('Todos');

    const filteredEvents = EVENTS_DATA.filter(event =>
        filter === 'Todos' ? true : event.type === filter
    );

    return (
        <main className="bg-[#fafcfe] min-h-screen selection:bg-[var(--color-secondary)] selection:text-white pb-20">            {/* 1. HERO SECTION: TRIBU & ALINEACIÓN (Exact Composed Asset) */}
            <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-white pt-0">
                {/* Full Cinematic Asset as Background */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/home_redesign/eventos.png"
                        alt="Ritual de Sanación y Agenda del Alma"
                        fill
                        className="object-cover"
                        priority
                        unoptimized
                    />
                    {/* Bottom Brush Stroke Effect - Blending with White Page */}
                    <div className="absolute bottom-0 left-0 w-full h-[20%] z-10 pointer-events-none" 
                         style={{ 
                            background: 'linear-gradient(to top, white, transparent)',
                            maskImage: 'radial-gradient(ellipse at 50% 100%, black 0%, transparent 80%)',
                            WebkitMaskImage: 'radial-gradient(ellipse at 50% 100%, black 0%, transparent 80%)'
                         }} 
                    />
                </div>

                <div className="container mx-auto px-8 lg:px-40 relative z-20">
                    <div className="max-w-2xl space-y-12">
                        <FadeIn>
                            <div className="space-y-4">
                                <span className="font-script text-4xl lg:text-5xl text-[#b8835a] leading-none block">
                                    Encuentros & Rituales
                                </span>
                                <h1 className="text-5xl lg:text-8xl font-bold text-white uppercase tracking-tighter leading-[0.9]">
                                    AGENDA DEL <br /> <span className="opacity-60">ALMA</span>
                                </h1>
                            </div>

                            <div className="space-y-10">
                                <p className="text-xl lg:text-2xl text-white/90 font-serif italic border-l-4 border-[#b8835a] pl-8 py-2">
                                    "No solo venimos a aprender, venimos a recordar quiénes somos cuando estamos en tribu."
                                </p>
                                
                                <p className="text-lg text-white/70 leading-relaxed font-light max-w-lg">
                                    Espacios sagrados diseñados para tu sanación profunda, expansión y reconexión mediante la maestría sistémica.
                                </p>

                                <div className="pt-8">
                                    <Link
                                        href="#agenda"
                                        className="inline-flex items-center justify-center bg-[#b8835a] text-white hover:brightness-110 transition-all px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs lg:text-sm shadow-2xl group"
                                    >
                                        Explorar Calendario »
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 2. FILTERS & AGENDA (Organic & Soft Design) */}
            <section id="agenda" className="py-24 px-4 relative overflow-hidden bg-[#e0ddd8]">
                {/* Background Decor */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(224,159,106,0.3),_transparent_70%)]" />
                    <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_rgba(224,159,106,0.2),_transparent_60%)]" />
                    {/* SVG Curve Graphic from Mockup */}
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-[0.1] pointer-events-none" viewBox="0 0 1000 500">
                        <path d="M-100 400 Q300 100 600 350 T1100 150" fill="none" stroke="#b8835a" strokeWidth="2" />
                    </svg>
                </div>

                <div className="container mx-auto max-w-7xl relative z-10">
                    <FadeIn className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl lg:text-7xl font-bold text-[#b8835a] uppercase tracking-widest leading-none">
                            PRÓXIMOS EVENTOS
                        </h2>
                    </FadeIn>

                    {/* Minimalist Copper Filter Pills */}
                    <FadeIn className="flex justify-center mb-24">
                        <div className="flex flex-wrap justify-center gap-3 md:gap-6 p-4">
                            {[
                                { id: 'Todos', label: 'Toda la Agenda' },
                                { id: 'Semillas de consciencia', label: 'Semillas de Conciencia' },
                                { id: 'Círculo de expansión', label: 'Círculos de Expansión' }
                            ].map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => setFilter(f.id as any)}
                                    className={`px-10 py-4 rounded-3xl text-sm md:text-base tracking-[0.1em] uppercase transition-all duration-500 font-bold shadow-lg ${filter === f.id
                                        ? 'bg-[#b8835a] text-white scale-105 shadow-[#b8835a]/30'
                                        : 'bg-[#b8835a]/80 text-white/90 hover:bg-[#b8835a] hover:scale-105'
                                        }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </FadeIn>
 
                    {/* Events Narrative Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                        {filteredEvents.map((event, idx) => (
                            <FadeIn key={event.id} delay={idx * 0.1}>
                                <div className="group relative bg-white rounded-[3.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-2xl transition-all duration-700 h-full flex flex-col">
                                    {/* Image Container */}
                                    <div className="relative aspect-[16/11] overflow-hidden">
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40" />
                                    </div>
 
                                    {/* Content */}
                                    <div className="p-12 space-y-8 flex-grow flex flex-col">
                                        <div className="space-y-4">
                                            <span className="text-stone-400 font-bold tracking-[0.2em] uppercase text-[10px] block">
                                                {event.type}
                                            </span>
                                            <h3 className="font-heading text-4xl lg:text-5xl text-[#b8835a] leading-[1.1] mb-4 italic font-bold">
                                                {event.title}
                                            </h3>
                                        </div>
 
                                        <p className="text-stone-500 leading-relaxed font-light text-lg italic line-clamp-3">
                                            {event.aida.attention}
                                        </p>
 
                                        <div className="pt-8 mt-auto flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-[#b8835a]/60 text-sm font-medium">
                                                <Calendar className="w-4 h-4" />
                                                <span>{event.date}</span>
                                            </div>
                                            <Link
                                                href={`/eventos/${event.slug}`}
                                                className="text-[#b8835a] hover:brightness-75 transition-all text-sm font-bold tracking-wide flex items-center gap-2"
                                            >
                                                Saber más »
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
 
                    {/* Empty State */}
                    {filteredEvents.length === 0 && (
                        <FadeIn className="text-center py-32 border-2 border-dashed border-stone-300 rounded-[3rem]">
                            <Sparkles className="w-12 h-12 text-stone-300 mx-auto mb-6" />
                            <p className="text-xl text-stone-400 italic">No hay encuentros de este tipo agendados pronto. Quédate cerca.</p>
                        </FadeIn>
                    )}
                </div>
            </section>

            {/* 3. SECTION: TRIBU & RECONEXIÓN (ATMOSPHERE) */}
            <section className="py-32 bg-stone-950 relative overflow-hidden">
                {/* Subtle Watermark */}
                <div className="absolute -right-40 -top-40 w-[1000px] h-[1000px] opacity-[0.05] pointer-events-none rotate-12">
                    <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                </div>

                <div className="container mx-auto px-4 relative">
                    <div className="max-w-4xl mx-auto text-center mb-24">
                        <FadeIn>
                            <h2 className="text-[var(--color-secondary)] text-4xl md:text-6xl font-heading mb-8">Vivir la Experiencia</h2>
                            <p className="text-gray-400 text-xl font-light italic leading-relaxed">
                                “No solo venimos a aprender, venimos a recordar quiénes somos cuando estamos en paz y en tribu.”
                            </p>
                        </FadeIn>
                    </div>
                    <DynamicExperienceGallery />
                </div>
            </section>

            {/* 4. SECTION: RETIROS A MEDIDA (LUXURY) */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <div className="lg:w-1/2 space-y-10">
                            <FadeIn>
                                <span className="text-[var(--color-secondary)] font-bold tracking-[0.3em] uppercase text-xs">Exclusividad & Alma</span>
                                <h2 className="text-4xl md:text-6xl font-heading text-[var(--color-primary)] leading-tight">Retiros & Grupos <br /> Privados</h2>
                                <p className="text-xl text-[var(--color-text-light)] italic border-l-2 border-[var(--color-secondary)] pl-6">
                                    Creamos experiencias transformadoras diseñadas exclusivamente para tu grupo, organización o círculo íntimo.
                                </p>
                                <ul className="space-y-6">
                                    {[
                                        "Inmersiones de sanación para grupos cerrados",
                                        "Workshops sistémicos para juntas directivas",
                                        "Rituales de paso y celebraciones conscientes"
                                    ].map((text, i) => (
                                        <li key={i} className="flex items-start gap-4 text-[var(--color-text-light)]">
                                            <Star className="w-5 h-5 text-[var(--color-secondary)] mt-1 shrink-0" />
                                            <span className="text-lg">{text}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-6">
                                    <a
                                        href="https://wa.me/17867268717"
                                        target="_blank"
                                        className="btn-premium px-12 py-5"
                                    >
                                        Diseña tu Propia Experiencia
                                        <ArrowRight className="w-6 h-6" />
                                    </a>
                                </div>
                            </FadeIn>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <FadeIn>
                                <div className="relative aspect-[16/10] lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl group">
                                    <Image
                                        src="/assets/images/gallery/custom-retreat-group.jpg"
                                        alt="Sesión Grupal de Sanación"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/10 to-transparent" />
                                </div>
                                {/* Ornamental tag */}
                                <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl hidden md:block">
                                    <p className="text-[var(--color-secondary)] font-whisper text-4xl">A tu medida...</p>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 bg-[#fafcfe] border-t border-stone-100">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-heading text-[var(--color-primary)] mb-12">¿Quieres estar al tanto de todo?</h2>
                        <Link
                            href="/newsletter"
                            className="inline-flex items-center gap-4 px-12 py-5 bg-[var(--color-secondary)] text-white rounded-full text-xl font-medium hover:scale-105 transition-transform shadow-2xl"
                        >
                            Suscríbete a la Agenda Mensual
                            <Sparkles className="w-5 h-5" />
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </main >
    );
}
