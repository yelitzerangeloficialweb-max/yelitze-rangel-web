'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MagicStepProcessingProps {
    onComplete: () => void;
}

const MESSAGES = [
    "Yelitze Rangel AI está analizando tu linaje...",
    "Conectando con tus memorias congeladas...",
    "Identificando lealtades invisibles...",
    "Tejiendo tu mapa de sanación ancestral...",
    "Preparando tu puente de poder..."
];

export default function MagicStepProcessing({ onComplete }: MagicStepProcessingProps) {
    const [msgIndex, setMsgIndex] = useState(0);

    useEffect(() => {
        const msgInterval = setInterval(() => {
            setMsgIndex(prev => (prev + 1) % MESSAGES.length);
        }, 2000);

        const timeout = setTimeout(() => {
            onComplete();
        }, 10000); // 10 seconds for a "premium" analysis feel

        return () => {
            clearInterval(msgInterval);
            clearTimeout(timeout);
        };
    }, [onComplete]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            {/* Golden Seed Animation */}
            <div className="relative mb-16">
                {/* Background Glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-yellow-400/20 rounded-full blur-3xl -z-10"
                />

                {/* The "Seed" */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative w-40 h-40"
                >
                    {/* Golden Circle/Seed */}
                    <div className="absolute inset-0 border-2 border-yellow-500/30 rounded-full" />

                    <motion.div
                        animate={{
                            rotate: 360,
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="w-full h-full p-4"
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-500 fill-current drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                            <path d="M50 10 C30 30 20 50 50 90 C80 50 70 30 50 10 Z" />
                            {/* Inner Details */}
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 5, repeat: Infinity }}
                                d="M50 30 Q60 45 50 60 Q40 45 50 30"
                                fill="none"
                                stroke="white"
                                strokeWidth="1"
                                opacity="0.5"
                            />
                        </svg>
                    </motion.div>

                    {/* Orbiting particles */}
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 3 + i,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute inset-0"
                        >
                            <div
                                className="w-2 h-2 bg-yellow-400 rounded-full blur-[1px] shadow-[0_0_8px_rgba(234,179,8,0.8)]"
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '-4px',
                                    transform: 'translateY(-50%)'
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Analysis Messages */}
            <div className="h-20 relative w-full max-w-xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={msgIndex}
                        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 flex flex-col items-center justify-center p-4"
                    >
                        <p className="text-2xl md:text-3xl font-heading bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-800 bg-clip-text text-transparent">
                            {MESSAGES[msgIndex]}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <p className="text-gray-400 font-light tracking-[0.2em] uppercase text-[10px] mt-12 animate-pulse">
                Iniciando transmutación de memorias...
            </p>
        </div>
    );
}
