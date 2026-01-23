"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight, Star, Heart, Brain, Anchor, Sparkles } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="bg-[#FAF9F6]">

            {/* 1. Hero Section (Split Layout) */}
            <section className="min-h-screen grid lg:grid-cols-2">
                {/* Text Content */}
                <div className="flex flex-col justify-center px-8 lg:px-20 py-32 lg:py-0 order-2 lg:order-1 bg-[#EEEDE9]">
                    <span className="text-[var(--color-secondary)] uppercase tracking-[0.2em] text-sm font-medium mb-6 animate-fade-in">
                        Sobre Mi
                    </span>
                    <h1 className="text-5xl lg:text-7xl font-heading text-[var(--color-primary)] mb-8 leading-tight">
                        Donde la Psicología <br />
                        <span className="italic font-light text-[var(--color-secondary)]">Abraza el Linaje.</span>
                    </h1>
                    <div className="space-y-6 max-w-xl">
                        <p className="text-xl text-[var(--color-text-light)] italic border-l-4 border-[var(--color-secondary)] pl-6">
                            "Donde la mente comprende, el cuerpo y el alma recuerdan."
                        </p>
                        <p className="text-lg text-[var(--color-primary)] leading-relaxed">
                            Mi misión es ser el puente. Cuando la ciencia ya explicó el dolor y el alma aún pide ser escuchada… <strong>ahí comienza mi trabajo.</strong>
                        </p>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative h-[60vh] lg:h-auto order-1 lg:order-2">
                    <Image
                        src="/assets/images/about-portrait-new.jpg"
                        alt="Yelitze Rangel - Coach Ancestral"
                        fill
                        className="object-cover object-top"
                        priority
                    />
                </div>
            </section>

            {/* 2. Credentials Section (Dark Background) */}
            <section className="bg-[var(--color-primary)] text-white py-24 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-secondary)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto relative z-10">
                    <div className="max-w-5xl mx-auto text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-heading mb-6">
                            Soy Yelitze Rangel
                        </h2>
                        <div className="w-24 h-1 bg-[var(--color-secondary)] mx-auto mb-6" />
                        <p className="text-xl lg:text-2xl font-light text-white/90">
                            TU COACH ANCESTRAL
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
                        <div className="space-y-8">
                            <p className="text-2xl font-serif italic text-[var(--color-secondary)]">
                                "¿Quién soy yo para acompañarte?"
                            </p>
                            <ul className="space-y-6">
                                {[
                                    { icon: Sparkles, text: "Sanadora ancestral por linaje y memoria." },
                                    { icon: Anchor, text: "Administradora de empresas por estructura y orden." },
                                    { icon: Brain, text: "Psicóloga por vocación de comprender la mente." },
                                    { icon: Heart, text: "Terapeuta en duelo y tanatóloga por respeto." },
                                    { icon: Star, text: "Facilitadora de descongelamiento de trauma." },
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-lg text-white/80 group">
                                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-[var(--color-secondary)] transition-colors">
                                            <item.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative p-8 border border-white/20 rounded-2xl bg-white/5 backdrop-blur-sm">
                            <p className="text-lg leading-relaxed text-white/90 italic">
                                "No elegí todos estos caminos al azar. Cada uno me enseñó algo distinto sobre el ser humano: cómo piensa, cómo siente, cómo se protege y cómo, cuando es escuchado con verdad, sana. <br /><br />
                                <span className="font-semibold text-white not-italic">Hoy integro todo eso en un solo método.</span> Uno que honra la ciencia sin olvidar el espíritu. Uno que acompaña sin imponer. Uno que devuelve soberanía interior."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. My Story (Narrative) */}
            <section className="py-24 lg:py-32 px-4 container mx-auto">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
                    <div className="lg:col-span-5 relative h-[500px] lg:h-[700px] rounded-t-full overflow-hidden border-8 border-white shadow-2xl">
                        <Image
                            src="/assets/images/about-portrait-tan.jpg"
                            alt="Mi Historia"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
                        <span className="text-sm font-bold tracking-widest text-[var(--color-text-light)] uppercase">
                            El Camino
                        </span>
                        <h2 className="text-4xl lg:text-6xl font-heading text-[var(--color-primary)]">
                            Mi Historia
                        </h2>
                        <div className="prose prose-lg text-[var(--color-text-light)]">
                            <p>
                                Después de la pérdida de dos bebés y de un divorcio, mi vida quedó en pausa. No sabía cómo reiniciar ni desde dónde volver a empezar.
                            </p>
                            <p>
                                Ese quiebre me llevó a la India, donde inicié lo que llamo mi <strong>camino de fuego</strong>: un proceso de transformación que marcó un giro profundo en mi vida y me reconectó con mis dones, mis raíces y mis recursos internos.
                            </p>
                            <p>
                                Allí comprendí que la sanación no ocurre cuando mente, cuerpo y alma caminan separados. <strong>El equilibrio nace cuando se integran.</strong>
                            </p>
                            <p>
                                Desde ese despertar comencé a dar forma a una nueva vida y a un método que une ciencia, experiencia terapéutica y sabiduría ancestral para acompañar procesos de duelo, trauma y reconexión interior, dándole una mirada circular a tu destino.
                            </p>
                            <div className="bg-[var(--color-primary)]/5 p-6 rounded-xl border-l-4 border-[var(--color-primary)] mt-8">
                                <p className="text-[var(--color-primary)] font-medium italic m-0">
                                    "Hoy acompaño desde la presencia, la integración y el respeto profundo por cada historia."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Turning Point & Methodology */}
            <section className="py-24 bg-white relative">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-[var(--color-secondary)]/5 -skew-y-3 origin-top-left z-0" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* The Shift */}
                        <div className="space-y-6">
                            <h3 className="text-3xl font-heading text-[var(--color-primary)]">
                                Cuando todo cambió
                            </h3>
                            <p className="text-lg text-[var(--color-text-light)] leading-relaxed">
                                El giro de 180 grados no solo transformó mi vida. <strong>Cambió la historia.</strong> <br />
                                Después de comprender e integrar todo lo aprendido, el llamado fue claro: llevarlo a la acción. Elegí acompañar desde la integración, especialmente a personas desconectadas de su cuerpo y de su sensación de presencia.
                            </p>

                            <div className="mt-12">
                                <h3 className="text-3xl font-heading text-[var(--color-primary)] mb-4">
                                    Inteligencia Corporal System
                                </h3>
                                <p className="text-lg text-[var(--color-text-light)] leading-relaxed">
                                    Así nació este método de integración profunda, con el que he acompañado a más de 800 personas alrededor del mundo, descongelando memorias atrapadas en el cuerpo y favoreciendo la regeneración del sistema nervioso central.
                                </p>
                            </div>
                        </div>

                        {/* The Expansion */}
                        <div className="bg-[var(--color-primary)] text-white p-10 lg:p-14 rounded-3xl shadow-2xl relative overflow-hidden group hover:scale-[1.01] transition-transform duration-500">
                            <div className="absolute inset-0 bg-[url('/assets/images/tablero-terapeutico-new.jpg')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-700 mix-blend-overlay" />

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    <span className="inline-block px-4 py-1 rounded-full border border-white/30 text-xs font-bold tracking-widest uppercase mb-6">
                                        Evolución
                                    </span>
                                    <h3 className="text-3xl lg:text-4xl font-heading mb-6">
                                        Coaching Ancestral
                                    </h3>
                                    <p className="text-xl text-white/90 leading-relaxed font-light">
                                        Un sistema terapéutico donde, a través de un tablero, <strong>la anatomía del alma —lo invisible— cobra voz</strong> y una nueva dirección comienza a cambiar el rumbo de la vida.
                                    </p>
                                    <p className="mt-4 text-[var(--color-secondary)] font-medium italic">
                                        "Esto no es motivación. Es entrenamiento energético."
                                    </p>
                                </div>

                                <Link
                                    href="/servicios/coaching-ancestral"
                                    className="inline-flex items-center gap-3 mt-10 text-white font-bold tracking-wide hover:gap-5 transition-all"
                                >
                                    Descubre el Método <MoveRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Closing Quotes / Footer */}
            <section className="py-24 bg-[#EEEDE9] text-center px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="mb-16">
                        <h2 className="text-2xl font-serif italic text-[var(--color-primary)] mb-4">
                            "Cuando el cuerpo recuerda, la vida encuentra una nueva dirección."
                        </h2>
                        <div className="w-16 h-[1px] bg-[var(--color-primary)] mx-auto opacity-30" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-sm uppercase tracking-widest font-medium text-[var(--color-text-light)]">
                        <div className="p-6 border border-[var(--color-primary)]/10 hover:border-[var(--color-secondary)] transition-colors rounded-xl bg-white/50">
                            El cuerpo guarda la memoria.
                        </div>
                        <div className="p-6 border border-[var(--color-primary)]/10 hover:border-[var(--color-secondary)] transition-colors rounded-xl bg-white/50">
                            La energía marca el rumbo.
                        </div>
                        <div className="p-6 border border-[var(--color-primary)]/10 hover:border-[var(--color-secondary)] transition-colors rounded-xl bg-white/50">
                            La conciencia abre el camino.
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
