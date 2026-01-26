'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface StepContainmentProps {
    onNext: () => void;
}

export default function StepContainment({ onNext }: StepContainmentProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center max-w-xl mx-auto space-y-8">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-4"
            >
                <Heart className="w-8 h-8 fill-current" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-6 text-[var(--color-text)]"
            >
                <h3 className="text-2xl font-heading text-[var(--color-primary)]">
                    Respira profundo...
                </h3>
                <p className="text-lg leading-relaxed">
                    No hay respuestas "correctas" ni "incorrectas".<br />
                    Tampoco hay nada "roto" en ti.
                </p>
                <p className="text-lg font-medium">
                    Solo escucha lo que resuena verdaderamente en tu corazón hoy.
                </p>
            </motion.div>

            <motion.button
                onClick={onNext}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]/30 hover:border-[var(--color-primary)] pb-1 transition-all uppercase tracking-widest text-sm font-bold mt-8"
            >
                Estoy listo/a
            </motion.button>
        </div>
    );
}
