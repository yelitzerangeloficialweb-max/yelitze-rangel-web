"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    AlertCircle,
    Activity,
    Heart,
    Brain,
    Zap,
    Download
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/motion";

export default function VenezuelaEnElCuerpoCaracasPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const whatsapp = formData.get("phone") as string;
        // Keeping 'city' as Caracas by default for this landing
        const city = "caracas";

        try {
            // Using existing API for now
            const res = await fetch('/api/venezuela-en-el-cuerpo/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, whatsapp, city, turnstileToken }),
            });

            if (res.ok) {
                const data = await res.json();
                const registrationId = data.id;
                // Redirect to a success page or handle locally
                router.push(`/venezuela-en-el-cuerpo-caracas/success?id=${encodeURIComponent(registrationId)}&name=${encodeURIComponent(name)}`);
            } else {
                const errorData = await res.json();
                if (errorData.error === 'duplicate') {
                    alert(errorData.message);
                } else {
                    console.error('Registration failed:', errorData);
                    alert(errorData.error || errorData.message || "Hubo un error al registrarte. Por favor intenta de nuevo.");
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Error de conexión. Intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen selection:bg-[#C8A45D] selection:text-[#1C1C1C]" style={{
            backgroundColor: '#F5EFE6', // Beige cálido
            '--color-gold': '#C8A45D',  // Dorado
            '--color-black': '#1C1C1C', // Negro suave
            '--color-cream': '#FFFFFF', // Blanco crema
        } as React.CSSProperties}>

            {/* 1. HERO SECTION */}
            <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#F5EFE6]">
                <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                    <FadeIn>
                        <h1 className="text-5xl md:text-7xl font-heading text-[#1C1C1C] mb-6 leading-[1.1] font-bold">
                            Venezuela <br/><span className="italic font-light">en el Cuerpo</span>
                        </h1>
                        <h2 className="text-xl md:text-2xl font-body text-[#1C1C1C] mb-8 font-semibold leading-relaxed max-w-lg">
                            Regulación somática del sistema nervioso después del impacto
                        </h2>
                        <div className="bg-[#1C1C1C] text-[#F5EFE6] p-6 rounded-2xl mb-8 inline-block shadow-lg">
                            <p className="text-lg md:text-xl font-light italic">
                                "El cuerpo no olvida lo que la mente no puede explicar."
                            </p>
                        </div>
                        <p className="text-[#1C1C1C]/70 text-lg font-light mb-10 max-w-xl leading-relaxed flex items-center gap-3">
                            <ShieldCheck className="text-[#C8A45D] w-6 h-6" />
                            Guía práctica para recuperar sensación de seguridad interna.
                        </p>
                    </FadeIn>

                    <ScaleIn delay={0.2} className="relative w-full max-w-md mx-auto lg:ml-auto">
                        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-[#C8A45D]/20">
                            <h3 className="text-2xl font-heading font-bold text-[#1C1C1C] mb-6 text-center">
                                Comienza tu proceso aquí
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="text-xs font-bold text-[#1C1C1C]/60 uppercase tracking-widest mb-2 block ml-2">Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full bg-[#F5EFE6]/50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#C8A45D]/50 focus:border-[#C8A45D] transition-all outline-none text-[#1C1C1C]"
                                        placeholder="Tu nombre"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-[#1C1C1C]/60 uppercase tracking-widest mb-2 block ml-2">WhatsApp</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="w-full bg-[#F5EFE6]/50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#C8A45D]/50 focus:border-[#C8A45D] transition-all outline-none text-[#1C1C1C]"
                                        placeholder="+58 412 1234567"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-[#1C1C1C]/60 uppercase tracking-widest mb-2 block ml-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full bg-[#F5EFE6]/50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#C8A45D]/50 focus:border-[#C8A45D] transition-all outline-none text-[#1C1C1C]"
                                        placeholder="tu@correo.com"
                                        required
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#1C1C1C] text-[#F5EFE6] px-8 py-5 rounded-2xl font-bold hover:bg-[#C8A45D] hover:text-[#1C1C1C] transition-colors flex items-center justify-center gap-3 mt-6 shadow-lg group disabled:opacity-50"
                                >
                                    {isSubmitting ? "Procesando..." : "Acceder a mi guía de regulación"}
                                    {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                </button>
                                <p className="text-center text-xs text-[#1C1C1C]/50 mt-4 flex justify-center items-center gap-2">
                                    <Download className="w-3 h-3" /> Incluye ebook + test somático gratuito
                                </p>
                            </form>
                        </div>
                    </ScaleIn>
                </div>
            </section>

            {/* 2. SECCIÓN PROBLEMA */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-4xl">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-heading text-[#1C1C1C] font-bold mb-6">
                            ¿Por qué sigues en estado de alerta?
                        </h2>
                        <p className="text-lg md:text-xl text-[#1C1C1C]/70 font-light leading-relaxed max-w-2xl mx-auto">
                            Muchas personas experimentan después de eventos de alta intensidad:
                        </p>
                    </FadeIn>

                    <StaggerContainer className="grid sm:grid-cols-2 gap-6 mb-16">
                        {[
                            "Tensión corporal constante",
                            "Ansiedad sin causa clara",
                            "Dificultad para descansar",
                            "Estado de hiperalerta"
                        ].map((item, i) => (
                            <StaggerItem key={i} className="flex items-center gap-4 bg-[#F5EFE6]/50 p-6 rounded-2xl border border-stone-100">
                                <div className="w-10 h-10 rounded-full bg-[#C8A45D]/20 flex items-center justify-center flex-shrink-0">
                                    <Activity className="w-5 h-5 text-[#C8A45D]" />
                                </div>
                                <p className="text-[#1C1C1C] font-medium">{item}</p>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    <FadeIn className="text-center bg-[#1C1C1C] text-white p-10 rounded-3xl shadow-xl">
                        <p className="text-2xl font-light italic mb-2">No es psicológico únicamente.</p>
                        <p className="text-xl font-bold text-[#C8A45D]">Es una respuesta del sistema nervioso.</p>
                    </FadeIn>
                </div>
            </section>

            {/* 3. REFRAME NEUROBIOLÓGICO */}
            <section className="py-24 bg-[#F5EFE6] relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <h2 className="text-4xl font-heading text-[#1C1C1C] font-bold mb-8 leading-tight">
                                Tu sistema nervioso está protegiéndote
                            </h2>
                            <div className="space-y-6 text-lg text-[#1C1C1C]/80 font-light leading-relaxed border-l-4 border-[#C8A45D] pl-6">
                                <p>
                                    El cuerpo aprende a sobrevivir antes que a relajarse.
                                </p>
                                <p>
                                    Cuando hay eventos de impacto, el sistema puede quedarse en modo activación, interpretando que el peligro aún no ha pasado.
                                </p>
                                <p className="font-medium text-[#1C1C1C] text-xl mt-8 pt-4">
                                    Esto no es daño.<br/>
                                    <span className="text-[#C8A45D] font-bold">Es adaptación.</span>
                                </p>
                            </div>
                        </FadeIn>
                        <ScaleIn delay={0.2}>
                            <div className="aspect-square bg-white rounded-full p-8 shadow-2xl relative flex items-center justify-center border-8 border-[#F5EFE6] ring-1 ring-stone-200">
                                <div className="absolute inset-0 rounded-full border border-[#C8A45D]/20 m-4 animate-spin-slow"></div>
                                <Brain className="w-32 h-32 text-[#C8A45D] opacity-80" strokeWidth={1} />
                            </div>
                        </ScaleIn>
                    </div>
                </div>
            </section>

            {/* 4. SOLUCIÓN & 5. BENEFICIOS */}
            <section className="py-24 bg-[#1C1C1C] text-white relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-20">
                        <FadeIn>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                                Este recurso no es información
                            </h2>
                            <p className="text-2xl text-[#C8A45D] italic font-light">
                                Es un sistema de regulación guiada.
                            </p>
                        </FadeIn>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16">
                        <FadeIn delay={0.2} className="bg-white/5 p-10 rounded-[2rem] border border-white/10">
                            <h3 className="text-xl font-bold text-[#C8A45D] mb-6 uppercase tracking-widest text-center">Incluye</h3>
                            <ul className="space-y-6">
                                {[
                                    "Ebook somático paso a paso",
                                    "Test de estado del sistema nervioso",
                                    "Ejercicios prácticos de estabilización"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-lg font-light">
                                        <CheckCircle2 className="w-6 h-6 text-[#C8A45D] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </FadeIn>

                        <FadeIn delay={0.4} className="bg-white/5 p-10 rounded-[2rem] border border-white/10">
                            <h3 className="text-xl font-bold text-[#C8A45D] mb-6 uppercase tracking-widest text-center">Beneficios</h3>
                            <ul className="space-y-6">
                                {[
                                    "Reducción de tensión corporal",
                                    "Mayor claridad mental",
                                    "Recuperación de sensación de seguridad",
                                    "Regulación del sistema nervioso",
                                    "Reconexión corporal"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-lg font-light">
                                        <Heart className="w-6 h-6 text-[#C8A45D] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 6. CTA FINAL */}
            <section className="py-32 bg-[#F5EFE6] relative text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <FadeIn>
                        <h2 className="text-4xl md:text-6xl font-heading text-[#1C1C1C] font-bold mb-10">
                            Accede ahora al proceso completo
                        </h2>
                        <Link
                            href="#registro"
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="inline-flex bg-[#1C1C1C] text-[#F5EFE6] px-12 py-6 rounded-2xl font-bold hover:bg-[#C8A45D] hover:text-[#1C1C1C] transition-all items-center justify-center gap-3 shadow-xl group text-xl"
                        >
                            Quiero recibir la guía
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="mt-6 text-[#1C1C1C]/60 font-medium">
                            Recibirás acceso inmediato por WhatsApp y correo.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* 7. DISCLAIMER */}
            <footer className="bg-white py-12 border-t border-stone-200">
                <div className="container mx-auto px-4 text-center max-w-2xl">
                    <AlertCircle className="w-8 h-8 text-[#1C1C1C]/30 mx-auto mb-4" />
                    <p className="text-sm text-[#1C1C1C]/50 leading-relaxed font-light">
                        <strong>Disclaimer:</strong> Este contenido es estrictamente educativo. No sustituye la atención médica o psicológica profesional. Si te encuentras en una crisis severa, por favor contacta a los servicios de emergencia o a un profesional de la salud en tu localidad.
                    </p>
                </div>
            </footer>
            
        </main>
    );
}
