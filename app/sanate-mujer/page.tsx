"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { FormEvent } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp, X, Heart, Activity, ShieldAlert, Sparkles, Play, Clock } from 'lucide-react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useEffect, useState as useHookState } from 'react';
import { SacredGeometry, FloatingStars, ThinGoldenLine, WaveDivider } from "@/components/ui/MysticalElements";

const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeInOut"
        }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

export default function SanateMujerLanding() {
    return (
        <main className="w-full relative selection:bg-[#B8835A]/30">
            {/* Global background - Marble texture slightly visible throughout, overridden by sections */}
            <div className="fixed inset-0 z-[-1] opacity-[0.2] pointer-events-none">
                <Image
                    src="/assets/images/landing/marble-bg.png"
                    alt="Marble Texture"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Venezuela Lines in the Body */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]">
                <SacredGeometry className="top-[10%] right-[-10%] w-[600px] h-[600px]" />
                <ThinGoldenLine d="M0,100 Q250,250 500,100 T1000,100" className="top-20 left-0 w-full h-64" />
                <ThinGoldenLine d="M0,200 Q300,0 600,200 T1200,200" className="bottom-20 right-0 w-full h-96" />
                <FloatingStars count={30} />
            </div>

            {/* SECTION 0: TOP STICKY BANNER */}
            <TopStickyBanner />

            {/* SECTION 1: HERO SECTION */}
            <HeroSection />

            {/* SECTION 1.5: TRUST BAR */}
            <TrustBar />

            {/* SECTION 2: SOCIAL PROOF */}
            <SocialProofSection />

            {/* SECTION 2.5: SEGMENTATION */}
            <SegmentationSection />

            {/* SECTION 3: THE UNIQUE MECHANISM */}
            <MechanismSection />

            {/* SECTION 4: STORYTELLING AND AUTHORITY */}
            <StorytellingSection />

            {/* SECTION 5: THE OFFER */}
            <OfferSection />

            {/* SECTION 7: FAQ */}
            <FaqSection />

            {/* SECTION 7: FOOTER */}
            <FooterSection />
        </main>
    );
}

