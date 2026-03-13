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
        category: "Restricciones Físicas (La Fascia Corporal)",
        text: "¿Sientes tu abdomen contraído de forma constante?",
        context: "(Esto es un signo de anticipación crónica)",
    },
    {
        id: 2,
        category: "Restricciones Físicas (La Fascia Corporal)",
        text: "¿Sientes rigidez profunda en la cadera o el músculo psoas?",
        context: "(Refleja un cuerpo preparado para huir que nunca terminó de hacerlo)",
    },
    {
        id: 3,
        category: "Restricciones Físicas (La Fascia Corporal)",
        text: "¿Sientes que una tensión en tu diafragma o pecho se refleja como dolor en tus cervicales?",
        context: "(Esto ocurre porque la fascia corporal es una red continua y transmite tensiones de un área a otra)",
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
    const [step, setStep] = useState<'intro' | 'quiz' | 'reflection' | 'result'>('intro');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [reflection, setReflection] = useState('');

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

        // More refined logic:
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
                                "Las emociones no son solo mentales, son procesos fisiológicos corporales. Cuando no podemos completar el ciclo natural de una emoción (como huir o defendernos), la activación se queda retenida, densificando nuestra fascia corporal y creando síntomas físicos. Descubre qué emociones podría estar sosteniendo tu cuerpo en este momento."
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

                {/* 2.5 REFLECTION STEP */}
                {step === 'reflection' && (
                    <motion.div
                        key="reflection"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto space-y-12"
                    >
                        <div className="text-center space-y-6">
                            <h2 className="text-4xl md:text-6xl font-editorial text-[#2D2926]">Espacio de Escucha</h2>
                            <p className="text-xl font-editorial italic text-[#8C4005]">
                                Antes de ver tus resultados, tómate un momento... ¿Qué sientes en tu cuerpo ahora mismo al pasar por este proceso?
                            </p>
                        </div>
                        
                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-[#B8835A]/10">
                            <textarea
                                value={reflection}
                                onChange={(e) => setReflection(e.target.value)}
                                placeholder="Escribe aquí lo que emerge: una tensión, un pensamiento, una emoción..."
                                className="w-full h-48 p-6 text-xl font-editorial text-[#2D2926] placeholder:text-[#2D2926]/20 bg-transparent border-none focus:ring-0 resize-none"
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={() => setStep('result')}
                                className="bg-[#8C4005] text-[#F5EFE6] px-14 py-6 rounded-2xl font-bold uppercase tracking-[0.25em] text-xs hover:scale-[1.05] shadow-xl transition-all flex items-center gap-4 group font-guide"
                            >
                                Ver mi diagnóstico
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
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
                        <div className="bg-[#2D2926] text-[#F5EFE6] p-16 md:p-24 rounded-[5rem] shadow-2xl relative overflow-hidden text-center space-y-12">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#8C4005]/20 to-transparent pointer-events-none" />
                            <div className="relative z-10 space-y-8">
                                <div className="flex justify-center">
                                    <div className="bg-[#B8835A] p-6 rounded-full shadow-lg">
                                        <stressResult.icon className="w-10 h-10 text-white" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <span className="text-[#B8835A] font-bold tracking-[0.4em] uppercase text-xs block font-guide">Tu Tipo de Estrés Somático</span>
                                    <h2 className="text-4xl md:text-6xl font-editorial leading-tight text-[#B8835A]">
                                        {stressResult.type}
                                    </h2>
                                </div>
                                <p className="text-xl md:text-3xl font-editorial italic opacity-90 max-w-3xl mx-auto leading-relaxed">
                                    {stressResult.desc}
                                </p>
                                <div className="w-24 h-px bg-[#B8835A] mx-auto opacity-40" />
                                <p className="text-lg md:text-xl font-body font-light max-w-2xl mx-auto text-[#F5EFE6]/70">
                                    {totalScore >= 3.5 
                                        ? "Tu sistema nervioso parece estar organizando tu cuerpo alrededor de una amenaza que ya pasó. Esta información es vital para tu proceso en 'Venezuela en el Cuerpo'. El cuerpo no puede crear una mente proactiva si la fascia corporal está en defensa."
                                        : "Muestras signos de regulación, pero hay memorias específicas en tu fascia corporal que están condicionando tu respuesta al entorno."
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Solutions & Exercises */}
                        <div className="space-y-16">
                            <div className="text-center space-y-4">
                                <span className="text-[#8C4005] font-bold tracking-[0.4em] uppercase text-xs block font-guide">Ruta de Regulación</span>
                                <h3 className="text-4xl md:text-6xl font-editorial text-[#2D2926]">Técnicas de Descongelamiento</h3>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <ExerciseCard 
                                    title="Vibración Somática"
                                    desc="Permite que tu cuerpo tiemble de forma natural. Comienza por las manos y deja que el movimiento suba. Esto libera la energía retenida en la fascia corporal."
                                />
                                <ExerciseCard 
                                    title="Titulación de la Mirada"
                                    desc="Recorre el espacio donde estás. Nombra 3 objetos que te den seguridad. Ayuda a tu sistema a entender que el peligro ya pasó."
                                />
                                <ExerciseCard 
                                    title="Liberación de Voz: El Sonido 'VOO'"
                                    desc="Inhala profundo y, al exhalar, emite un sonido grave 'VOOOOO'. Siente la vibración en tu pecho y abdomen. Tonifica el nervio vago."
                                />
                                <ExerciseCard 
                                    title="Resonancia de Hum"
                                    desc="Cierra los labios y emite un zumbido. Lleva la atención a la garganta. La voz es la herramienta más directa para regular el sistema nervioso."
                                />
                            </div>
                        </div>

                        {/* Educational Links */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <Link href="/test-somatico/sintomas-fisicos" className="group">
                                <div className="bg-white p-12 rounded-[4rem] border border-[#B8835A]/10 hover:border-[#8C4005]/30 transition-all space-y-6">
                                    <h4 className="text-3xl font-editorial text-[#2D2926]">Síntomas Físicos y Fibromialgia</h4>
                                    <p className="text-lg font-body font-light text-[#2D2926]/60">Descubre cómo el dolor crónico está vinculado a memorias somáticas.</p>
                                    <div className="flex items-center gap-2 text-[#8C4005] font-bold text-xs font-guide uppercase tracking-widest">
                                        Explorar síntomas <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                            <Link href="/test-somatico/el-psoas" className="group">
                                <div className="bg-white p-12 rounded-[4rem] border border-[#B8835A]/10 hover:border-[#8C4005]/30 transition-all space-y-6">
                                    <h4 className="text-3xl font-editorial text-[#2D2926]">El Músculo PSOAS: Soberanía de Alma</h4>
                                    <p className="text-lg font-body font-light text-[#2D2926]/60">Entiende por qué este músculo es la clave para una mente proactiva y libre.</p>
                                    <div className="flex items-center gap-2 text-[#8C4005] font-bold text-xs font-guide uppercase tracking-widest">
                                        Entender el Psoas <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Venezuela en el Cuerpo Highlight */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-[#8C4005] text-[#F5EFE6] p-12 md:p-20 rounded-[5rem] shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B8835A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
                                <div className="space-y-6 flex-1">
                                    <span className="text-[#B8835A] font-bold tracking-[0.4em] uppercase text-xs block font-guide">Evento Especial</span>
                                    <h3 className="text-4xl md:text-6xl font-editorial leading-tight">
                                        Tour Nacional:<br />
                                        <span className="italic text-[#B8835A]">Venezuela en el Cuerpo</span>
                                    </h3>
                                    <p className="text-xl md:text-2xl font-editorial opacity-80 max-w-2xl leading-relaxed">
                                        Si tu sistema nervioso está en modo supervivencia, este movimiento de regulación personal y colectiva es el espacio para recuperar tu soberanía.
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <Link 
                                        href="/venezuela-en-el-cuerpo"
                                        className="inline-flex items-center gap-4 bg-[#F5EFE6] text-[#8C4005] px-10 py-6 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:scale-105 transition-transform shadow-xl group/btn"
                                    >
                                        Inscribirme al Tour
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

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

function ExerciseCard({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all space-y-6">
            <h4 className="text-2xl font-bold font-editorial text-[#2D2926]">{title}</h4>
            <div className="w-12 h-px bg-[#B8835A]/30" />
            <p className="text-lg text-[#2D2926]/70 leading-relaxed font-body font-light italic">
                {desc}
            </p>
        </div>
    );
}
