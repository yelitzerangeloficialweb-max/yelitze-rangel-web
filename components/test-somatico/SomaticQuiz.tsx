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
    Download
} from 'lucide-react';
import Link from 'next/link';

// Questions and Categories
const QUESTIONS = [
    {
        id: 1,
        category: "Restricciones Físicas (La Fascia Corporal)",
        text: "¿Sientes tu abdomen contraído de forma constante?",
        context: "(Signo de anticipación crónica)",
        explanation: "El abdomen es el centro de nuestra seguridad biológica. Una contracción constante aquí indica que el diafragma está bloqueado, preparándote para un impacto que tu sistema percibe como inminente."
    },
    {
        id: 2,
        category: "Restricciones Físicas (La Fascia Corporal)",
        text: "¿Sientes rigidez profunda en la cadera o el músculo psoas?",
        context: "(Cuerpo preparado para huir)",
        explanation: "El Psoas es el principal músculo de lucha o huida. Si está rígido, tu cerebro recibe una señal constante de peligro, lo que imposibilita la calma real y la toma de decisiones proactivas."
    },
    {
        id: 3,
        category: "Restricciones Físicas (La Fascia Corporal)",
        text: "¿Sientes que una tensión en tu diafragma se refleja en tus cervicales?",
        context: "(La fascia corporal como red continua)",
        explanation: "La fascia corporal es una red que conecta todo el cuerpo. Una tensión en el centro (diafragma/emociones) suele 'tirar' de los extremos (cuello/cabeza), creando dolores que no se alivian solo con masajes locales."
    },
    {
        id: 4,
        category: "El Ciclo Emocional Incompleto",
        text: "Miedo: ¿Has vivido situaciones donde no pudiste protegerte o escapar?",
        context: "",
        explanation: "Cuando el sistema nervioso se activa para sobrevivir pero no puede completar la acción (huir o defenderse), esa energía queda atrapada en el tejido fascial como una memoria biológica activa."
    },
    {
        id: 5,
        category: "El Ciclo Emocional Incompleto",
        text: "Rabia: ¿Has sentido que vulneran tus límites y no has podido defenderte?",
        context: "",
        explanation: "La rabia es energía defensiva. Si no se expresa o se usa para poner un límite, se vuelve hacia adentro, tensando la mandíbula, los hombros y rigidizando la fascia corporal."
    },
    {
        id: 6,
        category: "El Ciclo Emocional Incompleto",
        text: "Tristeza: ¿Has vivido pérdidas sin permitirte el tiempo para integrarlo?",
        context: "",
        explanation: "La tristeza requiere un repliegue biológico. No permitir este proceso mantiene al sistema en un estado de 'falsa alerta', impidiendo que los tejidos se relajen y se hidraten correctamente."
    },
    {
        id: 7,
        category: "Señales de Liberación",
        text: "¿Sientes suspiros profundos, calores o temblores al relajarte?",
        context: "(Tu sistema intentando regularse)",
        explanation: "Estas no son fallas, son 'descargas' del sistema nervioso. El temblor o el suspiro indican que la energía retenida está finalmente saliendo, permitiendo que la fascia corporal recupere su elasticidad."
    }
];

const OPTIONS = [
    { label: "Sí", value: 1 },
    { label: "A veces", value: 0.5 },
    { label: "No", value: 0 }
];

