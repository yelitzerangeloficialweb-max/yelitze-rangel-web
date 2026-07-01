"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
    Activity,
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
                            Paso 1: Tu Test Somático{name ? `, ${name}` : ''}
                        </h1>
                        <p className="text-xl md:text-2xl text-[#3C3935]/70 font-light mb-8 max-w-2xl mx-auto">
                            El primer paso en tu proceso de regulación es entender cómo está respondiendo tu sistema nervioso en este momento.
                        </p>
                    </FadeIn>
                </div>
            </header>

            {/* MAIN CONTENT - TEST CARD ONLY */}
            <section className="py-24 px-4">
                <div className="container mx-auto max-w-2xl">
                    <StaggerContainer className="grid gap-8">
                        {/* CARD: TEST SOMÁTICO */}
                        <StaggerItem className="bg-[#3C3935] text-white p-10 rounded-[3rem] shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-transform relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
                            <div className="relative z-10 text-center">
                                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-8 mx-auto">
                                    <Activity className="w-10 h-10 text-[#C67C6A]" />
                                </div>
                                <h3 className="text-3xl font-bold font-heading mb-4 text-[#C67C6A]">Test Somático de Regulación</h3>
                                <p className="text-white/70 mb-10 text-lg font-light flex-grow">
                                    Un test corto que te ayuda a entender tu nivel de activación y qué tipo de regulación puedes necesitar ahora.
                                </p>
                            </div>
                            <Link href={testLink} className="relative z-10 w-full bg-[#FCFBFA] text-[#3C3935] py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#C67C6A] hover:text-white transition-colors text-lg shadow-lg">
                                Iniciar Test <ArrowRight className="w-6 h-6" />
                            </Link>
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
