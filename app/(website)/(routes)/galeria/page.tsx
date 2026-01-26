"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowLeft,
    Sparkles,
    Users,
    BookOpen,
    Camera,
    Star,
    ArrowRight,
    ChevronRight
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from '@/components/ui/motion';

const CATEGORIES = [
    {
        id: 'alquimia',
        name: 'Alquimia de Vida',
        icon: Sparkles,
        description: 'Sesiones personalizadas, tableros de visión y el arte de la transformación individual.',
        images: [
            { src: '/assets/images/gallery/gallery-1.jpg', alt: 'Sesión Alquimia' },
            { src: '/assets/images/gallery/gallery-2.jpg', alt: 'Transformación' },
            { src: '/assets/images/gallery/gallery-12.jpg', alt: 'Visión' },
            { src: '/assets/images/gallery/gallery-13.jpg', alt: 'Claridad Solucionada' }
        ]
    },
    {
        id: 'encuentros',
        name: 'Encuentros Sagrados',
        icon: Users,
        description: 'Círculos de mujeres, talleres grupales y la fuerza de la tribu en movimiento.',
        images: [
            { src: '/assets/images/gallery/gallery-4.jpg', alt: 'Círculo Sagrado' },
            { src: '/assets/images/gallery/gallery-5.jpg', alt: 'Taller Grupal' },
            { src: '/assets/images/gallery/gallery-14.jpg', alt: 'Conexión Grupal' },
            { src: '/assets/images/gallery/gallery-15.jpg', alt: 'Ritual de Cierre' }
        ]
    },
    {
        id: 'sabiduria',
        name: 'Cofre de Sabiduría',
        icon: BookOpen,
        description: 'Momentos con la palabra, lanzamientos de libros y el legado escrito.',
        images: [
            { src: '/assets/images/gallery/gallery-6.jpg', alt: 'Lectura Intuitiva' },
            { src: '/assets/images/gallery/gallery-23.jpg', alt: 'Legado Escrito' },
            { src: '/assets/images/gallery/gallery-22.jpg', alt: 'Sabiduría en Papel' }
        ]
    },
    {
        id: 'bitacora',
        name: 'Bitácora Visual',
        icon: Camera,
        description: 'Viajes, naturaleza y la esencia de Yelitzé en su cotidianeidad sagrada.',
        images: [
            { src: '/assets/images/gallery/gallery-16.jpg', alt: 'Naturaleza' },
            { src: '/assets/images/gallery/gallery-17.jpg', alt: 'Viaje del Alma' },
            { src: '/assets/images/gallery/gallery-18.jpg', alt: 'Esencia' },
            { src: '/assets/images/gallery/gallery-19.jpg', alt: 'Paz' },
            { src: '/assets/images/gallery/gallery-20.jpg', alt: 'Luz' },
            { src: '/assets/images/gallery/gallery-21.jpg', alt: 'Reflejos' }
        ]
    }
];