// ---------------------------------------------------------
// TOP STICKY BANNER COMPONENT
// ---------------------------------------------------------
function TopStickyBanner() {
    const targetDate = new Date('2026-05-22T00:00:00').getTime();
    const [timeLeft, setTimeLeft] = useHookState({
        days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                setTimeLeft(prev => ({ ...prev, isExpired: true }));
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
                isExpired: false
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (timeLeft.isExpired) return null;

    return (
        <div className="sticky top-0 z-[100] w-full bg-[#B8835A] text-white py-3 shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 relative z-10">
                <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase whitespace-nowrap">
                        OFERTA DE LANZAMIENTO DISPONIBLE:
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center">
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase whitespace-nowrap mr-4">
                            CIERRA EN:
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-bold leading-none tabular-nums">{timeLeft.days.toString().padStart(2, '0')}</span>
                        <span className="text-[8px] uppercase tracking-widest font-bold opacity-70">Días</span>
                    </div>
                    <span className="text-xl font-bold opacity-30">:</span>
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-bold leading-none tabular-nums">{timeLeft.hours.toString().padStart(2, '0')}</span>
                        <span className="text-[8px] uppercase tracking-widest font-bold opacity-70">Hrs</span>
                    </div>
                    <span className="text-xl font-bold opacity-30">:</span>
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-bold leading-none tabular-nums">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                        <span className="text-[8px] uppercase tracking-widest font-bold opacity-70">Min</span>
                    </div>
                    <span className="text-xl font-bold opacity-30">:</span>
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-bold leading-none tabular-nums">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                        <span className="text-[8px] uppercase tracking-widest font-bold opacity-70">Seg</span>
                    </div>
                </div>

                <div className="hidden lg:flex items-center gap-3 bg-white/20 px-4 py-1 rounded-full border border-white/30">
                    <CheckCircle2 className="w-3 h-3" />
                    <span className="text-[9px] font-bold tracking-widest uppercase">Cupos Limitados</span>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------
// REGISTRATION FORM COMPONENT (Used in Hero)
// ---------------------------------------------------------
function RegistrationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const form = e.target as HTMLFormElement;
        const formData = {
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
            whatsapp: (form.elements.namedItem('whatsapp') as HTMLInputElement).value,
        };

        try {
            const response = await fetch('/api/sanate-mujer/registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSuccess(true);
            } else {
                const data = await response.json();
                setError(data.error || 'Algo salió mal. Por favor intenta de nuevo.');
            }
        } catch (err) {
            setError('Error de conexión. Por favor intenta de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-2xl border border-[#B8835A]/30 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#B8835A] to-[#D4A373]"></div>
                    
                    <div className="w-20 h-20 bg-[#F5EFE6] rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-[#B8835A]" />
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-heading font-medium text-[#2D2926] mb-4">¡Tu cupo está reservado!</h3>
                    
                    <p className="text-[#2D2926]/70 leading-relaxed mb-8">
                        Felicidades por dar este paso. Te hemos enviado los detalles a tu correo. <br />
                        <span className="font-bold text-[#2D2926]">¡Pero espera! Falta el paso más importante:</span>
                    </p>

                    <div className="bg-[#B8835A]/5 rounded-2xl p-6 border border-[#B8835A]/20 space-y-6">
                        <p className="text-sm font-medium text-[#B8835A] uppercase tracking-widest">
                            Únete al Grupo de WhatsApp VIP
                        </p>
                        <p className="text-xs text-[#2D2926]/60">
                            Por este medio enviaremos los recordatorios, el Workbook exclusivo y el enlace para la sesión en vivo.
                        </p>
                        
                        <a 
                            href="https://chat.whatsapp.com/TU_GRUPO_AQUÍ" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 inline-flex items-center justify-center gap-3 font-bold uppercase tracking-wider text-sm"
                        >
                            UNIRME AL GRUPO DE WHATSAPP
                            <Play className="w-4 h-4 fill-current" />
                        </a>
                    </div>

                    <p className="mt-8 text-[10px] text-[#2D2926]/40 uppercase tracking-widest font-bold">
                        Nos vemos pronto en el workshop
                    </p>
                </motion.div>
            </AnimatePresence>
        );
    }

    return (
        <div className="flex flex-col items-center w-full">
            <form onSubmit={handleSubmit} className="w-full bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-2xl border border-[#B8835A]/30 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#B8835A] to-transparent opacity-50"></div>

                <div className="mb-8 text-center">
                    <h3 className="text-2xl font-heading text-[#2D2926] mb-2">Reserva tu Cupo</h3>
                    <p className="text-xs text-[#2D2926]/60 uppercase tracking-widest font-bold">Inmersión Online Gratuita</p>
                </div>

                <div className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium border border-red-100 flex items-center gap-3">
                            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D2926]/60 mb-2">Nombre Completo</label>
                        <input
                            type="text"
                            id="name"
                            required
                            className="w-full bg-[#F5EFE6]/30 border border-[#B8835A]/20 rounded-xl px-5 py-4 text-[#2D2926] placeholder-[#2D2926]/30 focus:outline-none focus:ring-2 focus:ring-[#B8835A]/30 transition-all font-medium"
                            placeholder="Tu nombre aquí..."
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D2926]/60 mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            required
                            className="w-full bg-[#F5EFE6]/30 border border-[#B8835A]/20 rounded-xl px-5 py-4 text-[#2D2926] placeholder-[#2D2926]/30 focus:outline-none focus:ring-2 focus:ring-[#B8835A]/30 transition-all font-medium"
                            placeholder="tu@correo.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="whatsapp" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D2926]/60 mb-2">WhatsApp</label>
                        <input
                            type="tel"
                            id="whatsapp"
                            required
                            className="w-full bg-[#F5EFE6]/30 border border-[#B8835A]/20 rounded-xl px-5 py-4 text-[#2D2926] placeholder-[#2D2926]/30 focus:outline-none focus:ring-2 focus:ring-[#B8835A]/30 transition-all font-medium"
                            placeholder="+1 234 567 8900"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#B8835A] hover:bg-[#a0724e] text-white py-5 rounded-xl shadow-[0_10px_30px_rgba(184,131,90,0.2)] transition-all transform hover:-translate-y-1 mt-4 group flex items-center justify-center gap-3 relative overflow-hidden"
                    >
                        <span className="relative z-10 font-bold tracking-[0.1em] uppercase text-sm">
                            {isSubmitting ? 'Procesando...' : 'QUIERO MI CUPO GRATUITO'}
                        </span>
                        {!isSubmitting && <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />}
                    </button>

                    <div className="flex items-center justify-center gap-4 pt-4 border-t border-[#B8835A]/10">
                        <div className="flex -space-x-2">
                             {[1,2,3].map(i => (
                                 <div key={i} className="w-6 h-6 rounded-full bg-[#F5EFE6] border border-white flex items-center justify-center text-[8px] font-bold text-[#B8835A]">
                                     {i}
                                 </div>
                             ))}
                        </div>
                        <p className="text-[10px] text-[#2D2926]/50 font-bold uppercase tracking-widest">
                            Cupos limitados esta semana
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}

// ---------------------------------------------------------
// TRUST BAR COMPONENT
// ---------------------------------------------------------
function TrustBar() {
    const categories = [
        'Psicología Integrativa',
        'Sabiduría Ancestral',
        'Trauma Informed',
        'Tanatología',
        'Coaching Energético'
    ];

    return (
        <section className="py-8 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10 border-y border-[#B8835A]/20 py-6">
                <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-60">
                    <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#B8835A] w-full text-center mb-2 md:mb-0 md:w-auto">
                        Avalado por:
                    </span>
                    {categories.map((name, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <span className="text-[#2D2926] text-[10px] font-bold tracking-widest uppercase whitespace-nowrap">
                                {name}
                            </span>
                            {index < categories.length - 1 && (
                                <div className="hidden md:block w-1 h-1 rounded-full bg-[#B8835A]/30"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <ThinGoldenLine d="M0,50 Q500,150 1000,50" className="top-0 left-0 w-full h-32 opacity-5" />
        </section>
    );
}

// ---------------------------------------------------------
// SECTIONS
// ---------------------------------------------------------

function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center py-20 px-4 overflow-hidden bg-white/40">
            <ThinGoldenLine d="M0,100 Q250,250 500,100 T1000,100" className="top-20 left-0 w-full h-64 opacity-20" />
            <div className="container mx-auto max-w-7xl relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-8 items-center mt-12 lg:mt-0">
                {/* Left Column: Copy */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="space-y-8 lg:pr-12 text-center lg:text-left"
                >
                    <motion.div variants={fadeUpVariant}>
                        <span className="inline-block text-[#B8835A] font-bold tracking-[0.4em] uppercase text-xs md:text-sm mb-6 border border-[#B8835A]/30 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm shadow-sm">
                            WORKSHOP GRATUITO: SÁNATE MUJER
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-heading font-medium text-[#2D2926] leading-[1.1] mb-8">
                            Libera las <span className="text-[#B8835A] italic">lealtades invisibles</span> que detienen tu vida.
                        </h1>
                        <p className="text-lg md:text-xl text-[#2D2926]/80 leading-relaxed font-light">
                            ¿Sientes que repites los mismos patrones en tus relaciones? ¿Te cuesta alcanzar la plenitud que mereces? En este workshop gratuito, descubrirás cómo romper las cadenas sistémicas que te mantienen estancada.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUpVariant} className="hidden lg:block">
                         <div className="flex items-center gap-6 p-6 bg-white/40 backdrop-blur-sm rounded-3xl border border-[#B8835A]/20">
                            <div className="w-12 h-12 bg-[#B8835A] rounded-full flex items-center justify-center text-white">
                                <Activity className="w-6 h-6" />
                            </div>
                            <p className="text-sm text-[#2D2926]/70 font-medium">
                                Más de 500 mujeres han transformado su historia con este método.
                            </p>
                         </div>
                    </motion.div>
                </motion.div>

                {/* Right Column: Registration Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative w-full max-w-xl mx-auto"
                >
                    <RegistrationForm />
                </motion.div>
            </div>
        </section>
    );
}

function SocialProofSection() {
    const testimonials = [
        {
            name: "Carolina R.",
            title: "Empresaria",
            quote: "Llegué en quiebra emocional, hoy mi realidad es otra.",
            text: "Con el método de Yelitze, identifiqué el bloqueo invisible que me mantenía en la carencia. No fue magia, fue comprensión sistémica pura. Hoy tengo paz, merecimiento real y mi negocio fluye con una energía renovada."
        },
        {
            name: "Andrea M.",
            title: "Terapeuta",
            quote: "Descubrí por qué siempre atraía hombres no disponibles.",
            text: "Tras la Activación, entendí que estaba cargando con el duelo no resuelto de mi madre. Al liberar esa carga con los rituales, mi energía cambió y atraje a una pareja consciente y respetuosa."
        }
    ];

    return (
        <section className="py-32 bg-[#F5EFE6] relative overflow-hidden">
            <WaveDivider position="top" fill="#F5EFE6" className="opacity-50" />
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUpVariant}
                    className="text-center mb-20 max-w-3xl mx-auto"
                >
                    <span className="text-[#B8835A] tracking-[0.3em] font-bold text-xs uppercase mb-4 block">Resultados Reales</span>
                    <h2 className="text-3xl md:text-5xl font-heading text-[#2D2926] leading-tight">
                        Mujeres que transformaron su <i className="text-[#B8835A] font-normal">historia personal</i>.
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeUpVariant}
                            className="bg-white p-10 rounded-2xl shadow-lg border border-[#B8835A]/20 relative"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-full bg-[#B8835A]/10 flex items-center justify-center text-[#B8835A] font-bold">
                                    {t.name.split(' ')[0][0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#2D2926]">{t.name}</h4>
                                    <span className="text-xs tracking-widest uppercase text-[#B8835A]">{t.title}</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-heading text-[#2D2926] mb-4 italic">"{t.quote}"</h3>
                            <p className="text-[#2D2926]/80 leading-relaxed font-light">{t.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function SegmentationSection() {
    const points = [
        "Tus relaciones siguen un patrón de abandono o traición.",
        "Sientes bloqueos en tu cuerpo que no logras explicar.",
        "Te cuesta poner límites y cargas con lo que no es tuyo.",
        "Sientes desconexión con tu energía femenina y merecimiento."
    ];

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUpVariant}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-heading text-[#2D2926] leading-tight mb-4">
                        Esto es para ti si <span className="text-[#B8835A] italic">sientes que:</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {points.map((point, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-4 p-6 rounded-xl bg-[#F5EFE6]/30 border border-[#B8835A]/10"
                        >
                            <CheckCircle2 className="w-5 h-5 text-[#B8835A]" />
                            <p className="text-[#2D2926]/80 text-lg font-light">{point}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function MechanismSection() {
    const patrones = [
        {
            title: "Patrón de Invisibilidad",
            mask: "La que Desaparece",
            symptoms: ["¿Evitas ser vista?", "¿Dificultad para cobrar?", "¿Sensación de no pertenecer?"],
            icon: <ShieldAlert className="w-6 h-6" />
        },
        {
            title: "Patrón de Carga",
            mask: "La que Puede con Todo",
            symptoms: ["Fatiga crónica emocional", "Te cuesta pedir ayuda", "Miedo al abandono"],
            icon: <Heart className="w-6 h-6" />
        },
        {
            title: "Patrón de Sacrificio",
            mask: "La que se Posterga",
            symptoms: ["¿Dices 'sí' queriendo decir 'no'?", "Priorizas a todos", "Falta de propósito propio"],
            icon: <Activity className="w-6 h-6" />
        },
        {
            title: "Patrón de Control",
            mask: "La que No Confía",
            symptoms: ["Perfeccionismo extremo", "Necesidad de predecirlo todo", "Rigidez mental"],
            icon: <Sparkles className="w-6 h-6" />
        },
        {
            title: "Patrón de Exigencia",
            mask: "La Implacable",
            symptoms: ["Autocrítica feroz", "Miedo al fracaso", "Dificultad para disfrutar"],
            icon: <Clock className="w-6 h-6" />
        }
    ];

    return (
        <section className="py-32 relative bg-white overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUpVariant}
                    className="text-center mb-24 max-w-3xl mx-auto"
                >
                    <span className="text-[#B8835A] tracking-[0.3em] font-bold text-xs uppercase mb-4 block">Descubre tu Bloqueo Principal</span>
                    <h2 className="text-4xl md:text-5xl font-heading text-[#2D2926] leading-tight">
                        El estancamiento no es casualidad. <br />
                        <span className="text-[#B8835A] italic">Son mecanismos de defensa que hoy te limitan.</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {patrones.map((patron, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-[#F5EFE6]/50 p-8 rounded-3xl border border-[#B8835A]/10 hover:border-[#B8835A]/40 transition-all flex flex-col items-center text-center"
                        >
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#B8835A] mb-6 shadow-sm">
                                {patron.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[#2D2926] mb-2 uppercase tracking-wide">{patron.title}</h3>
                            <span className="text-sm font-bold text-[#B8835A] uppercase tracking-widest mb-6">Comportamiento: {patron.mask}</span>
                            <ul className="space-y-2 text-left w-full">
                                {patron.symptoms.map((s, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs text-[#2D2926]/60">
                                        <CheckCircle2 className="w-3 h-3 text-[#B8835A]" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 bg-[#2D2926] text-white p-12 rounded-[3rem] text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Sparkles className="w-24 h-24" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-heading mb-6">Mantra de la Activación: <span className="text-[#B8835A] italic">SÁNATE MUJER</span></h3>
                    <p className="text-white/70 max-w-2xl mx-auto font-light italic">
                        "Cada vez que algo te mueva, repite: sánate mujer. Es nuestro recordatorio de que podemos volver a sentir y reclamar lo que nos pertenece."
                    </p>
                </div>
            </div>
        </section>
    );
}

function StorytellingSection() {
    return (
        <section className="py-32 bg-[#F5EFE6] relative">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-8 order-2 lg:order-1"
                    >
                        <motion.div variants={fadeUpVariant}>
                            <span className="text-[#B8835A] tracking-[0.3em] font-bold text-xs uppercase block mb-2">Mi Nombre es Yelitzé Rangel</span>
                            <h2 className="text-4xl md:text-5xl font-heading text-[#2D2926] leading-tight mb-4">
                                No te hablo como experta, sino como <i className="text-[#B8835A] font-normal">una mujer que ha caminado</i> donde tú estás.
                            </h2>
                        </motion.div>

                        <div className="space-y-6 text-lg text-[#2D2926] font-light leading-relaxed">
                            <p>
                                Después de la pérdida de dos bebés y de un divorcio que me rompió, mi vida quedó en pausa. Mi camino me llevó a la India, donde comprendí que la sanación real ocurre solo cuando integramos mente, cuerpo y alma.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/50 p-4 rounded-xl">
                                    <span className="block font-bold text-[#B8835A] text-sm uppercase mb-1">Administradora</span>
                                    <span className="text-xs text-[#2D2926]/70">Estructura y Orden</span>
                                </div>
                                <div className="bg-white/50 p-4 rounded-xl">
                                    <span className="block font-bold text-[#B8835A] text-sm uppercase mb-1">Psicóloga</span>
                                    <span className="text-xs text-[#2D2926]/70">Comprensión de la Mente</span>
                                </div>
                                <div className="bg-white/50 p-4 rounded-xl">
                                    <span className="block font-bold text-[#B8835A] text-sm uppercase mb-1">Tanatóloga</span>
                                    <span className="text-xs text-[#2D2926]/70">Duelo y Transición</span>
                                </div>
                                <div className="bg-white/50 p-4 rounded-xl">
                                    <span className="block font-bold text-[#B8835A] text-sm uppercase mb-1">Sanadora</span>
                                    <span className="text-xs text-[#2D2926]/70">Ancestral y Linaje</span>
                                </div>
                            </div>
                            <p className="italic text-[#B8835A] font-medium border-l-4 border-[#B8835A] pl-6">
                                "El cuerpo almacena historias que la mente intenta olvidar. Pero cuando el cuerpo es escuchado con verdad... SANA."
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2"
                    >
                        <div className="relative aspect-[3/4] rounded-t-full overflow-hidden shadow-2xl border-b-8 border-[#B8835A]">
                            <Image
                                src="/assets/images/landing/yelitze-portrait-ritual.png"
                                alt="Yelitze Rangel Sanadora"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function OfferSection() {
    const benefits = [
        "Identificación de tus 5 patrones de estancamiento.",
        "Comprensión del sistema de lealtades invisibles.",
        "Workbook digital 'Soberanía del Ser' de regalo.",
        "Acceso a la comunidad VIP de WhatsApp.",
        "Sesión estratégica de preguntas y respuestas."
    ];

    return (
        <section id="oferta" className="py-32 relative bg-white overflow-hidden">
            <WaveDivider position="top" fill="white" />
            <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUpVariant}
                >
                    <span className="text-[#B8835A] tracking-[0.3em] font-bold text-xs uppercase mb-4 block">Cupo Gratuito Limitado</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-[#2D2926] leading-tight mb-8">
                        Únete al Workshop <span className="text-[#B8835A]">Sánate Mujer</span>
                    </h2>
                    <p className="text-[#2D2926]/60 text-lg max-w-2xl mx-auto mb-16 font-light">
                        Un espacio seguro y profundo para dar el primer paso hacia tu soberanía emocional. Sin costo, pero con un valor incalculable para tu alma.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto bg-[#FDFBFA] rounded-[3rem] shadow-2xl border border-[#B8835A]/20 overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        <div className="p-10 md:p-16 text-left space-y-8 bg-white">
                            <h3 className="text-2xl font-bold text-[#2D2926]">Lo que vivirás:</h3>
                            <ul className="space-y-4">
                                {benefits.map((b, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#B8835A] shrink-0 mt-1" />
                                        <span className="text-[#2D2926]/80 text-sm leading-relaxed">{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-10 md:p-16 bg-[#B8835A] text-white flex flex-col justify-center items-center text-center">
                            <span className="text-sm uppercase tracking-widest font-bold mb-4 opacity-80 underline underline-offset-8">Inversión</span>
                            <div className="text-6xl font-bold mb-6 drop-shadow-xl">
                                GRATIS
                            </div>
                            <p className="text-white/80 text-xs mb-8 font-medium italic">"El conocimiento que libera debe ser compartido."</p>
                            
                            <button 
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="w-full bg-[#2D2926] text-white py-5 rounded-full font-bold tracking-widest uppercase text-sm hover:scale-105 transition-transform shadow-xl mb-6 flex items-center justify-center gap-3"
                            >
                                RESERVAR MI LUGAR
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            
                            <p className="text-[10px] text-white/60 font-bold tracking-widest uppercase">
                                Workshop Online via Google Meet / Zoom
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PodcastSection() {
    return (
        <section className="py-32 bg-[#F5EFE6] relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="bg-white rounded-[4rem] p-8 md:p-20 shadow-xl border border-[#B8835A]/10 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-heading leading-tight">
                            Ritual de <span className="text-[#B8835A] italic">Devolución Simbólica</span>
                        </h2>
                        <p className="text-[#2D2926]/70 text-lg font-light leading-relaxed">
                            "Madre, abuelas, les devuelvo con amor el dolor que cargué por ustedes. Honro su historia. Honro su linaje. Hoy elijo vivir mi propia vida."
                        </p>
                        <div className="flex items-center gap-6 p-6 bg-[#FDFBFA] rounded-3xl border border-[#B8835A]/10">
                            <div className="w-16 h-16 bg-[#B8835A]/10 rounded-full flex items-center justify-center">
                                <Sparkles className="w-8 h-8 text-[#B8835A]" />
                            </div>
                            <p className="text-sm text-[#2D2926]/60 italic font-medium">
                                En el workshop experimentaremos este ritual sistémico para iniciar la liberación de memorias congeladas.
                            </p>
                        </div>
                    </div>
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
                        <div className="absolute inset-0 flex items-center justify-center">
                             {/* Placeholder for Video/Image of the ritual */}
                             <Play className="w-20 h-20 text-white/30" />
                        </div>
                        <Image 
                            src="/assets/images/landing/ritual-preview.png" 
                            alt="Ritual de Devolución" 
                            fill 
                            className="object-cover opacity-60"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function FaqSection() {
    const faqs = [
        {
            q: "1. ¿Qué es exactamente el Workshop 'Sánate Mujer'?",
            a: "Es una inmersión estratégica de una sesión en vivo donde aprenderás mi metodología para identificar y liberar patrones sistémicos. Es el punto de partida para cualquier mujer que desee dejar de repetir historias y empezar a habitar su propia vida."
        },
        {
            q: "2. ¿Es realmente gratuito?",
            a: "Sí. Este workshop tiene como objetivo brindar herramientas de alto valor para iniciar tu proceso de cambio. No tiene costo monetario, pero requiere tu compromiso total."
        },
        {
            q: "3. ¿Cuánto tiempo dura la sesión?",
            a: "La sesión suele durar entre 90 y 120 minutos. Es un espacio profundo donde no solo recibes teoría, sino que realizamos un ejercicio vivencial de liberación."
        },
        {
            q: "4. ¿Qué pasa si no puedo estar en vivo?",
            a: "La potencia de este trabajo reside en la energía del grupo en vivo. Sin embargo, al registrarte tendrás acceso a la grabación por tiempo limitado. Te recomiendo encarecidamente separar el espacio para ti."
        },
        {
            q: "5. ¿Para qué sirve el grupo de WhatsApp?",
            a: "Es nuestro canal de comunicación oficial. Allí enviamos el Workbook maestro, los recordatorios y materiales exclusivos de soporte que no compartimos por correo."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-32 bg-[#F5EFE6] relative overflow-hidden">
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 p-8 flex justify-center z-0 opacity-10 blur-sm pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                <div className="w-96 h-96 relative mix-blend-multiply">
                    <Image src="/assets/images/landing/golden-uterus.png" alt="Sanando el Linaje" fill className="object-contain" priority />
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUpVariant}
                    className="text-center mb-16"
                >
                    <span className="text-[#B8835A] tracking-[0.3em] font-bold text-xs uppercase mb-4 block">Claridad para tu proceso</span>
                    <h2 className="text-4xl md:text-5xl font-heading text-[#2D2926] leading-tight mb-4">
                        Preguntas <span className="text-[#B8835A] italic">Frecuentes</span>
                    </h2>
                    <p className="text-[#2D2926]/70 leading-relaxed font-light text-lg max-w-2xl mx-auto">
                        Todo lo que necesitas saber antes de comenzar este viaje de transformación.
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid gap-4"
                >
                    {faqs.map((faq, idx) => (
                        <motion.div variants={fadeUpVariant} key={idx} className="bg-white rounded-2xl border border-[#B8835A]/10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full text-left px-6 py-6 sm:px-8 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 outline-none focus:ring-2 focus:ring-[#B8835A]/30 rounded-2xl relative"
                            >
                                <div className="flex items-start sm:items-center gap-4">
                                    {/* Icon Area */}
                                    <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-colors duration-300 ${openIndex === idx ? 'bg-[#B8835A] text-white' : 'bg-[#B8835A]/10 text-[#B8835A] group-hover:bg-[#B8835A]/20'}`}>
                                        <span className="font-heading font-medium text-lg">{idx + 1}</span>
                                    </div>
                                    <span className={`font-medium text-lg sm:text-xl transition-colors duration-300 ${openIndex === idx ? 'text-[#B8835A]' : 'text-[#2D2926] group-hover:text-[#B8835A]'}`}>
                                        {faq.q.substring(3)}
                                    </span>
                                </div>
                                <div className={`shrink-0 transition-transform duration-300 self-end sm:self-center ${openIndex === idx ? 'rotate-180 text-[#B8835A]' : 'text-[#B8835A]/50'}`}>
                                    <ChevronDown className="w-6 h-6" />
                                </div>
                            </button>
                            <div
                                className={`px-6 sm:px-8 overflow-hidden transition-all duration-300 ease-in-out relative
                                ${openIndex === idx ? 'max-h-96 pb-6 sm:pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="absolute top-0 left-8 sm:left-[4.5rem] w-12 h-[2px] bg-[#B8835A]/20"></div>
                                <p className="text-[#2D2926]/80 leading-relaxed font-light mt-4 sm:ml-14">
                                    {faq.a}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <button
                        onClick={() => document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-[#B8835A] hover:bg-[#a0724e] text-white py-4 px-10 rounded shadow-[0_10px_30px_rgba(184,131,90,0.3)] transition-all transform hover:-translate-y-1 inline-flex items-center gap-3 uppercase font-bold tracking-widest text-sm"
                    >
                        Sí, Estoy Lista para Sanar
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

function FooterSection() {
    return (
        <footer className="bg-[#2D2926] text-white py-16 relative overflow-hidden">
            {/* Watermark Logo as Background */}
            <div className="absolute -right-20 -bottom-20 w-96 h-96 opacity-[0.03] pointer-events-none brightness-0 invert">
                <Image
                    src="/assets/images/watermark-logo.png"
                    alt="Watermark"
                    fill
                    className="object-contain"
                />
            </div>

            <div className="container mx-auto px-4 text-center flex flex-col items-center relative z-10">
                {/* Yelitze Rangel Logo as Signature */}
                <div className="mb-10 relative w-32 h-12 md:w-40 md:h-16 brightness-0 invert opacity-40 hover:opacity-70 transition-opacity duration-500">
                    <Image src="/assets/images/logo-yelitze-new.png" alt="Yelitze Rangel" fill className="object-contain" />
                </div>

                <div className="text-white/60 text-sm space-y-4 max-w-md">
                    <p className="font-light tracking-wide italic opacity-80 border-t border-white/10 pt-6">"Anatomia del alma donde lo invisible cobra voz."</p>
                    <div className="pt-2">
                        <p>Yelitze Rangel &copy; 2026. Todos los derechos reservados.</p>
                        <p className="flex items-center justify-center gap-4 mt-2">
                            <a href="#" className="hover:text-[#B8835A] transition-colors">Políticas de Privacidad</a>
                            <span className="opacity-30">|</span>
                            <a href="#" className="hover:text-[#B8835A] transition-colors">Términos de Servicio</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
