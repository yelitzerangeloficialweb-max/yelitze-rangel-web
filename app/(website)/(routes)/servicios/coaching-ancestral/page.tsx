"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight, Clock, Star, Users, Heart, AlertCircle,
    Calendar, CheckCircle2, ShieldCheck, Sparkles, Anchor, Brain
} from "lucide-react";
import TypewriterText from "@/components/ui/TypewriterText";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default function CoachingAncestralPage() {
    return (
        <main className="bg-black text-white selection:bg-[var(--color-secondary)] selection:text-white">

            {/* 1. Hero Section (Full Background with Overlay) */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/images/coaching-bg-new.jpg"
                        alt="Sesión de Coaching Ancestral"
                        fill
                        className="object-cover opacity-60"
                        priority
                        quality={100}
                    />
                    {/* Radial Overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <FadeIn>
                        <div className="inline-block mb-10">
                            <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-light tracking-[0.2em] uppercase">
                                Coaching Ancestral
                            </span>
                        </div>
                        <h1 className="text-4xl lg:text-7xl font-heading text-white mb-6 leading-tight font-bold">
                            Anatomía del Alma:
                        </h1>
                        <div className="inline-block bg-[#7b5735] px-6 py-2 mb-12 shadow-xl transform skew-x-[-2deg]">
                            <h2 className="text-xl md:text-3xl text-white font-light italic m-0 skew-x-[2deg]">
                                <TypewriterText
                                    text="Donde lo invisible cobra voz y tu alma puede expresarse con verdad."
                                    delay={0.5}
                                />
                            </h2>
                        </div>
                        <div className="max-w-3xl mx-auto">
                            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                                Bienvenido/a a este espacio íntimo de Coaching Ancestral – Anatomía del Alma. Un encuentro 1:1 donde lo invisible cobra voz y tu alma puede expresarse con verdad.<br />
                                <strong>• Modalidad online o presencial • Tablero terapéutico • Seguimiento personalizado</strong><br />
                                Este es un espacio seguro, consciente y transformador. Gracias por confiar en tu proceso.
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/reservas"
                                className="btn-premium text-lg px-10 py-4 shadow-2xl hover:shadow-[var(--color-secondary)]/20 transform hover:-translate-y-1 transition-all"
                            >
                                Reservar Sesión
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <a
                                href="https://wa.me/584146180005"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-10 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all font-medium"
                            >
                                Iniciar por WhatsApp
                                <span className="text-xl">📲</span>
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 2. The Method (The Board & Totems) */}
            <section className="bg-stone-900/50 py-32 px-4 relative overflow-hidden border-y border-white/5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-secondary)]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <FadeIn>
                            <div className="relative group max-w-md mx-auto lg:mx-0 -rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="bg-white p-4 pb-20 shadow-2xl rounded-sm transform transition-all duration-300">
                                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                                        <Image
                                            src="/assets/images/tablero-terapeutico-new.jpg"
                                            alt="Tablero Terapéutico - Anatomía del Alma"
                                            fill
                                            className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>
                                    <div className="absolute bottom-6 left-0 right-0 text-center">
                                        <span className="font-handwriting text-2xl text-gray-600 opacity-80 transform -rotate-2 inline-block">
                                            Anatomía del Alma
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-stone-900/90 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl max-w-xs hidden md:block z-20">
                                    <p className="text-sm italic text-gray-300 m-0">
                                        "No es ajedrez, no es Jumanji, ni una ouija. Es el protagonista de mi coaching ancestral: la anatomía del alma."
                                    </p>
                                </div>
                            </div>
                        </FadeIn>

                        <div className="space-y-8">
                            <FadeIn>
                                <span className="text-[var(--color-secondary)] font-bold tracking-widest uppercase text-xs mb-2 block">
                                    El Método
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-heading text-white font-bold">
                                    El Tablero Terapéutico
                                </h2>
                                <p className="text-lg text-gray-400 leading-relaxed">
                                    Se trata de una consulta terapéutica donde observamos aspectos de tu vida que te inquietan. Descubriremos <strong>cómo ubicar las piezas a tu gusto</strong> en este círculo de coaching ancestral.
                                </p>
                            </FadeIn>

                            <StaggerContainer className="space-y-6">
                                {[
                                    {
                                        icon: AlertCircle,
                                        title: "Creencias Limitantes",
                                        text: "Aquello que aún no tiene rostro en tu vida y urge sanar."
                                    },
                                    {
                                        icon: Clock,
                                        title: "Fechas de Vencimiento",
                                        text: "Lo que ya cumplió su ciclo y no sabes cómo soltar."
                                    },
                                    {
                                        icon: Users,
                                        title: "Los Tótems",
                                        text: "Elementos principales que te permiten observar con diferentes posiciones una información para expandir tu ser."
                                    },
                                ].map((item, idx) => (
                                    <StaggerItem key={idx} className="flex gap-4 group">
                                        <div className="p-3 rounded-full bg-white/5 group-hover:bg-[var(--color-secondary)] transition-colors duration-300 flex-shrink-0 h-fit">
                                            <item.icon className="w-5 h-5 text-current group-hover:text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1">{item.title}</h4>
                                            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{item.text}</p>
                                        </div>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>

                            <FadeIn delay={0.4} className="bg-white/5 p-6 rounded-xl border-l-2 border-[var(--color-secondary)]/50">
                                <p className="text-sm italic text-[var(--color-secondary)] m-0">
                                    "No es una bola de cristal. No predico el futuro. Es un sistema que me ha llevado casi 10 años desarrollar para darle una mirada circular a tu destino."
                                </p>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. The Path (Comparison) */}
            <section className="py-32 px-4 bg-black">
                <div className="container mx-auto max-w-6xl">
                    <FadeIn className="text-center mb-20">
                        <h2 className="text-4xl lg:text-5xl font-heading mb-6 text-white font-bold">
                            ¿Para quién es este camino?
                        </h2>
                        <div className="w-24 h-1 bg-[var(--color-secondary)] mx-auto" />
                    </FadeIn>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Pain Points */}
                        <FadeIn className="bg-zinc-900/30 p-10 rounded-3xl border border-red-500/10 hover:border-red-500/30 transition-colors">
                            <h3 className="text-2xl font-bold text-red-400 mb-8 flex items-center gap-3">
                                <AlertCircle className="w-6 h-6" /> ¿Te sientes así?
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Ansiedad constante por lo cambiante de la vida.",
                                    "Miedo a perder lo que tienes o repetir patrones familiares.",
                                    "Sensación de 'ceguera' ante tus propios bloqueos.",
                                    "Dolores de cabeza, fatiga mental o apatía.",
                                    "Vivir en 'modo supervivencia' sin disfrutar tus logros."
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 text-gray-400 items-start">
                                        <span className="text-red-500/50 mt-1">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </FadeIn>

                        {/* Benefits */}
                        <FadeIn delay={0.2} className="bg-zinc-900/30 p-10 rounded-3xl border border-green-500/10 hover:border-green-500/30 transition-colors">
                            <h3 className="text-2xl font-bold text-green-400 mb-8 flex items-center gap-3">
                                <Sparkles className="w-6 h-6" /> Lo que lograrás
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Mejora tu percepción del éxito y reduce la ansiedad.",
                                    "Recupera tu sueño y paz mental.",
                                    "Salida del 'niño herido' para habitar tu 'adulto exitoso'.",
                                    "Claridad inmediata: 70% de la batalla ganada con la toma de conciencia.",
                                    "Mejora en relaciones de pareja, familia y laborales."
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 text-gray-400 items-start">
                                        <CheckCircle2 className="w-5 h-5 text-green-500/50 flex-shrink-0 mt-1" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 4. Modalities Experience */}
            <section className="py-32 px-4 bg-stone-950">
                <div className="container mx-auto">
                    <FadeIn className="text-center mb-16">
                        <span className="text-[var(--color-secondary)] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                            Tu Elección
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-heading text-white font-bold">
                            Modalidades de la Sesión
                        </h2>
                    </FadeIn>

                    <StaggerContainer className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                        {/* Meta: Online */}
                        <StaggerItem className="group">
                            <div className="bg-zinc-900/50 p-10 lg:p-14 rounded-3xl border border-white/5 hover:border-[var(--color-secondary)]/30 transition-all duration-500 h-full flex flex-col">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-[var(--color-secondary)]/10 transition-colors">
                                    <Users className="w-8 h-8 text-[var(--color-secondary)]" />
                                </div>
                                <h3 className="text-3xl font-heading text-white mb-2">Ceremonia Online</h3>
                                <p className="text-[var(--color-secondary)] uppercase tracking-widest text-xs mb-6 font-bold">Coaching Ancestral</p>
                                <p className="text-gray-400 mb-8 italic">
                                    "Lo que se mueve aquí es profundo, sutil y verdadero. Una explosión silenciosa que ordena tu presente."
                                </p>
                                <ul className="space-y-5 flex-grow font-light">
                                    {[
                                        { icon: Clock, text: "Espacio íntimo de 3 horas de presencia terapéutica." },
                                        { icon: Anchor, text: "Fusión de sabiduría ancestral y recursos modernos." },
                                        { icon: Sparkles, text: "Incluye recursos antes y después para acompañar tu proceso." },
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-gray-300">
                                            <item.icon className="w-5 h-5 text-[var(--color-secondary)]" />
                                            <span>{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </StaggerItem>

                        {/* Meta: Presencial */}
                        <StaggerItem className="group">
                            <div className="bg-[#1a1a1a] p-10 lg:p-14 rounded-3xl border-2 border-[var(--color-secondary)]/20 shadow-2xl relative overflow-hidden h-full flex flex-col">
                                <div className="absolute top-0 right-0 bg-[var(--color-secondary)] text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-widest z-10">
                                    Experiencia VIP
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-[var(--color-secondary)]/10 flex items-center justify-center mb-8">
                                    <Heart className="w-8 h-8 text-[var(--color-secondary)]" />
                                </div>
                                <h3 className="text-3xl font-heading text-white mb-4">Presencial (Íntimo)</h3>
                                <p className="text-sm italic text-gray-500 mb-8">"Más que una sesión, una celebración de tu sanación."</p>
                                <ul className="space-y-5 flex-grow">
                                    {[
                                        { text: "Bienvenida de Celebración: brindamos por tu decisión." },
                                        { text: "Almuerzo incluido: compartimos alimentos tras la sesión." },
                                        { text: "Masaje de Liberación: armonización corporal para cerrar." },
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-gray-300">
                                            <CheckCircle2 className="w-5 h-5 text-[var(--color-secondary)]" />
                                            <span>{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

            {/* 5. Closing & Guarantee */}
            <section className="py-32 bg-gradient-to-t from-black to-stone-900 border-t border-white/5">
                <div className="container mx-auto max-w-4xl text-center px-4">
                    <FadeIn>
                        <div className="mb-12 inline-block p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <ShieldCheck className="w-16 h-16 text-[var(--color-secondary)] mx-auto mb-6 opacity-80" />
                            <h3 className="text-3xl font-heading text-white font-bold mb-4">Garantía de Claridad</h3>
                            <p className="text-lg text-gray-400 leading-relaxed max-w-xl mx-auto italic">
                                Mi promesa es firme: <strong>Si no identificamos la problemática</strong> durante la sesión para que puedas tomar acciones, <strong>te devuelvo tu dinero</strong>.
                            </p>
                        </div>

                        <h2 className="text-3xl lg:text-5xl font-heading text-white mb-10 font-bold">
                            ¿Lista para darle voz a lo invisible?
                        </h2>

                        <div className="flex flex-col items-center gap-6">
                            <Link href="/reservas" className="btn-premium text-xl px-12 py-5 shadow-2xl">
                                Agendar Sesión Ahora
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <a
                                href="https://wa.me/584146180005"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-white hover:text-[var(--color-secondary)] transition-colors text-lg italic"
                            >
                                📲 Inicia tu viaje por WhatsApp y te damos más detalles.
                            </a>
                            <p className="text-gray-500 text-sm italic mt-4">
                                Inversión en tu paz y futuro.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

        </main>
    );
}
