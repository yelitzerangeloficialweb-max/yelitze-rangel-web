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

    const sendEmailWithData = async (finalResult: any) => {
        setIsSending(true);
        try {
            console.log("Iniciando envío de email para:", email);
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

            const emailData = await response.json();
            console.log("Email API response:", emailData);
            if (!response.ok) {
                console.error("Error sending email:", emailData.error, emailData.details);
                alert(`No se pudo enviar el correo: ${emailData.error || 'Error desconocido'}. Detalle: ${JSON.stringify(emailData.details || '')}`);
            } else {
                console.log("Email sent successfully", emailData);
                // No alert here, it can be distracting if it works
            }
        } catch (error: any) {
            console.error("Error sending data:", error);
            alert("Error al intentar conectar con el servicio de correo: " + error.message);
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
            
            // Automatic email sending with PDF
            if (email) {
                await sendEmailWithData(data);
            }
        } catch (error) {
            console.error("AI Generation Error:", error);
            alert("Error al generar el diagnóstico por IA. Revisa tu conexión.");
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
                                "Las emociones no son solo mentales, son procesos fisiológicos corporales. Cuando no podemos completar el ciclo natural de una emoción (como huir o defendernos), la activación se queda retenida, densificando nuestra fascia corporal y creando síntomas físicos. Descubre qué emociones podría estar sosteniendo tu cuerpo en este momento."
                            </p>

                            <div className="bg-[#8C4005]/5 p-8 rounded-[2rem] border-l-4 border-[#8C4005] mt-6 flex flex-col md:flex-row gap-6 items-center text-left">
                                <Zap className="w-12 h-12 text-[#8C4005] flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-bold font-editorial text-[#8C4005] mb-2">El Músculo PSOAS: El Guardián de tu Soberanía</h3>
                                    <p className="font-body font-light text-[#2D2926]/80 text-lg">
                                        Físicamente conecta tu columna con tus piernas, pero holísticamente es el <strong>"Músculo del Alma"</strong>. Un psoas contraído constantemente envía una señal de peligro a tu cerebro, haciendo biológicamente imposible crear una mente proactiva. Este test evaluará su estado.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-6 text-left py-8 border-t border-[#B8835A]/10">
                                <div className="space-y-4">
                                    <h4 className="font-bold text-[#8C4005] uppercase tracking-widest text-[10px]">1. Observación</h4>
                                    <p className="text-sm text-[#2D2926]/70 leading-relaxed font-body">Responde con honestidad escuchando la sensación física, no solo el pensamiento.</p>
                                </div>
                                <div className="space-y-4 border-x border-[#B8835A]/10 px-6">
                                    <h4 className="font-bold text-[#8C4005] uppercase tracking-widest text-[10px]">2. Reflexión</h4>
                                    <p className="text-sm text-[#2D2926]/70 leading-relaxed font-body">Un espacio para nombrar lo que sientes y permitir que el sistema nervioso se calme.</p>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-[#8C4005] uppercase tracking-widest text-[10px]">3. Integración</h4>
                                    <p className="text-sm text-[#2D2926]/70 leading-relaxed font-body">Recibe tu diagnóstico biológico y ejercicios prácticos de regulación.</p>
                                </div>
                            </div>

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
                                    {currentQuestion.explanation && (
                                        <motion.div 
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            key={`exp-${currentIndex}`}
                                            className="bg-[#8C4005]/5 p-6 rounded-2xl border-l-2 border-[#8C4005]/30 relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#8C4005]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                            <p className="text-[#8C4005] text-lg font-editorial italic leading-relaxed relative z-10">
                                                <span className="font-bold not-italic text-[10px] uppercase tracking-widest block mb-1 opacity-60">Biología del Síntoma:</span>
                                                {currentQuestion.explanation}
                                            </p>
                                        </motion.div>
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
                        exit={{ opacity: 0, y: -30 }}
                        className="max-w-3xl mx-auto space-y-12"
                    >
                        <div className="text-center space-y-6">
                            <h2 className="text-4xl md:text-6xl font-editorial text-[#2D2926]">Escucha Profunda</h2>
                            <p className="text-xl font-editorial italic text-[#8C4005] max-w-2xl mx-auto">
                                "Titular el sistema nervioso significa darle un espacio de salida a la carga eléctrica acumulada. Escribir es un acto neurobiológico que ayuda a organizar el caos interno en soberanía."
                            </p>
                        </div>
                        
                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-[#B8835A]/10 space-y-8">
                            <div className="space-y-4 text-center">
                                <label className="text-[#8C4005] font-bold uppercase tracking-wider text-[12px] block font-guide">
                                    Sobre tu proceso:
                                </label>
                                <textarea
                                    value={reflection}
                                    onChange={(e) => setReflection(e.target.value)}
                                    placeholder="Escribe aquí lo que emerge: una tensión, un pensamiento, una emoción..."
                                    className="w-full h-64 p-8 text-2xl font-editorial text-[#2D2926] placeholder:text-[#2D2926]/20 bg-[#F5EFE6]/30 rounded-[2.5rem] border-none focus:ring-2 focus:ring-[#8C4005] outline-none resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={() => setStep('form')}
                                disabled={!reflection}
                                className="bg-[#8C4005] text-[#F5EFE6] px-14 py-6 rounded-2xl font-bold uppercase tracking-[0.25em] text-xs hover:scale-[1.05] disabled:opacity-50 disabled:hover:scale-100 shadow-xl transition-all flex items-center gap-4 group font-guide"
                            >
                                Continuar con mi Diagnóstico
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 2.55 LEAD FORM STEP */}
                {step === 'form' && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        className="max-w-xl mx-auto space-y-12"
                    >
                        <div className="text-center space-y-6">
                            <h2 className="text-4xl md:text-6xl font-editorial text-[#2D2926]">Tu Identidad</h2>
                            <p className="text-xl font-editorial italic text-[#8C4005] max-w-md mx-auto">
                                Para entregarte este diagnóstico con el cuidado que merece, necesito saber a quién me dirijo.
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-[#B8835A]/10 space-y-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[#8C4005] font-bold uppercase tracking-wider text-[10px] block font-guide ml-4">
                                        Tu Nombre:
                                    </label>
                                    <input 
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="¿Cómo te llamas?"
                                        className="w-full p-6 text-xl font-editorial text-[#2D2926] bg-[#F5EFE6]/30 rounded-2xl border-none focus:ring-2 focus:ring-[#8C4005] outline-none"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[#8C4005] font-bold uppercase tracking-wider text-[10px] block font-guide ml-4">
                                        Tu WhatsApp:
                                    </label>
                                    <input 
                                        type="tel"
                                        value={whatsapp}
                                        onChange={(e) => setWhatsapp(e.target.value)}
                                        placeholder="+58 412..."
                                        className="w-full p-6 text-xl font-editorial text-[#2D2926] bg-[#F5EFE6]/30 rounded-2xl border-none focus:ring-2 focus:ring-[#8C4005] outline-none"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[#8C4005] font-bold uppercase tracking-wider text-[10px] block font-guide ml-4 text-center">
                                        Email para el diagnóstico PDF:
                                    </label>
                                    <input 
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="tu@email.com"
                                        className="w-full p-6 text-center text-xl font-editorial text-[#2D2926] bg-[#F5EFE6]/30 rounded-2xl border-none focus:ring-2 focus:ring-[#8C4005] outline-none"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            <button
                                onClick={generateAIResult}
                                disabled={!email || !name}
                                className="bg-[#8C4005] text-[#F5EFE6] px-14 py-6 rounded-2xl font-bold uppercase tracking-[0.25em] text-xs hover:scale-[1.05] disabled:opacity-50 disabled:hover:scale-100 shadow-xl transition-all flex items-center gap-4 group font-guide"
                            >
                                {isLoading ? "Analizando tu biología..." : "Ver mi diagnóstico y recibir PDF"}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                            
                            <button
                                onClick={() => setStep('reflection')}
                                className="text-[#2D2926]/40 hover:text-[#8C4005] font-guide text-[10px] uppercase font-bold tracking-widest transition-colors flex items-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" /> Volver a mi reflexión
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 2.6 LOADING STEP */}
                {isLoading && step === 'result' && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="max-w-3xl mx-auto py-32 text-center space-y-8"
                    >
                        <div className="relative flex justify-center">
                            <motion.div 
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="w-24 h-24 border-4 border-[#B8835A]/20 border-t-[#8C4005] rounded-full"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Sparkles className="w-8 h-8 text-[#8C4005]" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-editorial text-[#2D2926]">Escuchando tu fascia corporal...</h2>
                            <p className="text-xl font-editorial italic text-[#8C4005]">"Tu cuerpo no miente, solo el orden libera."</p>
                        </div>
                    </motion.div>
                )}

                {/* 3. RESULT STEP */}
                {step === 'result' && !isLoading && (
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
                                    {aiResult?.somatic_insight && (
                                        <p className="text-[#B8835A] font-editorial italic text-2xl opacity-80">
                                            "{aiResult.somatic_insight}"
                                        </p>
                                    )}
                                </div>
                            <div className="w-full max-w-4xl mx-auto bg-white/5 p-10 rounded-[3rem] border border-white/10 space-y-6 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
                                <p className="text-xl md:text-3xl font-editorial italic opacity-90 leading-relaxed text-[#F5EFE6] relative z-10">
                                    {aiResult?.personalized_analysis || stressResult.desc}
                                </p>
                            </div>
                            <div className="w-24 h-px bg-[#B8835A] mx-auto opacity-40" />
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-lg md:text-xl font-body font-light max-w-2xl mx-auto text-[#F5EFE6]/70"
                            >
                                {totalScore >= 3.5 
                                    ? "Tu sistema nervioso parece estar organizando tu cuerpo alrededor de una amenaza que ya pasó. El cuerpo no puede crear una mente proactiva si la fascia corporal está en defensa."
                                    : "Muestras signos de regulación, pero hay memorias específicas en tu fascia corporal que están condicionando tu respuesta al entorno."
                                }
                            </motion.p>
                        </div>
                    </div>

                    {/* Prominent Educational Link - Symptoms */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="py-8"
                    >
                        <Link href="/test-somatico/sintomas-fisicos" className="group block">
                            <div className="bg-[#8C4005]/5 p-12 md:p-16 rounded-[4rem] border-2 border-[#8C4005]/20 hover:border-[#8C4005] transition-all duration-500 shadow-xl hover:shadow-2xl relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-1 space-y-4">
                                    <h4 className="text-4xl md:text-6xl font-editorial text-[#2D2926] leading-tight">
                                        Comprendiendo los <br />
                                        <span className="text-[#8C4005] font-black uppercase tracking-widest text-5xl md:text-7xl block mt-2">SÍNTOMAS FÍSICOS</span>
                                        <span className="italic block mt-2 opacity-80">y la FIBROMIALGIA</span>
                                    </h4>
                                    <p className="text-xl font-body font-light text-[#2D2926]/70 max-w-2xl mx-auto md:mx-0">
                                        Profundiza en cómo el dolor crónico está íntimamente vinculado a las memorias somáticas atrapadas en tu cuerpo.
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 rounded-full bg-[#8C4005] text-[#F5EFE6] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                        <ArrowRight className="w-10 h-10" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                        {/* Solutions & Exercises */}
                        <div className="space-y-16">
                            <div className="text-center space-y-4">
                                <span className="text-[#8C4005] font-bold tracking-[0.4em] uppercase text-xs block font-guide">Ruta de Regulación</span>
                                <h3 className="text-4xl md:text-6xl font-editorial text-[#2D2926]">Técnicas de Descongelamiento</h3>
                                {aiResult?.action_step && (
                                    <p className="text-xl font-editorial italic text-[#8C4005]">
                                        Guía de Regulación: {aiResult.action_step}
                                    </p>
                                )}
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

                        {/* Educational Insight: Emotions */}
                        <div className="space-y-12 py-16 border-t border-[#B8835A]/10">
                            <div className="text-center space-y-4">
                                <span className="text-[#8C4005] font-bold tracking-[0.4em] uppercase text-xs block font-guide">Conexión Bio-Emocional</span>
                                <h3 className="text-4xl md:text-6xl font-editorial text-[#2D2926]">Emociones "Atrapadas" en la Fascia</h3>
                                <p className="text-xl font-body font-light text-[#2D2926]/70 max-w-2xl mx-auto">
                                    La fascia es extremadamente sensible a la química del estrés (cortisol y adrenalina). Cuando una emoción no se procesa, el tejido puede volverse rígido o inflamarse.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-white/40 p-8 rounded-[2.5rem] border border-[#B8835A]/10 space-y-4">
                                    <h4 className="text-xl font-bold font-editorial text-[#8C4005]">Miedo y Supervivencia</h4>
                                    <p className="text-lg text-[#2D2926]/80 font-body font-light">Suele alojarse en el <strong>psoas</strong> (el "músculo del alma") y en la zona lumbar.</p>
                                </div>
                                <div className="bg-white/40 p-8 rounded-[2.5rem] border border-[#B8835A]/10 space-y-4">
                                    <h4 className="text-xl font-bold font-editorial text-[#8C4005]">Ira y Frustración</h4>
                                    <p className="text-lg text-[#2D2926]/80 font-body font-light">Comúnmente reflejada en la <strong>mandíbula</strong> (bruxismo), el cuello y los hombros.</p>
                                </div>
                                <div className="bg-white/40 p-8 rounded-[2.5rem] border border-[#B8835A]/10 space-y-4">
                                    <h4 className="text-xl font-bold font-editorial text-[#8C4005]">Tristeza y Duelo</h4>
                                    <p className="text-lg text-[#2D2926]/80 font-body font-light">Se manifiesta a menudo en el <strong>pecho, el diafragma</strong> y la zona dorsal (sensación de "peso").</p>
                                </div>
                                <div className="bg-white/40 p-8 rounded-[2.5rem] border border-[#B8835A]/10 space-y-4">
                                    <h4 className="text-xl font-bold font-editorial text-[#8C4005]">Culpabilidad o Responsabilidad</h4>
                                    <p className="text-lg text-[#2D2926]/80 font-body font-light">Se siente típicamente como una carga pesada sobre los <strong>hombros y los trapecios</strong>.</p>
                                </div>
                                <div className="bg-white/40 p-8 rounded-[2.5rem] border border-[#B8835A]/10 space-y-4">
                                    <h4 className="text-xl font-bold font-editorial text-[#8C4005]">Ansiedad y Control</h4>
                                    <p className="text-lg text-[#2D2926]/80 font-body font-light">Se refleja en una <strong>fascia abdominal rígida</strong> y en la restricción de la respiración.</p>
                                </div>
                            </div>
                        </div>

                        {/* Educational Insight: Physical Symptoms */}
                        <div className="space-y-12 py-16 border-t border-[#B8835A]/10">
                            <div className="text-center space-y-4">
                                <span className="text-[#8C4005] font-bold tracking-[0.4em] uppercase text-xs block font-guide">Señales Físicas</span>
                                <h3 className="text-4xl md:text-6xl font-editorial text-[#2D2926]">Restricción Fascial-Emocional</h3>
                                <p className="text-xl font-body font-light text-[#2D2926]/70 max-w-2xl mx-auto">
                                    Si la fascia está "atrapada" por una carga emocional, el cuerpo presenta síntomas que a veces no tienen una explicación médica clara.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { t: "Dolor Crónico Errante", d: "Dolores que aparecen y desaparecen en diferentes partes sin causa aparente." },
                                    { t: "Rigidez Matutina", d: "Sensación de estar 'oxidado' o 'acartonado' al despertar." },
                                    { t: "Restricción del Movimiento", d: "Sentir que los músculos están cortos o que no puedes estirarte completamente." },
                                    { t: "Nudos o Puntos Gatillo", d: "Zonas de tensión extrema que duelen al tacto y parecen 'piedras'." },
                                    { t: "Fatiga Crónica", d: "El cuerpo gasta energía inmensa manteniendo esos tejidos contraídos." },
                                    { t: "Alteraciones Viscerales", d: "Afecta la función digestiva y el sueño debido a la tensión en la fascia del tronco." }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-[#8C4005]/5 p-8 rounded-[2rem] border border-[#8C4005]/10 flex gap-4 items-start">
                                        <CheckCircle2 className="w-6 h-6 text-[#8C4005] mt-1 flex-shrink-0" />
                                        <div className="space-y-2">
                                            <h5 className="font-bold font-editorial text-[#2D2926]">{item.t}</h5>
                                            <p className="text-base text-[#2D2926]/70 font-body font-light leading-snug">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Educational Links */}
                        <div className="grid md:grid-cols-2 gap-8 items-stretch pt-8 border-t border-[#B8835A]/10">
                            <div className="space-y-6 flex flex-col justify-center">
                                <h3 className="text-3xl md:text-4xl font-editorial text-[#2D2926]">
                                    Aprende más sobre tu anatomía sagrada
                                </h3>
                                <p className="text-lg font-body font-light text-[#2D2926]/70">
                                    El conocimiento es el primer paso para la regulación.
                                </p>
                            </div>
                            <Link href="/test-somatico/el-psoas" className="group h-full">
                                <div className="bg-white p-12 rounded-[4rem] border border-[#B8835A]/10 hover:border-[#8C4005]/30 transition-all space-y-6 h-full flex flex-col justify-between hover:-translate-y-2 duration-300 shadow-sm hover:shadow-xl">
                                    <div className="space-y-4">
                                        <h4 className="text-3xl font-editorial text-[#2D2926]">El Músculo PSOAS: Soberanía de Alma</h4>
                                        <p className="text-lg font-body font-light text-[#2D2926]/60">Entiende por qué este músculo es la clave para una mente proactiva y libre.</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[#8C4005] font-bold text-xs font-guide uppercase tracking-widest mt-8">
                                        Entender el Psoas <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
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
                                        {aiResult?.venezuela_connection || "Si tu sistema nervioso está en modo supervivencia, este movimiento de regulación personal y colectiva es el espacio para recuperar tu soberanía."}
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
