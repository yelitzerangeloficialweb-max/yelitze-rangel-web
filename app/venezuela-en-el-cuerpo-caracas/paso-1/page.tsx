"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
    MessageCircle,
    ArrowRight,
    ShieldCheck
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

function Paso1Content() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "";
    const id = searchParams.get("id") || "";
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        window.scrollTo(0, 0);
    }, []);

    if (!mounted) return null;

    const nextLink = `/venezuela-en-el-cuerpo-caracas/paso-2${id ? `?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}` : ''}`;

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
                            Paso 1: Únete al WhatsApp{name ? `, ${name}` : ''}
                        </h1>
                        <p className="text-xl md:text-2xl text-[#3C3935]/70 font-light mb-8 max-w-2xl mx-auto">
                            Antes de continuar a tus herramientas, por favor únete a la comunidad de WhatsApp o escríbenos directamente.
                        </p>
                    </FadeIn>
                </div>
            </header>

            {/* MAIN CONTENT - WHATSAPP CARD */}
            <section className="py-24 px-4">
                <div className="container mx-auto max-w-2xl">
                    <StaggerContainer className="grid gap-8">
                        {/* CARD: WHATSAPP */}
                        <StaggerItem className="bg-[#3C3935] text-white p-10 rounded-[3rem] shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-transform relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
                            <div className="relative z-10 text-center">
                                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-8 mx-auto">
                                    <MessageCircle className="w-10 h-10 text-[#C67C6A]" />
                                </div>
                                <h3 className="text-3xl font-bold font-heading mb-4 text-[#C67C6A]">Terapia 1 a 1 y Acompañamiento</h3>
                                <p className="text-white/70 mb-10 text-lg font-light flex-grow">
                                    ¿Sientes que necesitas contención ahora mismo? Habla directamente conmigo al WhatsApp para recibir acompañamiento.
                                </p>
                            </div>
                            
                            <div className="flex flex-col gap-4 relative z-10">
                                <a 
                                    href={`https://wa.me/17867268717?text=${encodeURIComponent(`Hola Yelitze, vengo de la página de Venezuela en el Cuerpo${name ? ` (soy ${name})` : ''} y me gustaría saber más sobre la terapia 1 a 1.`)}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="w-full bg-[#C67C6A] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#FCFBFA] hover:text-[#3C3935] transition-colors text-lg shadow-lg"
                                >
                                    Escribir a WhatsApp <MessageCircle className="w-6 h-6" />
                                </a>
                                
                                <div className="flex flex-col items-center mt-6">
                                    <p className="text-white/50 text-sm mb-4">Cuando hayas enviado el mensaje, continúa al siguiente paso:</p>
                                    <Link href={nextLink} className="w-full bg-[#FCFBFA]/10 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#FCFBFA]/20 transition-colors">
                                        Continuar al Paso 2 (Test Somático) <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>
        </main>
    );
}

export default function Paso1Page() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F9F6F0] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C67C6A]" />
            </div>
        }>
            <Paso1Content />
        </Suspense>
    );
}
