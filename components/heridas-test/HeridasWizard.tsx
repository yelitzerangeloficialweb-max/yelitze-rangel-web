'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HeridaOption, WoundType } from '@/lib/heridas-data';
// Steps
import StepLanding from './StepLanding';
import StepContainment from './StepContainment';
import StepQuiz from './StepQuiz';
import StepProcessing from './StepProcessing';
import StepEmail from './StepEmail';
import StepResult from './StepResult';
import StepFinal from './StepFinal';

type WizardStep = 'LANDING' | 'CONTAINMENT' | 'QUIZ' | 'PROCESSING' | 'EMAIL' | 'RESULT' | 'FINAL';

export default function HeridasWizard() {
    const [step, setStep] = useState<WizardStep>('LANDING');
    const [scores, setScores] = useState<Record<WoundType, number>>({
        Abandono: 0,
        Rechazo: 0,
        Humillación: 0,
        Traición: 0,
        Injusticia: 0
    });
    const [dominantWound, setDominantWound] = useState<WoundType | null>(null);
    const [resultText, setResultText] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    // User Data
    const [userData, setUserData] = useState({ name: '', email: '' });

    // Transition helper
    const nextStep = (target: WizardStep) => {
        setStep(target);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 1. Quiz Complete -> Calculate Scores & Go to Processing
    const handleQuizComplete = (answers: Record<number, HeridaOption>) => {
        const newScores = { ...scores };

        Object.values(answers).forEach(option => {
            Object.entries(option.points).forEach(([wound, points]) => {
                newScores[wound as WoundType] += points || 0;
            });
        });

        setScores(newScores);

        // Determine Dominant
        let maxScore = -1;
        let dominant: WoundType = 'Abandono'; // Default/Fallback

        (Object.entries(newScores) as [WoundType, number][]).forEach(([wound, score]) => {
            if (score > maxScore) {
                maxScore = score;
                dominant = wound;
            }
        });

        setDominantWound(dominant);
        nextStep('PROCESSING');
    };

    // 2. Processing Done -> Go to Email
    const handleProcessingComplete = () => {
        nextStep('EMAIL');
    };

    // 3. Email Submitted -> Call API -> Go to Result
    const handleEmailSubmit = async (name: string, email: string) => {
        setUserData({ name, email });
        setIsLoading(true);

        try {
            // Call API
            const response = await fetch('/api/heridas-result', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    dominantWound,
                    scores
                })
            });

            if (!response.ok) throw new Error("Error en API");

            const data = await response.json();
            setResultText(data.result);
            nextStep('RESULT');

        } catch (error) {
            console.error(error);
            // Fallback text if API fails
            setResultText(`**La energía está densa...**\n\nHubo un error al conectar. Tu herida dominante parece ser **${dominantWound}**. Por favor intenta de nuevo.`);
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
                        <StepResult resultText={resultText} onFinalize={() => nextStep('FINAL')} />
                    )}

                    {step === 'FINAL' && (
                        <StepFinal />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