export default function SomaticQuiz() {
    const [step, setStep] = useState<'intro' | 'quiz' | 'reflection' | 'form' | 'result'>('intro');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [reflection, setReflection] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [aiResult, setAiResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const currentQuestion = QUESTIONS[currentIndex];
    const progress = (currentIndex / QUESTIONS.length) * 100;
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);

    const handleAnswer = (value: number) => {
        const newAnswers = { ...answers, [currentQuestion.id]: value };
        setAnswers(newAnswers);

        if (currentIndex < QUESTIONS.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setStep('reflection');
        }
    };

    const getStressType = () => {
        const cat1 = (answers[1] || 0) + (answers[2] || 0) + (answers[3] || 0);
        const cat2 = (answers[4] || 0) + (answers[5] || 0) + (answers[6] || 0);
        const cat3 = (answers[7] || 0);

        if (cat2 >= 2) return {
            type: "Estrés de Supervivencia (Congelamiento Profundo)",
            desc: "Tu cuerpo ha guardado memorias de amenaza que no pudieron completarse. Vives en una 'pausa' biológica que consume tu energía vital. Sientes que hay algo 'atrapado' que no te permite avanzar.",
            icon: Zap
        };
        if (cat1 >= 2) return {
            type: "Estrés de Anticipación (Bloqueo Fascial Corporal)",
            desc: "Tu fascia corporal está organizada para un peligro inminente. Tu abdomen y diafragma actúan como un escudo constante, limitando tu expansión y soberanía.",
            icon: Activity
        };
        if (cat3 >= 0.5) return {
            type: "Hipersensibilidad y Desregulación",
            desc: "Tu sistema tiene dificultades para encontrar el camino de regreso a la calma. Los ciclos de alerta se disparan pero tu cuerpo ya está intentando liberar de forma espontánea.",
            icon: Brain
        };
        
        return {
            type: "Tensión Somática Latente",
            desc: "Tu sistema mantiene un nivel de alerta funcional, pero hay áreas de tu red fascial que necesitan ser movilizadas para evitar que el patrón se cronifique.",
            icon: Sparkles
        };
    };

    const stressResult = getStressType();

    const sendEmailWithData = async (finalResult: any) => {
        setIsSending(true);
        try {
            const stressLevel = getStressType(); 
            const serializableStress = {
                type: stressLevel.type,
                desc: stressLevel.desc
            };

            const response = await fetch('/api/ai/somatic-test/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    name,
                    reflection,
                    stressResult: serializableStress,
                    result: finalResult
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error sending email:", errorData);
            }
        } catch (error) {
            console.error("Error connecting to mail service:", error);
        } finally {
            setIsSending(false);
        }
    }

    const generateAIResult = async () => {
        setIsLoading(true);
        setStep('result');
        try {
            const response = await fetch('/api/ai/somatic-test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    answers,
                    reflection,
                    name,
                    stressResult: {
                        type: stressResult.type,
                        desc: stressResult.desc
                    }
                })
            });
            const data = await response.json();
            setAiResult(data);
            
            if (email) {
                await sendEmailWithData(data);
            }
        } catch (error) {
            console.error("AI Generation Error:", error);
        } finally {
            setIsLoading(false);
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
                                <span className="italic text-[#B8835A]">Identifica tus Emociones Atrapadas en la Fascia Corporal</span>
                            </h1>
                        </div>

                        <div className="bg-white/40 backdrop-blur-md p-10 md:p-16 rounded-[4rem] border border-[#B8835A]/10 shadow-xl space-y-8">
                            <p className="text-2xl md:text-3xl font-editorial italic text-[#2D2926] leading-relaxed">
                                "Las emociones no son solo mentales, son procesos fisiológicos corporales. Cuando no podemos completar el ciclo natural de una emoción (como huir o defendernos), la activación se queda retenida, densificando nuestra fascia corporal y creando síntomas físicos."
                            </p>
                            
                            <div className="flex justify-center pt-8">
                                <button
                                    onClick={() => setStep('quiz')}
                                    className="bg-[#8C4005] text-[#F5EFE6] px-14 py-6 rounded-2xl font-bold uppercase tracking-[0.25em] text-xs hover:scale-[1.05] transition-all flex items-center gap-4 group font-guide"
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
                        <div className="mb-16 text-center space-y-4">
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

                        <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-white/50 relative overflow-hidden">
                            <div className="relative z-10 space-y-12">
                                <div className="space-y-4">
                                    <h2 className="text-3xl md:text-5xl font-editorial text-[#2D2926] leading-tight">
                                        {currentQuestion.text}
                                    </h2>
                                    {currentQuestion.explanation && (
                                        <div className="bg-[#8C4005]/5 p-6 rounded-2xl border-l-2 border-[#8C4005]/30">
                                            <p className="text-[#8C4005] text-lg font-editorial italic">
                                                {currentQuestion.explanation}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="grid gap-4">
                                    {OPTIONS.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleAnswer(opt.value)}
                                            className="w-full text-left p-6 md:p-8 rounded-3xl bg-[#F5EFE6]/50 hover:bg-white hover:shadow-lg transition-all flex items-center justify-between"
                                        >
                                            <span className="text-xl md:text-2xl font-editorial text-[#2D2926]">
                                                {opt.label}
                                            </span>
                                            <ArrowRight className="w-5 h-5 text-[#8C4005]" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 3. REFLECTION STEP */}
                {step === 'reflection' && (
                    <motion.div
                        key="reflection"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto space-y-12"
                    >
                        <div className="text-center space-y-6">
                            <h2 className="text-4xl md:text-6xl font-editorial text-[#2D2926]">Escucha Profunda</h2>
                            <p className="text-xl font-editorial italic text-[#8C4005]">
                                "¿Qué sensaciones emergen en tu cuerpo al hacer este test?"
                            </p>
                        </div>
                        
                        <textarea
                            value={reflection}
                            onChange={(e) => setReflection(e.target.value)}
                            placeholder="Describe brevemente tu sentir actual..."
                            className="w-full h-64 p-8 text-2xl font-editorial text-[#2D2926] bg-white rounded-[2.5rem] shadow-xl border-none focus:ring-2 focus:ring-[#8C4005] outline-none"
                        />

                        <div className="flex justify-center">
                            <button
                                onClick={() => setStep('form')}
                                disabled={!reflection}
                                className="bg-[#8C4005] text-[#F5EFE6] px-14 py-6 rounded-2xl font-bold uppercase tracking-[0.25em] text-xs hover:scale-[1.05] disabled:opacity-50 transition-all font-guide"
                            >
                                Continuar
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 4. FORM STEP */}
                {step === 'form' && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-xl mx-auto space-y-12"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl md:text-6xl font-editorial text-[#2D2926]">Tu Identidad</h2>
                        </div>

                        <div className="bg-white p-10 rounded-[3rem] shadow-xl space-y-6">
                            <input 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nombre completo"
                                className="w-full p-6 text-xl font-editorial bg-[#F5EFE6]/30 rounded-2xl outline-none"
                            />
                            <input 
                                type="tel"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                placeholder="WhatsApp"
                                className="w-full p-6 text-xl font-editorial bg-[#F5EFE6]/30 rounded-2xl outline-none"
                            />
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email para el PDF"
                                className="w-full p-6 text-xl font-editorial bg-[#F5EFE6]/30 rounded-2xl outline-none"
                            />
                        </div>

                        <button
                            onClick={generateAIResult}
                            disabled={!email || !name}
                            className="w-full bg-[#8C4005] text-[#F5EFE6] px-14 py-6 rounded-2xl font-bold uppercase tracking-[0.25em] text-xs transition-all font-guide"
                        >
                            {isLoading ? "Analizando..." : "Ver mi diagnóstico"}
                        </button>
                    </motion.div>
                )}

                {/* 5. LOADING / RESULT STEP */}
                {isLoading && step === 'result' && (
                    <div className="max-w-3xl mx-auto py-32 text-center space-y-8">
                        <Sparkles className="w-16 h-16 text-[#8C4005] mx-auto animate-pulse" />
                        <h2 className="text-3xl font-editorial text-[#2D2926]">Analizando tu biología...</h2>
                    </div>
                )}

                {step === 'result' && !isLoading && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-5xl mx-auto space-y-16"
                    >
                        {/* Summary Card */}
                        <div className="bg-[#2D2926] text-[#F5EFE6] p-16 md:p-24 rounded-[5rem] shadow-2xl text-center space-y-8">
                            <stressResult.icon className="w-16 h-16 text-[#B8835A] mx-auto" />
                            <h2 className="text-4xl md:text-7xl font-editorial text-[#B8835A]">
                                {stressResult.type}
                            </h2>
                            <p className="text-xl md:text-3xl font-editorial italic opacity-90 max-w-3xl mx-auto">
                                "{aiResult?.personalized_analysis || stressResult.desc}"
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <ExerciseCard 
                                title="Guía de Regulación"
                                desc={aiResult?.action_step || "Práctica la respiración consciente diafragmática."}
                            />
                            <div className="bg-[#8C4005] text-[#F5EFE6] p-12 rounded-[3rem] flex flex-col justify-between">
                                <h3 className="text-3xl font-editorial mb-4">¿Deseas profundizar?</h3>
                                <p className="opacity-80 mb-8">{aiResult?.venezuela_connection || "El Tour Venezuela en el Cuerpo es el espacio ideal para ti."}</p>
                                <Link 
                                    href="/venezuela-en-el-cuerpo"
                                    className="bg-[#F5EFE6] text-[#8C4005] py-4 rounded-xl font-bold uppercase tracking-widest text-center text-xs"
                                >
                                    Inscribirme al Tour
                                </Link>
                            </div>
                        </div>

                        {/* FINAL CTA & FOOTER */}
                        <div className="text-center space-y-6 pt-12 border-t border-[#B8835A]/20">
                            <p className="text-[#8C4005] font-editorial italic text-xl">Tu diagnóstico completo ha sido enviado a {email}</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button 
                                    onClick={() => window.location.href = `https://wa.me/${whatsapp?.replace(/\D/g, '') || '584120000000'}?text=Hola Yelitze, acabo de terminar mi Test Somático y soy ${stressResult.type}. Me gustaría profundizar en mi proceso.`}
                                    className="px-8 py-4 border-2 border-[#8C4005] text-[#8C4005] rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#8C4005] hover:text-white transition-all"
                                >
                                    Escribir por WhatsApp
                                </button>
                            </div>
                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#2D2926]/40">YELITZE RANGEL • Tu Coach Ancestral</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ExerciseCard({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="bg-white p-12 rounded-[3.5rem] border border-[#B8835A]/10 shadow-sm space-y-6">
            <h4 className="text-2xl font-bold font-editorial text-[#2D2926]">{title}</h4>
            <div className="w-12 h-px bg-[#B8835A]/30" />
            <p className="text-lg text-[#2D2926]/70 leading-relaxed font-body font-light italic">
                {desc}
            </p>
        </div>
    );
}
