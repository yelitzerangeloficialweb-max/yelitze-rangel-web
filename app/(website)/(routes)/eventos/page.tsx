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
        <main className="min-h-screen selection:bg-[var(--color-secondary)] selection:text-white bg-black">
            <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-[#cccccc] pt-0">
                {/* Full Cinematic Asset as Background */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/home_redesign/eventos-2.png"
                        alt="Ritual de Sanación y Agenda del Alma"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Bottom Soft Blend - Blending evenly into the section below */}
                    <div className="absolute bottom-0 left-0 w-full h-[30%] z-10 pointer-events-none bg-gradient-to-t from-[#cccccc] via-[#cccccc]/80 to-transparent" />
                </div>

                <div className="container mx-auto px-8 lg:px-40 relative z-20">
                    <div className="max-w-2xl space-y-12">
                        <FadeIn>
                            <div className="space-y-4">
                                <span className="font-script text-4xl lg:text-5xl text-[#b8835a] leading-none block">
                                    Encuentros & Rituales
                                </span>
                                <h1 className="text-5xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.9]">
                                    AGENDA DEL <br /> 
                                    <span className="font-script font-normal normal-case tracking-normal opacity-90 text-white text-7xl lg:text-[10rem] block -mt-4 lg:-mt-8">Alma</span>
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
            <section id="agenda" className="py-24 px-4 relative bg-[#cccccc]">
                {/* Intense offset blur visible only 50%, placed outside overflow to bleed over all layers */}
                <div className="absolute -top-[10%] -left-[15vw] w-[30vw] h-[600px] bg-[#de986a]/80 blur-[120px] rounded-full pointer-events-none mix-blend-multiply opacity-95 z-0" />

                {/* Background Decor */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
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
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40" />
                                    </div>
 
                                    {/* Content */}
                                    <div className="p-12 space-y-8 flex-grow flex flex-col">
                                        <div className="space-y-4">
                                            <span className="text-stone-400 font-bold tracking-[0.2em] uppercase text-[10px] block">
                                                {event.type}
                                            </span>
                                            <h3 className="font-heading text-2xl lg:text-3xl text-[#b8835a] leading-[1.2] mb-4 italic font-bold whitespace-nowrap overflow-hidden text-ellipsis">
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
            <section className="py-32 bg-[#333333] relative overflow-hidden">
                {/* Subtle Watermark */}
                <div className="absolute -right-40 -top-40 w-[1000px] h-[1000px] opacity-10 pointer-events-none rotate-12">
                    <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                </div>
 
                <div className="container mx-auto px-4 relative">
                    <div className="max-w-4xl mx-auto text-center mb-24">
                        <FadeIn>
                            <h2 className="text-[var(--color-secondary)] text-4xl md:text-6xl font-heading mb-8">Vivir la Experiencia</h2>
                            <p className="text-gray-300 text-xl font-light italic leading-relaxed">
                                “No solo venimos a aprender, venimos a recordar quiénes somos cuando estamos en paz y en tribu.”
                            </p>
                        </FadeIn>
                    </div>
                    <DynamicExperienceGallery />
                    
                    {/* Botón de Galería */}
                    <div className="mt-16 text-center">
                        <Link 
                            href="/galeria"
                            className="inline-flex items-center gap-3 px-12 py-5 border border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white transition-all duration-500 rounded-full text-base uppercase tracking-[0.3em] font-normal group"
                        >
                            Ver Galería Completa
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 4. SECTION: RETIROS A MEDIDA (REDESIGN) */}
            <section className="py-32 bg-[#d4d4d4] relative overflow-hidden">

                <div className="container mx-auto max-w-7xl px-8 lg:px-16 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <div className="lg:w-1/2 space-y-12">
                            <FadeIn>
                                <div className="space-y-4">
                                    <h2 className="text-5xl md:text-8xl font-heading text-[#de9862] leading-[0.9] tracking-tight">
                                        Retiros & Grupos <br /> Privados
                                    </h2>
                                </div>
                                
                                <div className="space-y-10 mt-12">
                                    <p className="text-xl text-stone-800 font-medium leading-relaxed max-w-xl">
                                        Creamos experiencias transformadoras diseñadas exclusivamente para tu grupo, organización o círculo íntimo.
                                    </p>
                                    
                                    <ul className="space-y-6">
                                        {[
                                            "Inmersiones de sanación para grupos cerrados",
                                            "Workshops sistémicos para juntas directivas",
                                            "Rituales de paso y celebraciones conscientes"
                                        ].map((text, i) => (
                                            <li key={i} className="flex items-center gap-3 text-stone-900 font-bold text-lg">
                                                <span className="text-[#de9862] text-xl">»</span>
                                                {text}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="pt-8">
                                        <Link
                                            href="https://wa.me/17867268717"
                                            className="inline-flex items-center justify-center bg-[#b17a46] text-white hover:brightness-110 transition-all px-10 py-5 rounded-2xl font-bold uppercase tracking-[0.1em] text-sm shadow-xl group"
                                        >
                                            Diseña tu propia experiencia »
                                        </Link>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                        <div className="lg:w-1/2 relative">
                            <FadeIn>
                                <div className="relative aspect-[16/11] rounded-tl-[80px] rounded-br-[80px] rounded-tr-3xl rounded-bl-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group">
                                    <Image
                                        src="/assets/images/gallery/custom-retreat-group.jpg"
                                        alt="Sesión Grupal de Sanación"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    {/* Subtle Overlay to match mockup tint */}
                                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA (Premium Redesign) */}
            <section className="relative py-48 md:py-64 overflow-hidden bg-black">
                {/* Top Integration Gradient (Blur between sections) */}
                <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#d4d4d4] to-transparent z-20" />

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
                    <div className="absolute inset-0 bg-black/40 z-10" />
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
                                <Link
                                    href="https://wa.me/17867268717"
                                    target="_blank"
                                    className="inline-flex items-center justify-center bg-[var(--color-secondary)] text-white hover:scale-105 hover:brightness-110 transition-all px-16 py-7 rounded-full font-bold uppercase tracking-[0.3em] text-sm lg:text-lg shadow-[0_20px_50px_rgba(184,131,90,0.3)] group"
                                >
                                    Agendar Sesión de Claridad »
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main >
    );
}
