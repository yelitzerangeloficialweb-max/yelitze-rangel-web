"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { 
    Brain,
    Heart
} from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

function Paso5Content() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "";
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        window.scrollTo(0, 0);
    }, []);

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-[#F9F6F0] text-[#3C3935] font-body">
            {/* CIERRE DE LA PÁGINA & CTA FINAL */}
            <section className="py-32 px-4 relative min-h-screen flex items-center justify-center">
                <div className="container mx-auto max-w-3xl text-center">
                    <FadeIn>
                        <Brain className="w-20 h-20 mx-auto text-[#3C3935]/20 mb-10" />
                        <h1 className="text-4xl md:text-6xl font-heading font-light italic text-[#3C3935] leading-relaxed mb-8">
                            "Tu cuerpo no es tu enemigo.<br/>
                            <span className="font-bold">Es el sistema más antiguo de protección que tienes.</span>"
                        </h1>
                        <p className="text-xl md:text-2xl text-[#3C3935]/70 font-light mb-16 max-w-2xl mx-auto">
                            Gracias por dar este paso hacia tu regulación{name ? `, ${name}` : ''}. Has completado todas las herramientas iniciales.
                        </p>

                        <div className="max-w-xl mx-auto">
                            <div className="bg-[#3C3935] text-white p-10 md:p-12 rounded-[3rem] shadow-2xl flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500">
                                <div>
                                    <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-8 mx-auto">
                                        <Heart className="w-10 h-10 text-[#C67C6A]" />
                                    </div>
                                    <h3 className="text-3xl font-bold font-heading mb-4 text-[#C67C6A]">
                                        Proceso Completado
                                    </h3>
                                    <p className="text-white/80 font-light text-lg">
                                        Ya puedes cerrar esta página. Recuerda que la regulación es un proceso gradual. Usa las herramientas cada vez que las necesites y recuerda que puedes escribirme al WhatsApp si requieres más apoyo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}

export default function Paso5Page() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F9F6F0] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C67C6A]" />
            </div>
        }>
            <Paso5Content />
        </Suspense>
    );
}
