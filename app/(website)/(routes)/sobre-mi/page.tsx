"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight, Star, Heart, Brain, Anchor, Sparkles } from "lucide-react";
import TypewriterText from "@/components/ui/TypewriterText";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default function AboutPage() {
    return (
        <main className="bg-black text-white selection:bg-[var(--color-secondary)] selection:text-white">

            {/* 1. Hero Section (White Background Redesign) */}
            <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-white">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/home_redesign/Sobre-Mi_01.png"
                        alt=""
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                </div>
                
                <div className="container mx-auto px-4 lg:px-20 relative z-10 grid lg:grid-cols-2 items-center gap-12 lg:gap-24">
                    {/* Left: Text Content */}
                    <div className="order-2 lg:order-1">
                        <FadeIn>
                            <span className="text-[var(--color-secondary)] uppercase tracking-[0.2em] text-sm font-medium mb-6 block">
                                Sobre Mi
                            </span>
                            <h1 className="text-4xl lg:text-7xl font-heading text-primary mb-8 leading-tight font-bold">
                                Donde la mente comprende <br />
                                <span className="italic font-light text-[var(--color-secondary)] opacity-90">el cuerpo y el alma recuerdan.</span>
                            </h1>
                            <div className="space-y-6 max-w-xl">
                                <p className="text-xl text-gray-700 italic border-l-4 border-[var(--color-secondary)] pl-6">
                                    Mi misión es ser el puente, cuando la ciencia ya explicó el dolor y el alma aún pide ser escuchada… ahí comienza mi trabajo.
                                </p>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right: Yelitze Portrait */}
                    <div className="relative h-[50vh] lg:h-[80vh] order-1 lg:order-2">
                        <FadeIn className="h-full w-full">
                            <Image
                                src="/images/home_redesign/Sobremi1.png"
                                alt="Yelitze Rangel - Re escribe tu historia"
                                fill
                                className="object-contain object-right"
                                priority
                            />
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 2 & 3. Combined Story & Credentials Section (Full Bleed Redesign) */}
            <section className="bg-white text-primary overflow-hidden">
                <div className="grid lg:grid-cols-2 items-stretch min-h-screen lg:min-h-[1400px]">
                    
                    {/* Left Side: Main Image (Full Bleed) */}
                    <FadeIn className="relative h-[600px] lg:h-full overflow-hidden rounded-tr-[10rem]">
                        <Image
                            src="/images/home_redesign/Sobremi-02.png"
                            alt="Yelitze Rangel - Herencia y Memoria"
                            fill
                            className="object-cover"
                            priority
                            quality={100}
                        />
                    </FadeIn>

                    {/* Right Side: Content Composition */}
                    <div className="flex flex-col justify-center relative py-20 px-8 lg:pr-32 lg:pl-20">
                        {/* Background Watermark Flor (Layered behind text) */}
                        <div className="absolute top-[35%] right-0 w-[110%] opacity-20 pointer-events-none z-0">
                            <Image 
                                src="/assets/images/watermark-logo.png" 
                                alt="" 
                                width={1200} 
                                height={1200} 
                                className="w-full h-auto"
                            />
                        </div>

                            <div className="relative z-10 space-y-12">
                                {/* Part A: Mi Historia */}
                                <div className="space-y-6 text-right">
                                    <FadeIn>
                                        <span className="text-[var(--color-secondary)] uppercase tracking-[0.2em] text-xs font-bold block mb-2">
                                            Sobre Mi
                                        </span>
                                        <h2 className="text-5xl lg:text-7xl font-heading font-bold text-primary leading-tight">
                                            Mi Historia
                                        </h2>
                                    </FadeIn>
                                    
                                    <div className="text-gray-600 leading-relaxed text-base lg:text-lg max-w-2xl ml-auto space-y-4">
                                        <p>
                                            Después de la pérdida de dos bebés y de un divorcio, mi vida quedó en pausa. No sabía cómo reiniciar ni desde dónde volver a empezar.
                                        </p>
                                        <p>
                                            Ese quiebre me llevó a la India, donde inicié lo que llamo mi <strong className="text-primary font-bold">camino de fuego</strong>: un proceso de transformación que marcó un giro profundo en mi vida y me reconectó con mis dones, mis raíces y mis recursos internos.
                                        </p>
                                        <p>
                                            Allí comprendí que la sanación no ocurre cuando mente, cuerpo y alma caminan separados. El equilibrio nace cuando se integran. Desde ese despertar comencé a dar forma a una nueva vida y a un método que une ciencia, experiencia terapéutica y sabiduría ancestral para acompañar procesos.
                                        </p>
                                    </div>
                                </div>

                                {/* Intermediate Quote (Horizontal Line + Text) */}
                                <FadeIn className="relative py-4 pr-0">
                                    <div className="w-48 h-[1px] bg-[var(--color-secondary)]/40 ml-auto mb-6" />
                                    <p className="text-lg lg:text-xl italic font-medium text-[var(--color-secondary)] text-right max-w-lg ml-auto leading-relaxed">
                                        « Hoy acompaño desde la presencia, la integración y el respeto profundo por cada historia. »
                                    </p>
                                </FadeIn>

                                {/* Part B: Soy Yelitze */}
                                <div className="space-y-8 text-right">
                                    <FadeIn>
                                        <h2 className="text-5xl lg:text-8xl font-heading font-bold text-primary leading-none">
                                            Soy Yelitze
                                        </h2>
                                        <p className="tracking-[0.4em] text-sm font-bold text-gray-400 mt-4">
                                            TU COACH ANCESTRAL
                                        </p>
                                    </FadeIn>

                                    <div className="space-y-4">
                                        <h3 className="text-2xl lg:text-3xl font-serif italic text-[var(--color-secondary)] mb-6">
                                            ¿Quién soy yo para acompañarte?
                                        </h3>
                                        <ul className="space-y-4 text-gray-800 text-base lg:text-xl font-medium tracking-wide">
                                            <li>Sanadora ancestral por linaje y memoria.</li>
                                            <li>Administradora de empresas por estructura y orden.</li>
                                            <li>Psicóloga por vocación de comprender la mente.</li>
                                            <li>Terapeuta en duelo y tanatóloga por respeto.</li>
                                            <li>Facilitadora de descongelamiento de trauma.</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Final Credentials Quote (The Box Layer) */}
                                <FadeIn className="bg-[#fcf8f5] p-10 rounded-2xl border-r-8 border-[var(--color-secondary)] text-right shadow-sm">
                                    <p className="text-base lg:text-lg italic text-gray-700 leading-relaxed mb-8">
                                        « No elegí todos estos caminos al azar. Cada uno me enseñó algo distinto sobre el ser humano: cómo piensa, cómo siente, cómo se protege y cómo, cuando es escuchado con verdad, sana. »
                                    </p>
                                    <p className="text-base lg:text-lg font-bold text-primary leading-relaxed">
                                        Hoy integro todo eso en un solo método. Uno que honra la ciencia sin olvidar el espíritu. Uno que acompaña sin imponer. Uno que devuelve soberanía interior.
                                    </p>
                                </FadeIn>
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
