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
        <main className="bg-[#fafcfe] min-h-screen pb-20">
            {/* Split-Panel Header */}
            <section className="relative min-h-[70vh] flex flex-col lg:flex-row overflow-hidden pt-20">
                {/* Left Panel: Content & Title */}
                <div className="lg:w-[45%] bg-white p-8 md:p-16 lg:p-24 flex flex-col justify-center relative overflow-hidden">
                    {/* Subtle Watermark */}
                    <div className="absolute -left-32 -bottom-32 w-[800px] h-[800px] opacity-[0.02] pointer-events-none">
                        <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                    </div>

                    <FadeIn>
                        <Link href="/blog" className="inline-flex items-center gap-2 text-stone-400 hover:text-[var(--color-secondary)] mb-12 transition-colors uppercase text-xs tracking-widest font-bold">
                            <ArrowLeft className="w-4 h-4" />
                            Volver a la Bitácora
                        </Link>

                        <div className="inline-block mb-8">
                            <span className="px-6 py-2 rounded-full border border-[var(--color-secondary)]/20 bg-[var(--color-secondary)]/[0.03] text-[var(--color-secondary)] text-[10px] font-bold tracking-[0.2em] uppercase">
                                {post.category}
                            </span>
                        </div>

                        <h1 className="text-[var(--color-primary)] text-4xl md:text-5xl lg:text-7xl font-heading mb-10 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap gap-8 text-sm text-stone-400">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[var(--color-secondary)]" />
                                <span className="font-medium">{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5 text-[var(--color-secondary)]" />
                                <span className="font-medium">{post.author}</span>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Right Panel: Feature Image */}
                <div className="lg:w-[55%] relative min-h-[400px] lg:min-h-full">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent hidden lg:block" />
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
                                <div className="p-10 bg-stone-900 rounded-[3rem] shadow-2xl text-white relative overflow-hidden mb-8">
                                    <div className="absolute top-0 right-0 p-10 opacity-10">
                                        <Sparkles className="w-20 h-20" />
                                    </div>
                                    <h3 className="text-2xl font-heading mb-6 relative z-10">¿Te resonó esta lectura?</h3>
                                    <p className="text-gray-400 mb-10 font-light leading-relaxed">
                                        Te invito a profundizar en este tema a través de una sesión personalizada de Alquimia Ancestral.
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
