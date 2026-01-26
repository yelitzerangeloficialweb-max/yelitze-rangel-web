"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowRight, Sparkles, Heart, DollarSign,
    Baby, Compass, ArrowDown, Star, ArrowLeft,
    Lightbulb, ShieldCheck, Brain
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from '@/components/ui/motion';

const TESTS = [
    {
        id: 'heridas-infancia',
        title: 'Heridas de la Infancia',
        description: 'Descubre qué herida emocional (Abandono, Rechazo, Humillación, Traición, Injusticia) influye en tu vida adulta.',
        image: '/assets/images/tests/test_childhood_wounds.png',
        icon: <Baby className="w-6 h-6" />,
        href: '/tests/heridas-infancia',
        category: 'Raíces',
        color: 'from-amber-200/20'
    },
    {
        id: 'creencias-amor',
        title: 'Creencias sobre el Amor',
        description: 'Identifica los bloqueos inconscientes que te impiden vivir una relación de pareja plena, consciente y en equilibrio.',
        image: '/assets/images/tests/test_love_beliefs.png',
        icon: <Heart className="w-6 h-6" />,
        href: '/tests/creencias-amor',
        category: 'Relaciones',
        color: 'from-rose-200/20'
    },
    {
        id: 'creencias-dinero',
        title: 'Creencias sobre el Dinero',
        description: 'Explora tu relación con la abundancia y detecta lealtades familiares que limitan tu flujo de prosperidad.',
        image: '/assets/images/tests/test_money_beliefs.png',
        icon: <DollarSign className="w-6 h-6" />,
        href: '/tests/creencias-dinero',
        category: 'Abundancia',
        color: 'from-emerald-200/20'
    }
];

