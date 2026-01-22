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
                    {/* Text Content */}
                    <div className="text-white order-2 lg:order-1">
                        <FadeIn>
                            <h2 className="text-4xl md:text-5xl font-heading mb-6 tracking-wide">
                                Sabiduría para llevar <br />
                                <span className="text-[var(--color-secondary)]">en tu camino</span>
                            </h2>
                            <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-lg">
                                Descubre mis libros y herramientas escritas, diseñados para acompañarte
                                en tu proceso de sanación y autodescubrimiento.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/libros"
                                    className="btn-premium inline-flex items-center gap-2 group"
                                >
                                    Explorar Librería
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Book Covers */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end gap-x-4 lg:gap-x-8 perspective-1000">
                        {/* Book 1 */}
                        <ScaleIn delay={0.2} className="relative w-[140px] md:w-[180px] aspect-[2/3] transform rotate-y-[-15deg] hover:rotate-y-0 transition-transform duration-500 shadow-2xl">
                            <Image
                                src="/assets/images/books/chamana-cover.jpg"
                                alt="Libro Chamana"
                                fill
                                className="object-cover rounded-md shadow-lg"
                            />
                        </ScaleIn>

                        {/* Book 2 */}
                        <ScaleIn delay={0.4} className="relative w-[140px] md:w-[180px] aspect-[2/3] transform translate-y-8 rotate-y-15 hover:rotate-y-0 transition-transform duration-500 shadow-2xl">
                            <Image
                                src="/assets/images/books/hilos-cover.jpg"
                                alt="Libro Hilos"
                                fill
                                className="object-cover rounded-md shadow-lg"
                            />
                        </ScaleIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
