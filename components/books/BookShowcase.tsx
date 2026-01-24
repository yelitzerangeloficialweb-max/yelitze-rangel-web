"use client";

import Image from 'next/image';
import Link from 'next/link';
import {
    ShoppingCart, Star, BookOpen,
    ArrowLeft, ExternalLink, Sparkles, ArrowRight
} from 'lucide-react';
import { FadeIn } from '@/components/ui/motion';

interface BookShowcaseProps {
    title: string;
    subtitle: string;
    description: string[];
    price: string;
    coverImage: string;
    amazonLink: string;
    kindleLink?: string;
    features: string[];
}

export default function BookShowcase({
    title,
    subtitle,
    description,
    price,
    coverImage,
    amazonLink,
    kindleLink,
    features
}: BookShowcaseProps) {
    return (
        <section className="min-h-screen bg-[#fafcfe] pb-20 pt-20">
            {/* Header: Split-Panel Aesthetic */}
            <div className="flex flex-col lg:flex-row min-h-[70vh] relative overflow-hidden">
                {/* Left Panel: Ivory Content */}
                <div className="lg:w-[45%] bg-white p-8 md:p-16 lg:p-24 flex flex-col justify-center relative overflow-hidden">
                    {/* Subtle Watermark */}
                    <div className="absolute -left-20 -bottom-20 w-[700px] h-[700px] opacity-[0.02] pointer-events-none">
                        <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                    </div>

                    <FadeIn>
                        <Link href="/libros" className="inline-flex items-center gap-2 text-stone-400 hover:text-[var(--color-secondary)] mb-12 transition-colors uppercase text-xs tracking-widest font-bold">
                            <ArrowLeft className="w-4 h-4" />
                            Regresar al Cofre
                        </Link>

                        <div className="inline-block mb-8">
                            <span className="px-6 py-2 rounded-full border border-[var(--color-secondary)]/20 bg-[var(--color-secondary)]/[0.03] text-[var(--color-secondary)] text-[10px] font-bold tracking-[0.2em] uppercase">
                                Obra Literaria
                            </span>
                        </div>

                        <h1 className="text-[var(--color-primary)] text-4xl md:text-5xl lg:text-7xl font-heading mb-10 leading-tight">
                            {title}
                        </h1>

                        <p className="text-xl text-stone-400 font-light italic border-l-4 border-[var(--color-secondary)]/20 pl-6 leading-relaxed">
                            {subtitle}
                        </p>
                    </FadeIn>
                </div>

                {/* Right Panel: Immersive Image with 3D Book */}
                <div className="lg:w-[55%] relative min-h-[500px] lg:min-h-full flex items-center justify-center p-12 bg-stone-50">
                    <Image
                        src="/assets/images/about-ritual.jpg"
                        alt="Background"
                        fill
                        className="object-cover opacity-30 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-50 to-transparent" />

                    <FadeIn className="relative z-10">
                        {/* 3D Book Display */}
                        <div className="relative w-64 md:w-80 h-[400px] md:h-[500px] perspective-1000 group">
                            <div className="relative w-full h-full transform-gpu rotate-y-12 -rotate-x-6 shadow-[-40px_40px_100px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden border border-stone-200">
                                <Image
                                    src={coverImage}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-y-0 left-0 w-6 bg-black/10 shadow-inner z-10" />
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Narrative & Content Section */}
            <div className="py-24 px-4 overflow-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
                        {/* Main Text */}
                        <div className="lg:col-span-8 space-y-12">
                            <FadeIn className="prose prose-xl max-w-none text-stone-600 leading-relaxed font-light">
                                <div className="space-y-8">
                                    {description.map((para, idx) => (
                                        <p key={idx} className={idx === 0 ? "text-2xl font-serif italic text-[var(--color-primary)] leading-snug" : ""}>
                                            {para}
                                        </p>
                                    ))}
                                </div>
                            </FadeIn>

                            <div className="grid sm:grid-cols-2 gap-8 pt-12 border-t border-stone-100">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="mt-1 p-2 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                                            <Star className="w-4 h-4 fill-current" />
                                        </div>
                                        <span className="text-xl font-heading text-[var(--color-primary)]">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Conversion Sidebar */}
                        <div className="lg:col-span-4">
                            <FadeIn className="sticky top-32 space-y-6">
                                <div className="p-10 bg-stone-900 rounded-[3rem] shadow-2xl text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-10 opacity-10">
                                        <Sparkles className="w-20 h-20" />
                                    </div>

                                    <h3 className="text-2xl font-heading mb-8 relative z-10">Obtén tu ejemplar</h3>

                                    <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/10">
                                        <span className="text-stone-400 uppercase tracking-widest text-xs">Precio</span>
                                        <span className="text-4xl font-heading text-[var(--color-secondary)]">{price}</span>
                                    </div>

                                    <div className="space-y-4 relative z-10">
                                        <a
                                            href={amazonLink}
                                            target="_blank"
                                            className="btn-premium w-full bg-[#131921] !text-white hover:bg-black py-5 flex-col items-center gap-0 group"
                                        >
                                            <span className="text-[10px] uppercase tracking-widest opacity-60">Comprar en</span>
                                            <span className="text-lg font-bold flex items-center gap-1">
                                                amazon<span className="text-[#FF9900]">.com</span>
                                            </span>
                                        </a>

                                        <a
                                            href="https://wa.me/17867268717"
                                            target="_blank"
                                            className="w-full py-5 rounded-full border border-white/10 flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-sm tracking-widest uppercase font-bold text-white/80"
                                        >
                                            Ventas en Venezuela
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>

                                    {kindleLink && (
                                        <p className="text-center text-xs text-stone-500 mt-8 italic">
                                            También disponible en versión Kindle para descarga inmediata.
                                        </p>
                                    )}
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
