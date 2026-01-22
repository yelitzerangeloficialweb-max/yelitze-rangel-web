'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PromotionalBanner() {
    return (
        <section className="relative w-full py-16 md:py-24 overflow-hidden bg-[var(--color-secondary)]">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-10 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-y-1/2" />
                <div className="absolute bottom-0 right-10 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <div className="text-center lg:text-left space-y-8 animate-fade-in">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-white drop-shadow-sm">
                            Descubre tu <br />
                            <span className="text-[var(--color-primary)]">Arquitectura de Vida</span> <br />
                            <span>Intencional 2026</span>
                        </h2>

                        <div className="pt-4 flex justify-center lg:justify-start">
                            <Link
                                href="/experiencia-guiada"
                                className="px-8 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white rounded-full font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl"
                            >
                                Experiencia Guiada
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Product Image */}
                    <div className="relative flex justify-center lg:justify-end animate-fade-in-up delay-100">
                        <div className="relative w-full max-w-[500px] aspect-[4/3] transform hover:scale-[1.02] transition-transform duration-500 rounded-2xl overflow-hidden shadow-2xl">
                            {/* Glow/Shadow behind book - Adjusted for container */}
                            <div className="absolute inset-0 bg-secondary/20 blur-2xl transform scale-90 translate-y-4 rounded-full -z-10" />

                            <Image
                                src="/assets/images/manual-2026.jpg"
                                alt="Manual de Manifestación 2026"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