export default function GalleryPage() {
    const [activeTab, setActiveTab] = useState('all');

    const filteredCategories = activeTab === 'all'
        ? CATEGORIES
        : CATEGORIES.filter(cat => cat.id === activeTab);

    return (
        <main className="bg-[#FAF9F6] min-h-screen selection:bg-[var(--color-secondary)] selection:text-white pb-32">

            {/* 1. HERO SECTION: PREMIUM EDITORIAL */}
            <section className="relative min-h-[70vh] flex items-center pt-40 pb-20 overflow-hidden bg-stone-950">
                {/* Background accents */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/10 rounded-full blur-[120px] -mr-40 -mt-40" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] -ml-20 -mb-20" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
                        <FadeIn>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-3 text-white/40 hover:text-[var(--color-secondary)] transition-all mb-12 group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Regresar al Origen</span>
                            </Link>

                            <span className="text-[var(--color-secondary)] font-bold tracking-[0.5em] uppercase text-xs mb-6 block">Memoria Sagrada</span>
                            <h1 className="text-white text-6xl md:text-9xl font-heading leading-[0.9] italic mb-12">
                                Bitácora <br />
                                <span className="opacity-20 pl-20 md:pl-40">Visual</span>
                            </h1>

                            <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
                                <p className="text-stone-400 text-xl font-light italic leading-relaxed max-w-md">
                                    "Cada imagen es un hilo de conexión, un fragmento de la historia que estamos co-creando desde el alma."
                                </p>
                                <div className="hidden md:block w-px h-24 bg-white/10" />
                                <div className="flex gap-6">
                                    <div className="text-center">
                                        <span className="text-white text-3xl font-heading block">+20</span>
                                        <span className="text-stone-500 text-[9px] uppercase tracking-widest">Momentos</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-white text-3xl font-heading block">04</span>
                                        <span className="text-stone-500 text-[9px] uppercase tracking-widest">Dimensiones</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>

                {/* Vertical Indicator */}
                <div className="absolute right-12 bottom-12 hidden lg:flex flex-col items-center gap-6">
                    <span className="[writing-mode:vertical-rl] text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">Explorar Galería</span>
                    <div className="w-px h-12 bg-gradient-to-t from-[var(--color-secondary)] to-transparent" />
                </div>
            </section>

            {/* 2. CATEGORY NAVIGATION */}
            <nav className="sticky top-0 z-50 bg-[#FAF9F6]/80 backdrop-blur-xl border-y border-stone-200 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex overflow-x-auto no-scrollbar gap-8 md:gap-16 py-6 items-center justify-start md:justify-center">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`whitespace-nowrap text-[10px] font-bold tracking-[0.3em] uppercase transition-all flex items-center gap-2 ${activeTab === 'all' ? 'text-[var(--color-secondary)]' : 'text-stone-400 hover:text-stone-600'}`}
                        >
                            <Star className={`w-3 h-3 ${activeTab === 'all' ? 'fill-current' : 'opacity-30'}`} />
                            Todas las Visiónes
                        </button>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`whitespace-nowrap text-[10px] font-bold tracking-[0.3em] uppercase transition-all flex items-center gap-2 ${activeTab === cat.id ? 'text-[var(--color-secondary)]' : 'text-stone-400 hover:text-stone-600'}`}
                            >
                                <cat.icon className="w-3 h-3" />
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* 3. CATEGORIZED CONTENT */}
            <div className="pt-24 space-y-40">
                {filteredCategories.map((cat, catIdx) => (
                    <section key={cat.id} className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-[1fr_2.5fr] gap-16 items-start">
                            {/* Section Header */}
                            <FadeIn className="sticky top-40 space-y-8">
                                <div className="relative">
                                    <span className="absolute -left-8 -top-8 text-9xl font-heading text-stone-200/50 -z-10 opacity-30">
                                        0{CATEGORIES.indexOf(cat) + 1}
                                    </span>
                                    <cat.icon className="w-12 h-12 text-[var(--color-secondary)] mb-6" />
                                    <h2 className="text-4xl md:text-5xl font-heading text-[var(--color-primary)] italic leading-tight">
                                        {cat.name}
                                    </h2>
                                </div>
                                <p className="text-stone-500 text-lg font-light italic leading-relaxed">
                                    {cat.description}
                                </p>
                                <div className="pt-4 flex items-center gap-4 text-[var(--color-secondary)]">
                                    <div className="w-8 h-px bg-current" />
                                    <span className="text-[10px] font-bold tracking-widest uppercase">{cat.images.length} Archivos</span>
                                </div>
                            </FadeIn>

                            {/* Section Grid */}
                            <StaggerContainer className="columns-1 md:columns-2 gap-8 space-y-8">
                                {cat.images.map((img, imgIdx) => (
                                    <StaggerItem key={imgIdx}>
                                        <div className="relative group break-inside-avoid rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-700 bg-white">
                                            <div className="relative aspect-auto">
                                                <Image
                                                    src={img.src}
                                                    alt={img.alt}
                                                    width={800}
                                                    height={1200}
                                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                                                />
                                            </div>

                                            {/* Minimalist Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8">
                                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                                    <span className="text-white/60 text-[8px] tracking-[0.4em] uppercase font-bold mb-2 block">Fragmento de Alquimia</span>
                                                    <h4 className="text-white text-xl font-heading italic">{img.alt}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </div>
                    </section>
                ))}
            </div>

            {/* 4. FINAL CTA: TRIBU */}
            <section className="mt-40 pt-40 pb-32 bg-white border-t border-stone-100">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <FadeIn>
                        <div className="inline-block p-4 rounded-full bg-stone-50 mb-10">
                            <Users className="w-8 h-8 text-[var(--color-secondary)]" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-heading text-[var(--color-primary)] italic mb-8">
                            ¿Quieres co-crear un <br /> <span className="text-stone-300">próximo momento?</span>
                        </h2>
                        <p className="text-stone-500 text-xl font-light italic mb-16 max-w-2xl mx-auto">
                            Únete a nuestros círculos sagrados o inicia tu proceso individual. La bitácora sigue creciendo con cada alma que despierta.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link
                                href="/contacto"
                                className="btn-premium px-12 py-5 shadow-xl group border-stone-200"
                            >
                                Contactar Ahora
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a
                                href="https://instagram.com/yelitzerangel"
                                target="_blank"
                                className="flex items-center gap-4 px-12 py-5 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 transition-all font-bold tracking-widest uppercase text-xs"
                            >
                                <Camera className="w-4 h-4" />
                                Ver historias
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
