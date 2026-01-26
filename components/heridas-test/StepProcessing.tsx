'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface StepProcessingProps {
    onComplete: () => void;
}

const MESSAGES = [
    "Recibiendo tus respuestas...",
    "Leyendo tu historia...",
    "Conectando con tu niño interior...",
    "Identificando tu herida raíz..."
];

export default function StepProcessing({ onComplete }: StepProcessingProps) {
    const [msgIndex, setMsgIndex] = useState(0);

    useEffect(() => {
        // Cycle messages
        const msgInterval = setInterval(() => {
            setMsgIndex(prev => (prev + 1) % MESSAGES.length);
        }, 1500);

        // Finish after 5 seconds
        const timeout = setTimeout(() => {
            onComplete();
        }, 5000);

        return () => {
            clearInterval(msgInterval);
            clearTimeout(timeout);
        };
    }, [onComplete]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="mb-10 relative w-32 h-32"
            >
                <div className="absolute inset-0 bg-[var(--color-secondary)]/10 rounded-full blur-2xl animate-pulse delay-100" />
                <div className="relative w-full h-full">
                    {/* Using img for direct asset, or next/image if configured */}
                    <img
                        src="/assets/images/loading-logo.png"
                        alt="Cargando..."
                        className="w-full h-full object-contain"
                    />
                </div>
            </motion.div>

            <div className="h-16 relative w-full max-w-md">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={msgIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xl font-heading text-[var(--color-primary)] absolute inset-0 flex items-center justify-center"
                    >
                        {MESSAGES[msgIndex]}
                    </motion.p>
                </AnimatePresence>
            </div>

            <p className="text-sm text-gray-400 mt-4 animate-pulse">
                Respira un momento...
            </p>
        </div>
    );
}
