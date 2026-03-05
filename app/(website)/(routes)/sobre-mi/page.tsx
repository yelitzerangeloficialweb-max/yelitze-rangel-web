"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight, Star, Heart, Brain, Anchor, Sparkles } from "lucide-react";
import TypewriterText from "@/components/ui/TypewriterText";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default function AboutPage() {
    return (
        <main className="bg-black text-white selection:bg-[var(--color-secondary)] selection:text-white">

            {/* 1. Hero Section (Split Layout) */}
            <section className="min-h-screen bg-[#F5EFE6] text-stone-900 grid lg:grid-cols-2 overflow-hidden">
                {/* Text Content */}
                <div className="flex flex-col justify-center px-8 lg:px-20 py-32 lg:py-0 order-2 lg:order-1 relative z-10">
                    <FadeIn>
                        <span className="text-[var(--color-primary)] uppercase tracking-[0.2em] text-sm font-medium mb-6 block">
                            Sobre Mi
                        </span>
                        <h1 className="text-4xl lg:text-7xl font-heading text-[var(--color-primary)] mb-8 leading-tight font-bold">
                            Donde la mente comprende <br />
                            <span className="italic font-light opacity-80">el cuerpo y el alma recuerdan.</span>
                        </h1>
                        <div className="space-y-6 max-w-xl">
                            <p className="text-xl text-stone-600 italic border-l-4 border-[var(--color-primary)] pl-6">
                                Mi misión es ser el puente, cuando la ciencia ya explicó el dolor y el alma aún pide ser escuchada… ahí comienza mi trabajo.
                            </p>
                        </div>
                    </FadeIn>
                </div>

                {/* Hero Image */}
                <div className="relative h-[60vh] lg:h-auto order-1 lg:order-2">
                    <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-l from-[#F5EFE6]/10 via-transparent to-transparent z-10" />
                    <Image
                        src="/assets/images/about-me-new.png"
                        alt="Yelitze Rangel - Coach Ancestral"
                        fill
                        className="object-cover object-center"
                        priority
                        quality={100}
                    />
                </div>
            </section>

            {/* 2. My Story (Narrative from Image) */}
            <section className="py-24 lg:py-40 px-4 bg-[#F5EFE6]">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">

                        {/* Text Content */}
                        <div className="space-y-12 order-2 lg:order-1">
                            {/* Section 1: El Quiebre */}
                            <div className="space-y-6">
                                <h2 className="text-3xl lg:text-4xl font-heading text-[var(--color-accent)] font-bold italic leading-tight">
                                    El Quiebre: Donde la mente comprende, pero el alma aún duele.
                                </h2>
                                <p className="text-lg lg:text-xl text-stone-600 leading-relaxed font-light">
                                    Hola, soy Yelitze Rangel. Durante años, mi vida parecía un éxito absoluto: una carrera corporativa sólida, viajes y reconocimiento. Pero por dentro, estaba quebrada. Me encontraba repitiendo la historia de mi linaje: un divorcio y una quiebra económica simultánea, sumado al dolor profundo de la pérdida de dos bebés. Me sentía quemada, vacía y con una rabia sorda que la psicología tradicional no lograba explicar.
                                </p>
                            </div>

                            {/* Section 2: La Epifania */}
                            <div className="space-y-6">
                                <h2 className="text-3xl lg:text-4xl font-heading text-[var(--color-accent)] font-bold italic leading-tight">
                                    La Epifanía: El Camino de Fuego.
                                </h2>
                                <p className="text-lg lg:text-xl text-stone-600 leading-relaxed font-light">
                                    Ese quiebre me llevó hasta la India, iniciando un proceso de transformación donde comprendí que la sanación no ocurre cuando mente, cuerpo y alma caminan separados. Descubrí que cuando la ciencia explica el dolor, pero el alma sigue pidiendo ser escuchada, es ahí donde comienza el verdadero trabajo: el descongelamiento del trauma y la reconexión ancestral.
                                </p>
                            </div>

                            {/* Section 3: La Autoridad */}
                            <div className="space-y-6">
                                <h2 className="text-3xl lg:text-4xl font-heading text-[var(--color-accent)] font-bold italic leading-tight">
                                    La Autoridad: El Puente entre la Ciencia y el Espíritu.
                                </h2>
                                <p className="text-lg lg:text-xl text-stone-600 leading-relaxed font-light">
                                    No elegí mis caminos al azar; cada uno me enseñó cómo el ser humano se protege y cómo sana. Hoy, pongo a tu servicio una integración única de estructura y sabiduría:
                                </p>
                                <ul className="space-y-4 text-lg text-stone-600 font-light">
                                    <li className="flex items-start gap-3">
                                        <span className="text-[var(--color-accent)] mt-1.5">•</span>
                                        <span><strong>Administradora de Empresas:</strong> Para darte orden y estructura.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[var(--color-accent)] mt-1.5">•</span>
                                        <span><strong>Psicóloga y Tanatóloga:</strong> Para comprender tu mente y honrar tus duelos.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[var(--color-accent)] mt-1.5">•</span>
                                        <span><strong>Sanadora Ancestral y Facilitadora de Trauma:</strong> Para liberar las memorias atrapadas en tu cuerpo y regenerar tu sistema.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Image Column */}
                        <div className="order-1 lg:order-2">
                            <div className="relative aspect-[4/5] w-full max-w-[550px] mx-auto overflow-hidden rounded-t-[50%] border-x-8 border-t-8 border-stone-200/50 shadow-2xl">
                                <Image
                                    src="/assets/images/about-me-new.png"
                                    alt="Yelitze Rangel - Camino de Fuego"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#B8835A]/20 to-transparent" />
                            </div>
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
                            <FadeIn>
                                <h3 className="text-3xl lg:text-4xl font-heading text-white font-bold">
                                    Cuando todo cambió
                                </h3>
                                <p className="text-lg text-gray-400 leading-relaxed">
                                    El giro de 180 grados no solo transformó mi vida. <strong>Cambió la historia.</strong> <br />
                                    Después de comprender e integrar todo lo aprendido, el llamado fue claro: llevarlo a la acción. Elegí acompañar desde la integración, especialmente a personas desconectadas de su cuerpo y de su sensación de presencia.
                                </p>
                            </FadeIn>

                            <FadeIn delay={0.2} className="mt-12 pt-12 border-t border-white/10">
                                <h3 className="text-3xl lg:text-4xl font-heading text-white mb-4 font-bold">
                                    Inteligencia Corporal System
                                </h3>
                                <p className="text-lg text-gray-400 leading-relaxed">
                                    Así nació este método de integración profunda, con el que he acompañado a más de 800 personas alrededor del mundo, descongelando memorias atrapadas en el cuerpo y favoreciendo la regeneración del sistema nervioso central.
                                </p>
                            </FadeIn>
                        </div>

                        {/* The Expansion */}
                        <FadeIn delay={0.4} className="bg-[#1a1a1a] p-10 lg:p-14 rounded-3xl shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 border border-white/5">
                            <div className="absolute inset-0 bg-[url('/assets/images/coaching-ancestral-new.jpg')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    <span className="inline-block px-4 py-1 rounded-full border border-[var(--color-secondary)]/30 text-[var(--color-secondary)] text-xs font-bold tracking-widest uppercase mb-6">
                                        Evolución
                                    </span>
                                    <h3 className="text-3xl lg:text-4xl font-heading text-white mb-6 font-bold">
                                        Coaching Ancestral
                                    </h3>
                                    <p className="text-xl text-gray-300 leading-relaxed font-light">
                                        Un sistema terapéutico donde, a través de un tablero, <strong className="text-white">la anatomía del alma —lo invisible— cobra voz</strong> y una nueva dirección comienza a cambiar el rumbo de la vida.
                                    </p>
                                    <p className="mt-6 text-[var(--color-secondary)] font-medium italic">
                                        Esto no es motivación. Es entrenamiento energético.
                                    </p>
                                </div>

                                <Link
                                    href="/servicios/coaching-ancestral"
                                    className="inline-flex items-center gap-3 mt-10 text-white font-bold tracking-wide hover:gap-5 transition-all group-hover:text-[var(--color-secondary)]"
                                >
                                    Descubre el Método <MoveRight />
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 5. Experience Section (Environmental) */}
            <section className="py-24 bg-[#0a0a0a] px-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-secondary)]/5 rounded-full blur-[120px]" />

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <FadeIn className="relative h-[650px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
                            <Image
                                src="/assets/images/about-experience-new.jpg"
                                alt="Danza Lunar y Solar - Yelitze Rangel"
                                fill
                                className="object-cover object-top"
                                quality={100}
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </FadeIn>

                        <div className="text-center lg:text-left order-1 lg:order-2">
                            <FadeIn>
                                <span className="text-[var(--color-secondary)] text-4xl mb-6 block font-serif">
                                    ⸻
                                </span>

                                <h3 className="text-3xl lg:text-5xl font-heading text-white mb-8 italic font-bold">
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
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Closing Quotes / Footer */}
            <section className="py-32 bg-gradient-to-b from-black to-stone-950 text-center px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="mb-20 min-h-[160px] flex flex-col justify-center items-center">
                        <h2 className="text-3xl lg:text-5xl font-serif italic text-white mb-10 leading-tight">
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

                    <StaggerContainer className="grid md:grid-cols-3 gap-8 text-sm uppercase tracking-widest font-medium text-gray-500 mt-12">
                        <StaggerItem className="p-8 border border-white/5 hover:border-[var(--color-secondary)] hover:text-white transition-all duration-300 rounded-xl bg-white/5 cursor-default">
                            El cuerpo guarda la memoria.
                        </StaggerItem>
                        <StaggerItem className="p-8 border border-white/5 hover:border-[var(--color-secondary)] hover:text-white transition-all duration-300 rounded-xl bg-white/5 cursor-default">
                            La energía marca el rumbo.
                        </StaggerItem>
                        <StaggerItem className="p-8 border border-white/5 hover:border-[var(--color-secondary)] hover:text-white transition-all duration-300 rounded-xl bg-white/5 cursor-default">
                            La conciencia abre el camino.
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

        </main>
    );
}
