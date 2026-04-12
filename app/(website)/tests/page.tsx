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
        id: 'diagnostico-ancestral',
        title: 'Diagnóstico Ancestral Completo',
        description: 'Análisis integral de Relaciones, Heridas Profundas y Linaje Femenino en un solo viaje guiado por Yelitzé.',
        image: '/assets/images/tests/test_femeninas.png',
        icon: <Sparkles className="w-6 h-6" />,
        href: '/tests/diagnostico-ancestral',
        category: 'Premium',
        color: 'from-yellow-200/20',
        featured: true
    },
    {
        id: 'heridas-infancia',
        title: 'Heridas de la Infancia (Clásico)',
        description: 'Descubre qué herida emocional (Abandono, Rechazo, Humillación, Traición, Injusticia) influye en tu vida adulta.',
        image: '/assets/images/tests/test_childhood_wounds_realistic.png',
        icon: <Baby className="w-6 h-6" />,
        href: '/tests/heridas-infancia',
        category: 'Raíces',
        color: 'from-amber-200/20'
    },
    {
        id: 'creencias-amor',
        title: 'Creencias sobre el Amor',
        description: 'Identifica los bloqueos inconscientes que te impiden vivir una relación de pareja plena y consciente.',
        image: '/assets/images/tests/test_love_beliefs_realistic.png',
        icon: <Heart className="w-6 h-6" />,
        href: '/tests/creencias-amor',
        category: 'Relaciones',
        color: 'from-rose-200/20'
    },
    {
        id: 'creencias-dinero',
        title: 'Creencias sobre el Dinero',
        description: 'Explora tu relación con la abundancia y detecta lealtades familiares que limitan tu flujo de prosperidad.',
        image: '/assets/images/tests/test_money_beliefs_realistic.png',
        icon: <DollarSign className="w-6 h-6" />,
        href: '/tests/creencias-dinero',
        category: 'Abundancia',
        color: 'from-emerald-200/20'
    },
    {
        id: 'diagnostico-relaciones',
        title: 'Patrones en el Amor',
        description: 'Identifica los patrones de dolor, codependencia y desconfianza en tus relaciones de pareja.',
        image: '/assets/images/tests/test_relaciones.png',
        icon: <Heart className="w-6 h-6 text-red-400" />,
        href: '/tests/relaciones',
        category: 'Nuevo',
        color: 'from-red-200/20'
    },
    {
        id: 'heridas-profundas',
        title: 'Heridas Profundas (Somática)',
        description: 'Explora las huellas en tu mente, alma y cuerpo para una sanación consciente y profunda.',
        image: '/assets/images/tests/test_profundas.png',
        icon: <Brain className="w-6 h-6 text-purple-400" />,
        href: '/tests/heridas-profundas',
        category: 'Nuevo',
        color: 'from-purple-200/20'
    },
    {
        id: 'heridas-femeninas',
        title: 'Heridas Femeninas',
        description: 'Identifica las heridas de abandono, rechazo e injusticia específicas de la energía femenina.',
        image: '/assets/images/tests/test_femeninas.png',
        icon: <Star className="w-6 h-6 text-yellow-400" />,
        href: '/tests/heridas-femeninas',
        category: 'Nuevo',
        color: 'from-yellow-200/20'
    }
];

const PREMIUM_TEST = TESTS.find(t => t.id === 'diagnostico-ancestral');
const SPECIALTY_TESTS = TESTS.filter(t => t.category === 'Nuevo');
const CLASSIC_TESTS = TESTS.filter(t => ['Raíces', 'Relaciones', 'Abundancia'].includes(t.category));

