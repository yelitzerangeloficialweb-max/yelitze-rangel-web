"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { 
    BookOpen,
    ShieldCheck
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

function EbookContent() {
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
                                {id ? (
                                    <button 
                                        onClick={async () => {
                                            try {
                                                await fetch('/api/venezuela-en-el-cuerpo-caracas/ebook-download', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ registrationId: id })
                                                });
                                            } catch (e) {
                                                console.error(e);
                                            }
                                            window.open("/Ebook-VenezuelaeneLCuerpo-v3.pdf", "_blank");
                                        }}
                                        className="w-full bg-[#3C3935] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#C67C6A] transition-colors text-lg shadow-lg"
                                    >
                                        Descargar Ebook PDF
                                    </button>
                                ) : (
                                    <form onSubmit={async (e) => {
                                        e.preventDefault();
                                        const formData = new FormData(e.currentTarget);
                                        const email = formData.get('email') as string;
                                        if (email) {
                                            try {
                                                await fetch('/api/venezuela-en-el-cuerpo-caracas/ebook-download', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ email })
                                                });
                                            } catch (e) {
                                                console.error(e);
                                            }
                                            window.open("/Ebook-VenezuelaeneLCuerpo-v3.pdf", "_blank");
                                        }
                                    }} className="w-full space-y-4 text-left">
                                        <div>
                                            <label className="text-xs font-bold text-[#3C3935]/70 uppercase tracking-widest mb-2 block ml-2">Confirma tu correo para descargar</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="w-full bg-white border border-[#3C3935]/20 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#C67C6A]/50 focus:border-[#C67C6A] transition-all outline-none text-[#3C3935] placeholder:text-[#3C3935]/40"
                                                placeholder="tu@correo.com"
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="w-full bg-[#3C3935] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#C67C6A] transition-colors text-lg shadow-lg">
                                            Descargar Ebook PDF
                                        </button>
                                    </form>
                                )}
                            </div>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>
        </main>
    );
}

export default function EbookPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F9F6F0] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C67C6A]" />
            </div>
        }>
            <EbookContent />
        </Suspense>
    );
}
