"use client";

import Image from "next/image";
import Link from "next/link";
import { 
    ArrowRight, 
    Sparkles, 
    Activity, 
    Instagram, 
    Gift,
    CheckCircle2,
    Compass
} from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/motion";
import { SacredGeometry, FloatingStars, ThinGoldenLine, WaveDivider } from "@/components/ui/MysticalElements";

export default function BonosVenezuelaPage() {
    const BackgroundCircles = () => (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] border border-[#B8835A] rounded-full opacity-10"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [0, -90, 0],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] border border-[#8C4005] rounded-full opacity-10"
            />
        </div>
    );

    return (
        <main className="min-h-screen selection:bg-[#B8835A] selection:text-[#F5EFE6] bg-[#F5EFE6] relative overflow-hidden">
            <BackgroundCircles />
            <FloatingStars count={30} className="fixed inset-0 pointer-events-none opacity-40" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4">
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <FadeIn>
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C1530A]/10 rounded-full mb-8 border border-[#C1530A]/20">
                            <Gift className="w-8 h-8 text-[#C1530A]" />
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-script text-[#8C4005] mb-6 leading-none pt-4 tracking-normal font-normal">
                            Bonos de Venezuela en el Cuerpo
                        </h1>
                        <div className="w-24 h-px bg-[#B8835A]/30 mx-auto mb-10" />
                        <h2 className="text-2xl md:text-3xl font-heading text-[#8C4005] mb-8 font-bold italic">
                            ¡Gracias por ser parte de este movimiento!
                        </h2>
                        <p className="text-[#2D2926] text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed italic border-l-4 border-[#B8835A] pl-8 text-left md:text-center md:border-l-0 md:pl-0">
                            "Primero sana el cuerpo… y luego cambia la historia."
                        </p>
                        <p className="text-[#2D2926] text-lg font-light mb-16 max-w-2xl mx-auto leading-relaxed">
                            Tu presencia en el encuentro es el primer paso para transformar nuestra narrativa personal y colectiva. Como agradecimiento por tu entrega y asistencia, aquí tienes los dos recursos prometidos para profundizar en tu proceso de regulación.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Bonos Grid */}
            <section className="relative py-20 px-4 z-10">
                <div className="container mx-auto max-w-5xl">
                    <StaggerContainer className="grid md:grid-cols-2 gap-12">
                        {/* Bono 1: Test Somático */}
                        <StaggerItem className="relative group">
                            <div className="absolute inset-0 bg-[#B8835A]/5 rounded-[3rem] -rotate-3 transition-transform group-hover:rotate-0 duration-500" />
                            <div className="relative bg-white p-10 lg:p-12 rounded-[3rem] border border-[#B8835A]/20 shadow-xl overflow-hidden h-full flex flex-col">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                                    <Activity className="w-32 h-32 text-[#C1530A]" />
                                </div>
                                <div className="w-16 h-16 bg-[#C1530A] rounded-2xl flex items-center justify-center mb-8 shadow-lg ring-4 ring-[#C1530A]/10">
                                    <Activity className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-heading font-bold text-[#8C4005] mb-4">Test Somático</h3>
                                <p className="text-[#2D2926] text-lg font-light mb-10 leading-relaxed flex-grow">
                                    Un diagnóstico profundo para identificar cómo tu cuerpo guarda tensiones y cuál es tu estado actual de regulación del sistema nervioso.
                                </p>
                                <Link 
                                    href="/test-somatico"
                                    className="inline-flex items-center justify-center gap-3 bg-[#C1530A] text-white px-8 py-5 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-[#A84A2F] transition-all group/btn"
                                >
                                    Realizar mi Test
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </StaggerItem>

                        {/* Bono 2: Arquitectura Intencional */}
                        <StaggerItem className="relative group">
                            <div className="absolute inset-0 bg-[#2D2926]/5 rounded-[3rem] rotate-3 transition-transform group-hover:rotate-0 duration-500" />
                            <div className="relative bg-[#2D2926] p-10 lg:p-12 rounded-[3rem] border border-[#B8835A]/20 shadow-2xl overflow-hidden h-full flex flex-col">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                    <Sparkles className="w-32 h-32 text-[#B8835A]" />
                                </div>
                                <div className="w-16 h-16 bg-[#B8835A] rounded-2xl flex items-center justify-center mb-8 shadow-lg ring-4 ring-[#B8835A]/10">
                                    <Compass className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-heading font-bold text-[#B8835A] mb-4">Arquitectura Intencional</h3>
                                <p className="text-[#F5EFE6]/70 text-lg font-light mb-10 leading-relaxed flex-grow">
                                    Diseña una visión alineada con tu soberanía personal, dejando de reaccionar al entorno para empezar a crear tu propia realidad.
                                </p>
                                <Link 
                                    href="/arquitectura-de-vida-intencional"
                                    className="inline-flex items-center justify-center gap-3 bg-[#F5EFE6] text-[#8C4005] px-8 py-5 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all group/btn"
                                >
                                    Diseñar mi Visión
                                    <Sparkles className="w-5 h-5 group-hover/btn:scale-125 transition-transform" />
                                </Link>
                            </div>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

            {/* Instagram CTA Section */}
            <section className="relative py-32 px-4 z-10">
                <div className="container mx-auto max-w-4xl">
                    <FadeIn>
                        <div className="relative bg-gradient-to-br from-[#8C4005] to-[#2D2926] p-1 rounded-[4rem] shadow-2xl group overflow-hidden">
                            {/* Mystical Watermark Background */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 pointer-events-none">
                                <SacredGeometry className="w-full h-full text-[#B8835A]" />
                            </div>

                            <div className="relative bg-[#F5EFE6] rounded-[3.8rem] p-12 md:p-20 text-center flex flex-col items-center">
                                <div className="absolute top-10 right-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                                    <Instagram className="w-32 h-32 text-[#8C4005]" />
                                </div>

                                <span className="text-[#C1530A] font-bold tracking-[0.4em] uppercase text-xs mb-8 block">Sigamos Conectados</span>
                                <h2 className="text-4xl md:text-5xl font-heading text-[#8C4005] mb-8 font-bold leading-tight">
                                    Únete a nuestra comunidad <br /> en Instagram
                                </h2>
                                <p className="text-[#2D2926] text-xl font-light mb-12 max-w-xl leading-relaxed">
                                    Recibe diariamente herramientas de regulación, consejos de salud somática y sé el primero en enterarte de nuevos encuentros.
                                </p>
                                
                                <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-lg">
                                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#B8835A]/30 shadow-xl">
                                        <Image
                                            src="/assets/images/yelitze-insta-bonos.png"
                                            alt="Yelitze Rangel"
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </div>
                                    <div className="text-left flex-grow">
                                        <p className="font-bold text-[#8C4005] text-2xl">@yelitzerangeloficial</p>
                                        <p className="text-[#C1530A] font-medium">+15.2k Seguidores</p>
                                    </div>
                                    <a 
                                        href="https://www.instagram.com/yelitzerangeloficial/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#C1530A] text-white px-10 py-5 rounded-full font-bold shadow-lg hover:bg-[#8C4005] transition-all hover:scale-105 active:scale-95"
                                    >
                                        Seguir en Instagram
                                        <ArrowRight className="w-5 h-5" />
                                    </a>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute bottom-12 left-12 animate-bounce opacity-30">
                                    <CheckCircle2 className="w-8 h-8 text-[#B8835A]" />
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Footer Credits */}
            <footer className="py-12 border-t border-[#B8835A]/10 text-center">
                <div className="container mx-auto px-4 opacity-40">
                    <p className="text-sm">
                        &copy; 2026 Yelitze Rangel. Todos los derechos reservados.
                    </p>
                </div>
            </footer>

            {/* Decorative Wave at the bottom */}
            <WaveDivider position="bottom" fill="#8C4005" className="opacity-5" />
        </main>
    );
}
