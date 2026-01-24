"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight, Calendar, User,
    Sparkles, Star, ArrowDown
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function BlogPage() {
    const featuredPost = BLOG_POSTS[0];
    const recentPosts = BLOG_POSTS.slice(1);

    return (
        <main className="bg-[#fafcfe] min-h-screen selection:bg-[var(--color-secondary)] selection:text-white pb-20">

            {/* 1. HERO SECTION: CRÓNICAS DEL ALMA */}
            <section className="relative min-h-[80vh] flex flex-col lg:flex-row overflow-hidden pt-20">
                {/* Left Panel: Luminous Ivory */}
                <div className="lg:w-[45%] bg-white p-8 md:p-16 lg:p-24 flex flex-col justify-center relative overflow-hidden">
                    {/* Subtle Watermark */}
                    <div className="absolute -left-32 -bottom-32 w-[900px] h-[900px] opacity-[0.03] pointer-events-none">
                        <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                    </div>

                    <FadeIn>
                        {/* Pill Badge Style */}
                        <div className="inline-block mb-10">
                            <span className="px-8 py-3 rounded-full border border-[var(--color-secondary)]/20 bg-[var(--color-secondary)]/[0.03] text-[var(--color-secondary)] text-sm md:text-base font-light tracking-[0.2em] uppercase backdrop-blur-sm shadow-sm">
                                Letras que Sanan
                            </span>
                        </div>

                        <h1 className="text-[var(--color-primary)] text-4xl md:text-5xl lg:text-7xl font-heading mb-8 leading-tight">
                            Crónicas <br /> del Alma
                        </h1>
                        <p className="text-[var(--color-text-light)] text-lg md:text-xl font-light italic leading-relaxed max-w-md">
                            Reflexiones profundas, sabiduría ancestral y herramientas sistémicas para acompañar tu proceso de evolución.
                        </p>

                        <Link
                            href="#articulos"
                            className="inline-flex items-center gap-4 text-[var(--color-primary)] group border-b border-[var(--color-primary)]/10 pb-2 w-fit hover:border-[var(--color-secondary)] transition-all text-lg font-medium mt-12"
                        >
                            Explorar la Bitácora
                            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform text-[var(--color-secondary)]" />
                        </Link>
                    </FadeIn>
                </div>

                {/* Right Panel: Ethereal Image */}
                <div className="lg:w-[55%] relative min-h-[500px] lg:min-h-full">
                    <Image
                        src="/assets/images/vortex-hero-clean.png"
                        alt="Inspiración y Bitácora"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Soft gradient transition */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent hidden lg:block" />
                </div>
            </section>

            {/* 2. FEATURED SPOTLIGHT */}
            <section id="articulos" className="py-24 px-4 relative overflow-hidden">
                <div className="container mx-auto max-w-7xl">
                    <FadeIn>
                        <div className="relative group rounded-[3rem] overflow-hidden bg-white shadow-2xl border border-stone-100 flex flex-col lg:flex-row mb-24">
                            {/* Image Part */}
                            <div className="lg:w-[60%] relative aspect-video lg:aspect-auto min-h-[350px] overflow-hidden">
                                <Image
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/40 to-transparent" />
                            </div>

                            {/* content Part */}
                            <div className="lg:w-[40%] p-10 md:p-16 flex flex-col justify-center space-y-8 relative">
                                {/* Watermark subtle */}
                                <div className="absolute -right-10 -bottom-10 w-64 h-64 opacity-[0.05] pointer-events-none">
                                    <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                                </div>

                                <div className="space-y-4">
                                    <span className="text-[var(--color-secondary)] font-bold tracking-[0.3em] uppercase text-xs">
                                        Artículo Destacado
                                    </span>
                                    <h2 className="text-3xl md:text-5xl font-heading text-[var(--color-primary)] leading-tight">
                                        {featuredPost.title}
                                    </h2>
                                </div>
                                <p className="text-[var(--color-text-light)] text-lg leading-relaxed line-clamp-3">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-stone-400">
                                    <Calendar className="w-4 h-4" /> {featuredPost.date}
                                    <span className="w-1 h-1 rounded-full bg-stone-300" />
                                    {featuredPost.category}
                                </div>
                                <Link
                                    href={`/blog/${featuredPost.slug}`}
                                    className="btn-premium px-10 py-4 group w-fit"
                                >
                                    Continuar Leyendo
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </FadeIn>

                    {/* 3. RECENT ARTICLES GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
                        {recentPosts.map((post, idx) => (
                            <FadeIn key={post.id} delay={idx * 0.1}>
                                <div className="group relative flex flex-col h-full">
                                    {/* Card Container */}
                                    <div className="bg-white rounded-[2.5rem] overflow-hidden border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col h-full">
                                        {/* Image wrapper */}
                                        <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden block">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />
                                            <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors" />
                                            {/* Tag */}
                                            <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[var(--color-primary)] text-[10px] font-bold tracking-widest uppercase shadow-sm">
                                                {post.category}
                                            </div>
                                        </Link>

                                        {/* Content Area */}
                                        <div className="p-10 space-y-6 flex flex-col flex-grow">
                                            <div className="space-y-4 flex-grow">
                                                <div className="flex items-center gap-3 text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                                                    <Calendar className="w-3 h-3 text-[var(--color-secondary)]" />
                                                    {post.date}
                                                </div>
                                                <h3 className="text-2xl font-heading text-[var(--color-primary)] leading-tight group-hover:text-[var(--color-secondary)] transition-colors">
                                                    {post.title}
                                                </h3>
                                                <p className="text-[var(--color-text-light)] text-sm leading-relaxed line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                            </div>

                                            <div className="pt-6 border-t border-stone-50">
                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    className="inline-flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm tracking-wide group/btn"
                                                >
                                                    Leer Artículo
                                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. NEWSLETTER / CALL TO ACTION */}
            <section className="py-32 bg-stone-900 relative overflow-hidden">
                {/* Subtle Watermark Decoration */}
                <div className="absolute -right-40 -bottom-40 w-[800px] h-[800px] opacity-[0.05] pointer-events-none rotate-12">
                    <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                </div>

                <div className="container mx-auto px-4 relative">
                    <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
                            <FadeIn>
                                <span className="text-[var(--color-secondary)] font-bold tracking-[0.3em] uppercase text-xs">Bitácora Mensual</span>
                                <h2 className="text-white text-4xl md:text-6xl font-heading leading-tight mb-8">El Susurro <br /> del Alma</h2>
                                <p className="text-gray-400 text-lg md:text-xl font-light italic leading-relaxed">
                                    Únete a nuestra comunidad Consciente y recibe reflexiones exclusivas, guías de sanación y el calendario de rituales directamente en tu buzón.
                                </p>
                            </FadeIn>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <FadeIn delay={0.2}>
                                <div className="bg-white/5 backdrop-blur-xl p-1 md:p-2 rounded-full border border-white/10 flex">
                                    <input
                                        type="email"
                                        placeholder="Tu correo electrónico..."
                                        className="bg-transparent flex-grow px-8 py-4 text-white focus:outline-none placeholder:text-gray-500"
                                    />
                                    <button className="bg-[var(--color-secondary)] text-white px-8 md:px-12 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-xl flex items-center gap-2 whitespace-nowrap">
                                        Suscribirme <Sparkles className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-center text-[10px] text-gray-500 mt-6 tracking-widest uppercase">Prometo cuidar tu energía y tu privacidad.</p>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA: RESERVAS */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-heading text-[var(--color-primary)] mb-12 italic">¿Sientes el llamado a profundizar?</h2>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                            <Link
                                href="/servicios"
                                className="btn-premium px-12 py-5 text-xl"
                            >
                                Sesiones Individuales
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/eventos"
                                className="px-12 py-5 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors text-xl font-medium"
                            >
                                Ver Próximos Eventos
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
