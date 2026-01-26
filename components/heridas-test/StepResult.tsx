'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, RefreshCw, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface StepResultProps {
    resultText: string;
    onFinalize: () => void;
}

export default function StepResult({ resultText, onFinalize }: StepResultProps) {
    // Split the result into chunks for "chat-like" appearance if needed, 
    // but the prompt returns blocks. We'll render it as one markdown stream or blocks.

    return (
        <div className="w-full max-w-3xl mx-auto px-4 pb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
                {/* Chat Header */}
                <div className="bg-[var(--color-primary)] p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-white/30 overflow-hidden relative">
                        {/* Placeholder for Yelitze avatar or Logo */}
                        <div className="absolute inset-0 bg-[var(--color-secondary)] flex items-center justify-center text-white font-bold text-lg">YR</div>
                    </div>
                    <div>
                        <h3 className="text-white font-bold">Yelitzé Rangel</h3>
                        <p className="text-white/70 text-xs flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            En línea ahora
                        </p>
                    </div>
                </div>

                {/* Chat Body */}
                <div className="p-6 md:p-10 bg-gray-50 min-h-[400px] space-y-8">
                    {/* Simulated Message Bubble */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex gap-4"
                    >
                        <div className="w-8 h-8 rounded-full bg-[var(--color-secondary)] flex-shrink-0 flex items-center justify-center text-white text-xs mt-1">YR</div>
                        <div className="bg-white p-6 rounded-2xl rounded-tl-none shadow-sm text-gray-700 leading-relaxed border border-gray-100 max-w-[90%]">
                            <div className="prose prose-stone prose-p:mb-4 prose-headings:text-[var(--color-primary)] prose-strong:text-[var(--color-secondary)]">
                                <ReactMarkdown>
                                    {resultText}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-white border-t border-gray-100 flex flex-col items-center gap-4">
                    <button
                        onClick={onFinalize}
                        className="w-full md:w-auto px-8 py-4 bg-[var(--color-secondary)] text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-amber-600 transition-all flex items-center justify-center gap-2"
                    >
                        Gracias, quiero recibir mi PDF
                        <Download className="w-5 h-5" />
                    </button>

                    <p className="text-xs text-gray-400 text-center max-w-md">
                        Esta lectura es una guía espiritual y emocional, no sustituye terapia clínica profesional.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
