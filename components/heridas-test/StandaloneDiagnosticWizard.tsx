'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StepLanding from './StepLanding';
import StepContainment from './StepContainment';
import StepQuiz from './StepQuiz';
import MagicStepProcessing from './MagicStepProcessing';
import StepEmail from './StepEmail';
import UnifiedStepResult from './UnifiedStepResult';
import StepFinal from './StepFinal';

interface StandaloneDiagnosticWizardProps {
    questions: any[];
    testId: string;
    title: string;
    subtitle?: string;
    image?: string;
}

export default function StandaloneDiagnosticWizard({
    questions,
    testId,
    title,
    subtitle = "Un test breve, amoroso y revelador.\nNo es diagnóstico. Es conciencia.",
    image
}: StandaloneDiagnosticWizardProps) {
    const [step, setStep] = useState<'LANDING' | 'CONTAINMENT' | 'QUIZ' | 'PROCESSING' | 'EMAIL' | 'RESULT' | 'FINAL'>('LANDING');
    const [answers, setAnswers] = useState<any>({});
    const [analysis, setAnalysis] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({ name: '', email: '' });

    const nextStep = (target: any) => {
        setStep(target);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleQuizComplete = (ans: any) => {
        setAnswers(ans);
        nextStep('PROCESSING');
    };

    const handleEmailSubmit = async (name: string, email: string) => {
        setUserData({ name, email });
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai/analyze-standalone', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userInfo: { name, email },
                    testId,
                    answers
                })
            });

            if (!response.ok) throw new Error("Error en el análisis");
            const data = await response.json();
            setAnalysis(data.analysis);
            nextStep('RESULT');
        } catch (error) {
            console.error(error);
            setAnalysis("Hubo un problema al conectar con tu sabiduría interior. Inténtalo de nuevo.");
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
                            title={title}
                            subtitle={subtitle}
                            image={image}
                        />
                    )}
                    {step === 'CONTAINMENT' && <StepContainment onNext={() => nextStep('QUIZ')} />}
                    {step === 'QUIZ' && <StepQuiz title={title} questions={questions} onComplete={handleQuizComplete} />}
                    {step === 'PROCESSING' && <MagicStepProcessing onComplete={() => nextStep('EMAIL')} />}
                    {step === 'EMAIL' && <StepEmail onSubmit={handleEmailSubmit} isLoading={isLoading} />}
                    {step === 'RESULT' && <UnifiedStepResult analysis={analysis} userName={userData.name} onFinalize={() => nextStep('FINAL')} />}
                    {step === 'FINAL' && <StepFinal />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
