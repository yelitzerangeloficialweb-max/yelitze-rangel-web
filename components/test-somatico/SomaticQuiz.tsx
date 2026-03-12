'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Activity, 
    ArrowRight, 
    Brain, 
    CheckCircle2, 
    Sparkles, 
    Zap, 
    ArrowLeft,
    Wind,
    ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

// Questions and Categories
const QUESTIONS = [
    {
        id: 1,
        category: "Restricciones Físicas (La Fascia)",
        text: "¿Sientes tu abdomen contraído de forma constante?",
        context: "(Esto es un signo de anticipación crónica)",
    },
    {
        id: 2,
        category: "Restricciones Físicas (La Fascia)",
        text: "¿Sientes rigidez profunda en la cadera o el músculo psoas?",
        context: "(Refleja un cuerpo preparado para huir que nunca terminó de hacerlo)",
    },
    {
        id: 3,
        category: "Restricciones Físicas (La Fascia)",
        text: "¿Sientes que una tensión en tu diafragma o pecho se refleja como dolor en tus cervicales?",
        context: "(Esto ocurre porque la fascia es una red continua y transmite tensiones de un área a otra)",
    },
    {
        id: 4,
        category: "El Ciclo Emocional Incompleto",
        text: "Miedo: ¿Has vivido situaciones de amenaza donde no pudiste protegerte o escapar para sobrevivir?",
        context: "",
    },
    {
        id: 5,
        category: "El Ciclo Emocional Incompleto",
        text: "Rabia: ¿Has sentido que vulneran tus límites y no has podido defenderte?",
        context: "",
    },
    {
        id: 6,
        category: "El Ciclo Emocional Incompleto",
        text: "Tristeza: ¿Has vivido una pérdida dolorosa sin permitirte el tiempo para retirarte e integrarlo?",
        context: "",
    },
    {
        id: 7,
        category: "Señales de Liberación del Sistema Nervioso",
        text: "Cuando logras relajarte o sentirte en un entorno seguro, ¿experimentas suspiros profundos, temblores corporales, calor que recorre tu cuerpo o lágrimas repentinas?",
        context: "",
    }
];

const OPTIONS = [
    { label: "Sí", value: 1 },
    { label: "A veces", value: 0.5 },
    { label: "No", value: 0 }
];

