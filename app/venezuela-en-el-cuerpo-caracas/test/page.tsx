"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Brain, Activity, Wind, Eye, HeartPulse, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
    { text: "¿Sientes el cuerpo en tensión incluso cuando estás en reposo?", type: "activacion" },
    { text: "¿Te sobresaltas fácilmente con sonidos o movimientos?", type: "activacion" },
    { text: "¿Sientes ansiedad sin razón clara durante el día?", type: "activacion" },
    { text: "¿Te cuesta bajar la intensidad mental o física?", type: "activacion" },
    { text: "¿Sientes cansancio físico o mental sin explicación clara?", type: "congelamiento" },
    { text: "¿Te cuesta concentrarte o sentirte presente?", type: "congelamiento" },
    { text: "¿Sientes desconexión emocional o “apagamiento”?", type: "congelamiento" },
    { text: "¿Evitas pensar en lo ocurrido porque te genera incomodidad?", type: "congelamiento" },
    { text: "¿Puedes relajarte en algún momento del día?", type: "regulacion" },
    { text: "¿Tu respiración se estabiliza cuando te detienes?", type: "regulacion" }
];

const options = [
    { label: "Nunca", value: 0 },
    { label: "A veces", value: 1 },
    { label: "Frecuentemente", value: 2 }
];

