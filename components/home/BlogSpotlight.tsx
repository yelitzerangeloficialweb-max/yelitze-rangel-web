"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { BLOG_POSTS } from '@/lib/blog-data';

export default function BlogSpotlight() {
    const featuredPost = BLOG_POSTS[0];
    const recentPosts = BLOG_POSTS.slice(1, 4);

    return (
        <section className="py-32 bg-[#F4EFE9] overflow-hidden" id="blog">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
                    <FadeIn>
                        <span className="text-[var(--color-secondary)] font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Letras que Sanan</span>
                        <h2 className="text-[var(--color-primary)] text-4xl md:text-6xl font-heading leading-tight italic">
                            Crónicas <br />
                            <span className="opacity-40">del Alma</span>
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-4 text-[var(--color-primary)] font-bold tracking-widest uppercase border-b border-[var(--color-primary)]/10 pb-4 hover:border-[var(--color-secondary)] transition-all group"
                        >
                            Ver toda la Bitácora
                            <ArrowRight className="w-5 h-5 text-[var(--color-secondary)] group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </FadeIn>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
                    {/* Featured Post Card */}
                    <div className="lg:col-span-8">
                        <FadeIn>
                            <Link href={`/blog/${featuredPost.slug}`} className="group relative block rounded-[3.5rem] overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-700">
                                <div className="relative aspect-[16/9] lg:aspect-auto lg:h-[500px] overflow-hidden">
                                    <Image
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
                                </div>
                                <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white z-10 w-full">
                                    <div className="space-y-4">
                                        <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/20">
                                            {featuredPost.category}
                                        </span>
                                        <h3 className="text-3xl md:text-5xl font-heading leading-tight max-w-2xl [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]">
                                            {featuredPost.title}
                                        </h3>
                                        <p className="text-white/90 text-lg font-light italic line-clamp-2 max-w-xl [text-shadow:_0_1px_5px_rgb(0_0_0_/_30%)]">
                                            {featuredPost.excerpt}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>
                    </div>

                    {/* Side Feed: Recent Posts */}
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        {recentPosts.map((post, idx) => (
                            <FadeIn key={post.id} delay={0.2 + idx * 0.1}>
                                <Link href={`/blog/${post.slug}`} className="group flex gap-6 items-center border-b border-stone-100 pb-8 hover:border-[var(--color-secondary)]/30 transition-colors">
                                    <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                                            <Calendar className="w-3 h-3 text-[var(--color-secondary)] opacity-50" />
                                            {post.date}
                                        </div>
                                        <h4 className="text-lg font-heading text-[var(--color-primary)] leading-snug group-hover:text-[var(--color-secondary)] transition-colors line-clamp-2">
                                            {post.title}
                                        </h4>
                                    </div>
                                </Link>
                            </FadeIn>
                        ))}

                        {/* Newsletter Mini Card */}
                        <FadeIn delay={0.5}>
                            <div className="mt-4 p-8 rounded-[2rem] bg-stone-900 overflow-hidden relative group">
                                <div className="absolute -right-8 -bottom-8 w-32 h-32 opacity-[0.05] group-hover:scale-110 transition-transform duration-1000">
                                    <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                                </div>
                                <h5 className="text-white font-heading text-xl mb-4 italic">El Susurro del Alma</h5>
                                <p className="text-gray-400 text-sm font-light mb-6">Reflexiones exclusivas en tu buzón.</p>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Tu correo..."
                                        className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs text-white focus:outline-none focus:border-[var(--color-secondary)]"
                                    />
                                    <button className="absolute right-1 top-1 bottom-1 px-4 bg-[var(--color-secondary)] text-white rounded-full">
                                        <Sparkles className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
