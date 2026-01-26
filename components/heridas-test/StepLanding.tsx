'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface StepLandingProps {
    onNext: () => void;
}

export default function StepLanding({ onNext }: StepLandingProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-48 h-48 md:w-64 md:h-64 mb-4"
            >
                <div className="absolute inset-0 bg-amber-100 rounded-full blur-3xl opacity-60 animate-pulse" />
                <Image
                    src="/assets/images/tests/test_childhood_wounds.png"
                    alt="Niño Interior"
                    fill
                    className="object-contain drop-shadow-xl relative z-10"
                />
            </motion.div>

            <div className="space-y-4 max-w-2xl">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-5xl font-heading text-[var(--color-primary)] leading-tight"
                >
                    ¿Qué herida de tu infancia sigue hablando en tu vida adulta?
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-[var(--color-text-light)] italic"
                >
                    Un test breve, amoroso y revelador.<br />
                    No es diagnóstico. Es conciencia.
                </motion.p>
            </div>

            <motion.button
                onClick={onNext}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 px-8 py-4 bg-[var(--color-primary)] text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-[var(--color-primary-light)] transition-all"
            >
                <Sparkles className="w-5 h-5" />
                Quiero descubrirlo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
        </div>
    );
}
