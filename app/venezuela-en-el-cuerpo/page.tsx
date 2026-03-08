"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight, CheckCircle2, ShieldCheck,
    MessageCircle, ChevronDown, User, Star,
    Target, BookOpen, QrCode, TrendingUp,
    AlertCircle, Sparkles, Heart, Activity,
    Zap, BatteryMedium, Brain, Repeat
} from "lucide-react";
import { useState } from "react";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/motion";

export default function VenezuelaEnElCuerpoPage() {
    const [submitted, setSubmitted] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen selection:bg-[#D4AA50] selection:text-white" style={{
            backgroundColor: '#FFFFFF', // Clean white
            '--color-terracotta': '#D4AA50', // Golden accent
            '--color-earth': '#5A5A5A',      // Medium Gray text
            '--color-forest': '#2D2926',     // Dark Gray/Black heading
            '--color-cream': '#FFFFFF',      // White
            '--color-accent-ocre': '#E8B854' // Light Gold
        } as React.CSSProperties}>

            {/* 1. HERO (ATENCIÓN) */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#F7F3F0]">
                <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <FadeIn>
                        <span className="text-[#C05C3F] font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
                            Evento de Registro Gratuito
                        </span>
                        <h2 className="text-2xl md:text-3xl font-body text-[#3D4D3D] mb-4 font-semibold leading-snug">
                            Tu ansiedad no es el problema, es la solución que tu cuerpo encontró
                        </h2>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading text-[#3D4D3D] mb-6 leading-[1.1] font-bold">
                            Venezuela en el Cuerpo
                        </h1>
                        <p className="text-[#C05C3F] text-lg font-medium mb-6 max-w-xl">
                            Una propuesta terapéutica para regular, integrar y abrir nuevas posibilidades
                        </p>
                        <p className="text-[#7A5C43] text-lg font-light mb-10 max-w-xl leading-relaxed">
                            Esto no es solo una conferencia. Es una experiencia de regulación. Es un espacio seguro para comprender lo que el cuerpo guarda y para ampliar nuestra capacidad de bienestar.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link
                                href="#registro"
                                className="bg-[#C05C3F] text-white px-10 py-5 rounded-full font-bold shadow-xl hover:bg-[#A84A2F] transition-all flex items-center justify-center gap-3 group"
                            >
                                Generar mi Pase QR y Enviar Test
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </FadeIn>

                    <ScaleIn delay={0.2} className="relative aspect-[4/5] lg:aspect-square">
                        <div className="absolute inset-0 border-2 border-[#D4A373]/20 rounded-[3rem] -rotate-6 scale-95" />
                        <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                            <Image
                                src="/assets/images/venezuela/hero-bg.jpg"
                                alt="Venezuela en el Cuerpo"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#3D4D3D]/40 to-transparent" />
                        </div>
                    </ScaleIn>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#C05C3F]/5 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#3D4D3D]/5 rounded-full blur-[120px] -z-10" />
            </section>

            {/* 2. SEGMENTACIÓN */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-4 max-w-6xl">
                    <FadeIn className="mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading text-[#2D2926] font-bold mb-6">
                            ¿Por qué nuestro cuerpo?
                        </h2>
                        <p className="text-[#5A5A5A] text-lg font-light leading-relaxed max-w-4xl">
                            Cuando una emoción no puede expresarse en su momento, el cuerpo la almacena como tensión o bloqueo. Con el tiempo, esto puede manifestarse de diversas formas.
                        </p>
                    </FadeIn>

                    <StaggerContainer className="flex flex-wrap justify-center gap-x-6 gap-y-12">
                        {[
                            {
                                icon: Target,
                                title: "Ansiedad",
                                desc: "Estado de alerta constante y anticipación del peligro"
                            },
                            {
                                icon: Zap,
                                title: "Estrés",
                                desc: "Tensión acumulada que afecta el funcionamiento diario"
                            },
                            {
                                icon: BatteryMedium,
                                title: "Cansancio",
                                desc: "Fatiga profunda que no se alivia con descanso"
                            },
                            {
                                icon: Brain,
                                title: "Dolor físico",
                                desc: "Manifestaciones somáticas de tensiones no resueltas"
                            },
                            {
                                icon: Repeat,
                                title: "Reacciones automáticas",
                                desc: "Respuestas rápidas e involuntarias ante estímulos"
                            }
                        ].map((item, i) => (
                            <StaggerItem key={i} className="flex-1 min-w-[300px] max-w-[380px] bg-white px-8 pb-8 pt-10 rounded-xl border border-stone-200 shadow-sm relative mt-6 hover:shadow-lg transition-shadow">
                                {/* Top Golden Border */}
                                <div className="absolute top-0 left-0 right-0 h-[6px] bg-gradient-to-r from-[#E8B854] to-[#D4AA50] rounded-t-xl" />

                                {/* Icon Overlay */}
                                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-b from-[#E8B854] to-[#D4AA50] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                                    <item.icon className="w-5 h-5 text-white stroke-[2.5]" />
                                </div>

                                <h3 className="text-xl font-heading text-[#2D2926] mb-3 font-bold mt-2">{item.title}</h3>
                                <p className="text-[#5A5A5A] font-light text-[15px] leading-relaxed">{item.desc}</p>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 3. EL PROBLEMA (AGITACIÓN) */}
            <section className="py-24 bg-[#3D4D3D] text-[#F7F3F0] relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/assets/images/noise.png')] pointer-events-none" />
                <div className="container mx-auto px-4 max-w-4xl relative z-10">
                    <FadeIn className="text-center">
                        <h2 className="text-4xl lg:text-5xl font-heading mb-12 italic font-light">
                            Vivir en <span className="text-[#D4A373] font-bold">modo supervivencia</span> no es vivir, es resistir mientras te consumes.
                        </h2>
                        <div className="space-y-8 text-xl text-[#F7F3F0]/80 font-light leading-relaxed">
                            <p>
                                El cuerpo humano está diseñado para protegerse del peligro, pero no para vivir en él indefinidamente. Cuando el "modo alerta" se vuelve tu estado permanente, tu cerebro desconecta la creatividad y la visión de futuro para priorizar la respiración básica.
                            </p>
                            <p>
                                Por eso, por más que leas sobre finanzas o planificación, si tu sistema nervioso sigue sintiéndose en "ruina", siempre saboteará tus intentos de progreso. Sanar el cuerpo es la premisa básica para reconstruir la economía.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 4. BIOGRAFÍA (YELITZE RANGEL) */}
            <section className="py-32 bg-[#F7F3F0]">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <FadeIn>
                                <div className="relative aspect-[3/4] w-full rounded-tr-[120px] rounded-bl-[120px] rounded-tl-none rounded-br-none overflow-hidden shadow-2xl border-x-4 border-t-4 border-white">
                                    <Image
                                        src="/assets/images/yelitze/manifesto-new.jpg"
                                        alt="Yelitze Rangel"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#7A5C43]/40 to-transparent" />
                                </div>
                                <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-xl border border-[#F7F3F0]">
                                    <p className="text-[#C05C3F] text-4xl font-bold font-heading">+8000</p>
                                    <p className="text-[#7A5C43] text-sm font-bold uppercase tracking-widest">Vidas Impactadas</p>
                                </div>
                            </FadeIn>
                        </div>

                        <div className="space-y-8">
                            <FadeIn>
                                <span className="text-[#C05C3F] font-bold tracking-[0.4em] uppercase text-xs mb-6 block">Tu Guía en este Proceso</span>
                                <h2 className="text-4xl lg:text-6xl font-heading text-[#3D4D3D] mb-8 font-bold italic">Yelitze Rangel</h2>
                                <div className="w-24 h-px bg-[#C05C3F]/30 mb-8" />
                                <div className="space-y-6 text-lg text-[#7A5C43] font-light leading-relaxed">
                                    <p>
                                        Psicóloga y especialista en <strong>Trauma Somático</strong>. Durante años he estudiado cómo las crisis sociales se graban en la fascia y el sistema nervioso de quienes las habitan.
                                    </p>
                                    <p>
                                        Mi trabajo es devolverle al cuerpo la sensación de seguridad necesaria para que la mente pueda volver a soñar, planificar y ejecutar con éxito.
                                    </p>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. LA SOLUCIÓN (EL HITO) */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-4 max-w-5xl text-center">
                    <FadeIn>
                        <h2 className="text-[#7A5C43] font-bold tracking-[0.4em] uppercase text-xs mb-8">El Método</h2>
                        <h3 className="text-4xl lg:text-7xl font-heading text-[#3D4D3D] mb-12 font-bold leading-tight">
                            Arquitectura <span className="text-[#C05C3F]">Intencional</span>
                        </h3>
                        <p className="text-2xl text-[#7A5C43] font-light max-w-3xl mx-auto italic mb-20">
                            Dejamos de reaccionar al entorno para empezar a diseñar nuestra respuesta interna.
                        </p>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 gap-8 items-stretch">
                        <FadeIn delay={0.2} className="flex-1 bg-[#F7F3F0] p-12 rounded-[3.5rem] border border-[#7A5C43]/10 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 -scale-x-100 group-hover:scale-x-110 transition-transform">
                                <AlertCircle className="w-32 h-32" />
                            </div>
                            <h4 className="text-6xl font-heading text-[#C05C3F]/20 mb-6 font-bold">01</h4>
                            <h5 className="text-2xl font-bold text-[#3D4D3D] mb-6">Estado de Supervivencia</h5>
                            <p className="text-[#7A5C43] font-light">Cuerpos tensos, mentes nubladas, decisiones basadas en el miedo al hoy.</p>
                        </FadeIn>

                        <FadeIn delay={0.4} className="flex-1 bg-[#3D4D3D] p-12 rounded-[3.5rem] text-white relative group overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                <Sparkles className="w-32 h-32" />
                            </div>
                            <h4 className="text-6xl font-heading text-[#D4A373]/20 mb-6 font-bold">02</h4>
                            <h5 className="text-2xl font-bold text-[#D4A373] mb-6">Arquitectura Intencional</h5>
                            <p className="text-stone-300 font-light">Sistemas regulados, visión de largo plazo y capacidad real de crear abundancia.</p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 6. ENTREGABLES */}
            <section className="py-32 bg-[#F7F3F0]">
                <div className="container mx-auto px-4">
                    <FadeIn className="text-center mb-20">
                        <h2 className="text-4xl lg:text-5xl font-heading text-[#3D4D3D] font-bold">Lo que recibirás gratis</h2>
                    </FadeIn>

                    <StaggerContainer className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {[
                            {
                                icon: QrCode,
                                title: "Pase de Acceso QR",
                                desc: "Tu entrada personal e intransferible para el evento digital en vivo."
                            },
                            {
                                icon: CheckCircle2,
                                title: "Test de Percepción",
                                desc: "Un diagnóstico corporal para identificar tu nivel de estrés somático."
                            },
                            {
                                icon: BookOpen,
                                title: "eBook Digital",
                                desc: "Herramientas de regulación inmediata para aplicar desde casa."
                            }
                        ].map((item, i) => (
                            <StaggerItem key={i} className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border border-[#7A5C43]/5 mb-8 group hover:scale-110 transition-transform">
                                    <item.icon className="w-10 h-10 text-[#C05C3F]" />
                                </div>
                                <h4 className="text-2xl font-heading text-[#3D4D3D] mb-4 font-bold">{item.title}</h4>
                                <p className="text-[#7A5C43] font-light leading-relaxed">{item.desc}</p>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 7. OFERTA */}
            <section className="py-16 bg-white border-y border-[#7A5C43]/10">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <div className="inline-block bg-[#C05C3F]/10 px-8 py-3 rounded-full border border-[#C05C3F]/20 mb-6 font-bold">
                            <span className="text-[#C05C3F] italic mr-2">Oportunidad Única:</span>
                            <span className="text-[#3D4D3D] uppercase tracking-widest text-sm">Acceso Gratuito por tiempo limitado</span>
                        </div>
                        <p className="text-2xl text-[#7A5C43] font-light italic">
                            Valor Real del Contenido: <span className="line-through opacity-40">$120 USD</span>
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* 8. PRUEBA SOCIAL */}
            <section className="py-32 bg-[#F7F3F0] overflow-hidden">
                <div className="container mx-auto px-4">
                    <FadeIn className="text-center mb-20">
                        <h2 className="text-4xl lg:text-5xl font-heading text-[#3D4D3D] font-bold">Resultados Reales</h2>
                        <p className="text-[#7A5C43] mt-4 font-light italic">De quienes ya habitan una nueva soberanía corporal.</p>
                    </FadeIn>

                    <StaggerContainer className="flex gap-8 overflow-x-auto pb-12 snap-x hide-scrollbar">
                        {[
                            {
                                name: "Maria Elena G.",
                                role: "Emprendedora",
                                text: "Pensé que el estrés era normal. Cuando regulé mi cuerpo, por fin pude tomar decisiones financieras claras sin ansiedad."
                            },
                            {
                                name: "Carlos J.",
                                role: "Consultor",
                                text: "La metodología de Yelitze me devolvió la capacidad de dormir y producir. Mi negocio creció un 40% simplemente porque yo ya no estaba en alerta."
                            },
                            {
                                name: "Susana R.",
                                role: "Líder Social",
                                text: "Entendí que mi rabia por el país estaba congelada en mis hombros. Soltar eso fue mi verdadera libertad."
                            }
                        ].map((item, i) => (
                            <StaggerItem key={i} className="min-w-[320px] md:min-w-[450px] bg-white p-12 rounded-[3.5rem] shadow-xl border border-stone-100 snap-center">
                                <div className="flex gap-1 mb-8">
                                    {[1, 2, 3, 4, 5].map(v => <Star key={v} className="w-5 h-5 fill-[#D4A373] text-[#D4A373]" />)}
                                </div>
                                <p className="text-xl text-[#3D4D3D] mb-8 font-light italic leading-relaxed">"{item.text}"</p>
                                <div className="flex items-center gap-4 border-t border-stone-100 pt-8">
                                    <div className="w-12 h-12 bg-[#D4A373] rounded-full flex items-center justify-center text-white font-bold">
                                        {item.name[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#3D4D3D]">{item.name}</p>
                                        <p className="text-xs text-[#7A5C43] uppercase tracking-widest font-bold">{item.role}</p>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 9. GARANTÍA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <FadeIn className="flex flex-col items-center">
                        <ShieldCheck className="w-20 h-20 text-[#3D4D3D] mb-8 opacity-60" />
                        <h2 className="text-2xl font-bold text-[#3D4D3D] mb-6">Metodología Científica</h2>
                        <p className="text-lg text-[#7A5C43] font-light leading-relaxed italic">
                            Todas las dinámicas están fundamentadas en la <strong>Teoría Polivagal</strong> y el estudio del Sistema Nervioso Central. No es una charla motivacional; es un entrenamiento biológico.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* 10. FAQ */}
            <section className="py-32 bg-[#F7F3F0]">
                <div className="container mx-auto px-4 max-w-4xl">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl font-heading text-[#3D4D3D] font-bold">Preguntas Frecuentes</h2>
                    </FadeIn>

                    <div className="space-y-4">
                        {[
                            {
                                q: "¿Cómo obtengo mi Pase QR?",
                                a: "Al completar el formulario de registro al final de esta página, el sistema generará automáticamente tu pase único y lo recibirás en tu correo y WhatsApp."
                            },
                            {
                                q: "¿Este evento tiene propósitos políticos?",
                                a: "No. Venezuela en el Cuerpo es una iniciativa estrictamente terapéutica y de sanación somática. El enfoque es el impacto individual del entorno social en el sistema nervioso."
                            },
                            {
                                q: "¿Qué costo tiene?",
                                a: "Este evento es 100% gratuito. Mi intención es facilitar el acceso a estas herramientas de regulación a la mayor cantidad de personas posible."
                            },
                            {
                                q: "¿Tengo que estar en Venezuela para participar?",
                                a: "No. El evento es digital y está abierto a venezolanos en cualquier parte del mundo (y a cualquier persona que sienta que el entorno social ha impactado su cuerpo)."
                            }
                        ].map((item, i) => (
                            <FadeIn key={i}>
                                <div className="border border-[#7A5C43]/10 bg-white rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                                    <button
                                        onClick={() => toggleFaq(i)}
                                        className="w-full px-8 py-6 flex items-center justify-between text-left group"
                                    >
                                        <span className="text-lg font-bold text-[#3D4D3D]">{item.q}</span>
                                        <ChevronDown className={`w-5 h-5 text-[#C05C3F] transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                                    </button>
                                    <div className={`transition-all duration-300 ease-in-out ${openFaq === i ? "max-h-48 opacity-100 p-8 pt-0" : "max-h-0 opacity-0 overflow-hidden"}`}>
                                        <p className="text-[#7A5C43] font-light leading-relaxed">{item.a}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 11. FOOTER (FORMULARIO) */}
            <section id="registro" className="py-40 bg-[#3D4D3D] text-white overflow-hidden relative">
                {/* Visual Cue for QR */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#D4A373] to-transparent" />

                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <FadeIn>
                            <h2 className="text-4xl lg:text-6xl font-heading mb-8 font-bold italic leading-tight">
                                Tu nueva seguridad <br /> corporal comienza <span className="text-[#D4A373]">aquí.</span>
                            </h2>
                            <p className="text- stone-300 text-xl font-light mb-12 opacity-80 leading-relaxed">
                                Regístrate hoy y conviértete en el arquitecto de tu propia regulación. Al enviar tus datos, recibirás tu Pase QR de Acceso inmediato.
                            </p>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-4 opacity-60">
                                    <div className="w-10 h-10 border border-[#D4A373]/30 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-[#D4A373]" />
                                    </div>
                                    <p className="text-sm tracking-widest uppercase font-bold">Compromiso de Privacidad</p>
                                </div>
                                <div className="flex items-center gap-4 opacity-60">
                                    <div className="w-10 h-10 border border-[#D4A373]/30 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-[#D4A373]" />
                                    </div>
                                    <p className="text-sm tracking-widest uppercase font-bold">Contenido Certificado</p>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.3} className="bg-[#F7F3F0] p-10 lg:p-14 rounded-[4rem] text-[#3D4D3D] shadow-2xl relative min-h-[500px] flex flex-col justify-center">
                            {!submitted ? (
                                <>
                                    {/* Form Header */}
                                    <div className="flex items-center gap-6 mb-12">
                                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-lg border border-stone-100">
                                            <QrCode className="w-10 h-10 text-[#C05C3F]" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C05C3F] mb-1">Paso Final</p>
                                            <h4 className="text-2xl font-bold font-heading">Registro Oficial</h4>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="text-xs font-bold text-[#7A5C43] uppercase tracking-widest mb-3 block ml-2">Nombre Completo</label>
                                            <input
                                                type="text"
                                                className="w-full bg-white border border-stone-200 rounded-3xl px-8 py-5 focus:ring-2 focus:ring-[#C05C3F]/20 focus:border-[#C05C3F] transition-all outline-none"
                                                placeholder="Tu nombre aquí"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-[#7A5C43] uppercase tracking-widest mb-3 block ml-2">Email Principal</label>
                                            <input
                                                type="email"
                                                className="w-full bg-white border border-stone-200 rounded-3xl px-8 py-5 focus:ring-2 focus:ring-[#C05C3F]/20 focus:border-[#C05C3F] transition-all outline-none"
                                                placeholder="tu@email.com"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-[#7A5C43] uppercase tracking-widest mb-3 block ml-2">WhatsApp</label>
                                            <input
                                                type="tel"
                                                className="w-full bg-white border border-stone-200 rounded-3xl px-8 py-5 focus:ring-2 focus:ring-[#C05C3F]/20 focus:border-[#C05C3F] transition-all outline-none"
                                                placeholder="+58 ..."
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-[#C05C3F] text-white py-6 rounded-3xl font-bold text-lg shadow-xl hover:bg-[#A84A2F] transition-all transform hover:-translate-y-1 mt-6 flex items-center justify-center gap-4 group"
                                        >
                                            Generar mi Pase QR y Enviar Test
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </form>

                                    <p className="text-center mt-8 text-[10px] text-[#7A5C43] uppercase tracking-widest font-bold opacity-60">
                                        Al registrarte aceptas nuestra política de privacidad
                                    </p>
                                </>
                            ) : (
                                <FadeIn className="text-center">
                                    <div className="flex flex-col items-center">
                                        <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-[#3D4D3D] mb-8 scale-110">
                                            <QrCode className="w-40 h-40 text-[#3D4D3D]" />
                                            <div className="mt-4 pt-4 border-t border-stone-100">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#C05C3F]">Pase Personalizado</p>
                                                <p className="text-xs font-bold text-[#3D4D3D]">VENEZUELA-2026-REG</p>
                                            </div>
                                        </div>
                                        <h4 className="text-3xl font-bold font-heading text-[#3D4D3D] mb-4">¡Registro Exitoso!</h4>
                                        <p className="text-[#7A5C43] font-light leading-relaxed mb-8">
                                            Tu Pase QR ha sido generado. También hemos enviado el Test de Percepción y tu eBook a tu correo electrónico.
                                        </p>
                                        <button
                                            onClick={() => window.print()}
                                            className="flex items-center gap-2 text-[#C05C3F] font-bold uppercase tracking-widest text-sm hover:opacity-70 transition-opacity"
                                        >
                                            Descargar Pase QR <CheckCircle2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </FadeIn>
                            )}
                        </FadeIn>
                    </div>
                </div>

                {/* Final Credits */}
                <div className="container mx-auto px-4 mt-32 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
                    &copy; 2026 Yelitze Rangel. Todos los derechos reservados. | Desarrollado por Kick-Off Development | Diseñado por Digital Marketing DMK
                    <div className="flex gap-8">
                        <Heart className="w-4 h-4" />
                        <Sparkles className="w-4 h-4" />
                        <ShieldCheck className="w-4 h-4" />
                    </div>
                </div>
            </section>

        </main>
    );
}
