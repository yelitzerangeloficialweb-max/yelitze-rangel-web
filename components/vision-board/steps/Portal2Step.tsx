'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Info, Zap, Sparkles, Loader2, Lightbulb, Eye } from 'lucide-react';
import Image from 'next/image';

interface Props {
    value: string;
    onChange: (val: string) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function Portal2Step({ value, onChange, onNext, onBack }: Props) {
    const [isRefining, setIsRefining] = useState(false);
    const [moduleResponses, setModuleResponses] = useState<string[]>(["", ""]);

    const handleRefine = async () => {
        const combinedContext = `Módulos completados:
${modules.map((m, i) => `${m.headline}: ${moduleResponses[i]}`).join('\n')}

Frontera de enfoque actual: ${value}`;

        if (!combinedContext.trim() || (value.trim().length < 10 && moduleResponses.every(r => !r.trim()))) {
            return;
        }

        setIsRefining(true);
        try {
            const res = await fetch('/api/ai/refine-text', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: combinedContext,
                    context: "Portal 2: Orden Sistémico - Fronteras de Enfoque. Integra los hallazgos en una declaración firme de no-negociables para proteger la energía."
                })
            });
            const data = await res.json();
            if (data.refinedText) {
                onChange(data.refinedText);
            }
        } catch (error) {
            console.error("Refinement failed:", error);
        } finally {
            setIsRefining(false);
        }
    };

    const modules = [
        {
            headline: "Distracciones Maestras",
            context: "Actividades que parecen productivas pero te alejan de tu Diseño Maestro.",
            action: "¿Qué 'buena idea' está matando tu 'gran idea'?",
            example: "Pasar horas perfeccionando un reporte que nadie lee en lugar de vender el proyecto."
        },
        {
            headline: "La Voz de la Intuición",
            context: "Ese saber interno que ya te dijo por dónde es, pero no has escuchado.",
            action: "¿Qué verdad estás ignorando hoy?",
            example: "Mi cuerpo me dice que este socio no es el correcto, aunque los números parezcan buenos."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 bg-[#F5EFE6] rounded-[3rem] min-h-[80vh] flex flex-col justify-center relative">
            {/* Brand Graphic Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8C4005]/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-[#B8835A]/5 blur-[120px] rounded-full pointer-events-none" />

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;600&display=swap');
                
                .font-editorial { font-family: 'Cormorant Garamond', serif; }
                .font-guide { font-family: 'Montserrat', sans-serif; }
            `}</style>

            {/* Header Section */}
            <div className="text-center mb-16 space-y-4">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[#8C4005] tracking-[0.5em] font-bold text-[10px] md:text-xs uppercase block font-guide">
                        PORTAL 2
                    </span>
                    <Eye className="w-5 h-5 text-[#8C4005]/40" />
                </div>
                <h2 className="text-5xl md:text-7xl font-editorial text-[#2D2926] leading-tight">Foco y Dispersión</h2>
                <p className="text-[#3C2A21] italic text-xl md:text-2xl font-editorial tracking-wide opacity-90">¿Dónde perdí mi centro?</p>
            </div>

            {/* Main Workspace */}
            <div className="bg-white p-8 md:p-16 rounded-[3rem] shadow-[0_20px_60px_rgba(45,41,38,0.06)] border border-[#3C2A21]/10 relative overflow-hidden mb-12">
                {/* Active Zone Marker */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-[75%] bg-[#8C4005] rounded-r-full" />

                <div className="mb-12 p-6 bg-[#F9F7F2] rounded-2xl text-sm md:text-base text-[#3C2A21]/80 leading-relaxed italic border-l-4 border-[#8C4005] font-guide">
                    La dispersión es una forma sutil de abandono propio. Identificar dónde se fuga nuestra atención es el primer paso para recuperarla.
                </div>

                <div className="space-y-16">
                    {modules.map((mod, i) => (
                        <div key={i} className="space-y-6 relative">
                            <h3 className="text-2xl font-bold text-[#2D2926] font-guide tracking-tight">{mod.headline}</h3>

                            <div className="grid lg:grid-cols-2 gap-10 items-start">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-[#2D2926]/5 p-2 rounded-full mt-0.5">
                                            <Info className="w-4 h-4 text-[#2D2926]" />
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2D2926]/60 font-guide">Contexto</span>
                                            <p className="text-base font-normal text-[#3C2A21]/80 font-guide leading-relaxed">
                                                {mod.context}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-[#8C4005]/10 p-2 rounded-full mt-0.5">
                                            <Zap className="w-4 h-4 text-[#8C4005]" />
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C4005] font-guide">Acción</span>
                                            <p className="text-base font-bold text-[#8C4005] font-guide">
                                                {mod.action}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#F9F7F2] p-8 rounded-[2rem] border border-[#3C2A21]/10 shadow-[inner_0_2px_4px_rgba(0,0,0,0.02)] transition-all hover:bg-white hover:border-[#8C4005]/20 flex flex-col">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Lightbulb className="w-4 h-4 text-[#8C4005]" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C4005] font-guide block">Mi Hallazgo</span>
                                    </div>
                                    <textarea
                                        value={moduleResponses[i]}
                                        onChange={(e) => {
                                            const newRes = [...moduleResponses];
                                            newRes[i] = e.target.value;
                                            setModuleResponses(newRes);
                                        }}
                                        placeholder={`Ej: ${mod.example}`}
                                        className="w-full h-full min-h-[120px] bg-transparent border-none outline-none resize-none text-lg italic text-[#2D2926] font-editorial leading-relaxed placeholder:text-[#3C2A21]/20"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Final Input Area */}
                <div className="mt-20 space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-px bg-[#3C2A21]/20" />
                            <span className="text-[11px] font-bold uppercase tracking-widest text-[#3C2A21]/50 font-guide">Frontera de Enfoque</span>
                        </div>
                        <p className="text-[#3C2A21]/60 font-guide text-sm leading-relaxed max-w-2xl">
                            Utiliza estos hallazgos para trazar tu nueva frontera de enfoque. ¿Cómo vas a proteger tu centro a partir de ahora?
                        </p>
                    </div>

                    <div className="flex justify-end pr-4">
                        <button
                            onClick={handleRefine}
                            disabled={isRefining || (!value.trim() && moduleResponses.every(r => !r.trim()))}
                            className="bg-[#8C4005] text-white px-6 py-3 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-[#B8835A] transition-all disabled:opacity-20 disabled:cursor-not-allowed uppercase tracking-widest shadow-lg"
                        >
                            {isRefining ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Sparkles className="w-4 h-4" />
                            )}
                            Refinar con Yelitze
                        </button>
                    </div>

                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Define tus no-negociables para proteger tu energía..."
                        className="w-full h-64 p-10 bg-[#F9F7F2] border border-[#3C2A21]/5 rounded-[2.5rem] focus:ring-2 focus:ring-[#8C4005]/20 focus:bg-white outline-none resize-none text-[#2D2926] text-2xl font-light font-editorial placeholder:text-[#3C2A21]/30 transition-all shadow-inner"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-4">
                <button
                    onClick={onBack}
                    className="px-10 py-5 rounded-full border-2 border-[#3C2A21]/10 text-[#3C2A21]/60 hover:text-[#3C2A21] hover:border-[#3C2A21]/30 hover:bg-white transition-all flex items-center gap-2 font-guide text-sm font-bold uppercase tracking-widest"
                >
                    <ArrowLeft className="w-4 h-4" /> Anterior
                </button>
                <button
                    onClick={onNext}
                    disabled={!value.trim()}
                    className="bg-[#2D2926] text-[#F9F7F2] px-14 py-6 rounded-2xl font-bold uppercase tracking-[0.25em] text-xs hover:scale-[1.02] shadow-[0_20px_40px_rgba(45,41,38,0.2)] disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-95 group flex items-center gap-4 font-guide"
                >
                    TRAZAR MI FRONTERA
                    <Eye className="w-5 h-5 group-hover:fill-current transition-all" />
                </button>
            </div>
        </div>
    );
}
