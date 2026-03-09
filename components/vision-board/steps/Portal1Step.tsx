'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Info, Zap } from 'lucide-react';

interface Props {
    value: string;
    onChange: (val: string) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function Portal1Step({ value, onChange, onNext, onBack }: Props) {
    const modules = [
        {
            headline: "Desgaste Emocional",
            context: "Áreas de bajo retorno emocional donde tu energía se diluye sin propósito.",
            action: "Identifica el patrón repetitivo.",
            example: "Invertí meses tratando de salvar un proyecto que no valoraba mi tiempo."
        },
        {
            headline: "Fugas de Energía",
            context: "Eventos o personas que drenan tu vitalidad de forma inmediata.",
            action: "Localiza el punto exacto de fuga.",
            example: "Reuniones de comité de 3 horas que terminan en cero acuerdos."
        },
        {
            headline: "Límites: El 'Sí' Falso",
            context: "Compromisos adquiridos por miedo, culpa o lealtad sistémica.",
            action: "Reconoce dónde tu cuerpo dijo 'no'.",
            example: "Decir sí a un evento social cuando mi cuerpo necesitaba descanso real."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 bg-[#F9F7F2] rounded-[3rem] min-h-[80vh] flex flex-col justify-center">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;600&display=swap');
                
                .font-editorial { font-family: 'Cormorant Garamond', serif; }
                .font-guide { font-family: 'Montserrat', sans-serif; }
            `}</style>

            {/* Header Section */}
            <div className="text-center mb-16 space-y-4">
                <span className="text-[#A27B5C] tracking-[0.5em] font-bold text-[10px] md:text-xs uppercase block font-guide">
                    PORTAL 1
                </span>
                <h2 className="text-5xl md:text-7xl font-editorial text-[#3C2A21] leading-tight">Cierre Consciente</h2>
                <p className="text-[#A27B5C] italic text-xl md:text-2xl font-editorial tracking-wide">¿A dónde se fue mi energía?</p>
            </div>

            {/* Main Workspace */}
            <div className="bg-white p-8 md:p-16 rounded-[3rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#3C2A21]/5 relative overflow-hidden mb-12">
                {/* Active Zone Marker */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[70%] bg-[#A27B5C] rounded-r-full opacity-60" />

                <div className="space-y-16">
                    {modules.map((mod, i) => (
                        <div key={i} className="space-y-6 relative">
                            <h3 className="text-2xl font-bold text-[#3C2A21] font-guide tracking-tight">{mod.headline}</h3>

                            <div className="grid lg:grid-cols-2 gap-10 items-start">
                                <div className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-stone-100 p-1.5 rounded-full mt-0.5">
                                            <Info className="w-3.5 h-3.5 text-stone-400" />
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 font-guide">Contexto</span>
                                            <p className="text-sm font-light text-stone-500 font-guide leading-relaxed">
                                                {mod.context}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="bg-[#A27B5C]/10 p-1.5 rounded-full mt-0.5">
                                            <Zap className="w-3.5 h-3.5 text-[#A27B5C]" />
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A27B5C] font-guide">Acción</span>
                                            <p className="text-sm font-semibold text-[#A27B5C] font-guide">
                                                {mod.action}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#F9F7F2]/80 p-6 rounded-[2rem] border border-[#A27B5C]/10 hover:border-[#A27B5C]/30 transition-colors">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#A27B5C]/60 font-guide block mb-2">El Espejo (Ejemplo)</span>
                                    <p className="text-base italic text-[#3C2A21]/80 font-editorial leading-relaxed">
                                        "{mod.example}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Final Input Area */}
                <div className="mt-20 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-px bg-stone-200" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 font-guide">Espacio de Integración</span>
                    </div>
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Integra tus hallazgos aquí. Termina con una declaración de liberación (ej: 'Cierro este ciclo para reclamar mi soberanía')."
                        className="w-full h-56 p-10 bg-[#F9F7F2] border-none rounded-[2.5rem] focus:ring-2 focus:ring-[#A27B5C]/20 outline-none resize-none text-[#3C2A21] text-xl font-light font-editorial placeholder:text-stone-300 transition-all shadow-inner"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <button
                    onClick={onBack}
                    className="px-8 py-4 rounded-full border border-stone-200 text-stone-400 hover:text-stone-600 hover:bg-white transition-all flex items-center gap-2 font-guide text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" /> Anterior
                </button>
                <button
                    onClick={onNext}
                    disabled={!value.trim()}
                    className="bg-[#3C2A21] text-[#F9F7F2] px-12 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:scale-[1.02] shadow-[0_15px_30px_rgba(60,42,33,0.15)] disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-95 group flex items-center gap-3 font-guide"
                >
                    CONSOLIDAR MI CIERRE
                    <Zap className="w-4 h-4 group-hover:fill-current transition-all" />
                </button>
            </div>
        </div>
    );
}
