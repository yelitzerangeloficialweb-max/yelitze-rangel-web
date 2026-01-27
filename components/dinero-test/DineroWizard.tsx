'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DineroOption, DineroBeliefType, NervousSystemType } from '@/lib/dinero-data';

// Steps
import StepLanding from './StepLanding';
import StepQuiz from './StepQuiz';
import StepProcessing from './StepProcessing';
import StepResult from './StepResult';
// Reuse generic steps
import StepContainment from '@/components/heridas-test/StepContainment';
import StepEmail from '@/components/heridas-test/StepEmail';
import StepFinal from '@/components/heridas-test/StepFinal';

type WizardStep = 'LANDING' | 'CONTAINMENT' | 'QUIZ' | 'PROCESSING' | 'EMAIL' | 'RESULT' | 'FINAL';

export default function DineroWizard() {
    const [step, setStep] = useState<WizardStep>('LANDING');

    // Scoring State
    const [scores, setScores] = useState<Record<DineroBeliefType, number>>({
        'Carencia / Esfuerzo': 0,
        'Miedo / Inseguridad': 0,
        'Evitación / Conflicto': 0,
        'Culpa / Desvalorización': 0
    });

    const [nsScores, setNsScores] = useState<Record<NervousSystemType, number>>({
        'Hiperactivación (Lucha/Huida)': 0,
        'Congelamiento (Desconexión)': 0,
        'Complacencia (Fawning)': 0
    });

    const [dominantBelief, setDominantBelief] = useState<DineroBeliefType | null>(null);
    const [secondaryBelief, setSecondaryBelief] = useState<DineroBeliefType | null>(null);
    const [nervousSystem, setNervousSystem] = useState<NervousSystemType | null>(null);

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

    // 1. Quiz Complete Logic
    const handleQuizComplete = (answers: Record<number, DineroOption>) => {
        const newScores = { ...scores };
        const newNsScores = { ...nsScores };

        Object.values(answers).forEach(option => {
            // Belief Points
            if (option.points) {
                Object.entries(option.points).forEach(([type, points]) => {
                    if (points) {
                        newScores[type as DineroBeliefType] += points;
                    }
                });
            }
            // Nervous System
            if (option.ns) {
                newNsScores[option.ns] += 1;
            }
        });

        setScores(newScores);
        setNsScores(newNsScores);

        // Sort Beliefs
        const sortedBeliefs = Object.entries(newScores).sort(([, a], [, b]) => b - a);
        setDominantBelief(sortedBeliefs[0][0] as DineroBeliefType);
        setSecondaryBelief(sortedBeliefs[1][0] as DineroBeliefType);

        // Sort Nervous System
        const sortedNS = Object.entries(newNsScores).sort(([, a], [, b]) => b - a);
        setNervousSystem(sortedNS[0][0] as NervousSystemType);

        nextStep('PROCESSING');
    };

    // 2. Processing Done
    const handleProcessingComplete = () => {
        nextStep('EMAIL');
    };

    // 3. Email Submitted logic -> Call API
    const handleEmailSubmit = async (name: string, email: string) => {
        setUserData({ name, email });
        setIsLoading(true);

        try {
            // CALL NEW DINERO API
            const response = await fetch('/api/dinero-result', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    dominantBelief,
                    secondaryBelief,
                    nervousSystem,
                    email, // Added email
                    scores
                })
            });

            if (!response.ok) throw new Error("Error en API");
            const data = await response.json();
            setResultData(data);
            nextStep('RESULT');

        } catch (error) {
            console.error(error);
            setResultData({
                screen_message: `**Conexión interrumpida...**\n\nTu relación con el dinero muestra una tendencia hacia **${dominantBelief}**. Por favor intenta de nuevo.`,
                pdf_content: "Error",
                email_subject: "Error",
                email_body: ""
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
                        <StepLanding onNext={() => nextStep('CONTAINMENT')} />
                    )}

                    {step === 'CONTAINMENT' && (
                        <StepContainment onNext={() => nextStep('QUIZ')} />
                    )}

                    {step === 'QUIZ' && (
                        <StepQuiz onComplete={handleQuizComplete} />
                    )}

                    {step === 'PROCESSING' && (
                        <StepProcessing onComplete={handleProcessingComplete} />
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
