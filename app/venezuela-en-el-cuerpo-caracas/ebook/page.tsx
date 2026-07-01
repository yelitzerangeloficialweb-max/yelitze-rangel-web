"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
    BookOpen,
    ArrowRight,
    ShieldCheck
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

function Paso3Content() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "";
    const id = searchParams.get("id") || "";
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        window.scrollTo(0, 0);
    }, []);

    if (!mounted) return null;

    const nextLink = `/venezuela-en-el-cuerpo-caracas/paso-4${id ? `?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}` : ''}`;

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
                            Descarga tu Ebook
                        </h1>
                        <p className="text-xl md:text-2xl text-[#3C3935]/70 font-light mb-8 max-w-2xl mx-auto">
                            Aquí tienes tu guía somática para regulación del sistema nervioso después de eventos de alta activación.
                        </p>
                    </FadeIn>
                </div>
            </header>

            {/* MAIN CONTENT - EBOOK CARD ONLY */}
            <section className="py-24 px-4">
                <div className="container mx-auto max-w-2xl">
                    <StaggerContainer className="grid gap-8">
                        {/* CARD: EBOOK */}
                        <StaggerItem className="bg-white p-10 rounded-[3rem] shadow-xl border border-stone-100 flex flex-col justify-between hover:-translate-y-1 transition-transform text-center">
                            <div>
                                <div className="w-20 h-20 bg-[#C67C6A]/10 rounded-3xl flex items-center justify-center mb-8 mx-auto">
                                    <BookOpen className="w-10 h-10 text-[#C67C6A]" />
                                </div>
                                <h3 className="text-3xl font-bold font-heading mb-4 text-[#3C3935]">Venezuela en el Cuerpo</h3>
                                <p className="text-[#3C3935]/70 mb-10 text-lg font-light flex-grow">
                                    Guía somática con ejercicios, herramientas y contexto para entender tu respuesta fisiológica.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <a href="/Ebook-VenezuelaeneLCuerpo(1).pdf" target="_blank" rel="noopener noreferrer" className="w-full bg-[#3C3935] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#C67C6A] transition-colors text-lg shadow-lg">
                                    Descargar Ebook PDF
                                </a>
                            </div>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>
        </main>
    );
}

export default function Paso3Page() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F9F6F0] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C67C6A]" />
            </div>
        }>
            <Paso3Content />
        </Suspense>
    );
}