export default function TestsHubPage() {
    const uniqueCategoriesCount = new Set(TESTS.map(t => t.category)).size;
    const testsCount = TESTS.length;

    return (
        <main className="bg-[#FAF9F6] min-h-screen selection:bg-[var(--color-secondary)] selection:text-white">

            {/* 1. HERO SECTION: PREMIUM EDITORIAL */}
            <section className="relative min-h-[75vh] flex items-center pt-40 pb-20 overflow-hidden bg-[#333333]">
                {/* Atmospheric Glows */}
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#B8835A]/15 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#B8835A]/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
                        <FadeIn>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-3 text-white/40 hover:text-[var(--color-secondary)] transition-all mb-12 group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Regresar al Origen</span>
                            </Link>

                            <span className="text-[var(--color-secondary)] font-script text-3xl md:text-5xl mb-6 block tracking-[0.03em]">Alquimia Interior</span>
                            <h1 className="text-white text-6xl md:text-9xl font-heading leading-[0.9] italic mb-12 text-balance">
                                Portales de <br />
                                <span className="opacity-20 pl-20 md:pl-40 block">Autoconocimiento</span>
                            </h1>

                            <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
                                <p className="text-stone-400 text-xl font-light italic leading-relaxed max-w-md">
                                    "Hacer consciente lo inconsciente es la llave para reclamar tu soberanía y libertad."
                                </p>
                                <div className="hidden md:block w-px h-24 bg-white/10" />
                                <div className="flex gap-10">
                                    <div className="text-center">
                                        <span className="text-white text-3xl font-heading block">0{testsCount}</span>
                                        <span className="text-stone-500 text-[9px] uppercase tracking-widest">Diagnósticos</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-white text-3xl font-heading block">0{uniqueCategoriesCount}</span>
                                        <span className="text-stone-500 text-[9px] uppercase tracking-widest">Dimensiones</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>

                {/* Vertical Indicator */}
                <div className="absolute right-12 bottom-12 hidden lg:flex flex-col items-center gap-6">
                    <span className="[writing-mode:vertical-rl] text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">Descubrir Bloqueos</span>
                    <div className="w-px h-12 bg-gradient-to-t from-[var(--color-secondary)] to-transparent" />
                </div>

                {/* Bottom Fade Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#FAF9F6] to-transparent z-10" />
            </section>

            {/* 2. DESCRIPTION & PURPOSE SECTION */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <FadeIn className="space-y-8">
                            <div className="space-y-4">
                                <span className="text-[var(--color-secondary)] font-bold tracking-[0.3em] uppercase text-xs">Propósito</span>
                                <h2 className="text-3xl lg:text-5xl font-heading text-[var(--color-primary)] italic leading-tight">
                                    Hacer consciente <br />
                                    <span className="text-stone-300">lo inconsciente.</span>
                                </h2>
                            </div>
                            <p className="text-lg text-stone-600 font-light leading-relaxed">
                                Tu cuerpo es el mapa más preciso de tu historia. Estos diagnósticos no son simples tests, son puertas de entrada al <strong>Sistema de Expansión</strong>.
                                <br /><br />
                                Aquí identificamos la <strong>Herida Raíz</strong> y las lealtades invisibles a tu linaje que hoy se manifiestan como bloqueos en tus relaciones, tus finanzas y tu bienestar. Descubrir el origen es el primer paso para reclamar tu soberanía.
                            </p>
                            <div className="flex items-center gap-6 pt-4">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center border border-stone-100 italic font-serif text-[var(--color-secondary)]">01</div>
                                    <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Identificar</span>
                                </div>
                                <div className="h-[1px] w-12 bg-stone-200"></div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center border border-stone-100 italic font-serif text-[var(--color-secondary)]">02</div>
                                    <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Integrar</span>
                                </div>
                                <div className="h-[1px] w-12 bg-stone-200"></div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center border border-stone-100 italic font-serif text-[var(--color-secondary)]">03</div>
                                    <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Expandir</span>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2} className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-stone-50">
                            <Image
                                src="/assets/images/about-experience.jpg"
                                alt="Propósito de los Diagnósticos"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/40 to-transparent" />
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 2. PREMIUM FEATURE: DIAGNÓSTICO ANCESTRAL */}
            {PREMIUM_TEST && (
                <section className="py-24 -mt-32 relative z-20">
                    <div className="container mx-auto px-4">
                        <FadeIn>
                            <div className="max-w-5xl mx-auto bg-white rounded-[4rem] overflow-hidden shadow-3xl border border-stone-100 grid md:grid-cols-2">
                                <div className="relative aspect-square md:aspect-auto">
                                    <Image src={PREMIUM_TEST.image} alt={PREMIUM_TEST.title} fill className="object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-stone-950/20 to-transparent" />
                                </div>
                                <div className="p-12 md:p-20 flex flex-col justify-center space-y-8 bg-[var(--color-primary)] text-white">
                                    <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 self-start">
                                        <Sparkles className="w-3 h-3 text-yellow-300" />
                                        <span className="text-[10px] font-bold tracking-widest uppercase">Experiencia Premium</span>
                                    </span>
                                    <h2 className="text-4xl md:text-6xl font-heading italic leading-tight">
                                        {PREMIUM_TEST.title}
                                    </h2>
                                    <p className="text-white/70 text-lg font-light italic leading-relaxed">
                                        {PREMIUM_TEST.description}
                                    </p>
                                    <div className="pt-8">
                                        <Link href={PREMIUM_TEST.href} className="btn-premium px-12 py-5 bg-white !text-[var(--color-primary)] hover:!bg-stone-100 group text-lg">
                                            Iniciar Diagnóstico
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>
            )}

            {/* 3. NUEVOS TESTS ESPECIALIZADOS */}
            <section className="py-32 container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-24 space-y-4">
                    <h2 className="text-4xl font-heading text-[var(--color-primary)] italic">Profundización Continua</h2>
                    <p className="text-stone-400 font-light italic">Módulos especializados para explorar dimensiones específicas de tu alma.</p>
                </div>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {SPECIALTY_TESTS.map((test) => (
                        <TestCard key={test.id} test={test} />
                    ))}
                </StaggerContainer>
            </section>

            {/* 4. BIBLIOTECA CLÁSICA */}
            <section className="py-32 bg-stone-50 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-24 space-y-4">
                        <h2 className="text-4xl font-heading text-stone-300 italic">Exploración Clásica</h2>
                        <p className="text-stone-400 font-light italic">Las puertas fundamentales al inconsciente familiar.</p>
                    </div>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                        {CLASSIC_TESTS.map((test) => (
                            <TestCard key={test.id} test={test} grayscale />
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 5. ARQUITECTURA DE VIDA - IMMERSIVE PHOTOGRAPHIC SECTION */}
            <FadeIn delay={0.4} className="mt-60 relative min-h-[800px] flex items-center overflow-hidden bg-[#2D2926] mx-4 rounded-[5rem] shadow-3xl">
                {/* Background Image Container with Gradient Fade */}
                <div className="absolute inset-0 z-0">
                    <div className="relative w-full h-full lg:w-[85%] lg:-left-24">
                        <Image
                            src="/images/home_redesign/Web-Yelitze12.png"
                            alt="Arquitectura de Vida"
                            fill
                            className="object-cover object-left opacity-40 lg:opacity-100"
                            priority
                        />
                        {/* Gradient Overlays for smooth blending into dark background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2D2926]/40 to-[#2D2926]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2926] via-transparent to-transparent" />
                    </div>
                </div>

                <div className="container mx-auto px-8 relative z-10 w-full">
                    <div className="flex flex-col lg:flex-row items-center justify-end">
                        
                        {/* Text Area - Aligned to the right */}
                        <div className="lg:w-3/5 space-y-10 text-center lg:text-left">
                            <div className="space-y-4">
                                <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-[var(--color-secondary)] uppercase">
                                    Agenda del Alma 2026
                                </span>
                                <div className="space-y-0">
                                    <h2 className="text-6xl md:text-8xl lg:text-[8rem] font-script text-[#B8835A] leading-[0.85] drop-shadow-sm tracking-[0.03em]">
                                        Arquitectura de Vida
                                    </h2>
                                    <h3 className="text-4xl md:text-6xl lg:text-[6rem] font-heading text-white leading-tight">
                                        Intencional
                                    </h3>
                                </div>
                            </div>

                            <p className="text-xl md:text-2xl text-white/70 font-body font-light italic leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Un viaje de 12 meses diseñado para quienes deciden dejar de sobrevivir y comenzar a co-crear su realidad desde el alma.
                            </p>

                            <div className="pt-8">
                                <Link
                                    href="/arquitectura-de-vida-intencional"
                                    className="inline-flex items-center gap-6 px-14 py-6 bg-[#B8835A] text-white rounded-2xl font-body font-bold tracking-[0.2em] uppercase transition-all hover:scale-105 hover:bg-[#c9956d] shadow-2xl active:scale-95 group text-lg"
                                >
                                    Explorar la Experiencia
                                    <Compass className="w-6 h-6 text-white group-hover:rotate-45 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subtle atmospheric light effect */}
                <div className="absolute top-1/4 right-[10%] w-96 h-96 bg-[#FF6B00]/95 blur-[120px] rounded-full pointer-events-none opacity-20" />
            </FadeIn>

            {/* 6. FINAL QUOTE & CTA */}
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

function TestCard({ test, grayscale = false }: { test: any, grayscale?: boolean }) {
    return (
        <StaggerItem>
            <div className="group relative flex flex-col items-center text-center space-y-8">
                <ScaleIn>
                    <Link href={test.href} className="relative block aspect-[4/5] w-64 rounded-[3rem] overflow-hidden shadow-2xl group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] transition-all duration-700 bg-white border border-stone-100">
                        <Image
                            src={test.image}
                            alt={test.title}
                            fill
                            className={`object-cover group-hover:scale-110 transition-transform duration-[3000ms] ${grayscale ? 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100' : ''}`}
                        />
                        {!grayscale && (
                            <div className={`absolute inset-0 bg-gradient-to-t ${test.color} via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity`} />
                        )}

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-secondary)]">Iniciar Ahora</span>
                            </div>
                        </div>

                        <div className="absolute top-8 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/50 shadow-sm">
                            <span className="text-[8px] font-bold tracking-widest uppercase text-stone-500">{test.category}</span>
                        </div>
                    </Link>
                </ScaleIn>

                <div className="space-y-4 max-w-xs">
                    <div className="flex justify-center mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        {test.icon}
                    </div>
                    <h3 className="text-2xl font-heading text-[var(--color-primary)] italic leading-tight group-hover:text-[var(--color-secondary)] transition-colors">
                        {test.title}
                    </h3>
                    <p className="text-stone-400 text-sm italic font-light leading-relaxed">
                        {test.description}
                    </p>
                </div>
            </div>
        </StaggerItem>
    );
}
