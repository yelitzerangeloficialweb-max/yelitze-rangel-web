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
    Download,
    BookOpen,
    ListChecks,
    Wind
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/motion";
import { Turnstile } from '@marsidev/react-turnstile';

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

    const scrollToForm = (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById('registro')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen selection:bg-[#C67C6A] selection:text-[#3C3935]" style={{
            backgroundColor: '#F9F6F0', // Beige cálido
            '--color-gold': '#C67C6A',  // Dorado (Terracota)
            '--color-black': '#3C3935', // Negro suave (Gris oscuro)
            '--color-cream': '#FFFFFF', // Blanco crema
        } as React.CSSProperties}>

            {/* 1. HERO SECTION */}
            <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#F9F6F0]">
                <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-[#3C3935] mb-6 leading-[1.1] font-bold">
                            Si los últimos días te han dejado con el cuerpo en tensión, miedo o alerta constante… <span className="text-[#C67C6A] italic font-light">esto es para ti</span>
                        </h1>
                        <div className="space-y-4 text-lg font-body text-[#3C3935]/80 font-light leading-relaxed max-w-lg mb-8">
                            <p>
                                Después de los recientes sismos en Caracas y todo lo que todavía estamos viviendo como ciudad, es normal que muchas personas estén sintiendo cosas que no saben cómo explicar.
                            </p>
                            <p className="font-medium text-[#3C3935]">
                                Puede que estés intentando seguir con tu vida…<br/>
                                pero tu cuerpo no está igual.
                            </p>
                            <ul className="pl-4 space-y-2 mt-4 text-[#3C3935]/80">
                                <li>• Tal vez te cuesta dormir.</li>
                                <li>• Tal vez te sobresaltas fácilmente.</li>
                                <li>• Tal vez sientes ansiedad sin una razón clara.</li>
                                <li>• O simplemente notas que no puedes relajarte del todo.</li>
                            </ul>
                            <p className="font-medium text-[#C67C6A] mt-6 text-xl">
                                Si te pasa algo de esto, no estás solo/a.
                            </p>
                        </div>
                        <div className="bg-[#3C3935] text-[#F9F6F0] p-6 rounded-2xl mb-8 inline-block shadow-lg">
                            <p className="text-lg md:text-xl font-light italic">
                                "No es debilidad.<br/>Es tu sistema nervioso intentando protegerte."
                            </p>
                        </div>
                    </FadeIn>

                    <ScaleIn delay={0.2} className="relative w-full max-w-md mx-auto lg:ml-auto" id="registro">
                        <div className="bg-[#FCFBFA] p-8 md:p-10 rounded-[2rem] shadow-2xl border border-[#C67C6A]/20">
                            <h3 className="text-2xl font-heading font-bold text-[#3C3935] mb-6 text-center">
                                Comienza tu proceso aquí
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="text-xs font-bold text-[#3C3935]/60 uppercase tracking-widest mb-2 block ml-2">Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full bg-[#F9F6F0]/50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#C67C6A]/50 focus:border-[#C67C6A] transition-all outline-none text-[#3C3935]"
                                        placeholder="Tu nombre"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-[#3C3935]/60 uppercase tracking-widest mb-2 block ml-2">WhatsApp</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="w-full bg-[#F9F6F0]/50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#C67C6A]/50 focus:border-[#C67C6A] transition-all outline-none text-[#3C3935]"
                                        placeholder="+58 412 1234567"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-[#3C3935]/60 uppercase tracking-widest mb-2 block ml-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full bg-[#F9F6F0]/50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#C67C6A]/50 focus:border-[#C67C6A] transition-all outline-none text-[#3C3935]"
                                        placeholder="tu@correo.com"
                                        required
                                    />
                                </div>

                                <div className="flex justify-center mt-6">
                                    <Turnstile
                                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                                        onSuccess={(token) => setTurnstileToken(token)}
                                        options={{
                                            theme: 'light'
                                        }}
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#3C3935] text-[#F9F6F0] px-8 py-5 rounded-2xl font-bold hover:bg-[#C67C6A] hover:text-[#3C3935] transition-colors flex items-center justify-center gap-3 mt-6 shadow-lg group disabled:opacity-50 text-sm md:text-base"
                                >
                                    {isSubmitting ? "Procesando..." : "Quiero empezar a sentirme más tranquilo/a"}
                                    {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                </button>
                                <p className="text-center text-xs text-[#3C3935]/50 mt-4 flex justify-center items-center gap-2">
                                    <Download className="w-3 h-3" /> Incluye ebook, test y herramientas
                                </p>
                            </form>
                        </div>
                    </ScaleIn>
                </div>
            </section>

            {/* 2. BLOQUE 2 — VALIDACIÓN REAL */}
            <section className="py-24 bg-[#FCFBFA] relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-4xl">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading text-[#3C3935] font-bold mb-6">
                            Lo que muchas personas están sintiendo en estos días
                        </h2>
                        <p className="text-lg md:text-xl text-[#3C3935]/70 font-light leading-relaxed max-w-2xl mx-auto">
                            Después de eventos como los que hemos vivido recientemente, el cuerpo puede quedarse en un estado de alerta incluso cuando el peligro ya pasó.
                        </p>
                        <p className="text-lg text-[#3C3935]/70 font-light leading-relaxed mt-4">
                            Esto puede verse como:
                        </p>
                    </FadeIn>

                    <StaggerContainer className="grid sm:grid-cols-2 gap-6 mb-16">
                        {[
                            "Dificultad para dormir profundamente",
                            "Sensación de «no poder relajarse»",
                            "Tensión en el pecho, cuello o mandíbula",
                            "Pensamientos repetitivos sobre lo ocurrido",
                            "Sobresaltos con ruidos o movimientos",
                            "Sensación de inseguridad sin razón aparente",
                            "Cansancio mental constante"
                        ].map((item, i) => (
                            <StaggerItem key={i} className="flex items-start gap-4 bg-[#F9F6F0]/50 p-6 rounded-2xl border border-stone-100">
                                <div className="w-8 h-8 rounded-full bg-[#C67C6A]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                    <Activity className="w-4 h-4 text-[#C67C6A]" />
                                </div>
                                <p className="text-[#3C3935] font-medium leading-relaxed">{item}</p>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    <FadeIn className="text-center bg-[#F9F6F0] border-l-4 border-[#C67C6A] p-8 rounded-r-3xl shadow-sm max-w-2xl mx-auto">
                        <p className="text-xl font-bold text-[#3C3935] mb-2">No es que estés exagerando.</p>
                        <p className="text-lg font-light text-[#3C3935]/80">Es que tu cuerpo aún no ha terminado de procesar lo que vivió.</p>
                    </FadeIn>
                </div>
            </section>

            {/* 3. BLOQUE 3 — EXPLICACIÓN SIMPLE */}
            <section className="py-24 bg-[#3C3935] relative overflow-hidden text-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <FadeIn>
                        <Brain className="w-16 h-16 text-[#C67C6A] mx-auto mb-8 opacity-80" strokeWidth={1.5} />
                        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-10 leading-tight">
                            Tu cuerpo está funcionando como fue diseñado para sobrevivir
                        </h2>
                        <div className="space-y-6 text-lg md:text-xl text-[#F9F6F0]/80 font-light leading-relaxed max-w-2xl mx-auto">
                            <p>
                                Cuando vivimos algo que el sistema percibe como amenaza, el cuerpo activa un estado de protección.
                            </p>
                            <p>
                                Ese estado no siempre se apaga de inmediato.
                            </p>
                            <p>
                                A veces, aunque el evento ya haya pasado, el sistema nervioso sigue actuando como si aún hubiera riesgo.
                            </p>
                        </div>
                        <div className="mt-12 bg-[#FCFBFA]/5 p-8 rounded-3xl inline-block border border-white/10">
                            <p className="text-2xl font-light italic mb-2">No es un error.</p>
                            <p className="text-2xl font-bold text-[#C67C6A]">Es biología.</p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 4. BLOQUE 4 — PROPÓSITO DEL ESPACIO */}
            <section className="py-24 bg-[#F9F6F0] relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <h2 className="text-3xl md:text-4xl font-heading text-[#3C3935] font-bold mb-8 leading-tight">
                                Por eso creamos este espacio para acompañarte
                            </h2>
                            <div className="space-y-6 text-lg text-[#3C3935]/80 font-light leading-relaxed">
                                <p>
                                    No tienes que entender todo lo que te está pasando. <br/>
                                    <strong>Solo necesitas un punto de inicio.</strong>
                                </p>
                                <p>
                                    Aquí vas a encontrar herramientas simples para ayudarte a:
                                </p>
                                <ul className="space-y-4 mt-6">
                                    {[
                                        "Bajar la activación del cuerpo",
                                        "Recuperar sensación de seguridad interna",
                                        "Calmar la mente cuando se acelera",
                                        "Dormir mejor",
                                        "Volver poco a poco a la estabilidad"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#8BA393] flex-shrink-0" />
                                            <span className="font-medium text-[#3C3935]">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8 p-6 bg-[#FCFBFA] rounded-2xl border-l-4 border-[#8BA393] shadow-sm">
                                    <p className="text-[#3C3935] italic">
                                        "No es algo que tengas que hacer perfecto. Es algo que puedes ir haciendo a tu ritmo."
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                        <ScaleIn delay={0.2} className="relative hidden md:block">
                            <div className="aspect-[4/5] bg-[#FCFBFA] rounded-[2rem] p-8 shadow-xl relative flex items-center justify-center border border-stone-200">
                                <Heart className="w-32 h-32 text-[#C67C6A] opacity-20" strokeWidth={1} />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#F9F6F0]/50 to-transparent rounded-[2rem]"></div>
                            </div>
                        </ScaleIn>
                    </div>
                </div>
            </section>

            {/* 5. BLOQUE 5 — REGULACIÓN INMEDIATA */}
            <section className="py-24 bg-[#8BA393]/10 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-heading text-[#3C3935] font-bold mb-8">
                            Si ahora mismo te sientes activado/a, haz esto conmigo
                        </h2>
                        <p className="text-lg text-[#3C3935]/80 font-light mb-12">
                            Antes de seguir leyendo, solo prueba esto:
                        </p>
                        
                        <div className="bg-[#FCFBFA] p-8 md:p-12 rounded-3xl shadow-lg border border-[#8BA393]/20 mb-10">
                            <div className="space-y-8 text-xl text-[#3C3935] font-medium">
                                <div className="flex items-center justify-center gap-4">
                                    <Wind className="w-6 h-6 text-[#8BA393]" />
                                    <p>Inhala lento por la nariz durante <span className="font-bold text-[#8BA393]">4 segundos</span>.</p>
                                </div>
                                <div className="flex items-center justify-center gap-4">
                                    <Wind className="w-6 h-6 text-[#8BA393]" />
                                    <p>Exhala despacio durante <span className="font-bold text-[#8BA393]">6 a 8 segundos</span>.</p>
                                </div>
                                <div className="bg-[#F9F6F0] p-4 rounded-xl inline-block">
                                    <p className="text-lg text-[#C67C6A] font-bold">Repite 5 veces.</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-lg text-[#3C3935]/80 font-light mb-8">
                            Mientras lo haces, mira a tu alrededor y nota 3 cosas que puedas ver ahora mismo.
                        </p>
                        
                        <div className="text-lg font-light text-[#3C3935]/60 italic">
                            <p>No estás resolviendo nada.</p>
                            <p>Solo estás ayudando a tu cuerpo a bajar un poco la intensidad.</p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 6. BLOQUE 6 — RECURSOS */}
            <section className="py-24 bg-[#FCFBFA] relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <FadeIn>
                            <h2 className="text-3xl md:text-5xl font-heading text-[#3C3935] font-bold mb-6">
                                Todo lo que encontrarás dentro
                            </h2>
                        </FadeIn>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <BookOpen className="w-8 h-8 text-[#C67C6A]" />,
                                tag: "EBOOK",
                                title: "Venezuela en el Cuerpo",
                                desc: "Una guía sencilla para entender lo que tu cuerpo está sintiendo después de los eventos recientes y cómo empezar a regularlo.",
                                btn: "Descargar ebook"
                            },
                            {
                                icon: <ListChecks className="w-8 h-8 text-[#C67C6A]" />,
                                tag: "TEST SOMÁTICO",
                                title: "¿Cómo está tu cuerpo hoy?",
                                desc: "Un test corto que te ayuda a entender tu nivel de activación y qué tipo de regulación puedes necesitar ahora.",
                                btn: "Hacer test"
                            },
                            {
                                icon: <ShieldCheck className="w-8 h-8 text-[#C67C6A]" />,
                                tag: "HERRAMIENTAS",
                                title: "7 Técnicas para Cortar la Ansiedad",
                                desc: "Acciones simples que puedes usar en cualquier momento cuando sientas ansiedad, tensión o bloqueo.",
                                btn: "Ver herramientas"
                            }
                        ].map((card, i) => (
                            <FadeIn key={i} delay={i * 0.1} className="bg-[#F9F6F0] p-8 rounded-3xl border border-stone-200 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                                <div className="mb-6">{card.icon}</div>
                                <span className="text-xs font-bold text-[#8BA393] tracking-widest uppercase mb-2">{card.tag}</span>
                                <h3 className="text-2xl font-bold text-[#3C3935] mb-4">{card.title}</h3>
                                <p className="text-[#3C3935]/70 font-light leading-relaxed mb-8 flex-grow">
                                    {card.desc}
                                </p>
                                <button 
                                    onClick={scrollToForm}
                                    className="text-[#C67C6A] font-bold text-left hover:text-[#3C3935] transition-colors flex items-center gap-2"
                                >
                                    {card.btn} <ArrowRight className="w-4 h-4" />
                                </button>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. BLOQUE 7 — VALIDACIÓN PROFUNDA & CTA */}
            <section className="py-32 bg-[#3C3935] text-[#F9F6F0] relative text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-heading font-light mb-10 leading-relaxed italic">
                            "Si en estos días sientes que no eres el mismo de antes, es normal."
                        </h2>
                        <div className="space-y-6 text-lg md:text-xl font-light text-[#F9F6F0]/80 mb-16">
                            <p>El cuerpo guarda experiencias que la mente aún no logra ordenar.</p>
                            <p>Y después de situaciones como las que hemos vivido, es completamente humano necesitar tiempo para volver a sentirse estable.</p>
                            <p className="font-medium text-[#C67C6A] mt-8 pt-4">
                                No tienes que forzarte a estar bien.<br/>
                                Solo acompañarte un poco mejor.
                            </p>
                        </div>
                        
                        <div className="bg-[#FCFBFA]/5 p-10 rounded-[2rem] border border-white/10">
                            <h3 className="text-2xl font-bold mb-8">
                                Si quieres, podemos acompañarte en este proceso
                            </h3>
                            <button
                                onClick={scrollToForm}
                                className="inline-flex w-full md:w-auto bg-[#C67C6A] text-[#3C3935] px-12 py-6 rounded-2xl font-bold hover:bg-[#F9F6F0] transition-all items-center justify-center gap-3 shadow-xl group text-xl"
                            >
                                Empezar mi proceso de regulación
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 8. DISCLAIMER */}
            <footer className="bg-[#FCFBFA] py-12 border-t border-stone-200">
                <div className="container mx-auto px-4 text-center max-w-2xl">
                    <AlertCircle className="w-8 h-8 text-[#3C3935]/30 mx-auto mb-4" />
                    <p className="text-sm text-[#3C3935]/50 leading-relaxed font-light">
                        <strong>Disclaimer:</strong> Este contenido es estrictamente educativo. No sustituye la atención médica o psicológica profesional. Si te encuentras en una crisis severa, por favor contacta a los servicios de emergencia o a un profesional de la salud en tu localidad.
                    </p>
                </div>
            </footer>
            
        </main>
    );
}