export default function TestsHubPage() {
    return (
        <main className="bg-[#FAF9F6] min-h-screen selection:bg-[var(--color-secondary)] selection:text-white pb-32">

            {/* 1. HERO SECTION: PURE TYPOGRAPHY EDITORIAL (No Background Image) */}
            <section className="relative min-h-[70vh] flex items-center pt-40 pb-20 overflow-hidden bg-stone-950">
                {/* Ethereal light accents instead of images */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/10 rounded-full blur-[140px] -mr-40 -mt-40 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -ml-20 -mb-20" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <FadeIn className="max-w-4xl mx-auto">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3 text-white/30 hover:text-[var(--color-secondary)] transition-all mb-16 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Regresar al Origen</span>
                        </Link>

                        <span className="text-[var(--color-secondary)] font-bold tracking-[0.6em] uppercase text-xs mb-8 block">Alquimia Interior</span>
                        <h1 className="text-white text-6xl md:text-9xl font-heading leading-tight mb-12 italic">
                            Portal de <br />
                            <span className="opacity-20">Autoconocimiento</span>
                        </h1>
                        <p className="text-stone-400 text-xl md:text-2xl font-light italic leading-relaxed mb-16 max-w-2xl mx-auto">
                            "Para sanar el presente, primero debemos iluminar lo que habita en la sombra del inconsciente."
                        </p>

                        <div className="flex justify-center gap-12 text-stone-600">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20">
                                    <Lightbulb className="w-5 h-5" />
                                </div>
                                <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Claridad</span>
                            </div>
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Consciencia</span>
                            </div>
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20">
                                    <Brain className="w-5 h-5" />
                                </div>
                                <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Sanación</span>
                            </div>
                        </div>
                    </FadeIn>

                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
                        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[var(--color-secondary)]/30 to-transparent" />
                    </div>
                </div>
            </section>

            {/* 2. TESTS GALLERY SHOWCASE */}
            <section id="descubrir" className="py-40 container mx-auto px-4">
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {TESTS.map((test, idx) => (
                        <StaggerItem key={test.id}>
                            <div className="group relative flex flex-col items-center text-center space-y-8">
                                <ScaleIn>
                                    <Link href={test.href} className="relative block aspect-[4/5] w-64 rounded-[3rem] overflow-hidden shadow-2xl group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] transition-all duration-700 bg-white border border-stone-100">
                                        <Image
                                            src={test.image}
                                            alt={test.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-[3000ms]"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t ${test.color} via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity`} />

                                        {/* Minimalist Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                            <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-secondary)]">Iniciar Ahora</span>
                                            </div>
                                        </div>

                                        {/* Category Badge */}
                                        <div className="absolute top-8 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/50 shadow-sm">
                                            <span className="text-[8px] font-bold tracking-widest uppercase text-stone-500">{test.category}</span>
                                        </div>
                                    </Link>
                                </ScaleIn>

                                <div className="space-y-4 max-w-xs">
                                    <h3 className="text-3xl font-heading text-[var(--color-primary)] italic leading-tight group-hover:text-[var(--color-secondary)] transition-colors">
                                        {test.title}
                                    </h3>
                                    <p className="text-stone-400 text-sm italic font-light leading-relaxed">
                                        {test.description}
                                    </p>
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* 3. ARQUITECTURA DE VIDA - FULL GALLERY IMMERSION */}
                <FadeIn delay={0.4} className="mt-60 relative rounded-[5rem] overflow-hidden bg-stone-950 shadow-3xl">
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-[0.05] grayscale brightness-200">
                        <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain scale-125 translate-x-1/4 translate-y-1/4" />
                    </div>

                    <div className="grid lg:grid-cols-2 items-stretch relative z-10">
                        <div className="p-16 md:p-24 space-y-10 flex flex-col justify-center">
                            <span className="text-[var(--color-secondary)] font-bold tracking-[0.5em] uppercase text-xs">Agenda del Alma 2026</span>
                            <h2 className="text-white text-4xl md:text-7xl font-heading leading-[1.1] italic">
                                Arquitectura de <br />
                                <span className="text-white/30">Vida Intencional</span>
                            </h2>
                            <p className="text-stone-400 text-xl font-light italic leading-relaxed max-w-lg">
                                Un viaje de 12 meses diseñado para quienes deciden dejar de sobrevivir y comenzar a co-crear su realidad desde el alma.
                            </p>
                            <div className="pt-8">
                                <Link
                                    href="/experiencia-guiada"
                                    className="btn-premium px-16 py-6 bg-white !text-stone-900 shadow-2xl hover:!bg-stone-100 group gap-6 text-xl"
                                >
                                    Explorar la Experiencia
                                    <Compass className="w-6 h-6 text-[var(--color-secondary)] group-hover:rotate-45 transition-transform" />
                                </Link>
                            </div>
                        </div>
                        <div className="relative min-h-[500px] lg:min-h-full">
                            <Image
                                src="/assets/images/circulation-vital.png"
                                alt="Orden y Propósito"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-stone-950 to-transparent hidden lg:block" />
                        </div>
                    </div>
                </FadeIn>
            </section>

            {/* 4. FINAL QUOTE & CTA */}
            <section className="py-40 bg-white relative">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <FadeIn className="space-y-12">
                        <Star className="w-16 h-16 text-[var(--color-secondary)] mx-auto opacity-20" />
                        <h2 className="text-4xl md:text-6xl font-heading text-[var(--color-primary)] italic leading-tight">
                            ¿Los resultados te movieron <br /> <span className="text-stone-300">profundamente?</span>
                        </h2>
                        <p className="text-stone-500 text-2xl font-light italic max-w-3xl mx-auto leading-relaxed">
                            "Hacer consciente el bloqueo es el primer paso, pero el movimiento sistémico se completa a través de la mirada asistida."
                        </p>

                        <div className="pt-12">
                            <Link
                                href="/contacto"
                                className="inline-flex items-center gap-6 text-[var(--color-secondary)] font-bold tracking-[0.3em] uppercase text-xs border-b-2 border-transparent hover:border-current pb-4 transition-all"
                            >
                                Solicitar Sesión de Claridad
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
