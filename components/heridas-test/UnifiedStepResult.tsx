'use client';

import { motion } from 'framer-motion';
import { Share2, ArrowRight, Sparkles, Brain } from 'lucide-react';

interface UnifiedStepResultProps {
    analysis: string;
    userName: string;
    onFinalize: () => void;
}

export default function UnifiedStepResult({ analysis, userName, onFinalize }: UnifiedStepResultProps) {
    // Split analysis into paragraphs (assuming 3 as per prompt)
    const paragraphs = analysis.split('\n\n').filter(p => p.trim() !== '');

    return (
        <div className="min-h-screen bg-[#F5F5F5] py-12 px-4 relative overflow-hidden">
            {/* Marble Texture Overlay (Subtle) */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/marble-surface.png")' }}
            />

            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/20 rounded-full blur-[100px] -z-10" />

            <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-yellow-500/20 text-yellow-700 text-xs font-bold tracking-[0.2em] uppercase shadow-sm"
                    >
                        <Sparkles className="w-3 h-3" />
                        Análisis Alquímico Finalizado
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-heading text-[var(--color-primary)] drop-shadow-sm"
                    >
                        Tu Mapa de Sanación, <span className="italic">{userName}</span>
                    </motion.h1>
                </div>

                {/* Main Results "Tablet" */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative group"
                >
                    {/* Floating Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 rounded-[2rem] blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

                    {/* The Tablet */}
                    <div className="relative bg-white/90 backdrop-blur-md rounded-[2rem] border border-white shadow-2xl p-8 md:p-16 overflow-hidden">
                        {/* Marble Veins Pattern (SVG) */}
                        <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 100 100">
                            <path d="M0 20 Q30 50 100 80" stroke="currentColor" fill="none" strokeWidth="0.5" />
                            <path d="M100 10 Q60 40 0 90" stroke="currentColor" fill="none" strokeWidth="0.5" />
                        </svg>

                        {/* Top Icon Area */}
                        <div className="flex justify-center mb-12">
                            <div className="relative">
                                <motion.div
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 6, repeat: Infinity }}
                                    className="w-24 h-24 bg-gradient-to-br from-[#1C1C1C] to-[#333] rounded-full flex items-center justify-center p-6 shadow-[0_0_30px_rgba(0,0,0,0.2)]"
                                >
                                    <Brain className="w-full h-full text-yellow-500" />
                                </motion.div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center border-4 border-white">
                                    <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar (Nivel de Memorias Congeladas) */}
                        <div className="mb-16 space-y-4">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#666]">
                                <span>Activación de Memorias</span>
                                <span>Descifrando...</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-100">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 2, delay: 0.5 }}
                                    className="h-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 rounded-full"
                                />
                            </div>
                        </div>

                        {/* Analysis Content */}
                        <div className="space-y-10">
                            {paragraphs.map((para, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + (i * 0.2) }}
                                    className="relative pl-8 md:pl-12"
                                >
                                    {/* Vertical Gold Marker */}
                                    <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-gradient-to-b from-yellow-500 to-transparent opacity-50" />

                                    <div className="space-y-2">
                                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-yellow-600/60">
                                            Sección 0{i + 1}
                                        </span>
                                        <p className="text-xl md:text-2xl leading-relaxed text-[#2D2D2D] font-light">
                                            {para}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* CTA & Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="flex flex-col items-center gap-8 py-8"
                >
                    <div className="text-center space-y-4 max-w-xl">
                        <p className="text-[#666] italic text-lg">
                            "Tu diagnóstico es solo el inicio. El verdadero poder reside en lo que hagas con este conocimiento."
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        {/* Premium Orange Oxide Button */}
                        <button
                            onClick={onFinalize}
                            className="bg-[#D35400] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-[#E67E22] transition-all transform hover:scale-105 hover:shadow-[0_10px_30px_rgba(211,84,0,0.4)] flex items-center gap-3 group"
                        >
                            Inscríbete Ahora
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button className="flex items-center gap-2 text-gray-500 hover:text-[var(--color-primary)] transition-colors font-medium">
                            <Share2 className="w-5 h-5" />
                            Compartir Resultado
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
