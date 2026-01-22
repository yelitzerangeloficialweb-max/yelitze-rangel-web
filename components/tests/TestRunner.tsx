'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Loader2, Sparkles, Download, FileText } from 'lucide-react';
import { TestDefinition } from '@/lib/tests-data';
import { cn } from '@/lib/utils';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface TestRunnerProps {
    test: TestDefinition;
}

export default function TestRunner({ test }: TestRunnerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [direction, setDirection] = useState(1);
    const pdfContentRef = useRef<HTMLDivElement>(null);

    // AI States
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

    // Lead Capture States
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const currentQuestion = test.questions[currentIndex];
    const progress = ((currentIndex) / test.questions.length) * 100;

    const handleOptionSelect = (value: number) => {
        const newAnswers = { ...answers, [currentQuestion.id]: value };
        setAnswers(newAnswers);

        setTimeout(() => {
            if (currentIndex < test.questions.length - 1) {
                setDirection(1);
                setCurrentIndex((prev) => prev + 1);
            } else {
                setShowLeadForm(true);
            }
        }, 400);
    };

    const handleLeadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting test results for:", userName, userEmail);
        finishTest(answers, userName, userEmail);
    };

    const finishTest = async (finalAnswers: Record<string, number>, name: string, email: string) => {
        setShowLeadForm(false);
        setIsFinished(true);
        setIsAnalyzing(true);

        const score = Object.values(finalAnswers).reduce((a, b) => a + b, 0);
        const maxScore = test.questions.length * 3;

        console.log("Sending to API:", { testTitle: test.title, score, userName: name, userEmail: email });

        try {
            const response = await fetch('/api/ai/analyze-test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    testTitle: test.title,
                    answers: finalAnswers,
                    score,
                    maxScore,
                    userName: name, // This MUST match the key in API
                    userEmail: email // This MUST match the key in API
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error en análisis');
            }

            const data = await response.json();
            setAiAnalysis(data.analysis);
        } catch (error: any) {
            console.error(error);
            const errorMessage = error.message || "Error desconocido";
            setAiAnalysis(`**La energía está densa en este momento.**\n\nError técnico: ${errorMessage}\n\nPor favor intenta de nuevo más tarde.`);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleDownloadPDF = async () => {
        const element = pdfContentRef.current;
        if (!element) return;

        await document.fonts.ready;

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        pdf.save(`Resultado_Test_${userName.replace(/\s/g, '_')}.pdf`);
    };

    // Animation Variants
    const variants = {
        enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
        center: { zIndex: 1, x: 0, opacity: 1 },
        exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 }),
    };

    if (showLeadForm) {
        return (
            <div className="max-w-xl mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-2xl shadow-xl border border-[var(--color-primary)]/10 text-center"
                >
                    <div className="w-16 h-16 bg-[var(--color-secondary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="w-8 h-8 text-[var(--color-secondary)]" />
                    </div>

                    <h2 className="text-2xl font-heading text-[var(--color-primary)] mb-2">
                        ¡Tu Resultado está Listo!
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Para revelar la lectura de tu energía y recibir tu análisis personalizado, por favor ingresa tus datos.
                    </p>

                    <form onSubmit={handleLeadSubmit} className="space-y-4 text-left">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                            <input
                                required
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-colors"
                                placeholder="Tu nombre"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                            <input
                                required
                                type="email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-colors"
                                placeholder="tu@email.com"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-4 py-4 bg-[var(--color-primary)] text-white rounded-xl font-bold hover:bg-[var(--color-primary-light)] transition-all flex items-center justify-center gap-2 group"
                        >
                            Ver Mi Resultado
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <p className="text-xs text-gray-400 mt-6">
                        Tus datos son confidenciales y se usarán para enviarte información valiosa sobre sanación ancestral.
                    </p>
                </motion.div>
            </div>
        );
    }

    if (isFinished) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                {isAnalyzing ? (
                    <div className="text-center min-h-[500px] flex flex-col items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-6"
                        >
                            <Loader2 className="w-16 h-16 text-[var(--color-primary)] animate-spin mx-auto" />
                            <h2 className="text-2xl font-heading text-[var(--color-primary)]">
                                Conectando con tu energía, {userName.split(' ')[0]}...
                            </h2>
                            <p className="text-[var(--color-text-light)] animate-pulse">
                                Yelitzé está analizando tus respuestas desde el campo sistémico.
                            </p>
                        </motion.div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-[var(--color-secondary)]/20 text-left relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)]" />

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                                <div className="flex items-center gap-3">
                                    <Sparkles className="w-8 h-8 text-[var(--color-secondary)]" />
                                    <h2 className="text-2xl font-heading text-[var(--color-primary)]">
                                        Tu Lectura Personal
                                    </h2>
                                </div>
                                <button
                                    onClick={handleDownloadPDF}
                                    className="flex items-center gap-2 px-6 py-2 bg-gray-50 text-[var(--color-primary)] rounded-full text-sm font-bold border border-[var(--color-primary)]/10 hover:bg-gray-100 transition-all no-print"
                                >
                                    <Download className="w-4 h-4" /> Descargar PDF
                                </button>
                            </div>

                            <div className="prose prose-lg max-w-none text-[var(--color-text)] mb-8">
                                {aiAnalysis?.split('\n').map((line, i) => (
                                    <p key={i} className="mb-4">{line}</p>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row gap-4 justify-center">
                                <a
                                    href="/reservas"
                                    className="px-8 py-3 bg-[var(--color-primary)] text-white rounded-full font-semibold hover:bg-[var(--color-primary-light)] transition-colors text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                                >
                                    Agendar Sesión de Profundización
                                </a>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-8 py-3 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-full font-semibold hover:bg-[var(--color-primary)]/5 transition-colors"
                                >
                                    Volver a Intentar
                                </button>
                            </div>
                        </motion.div>

                        {/* HIDDEN PDF CONTAINER */}
                        <div className="sr-only">
                            <div ref={pdfContentRef} className="bg-white p-12 w-[800px] text-[#2C3E50] space-y-8 font-sans">
                                {/* Header */}
                                <div className="flex justify-between items-start border-b-2 border-[#D4AF37] pb-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Diagnóstico Energético</p>
                                        <h1 className="text-3xl font-heading text-[#2C3E50]">{test.title}</h1>
                                        <p className="text-sm font-serif italic text-gray-500">Por Yelitzé Rangel · 2026</p>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <p className="text-sm font-bold">{userName}</p>
                                        <p className="text-xs text-gray-500">{userEmail}</p>
                                        <p className="text-[10px] text-gray-400 uppercase pt-2">Fecha: {new Date().toLocaleDateString('es-ES')}</p>
                                    </div>
                                </div>

                                {/* Answers Section */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold border-b border-gray-100 pb-2 text-[#2C3E50] uppercase tracking-wider text-xs">Tus Puntos de Conexión</h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        {test.questions.map((q, idx) => (
                                            <div key={idx} className="flex gap-4 items-baseline border-b border-gray-50 pb-2">
                                                <span className="text-[10px] font-bold text-[#D4AF37]">0{idx + 1}</span>
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-600 mb-1 leading-tight">{q.text}</p>
                                                    <p className="text-sm font-bold text-[#2C3E50]">
                                                        {q.options.find(o => o.value === answers[q.id])?.label}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Analysis Section */}
                                <div className="bg-[#f9f9f9] p-8 rounded-2xl border border-[#D4AF37]/10 space-y-6">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                                        <h3 className="text-lg font-heading text-[#2C3E50]">Lectura de Tu Energía</h3>
                                    </div>
                                    <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed italic border-l-4 border-[#D4AF37]/30 pl-6">
                                        {aiAnalysis?.split('\n').filter(l => l.trim()).map((line, i) => (
                                            <p key={i} className="mb-4">{line}</p>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="text-center pt-8 border-t border-gray-100">
                                    <p className="text-xs text-gray-400 uppercase tracking-[0.4em]">Anatomía del Alma · Yelitzé Rangel</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            {/* Progress Bar */}
            <div className="mb-12">
                <div className="flex justify-between text-sm font-medium text-[var(--color-text-light)] mb-2">
                    <span>Pregunta {currentIndex + 1} de {test.questions.length}</span>
                    <span>{Math.round(progress)}% Completado</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-[var(--color-primary)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <div className="relative min-h-[400px]">
                <AnimatePresence initial={false} custom={direction} mode='wait'>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute w-full"
                    >
                        <h2 className="text-3xl font-heading text-[var(--color-primary)] mb-8 leading-tight">
                            {currentQuestion.text}
                        </h2>

                        <div className="space-y-4">
                            {currentQuestion.options.map((option, idx) => {
                                const isSelected = answers[currentQuestion.id] === option.value;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionSelect(option.value)}
                                        className={cn(
                                            "w-full text-left p-6 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group",
                                            isSelected
                                                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                                                : "border-gray-100 bg-white hover:border-[var(--color-secondary)] hover:shadow-lg"
                                        )}
                                    >
                                        <span className={cn(
                                            "text-lg font-medium group-hover:text-[var(--color-primary)] transition-colors",
                                            isSelected ? "text-[var(--color-primary)]" : "text-[var(--color-text)]"
                                        )}>
                                            {option.label}
                                        </span>

                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="bg-[var(--color-primary)] text-white rounded-full p-1"
                                            >
                                                <Check className="w-4 h-4" />
                                            </motion.div>
                                        )}

                                        {!isSelected && (
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ArrowRight className="w-5 h-5 text-[var(--color-secondary)]" />
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
