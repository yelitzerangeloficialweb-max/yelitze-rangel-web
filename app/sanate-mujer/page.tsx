"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { FormEvent } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp, X, Heart, Activity, ShieldAlert, Sparkles } from 'lucide-react';
import { motion, Variants, AnimatePresence } from 'framer-motion';

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

            {/* SECTION 1: HERO SECTION */}
            <HeroSection />

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

            {/* SECTION 6: PODCAST */}
            <PodcastSection />

            {/* SECTION 7: FAQ */}
            <FaqSection />

            {/* SECTION 7: FOOTER */}
            <FooterSection />
        </main>
    );
}

// ---------------------------------------------------------
// REGISTRATION FORM COMPONENT (Used in Hero)
// ---------------------------------------------------------
function RegistrationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            window.location.href = '#registered'; // Simulate redirect or success state
        }, 1500);
    };

    return (
        <div className="flex flex-col items-center w-full">
            {/* Logo encima del formulario */}
            <div className="w-80 md:w-[28rem] h-32 md:h-40 mb-8 relative mix-blend-multiply drop-shadow-md">
                <Image
                    src="/assets/images/landing/logo-sanate-mujer.png"
                    alt="Sánate Mujer Activación"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            <form onSubmit={handleSubmit} className="w-full bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-2xl border border-[#B8835A]/30 relative overflow-hidden">
                {/* Subtle glow effect top edge */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#B8835A] to-transparent opacity-50"></div>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-widest text-[#2D2926] mb-2">Nombre Completo</label>
                        <input
                            type="text"
                            id="name"
                            required
                            className="w-full bg-[#F5EFE6]/50 border-b border-[#B8835A]/40 px-4 py-3 text-[#2D2926] placeholder-[#2D2926]/40 focus:outline-none focus:border-[#B8835A] transition-colors font-medium"
                            placeholder="Tu nombre aquí..."
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-[#2D2926] mb-2">Correo Estratégico</label>
                        <input
                            type="email"
                            id="email"
                            required
                            className="w-full bg-[#F5EFE6]/50 border-b border-[#B8835A]/40 px-4 py-3 text-[#2D2926] placeholder-[#2D2926]/40 focus:outline-none focus:border-[#B8835A] transition-colors font-medium"
                            placeholder="tu@correo.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="whatsapp" className="block text-xs font-semibold uppercase tracking-widest text-[#2D2926] mb-2">WhatsApp (Para rituales)</label>
                        <input
                            type="tel"
                            id="whatsapp"
                            required
                            className="w-full bg-[#F5EFE6]/50 border-b border-[#B8835A]/40 px-4 py-3 text-[#2D2926] placeholder-[#2D2926]/40 focus:outline-none focus:border-[#B8835A] transition-colors font-medium"
                            placeholder="+1 234 567 8900"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#B8835A] hover:bg-[#a0724e] text-white py-5 rounded shadow-[0_10px_30px_rgba(184,131,90,0.3)] border border-[#B8835A] transition-all transform hover:-translate-y-1 mt-4 group flex items-center justify-center gap-3 relative overflow-hidden"
                    >
                        <span className="relative z-10 font-bold tracking-wide uppercase text-sm">
                            {isSubmitting ? 'Procesando...' : 'SÍ, QUIERO MI CUPO GRATUITO'}
                        </span>
                        {!isSubmitting && <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />}
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
                    </button>

                    <p className="text-center text-[11px] text-[#2D2926]/70 mt-4 px-4 font-medium">
                        Cupos limitados para garantizar la interacción y contención profesional.
                    </p>
                </div>
            </form>
        </div>
    );
}

// ---------------------------------------------------------
// SECTIONS
// ---------------------------------------------------------

function HeroSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center py-20 px-4 overflow-hidden bg-white/40">
            {/* Header / Logo (Removido a petición) */}

            <div className="container mx-auto max-w-7xl relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-8 items-center mt-12 lg:mt-0">
                {/* Left Column: Copy & Image */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="space-y-8 lg:pr-12 text-center lg:text-left"
                >
                    <motion.div variants={fadeUpVariant}>
                        <span className="inline-block text-[#B8835A] font-bold tracking-[0.4em] uppercase text-xs md:text-sm mb-6 border border-[#B8835A]/30 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm shadow-sm">
                            ⚡ EVENTO ÚNICO Y GRATUITO: EL DESPERTAR DE LA CONSCIENCIA FEMENINA
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-heading font-medium text-[#2D2926] leading-[1.1] mb-8">
                            Tu cuerpo recuerda lo que tu mente intenta olvidar.<br />
                            <span className="text-[#B8835A] italic">Identifica la Herida Raíz.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[#2D2926]/80 leading-relaxed font-light">
                            Únete a la "Activación Sánate Mujer", la inmersión online gratuita diseñada para mujeres exitosas que están listas para <b>dejar de autosabotearse</b> en sus relaciones y finanzas.
                            Descubre el Sistema de Expansión y reclama tu poder de merecimiento en un solo fin de semana, sin costo.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUpVariant} className="relative w-full max-w-[280px] mx-auto lg:mx-0 flex items-center justify-center">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-[#B8835A]/10 rounded-[2.5rem] blur-2xl animate-pulse"></div>

                        {/* Interactive Vertical Video (Aspect 9:16) */}
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="relative w-full aspect-[9/16] bg-black rounded-[2.5rem] border-[6px] border-white shadow-2xl overflow-hidden group transition-transform hover:-translate-y-2 cursor-pointer"
                        >
                            <video
                                src="/assets/images/landing/sanate-mujer-reel.mp4"
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                            />

                            {/* Overlay Controls */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex flex-col items-center justify-end pb-12">
                                <span className="text-white text-[10px] font-bold tracking-widest uppercase px-6 py-2.5 bg-black/40 backdrop-blur-md rounded-full border border-white/20 shadow-xl">
                                    Ver en grande
                                </span>
                            </div>

                            {/* UI elements to make it look like a reel/phone */}
                            <div className="absolute top-4 inset-x-0 flex justify-center z-10">
                                <div className="w-16 h-1.5 bg-white/30 rounded-full"></div>
                            </div>
                        </div>

                        {/* DIRECTIONAL ARROW (Desktop only) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="hidden lg:block absolute -right-48 top-[60%] -translate-y-1/2 z-20 pointer-events-none"
                        >
                            <div className="relative">
                                {/* SVG Arrow - Organic/Handwritten style */}
                                <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#4E342E] opacity-70">
                                    <path
                                        d="M15 100C40 90 50 45 120 25M120 25L105 23M120 25L112 42"
                                        stroke="currentColor"
                                        strokeWidth="3.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="animate-pulse"
                                    />
                                </svg>
                                {/* Handwritten Text Overlay */}
                                <div className="absolute -bottom-12 -left-8 w-64 rotate-[-12deg]">
                                    <span className="text-2xl font-serif text-[#4E342E]/70 italic tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                                        Inscribirme ahora
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Right Column: Registration Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="w-full max-w-md mx-auto lg:ml-auto relative z-10"
                >
                    <RegistrationForm />
                </motion.div>
            </div>

            {/* VIDEO MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-stone-950/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                        onClick={() => setIsModalOpen(false)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <X className="w-10 h-10" />
                        </button>

                        {/* Video Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-[500px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                src="/assets/images/landing/sanate-mujer-reel.mp4"
                                className="w-full h-full object-cover"
                                autoPlay
                                controls
                                playsInline
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

function SegmentationSection() {
    const points = [
        {
            icon: <Heart className="w-6 h-6 text-[#B8835A]" />,
            text: "Tus relaciones de pareja siguen un patrón de abandono o traición que no logras romper."
        },
        {
            icon: <Activity className="w-6 h-6 text-[#B8835A]" />,
            text: "Sientes tensiones físicas o bloqueos en tu cuerpo que el médico no logra explicar (Herida Somática)."
        },
        {
            icon: <ShieldAlert className="w-6 h-6 text-[#B8835A]" />,
            text: "Te cuesta poner límites y terminas cargando con responsabilidades que no te corresponden."
        },
        {
            icon: <Sparkles className="w-6 h-6 text-[#B8835A]" />,
            text: "Sientes una desconexión profunda con tu energía femenina y tu capacidad de recibir."
        }
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

                <div className="grid md:grid-cols-2 gap-8">
                    {points.map((point, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="flex items-start gap-6 p-8 rounded-2xl bg-[#F5EFE6]/30 border border-[#B8835A]/10 hover:border-[#B8835A]/30 transition-all group"
                        >
                            <div className="shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                {point.icon}
                            </div>
                            <p className="text-[#2D2926]/80 text-lg leading-relaxed font-light">
                                {point.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function SocialProofSection() {
    return (
        <section className="py-32 bg-[#F5EFE6] relative">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUpVariant}
                    className="text-center mb-20 max-w-3xl mx-auto"
                >
                    <span className="text-[#B8835A] tracking-[0.3em] font-bold text-xs uppercase mb-4 block">Testimonios Reales</span>
                    <h2 className="text-3xl md:text-5xl font-heading text-[#2D2926] leading-tight">
                        Ellas Pasaron de la Complacencia a la <i className="text-[#B8835A] font-normal">Soberanía</i> de sus Vidas.
                    </h2>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {/* Testimonial 1 */}
                    <motion.div variants={fadeUpVariant} className="bg-white p-10 rounded-2xl shadow-lg border border-[#B8835A]/20 relative">
                        <div className="absolute -top-6 -right-6 text-[#B8835A] opacity-20 font-serif text-9xl leading-none">"</div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#B8835A] relative">
                                <Image src="/assets/images/testimonials/carolina.png" alt="Carolina R." fill className="object-cover" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#2D2926] flex items-center gap-2">
                                    Carolina R.
                                    <CheckCircle2 className="w-4 h-4 text-[#B8835A]" />
                                </h4>
                                <span className="text-xs tracking-widest uppercase text-[#B8835A]">Empresaria</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-heading text-[#2D2926] mb-4 italic">"Llegué en quiebra emocional, salí duplicando mis ingresos."</h3>
                        <p className="text-[#2D2926]/80 leading-relaxed font-light">
                            "Con el método de Yelitze, identifiqué la lealtad invisible que me mantenía en la carencia. No fue magia, fue activación somática pura. Hoy tengo paz, merecimiento real y mi negocio factura el doble."
                        </p>
                    </motion.div>

                    {/* Testimonial 2 */}
                    <motion.div variants={fadeUpVariant} className="bg-white p-10 rounded-2xl shadow-lg border border-[#B8835A]/20 relative">
                        <div className="absolute -top-6 -right-6 text-[#B8835A] opacity-20 font-serif text-9xl leading-none">"</div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#B8835A] relative">
                                <Image src="/assets/images/testimonials/sofia.png" alt="Andrea M." fill className="object-cover" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#2D2926] flex items-center gap-2">
                                    Andrea M.
                                    <CheckCircle2 className="w-4 h-4 text-[#B8835A]" />
                                </h4>
                                <span className="text-xs tracking-widest uppercase text-[#B8835A]">Terapeuta</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-heading text-[#2D2926] mb-4 italic">"Descubrí por qué siempre atraía hombres no disponibles."</h3>
                        <p className="text-[#2D2926]/80 leading-relaxed font-light">
                            "Tras la Activación, entendí que estaba cargando con el duelo no resuelto de mi madre. Al liberar esa carga con los rituales, mi energía cambió y atraje a una pareja consciente y respetuosa."
                        </p>
                    </motion.div>
                </motion.div>

                {/* Added CTA for Social Proof Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-transparent text-[#2D2926] border-2 border-[#B8835A] hover:bg-[#B8835A] hover:text-white py-4 px-10 rounded transition-all transform hover:-translate-y-1 inline-flex items-center gap-3 uppercase font-bold tracking-widest text-sm"
                    >
                        Quiero Vivir mi Propia Transformación
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

function MechanismSection() {
    const hitos = [
        {
            icon: "/assets/images/landing/icon-compass.png",
            title: "Hito 1: Tu Mapa de Patrones",
            desc: "Identifica el conflicto exacto (pareja, dinero, jefa) que repites y localiza su origen en tu linaje femenino. Obtén claridad absoluta sobre por qué te autosaboteas."
        },
        {
            icon: "/assets/images/landing/golden-uterus.png",
            title: "Hito 2: El Cuerpo Habla",
            desc: "Localiza físicamente dónde guardas el trauma ancestral en tu sistema nervioso y útero. Siente la liberación real en tu cuerpo, no solo en tu cabeza."
        },
        {
            icon: "/assets/images/landing/icon-candle.png",
            title: "Hito 3: Rituales de Paso",
            desc: "Transforma simbólicamente el dolor de tus ancestras en sabiduría y poder a través de rituales diseñados para reprogramar tu subconsciente."
        },
        {
            icon: "/assets/images/landing/icon-sun.png",
            title: "Hito 4: Activación del Merecimiento",
            desc: "Crea un plan de acción concreto para aplicar tu nueva vibración de merecimiento en tus relaciones y finanzas hoy mismo. Aprende a sostener la abundancia."
        }
    ];

    return (
        <section className="py-32 relative bg-white overflow-hidden">
            {/* Local Marble bg strictly for this section */}
            <div className="absolute inset-0 opacity-40">
                <Image src="/assets/images/landing/marble-bg.png" alt="" fill className="object-cover" />
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUpVariant}
                    className="text-center mb-24 max-w-3xl mx-auto"
                >
                    <span className="text-[#B8835A] tracking-[0.3em] font-bold text-xs uppercase mb-4 block">El Sistema</span>
                    <h2 className="text-4xl md:text-5xl font-heading text-[#2D2926] leading-tight">
                        Tu Victoria Rápida: De la Confusión a la <i className="text-[#B8835A] font-normal">Claridad Absoluta</i>
                    </h2>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-12"
                >
                    {hitos.map((hito, idx) => (
                        <motion.div variants={fadeUpVariant} key={idx} className="flex flex-col items-center text-center space-y-6 group">
                            <div className="w-32 h-32 relative flex items-center justify-center">
                                {/* Subtle glow behind icon */}
                                <div className="absolute inset-4 bg-[#B8835A]/10 rounded-full blur-xl group-hover:bg-[#B8835A]/30 transition-colors"></div>
                                {/* Circular Container with Gold Border */}
                                <div className="w-full h-full relative z-10 rounded-full border-[3px] border-[#B8835A] bg-white shadow-xl flex items-center justify-center overflow-hidden p-3 transition-transform duration-300 group-hover:scale-105">
                                    <Image
                                        src={hito.icon}
                                        alt={hito.title}
                                        fill
                                        className="object-contain p-2"
                                    />
                                </div>
                            </div>
                            <div>    <h3 className="text-xl font-bold text-[#2D2926] mb-4 uppercase tracking-widest text-sm">{hito.title}</h3>
                                <p className="text-[#2D2926]/70 leading-relaxed font-light text-sm">
                                    {hito.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function StorytellingSection() {
    return (
        <section className="py-32 bg-[#F5EFE6] relative">
            {/* Subtle linen texture simulation via CSS pattern or low opacity image. Will use bg color for now to keep it clean */}
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="space-y-8 order-2 lg:order-1"
                    >
                        <motion.div variants={fadeUpVariant}>
                            <h2 className="text-4xl md:text-5xl font-heading text-[#2D2926] leading-tight mb-4">
                                De la Jaula de Oro al Trono de mi Propia Vida: <i className="text-[#B8835A] font-normal">Por qué puedo guiarte.</i>
                            </h2>
                        </motion.div>

                        <div className="space-y-6 text-lg text-[#2D2926] font-light leading-relaxed">
                            <motion.div variants={fadeUpVariant}>
                                <h3 className="text-2xl font-heading font-medium text-[#B8835A] mb-2">El Quiebre: Donde la mente comprende, pero el alma aún duele.</h3>
                                <p>
                                    Hola, soy Yelitze Rangel. Durante años, mi vida parecía un éxito absoluto: una carrera corporativa sólida, viajes y reconocimiento. Pero por dentro, estaba quebrada. Me encontraba repitiendo la historia de mi linaje: un divorcio y una quiebra económica simultánea, sumado al dolor profundo de la pérdida de dos bebés. Me sentía quemada, vacía y con una rabia sorda que la psicología tradicional no lograba explicar.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeUpVariant}>
                                <h3 className="text-2xl font-heading font-medium text-[#B8835A] mb-2">La Epifanía: El Camino de Fuego.</h3>
                                <p>
                                    Ese quiebre me llevó hasta la India, iniciando un proceso de transformación donde comprendí que la sanación no ocurre cuando mente, cuerpo y alma caminan separados. Descubrí que cuando la ciencia explica el dolor, pero el alma sigue pidiendo ser escuchada, es ahí donde comienza el verdadero trabajo: el descongelamiento del trauma y la reconexión ancestral.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeUpVariant}>
                                <h3 className="text-2xl font-heading font-medium text-[#B8835A] mb-2">La Autoridad: El Puente entre la Ciencia y el Espíritu.</h3>
                                <p className="mb-3">
                                    No elegí mis caminos al azar; cada uno me enseñó cómo el ser humano se protege y cómo sana. Hoy, pongo a tu servicio una integración única de estructura y sabiduría:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 marker:text-[#B8835A]">
                                    <li><b>Administradora de Empresas:</b> Para darte orden y estructura.</li>
                                    <li><b>Psicóloga y Tanatóloga:</b> Para comprender tu mente y honrar tus duelos.</li>
                                    <li><b>Sanadora Ancestral y Facilitadora de Trauma:</b> Para liberar las memorias atrapadas en tu cuerpo y regenerar tu sistema nervioso.</li>
                                </ul>
                            </motion.div>

                            <motion.div variants={fadeUpVariant}>
                                <h3 className="text-2xl font-heading font-medium text-[#B8835A] mb-2">El Legado: Tu Soberanía Interior.</h3>
                                <p>
                                    Tras acompañar a más de 8000 personas con mi método de Coaching Ancestral, he creado la "Activación Sanate Mujer". Esta inmersión gratuita es el primer paso para que dejes de ser una espectadora de tu dolor y reclames, por fin, el trono de tu propia vida.
                                </p>
                                <p className="mt-4 font-medium italic">
                                    No es motivación; es un entrenamiento energético para volver a tu coherencia interior.
                                </p>
                            </motion.div>

                            {/* CTA Button Added Here */}
                            <motion.div variants={fadeUpVariant} className="pt-6">
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="bg-[#B8835A] hover:bg-[#a0724e] text-white py-4 px-8 rounded shadow-[0_10px_30px_rgba(184,131,90,0.3)] transition-all transform hover:-translate-y-1 inline-flex items-center gap-3 uppercase font-bold tracking-widest text-sm"
                                >
                                    Reclamar mi Cupo Gratuito
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="order-1 lg:order-2"
                    >
                        <div className="relative aspect-[3/4] rounded-t-full overflow-hidden shadow-2xl border-b-4 border-[#B8835A]">
                            <Image
                                src="/assets/images/landing/yelitzeRangel.png"
                                alt="Yelitze Rangel"
                                fill
                                className="object-cover"
                            />
                            {/* Inner gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2D2926]/40 to-transparent mix-blend-multiply"></div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

function OfferSection() {
    return (
        <section className="py-32 relative bg-white overflow-hidden">
            {/* Local Marble bg strictly for this section */}
            <div className="absolute inset-0 opacity-50 mix-blend-multiply">
                <Image src="/assets/images/landing/marble-bg.png" alt="" fill className="object-cover" />
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUpVariant}
                >
                    <span className="text-[#B8835A] tracking-[0.3em] font-bold text-xs uppercase mb-4 block">Tu Regalo Exclusivo</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-[#2D2926] leading-tight mb-16">
                        Este Es Tu Kit de Activación Gratuito <br />
                        <span className="text-[#2D2926]/40 text-3xl italic">(Valorado en $297)</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-center text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative aspect-video lg:aspect-square"
                    >
                        <Image
                            src="/assets/images/landing/tablet-mosaic.png"
                            alt="Kit de Activación"
                            fill
                            className="object-contain drop-shadow-2xl"
                        />
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="space-y-12"
                    >
                        <ul className="space-y-8">
                            <motion.li variants={fadeUpVariant} className="flex items-start gap-4">
                                <CheckCircle2 className="w-8 h-8 text-[#B8835A] shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-xl font-bold text-[#2D2926] mb-1">Acceso Completo a la Inmersión Online</h4>
                                    <p className="text-[#2D2926]/70 leading-relaxed">Evento en Vivo de Fin de Semana (Valor $147).</p>
                                </div>
                            </motion.li>
                            <motion.li variants={fadeUpVariant} className="flex items-start gap-4">
                                <CheckCircle2 className="w-8 h-8 text-[#B8835A] shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-xl font-bold text-[#2D2926] mb-1">Workbook Maestro Premium</h4>
                                    <p className="text-[#2D2926]/70 leading-relaxed">"De la Herida a la Libertad Emocional" (Valor $97).</p>
                                </div>
                            </motion.li>
                            <motion.li variants={fadeUpVariant} className="flex items-start gap-4">
                                <CheckCircle2 className="w-8 h-8 text-[#B8835A] shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-xl font-bold text-[#2D2926] mb-1">3 Audioelixires de Preparación</h4>
                                    <p className="text-[#2D2926]/70 leading-relaxed">Meditaciones guiadas para: Soberanía, Alquimia y Abundancia (Valor $53).</p>
                                </div>
                            </motion.li>
                        </ul>

                        <motion.div variants={fadeUpVariant} className="bg-[#F5EFE6] p-8 rounded-2xl border border-[#B8835A]/30 text-center shadow-inner">
                            <div className="text-sm font-bold tracking-widest uppercase text-[#B8835A] mb-2">Inversión Total Requerida</div>
                            <div className="text-7xl font-bold text-[#B8835A] mb-6 drop-shadow-sm">$0</div>

                            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full bg-[#B8835A] hover:bg-[#a0724e] text-white py-5 rounded shadow-[0_10px_30px_rgba(184,131,90,0.3)] border border-[#B8835A] transition-all transform hover:-translate-y-1 group flex items-center justify-center gap-3 relative overflow-hidden">
                                <span className="relative z-10 font-bold tracking-wide uppercase text-sm">SÍ, QUIERO MI CUPO GRATUITO EN LA ACTIVACIÓN</span>
                                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="text-xs text-[#2D2926] mt-6 font-medium">
                                * Este evento gratuito es para mujeres comprometidas. Si te registras, por favor asiste.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function PodcastSection() {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-multiply">
                <Image src="/assets/images/landing/marble-bg.png" alt="" fill className="object-cover" />
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column - Podcast Graphics */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-[#B8835A]/10 blur-3xl rounded-full translate-x-12 translate-y-12"></div>

                        <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border border-[#B8835A]/20 group">
                            <Image
                                src="/assets/images/landing/mujer-escuchando-podcast.png"
                                alt="Escuchando el podcast"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Floating Podcast Cover */}
                            <div className="absolute -bottom-8 -right-8 w-48 h-64 md:w-56 md:h-80 rounded-xl overflow-hidden shadow-2xl border-4 border-white rotate-6 transition-transform duration-500 hover:rotate-0 hover:scale-105 z-20">
                                <Image
                                    src="/assets/images/landing/podcast-yelitze.png"
                                    alt="Podcast Sánate Mujer"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Text */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="space-y-8 text-center lg:text-left"
                    >
                        <motion.div variants={fadeUpVariant}>
                            <span className="text-[#B8835A] tracking-[0.3em] font-bold text-xs uppercase block">Sigue la Inmersión</span>
                            <h2 className="text-4xl md:text-5xl font-heading text-[#2D2926] leading-tight">
                                Prepárate para la Activación con el <i className="text-[#B8835A] font-normal">Podcast Sánate Mujer</i>.
                            </h2>
                        </motion.div>
                        <motion.p variants={fadeUpVariant} className="text-[#2D2926]/70 leading-relaxed font-light text-lg">
                            El camino hacia tu soberanía comienza en tus oídos. Escucha historias reales, herramientas de alquimia ancestral y reflexiones profundas para ir calentando motores antes de nuestro evento en vivo.
                        </motion.p>
                        <motion.div variants={fadeUpVariant} className="pt-4 flex justify-center lg:justify-start">
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="bg-[#B8835A] hover:bg-[#a0724e] text-white py-4 px-8 rounded shadow-[0_10px_30px_rgba(184,131,90,0.3)] transition-all transform hover:-translate-y-1 inline-flex justify-center items-center gap-3 uppercase font-bold tracking-widest text-sm"
                            >
                                Registrarme a la Inmersión
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

function FaqSection() {
    const faqs = [
        {
            q: "1. ¿Por qué este evento es gratuito si el contenido es de tan alto valor?",
            a: "Mi misión como el puente entre la ciencia y el espíritu es llegar a la mayor cantidad de mujeres posible para iniciar este cambio de consciencia. Tu Activación de Poder es el primer paso: una victoria rápida para que experimentes mi método de integración somática. Al finalizar, si sientes que estás lista para la transmutación total, te invitaré a mi formación avanzada \"Sanando el Linaje\", pero esta apertura inicial es mi regalo para tu historia."
        },
        {
            q: "2. ¿Sirve si no conozco la historia de mi familia o no tengo contacto con ellos?",
            a: "Absolutamente. Como Psicóloga y Sanadora Ancestral, te digo: no necesitas un árbol genealógico de papel. Tu cuerpo es el mapa más preciso. Tus patrones de pareja, tus bloqueos con el dinero y tus síntomas físicos son la voz de tu linaje. En la sesión aprenderás a leer esa información que ya vive en tus células, aunque no tengas los datos históricos."
        },
        {
            q: "3. He probado terapia tradicional y sigo repitiendo los mismos errores. ¿Qué cambia aquí?",
            a: "La terapia tradicional suele quedarse en la comprensión mental. Pero el trauma y las lealtades invisibles se \"congelan\" en el sistema nervioso. Mi método une la psicología y tanatología con rituales de paso y energía. No solo vamos a hablar del problema; vamos a usar el Workbook Maestro y los Audio Elixires para \"descongelar\" esa memoria y devolverle la soberanía a tu cuerpo."
        },
        {
            q: "4. Tengo miedo de lo que pueda descubrir o de que sea demasiado doloroso.",
            a: "El miedo es la resistencia del sistema a la libertad. He diseñado un contenedor seguro y profesional. No vamos a revolcarnos en el dolor; vamos a darle una mirada circular para transmutarlo en fuerza. Estarás acompañada por una estructura clara y una presencia amorosa que respeta profundamente tu proceso."
        },
        {
            q: "5. ¿Es necesario ser experta en temas espirituales o energía?",
            a: "Para nada. Este es un Entrenamiento Energético para mujeres reales, profesionales y estructuradas que sienten que \"falta algo\". Mi trabajo es traducir lo invisible a un lenguaje que tu mente comprenda y tu cuerpo sienta. Solo necesitas tu Workbook, tus Audio Elixires y la disposición de dejar de ser espectadora para reclamar tu trono."
        },
        {
            q: "6. ¿Qué pasa si no puedo estar en la clase en vivo por Google Meet?",
            a: "La potencia de Tu Activación de Poder reside en la energía grupal y la presencia. Sin embargo, al registrarte tendrás acceso al Grupo de WhatsApp Exclusivo. Allí compartiremos herramientas de soporte y avisaremos sobre la disponibilidad de grabaciones temporales. Pero recuerda: la soberanía interior requiere compromiso. Separa ese espacio para ti."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-32 bg-[#F5EFE6] relative overflow-hidden">
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 p-8 flex justify-center z-0 opacity-10 blur-sm pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                <div className="w-96 h-96 relative mix-blend-multiply">
                    <Image src="/assets/images/landing/golden-uterus.png" alt="Sánate Mujer Activación" fill className="object-contain" priority />
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
                    <span className="text-[#B8835A] tracking-[0.3em] font-bold text-xs uppercase mb-4 block">Resolviendo dudas</span>
                    <h2 className="text-4xl md:text-5xl font-heading text-[#2D2926] leading-tight mb-4">
                        FAQ: Claridad para <span className="text-[#B8835A] italic">Tu Activación de Poder.</span>
                    </h2>
                    <p className="text-[#2D2926]/70 leading-relaxed font-light text-lg max-w-2xl mx-auto">
                        Es normal tener dudas antes de dar un gran paso. Aquí he reunido las respuestas a las inquietudes más comunes.
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
                                        {faq.q.substring(3)} {/* Remove the "1. " from the title as we styled the number */}
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
                                {/* Small decorative line */}
                                <div className="absolute top-0 left-8 sm:left-[4.5rem] w-12 h-[2px] bg-[#B8835A]/20"></div>

                                <p className="text-[#2D2926]/80 leading-relaxed font-light mt-4 sm:ml-14">
                                    {faq.a}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA for FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-[#B8835A] hover:bg-[#a0724e] text-white py-4 px-10 rounded shadow-[0_10px_30px_rgba(184,131,90,0.3)] transition-all transform hover:-translate-y-1 inline-flex items-center gap-3 uppercase font-bold tracking-widest text-sm"
                    >
                        Sí, Estoy Lista para la Activación
                        <ArrowRight className="w-5 h-5" />
                    </button>
                    <p className="text-[#2D2926]/60 text-xs mt-4 font-medium uppercase tracking-widest">Inmersión Online Gratuita</p>
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
                {/* Sanate Mujer Logo */}
                <div className="mb-6 relative w-48 h-20 md:w-64 md:h-24 brightness-0 invert opacity-80">
                    <Image src="/assets/images/landing/logo-sanate-mujer.png" alt="Sánate Mujer Activación" fill className="object-contain" />
                </div>

                {/* Yelitze Rangel Logo as Signature */}
                <div className="mb-10 relative w-32 h-12 md:w-40 md:h-16 brightness-0 invert opacity-40 hover:opacity-70 transition-opacity duration-500">
                    <Image src="/assets/images/logo-yelitze-new.png" alt="Yelitze Rangel" fill className="object-contain" />
                </div>

                <div className="text-white/60 text-sm space-y-4 max-w-md">
                    <p className="font-light tracking-wide italic opacity-80 border-t border-white/10 pt-6">"El puente entre la ciencia y el espíritu para reclamar tu soberanía."</p>
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
