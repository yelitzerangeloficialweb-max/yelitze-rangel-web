'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DIAGNOSTIC_AMOR_QUESTIONS } from '@/lib/diagnostic-amor-data';
import { PROFUNDAS_QUESTIONS } from '@/lib/diagnostic-heridas-profundas-data';
import { DIAGNOSTIC_FEMENINA_QUESTIONS } from '@/lib/diagnostic-heridas-femeninas-data';

// Steps
import StepLanding from './StepLanding';
import StepContainment from './StepContainment';
import StepQuiz from './StepQuiz';
import MagicStepProcessing from './MagicStepProcessing';
import StepEmail from './StepEmail';
import StepResult from './StepResult';
import StepFinal from './StepFinal';

type WizardStep =
    | 'LANDING'
    | 'CONTAINMENT'
    | 'QUIZ_RELACIONES'
    | 'QUIZ_PROFUNDAS'
    | 'QUIZ_FEMENINAS'
    | 'PROCESSING'
    | 'EMAIL'
    | 'RESULT'
    | 'FINAL';

export default function MasterDiagnosticWizard() {
    const [step, setStep] = useState<WizardStep>('LANDING');
    const [results, setResults] = useState<any>({
        relaciones: {},
        heridas_profundas: {},
        heridas_femeninas: {}
    });
    const [resultData, setResultData] = useState<any>({
        screen_message: '',
        ritual: '',
        mantra: '',
        pdf_content: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({ name: '', email: '' });

    // Transition helper
    const nextStep = (target: WizardStep) => {
        setStep(target);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 1. Relaciones Complete
    const handleRelacionesComplete = (answers: any) => {
        setResults((prev: any) => ({ ...prev, relaciones: answers }));
        nextStep('QUIZ_PROFUNDAS');
    };

    // 2. Profundas Complete
    const handleProfundasComplete = (answers: any) => {
        setResults((prev: any) => ({ ...prev, heridas_profundas: answers }));
        nextStep('QUIZ_FEMENINAS');
    };

    // 3. Femeninas Complete -> Go to Processing
    const handleFemeninasComplete = (answers: any) => {
        setResults((prev: any) => ({ ...prev, heridas_femeninas: answers }));
        nextStep('PROCESSING');
    };

    // 4. Processing Done -> Go to Email
    const handleProcessingComplete = () => {
        nextStep('EMAIL');
    };

    // 5. Final API Submission
    const handleEmailSubmit = async (name: string, email: string) => {
        setUserData({ name, email });
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai/analyze-unified', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userInfo: { name, email },
                    results
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.details || errorData.error || "Error en el análisis de IA");
            }

            const data = await response.json();
            setResultData(data);
            nextStep('RESULT');
        } catch (error: any) {
            console.error("DEBUG - Unified Error:", error);
            setResultData({
                screen_message: `No pudimos conectar con tu linaje ancestral (${error.message}). Tu diagnóstico está en camino por correo.`,
                pdf_content: "Error",
                ritual: "",
                mantra: ""
            });
            nextStep('RESULT');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {step === 'LANDING' && (
                        <StepLanding
                            onNext={() => nextStep('CONTAINMENT')}
                            title="Diagnóstico Ancestral Completo"
                            subtitle="Un viaje integral por tus relaciones, tus heridas somáticas y tu linaje femenino.\nDetecta las lealtades invisibles que detienen tu poder."
                            image="/assets/images/tests/test_femeninas.png"
                        />
                    )}

                    {step === 'CONTAINMENT' && (
                        <StepContainment onNext={() => nextStep('QUIZ_RELACIONES')} />
                    )}

                    {step === 'QUIZ_RELACIONES' && (
                        <StepQuiz
                            title="Módulo 1: Patrones en Relaciones"
                            questions={DIAGNOSTIC_AMOR_QUESTIONS as any}
                            onComplete={handleRelacionesComplete}
                        />
                    )}

                    {step === 'QUIZ_PROFUNDAS' && (
                        <StepQuiz
                            title="Módulo 2: Heridas Profundas (Somática)"
                            questions={PROFUNDAS_QUESTIONS as any}
                            onComplete={handleProfundasComplete}
                        />
                    )}

                    {step === 'QUIZ_FEMENINAS' && (
                        <StepQuiz
                            title="Módulo 3: Heridas Femeninas Clásicas"
                            questions={DIAGNOSTIC_FEMENINA_QUESTIONS as any}
                            onComplete={handleFemeninasComplete}
                        />
                    )}

                    {step === 'PROCESSING' && (
                        <MagicStepProcessing onComplete={handleProcessingComplete} />
                    )}

                    {step === 'EMAIL' && (
                        <StepEmail onSubmit={handleEmailSubmit} isLoading={isLoading} />
                    )}

                    {step === 'RESULT' && (
                        <StepResult
                            resultData={resultData}
                            userName={userData.name}
                            onFinalize={() => nextStep('FINAL')}
                        />
                    )}

                    {step === 'FINAL' && (
                        <StepFinal />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
