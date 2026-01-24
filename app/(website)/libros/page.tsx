"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight, ShoppingBag, BookOpen,
    Sparkles, Star, ArrowDown, ExternalLink
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const books = [
    {
        title: "Hilos de Conexión",
        subtitle: "Un viaje curativo a la memoria del origen",
        slug: "hilos-de-conexion",
        cover: "/assets/images/manual-2026.jpg", // Using professional asset
        description: "Una invitación a recordar, a sanar y a reconectar con esa memoria sagrada que habita en tu ADN. Un manual para quienes buscan su origen.",
        amazonLink: "https://www.amazon.com/dp/B0CSXW7R2J"
    },
    {
        title: "Conversaciones con mi Chamana",
        subtitle: "107 pláticas para despertar tu medicina interior",
        slug: "conversaciones-con-mi-chamana",
        cover: "/assets/images/about-book.jpg", // Using professional asset
        description: "Reflexiones, meditaciones y diálogos internos para acompañarte en tu día a día y despertar tu sabiduría interior más profunda.",
        amazonLink: "https://www.amazon.com/dp/B0CSXW7R2J"
    }
];

export default function BooksPage() {
    return (
        <main className="bg-[#fafcfe] min-h-screen selection:bg-[var(--color-secondary)] selection:text-white pb-20">

            {/* 1. HERO SECTION: COFRE DE SABIDURÍA */}
            <section className="relative min-h-[80vh] flex flex-col lg:flex-row overflow-hidden pt-20">
                {/* Left Panel: Luminous Beige */}
                <div className="lg:w-[45%] bg-[#fdfcf6] p-8 md:p-16 lg:p-24 flex flex-col justify-center relative overflow-hidden">
                    {/* Subtle Watermark */}
                    <div className="absolute -left-32 -bottom-32 w-[900px] h-[900px] opacity-[0.03] pointer-events-none">
                        <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                    </div>

                    <FadeIn>
                        {/* Pill Badge Style */}
                        <div className="inline-block mb-10">
                            <span className="px-8 py-3 rounded-full border border-[var(--color-secondary)]/20 bg-[var(--color-secondary)]/[0.03] text-[var(--color-secondary)] text-sm md:text-base font-light tracking-[0.2em] uppercase backdrop-blur-sm shadow-sm">
                                Letras con Propósito
                            </span>
                        </div>

                        <h1 className="text-[var(--color-primary)] text-4xl md:text-5xl lg:text-7xl font-heading mb-8 leading-tight">
                            Cofre de <br /> Sabiduría
                        </h1>
                        <p className="text-[var(--color-text-light)] text-lg md:text-xl font-light italic leading-relaxed max-w-md">
                            Libros diseñados para ser espejos de tu alma y guías en tu viaje de retorno a la esencia.
                        </p>

                        <Link
                            href="#biblioteca"
                            className="inline-flex items-center gap-4 text-[var(--color-primary)] group border-b border-[var(--color-primary)]/10 pb-2 w-fit hover:border-[var(--color-secondary)] transition-all text-lg font-medium mt-12"
                        >
                            Explorar los Libros
                            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform text-[var(--color-secondary)]" />
                        </Link>
                    </FadeIn>
                </div>

                {/* Right Panel: Ethereal Image */}
                <div className="lg:w-[55%] relative min-h-[500px] lg:min-h-full">
                    {/* Placeholder for the Book/Candle Image until Reset */}
                    <Image
                        src="/assets/images/about-ritual.jpg"
                        alt="Sabiduría Ancestral"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Soft gradient transition */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#fdfcf6] to-transparent hidden lg:block" />
                </div>
            </section>

            {/* 2. BOOKS SHOWCASE GRID */}
            <section id="biblioteca" className="py-32 px-4 relative overflow-hidden">
                {/* Background Watermark */}
                <div className="absolute -right-40 -top-40 w-[800px] h-[800px] opacity-[0.02] pointer-events-none">
                    <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                </div>

                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
                        {books.map((book, idx) => (
                            <FadeIn key={book.slug} delay={idx * 0.1}>
                                <div className="group relative flex flex-col items-center">
                                    {/* 3D Book Display Experience */}
                                    <div className="relative w-64 h-96 mb-12 perspective-1000">
                                        <div className="relative w-full h-full transform-gpu group-hover:rotate-y-12 group-hover:-rotate-x-6 transition-all duration-700 ease-out shadow-[-20px_20px_60px_rgba(0,0,0,0.2)] rounded-lg overflow-hidden border border-stone-100">
                                            <Image
                                                src={book.cover}
                                                alt={book.title}
                                                fill
                                                className="object-cover"
                                            />
                                            {/* Spine Detail Effect */}
                                            <div className="absolute inset-y-0 left-0 w-4 bg-black/10 shadow-inner z-10" />
                                        </div>
                                    </div>

                                    {/* Content Details */}
                                    <div className="text-center space-y-6 max-w-md">
                                        <div className="space-y-2">
                                            <span className="text-[var(--color-secondary)] font-bold tracking-[0.2em] uppercase text-[10px]">Edición Impresa & Digital</span>
                                            <h2 className="text-3xl md:text-4xl font-heading text-[var(--color-primary)] leading-tight">
                                                {book.title}
                                            </h2>
                                            <p className="text-stone-400 italic text-lg">{book.subtitle}</p>
                                        </div>

                                        <p className="text-[var(--color-text-light)] leading-relaxed">
                                            {book.description}
                                        </p>

                                        <div className="flex flex-col gap-4 pt-6">
                                            {/* Amazon Button with Logo Concept */}
                                            <a
                                                href={book.amazonLink}
                                                target="_blank"
                                                className="btn-premium bg-[#131921] !text-white hover:bg-black w-full justify-center flex items-center gap-3 py-5"
                                            >
                                                {/* Amazon Logo Representation */}
                                                <div className="flex flex-col items-center">
                                                    <span className="text-[10px] uppercase tracking-widest opacity-70">Disponible en</span>
                                                    <span className="font-bold flex items-center gap-1 leading-none">
                                                        amazon <span className="text-[#FF9900]">.com</span>
                                                    </span>
                                                </div>
                                                <ExternalLink className="w-5 h-5 opacity-40" />
                                            </a>

                                            {/* Local Purchase */}
                                            <a
                                                href="https://wa.me/17867268717"
                                                target="_blank"
                                                className="px-10 py-5 rounded-full border border-stone-200 text-stone-600 hover:bg-white hover:shadow-xl transition-all font-medium text-sm tracking-widest uppercase"
                                            >
                                                Adquirir en Venezuela
                                            </a>

                                            <Link
                                                href={`/libros/${book.slug}`}
                                                className="text-[var(--color-secondary)] font-bold text-xs tracking-widest uppercase hover:underline underline-offset-8 mt-4"
                                            >
                                                Ver Detalles del Libro
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. SECTION: EL VALOR DE LA PALABRA */}
            <section className="py-32 bg-stone-950 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <Star className="w-12 h-12 text-[var(--color-secondary)] mx-auto mb-10 opacity-50" />
                        <h2 className="text-white text-4xl md:text-5xl font-heading mb-12 italic max-w-4xl mx-auto leading-tight">
                            "A veces, una frase leída en el momento justo es el inicio de una sanación para toda la vida."
                        </h2>
                        <div className="w-20 h-px bg-[var(--color-secondary)]/30 mx-auto" />
                    </FadeIn>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 bg-white border-t border-stone-100">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-heading text-[var(--color-primary)] mb-12">¿Quieres recibir un fragmento cada mes?</h2>
                        <Link
                            href="/newsletter"
                            className="inline-flex items-center gap-4 px-12 py-5 bg-[var(--color-secondary)] text-white rounded-full text-xl font-medium hover:scale-105 transition-transform shadow-2xl"
                        >
                            Suscríbete a la Bitácora
                            <Sparkles className="w-5 h-5" />
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
