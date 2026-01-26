'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AmorOption, AmorBeliefType } from '@/lib/amor-data';

// Import local components or reusable ones
import StepLanding from './StepLanding';
import StepQuiz from './StepQuiz';
import StepProcessing from './StepProcessing';
import StepResult from './StepResult';
// Reusing generic steps
import StepContainment from '@/components/heridas-test/StepContainment';
import StepEmail from '@/components/heridas-test/StepEmail';
import StepFinal from '@/components/heridas-test/StepFinal';

type WizardStep = 'LANDING' | 'CONTAINMENT' | 'QUIZ' | 'PROCESSING' | 'EMAIL' | 'RESULT' | 'FINAL';

export default function AmorWizard() {
    const [step, setStep] = useState<WizardStep>('LANDING');

    // Scoring State
    const [scores, setScores] = useState<Record<AmorBeliefType, number>>({
        'Miedo / Desconfianza': 0,
        'Sobreenfuerzo / Complacencia': 0,
        'Evitación / Independencia': 0,
        'Desesperanza / Resignación': 0
    });

    const [dominantBelief, setDominantBelief] = useState<AmorBeliefType | null>(null);
    const [secondaryBelief, setSecondaryBelief] = useState<AmorBeliefType | null>(null);

    const [resultData, setResultData] = useState<any>({
        screen_message: '',
        ritual: '',
        mantra: '',
        pdf_content: '',
        email_subject: '',
        email_body: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({ name: '', email: '' });

    // Transition helper
    const nextStep = (target: WizardStep) => {
        setStep(target);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 1. Quiz Complete Logic
    const handleQuizComplete = (answers: Record<number, AmorOption>) => {
        const newScores = { ...scores };

        Object.values(answers).forEach(option => {
            // option.points is Record<AmorBeliefType, number> (Partial)
            if (option.points) {
                Object.entries(option.points).forEach(([type, points]) => {
                    if (points) {
                        newScores[type as AmorBeliefType] += points;
                    }
                });
            }
        });

        setScores(newScores);

        // Sort to find dominant and secondary
        const sorted = Object.entries(newScores).sort(([, a], [, b]) => b - a);
        const top1 = sorted[0][0] as AmorBeliefType;
        const top2 = sorted[1][0] as AmorBeliefType;

        setDominantBelief(top1);
        setSecondaryBelief(top2);

        nextStep('PROCESSING');
    };

    // 2. Processing Done
    const handleProcessingComplete = () => {
        nextStep('EMAIL');
    };

    // 3. Email Submitted logic -> Call New API
    const handleEmailSubmit = async (name: string, email: string) => {
        setUserData({ name, email });
        setIsLoading(true);

        try {
            // CALL NEW API
            const response = await fetch('/api/amor-result', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    dominantBelief,
                    secondaryBelief,
                    scores
                })
            });

            if (!response.ok) throw new Error("Error en API");
            const data = await response.json();
            setResultData(data);
            nextStep('RESULT');

        } catch (error) {
            console.error(error);
            // Fallback
            setResultData({
                screen_message: `**Conexión interrumpida...**\n\nTu creencia principal parece ser **${dominantBelief}**. Por favor intenta de nuevo.`,
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
                        // Reusing containment step but we can pass text logic inside if needed, or assume it's generic enough
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
