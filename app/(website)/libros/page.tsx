"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight, ShoppingBag, BookOpen,
    Sparkles, Star, ArrowDown, ExternalLink,
    ChevronRight, ArrowLeft
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/motion";

const books = [
    {
        title: "Hilos de Conexión",
        subtitle: "Un viaje curativo a la memoria del origen",
        slug: "hilos-de-conexion",
        cover: "/assets/images/books/hilos-conexion-3d.png",
        description: "Una invitación a recordar, a sanar y a reconectar con esa memoria sagrada que habita en tu ADN. Un manual para quienes buscan su origen.",
        amazonLink: "https://www.amazon.com/dp/B0CKW6595M",
        type: "Libro Físico & Digital"
    },
    {
        title: "Conversaciones con mi Chamana",
        subtitle: "107 pláticas para despertar tu medicina interior",
        slug: "conversaciones-con-mi-chamana",
        cover: "/assets/images/books/conversaciones-chamana-3d.png",
        description: "Reflexiones, meditaciones y diálogos internos para acompañarte en tu día a día y despertar tu sabiduría interior más profunda.",
        amazonLink: "https://www.amazon.com/dp/B0CSXW7R2J",
        type: "Libro Físico & Digital"
    }
];

const readingMoments = [
    { src: '/assets/images/gallery/gallery-6.jpg', alt: 'Lectura Intuitiva' },
    { src: '/assets/images/gallery/gallery-23.jpg', alt: 'Legado Escrito' },
    { src: '/assets/images/gallery/gallery-22.jpg', alt: 'Sabiduría en Papel' }
];

