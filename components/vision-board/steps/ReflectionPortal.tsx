'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Props {
    portalNumber: number;
    title: string;
    subtitle: string;
    description?: string; // New description prop
    questions: string[];
    value: string;
    onChange: (val: string) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function ReflectionPortal({ portalNumber, title, subtitle, description, questions, value, onChange, onNext, onBack }: Props) {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
                <span className="text-[var(--color-secondary)] tracking-[0.2em] font-medium text-sm block mb-2">
                    PORTAL {portalNumber}
                </span>
                <h2 className="text-3xl md:text-4xl font-heading text-[var(--color-primary)] mb-2">{title}</h2>
                <p className="text-[var(--color-text-light)] italic">{subtitle}</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-[var(--color-primary)]/5 mb-8">
                {/* Render Description above questions if present */}
                {description && (
                    <div className="mb-6 p-4 bg-[var(--color-background)] rounded-lg text-sm text-[var(--color-text)] leading-relaxed italic border-l-4 border-[var(--color-secondary)]">
                        {description}
                    </div>
                )}

                <div className="mb-6 space-y-2">
                    {questions.map((q, i) => (
                        <p key={i} className="text-sm font-medium text-[var(--color-primary)]">• {q}</p>
                    ))}
                </div>

                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Escribe aquí tu reflexión..."
                    className="w-full h-40 p-4 border rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none resize-none bg-[var(--color-background)]"
                />
            </div>

            <div className="flex justify-between">
                <button onClick={onBack} className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center gap-2 font-medium">
                    <ArrowLeft className="w-4 h-4" /> Anterior
                </button>
                <button
                    onClick={onNext}
                    disabled={!value.trim()}
                    className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-[var(--color-primary-light)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    Siguiente <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