export default function SomaticTestPage() {
    const [step, setStep] = useState(0); // 0 = Intro, 1 = Instructions, 2-11 = Questions, 12 = Results
    const [answers, setAnswers] = useState<number[]>(Array(10).fill(-1));
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleAnswer = (val: number) => {
        const newAnswers = [...answers];
        newAnswers[step - 2] = val;
        setAnswers(newAnswers);
        
        // Short delay for smooth visual feedback before advancing
        setTimeout(() => {
            setStep(prev => prev + 1);
        }, 300);
    };

    const getProfile = () => {
        const actScore = answers.slice(0, 4).reduce((a, b) => a + b, 0);
        const conScore = answers.slice(4, 8).reduce((a, b) => a + b, 0);
        const regScore = answers.slice(8, 10).reduce((a, b) => a + b, 0);

        const actPct = actScore / 8;
        const conPct = conScore / 8;
        const regPct = regScore / 4;

        if (regPct > actPct && regPct > conPct) return "regulacion";
        if (conPct > actPct) return "congelamiento";
        return "activacion"; // Defaults to activation if tied or highest
    };

    if (!mounted) return null;

    return (
        <main className="min-h-screen font-body selection:bg-[#7C8B6A] selection:text-[#F5EFE6]" style={{
            backgroundColor: '#F5EFE6',
            '--color-beige': '#F5EFE6',
            '--color-olive': '#7C8B6A',
            '--color-terracotta': '#C97C5D',
            '--color-gold': '#C8A45D',
            '--color-dark': '#1C1C1C',
        } as React.CSSProperties}>

            <AnimatePresence mode="wait">
                
                {/* PÁGINA 1 — INTRODUCCIÓN */}
                {step === 0 && (
                    <motion.section 
                        key="intro"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
                    >
                        <div className="max-w-2xl mx-auto space-y-8">
                            <Brain className="w-16 h-16 mx-auto text-[#7C8B6A] opacity-80" strokeWidth={1} />
                            <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#1C1C1C]">
                                Tu cuerpo después del sismo
                            </h1>
                            <div className="space-y-4 text-lg md:text-xl text-[#1C1C1C]/70 font-light leading-relaxed">
                                <p>
                                    Después de los recientes eventos en Caracas, muchas personas están sintiendo cambios en su cuerpo, su mente y sus emociones.
                                </p>
                                <p>
                                    Este test no busca diagnosticarte.<br/>
                                    <span className="font-medium text-[#1C1C1C]">Busca ayudarte a entender cómo está respondiendo tu sistema nervioso en este momento.</span>
                                </p>
                            </div>
                            <button 
                                onClick={() => setStep(1)}
                                className="mt-8 bg-[#1C1C1C] text-[#F5EFE6] px-10 py-4 rounded-2xl font-bold hover:bg-[#C97C5D] transition-colors shadow-lg flex items-center justify-center gap-3 mx-auto group"
                            >
                                Comenzar test
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.section>
                )}

                {/* PÁGINA 2 — INSTRUCCIONES */}
                {step === 1 && (
                    <motion.section 
                        key="instrucciones"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
                    >
                        <div className="max-w-xl mx-auto space-y-10 bg-white p-10 rounded-[3rem] shadow-xl border border-stone-100">
                            <h2 className="text-3xl font-heading font-bold text-[#1C1C1C]">
                                Cómo responder
                            </h2>
                            <ul className="space-y-6 text-left">
                                {[
                                    "No pienses demasiado la respuesta.",
                                    "Responde según cómo te has sentido estos días.",
                                    "No hay respuestas correctas o incorrectas.",
                                    "Responde con honestidad corporal."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-lg text-[#1C1C1C]/80 font-light">
                                        <div className="w-2 h-2 rounded-full bg-[#7C8B6A] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <button 
                                onClick={() => setStep(2)}
                                className="w-full bg-[#7C8B6A] text-[#F5EFE6] px-8 py-4 rounded-2xl font-bold hover:bg-[#1C1C1C] transition-colors shadow-lg"
                            >
                                Empezar preguntas
                            </button>
                        </div>
                    </motion.section>
                )}

                {/* PÁGINAS 3-12 — PREGUNTAS */}
                {step >= 2 && step <= 11 && (
                    <motion.section 
                        key={`q-${step}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="min-h-screen flex flex-col p-6 max-w-2xl mx-auto"
                    >
                        <header className="pt-12 pb-8 flex items-center justify-between">
                            <button 
                                onClick={() => setStep(prev => prev - 1)} 
                                className="text-[#1C1C1C]/50 hover:text-[#1C1C1C] transition-colors flex items-center gap-2 text-sm font-medium"
                            >
                                <ChevronLeft className="w-5 h-5" /> Atrás
                            </button>
                            <span className="text-xs font-bold tracking-widest text-[#7C8B6A]">
                                {step - 1} / 10
                            </span>
                        </header>
                        
                        <div className="w-full bg-stone-200 h-1.5 rounded-full mb-12 overflow-hidden">
                            <motion.div 
                                className="h-full bg-[#7C8B6A]" 
                                initial={{ width: `${((step - 2) / 10) * 100}%` }}
                                animate={{ width: `${((step - 1) / 10) * 100}%` }}
                            />
                        </div>

                        <div className="flex-grow flex flex-col justify-center mb-12">
                            <h2 className="text-2xl md:text-4xl font-heading font-bold text-[#1C1C1C] leading-tight mb-12">
                                {questions[step - 2].text}
                            </h2>

                            <div className="space-y-4">
                                {options.map((opt, i) => {
                                    const isSelected = answers[step - 2] === opt.value;
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => handleAnswer(opt.value)}
                                            className={`w-full text-left p-6 rounded-2xl border-2 transition-all text-lg font-medium ${
                                                isSelected 
                                                    ? 'border-[#7C8B6A] bg-[#7C8B6A]/10 text-[#1C1C1C]' 
                                                    : 'border-stone-200 bg-white hover:border-[#7C8B6A]/30 text-[#1C1C1C]/70 hover:bg-stone-50'
                                            }`}
                                        >
                                            {opt.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* PÁGINA FINAL — RESULTADOS */}
                {step === 12 && (() => {
                    const profile = getProfile();
                    return (
                        <motion.section 
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="min-h-screen py-20 px-6 max-w-3xl mx-auto"
                        >
                            <div className="text-center mb-16">
                                <h1 className="text-4xl font-heading font-bold text-[#1C1C1C] mb-6">
                                    Qué puedes hacer ahora
                                </h1>
                                
                                {profile === 'activacion' && (
                                    <div className="bg-white p-10 rounded-[3rem] shadow-xl border-t-8 border-[#C97C5D] text-left">
                                        <span className="text-xs font-bold text-[#C97C5D] tracking-widest uppercase mb-4 block">Perfil: Alta Activación</span>
                                        <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">
                                            Tu sistema nervioso se encuentra en estado de alerta sostenida.
                                        </h2>
                                        <div className="bg-[#C97C5D]/10 p-6 rounded-2xl mb-8">
                                            <p className="text-[#C97C5D] font-bold text-lg italic">
                                                "Tu cuerpo todavía está intentando asegurarse de que estás a salvo."
                                            </p>
                                        </div>
                                        <p className="text-[#1C1C1C]/70 font-light mb-4">Puede sentirse como:</p>
                                        <ul className="grid grid-cols-2 gap-3 text-[#1C1C1C] font-medium mb-10">
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#C97C5D]" /> Tensión constante</li>
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#C97C5D]" /> Ansiedad frecuente</li>
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#C97C5D]" /> Hipervigilancia</li>
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#C97C5D]" /> Dificultad para descansar</li>
                                        </ul>
                                        
                                        <h3 className="font-bold text-lg mb-4">Recomendaciones inmediatas:</h3>
                                        <ul className="space-y-4 mb-8">
                                            <li className="flex items-center gap-3 bg-[#F5EFE6] p-4 rounded-xl"><Wind className="w-5 h-5 text-[#C97C5D]" /> Respiración lenta 4–6</li>
                                            <li className="flex items-center gap-3 bg-[#F5EFE6] p-4 rounded-xl"><Activity className="w-5 h-5 text-[#C97C5D]" /> Grounding 5-4-3-2-1</li>
                                            <li className="flex items-center gap-3 bg-[#F5EFE6] p-4 rounded-xl"><Eye className="w-5 h-5 text-[#C97C5D]" /> Reducción de estímulos</li>
                                        </ul>
                                    </div>
                                )}

                                {profile === 'congelamiento' && (
                                    <div className="bg-white p-10 rounded-[3rem] shadow-xl border-t-8 border-[#C8A45D] text-left">
                                        <span className="text-xs font-bold text-[#C8A45D] tracking-widest uppercase mb-4 block">Perfil: Bloqueo / Congelamiento</span>
                                        <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">
                                            Tu sistema nervioso está reduciendo energía para protegerte.
                                        </h2>
                                        <div className="bg-[#C8A45D]/10 p-6 rounded-2xl mb-8">
                                            <p className="text-[#C8A45D] font-bold text-lg italic">
                                                "Tu cuerpo está tratando de estabilizarse después del impacto."
                                            </p>
                                        </div>
                                        <p className="text-[#1C1C1C]/70 font-light mb-4">Puede sentirse como:</p>
                                        <ul className="grid grid-cols-2 gap-3 text-[#1C1C1C] font-medium mb-10">
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]" /> Desconexión</li>
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]" /> Cansancio emocional</li>
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]" /> Falta de motivación</li>
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]" /> Sensación de apagamiento</li>
                                        </ul>
                                        
                                        <h3 className="font-bold text-lg mb-4">Recomendaciones inmediatas:</h3>
                                        <ul className="space-y-4 mb-8">
                                            <li className="flex items-center gap-3 bg-[#F5EFE6] p-4 rounded-xl"><Activity className="w-5 h-5 text-[#C8A45D]" /> Movimiento suave</li>
                                            <li className="flex items-center gap-3 bg-[#F5EFE6] p-4 rounded-xl"><HeartPulse className="w-5 h-5 text-[#C8A45D]" /> Contacto corporal</li>
                                            <li className="flex items-center gap-3 bg-[#F5EFE6] p-4 rounded-xl"><Brain className="w-5 h-5 text-[#C8A45D]" /> Rutinas simples</li>
                                        </ul>
                                    </div>
                                )}

                                {profile === 'regulacion' && (
                                    <div className="bg-white p-10 rounded-[3rem] shadow-xl border-t-8 border-[#7C8B6A] text-left">
                                        <span className="text-xs font-bold text-[#7C8B6A] tracking-widest uppercase mb-4 block">Perfil: Regulación Parcial</span>
                                        <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">
                                            Tu sistema nervioso está recuperando estabilidad progresivamente.
                                        </h2>
                                        <div className="bg-[#7C8B6A]/10 p-6 rounded-2xl mb-8">
                                            <p className="text-[#7C8B6A] font-bold text-lg italic">
                                                "Tu sistema está empezando a regularse."
                                            </p>
                                        </div>
                                        <p className="text-[#1C1C1C]/70 font-light mb-4">Puede sentirse como:</p>
                                        <ul className="grid grid-cols-2 gap-3 text-[#1C1C1C] font-medium mb-10">
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#7C8B6A]" /> Momentos de calma</li>
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#7C8B6A]" /> Mejor respiración</li>
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#7C8B6A]" /> Mayor presencia</li>
                                        </ul>
                                        
                                        <h3 className="font-bold text-lg mb-4">Recomendaciones inmediatas:</h3>
                                        <ul className="space-y-4 mb-8">
                                            <li className="flex items-center gap-3 bg-[#F5EFE6] p-4 rounded-xl"><Activity className="w-5 h-5 text-[#7C8B6A]" /> Mantener hábitos</li>
                                            <li className="flex items-center gap-3 bg-[#F5EFE6] p-4 rounded-xl"><Brain className="w-5 h-5 text-[#7C8B6A]" /> Descanso</li>
                                            <li className="flex items-center gap-3 bg-[#F5EFE6] p-4 rounded-xl"><HeartPulse className="w-5 h-5 text-[#7C8B6A]" /> Continuidad de práctica</li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="bg-[#1C1C1C] p-10 rounded-[3rem] shadow-2xl text-center text-white">
                                <h3 className="text-2xl font-heading font-bold mb-6">
                                    Si quieres, podemos acompañarte en este proceso
                                </h3>
                                <Link 
                                    href="/venezuela-en-el-cuerpo-caracas/success"
                                    className="inline-flex w-full sm:w-auto bg-[#7C8B6A] text-[#F5EFE6] px-8 py-5 rounded-2xl font-bold hover:bg-[#F5EFE6] hover:text-[#1C1C1C] transition-colors shadow-lg items-center justify-center gap-3 group"
                                >
                                    Acceder a la guía completa de regulación
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.section>
                    );
                })()}
            </AnimatePresence>
        </main>
    );
}
