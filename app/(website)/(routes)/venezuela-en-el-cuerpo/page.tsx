"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight, Sparkles, Star, Heart, Waves,
    CheckCircle2, ShieldCheck, Mail, MessageCircle
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/motion";

export default function VenezuelaEnElCuerpoPage() {
    return (
        <main className="bg-[#fafcfe] min-h-screen selection:bg-[var(--color-secondary)] selection:text-white">

            {/* 1. HERO (ATENCIÓN) */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/images/venezuela/cuerpo-horizonte.png"
                        alt="El cuerpo en el horizonte"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-transparent to-stone-900" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <FadeIn>
                        <span className="text-[var(--color-secondary)] font-bold tracking-[0.4em] uppercase text-xs mb-8 block">Iniciativa de Sanación Colectiva</span>
                        <h1 className="text-white text-5xl md:text-7xl lg:text-9xl font-heading mb-10 leading-tight">
                            Venezuela <br /> <span className="italic opacity-80">en el Cuerpo</span>
                        </h1>
                        <p className="text-stone-200 text-xl md:text-2xl font-light italic leading-relaxed max-w-3xl mx-auto mb-12">
                            “En Venezuela muchos aprendimos a resistir… <br className="hidden md:block" /> ahora toca aprender a habitar el cuerpo con confianza.”
                        </p>
                        <div className="flex flex-col md:flex-row gap-6 justify-center">
                            <Link href="#proposito" className="btn-premium px-12 py-5 shadow-2xl group">
                                Iniciar el Camino de Escucha
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 2. EL PROPÓSITO (INTERÉS) */}
            <section id="proposito" className="py-32 px-4 relative overflow-hidden border-b border-stone-100">
                <div className="absolute -left-40 -top-40 w-[800px] h-[800px] opacity-[0.03] pointer-events-none">
                    <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                </div>

                <div className="container mx-auto max-w-5xl">
                    <FadeIn className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-heading text-[var(--color-primary)] mb-12 italic leading-tight">
                            Sanar no es <span className="opacity-40">hacerse el fuerte.</span>
                        </h2>
                        <div className="w-24 h-px bg-[var(--color-secondary)]/30 mx-auto mb-12" />
                        <p className="text-2xl md:text-3xl text-stone-500 font-light leading-relaxed italic">
                            “Sanar es permitir que el cuerpo entienda que ahora está a salvo.”
                        </p>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <div className="space-y-8">
                                <p className="text-lg text-stone-600 leading-relaxed font-light">
                                    Esta charla propone un camino posible: dejar de luchar contra el cuerpo, comenzar a escucharlo, devolverle seguridad y reconstruir la confianza desde la experiencia corporal.
                                </p>
                                <p className="text-lg text-stone-600 leading-relaxed font-light">
                                    Un país no se reconstruye solo con ideas. Se reconstruye cuando los cuerpos pueden descansar, sentir y confiar. Si no sanamos lo individual, lo colectivo se sigue congelando.
                                </p>
                            </div>
                        </FadeIn>
                        <ScaleIn>
                            <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl border border-stone-100">
                                <Image
                                    src="/assets/images/venezuela/sanacion-abstracta.png"
                                    alt="Sanación Colectiva"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </ScaleIn>
                    </div>
                </div>
            </section>

            {/* 3. YELITZE RANGEL (AUTORIDAD) */}
            <section className="py-32 bg-stone-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/assets/images/noise.png')] opacity-[0.03] pointer-events-none" />
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative order-2 lg:order-1">
                            <FadeIn>
                                <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-[100px_0_100px_0] overflow-hidden shadow-2xl border border-stone-800">
                                    <Image
                                        src="/assets/images/yelitze/manifesto-new.jpg"
                                        alt="Yelitzé Rangel"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                            </FadeIn>
                        </div>

                        <div className="text-center lg:text-left order-1 lg:order-2">
                            <FadeIn>
                                <span className="text-[var(--color-secondary)] font-bold tracking-[0.4em] uppercase text-xs mb-8 block">Guía y Terapeuta</span>
                                <h2 className="text-3xl md:text-5xl font-heading text-stone-100 mb-10 italic">Yelitzé Rangel</h2>
                                <div className="w-24 h-px bg-[var(--color-secondary)]/30 mx-auto lg:mx-0 mb-10" />
                                <p className="text-lg text-stone-400 font-light leading-relaxed mb-8">
                                    Como psicóloga y terapeuta especializada en trauma corporal, he acompañado a cientos de personas a recuperar su centro en medio del caos.
                                </p>
                                <p className="text-lg text-stone-400 font-light leading-relaxed mb-8">
                                    Venezuela en el Cuerpo nace de la necesidad de devolverle al venezolano la capacidad de habitarse con dignidad, paz y una visión clara hacia el futuro.
                                </p>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. EL SISTEMA NERVIOSO (INTERÉS) */}
            <section className="py-32 bg-white container mx-auto px-4 max-w-5xl">
                <StaggerContainer className="grid md:grid-cols-3 gap-12">
                    {[
                        {
                            icon: Waves,
                            title: "Cuerpos en Alerta",
                            text: "Muchos cuerpos aprendieron a tensarse, a aguantar y a congelarse para poder seguir adelante."
                        },
                        {
                            icon: ShieldCheck,
                            title: "Seguridad Interna",
                            text: "El trauma no se queda solo en la memoria. Se queda en el cuerpo que tuvo que protegerse."
                        },
                        {
                            icon: Heart,
                            title: "Habitar el Futuro",
                            text: "Un cuerpo regulado toma mejores decisiones. Imagina con más claridad y construye con coherencia."
                        }
                    ].map((item, i) => (
                        <StaggerItem key={i}>
                            <div className="p-10 bg-stone-50 rounded-[3rem] border border-stone-100 hover:shadow-xl transition-all h-full flex flex-col items-center text-center">
                                <item.icon className="w-12 h-12 text-[var(--color-secondary)] mb-8 opacity-40" />
                                <h3 className="text-2xl font-heading text-[var(--color-primary)] mb-6">{item.title}</h3>
                                <p className="text-stone-500 font-light leading-relaxed italic">{item.text}</p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </section>

            {/* 5. ACCIÓN (CTA) */}
            <section className="py-40 bg-[var(--color-primary)] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-20 opacity-5">
                    <Sparkles className="w-64 h-64" />
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <FadeIn>
                        <h2 className="text-4xl md:text-6xl font-heading mb-12 italic">Únete a la Conferencia Gratuita</h2>
                        <p className="text-stone-300 text-xl font-light mb-16 max-w-2xl mx-auto italic leading-relaxed">
                            Recibirás dinámicas seguras de regulación corporal, un eBook exclusivo y una invitación a visualizar la Venezuela que deseas habitar.
                        </p>
                        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                            <Link
                                href="https://wa.me/17867268717"
                                className="btn-premium px-16 py-6 text-xl shadow-2xl bg-white text-stone-900 border-none hover:bg-stone-200"
                            >
                                Solicitar Acceso Gratuito
                                <MessageCircle className="w-6 h-6 ml-2" />
                            </Link>
                            <Link
                                href="/newsletter"
                                className="inline-flex items-center gap-4 text-stone-300 hover:text-white transition-colors text-lg italic border-b border-white/10 pb-2"
                            >
                                Descargar eBook del Proyecto
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* FOOTER PIECE */}
            <section className="py-20 text-center">
                <FadeIn>
                    <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">
                        &copy; 2026 Venezuela en el Cuerpo | Una iniciativa de Yelitzé Rangel
                    </p>
                </FadeIn>
            </section>

        </main>
    );
}
