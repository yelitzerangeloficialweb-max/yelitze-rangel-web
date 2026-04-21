"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight, Calendar, User,
    Sparkles, Star, ArrowDown, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { BLOG_POSTS as STATIC_BLOG_POSTS, BlogPost } from "@/lib/blog-data";
import { Turnstile } from "@marsidev/react-turnstile";

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>(STATIC_BLOG_POSTS);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [loadingPosts, setLoadingPosts] = useState(false); // No bloqueante
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    useEffect(() => {
        // Initial sync check
        if (posts.length === 0 && STATIC_BLOG_POSTS.length > 0) {
            console.log("Blog: Initializing with static fallback, found:", STATIC_BLOG_POSTS.length);
            setPosts(STATIC_BLOG_POSTS);
        }

        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/blog');
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setPosts(data);
                }
            } catch (error) {
                console.error('Error loading blog posts:', error);
            } finally {
                setLoadingPosts(false);
            }
        };

        fetchPosts();
    }, []);

    const featuredPost = posts[0] || STATIC_BLOG_POSTS[0];
    const recentPosts = posts.slice(1);

    const articlesCount = posts.length || STATIC_BLOG_POSTS.length;
    const uniqueCategoriesCount = new Set(posts.map(p => p.category)).size || new Set(STATIC_BLOG_POSTS.map(p => p.category)).size;

    if (loadingPosts) {
        return (
            <main className="bg-[#FAF9F6] min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-[var(--color-secondary)]" />
            </main>
        );
    }

    if (!featuredPost) {
       return (
            <main className="bg-[#FAF9F6] min-h-screen flex items-center justify-center">
                <p className="text-stone-500 font-heading text-2xl uppercase tracking-widest">Iniciando bitácora...</p>
            </main>
        );
    }

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
                                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                                <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Regresar al Origen</span>
                            </Link>

                            <span className="text-[var(--color-secondary)] font-script text-3xl md:text-5xl mb-6 block tracking-[0.03em]">Letras que Sanan</span>
                            <h1 className="text-white text-6xl md:text-9xl font-heading leading-[0.9] italic mb-12 text-balance">
                                Crónicas <br />
                                <span className="opacity-20 pl-20 md:pl-40 block">del Alma</span>
                            </h1>

                            <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
                                <p className="text-stone-400 text-xl font-light italic leading-relaxed max-w-md">
                                    "Reflexiones profundas, sabiduría ancestral y herramientas sistémicas para acompañar tu proceso de evolución."
                                </p>
                                <div className="hidden md:block w-px h-24 bg-white/10" />
                                <div className="flex gap-10">
                                    <div className="text-center">
                                        <span className="text-white text-3xl font-heading block">+{articlesCount}</span>
                                        <span className="text-stone-500 text-[9px] uppercase tracking-widest">Artículos</span>
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
                    <span className="[writing-mode:vertical-rl] text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">Explorar Bitácora</span>
                    <div className="w-px h-12 bg-gradient-to-t from-[var(--color-secondary)] to-transparent" />
                </div>
            </section>

            {/* 2. FEATURED SPOTLIGHT */}
            <section id="articulos" className="py-24 px-4 relative overflow-hidden">
                {/* Intensified Accent Blur Flare */}
                <div className="absolute -top-10 -left-10 w-[45%] h-[45%] bg-[radial-gradient(circle_at_center,#FF6B00_0%,transparent_70%)] opacity-30 blur-[120px] pointer-events-none" />
                
                <div className="container mx-auto max-w-7xl">
                    <FadeIn>
                        <div className="relative group rounded-[3rem] overflow-hidden bg-white shadow-2xl border border-stone-100 flex flex-col lg:flex-row mb-24">
                            {/* Image Part */}
                            <div className="lg:w-1/2 relative aspect-[4/5] overflow-hidden">
                                <Image
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    fill
                                    priority
                                    unoptimized
                                    quality={100}
                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-[2000ms]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/40 to-transparent" />
                            </div>

                            {/* content Part */}
                            <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center space-y-8 relative">
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
                                        <Link href={`/blog/${post.slug}`} className="relative aspect-[4/5] overflow-hidden block">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                unoptimized
                                                quality={100}
                                                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
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
            <section className="py-32 bg-black relative overflow-hidden">
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
                                {status === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-white/10 backdrop-blur-xl p-12 rounded-[2.5rem] border border-white/20 text-center space-y-4"
                                    >
                                        <div className="w-16 h-16 bg-[var(--color-secondary)]/20 rounded-full flex items-center justify-center mx-auto border border-[var(--color-secondary)]/30">
                                            <Sparkles className="w-8 h-8 text-[var(--color-secondary)]" />
                                        </div>
                                        <h3 className="text-white text-2xl font-heading">¡Ya eres parte!</h3>
                                        <p className="text-gray-400 text-sm">Pronto recibirás la medicina en tu correo.</p>
                                        <button 
                                            onClick={() => setStatus("idle")}
                                            className="text-[var(--color-secondary)] text-[10px] font-bold uppercase tracking-[0.2em] border-b border-[var(--color-secondary)]/30 pb-1"
                                        >
                                            Suscribir otro
                                        </button>
                                    </motion.div>
                                ) : (
                                    <div className="space-y-6">
                                        <form 
                                            onSubmit={async (e) => {
                                                e.preventDefault();
                                                if (!turnstileToken) return;
                                                const form = e.target as HTMLFormElement;
                                                const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
                                                const emailValue = emailInput.value;
                                                
                                                setStatus("loading");
                                                try {
                                                    const res = await fetch('/api/newsletter', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({ email: emailValue }),
                                                    });
                                                    if (res.ok) setStatus("success");
                                                    else setStatus("error");
                                                } catch {
                                                    setStatus("error");
                                                }
                                            }}
                                            className="bg-white/5 backdrop-blur-xl p-1 md:p-2 rounded-full border border-white/10 flex flex-row relative overflow-hidden max-w-xl mx-auto"
                                        >
                                            <input
                                                type="email"
                                                required
                                                placeholder="Tu correo electrónico..."
                                                className="bg-transparent flex-grow px-8 py-4 text-white focus:outline-none placeholder:text-gray-500 min-w-0"
                                            />
                                            <button 
                                                type="submit"
                                                disabled={status === "loading" || !turnstileToken}
                                                className="bg-[var(--color-secondary)] text-white px-8 md:px-12 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-xl flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
                                            >
                                                {status === "loading" ? "..." : (
                                                    <>Suscribirme <Sparkles className="w-4 h-4" /></>
                                                )}
                                            </button>
                                        </form>
                                        <div className="flex justify-center mt-6">
                                            <Turnstile
                                                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                                                onSuccess={(token) => setTurnstileToken(token)}
                                                options={{ theme: "dark", appearance: "interaction-only" }}
                                            />
                                        </div>
                                        {status === "error" && (
                                            <p className="text-red-400 text-[10px] text-center uppercase tracking-widest font-bold">Error, por favor intenta de nuevo</p>
                                        )}
                                    </div>
                                )}
                                <p className="text-center text-[10px] text-gray-500 mt-6 tracking-widest uppercase">Prometo cuidar tu energía y tu privacidad.</p>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA: PREMIUM EXPERIENCE */}
            <section className="relative py-40 px-6 overflow-hidden group">
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#333333] to-transparent z-10" />
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/Imagenes-Reediseno/sesion-espiritual.jpg"
                        alt="Final CTA Background"
                        fill
                        className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[3000ms]"
                    />
                    <div className="absolute inset-0 bg-black/80" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <FadeIn>
                        <span className="font-script text-white text-4xl md:text-5xl mb-6 block drop-shadow-lg">
                            ¿Sientes el llamado a profundizar?
                        </span>
                        
                        <h2 className="text-white text-5xl md:text-8xl font-heading mb-8 uppercase tracking-tight leading-none">
                            Tu Proceso <br /> <span className="text-[var(--color-secondary)]">Empieza Aquí</span>
                        </h2>

                        <div className="w-24 h-px bg-[var(--color-secondary)] mx-auto mb-10" />

                        <p className="text-stone-300 text-xl font-light italic mb-16 max-w-2xl mx-auto leading-relaxed">
                            Únete a nuestros círculos sagrados o inicia tu proceso individual. La bitácora sigue creciendo con cada alma que despierta.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                            <Link
                                href="/servicios"
                                className="btn-premium px-12 py-5 shadow-2xl group min-w-[280px]"
                            >
                                Sesiones Individuales
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/eventos"
                                className="px-12 py-5 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all font-bold tracking-widest uppercase text-xs backdrop-blur-sm min-w-[280px]"
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
