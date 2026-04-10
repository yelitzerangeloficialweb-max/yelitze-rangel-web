"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight, Star, Heart, Brain, Anchor, Sparkles } from "lucide-react";
import TypewriterText from "@/components/ui/TypewriterText";
import { motion } from "framer-motion";
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
                        className="object-cover opacity-60 brightness-[0.80]"
                        priority
                    />
                </div>
                
                <div className="container mx-auto px-4 lg:px-20 relative z-10 grid lg:grid-cols-2 items-center gap-12 lg:gap-24">
                    {/* Left: Text Content */}
                    <div className="order-2 lg:order-1">
                        <FadeIn>
                            <span className="text-black uppercase tracking-[0.2em] text-sm font-medium mb-6 block">
                                Sobre Mi
                            </span>
                            <h1 className="text-4xl lg:text-6xl font-heading text-black mb-8 leading-[1.1] font-medium">
                                DONDE LA MENTE COMPRENDE <br />
                                <span className="font-script text-4xl lg:text-6xl text-black tracking-[0.03em]">el cuerpo y el alma recuerdan.</span>
                            </h1>
                            <div className="space-y-6 max-w-2xl">
                                <p className="text-xl lg:text-2xl text-gray-800 italic border-l-4 border-[var(--color-secondary)] pl-6 leading-relaxed">
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
                        <div className="absolute top-[35%] left-[-10%] w-[75%] opacity-20 pointer-events-none z-0">
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
                                        <span className="text-black uppercase tracking-[0.2em] text-xs font-bold block mb-2">
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
                                        <h3 className="text-2xl lg:text-3xl font-heading italic text-[var(--color-secondary)] mb-6">
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

            {/* 5. Experience Section (Environmental - Redesigned) */}
            <section className="py-24 lg:py-40 bg-white relative overflow-hidden isolate">
                {/* Intense Portal Blur Flare - top-left Corner */}
                <motion.div 
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.85, 0.95, 0.85],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-[10%] -left-[17.5%] w-[35%] h-[35%] bg-[radial-gradient(circle_at_center,#FF6B00_0%,#FF6B00_60%,transparent_100%)] blur-[80px] pointer-events-none z-[1]"
                />
                
                <div className="container mx-auto px-8 lg:px-32 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Text Content: Left Column */}
                        <div className="space-y-10 order-2 lg:order-1">
                            <FadeIn>
                                <h2 className="text-4xl lg:text-7xl font-script text-[var(--color-secondary)] mb-8 whitespace-nowrap tracking-[0.03em]">
                                    La experiencia que sostiene
                                </h2>
                                
                                <div className="space-y-8 text-lg lg:text-xl text-gray-700 leading-relaxed max-w-xl">
                                    <p>
                                        La Danza Lunar, la Danza del Sol en México y muchas otras experiencias fueron dando forma a grandes experiencias que hoy comparto.
                                    </p>
                                    <p className="font-medium text-gray-900">
                                        No como una verdad única, <br className="hidden lg:block" /> sino como un camino posible
                                    </p>
                                    <p className="font-bold text-gray-900 border-l-4 border-[var(--color-secondary)] pl-6">
                                        para volver al cuerpo, a la energía, al linaje y a la coherencia interior.
                                    </p>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Image Frame: Right Column */}
                        <FadeIn delay={0.2} className="relative order-1 lg:order-2">
                            <div className="relative h-[500px] lg:h-[650px] w-full rounded-tl-2xl rounded-tr-[12rem] rounded-bl-[12rem] rounded-br-2xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
                                <Image
                                    src="/images/home_redesign/experience-main.jpg"
                                    alt="Experiencias Ancestrales"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 6. Closing Principles (Breathtaking Forest Finale with Allison Font) */}
            <section className="relative min-h-[700px] lg:min-h-[1000px] w-full overflow-hidden flex items-center justify-end">
                {/* Background Image: Forest */}
                <div className="absolute inset-0 z-0 text-white">
                    <Image
                        src="/images/home_redesign/Web-Yelitze13 copia.png"
                        alt="Bosque Sagrado"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Top Fade to blend with previous section */}
                    <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />
                    
                    {/* Dark overlay for text readability if needed (the mockup doesn't have it, but I'll add a subtle one on the right) */}
                    <div className="absolute inset-0 bg-black/10 z-0" />
                </div>

                {/* Branded Watermark Logo */}
                <div className="absolute top-12 left-12 lg:top-32 lg:left-32 z-20 opacity-30 mix-blend-multiply pointer-events-none">
                    <Image
                        src="/images/home_redesign/ElementoIcono.png"
                        alt=""
                        width={250}
                        height={250}
                        className="grayscale-0 lg:w-[350px]"
                    />
                </div>

                <div className="container mx-auto px-8 lg:px-32 relative z-30">
                    <div className="max-w-3xl ml-auto text-center space-y-16 lg:space-y-24 lg:translate-x-24 lg:translate-y-40">
                        <FadeIn>
                            <h2 className="text-4xl lg:text-7xl font-script text-white leading-[0.8] drop-shadow-md tracking-[0.03em]">
                                Cuando el cuerpo <br className="hidden lg:block" /> recuerda, <br />
                                la vida encuentra <br className="hidden lg:block" /> una nueva dirección.
                            </h2>
                        </FadeIn>
                        
                        <div className="flex flex-col items-center space-y-4 lg:space-y-6">
                            {[
                                "EL CUERPO GUARDA LA MEMORIA",
                                "LA ENERGÍA MARCA EL RUMBO",
                                "LA CONCIENCIA ABRE EL CAMINO"
                            ].map((text, idx) => (
                                <FadeIn key={idx} delay={idx * 0.2 + 0.5}>
                                    <div className="px-8 py-3 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center">
                                        <span className="text-[10px] lg:text-xs uppercase tracking-[0.4em] font-bold text-white leading-none pt-1">
                                            {text}
                                        </span>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
