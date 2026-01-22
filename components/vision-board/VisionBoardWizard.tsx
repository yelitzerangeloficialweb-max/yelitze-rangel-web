'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import IntroStep from './steps/IntroStep';
import ReflectionPortal from './steps/ReflectionPortal';
import PillarsStep from './steps/PillarsStep';
import FinalBoardStep from './steps/FinalBoardStep';
import ProgressBar from './ProgressBar';

export type VisionData = {
    reflections: Record<string, string>;
    pillars: {
        id: string;
        title: string;
        intention: string;
        direction: string;
        action: string;
        images: string[]; // Stores both AI and uploaded images (max 3)
    }[];
    emotions: {
        primary: string;
        keywords: string[];
    };
    analysis?: {
        release: string;
        identity: string;
        practice: string;
        manifesto?: string;
        guide_steps?: string[];
        cta_message?: string;
    };
};

const INITIAL_DATA: VisionData = {
    reflections: {},
    pillars: [
        { id: '1', title: 'Propósito y Trabajo', intention: '', direction: '', action: '', images: [] },
        { id: '2', title: 'Abundancia y Recursos', intention: '', direction: '', action: '', images: [] },
        { id: '3', title: 'Relaciones y Vida Personal', intention: '', direction: '', action: '', images: [] },
        { id: '4', title: 'Crecimiento Interno', intention: '', direction: '', action: '', images: [] },
        { id: '5', title: 'Bienestar y Autocuidado', intention: '', direction: '', action: '', images: [] },
    ],
    emotions: { primary: '', keywords: [] }
};

export default function VisionBoardWizard() {
    const [step, setStep] = useState(0);
    const [data, setData] = useState<VisionData>(INITIAL_DATA);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [registration, setRegistration] = useState({ name: '', email: '' });

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const setAnalysis = (analysis: any) => {
        setData(prev => ({ ...prev, analysis }));
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsAnalyzing(true);
        nextStep(); // Move to final step UI immediately to show loading

        try {
            const res = await fetch('/api/ai/analyze-board', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    reflections: data.reflections,
                    pillars: data.pillars,
                    userName: registration.name,
                    userEmail: registration.email
                })
            });
            const analysis = await res.json();
            setAnalysis(analysis);
        } catch (e) {
            console.error("Analysis failed", e);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const updateReflection = (portalId: string, answer: string) => {
        setData(prev => ({
            ...prev,
            reflections: { ...prev.reflections, [portalId]: answer }
        }));
    };

    const updatePillar = (index: number, field: string, value: string) => {
        const newPillars = [...data.pillars];
        newPillars[index] = { ...newPillars[index], [field]: value };
        setData(prev => ({ ...prev, pillars: newPillars }));
    };

    // New helper to manage images
    const updatePillarImages = (index: number, newImages: string[]) => {
        const newPillars = [...data.pillars];
        newPillars[index] = { ...newPillars[index], images: newImages };
        setData(prev => ({ ...prev, pillars: newPillars }));
    };

    const steps = [
        <IntroStep key="intro" onNext={nextStep} />,
        // Portals (1-4) ...
        <ReflectionPortal
            key="p1"
            portalNumber={1}
            title="Cierre Consciente 2025"
            subtitle="¿Dónde se fue mi energía?"
            description="Antes de sembrar semillas nuevas, es preciso limpiar el terreno..."
            questions={[
                "¿En qué áreas sentí mayor desgaste emocional?",
                "¿Qué situaciones drenaron mi energía?",
                "¿Dónde dije 'sí' queriendo decir 'no'?"
            ]}
            value={data.reflections['portal1'] || ''}
            onChange={(v: string) => updateReflection('portal1', v)}
            onNext={nextStep}
            onBack={prevStep}
        />,
        <ReflectionPortal
            key="p2"
            portalNumber={2}
            title="Foco y Dispersión"
            subtitle="¿Dónde perdí mi centro?"
            description="La dispersión es una forma sutil de abandono propio..."
            questions={[
                "¿Qué distracciones me alejaron de mis prioridades?",
                "¿En qué momentos dejé de escucharme?"
            ]}
            value={data.reflections['portal2'] || ''}
            onChange={(v: string) => updateReflection('portal2', v)}
            onNext={nextStep}
            onBack={prevStep}
        />,
        <ReflectionPortal
            key="p3"
            portalNumber={3}
            title="Recuperar Mi Poder"
            subtitle="Lo que dejo de cargar"
            description="Para volar alto, el equipaje debe ser ligero..."
            questions={[
                "¿Qué responsabilidades no me corresponden?",
                "¿Qué expectativas ajenas estoy lista para soltar?"
            ]}
            value={data.reflections['portal3'] || ''}
            onChange={(v: string) => updateReflection('portal3', v)}
            onNext={nextStep}
            onBack={prevStep}
        />,
        <ReflectionPortal
            key="p4"
            portalNumber={4}
            title="Ordenar Mi Vida"
            subtitle="Gestión consciente de energía"
            description="El orden no es rigidez, es la estructura que permite el flujo..."
            questions={[
                "¿Qué áreas necesitan más estructura?",
                "¿Dónde necesito límites claros?"
            ]}
            value={data.reflections['portal4'] || ''}
            onChange={(v: string) => updateReflection('portal4', v)}
            onNext={nextStep}
            onBack={prevStep}
        />,
        <PillarsStep
            key="p5"
            data={data}
            updatePillar={updatePillar}
            updatePillarImages={updatePillarImages}
            onNext={nextStep}
            onBack={prevStep}
        />,

        // NEW: Lead Capture Step
        <div key="lead" className="max-w-2xl mx-auto py-12 px-4 text-center space-y-8">
            <div className="bg-white p-10 rounded-3xl shadow-2xl border border-[var(--color-primary)]/10">
                <div className="w-20 h-20 bg-[var(--color-secondary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-[var(--color-secondary)]" />
                </div>
                <h2 className="text-3xl font-heading text-[var(--color-primary)] mb-4">Todo está listo para tu revelación</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Yelitzé integrará tus pilares y reflexiones para entregarte tu Arquitectura de Vida 2026. Ingresa tus datos para recibir tu reporte detallado.
                </p>

                <form onSubmit={handleLeadSubmit} className="space-y-4 text-left">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                        <input
                            required
                            type="text"
                            value={registration.name}
                            onChange={(e) => setRegistration(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-colors"
                            placeholder="Tu nombre"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                        <input
                            required
                            type="email"
                            value={registration.email}
                            onChange={(e) => setRegistration(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-colors"
                            placeholder="tu@email.com"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 py-4 bg-[var(--color-primary)] text-white rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-lg"
                    >
                        Revelar Mi Arquitectura
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        type="button"
                        onClick={prevStep}
                        className="w-full py-2 text-gray-400 text-sm hover:text-gray-600 transition-colors"
                    >
                        Regresar a mis pilares
                    </button>
                </form>
            </div>
        </div>,

        // Final Board
        <FinalBoardStep
            key="final"
            data={data}
            onBack={prevStep}
            isAnalyzing={isAnalyzing}
            registrationData={registration}
        />
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen flex flex-col">
            <ProgressBar currentStep={step} totalSteps={steps.length} />

            <div className="flex-grow flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        {steps[step]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
