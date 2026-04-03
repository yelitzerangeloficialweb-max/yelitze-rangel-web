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
        <main className="bg-[#fafcfe] min-h-screen selection:bg-[var(--color-secondary)] selection:text-white pb-20">
            {/* 1. HERO SECTION: TRIBU & ALINEACIÓN (Asymmetric Editorial Design) */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-stone-900 pt-0">
                {/* Background Composite Wrapper */}
                <div className="absolute inset-0 z-0 flex flex-col lg:flex-row">
                    {/* Left: Textured Slate with Symbols */}
                    <div className="lg:w-1/2 h-full bg-[#333333] relative overflow-hidden">
                        {/* Sacred Geometry Overlays */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none">
                            {/* SVG Patterns for Symbols from mockup */}
                            <svg className="absolute top-1/4 left-1/4 w-32 h-32 text-stone-400 -rotate-12" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                <path d="M50 5 L60 40 L95 40 L67 60 L78 95 L50 75 L22 95 L33 60 L5 40 L40 40 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            </svg>
                            <svg className="absolute bottom-1/4 right-1/4 w-48 h-48 text-stone-500 rotate-45" viewBox="0 0 100 100">
                                <path d="M50 10 Q70 50 50 90 Q30 50 50 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                <path d="M10 50 Q50 70 90 50 Q50 30 10 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            </svg>
                        </div>
                        {/* Film Grain / Stone Texture */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-40 mix-blend-overlay" />
                    </div>

                    {/* Right: The Portrait/Community side */}
                    <div className="lg:w-1/2 h-full relative">
                        <Image
                            src="/images/home_redesign/Web-Yelitze-10.png"
                            alt="Ritual de Sanación en Tribu"
                            fill
                            className="object-cover"
                            priority
                            unoptimized
                        />
                    </div>

                    {/* Organic Brush Overlay/Transition */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        <div className="h-full w-full bg-gradient-to-r from-[#333333] via-[#333333]/95 to-transparent lg:w-[55%] hidden lg:block" 
                             style={{ 
                                maskImage: 'radial-gradient(ellipse at center right, transparent 0%, black 70%)',
                                WebkitMaskImage: 'radial-gradient(ellipse at center right, transparent 0%, black 70%)'
                             }} 
                        />
                        {/* Mobile Gradient */}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#333333] to-transparent lg:hidden" />
                    </div>
                </div>

                <div className="container mx-auto px-8 lg:px-40 relative z-20">
                    <div className="max-w-2xl space-y-12 py-32 lg:py-0">
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

            {/* 2. FILTERS & AGENDA */}
            <section id="agenda" className="py-24 px-4 relative overflow-hidden">
                <div className="container mx-auto max-w-7xl">

                    {/* Minimalist Filters */}
                    <FadeIn className="flex justify-center mb-20">
                        <div className="inline-flex flex-wrap gap-3 p-2 bg-stone-100/50 backdrop-blur-sm rounded-full border border-stone-200">
                            {[
                                { id: 'Todos', label: 'Toda la Agenda' },
                                { id: 'Semillas de consciencia', label: 'Semillas de Consciencia' },
                                { id: 'Círculo de expansión', label: 'Círculos de Expansión' }
                            ].map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => setFilter(f.id as any)}
                                    className={`px-8 py-3 rounded-full text-xs md:text-sm tracking-widest uppercase transition-all duration-500 font-medium ${filter === f.id
                                        ? 'bg-[var(--color-primary)] text-white shadow-xl scale-105'
                                        : 'text-[var(--color-text-light)] hover:bg-white hover:text-[var(--color-primary)]'
                                        }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Events Narrative Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {filteredEvents.map((event, idx) => (
                            <FadeIn key={event.id} delay={idx * 0.1}>
                                <div className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-700">
                                    {/* Image Container */}
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                        {/* Date Badge */}
                                        <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[var(--color-primary)] text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                                            <Calendar className="w-3 h-3" />
                                            {event.date}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-10 space-y-6">
                                        <div className="space-y-2">
                                            <span className="text-[var(--color-secondary)] font-bold tracking-[0.2em] uppercase text-[10px]">
                                                {event.type}
                                            </span>
                                            <h3 className="text-3xl font-heading text-[var(--color-primary)] leading-tight group-hover:text-[var(--color-secondary)] transition-colors">
                                                {event.title}
                                            </h3>
                                        </div>

                                        <p className="text-[var(--color-text-light)] leading-relaxed line-clamp-2">
                                            {event.aida.attention}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-stone-50">
                                            <div className="flex items-center gap-2 text-stone-400 text-sm">
                                                <MapPin className="w-4 h-4" />
                                                <span>{event.location}</span>
                                            </div>
                                            <Link
                                                href={`/eventos/${event.slug}`}
                                                className="inline-flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm tracking-wide group/btn"
                                            >
                                                Saber Más
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredEvents.length === 0 && (
                        <FadeIn className="text-center py-32 border-2 border-dashed border-stone-100 rounded-[3rem]">
                            <Sparkles className="w-12 h-12 text-stone-200 mx-auto mb-6" />
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
