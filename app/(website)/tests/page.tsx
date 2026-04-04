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
        description: 'Análisis integral de Relaciones, Heridas Profundas y Linaje Femenino en un solo viaje guiado por IA.',
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
    return (
        <main className="bg-[#FAF9F6] min-h-screen selection:bg-[var(--color-secondary)] selection:text-white pb-32">

            {/* 1. HERO SECTION */}
            <section className="relative min-h-[60vh] flex items-center pt-40 pb-20 overflow-hidden bg-black">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/10 rounded-full blur-[140px] -mr-40 -mt-40 animate-pulse" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <FadeIn className="max-w-4xl mx-auto">
                        <Link href="/" className="inline-flex items-center gap-3 text-white/30 hover:text-[var(--color-secondary)] transition-all mb-16 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Regresar al Origen</span>
                        </Link>
                        <span className="text-[var(--color-secondary)] font-bold tracking-[0.6em] uppercase text-xs mb-8 block">Alquimia Interior</span>
                        <h1 className="text-white text-5xl md:text-8xl font-heading leading-tight mb-12 italic">
                            Portal Test de <br />
                            <span className="opacity-20">Autoconocimiento</span>
                        </h1>
                    </FadeIn>
                </div>
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
                                src="/assets/images/about-experience-new.jpg"
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
                                            Iniciar Diagnóstico IA
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

            {/* 5. ARQUITECTURA DE VIDA - FULL GALLERY IMMERSION */}
            <FadeIn delay={0.4} className="mt-60 relative rounded-[5rem] overflow-hidden bg-black shadow-3xl mx-4">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-[0.05] grayscale brightness-200">
                    <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain scale-125 translate-x-1/4 translate-y-1/4" />
                </div>

                <div className="grid lg:grid-cols-2 items-stretch relative z-10">
                    <div className="p-16 md:p-24 space-y-10 flex flex-col justify-center">
                        <span className="text-[var(--color-secondary)] font-bold tracking-[0.5em] uppercase text-xs">Agenda del Alma 2026</span>
                        <h2 className="text-white text-4xl md:text-7xl font-heading leading-[1.1] italic">
                            Arquitectura <br />
                            <span className="text-white/30">Intencional de Vida</span>
                        </h2>
                        <p className="text-stone-400 text-xl font-light italic leading-relaxed max-w-lg">
                            Un viaje de 12 meses diseñado para quienes deciden dejar de sobrevivir y comenzar a co-crear su realidad desde el alma.
                        </p>
                        <div className="pt-8">
                            <Link
                                href="/arquitectura-de-vida-intencional"
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
