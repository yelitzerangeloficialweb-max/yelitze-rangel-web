"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowRight, Sparkles, Heart, DollarSign,
    Baby, Compass, ArrowDown, Star
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';

const TESTS = [
    {
        id: 'heridas-infancia',
        title: 'Heridas de la Infancia',
        description: 'Descubre qué herida emocional (Abandono, Rechazo, Humillación, Traición, Injusticia) influye en tu vida adulta.',
        image: '/assets/images/tests/test_childhood_wounds.png',
        icon: <Baby className="w-6 h-6" />,
        href: '/tests/heridas-infancia',
        category: 'Raíces'
    },
    {
        id: 'creencias-amor',
        title: 'Creencias sobre el Amor',
        description: 'Identifica los bloqueos inconscientes que te impiden vivir una relación de pareja plena, consciente y en equilibrio.',
        image: '/assets/images/tests/test_love_beliefs.png',
        icon: <Heart className="w-6 h-6" />,
        href: '/tests/creencias-amor',
        category: 'Relaciones'
    },
    {
        id: 'creencias-dinero',
        title: 'Creencias sobre el Dinero',
        description: 'Explora tu relación con la abundancia y detecta lealtades familiares que limitan tu flujo de prosperidad.',
        image: '/assets/images/tests/test_money_beliefs.png',
        icon: <DollarSign className="w-6 h-6" />,
        href: '/tests/creencias-dinero',
        category: 'Abundancia'
    }
];