export default function BooksPage() {
    return (
        <main className="bg-[#FAF9F6] min-h-screen selection:bg-[var(--color-secondary)] selection:text-white pb-32">

            {/* 1. HERO SECTION: MIDNIGHT BURST EDITORIAL */}
            <section className="relative min-h-[85vh] flex items-center pt-32 pb-20 overflow-hidden bg-stone-950">
                {/* Background accents */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/10 rounded-full blur-[120px] -mr-40 -mt-40" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] -ml-20 -mb-20" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <FadeIn className="max-w-xl">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-3 text-white/40 hover:text-[var(--color-secondary)] transition-all mb-12 group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Volver al Inicio</span>
                            </Link>

                            <span className="text-[var(--color-secondary)] font-bold tracking-[0.6em] uppercase text-xs mb-8 block">Letras con Propósito</span>
                            <h1 className="text-white text-6xl md:text-8xl font-heading leading-tight mb-12 italic">
                                Cofre de <br />
                                <span className="opacity-40">Sabiduría</span>
                            </h1>
                            <p className="text-stone-400 text-xl font-light italic leading-relaxed mb-12">
                                "La palabra escrita es el puente entre el mundo invisible y tu consciencia. Libros diseñados para ser espejos de tu alma."
                            </p>

                            <Link
                                href="#biblioteca"
                                className="inline-flex items-center gap-6 text-white group"
                            >
                                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[var(--color-secondary)] group-hover:border-[var(--color-secondary)] transition-all duration-500">
                                    <ArrowDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                                </div>
                                <span className="text-xs font-bold tracking-[0.3em] uppercase">Explorar Manuscritos</span>
                            </Link>
                        </FadeIn>

                        <div className="relative">
                            <FadeIn delay={0.4}>
                                <div className="relative aspect-[3/4] rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
                                    <Image
                                        src="/assets/images/yelitze/cofre-sabiduria-premium.png"
                                        alt="Yelitze Rangel - Cofre de Sabiduría"
                                        fill
                                        className="object-cover scale-110"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                                </div>
                                <div className="absolute -bottom-10 -left-10 bg-[var(--color-secondary)] text-white p-12 rounded-[3rem] shadow-2xl hidden md:block">
                                    <Sparkles className="w-10 h-10 mb-4 opacity-50" />
                                    <p className="text-sm font-light italic leading-relaxed">
                                        Libros que transportan <br /> la medicina del linaje <br /> a tu presente.
                                    </p>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. GALLERY SHOWCASE: THE LIBRARY */}
            <section id="biblioteca" className="py-40 container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
                    {books.map((book, idx) => (
                        <div key={book.slug} className="space-y-12">
                            <ScaleIn delay={idx * 0.2}>
                                <div className="relative group perspective-2000">
                                    {/* 3D Book Display */}
                                    <div className="relative aspect-[3/4] w-full max-w-sm mx-auto transform-gpu group-hover:rotate-y-12 group-hover:-rotate-x-6 transition-all duration-[1200ms] ease-out shadow-[-40px_40px_80px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden border border-stone-100">
                                        <Image
                                            src={book.cover}
                                            alt={book.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-y-0 left-0 w-8 bg-black/5 shadow-inner" />
                                    </div>

                                    {/* Floating Badges */}
                                    <div className="absolute -top-6 -right-6 bg-white border border-stone-100 p-6 rounded-2xl shadow-xl hidden md:block">
                                        <BookOpen className="w-6 h-6 text-[var(--color-secondary)]" />
                                    </div>
                                </div>
                            </ScaleIn>

                            <FadeIn className="text-center md:text-left space-y-8 max-w-lg mx-auto md:mx-0">
                                <div className="space-y-4">
                                    <span className="text-[var(--color-secondary)] font-bold tracking-[0.3em] uppercase text-[10px]">{book.type}</span>
                                    <h2 className="text-5xl md:text-6xl font-heading text-[var(--color-primary)] italic leading-tight">
                                        {book.title}
                                    </h2>
                                    <p className="text-stone-400 text-xl font-light italic">{book.subtitle}</p>
                                </div>

                                <p className="text-stone-500 text-lg leading-relaxed font-light italic">
                                    {book.description}
                                </p>

                                <div className="flex flex-col gap-6 pt-8">
                                    <a
                                        href={book.amazonLink}
                                        target="_blank"
                                        className="btn-premium py-6 px-12 group !bg-stone-900 !text-white flex items-center justify-center gap-4 border-none"
                                    >
                                        <div className="flex flex-col items-center">
                                            <span className="text-[9px] uppercase tracking-widest opacity-60">Adquirir en</span>
                                            <span className="font-bold flex items-center gap-1 text-lg">
                                                amazon<span className="text-[#FF9900]">.com</span>
                                            </span>
                                        </div>
                                        <ExternalLink className="w-5 h-5 opacity-40 group-hover:translate-x-1 transition-transform" />
                                    </a>

                                    <a
                                        href="https://wa.me/17867268717"
                                        target="_blank"
                                        className="flex items-center justify-center gap-4 px-12 py-6 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 transition-all font-bold tracking-[0.2em] uppercase text-[10px]"
                                    >
                                        Venezuela (WhatsApp)
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </FadeIn>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. ATMOSPHERE SECTION: READING MOMENTS */}
            <section className="py-40 bg-white border-y border-stone-100">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-[1fr_2fr] gap-20 items-center">
                        <FadeIn className="space-y-8">
                            <span className="text-[var(--color-secondary)] font-bold tracking-[0.5em] uppercase text-[10px] block">Atmósfera</span>
                            <h2 className="text-4xl md:text-6xl font-heading text-[var(--color-primary)] italic leading-[1.1]">
                                El Arte de la <br /> <span className="opacity-30">Contemplación</span>
                            </h2>
                            <p className="text-stone-500 text-xl font-light italic leading-relaxed">
                                Nuestros libros no se leen solo con los ojos; se experimentan con el alma en espacios de silencio y presencia.
                            </p>
                        </FadeIn>

                        <StaggerContainer className="grid md:grid-cols-3 gap-8">
                            {readingMoments.map((mom, midx) => (
                                <StaggerItem key={midx}>
                                    <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden group shadow-2xl">
                                        <Image
                                            src={mom.src}
                                            alt={mom.alt}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-[3000ms]"
                                        />
                                        <div className="absolute inset-0 bg-stone-900/20 group-hover:opacity-0 transition-opacity duration-700" />
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </div>
            </section>

            {/* 4. QUOTE: THE POWER OF WORD */}
            <section className="py-40 bg-stone-950 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale brightness-200 contrast-150">
                    <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain scale-150" />
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <FadeIn>
                        <Star className="w-16 h-16 text-[var(--color-secondary)] mx-auto mb-16 opacity-30" />
                        <h2 className="text-white text-4xl md:text-6xl font-heading mb-16 italic max-w-5xl mx-auto leading-tight !font-light">
                            "A veces, una frase leída en el momento justo es el inicio de una sanación para toda la vida."
                        </h2>
                        <div className="w-24 h-px bg-[var(--color-secondary)]/30 mx-auto" />
                    </FadeIn>
                </div>
            </section>

            {/* 5. NEWSLETTER: TRIBU LITERARIA */}
            <section className="py-40 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <FadeIn className="space-y-12">
                        <div className="inline-block p-1 bg-stone-50 rounded-full">
                            <div className="px-8 py-3 rounded-full border border-stone-200 bg-white">
                                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400">Comunidad Literaria</span>
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-heading text-[var(--color-primary)] italic">
                            ¿Quieres recibir un <br /> <span className="text-stone-300">fragmento mensual?</span>
                        </h2>
                        <p className="text-stone-500 text-2xl font-light italic max-w-2xl mx-auto">
                            Únete a la Bitácora del Alma y recibe dosis mensuales de sabiduría ancestral directo a tu correo.
                        </p>
                        <Link
                            href="/newsletter"
                            className="btn-premium px-16 py-6 text-2xl shadow-2xl inline-flex group"
                        >
                            Suscribirme Ahora
                            <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