export default function SomaticQuiz() {
    const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});

    const currentQuestion = QUESTIONS[currentIndex];
    const progress = (currentIndex / QUESTIONS.length) * 100;
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);

    const handleAnswer = (value: number) => {
        const newAnswers = { ...answers, [currentQuestion.id]: value };
        setAnswers(newAnswers);

        if (currentIndex < QUESTIONS.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setStep('result');
        }
    };

    return (
        <div className="relative z-10 w-full">
            <AnimatePresence mode="wait">
                {/* 1. INTRO STEP */}
                {step === 'intro' && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        className="max-w-4xl mx-auto text-center space-y-12"
                    >
                        <div className="space-y-4">
                            <span className="text-[#8C4005] font-bold tracking-[0.4em] uppercase text-xs block font-guide">
                                Exploración Corporal
                            </span>
                            <h1 className="text-5xl md:text-7xl font-editorial text-[#2D2926] leading-tight">
                                Test Somático<br />
                                <span className="italic text-[#B8835A]">Identifica tus Emociones Atrapadas en la Fascia</span>
                            </h1>
                        </div>

                        <div className="bg-white/40 backdrop-blur-md p-10 md:p-16 rounded-[4rem] border border-[#B8835A]/10 shadow-xl space-y-8">
                            <p className="text-2xl md:text-3xl font-editorial italic text-[#2D2926] leading-relaxed">
                                "Las emociones no son solo mentales, son procesos fisiológicos corporales. Cuando no podemos completar el ciclo natural de una emoción (como huir o defendernos), la activación se queda retenida, densificando nuestra red fascial y creando síntomas físicos. Descubre qué emociones podría estar sosteniendo tu cuerpo en este momento."
                            </p>
                            
                            <div className="flex justify-center pt-8">
                                <button
                                    onClick={() => setStep('quiz')}
                                    className="bg-[#8C4005] text-[#F5EFE6] px-14 py-6 rounded-2xl font-bold uppercase tracking-[0.25em] text-xs hover:scale-[1.05] shadow-[0_20px_40px_rgba(140,64,5,0.2)] transition-all flex items-center gap-4 group font-guide"
                                >
                                    Iniciar mi exploración
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 2. QUIZ STEP */}
                {step === 'quiz' && (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="mb-16 text-center space-y-6">
                            <div className="inline-flex items-center gap-3 bg-[#B8835A]/10 px-6 py-2 rounded-full">
                                <Activity className="w-4 h-4 text-[#8C4005]" />
                                <span className="text-[10px] uppercase tracking-widest font-bold text-[#8C4005] font-guide">
                                    {currentQuestion.category}
                                </span>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#2D2926]/40 font-guide">
                                    <span>Pregunta {currentIndex + 1} de {QUESTIONS.length}</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/50 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-[#8C4005]"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-white/50 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5EFE6] opacity-40 -translate-y-1/2 translate-x-1/2 rounded-full" />
                            
                            <div className="relative z-10 space-y-12">
                                <div className="space-y-4">
                                    <h2 className="text-3xl md:text-5xl font-editorial text-[#2D2926] leading-tight">
                                        {currentQuestion.text}
                                    </h2>
                                    {currentQuestion.context && (
                                        <p className="text-[#8C4005] italic text-xl font-editorial opacity-80">
                                            {currentQuestion.context}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-4">
                                    {OPTIONS.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleAnswer(opt.value)}
                                            className="w-full text-left p-6 md:p-8 rounded-3xl border-2 border-transparent bg-[#F5EFE6]/50 hover:bg-white hover:border-[#B8835A]/30 hover:shadow-lg transition-all flex items-center justify-between group/opt"
                                        >
                                            <span className="text-xl md:text-2xl font-editorial text-[#2D2926]">
                                                {opt.label}
                                            </span>
                                            <div className="w-10 h-10 rounded-full border border-[#B8835A]/20 flex items-center justify-center group-hover/opt:bg-[#8C4005] group-hover/opt:text-white transition-all">
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <button
                            onClick={() => currentIndex > 0 && setCurrentIndex(c => c - 1)}
                            className="mt-12 mx-auto flex items-center gap-2 text-[#2D2926]/40 hover:text-[#8C4005] font-guide text-[10px] uppercase font-bold tracking-widest transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Anterior
                        </button>
                    </motion.div>
                )}

                {/* 3. RESULT STEP */}
                {step === 'result' && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-5xl mx-auto space-y-20"
                    >
                        <div className="bg-[#2D2926] text-[#F5EFE6] p-16 md:p-24 rounded-[5rem] shadow-2xl relative overflow-hidden text-center space-y-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#8C4005]/20 to-transparent pointer-events-none" />
                            <div className="relative z-10 space-y-6">
                                <div className="flex justify-center">
                                    <div className="bg-[#B8835A] p-4 rounded-full">
                                        <CheckCircle2 className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-editorial leading-tight">
                                    {totalScore >= 3.5 
                                        ? "Tu sistema nervioso parece estar sosteniendo emociones no resueltas en tu red fascial, organizando tu cuerpo alrededor de una amenaza que ya pasó."
                                        : "Tu red fascial muestra signos de regulación, aunque hay áreas que podrían beneficiarse de una mayor integración somática."
                                    }
                                </h2>
                                <div className="w-24 h-px bg-[#B8835A] mx-auto opacity-40" />
                            </div>
                        </div>

                        <div className="space-y-16">
                            <div className="text-center space-y-4">
                                <span className="text-[#8C4005] font-bold tracking-[0.4em] uppercase text-xs block font-guide">
                                    Protocolo de Sanación
                                </span>
                                <h3 className="text-4xl md:text-6xl font-editorial text-[#2D2926]">
                                    Recomendaciones Terapéuticas
                                </h3>
                                <p className="text-xl md:text-2xl font-editorial italic text-[#8C4005] max-w-3xl mx-auto leading-relaxed">
                                    "La clave para sanar no es forzar al sistema, sino crear las condiciones de seguridad para que la liberación ocurra de forma natural."
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <RecommendationCard 
                                    icon={Wind}
                                    title="Neurobreathwork"
                                    desc="Combina respiración consciente conectada, sonido y trabajo fascial somático para llevar al cerebro a estados de mayor integración (ondas theta y gamma). Esto permite que la experiencia congelada se movilice y complete la respuesta fisiológica."
                                />
                                <RecommendationCard 
                                    icon={Sparkles}
                                    title="EFT (Técnicas de Liberación Emocional)"
                                    desc="Combina la estimulación de puntos de acupuntura mediante toques con la focalización consciente en la emoción. Esto envía una señal reguladora a tu sistema nervioso que ayuda a disminuir la carga emocional del recuerdo."
                                />
                                <RecommendationCard 
                                    icon={Brain}
                                    title="EMDR"
                                    desc="A través de la estimulación bilateral, facilita el reprocesamiento de experiencias atascadas en tu sistema nervioso. Ayuda a que tu cuerpo deje de reaccionar como si el peligro estuviera ocurriendo en el presente."
                                />
                                <RecommendationCard 
                                    icon={ShieldCheck}
                                    title="Kinesiología Holística"
                                    desc="Es la herramienta clave de integración que nos permite leer y comunicarnos directamente con tu sistema para identificar con exactitud cuál de estas técnicas necesita tu cuerpo de forma prioritaria."
                                />
                            </div>
                        </div>

                        <div className="bg-white p-12 md:p-24 rounded-[5rem] border border-[#B8835A]/10 text-center space-y-12">
                            <h4 className="text-4xl md:text-5xl font-editorial text-[#2D2926]">¿Deseas dar el siguiente paso en tu regulación?</h4>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <Link href="/servicios/sesiones-corporales" className="btn-somatic">Agendar mi sesión de Neurobreathwork</Link>
                                <Link href="/servicios" className="btn-somatic">Explorar terapia EFT</Link>
                                <Link href="/servicios" className="btn-somatic">Descubrir el EMDR</Link>
                                <Link href="/contacto" className="btn-somatic bg-[#8C4005] text-white">Reserva tu evaluación de Kinesiología</Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <style jsx global>{`
                .btn-somatic {
                    @apply flex items-center justify-center text-center p-6 rounded-2xl border-2 border-[#8C4005]/10 font-guide text-[10px] font-bold uppercase tracking-widest text-[#8C4005] hover:bg-[#8C4005] hover:text-[#F5EFE6] hover:shadow-xl transition-all h-full;
                }
            `}</style>
        </div>
    );
}

function RecommendationCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-stone-100 shadow-sm hover:shadow-xl transition-shadow space-y-6">
            <div className="w-16 h-16 bg-[#F5EFE6] rounded-2xl flex items-center justify-center text-[#8C4005]">
                <Icon className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold font-editorial text-[#2D2926]">{title}</h4>
            <div className="w-12 h-px bg-[#B8835A]/30" />
            <p className="text-lg text-[#2D2926]/70 leading-relaxed font-body font-light">
                {desc}
            </p>
        </div>
    );
}
