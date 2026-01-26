'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Lock } from 'lucide-react';

interface StepEmailProps {
    onSubmit: (name: string, email: string) => void;
    isLoading: boolean;
}

export default function StepEmail({ onSubmit, isLoading }: StepEmailProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email) {
            onSubmit(name, email);
        }
    };

    return (
        <div className="max-w-md mx-auto w-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-3xl shadow-2xl border border-[var(--color-primary)]/10 text-center"
            >
                <div className="w-16 h-16 bg-[var(--color-secondary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8 text-[var(--color-secondary)]" />
                </div>

                <h2 className="text-2xl font-heading text-[var(--color-primary)] mb-2">
                    Tu resultado está listo
                </h2>
                <p className="text-gray-600 mb-8 text-sm">
                    Para entregarte este mensaje con el cuidado que merece, necesito saber a quién me dirijo.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 ml-1">Nombre</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[var(--color-primary)] focus:bg-white focus:outline-none transition-all"
                            placeholder="¿Cómo te llamas?"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 ml-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[var(--color-primary)] focus:bg-white focus:outline-none transition-all"
                            placeholder="tucorreo@ejemplo.com"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-6 py-4 bg-[var(--color-primary)] text-white rounded-xl font-bold hover:bg-[var(--color-primary-light)] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="animate-pulse">Generando respuesta...</span>
                        ) : (
                            <>
                                Recibir mi resultado
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 mt-6">
                    <Lock className="w-3 h-3" />
                    <span>Tus datos están seguros y se tratarán con amor.</span>
                </div>
            </motion.div>
        </div>
    );
}
