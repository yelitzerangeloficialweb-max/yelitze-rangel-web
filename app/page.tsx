"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/motion";

export default function ComingSoonPage() {
    return (
        <main className="min-h-screen bg-[#fafcfe] selection:bg-[var(--color-secondary)] selection:text-white flex flex-col pt-32 pb-16 relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-primary)]/5 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-secondary)]/5 blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/assets/images/noise.png')] opacity-[0.03]" />
            </div>

            <div className="container mx-auto px-4 flex-grow flex flex-col justify-center items-center text-center relative z-10">

                {/* Animated Logo Container */}
                <FadeIn>
                    <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-16">
                        <div className="absolute inset-0 bg-[var(--color-secondary)]/10 rounded-full animate-pulse-slow blur-xl" />
                        <div className="relative w-full h-full bg-white rounded-full p-6 shadow-2xl border border-stone-50 flex items-center justify-center">
                            <Image
                                src="/assets/images/logo-color-scroll.png"
                                alt="Yelitze Rangel"
                                width={150}
                                height={150}
                                className="object-contain animate-float"
                            />
                        </div>
                    </div>
                </FadeIn>

                {/* Main Content */}
                <FadeIn delay={0.2} className="max-w-4xl mx-auto space-y-10">
                    <span className="inline-block px-4 py-1 rounded-full border border-[var(--color-secondary)]/30 bg-[var(--color-secondary)]/5 text-[var(--color-secondary)] text-[10px] font-bold tracking-[0.3em] uppercase">
                        Sitio en Construcción
                    </span>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading text-[var(--color-primary)] leading-tight italic">
                        Estamos gestando <br />
                        <span className="opacity-40">algo hermoso</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-stone-500 font-light leading-relaxed max-w-2xl mx-auto">
                        El santuario digital de <strong className="text-[var(--color-primary)] font-serif">Yelitzé Rangel</strong> está renovando su energía para recibirte con más luz y claridad.
                    </p>

                    <div className="w-16 h-px bg-[var(--color-secondary)] mx-auto opacity-30" />

                    <p className="text-sm text-stone-400 font-sans tracking-widest uppercase">
                        Volveremos muy pronto
                    </p>
                </FadeIn>

            </div>

        </main>
    );
}
