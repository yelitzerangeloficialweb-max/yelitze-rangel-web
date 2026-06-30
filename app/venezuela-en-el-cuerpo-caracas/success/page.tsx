"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
    BookOpen, 
    BrainCircuit, 
    HeartPulse, 
    Wind, 
    Brain, 
    Eye, 
    Activity,
    Moon,
    Volume2,
    ArrowRight,
    ShieldCheck
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

function PostRegistroHub() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "";
    const id = searchParams.get("id") || "";
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        window.scrollTo(0, 0);
    }, []);

    if (!mounted) return null;

    const testLink = id ? `/venezuela-en-el-cuerpo-caracas/test?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}` : `/venezuela-en-el-cuerpo-caracas/test`;

    return (
        <main className="min-h-screen bg-[#F9F6F0] text-[#3C3935] font-body">
            {/* HEADER */}
            <header className="bg-[#FCFBFA] py-20 px-4 rounded-b-[3rem] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C67C6A]/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3C3935]/5 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <FadeIn>
                        <ShieldCheck className="w-12 h-12 mx-auto text-[#C67C6A] mb-6" />
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#3C3935] mb-4">
                            Tu acceso está listo{name ? `, ${name}` : ''}
                        </h1>
                        <p className="text-xl md:text-2xl text-[#3C3935]/70 font-light mb-8 max-w-2xl mx-auto">
                            Aquí tienes todas las herramientas para comenzar tu proceso de regulación del sistema nervioso.
                        </p>
                        <div className="bg-[#3C3935] text-white px-8 py-4 rounded-full inline-block shadow-lg">
                            <p className="text-lg italic font-light">
                                "No tienes que hacerlo todo ahora. Solo empieza por un paso."
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </header>

            {/* MAIN CONTENT - THE 3 CARDS */}
            <section className="py-24 px-4">
                <div className="container mx-auto max-w-5xl">
                    <StaggerContainer className="grid md:grid-cols-3 gap-8">
                        
                        {/* CARD 1: EBOOK */}
                        <StaggerItem className="bg-white p-10 rounded-[3rem] shadow-xl border border-stone-100 flex flex-col justify-between hover:-translate-y-1 transition-transform">
                            <div>
                                <div className="w-16 h-16 bg-[#C67C6A]/10 rounded-2xl flex items-center justify-center mb-8">
                                    <BookOpen className="w-8 h-8 text-[#C67C6A]" />
                                </div>
                                <h3 className="text-2xl font-bold font-heading mb-3">Venezuela en el Cuerpo</h3>
                                <p className="text-[#3C3935]/70 mb-8 font-light flex-grow">
                                    Guía somática para regulación del sistema nervioso después de eventos de alta activación.
                                </p>
                            </div>
                            <a href="/Ebook-Venezuela%20en%20el%20cuerpo.pdf" target="_blank" rel="noopener noreferrer" className="w-full bg-[#3C3935] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#C67C6A] transition-colors">
                                Descargar Ebook <ArrowRight className="w-5 h-5" />
                            </a>
                        </StaggerItem>

                        {/* CARD 2: TEST SOMÁTICO */}
                        <StaggerItem className="bg-[#3C3935] text-white p-10 rounded-[3rem] shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-transform relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                                    <Activity className="w-8 h-8 text-[#C67C6A]" />
                                </div>
                                <h3 className="text-2xl font-bold font-heading mb-3 text-[#C67C6A]">Test Somático de Regulación</h3>
                                <p className="text-white/70 mb-8 font-light flex-grow">
                                    Evalúa tu nivel actual de activación del sistema nervioso.
                                </p>
                            </div>
                            <Link href={testLink} className="relative z-10 w-full bg-[#FCFBFA] text-[#3C3935] py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#C67C6A] hover:text-white transition-colors">
                                Iniciar Test <ArrowRight className="w-5 h-5" />
                            </Link>
                        </StaggerItem>

                        {/* CARD 3 — HERRAMIENTAS */}
                        <StaggerItem className="bg-[#FCFBFA] rounded-3xl p-8 shadow-xl border border-stone-100 flex flex-col hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-[#C67C6A]/10 rounded-2xl flex items-center justify-center mb-6">
                                <HeartPulse className="w-8 h-8 text-[#C67C6A]" />
                            </div>
                            <h3 className="text-2xl font-bold font-heading mb-3">7 Técnicas para Cortar la Ansiedad</h3>
                            <p className="text-[#3C3935]/70 mb-8 font-light flex-grow">
                                Tu cuerpo tiene un botón de apagado. Nadie te enseñó dónde está.
                            </p>
                            <a href="#herramientas" className="w-full bg-[#F9F6F0] text-[#3C3935] py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-stone-200 transition-colors">
                                Abrir herramientas <ArrowRight className="w-5 h-5" />
                            </a>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

            {/* SECCIÓN EDUCATIVA DE CONTENCIÓN & ACCIÓN INMEDIATA */}
            <section className="py-20 bg-[#3C3935] text-white px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-[#C67C6A]">
                                Si estás sintiendo ansiedad ahora mismo
                            </h2>
                            <div className="space-y-6 text-lg font-light text-white/80">
                                <p className="font-medium text-xl">
                                    Tu sistema nervioso no está fallando.<br/>
                                    Está respondiendo a un nivel alto de activación.
                                </p>
                                
                                <div>
                                    <p className="mb-3 uppercase tracking-widest text-xs font-bold opacity-60">Síntomas comunes:</p>
                                    <ul className="grid grid-cols-2 gap-3">
                                        {["Tensión corporal", "Pensamiento acelerado", "Insomnio", "Hipervigilancia", "Sensación de desconexión"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#C67C6A]" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="border-l-4 border-[#C67C6A] pl-6 py-2 mt-8 bg-[#FCFBFA]/5 rounded-r-2xl">
                                    <p className="text-xl">
                                        Esto no es peligro.<br/>
                                        <span className="font-bold text-[#C67C6A]">Es activación del sistema nervioso.</span>
                                    </p>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2} className="bg-[#FCFBFA] text-[#3C3935] p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                                <Wind className="w-32 h-32" />
                            </div>
                            <h3 className="text-2xl font-bold font-heading mb-8">
                                Si necesitas regularte ahora
                            </h3>
                            <div className="space-y-6 relative z-10">
                                {[
                                    { text: "Inhala 4 segundos", icon: Wind },
                                    { text: "Exhala 6–8 segundos", icon: Wind },
                                    { text: "Repite 5 veces", icon: Activity },
                                    { text: "Observa el entorno lentamente", icon: Eye }
                                ].map((step, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-[#F9F6F0]/50 p-4 rounded-xl border border-stone-100">
                                        <div className="w-10 h-10 bg-[#FCFBFA] rounded-full shadow-sm flex items-center justify-center flex-shrink-0">
                                            <step.icon className="w-5 h-5 text-[#C67C6A]" />
                                        </div>
                                        <p className="font-medium text-lg">{step.text}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-8 text-center text-stone-500 font-medium italic">
                                Esto ayuda a bajar la activación fisiológica.
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* SECCIÓN “7 TÉCNICAS DE REGULACIÓN” */}
            <section id="herramientas" className="py-24 px-4 bg-[#FCFBFA]">
                <div className="container mx-auto max-w-4xl">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl font-heading font-bold text-[#3C3935] mb-4">
                            7 Técnicas de Regulación
                        </h2>
                        <p className="text-xl text-stone-500 font-light">
                            Herramientas somáticas para diferentes estados de activación.
                        </p>
                    </FadeIn>

                    <StaggerContainer className="grid sm:grid-cols-2 gap-6">
                        {[
                            { title: "Ataque de pánico", action: "Respiración 4–7–8", result: "freno del sistema de alarma", icon: Wind },
                            { title: "Corazón acelerado", action: "Frío en manos o rostro", result: "reinicio fisiológico", icon: HeartPulse },
                            { title: "Desconexión", action: "Técnica 5-4-3-2-1", result: "retorno al presente", icon: Eye },
                            { title: "Ansiedad repentina", action: "Exhalación larga x3", result: "baja activación simpática", icon: Activity },
                            { title: "Mente en bucle", action: "Cálculo mental (100-7)", result: "interrupción cognitiva", icon: BrainCircuit },
                            { title: "Insomnio", action: "Exhalación lenta + tarareo", result: "activación parasimpática", icon: Moon },
                            { title: "Nudo en la garganta", action: "Vibración con tarareo", result: "desbloqueo somático", icon: Volume2 }
                        ].map((tech, i) => (
                            <StaggerItem key={i} className="bg-[#F9F6F0] p-6 rounded-2xl flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#FCFBFA] rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 text-[#C67C6A]">
                                    <tech.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#3C3935] mb-1">{i + 1}. {tech.title}</h4>
                                    <p className="text-[#C67C6A] font-medium text-sm mb-1">{tech.action}</p>
                                    <p className="text-stone-500 text-sm font-light">→ {tech.result}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* CIERRE DE LA PÁGINA & CTA FINAL */}
            <section id="test" className="py-32 px-4 bg-[#F9F6F0] relative">
                <div className="container mx-auto max-w-3xl text-center">
                    <FadeIn>
                        <Brain className="w-16 h-16 mx-auto text-[#3C3935]/20 mb-8" />
                        <h2 className="text-3xl md:text-5xl font-heading font-light italic text-[#3C3935] leading-relaxed mb-16">
                            "Tu cuerpo no es tu enemigo.<br/>
                            <span className="font-bold">Es el sistema más antiguo de protección que tienes.</span>"
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8 text-left">
                            <div className="bg-[#FCFBFA] p-8 md:p-10 rounded-[3rem] shadow-xl border border-stone-100 flex flex-col justify-between hover:-translate-y-1 transition-transform">
                                <div>
                                    <h3 className="text-2xl font-bold font-heading mb-4 text-[#3C3935]">
                                        Continúa con el Test
                                    </h3>
                                    <p className="text-[#3C3935]/70 font-light mb-8">
                                        Descubre tu nivel de activación actual y los siguientes pasos para tu proceso de regulación de forma guiada.
                                    </p>
                                </div>
                                <a href="#" className="inline-flex items-center justify-center gap-3 bg-[#3C3935] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#C67C6A] transition-colors shadow-lg group w-full">
                                    Ir al Test Somático
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>

                            <div className="bg-[#3C3935] text-white p-8 md:p-10 rounded-[3rem] shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-transform">
                                <div>
                                    <h3 className="text-2xl font-bold font-heading mb-4 text-[#C67C6A]">
                                        Terapia 1 a 1
                                    </h3>
                                    <p className="text-white/70 font-light mb-8">
                                        ¿Sientes que necesitas más contención? Habla directamente con un especialista para recibir acompañamiento personalizado.
                                    </p>
                                </div>
                                <a 
                                    href="https://wa.me/17867268717?text=Hola%20Yelitze,%20vengo%20de%20la%20p%C3%A1gina%20de%20Venezuela%20en%20el%20Cuerpo%20y%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20la%20terapia%201%20a%201." 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-flex items-center justify-center gap-3 bg-[#C67C6A] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#FCFBFA] hover:text-[#3C3935] transition-colors shadow-lg group w-full"
                                >
                                    Escribir por WhatsApp
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F9F6F0] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C67C6A]" />
            </div>
        }>
            <PostRegistroHub />
        </Suspense>
    );
}
