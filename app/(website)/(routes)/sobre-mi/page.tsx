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

                                {/* Intermediate Quote (Gradient Background Design - Right Aligned) */}
                                <FadeIn className="relative w-full py-12 px-10 lg:py-16 lg:px-14 overflow-hidden">
                                    <div className="absolute inset-0 z-0">
                                        <Image 
                                            src="/images/home_redesign/quote-gradient.png" 
                                            alt="" 
                                            fill 
                                            className="object-cover opacity-80"
                                        />
                                    </div>
                                    <p className="relative z-10 text-xl lg:text-3xl font-heading font-bold text-black text-right italic leading-relaxed ml-auto max-w-2xl">
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
                                        <ul className="space-y-6 text-gray-800 text-base lg:text-xl font-medium tracking-wide leading-relaxed">
                                            <li>Sanadora ancestral por linaje y memoria.</li>
                                            <li>Administradora de empresas por estructura y orden.</li>
                                            <li>Psicóloga por vocación de comprender la mente.</li>
                                            <li>Terapeuta en duelo y tanatóloga por respeto.</li>
                                            <li>Facilitadora de descongelamiento de trauma.</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Final Credentials Quote (The Box Layer - Refined to match Gradient Style) */}
                                <FadeIn className="relative w-full p-10 lg:p-14 overflow-hidden">
                                    <div className="absolute inset-0 z-0">
                                        <Image 
                                            src="/images/home_redesign/quote-gradient.png" 
                                            alt="" 
                                            fill 
                                            className="object-cover opacity-90"
                                        />
                                    </div>
                                    <div className="relative z-10 space-y-8">
                                        <p className="text-lg lg:text-xl italic text-black leading-relaxed font-medium text-right">
                                            « No elegí todos estos caminos al azar. Cada uno me enseñó algo distinto sobre el ser humano: cómo piensa, cómo siente, cómo se protege y cómo, cuando es escuchado con verdad, sana. »
                                        </p>
                                        <p className="text-lg lg:text-xl font-bold text-black leading-relaxed text-right">
                                            Hoy integro todo eso en un solo método. Uno que honra la ciencia sin olvidar el espíritu. Uno que acompaña sin imponer. Uno que devuelve soberanía interior.
                                        </p>
                                    </div>
                                </FadeIn>
                            </div>
                        </div>
                    </div>
                </section>

            {/* 4. Turning Point & Methodology (Dark Faded Design) */}
            <section className="relative min-h-screen flex items-center bg-black overflow-hidden py-24">
                {/* Background Image: Aligned Right */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/home_redesign/Sobremi-03.jpg"
                        alt=""
                        fill
                        className="object-cover object-right lg:object-center"
                        priority
                    />
                    {/* Deep Left Gradient Overlay (Creating the dark space for text) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 lg:via-black/60 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                </div>

                <div className="container mx-auto px-8 lg:px-32 relative z-20">
                    <div className="max-w-2xl space-y-16">
                        {/* Part A: El Giro */}
                        <div className="space-y-6">
                            <FadeIn>
                                <h2 className="text-4xl lg:text-6xl font-serif italic text-[var(--color-secondary)] mb-6 font-bold leading-tight">
                                    Cuando todo cambió
                                </h2>
                                <div className="space-y-4 text-gray-300 text-lg lg:text-xl leading-relaxed">
                                    <p>
                                        El giro de 180 grados no solo transformó mi vida. <strong className="text-white font-bold underline decoration-[var(--color-secondary)]/50">Cambió la historia.</strong>
                                    </p>
                                    <p>
                                        Después de comprender e integrar todo lo aprendido, el llamado fue claro: llevarlo a la acción. Elegí acompañar desde la integración, especialmente a personas desconectadas de su cuerpo y de su sensación de presencia.
                                    </p>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Part B: Método */}
                        <div className="space-y-6">
                            <FadeIn delay={0.2}>
                                <h2 className="text-3xl lg:text-6xl font-serif italic text-[var(--color-secondary)] mb-6 font-bold leading-tight">
                                    Inteligencia Corporal Sistémica
                                </h2>
                                <div className="space-y-4 text-gray-300 text-lg lg:text-xl leading-relaxed">
                                    <p>
                                        Así nació este método de integración profunda, con el que he acompañado a muchas personas alrededor del mundo, descongelando memorias atrapadas en el cuerpo y favoreciendo la regeneración del sistema nervioso central.
                                    </p>
                                    <div className="pt-8">
                                        <Link
                                            href="/servicios/coaching-ancestral"
                                            className="inline-flex items-center gap-4 text-white hover:text-[var(--color-secondary)] transition-colors group text-sm uppercase tracking-[0.3em] font-bold"
                                        >
                                            Conocer el método
                                            <MoveRight className="group-hover:translate-x-2 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
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
