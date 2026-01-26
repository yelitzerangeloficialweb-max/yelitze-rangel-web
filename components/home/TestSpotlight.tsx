"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Compass, ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/ui/motion';

export default function TestSpotlight() {
    return (
        <section className="relative py-32 bg-stone-950 overflow-hidden">
            {/* Subtle Watermark Background */}
            {/* Subtle Watermark Background */}
            <div className="absolute -left-32 -bottom-32 w-[800px] h-[800px] opacity-[0.05] pointer-events-none rotate-12">
                <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
            </div>

            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-12 items-center gap-16 lg:gap-24">
                    {/* Left: Content Card */}
                    <div className="lg:col-span-6 space-y-10 order-2 lg:order-1">
                        <FadeIn>
                            <span className="text-[var(--color-secondary)] font-bold tracking-[0.4em] uppercase text-xs mb-6 block">Diagnóstico de Alma</span>
                            <h2 className="text-white text-4xl md:text-6xl font-heading leading-tight italic">
                                Arquitectura de Vida <br />
                                <span className="text-white/40">Intencional 2026</span>
                            </h2>
                            <p className="text-gray-400 text-lg md:text-xl font-light italic leading-relaxed max-w-xl mt-8">
                                Un viaje diseñado para quienes deciden dejar de sobrevivir y comenzar a co-crear su realidad desde el alma. Descubre si estás listo para este movimiento.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10 border-t border-white/10 mt-12">
                                <div className="space-y-3">
                                    <h4 className="text-white font-medium flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]" />
                                        Orden Sistémico
                                    </h4>
                                    <p className="text-gray-500 text-sm">Ocupa tu lugar correcto para que la abundancia fluya.</p>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-white font-medium flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]" />
                                        Propósito Claro
                                    </h4>
                                    <p className="text-gray-500 text-sm">Convierte tus heridas en talentos al servicio de la vida.</p>
                                </div>
                            </div>

                            <div className="pt-12">
                                <Link
                                    href="/experiencia-guiada"
                                    className="btn-premium px-12 py-5 bg-white !text-stone-900 shadow-xl hover:!bg-stone-200 group"
                                >
                                    Iniciar mi Transformación
                                    <Compass className="w-5 h-5 text-[var(--color-secondary)] group-hover:rotate-12 transition-transform" />
                                </Link>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right: Immersive Image */}
                    <div className="lg:col-span-6 order-1 lg:order-2">
                        <FadeIn delay={0.2}>
                            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl ring-1 ring-white/10">
                                <Image
                                    src="/assets/images/circulation-vital.png"
                                    alt="Arquitectura de Vida"
                                    fill
                                    className="object-cover"
                                />
                                {/* Soft overlay for texture */}
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent" />

                                {/* Floating element */}
                                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-stone-900/40 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full flex items-center gap-4 z-20">
                                    <div className="flex -space-x-3">
                                        {['ana', 'carolina', 'sofia'].map(name => (
                                            <div key={name} className="relative w-8 h-8 rounded-full border-2 border-stone-950 bg-stone-800 overflow-hidden ring-1 ring-white/10">
                                                <Image
                                                    src={`/assets/images/testimonials/${name}.png`}
                                                    alt=""
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-white/90 text-[10px] font-bold tracking-[0.2em] uppercase whitespace-nowrap">+500 Almas en proceso</span>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
