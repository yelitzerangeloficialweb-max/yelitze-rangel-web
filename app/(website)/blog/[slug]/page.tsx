"use client";

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowLeft, Calendar, User,
    Share2, ArrowRight, Sparkles, Star
} from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import { FadeIn } from '@/components/ui/motion';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="bg-[#FAF9F6] min-h-screen selection:bg-[var(--color-secondary)] selection:text-white pb-20">
            {/* 1. HERO SECTION: PREMIUM EDITORIAL ARTICLE */}
            <section className="relative min-h-[85vh] flex items-center pt-40 pb-20 overflow-hidden bg-[#333333]">
                {/* Background Glows */}
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[var(--color-secondary)] opacity-[0.08] blur-[150px] -translate-y-1/2 -translate-x-1/4" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary)] opacity-[0.05] blur-[130px] translate-y-1/2 translate-x-1/4" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        {/* Left Content */}
                        <FadeIn>
                            <Link href="/blog" className="inline-flex items-center gap-3 text-white/30 hover:text-white mb-16 transition-all group uppercase text-[10px] tracking-[0.3em] font-bold">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Volver a la Bitácora
                            </Link>

                            <span className="text-[var(--color-secondary)] font-script text-3xl md:text-5xl mb-6 block tracking-[0.03em]">
                                {post.category}
                            </span>
                            
                            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-heading leading-[1.2] italic mb-12">
                                {post.title}
                            </h1>

                            <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
                                <div className="flex flex-wrap gap-12 text-sm text-white/40 uppercase tracking-[0.15em] font-medium">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[var(--color-secondary)] text-[10px] opacity-60">Publicado</span>
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[var(--color-secondary)] text-[10px] opacity-60">Escrito por</span>
                                        <span>{post.author}</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[var(--color-secondary)] text-[10px] opacity-60">Tiempo</span>
                                        <span>8 min • Lectura</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Right Image: Editorial 4:5 Frame */}
                        <FadeIn delay={0.2} className="relative">
                            <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto lg:ml-auto">
                                <div className="absolute -inset-4 border border-white/5 rounded-2xl" />
                                <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                </div>
                                
                                {/* Decorator Badge */}
                                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[var(--color-secondary)] rounded-full flex items-center justify-center p-4 shadow-xl border-4 border-[#333333]">
                                    <Sparkles className="text-white w-8 h-8 opacity-40" />
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>

                {/* Vertical Indicator */}
                <div className="absolute right-12 bottom-12 hidden lg:flex flex-col items-center gap-6">
                    <span className="[writing-mode:vertical-rl] text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">Lectura • Bitácora</span>
                    <div className="w-px h-12 bg-gradient-to-t from-[var(--color-secondary)] to-transparent" />
                </div>
            </section>

            {/* Article Content Section */}
            <section className="py-24 px-4 overflow-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
                        {/* Main Article Body */}
                        <div className="lg:col-span-8">
                            <FadeIn>
                                <div className="p-10 md:p-14 bg-white rounded-[3rem] shadow-sm border border-stone-100 relative overflow-hidden group mb-16">
                                    <div className="absolute -right-20 -top-20 w-80 h-80 opacity-[0.02] pointer-events-none rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                                        <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                                    </div>
                                    <p className="text-2xl md:text-3xl text-[var(--color-primary)] font-light leading-relaxed italic relative z-10">
                                        “{post.excerpt}”
                                    </p>
                                </div>
                            </FadeIn>

                            <article
                                className="prose prose-lg md:prose-xl max-w-none prose-stone prose-headings:font-heading prose-headings:text-[var(--color-primary)] prose-strong:text-[var(--color-primary)] prose-p:text-stone-600 prose-p:leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Share & Feedback */}
                            <div className="mt-20 pt-12 border-t border-stone-100 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-bold uppercase tracking-widest text-stone-400">Compártelo</span>
                                    <div className="flex gap-2">
                                        {[1, 2, 3].map(i => (
                                            <button key={i} className="w-10 h-10 rounded-full border border-stone-100 flex items-center justify-center hover:bg-(--color-secondary) hover:text-white transition-all text-stone-400">
                                                <Share2 className="w-4 h-4" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-stone-400 italic text-sm">
                                    Publicado por {post.author} • Letras con propósito
                                </div>
                            </div>
                        </div>

                        {/* Sidebar CTAs */}
                        <div className="lg:col-span-4 space-y-8">
                            <FadeIn className="sticky top-32">
                                <div className="p-10 bg-black rounded-[3rem] shadow-2xl text-white relative overflow-hidden mb-8">
                                    <div className="absolute top-0 right-0 p-10 opacity-10">
                                        <Sparkles className="w-20 h-20" />
                                    </div>
                                    <h3 className="text-2xl font-heading mb-6 relative z-10">¿Te resonó esta lectura?</h3>
                                    <p className="text-gray-400 mb-10 font-light leading-relaxed">
                                        Te invito a profundizar en este tema a través de una sesión personalizada con Tu coach ancestral.
                                    </p>
                                    <Link
                                        href="/reservas"
                                        className="btn-premium w-full bg-white !text-stone-900 hover:!bg-stone-200 shadow-xl py-5 group"
                                    >
                                        Inicia tu Proceso
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                <div className="p-10 bg-[var(--color-secondary)]/10 rounded-[3rem] border border-[var(--color-secondary)]/20 relative overflow-hidden">
                                    <h4 className="text-xl font-heading text-[var(--color-primary)] mb-6">Bitácora Mensual</h4>
                                    <p className="text-stone-600 text-sm mb-8 leading-relaxed">
                                        Suscríbete para recibir reflexiones sobre sanación sistémica en tu buzón.
                                    </p>
                                    <Link
                                        href="/newsletter"
                                        className="inline-flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm tracking-wide group"
                                    >
                                        Unirme a la Tribu
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
