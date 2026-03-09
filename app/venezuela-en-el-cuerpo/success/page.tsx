"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, ArrowLeft, Download, Share2 } from "lucide-react";
import { TicketQR } from "@/components/ui/TicketQR";
import { FadeIn } from "@/components/ui/motion";
import { FloatingStars, SacredGeometry } from "@/components/ui/MysticalElements";
import html2canvas from "html2canvas";

function SuccessContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || "";
    const name = searchParams.get("name") || "Participante";
    const city = searchParams.get("city") || "Venezuela";
    const [mounted, setMounted] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDownload = async () => {
        const element = document.getElementById('ticket-capture');
        if (!element) return;

        try {
            setIsDownloading(true);
            const canvas = await html2canvas(element, {
                scale: 2, // Better quality
                backgroundColor: null,
                logging: false,
                useCORS: true
            });

            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = `ticket-venezuela-${name.replace(/\s+/g, '-').toLowerCase()}.png`;
            link.click();
        } catch (error) {
            console.error("Error generating ticket image:", error);
            alert("Hubo un problema al generar la imagen. Por favor, toma una captura de pantalla.");
        } finally {
            setIsDownloading(false);
        }
    };

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-[#2D2926] text-[#F5EFE6] relative overflow-hidden flex flex-col items-center py-20 px-4">
            {/* Background elements to match the landing */}
            <FloatingStars count={40} className="fixed inset-0 pointer-events-none opacity-40" />
            <SacredGeometry className="fixed top-[-10%] left-[-10%] w-[800px] h-[800px] text-[#B8835A]/5 pointer-events-none" />

            <div className="container mx-auto max-w-4xl relative z-10 flex flex-col items-center">

                {/* Header Success Message */}
                <FadeIn className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-[#8C4005]/20 rounded-full mb-6 border border-[#8C4005]/30">
                        <CheckCircle2 className="w-10 h-10 text-[#B8835A]" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-[#8C4005] mb-4">
                        ¡Registro Exitoso!
                    </h1>
                    <p className="text-xl font-light text-[#F5EFE6]/80 max-w-xl mx-auto leading-relaxed">
                        Tu lugar en el <span className="text-[#B8835A] font-bold italic">Tour Nacional de Venezuela en el Cuerpo</span> ha sido reservado. Aquí tienes tu pase oficial.
                    </p>
                </FadeIn>

                {/* THE TICKET */}
                <div className="w-full mb-16">
                    <TicketQR id={id} name={name} city={city} />
                </div>

                {/* Information & Actions */}
                <div className="grid md:grid-cols-2 gap-8 w-full max-w-2xl">
                    <FadeIn delay={0.2} className="bg-[#B8835A]/10 border border-[#B8835A]/20 p-8 rounded-3xl backdrop-blur-sm">
                        <h3 className="text-[#B8835A] font-bold text-lg mb-4 flex items-center gap-2">
                            <MessageCircle className="w-5 h-5" />
                            Paso Importante
                        </h3>
                        <p className="text-sm font-light leading-relaxed mb-6">
                            Para recibir la ubicación exacta y detalles logísticos, es indispensable que te unas a la comunidad de WhatsApp de tu ciudad.
                        </p>
                        <a
                            href="#"
                            className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-full font-bold hover:scale-105 transition-transform"
                        >
                            Unirme a WhatsApp
                        </a>
                    </FadeIn>

                    <FadeIn delay={0.4} className="bg-[#F5EFE6]/5 border border-[#F5EFE6]/10 p-8 rounded-3xl backdrop-blur-sm">
                        <h3 className="text-[#F5EFE6] font-bold text-lg mb-4 flex items-center gap-2">
                            <Download className="w-5 h-5" />
                            Guarda tu Ticket
                        </h3>
                        <p className="text-sm font-light leading-relaxed mb-6 opacity-70">
                            Descarga tu ticket directamente en tu dispositivo o toma una captura de pantalla para llevarlo contigo el día del evento.
                        </p>
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="w-full flex items-center justify-center gap-2 border border-[#F5EFE6]/30 px-6 py-4 rounded-full font-bold hover:bg-[#F5EFE6]/10 transition-colors disabled:opacity-50"
                        >
                            {isDownloading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-[#F5EFE6] border-t-transparent animate-spin rounded-full" />
                                    Generando...
                                </>
                            ) : (
                                <>
                                    <Download className="w-5 h-5" />
                                    Descargar Ticket
                                </>
                            )}
                        </button>
                    </FadeIn>
                </div>

                {/* Back to Home */}
                <Link
                    href="/venezuela-en-el-cuerpo"
                    className="mt-16 inline-flex items-center gap-2 text-[#F5EFE6]/50 hover:text-[#B8835A] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver a la página principal
                </Link>
            </div>

            {/* Bottom Credits */}
            <footer className="mt-20 pt-10 border-t border-[#F5EFE6]/10 w-full text-center">
                <p className="text-[#F5EFE6]/30 text-xs font-mono uppercase tracking-widest">
                    Yelitze Rangel • Arquitectura de Vida • 2024
                </p>
            </footer>
        </main>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#2D2926] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B8835A]" />
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
