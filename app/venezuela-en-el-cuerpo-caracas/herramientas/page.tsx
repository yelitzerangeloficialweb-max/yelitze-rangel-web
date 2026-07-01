"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { 
    HeartPulse, 
    Wind, 
    Eye, 
    Activity,
    BrainCircuit,
    Moon,
    Volume2,
    ShieldCheck
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

function HerramientasContent() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "";
    const id = searchParams.get("id") || "";
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        window.scrollTo(0, 0);
    }, []);

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-[#F9F6F0] text-[#3C3935] font-body">
            {/* HEADER */}
            <header className="bg-[#FCFBFA] py-20 px-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C67C6A]/10 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <FadeIn>
                        <ShieldCheck className="w-12 h-12 mx-auto text-[#C67C6A] mb-6" />
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#3C3935] mb-4">
                            Herramientas de Regulación
                        </h1>
                        <p className="text-xl md:text-2xl text-[#3C3935]/70 font-light mb-8 max-w-2xl mx-auto">
                            Técnicas de respiración y regulación rápida para cuando sientas ansiedad o bloqueo.
                        </p>
                    </FadeIn>
                </div>
            </header>

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

            {/* SECCIÓN "7 TÉCNICAS DE REGULACIÓN" */}
            <section className="py-24 px-4 bg-[#FCFBFA]">
                <div className="container mx-auto max-w-4xl">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl font-heading font-bold text-[#3C3935] mb-4">
                            7 Técnicas de Regulación
                        </h2>
                        <p className="text-xl text-stone-500 font-light">
                            Herramientas somáticas para diferentes estados de activación.
                        </p>
                    </FadeIn>

                    <StaggerContainer className="grid sm:grid-cols-2 gap-6 mb-16">
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
        </main>
    );
}

export default function HerramientasPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F9F6F0] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C67C6A]" />
            </div>
        }>
            <HerramientasContent />
        </Suspense>
    );
}