export default function TestsHubPage() {
    return (
        <main className="bg-[#fafcfe] min-h-screen selection:bg-[var(--color-secondary)] selection:text-white pb-20">

            {/* 1. HERO SECTION: ALQUIMIA INTERIOR */}
            <section className="relative min-h-[80vh] flex flex-col lg:flex-row overflow-hidden pt-20">
                {/* Left Panel: Luminous Obsidian */}
                <div className="lg:w-[45%] bg-stone-950 p-8 md:p-16 lg:p-24 flex flex-col justify-center relative overflow-hidden">
                    {/* Subtle Watermark */}
                    <div className="absolute -left-32 -bottom-32 w-[900px] h-[900px] opacity-[0.05] pointer-events-none">
                        <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                    </div>

                    <FadeIn>
                        {/* Pill Badge Style */}
                        <div className="inline-block mb-10">
                            <span className="px-8 py-3 rounded-full border border-[var(--color-secondary)]/20 bg-[var(--color-secondary)]/[0.05] text-[var(--color-secondary)] text-sm md:text-base font-light tracking-[0.2em] uppercase backdrop-blur-sm shadow-sm">
                                Portal de Autoconocimiento
                            </span>
                        </div>

                        <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-heading mb-8 leading-tight">
                            Alquimia <br /> Interior
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl font-light italic leading-relaxed max-w-md">
                            Para sanar el presente, primero debemos iluminar lo que habita en la sombra del inconsciente.
                        </p>

                        <Link
                            href="#descubrir"
                            className="inline-flex items-center gap-4 text-white group border-b border-white/10 pb-2 w-fit hover:border-[var(--color-secondary)] transition-all text-lg font-medium mt-12"
                        >
                            Ver los Tests
                            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform text-[var(--color-secondary)]" />
                        </Link>
                    </FadeIn>
                </div>

                {/* Right Panel: Ethereal Image */}
                <div className="lg:w-[55%] relative min-h-[500px] lg:min-h-full">
                    <Image
                        src="/assets/images/vortex-hero.png"
                        alt="Portal de Sanación"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Soft gradient transition */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-stone-950 to-transparent hidden lg:block" />
                </div>
            </section>

            {/* 2. TESTS GRID */}
            <section id="descubrir" className="py-32 px-4 relative overflow-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
                        {TESTS.map((test, idx) => (
                            <FadeIn key={test.id} delay={idx * 0.1}>
                                <div className="group relative flex flex-col h-full bg-white rounded-[3rem] overflow-hidden border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-700">
                                    {/* Image block */}
                                    <Link href={test.href} className="relative aspect-[16/10] overflow-hidden block">
                                        <Image
                                            src={test.image}
                                            alt={test.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                                        />
                                        <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors" />
                                        {/* Icon badge */}
                                        <div className="absolute top-8 left-8 p-3 bg-white/90 backdrop-blur-md rounded-2xl text-[var(--color-secondary)] shadow-xl ring-1 ring-white/30">
                                            {test.icon}
                                        </div>
                                    </Link>

                                    {/* Content block */}
                                    <div className="p-10 space-y-6 flex flex-col flex-grow text-center lg:text-left">
                                        <div className="space-y-4 flex-grow">
                                            <span className="text-[var(--color-secondary)] font-bold tracking-[0.3em] uppercase text-[10px]">
                                                {test.category}
                                            </span>
                                            <h3 className="text-2xl md:text-3xl font-heading text-[var(--color-primary)] leading-tight group-hover:text-[var(--color-secondary)] transition-colors">
                                                {test.title}
                                            </h3>
                                            <p className="text-[var(--color-text-light)] text-sm md:text-base leading-relaxed line-clamp-3">
                                                {test.description}
                                            </p>
                                        </div>

                                        <div className="pt-8 border-t border-stone-50">
                                            <Link
                                                href={test.href}
                                                className="btn-premium w-full justify-center group"
                                            >
                                                Iniciar Diagnóstico
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    {/* 3. ARQUITECTURA DE VIDA - LARGE BANNER REDESIGN */}
                    <FadeIn delay={0.4} className="mt-40 relative rounded-[4rem] overflow-hidden bg-stone-950 shadow-2xl">
                        {/* Decoration corner watermark */}
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 opacity-[0.05] pointer-events-none rotate-12">
                            <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                        </div>

                        <div className="grid lg:grid-cols-12 items-stretch">
                            <div className="lg:col-span-7 p-10 md:p-20 space-y-8 flex flex-col justify-center">
                                <span className="text-[var(--color-secondary)] font-bold tracking-[0.4em] uppercase text-xs">Agenda 2026</span>
                                <h2 className="text-white text-4xl md:text-6xl font-heading leading-tight italic">
                                    Arquitectura de Vida <br />
                                    <span className="text-white/40">Intencional</span>
                                </h2>
                                <p className="text-gray-400 text-lg md:text-xl font-light italic leading-relaxed max-w-lg">
                                    Un viaje de 12 meses diseñado para quienes deciden dejar de sobrevivir y comenzar a co-crear su realidad desde el alma.
                                </p>
                                <div className="flex flex-wrap gap-6 pt-6">
                                    <Link
                                        href="/experiencia-guiada"
                                        className="btn-premium px-12 py-5 bg-white !text-stone-900 shadow-xl hover:!bg-stone-200"
                                    >
                                        Explorar la Experiencia
                                        <Compass className="w-5 h-5 text-[var(--color-secondary)]" />
                                    </Link>
                                </div>
                            </div>
                            <div className="lg:col-span-5 relative min-h-[400px]">
                                <Image
                                    src="/assets/images/circulation-vital.png"
                                    alt="Orden y Propósito"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-stone-950 to-transparent hidden lg:block" />
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* FINAL CTA: ASESORÍA PERSONALIZADA */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <Star className="w-12 h-12 text-[var(--color-secondary)] mx-auto mb-10 opacity-30" />
                        <h2 className="text-3xl md:text-5xl font-heading text-[var(--color-primary)] mb-12 max-w-3xl mx-auto italic">
                            ¿Los resultados te movieron profundamente?
                        </h2>
                        <p className="text-stone-500 text-lg mb-12 max-w-2xl mx-auto font-light">
                            Hacer consciente el bloqueo es el primer paso, pero el movimiento sistémico se completa a través de la mirada asistida.
                        </p>
                        <Link
                            href="/contacto"
                            className="inline-flex items-center gap-4 text-[var(--color-primary)] font-bold tracking-widest uppercase border-b border-[var(--color-primary)]/10 pb-4 hover:border-[var(--color-secondary)] transition-all"
                        >
                            Solicitar Sesión de Claridad
                            <ArrowRight className="w-5 h-5 text-[var(--color-secondary)]" />
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
