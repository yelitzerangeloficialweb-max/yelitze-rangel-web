"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, ScaleIn } from "@/components/ui/motion";

export default function BooksBanner() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background with Overlay */}
            <div className="absolute inset-0 bg-[url('/assets/images/hero-background-new.jpg')] bg-cover bg-center bg-fixed">
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Book Covers (Left) */}
                    <div className="order-1 lg:order-1 flex justify-center lg:justify-start gap-x-2 md:gap-x-8 perspective-1000 items-end">
                        {/* Book 1: Chamana (Stack) */}
                        <ScaleIn delay={0.2} className="relative w-[180px] md:w-[240px] aspect-[4/5] transform hover:scale-105 transition-transform duration-500 z-10">
                            <Image
                                src="/assets/images/books/chamana-stack.png"
                                alt="Libro Conversaciones con mi Chamana"
                                fill
                                sizes="(max-width: 768px) 180px, 240px"
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </ScaleIn>

                        {/* Book 2: Hilos (Mockup) */}
                        <ScaleIn delay={0.4} className="relative w-[160px] md:w-[220px] aspect-[4/6] transform hover:scale-105 transition-transform duration-500 z-20">
                            <Image
                                src="/assets/images/books/hilos-mockup.png"
                                alt="Libro Hilos de Conexión"
                                fill
                                sizes="(max-width: 768px) 160px, 220px"
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </ScaleIn>
                    </div>

                    {/* Text Content (Right) */}
                    <div className="text-white order-2 lg:order-2 text-center lg:text-left">
                        <FadeIn>
                            <h2 className="text-4xl md:text-5xl font-heading mb-6 tracking-wide">
                                Sabiduría para llevar <br />
                                <span className="text-[var(--color-secondary)]">en tu camino</span>
                            </h2>
                            <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                                Descubre mis libros y herramientas escritas, diseñados para acompañarte
                                en tu proceso de sanación y autodescubrimiento.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    href="/libros"
                                    className="btn-premium inline-flex items-center gap-2 group"
                                >
                                    Recibir Sabiduría
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
