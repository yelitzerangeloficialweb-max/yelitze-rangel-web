"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight, Star, Heart, Brain, Anchor, Sparkles } from "lucide-react";
import TypewriterText from "@/components/ui/TypewriterText";

export default function AboutPage() {
    return (
        <main className="bg-black text-white selection:bg-[var(--color-secondary)] selection:text-white">

            {/* 1. Hero Section (Split Layout) */}
            <section className="min-h-screen grid lg:grid-cols-2">
                {/* Text Content */}
                <div className="flex flex-col justify-center px-8 lg:px-20 py-32 lg:py-0 order-2 lg:order-1 relative z-10">
                    <span className="text-[var(--color-secondary)] uppercase tracking-[0.2em] text-sm font-medium mb-6 animate-fade-in block">
                        Sobre Mi
                    </span>
                    <h1 className="text-4xl lg:text-6xl font-heading text-white mb-8 leading-tight">
                        Donde la mente comprende <br />
                        <span className="italic font-light text-[var(--color-secondary)]">el cuerpo y el alma recuerdan.</span>
                    </h1>
                    <div className="space-y-6 max-w-xl">
                        <p className="text-xl text-gray-300 italic border-l-4 border-[var(--color-secondary)] pl-6">
                            "Mi misión es ser el puente, cuando la ciencia ya explicó el dolor y el alma aún pide ser escuchada… ahí comienza mi trabajo."
                        </p>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative h-[60vh] lg:h-auto order-1 lg:order-2">
                    <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-black via-transparent to-transparent z-10" />
                    <Image
                        src="/assets/images/about-hero-portrait.jpg"
                        alt="Yelitze Rangel - Coach Ancestral"
                        fill
                        className="object-cover object-top"
                        priority
                    />
                </div>
            </section>

            {/* 2. Credentials Section (Dark Texture Background) */}
            <section className="bg-stone-900/50 py-24 px-4 relative overflow-hidden border-y border-white/5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-secondary)]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto relative z-10">
                    <div className="max-w-5xl mx-auto text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-heading mb-6 text-white">
                            Soy Yelitze Rangel
                        </h2>
                        <div className="w-24 h-1 bg-[var(--color-secondary)] mx-auto mb-6" />
                        <p className="text-xl lg:text-2xl font-light text-gray-300">
                            TU COACH ANCESTRAL
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
                        <div className="space-y-8">
                            <p className="text-2xl font-serif italic text-[var(--color-secondary)]">
                                ¿Quién soy yo para acompañarte?
                            </p>
                            <ul className="space-y-6">
                                {[
                                    { icon: Sparkles, text: "Sanadora ancestral por linaje and memoria." },
                                    { icon: Anchor, text: "Administradora de empresas por estructura y orden." },
                                    { icon: Brain, text: "Psicóloga por vocación de comprender la mente." },
                                    { icon: Heart, text: "Terapeuta en duelo y tanatóloga por respeto." },
                                    { icon: Star, text: "Facilitadora de descongelamiento de trauma." },
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-lg text-gray-300 group">
                                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-[var(--color-secondary)] transition-colors duration-300">
                                            <item.icon className="w-5 h-5 text-current group-hover:text-white" />
                                        </div>
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                            <p className="text-lg leading-relaxed text-gray-300 italic">
                                No elegí todos estos caminos al azar. Cada uno me enseñó algo distinto sobre el ser humano: cómo piensa, cómo siente, cómo se protege y cómo, cuando es escuchado con verdad, sana. <br /><br />
                                <span className="font-semibold text-[var(--color-secondary)] not-italic">Hoy integro todo eso en un solo método.</span> Uno que honra la ciencia sin olvidar el espíritu. Uno que acompaña sin imponer. Uno que devuelve soberanía interior.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. My Story (Narrative) */}
            <section className="py-24 lg:py-32 px-4 container mx-auto">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                    <div className="lg:col-span-5 relative h-[500px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700">
                        <Image
                            src="/assets/images/about-story-portrait.jpg"
                            alt="Mi Historia - Yelitze Rangel"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                    </div>
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
                        <span className="text-sm font-bold tracking-widest text-[var(--color-secondary)] uppercase">
                            El Camino
                        </span>
                        <h2 className="text-4xl lg:text-6xl font-heading text-white">
                            Mi Historia
                        </h2>
                        <div className="prose prose-lg text-gray-300">
                            <p className="mb-8">
                                Después de la pérdida de dos bebés y de un divorcio, mi vida quedó en pausa. No sabía cómo reiniciar ni desde dónde volver a empezar.
                            </p>
                            <p className="mb-8">
                                Ese quiebre me llevó a la India, donde inicié lo que llamo mi <strong className="text-white">camino de fuego</strong>: un proceso de transformación que marcó un giro profundo en mi vida y me reconectó con mis dones, mis raíces y mis recursos internos.
                            </p>
                            <p className="mb-8">
                                Allí comprendí que la sanación no ocurre cuando mente, cuerpo y alma caminan separados. <strong className="text-white">El equilibrio nace cuando se integran.</strong>
                            </p>
                            <p className="mb-8">
                                Desde ese despertar comencé a dar forma a una nueva vida y a un método que une ciencia, experiencia terapéutica y sabiduría ancestral para acompañar procesos de duelo, trauma y reconexión interior, dándole una mirada circular a tu destino.
                            </p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-xl border-l-2 border-[var(--color-secondary)] mt-4">
                            <p className="text-xl font-light italic text-white m-0">
                                "Hoy acompaño desde la presencia, la integración y el respeto profundo por cada historia."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Turning Point & Methodology */}
            <section className="py-24 relative overflow-hidden">
                {/* Cosmic Background Effect */}
                <div className="absolute inset-0 z-0 opacity-30">
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-black to-black" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                        {/* The Shift */}
                        <div className="space-y-8">
                            <h3 className="text-3xl font-heading text-white">
                                Cuando todo cambió
                            </h3>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                El giro de 180 grados no solo transformó mi vida. <strong>Cambió la historia.</strong> <br />
                                Después de comprender e integrar todo lo aprendido, el llamado fue claro: llevarlo a la acción. Elegí acompañar desde la integración, especialmente a personas desconectadas de su cuerpo y de su sensación de presencia.
                            </p>

                            <div className="mt-12 pt-12 border-t border-white/10">
                                <h3 className="text-3xl font-heading text-white mb-4">
                                    Inteligencia Corporal System
                                </h3>
                                <p className="text-lg text-gray-400 leading-relaxed">
                                    Así nació este método de integración profunda, con el que he acompañado a más de 800 personas alrededor del mundo, descongelando memorias atrapadas en el cuerpo y favoreciendo la regeneración del sistema nervioso central.
                                </p>
                            </div>
                        </div>

                        {/* The Expansion */}
                        <div className="bg-[#1a1a1a] p-10 lg:p-14 rounded-3xl shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 border border-white/5">
                            <div className="absolute inset-0 bg-[url('/assets/images/tablero-terapeutico-new.jpg')] bg-cover bg-center opacity-30 group-hover:opacity-30 transition-opacity duration-700 mix-blend-overlay" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    <span className="inline-block px-4 py-1 rounded-full border border-[var(--color-secondary)]/30 text-[var(--color-secondary)] text-xs font-bold tracking-widest uppercase mb-6">
                                        Evolución
                                    </span>
                                    <h3 className="text-3xl lg:text-4xl font-heading text-white mb-6">
                                        Coaching Ancestral
                                    </h3>
                                    <p className="text-xl text-gray-300 leading-relaxed font-light">
                                        Un sistema terapéutico donde, a través de un tablero, <strong className="text-white">la anatomía del alma —lo invisible— cobra voz</strong> y una nueva dirección comienza a cambiar el rumbo de la vida.
                                    </p>
                                    <p className="mt-6 text-[var(--color-secondary)] font-medium italic">
                                        "Esto no es motivación. Es entrenamiento energético."
                                    </p>
                                </div>

                                <Link
                                    href="/servicios/coaching-ancestral"
                                    className="inline-flex items-center gap-3 mt-10 text-white font-bold tracking-wide hover:gap-5 transition-all group-hover:text-[var(--color-secondary)]"
                                >
                                    Descubre el Método <MoveRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Experience Section (Environmental) */}
            <section className="py-24 bg-[#0a0a0a] px-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-secondary)]/5 rounded-full blur-[120px]" />

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
                            <Image
                                src="/assets/images/about-experience.jpg"
                                alt="Danza Lunar y Solar - Yelitze Rangel"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>

                        <div className="text-center lg:text-left order-1 lg:order-2">
                            <span className="text-[var(--color-secondary)] text-4xl mb-6 block font-serif">
                                ⸻
                            </span>

                            <h3 className="text-3xl lg:text-4xl font-heading text-white mb-8 italic">
                                La experiencia que sostiene
                            </h3>

                            <div className="text-lg lg:text-xl text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    La Danza Lunar, la Danza del Sol en México y muchas otras experiencias fueron dando forma a grandes experiencias que hoy comparto.
                                </p>
                                <p className="italic text-white font-light text-2xl">
                                    No como una verdad única, <br />
                                    sino como un camino posible
                                </p>
                                <p>
                                    para volver al cuerpo, a la energía, al linaje <br /> y a la coherencia interior.
                                </p>
                            </div>

                            <span className="text-[var(--color-secondary)] text-4xl mt-8 block font-serif lg:hidden">
                                ⸻
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Closing Quotes / Footer */}
            <section className="py-32 bg-gradient-to-b from-black to-stone-950 text-center px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="mb-20 min-h-[120px]">
                        <h2 className="text-3xl lg:text-5xl font-serif italic text-white mb-6 leading-tight">
                            <TypewriterText
                                text="Cuando el cuerpo recuerda,"
                                delay={0.5}
                            />
                            <br />
                            <TypewriterText
                                text="la vida encuentra una nueva dirección."
                                delay={2.0}
                            />
                        </h2>
                        <div className="w-16 h-[1px] bg-[var(--color-secondary)] mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-sm uppercase tracking-widest font-medium text-gray-500 mt-12">
                        <div className="p-8 border border-white/5 hover:border-[var(--color-secondary)] hover:text-white transition-all duration-300 rounded-xl bg-white/5 cursor-default">
                            El cuerpo guarda la memoria.
                        </div>
                        <div className="p-8 border border-white/5 hover:border-[var(--color-secondary)] hover:text-white transition-all duration-300 rounded-xl bg-white/5 cursor-default">
                            La energía marca el rumbo.
                        </div>
                        <div className="p-8 border border-white/5 hover:border-[var(--color-secondary)] hover:text-white transition-all duration-300 rounded-xl bg-white/5 cursor-default">
                            La conciencia abre el camino.
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
