"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Compass, Target, Star, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';

export default function IntroStep({ onNext }: { onNext: () => void }) {
    return (
        <div className="max-w-5xl mx-auto space-y-16">
            {/* 1. EDITORIAL HEADER */}
            <header className="text-center space-y-10 relative">
                {/* Subtle Watermark Decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] pointer-events-none">
                    <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                </div>

                <div className="flex flex-col items-center gap-8 relative z-10">
                    <FadeIn delay={0.1}>
                        <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full p-1.5 border border-stone-100 shadow-2xl">
                            <div className="w-full h-full relative rounded-full overflow-hidden bg-stone-50">
                                <Image
                                    src="/assets/images/hero-portrait-new.png"
                                    alt="Yelitzé Rangel"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Floating Star Ornament */}
                            <div className="absolute -right-2 top-4 bg-white p-2 rounded-full shadow-lg border border-stone-50 text-[var(--color-secondary)]">
                                <Star className="w-5 h-5 fill-current" />
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2} className="space-y-4">
                        <span className="text-[var(--color-secondary)] font-bold tracking-[0.4em] uppercase text-xs md:text-sm">
                            No es Magia. Es Orden.
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading text-[var(--color-primary)] leading-tight italic">
                            Deja de Pedir. <br />
                            <span className="text-stone-300">Empieza a Ordenar.</span>
                        </h1>
                    </FadeIn>
                </div>
            </header>

            {/* 2. THE PHILOSOPHY (Split Layout Idea) */}
            <section className="grid lg:grid-cols-2 gap-12 items-center bg-white p-10 md:p-20 rounded-[4rem] shadow-sm border border-stone-50 relative overflow-hidden">
                <div className="space-y-8 relative z-10">
                    <div className="w-12 h-px bg-[var(--color-secondary)]/30" />
                    <p className="text-3xl font-serif italic text-[var(--color-primary)] leading-snug">
                        "La mayoría de los mapas de sueños fallan porque nacen de la carencia. Hoy aprenderás a co-crear desde la certeza."
                    </p>
                    <p className="text-stone-500 text-lg leading-relaxed font-light">
                        Bienvenida a tu **Arquitectura de Vida Intencional 2026**. Esto no es un simple tablero de fotos; es el diseño de la estructura interna que permitirá que tus metas aterricen en terreno fértil.
                    </p>
                </div>
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                        src="/assets/images/about-experience.jpg"
                        alt="Orden y Propósito"
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-[var(--color-primary)]/10" />
                </div>
            </section>

            {/* 3. BENEFITS GRID */}
            <div className="grid md:grid-cols-3 gap-8">
                <BenefitCard
                    icon={<Sparkles className="w-6 h-6" />}
                    title="Claridad Radical"
                    desc="Descubre qué deseos son realmente tuyos y cuáles son lealtades al sistema."
                />
                <BenefitCard
                    icon={<Compass className="w-6 h-6" />}
                    title="Coherencia Alma"
                    desc="Alinea tu visión mental con tu combustible emocional. Ahí ocurre el salto."
                />
                <BenefitCard
                    icon={<Target className="w-6 h-6" />}
                    title="Propósito Vivo"
                    desc="Deja de perseguir metas vacías. Crea un plan que respire y evolucione contigo."
                />
            </div>

            {/* 4. PRE-REQUISITE ALERT */}
            <FadeIn className="bg-stone-950 rounded-[3rem] p-12 text-white relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-80 h-80 opacity-[0.05] pointer-events-none">
                    <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                </div>
                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                    <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-8 h-8 text-[var(--color-secondary)]" />
                    </div>
                    <div className="space-y-4 text-center md:text-left">
                        <h3 className="text-2xl font-heading">Requisito Sagrado</h3>
                        <p className="text-gray-400 font-light text-lg">
                            Para este viaje, necesitas **5 imágenes personales** (una para cada pilar: Propósito, Abundancia, Vínculos, Expansión e Intimidad). Si ya las tienes en tu dispositivo, estamos listas.
                        </p>
                    </div>
                </div>
            </FadeIn>

            {/* 5. CTA BUTTON */}
            <footer className="flex flex-col items-center gap-8 py-12">
                <button
                    onClick={onNext}
                    className="btn-premium px-16 py-6 text-2xl shadow-[0_20px_50px_rgba(var(--color-primary-rgb),0.2)]"
                >
                    Comenzar el Viaje
                    <ArrowRight className="w-6 h-6" />
                </button>
                <p className="text-stone-400 text-xs tracking-[0.3em] uppercase flex items-center gap-3">
                    <span className="w-12 h-px bg-stone-200" />
                    Espacio de Presencia
                    <span className="w-12 h-px bg-stone-200" />
                </p>
            </footer>
        </div>
    );
}

function BenefitCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="bg-white p-10 rounded-[3rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-stone-50 flex items-center justify-center mx-auto text-[var(--color-secondary)] border border-stone-100 shadow-inner">
                {icon}
            </div>
            <h3 className="text-2xl font-heading text-[var(--color-primary)]">{title}</h3>
            <p className="text-stone-500 text-sm leading-relaxed font-light">{desc}</p>
        </div>
    );
}
