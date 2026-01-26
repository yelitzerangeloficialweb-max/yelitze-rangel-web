'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { QUESTIONS, HeridaOption } from '@/lib/heridas-data';

interface StepQuizProps {
    onComplete: (answers: Record<number, HeridaOption>) => void;
}

export default function StepQuiz({ onComplete }: StepQuizProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, HeridaOption>>({});
    const [direction, setDirection] = useState(1);

    const currentQuestion = QUESTIONS[currentIndex];
    const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

    const handleOptionSelect = (option: HeridaOption) => {
        const newAnswers = { ...answers, [currentQuestion.id]: option };
        setAnswers(newAnswers);

        setTimeout(() => {
            if (currentIndex < QUESTIONS.length - 1) {
                setDirection(1);
                setCurrentIndex(prev => prev + 1);
            } else {
                onComplete(newAnswers);
            }
        }, 350); // Small delay for visual feedback
    };

    const variants = {
        enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
        center: { zIndex: 1, x: 0, opacity: 1 },
        exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 }),
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 min-h-[500px]">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    <span>Pregunta {currentIndex + 1} de {QUESTIONS.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-[var(--color-primary)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <div className="relative">
                <AnimatePresence initial={false} custom={direction} mode='wait'>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ opacity: { duration: 0.2 }, x: { type: "spring", stiffness: 300, damping: 30 } }}
                        className="w-full"
                    >
                        <h2 className="text-2xl md:text-3xl font-heading text-[var(--color-text)] mb-8 leading-snug">
                            {currentQuestion.text}
                        </h2>

                        <div className="grid gap-4">
                            {currentQuestion.options.map((option, idx) => {
                                const isSelected = answers[currentQuestion.id] === option;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionSelect(option)}
                                        className={`
                                            group w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between
                                            ${isSelected
                                                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-inner'
                                                : 'border-gray-100 bg-white hover:border-[var(--color-secondary)] hover:shadow-md'
                                            }
                                        `}
                                    >
                                        <span className={`text-base md:text-lg font-medium transition-colors ${isSelected ? 'text-[var(--color-primary)]' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                            {option.label}
                                        </span>

                                        {isSelected ? (
                                            <div className="bg-[var(--color-primary)] text-white rounded-full p-1">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        ) : (
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
