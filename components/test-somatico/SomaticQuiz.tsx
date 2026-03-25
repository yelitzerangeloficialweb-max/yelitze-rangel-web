'use client';

import { useState, useMemo, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Activity, 
    ArrowRight, 
    Brain, 
    CheckCircle2, 
    Sparkles, 
    Zap, 
    ArrowLeft,
    ShieldCheck,
    Download,
    Loader2 
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
    const pdfContentRef = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState<'intro' | 'quiz' | 'reflection' | 'form' | 'result'>('intro');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [reflection, setReflection] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [aiResult, setAiResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefining, setIsRefining] = useState(false);

    const currentQuestion = QUESTIONS[currentIndex];
    const progress = (currentIndex / QUESTIONS.length) * 100;

    const stressResult = useMemo(() => {
        const cat1 = (answers[1] || 0) + (answers[2] || 0) + (answers[3] || 0);
        const cat2 = (answers[4] || 0) + (answers[5] || 0) + (answers[6] || 0);
        const cat3 = (answers[7] || 0);
        const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);

        if (cat2 >= 2) return {
            type: "Estrés de Supervivencia (Congelamiento Profundo)",
            desc: "Tu cuerpo ha guardado memorias de amenaza que no pudieron completarse. Vives en una 'pausa' biológica que consume tu energía vital.",
            icon: Zap,
            severity: 'high'
        };
        if (cat1 >= 2) return {
            type: "Estrés de Anticipación (Bloqueo Fascial)",
            desc: "Tu fascia corporal está organizada para un peligro inminente. Tu abdomen y diafragma actúan como un escudo constante.",
            icon: Activity,
            severity: 'medium'
        };
        if (cat3 >= 0.5) return {
            type: "Hipersensibilidad y Desregulación",
            desc: "Tu sistema tiene dificultades para encontrar el camino de regreso a la calma. Los ciclos de alerta se disparan espontáneamente.",
            icon: Brain,
            severity: 'medium'
        };
        if (totalScore <= 1.5) return {
            type: "Regulación Somática Óptima",
            desc: "Tu sistema nervioso se encuentra en un estado de equilibrio y escucha. Tu fascia corporal mantiene su elasticidad biológica.",
            icon: ShieldCheck,
            severity: 'low'
        };
        
        return {
            type: "Tensión Somática Latente",
            desc: "Tu sistema mantiene un nivel de alerta funcional, pero hay áreas de tu red fascial que necesitan ser movilizadas.",
            icon: Sparkles,
            severity: 'low'
        };
    }, [answers]);

    const recommendedExercises = useMemo(() => {
        const type = stressResult.type;
        
        if (type.includes("Supervivencia")) {
            return [
                { title: "Sonido VOO", desc: "Vibración profunda que regula el nervio vago y despierta el diafragma." },
                { title: "Vibración Consciente", desc: "Sacudidas muy suaves de las manos para soltar la energía de congelamiento." },
                { title: "Apoyo en el Suelo", desc: "Acostarse con las rodillas dobladas para permitir que el psoas empiece a ceder." }
            ];
        }
        if (type.includes("Anticipación")) {
            return [
                { title: "Liberación de Psoas", desc: "Estiramiento suave estilo corredor para soltar la tensión del diafragma." },
                { title: "Respiración Abdominal", desc: "Habitar el vientre para expandir la fascia endurecida por la alerta." },
                { title: "Mirada Orientativa", desc: "Mirar lentamente el espacio para indicar al cerebro que no hay peligro inminente." }
            ];
        }
        if (type.includes("Hipersensibilidad")) {
            return [
                { title: "Contención Física", desc: "Manos al pecho para sentir tus límites físicos y calmar la desregulación." },
                { title: "Foco Visual", desc: "Mirar un punto fijo para estabilizar el sistema nervioso cuando está saturado." },
                { title: "Voz Suave", desc: "Tararear un tono constante para masajear internamente los tejidos del cuello." }
            ];
        }
        
        // Default / Optimal
        return [
            { title: "Expansión Fascial", desc: "Estiramientos globales lentos para mantener la elasticidad biológica." },
            { title: "Respiración Coherente", desc: "Ritmo constante para mantener el equilibrio entre alerta y calma." },
            { title: "Escucha Interna", desc: "Sentir el pulso y la temperatura para fortalecer la interocepsión." }
        ];
    }, [stressResult.type]);

    const handleAnswer = (value: number) => {
        const newAnswers = { ...answers, [currentQuestion.id]: value };
        setAnswers(newAnswers);

        if (currentIndex < QUESTIONS.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setStep('reflection');
        }
    };

    const sendEmailWithData = async (finalResult: any) => {
        setIsSending(true);
        try {
            const response = await fetch('/api/ai/somatic-test/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    name,
                    reflection,
                    stressResult: { type: stressResult.type, desc: stressResult.desc },
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

    const handleDownloadPDF = async () => {
        const element = pdfContentRef.current;
        if (!element || !aiResult) return;

        setIsDownloading(true);
        try {
            await document.fonts.ready;
            
            // Temporary visibility for capture
            element.style.display = 'block';
            element.style.position = 'fixed';
            element.style.left = '-9999px';
            element.style.top = '0';

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#FDFBFA'
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.9);
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            // Calculate total pages based on canvas height vs A4 page height
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            // Add first page
            pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;

            // Add more pages if content overflows
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            pdf.save(`Diagnostico_Somatico_${name.replace(/\s+/g, '_')}.pdf`);
            element.style.display = 'none';
        } catch (error) {
            console.error("Error generating local PDF:", error);
            alert("No se pudo generar el PDF. Por favor intenta de nuevo.");
            if (element) element.style.display = 'none';
        } finally {
            setIsDownloading(false);
        }
    };

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
                    email, // Send email to DB
                    stressResult: {
                        type: stressResult.type,
                        desc: stressResult.desc
                    }
                })
            });

            if (!response.ok) throw new Error('Error al generar diagnóstico');
            
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            setAiResult(data);
            setIsLoading(false); // Show results immediately
            
            if (email) {
                sendEmailWithData(data); // Background email sending
            }
        } catch (error) {
            console.error("AI Generation Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative z-10 w-full pb-20">
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
                                <span className="italic text-[#B8835A]">Escucha el lenguaje de tu Fascia Corporal</span>
                            </h1>
                        </div>

                        <div className="bg-white/40 backdrop-blur-md p-10 md:p-16 rounded-[4rem] border border-[#B8835A]/10 shadow-xl space-y-8">
                            <p className="text-2xl md:text-3xl font-editorial italic text-[#2D2926] leading-relaxed">
                                "Las emociones no procesadas se densifican en tu fascia corporal, creando patrones de tensión que limitan tu soberanía. Descubre lo que tu sistema nervioso está intentando integrar."
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
                                <span>Pasos {currentIndex + 1} de {QUESTIONS.length}</span>
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
                                            className="w-full text-left p-6 md:p-8 rounded-3xl bg-[#F5EFE6]/50 hover:bg-white hover:shadow-lg transition-all flex items-center justify-between group"
                                        >
                                            <span className="text-xl md:text-2xl font-editorial text-[#2D2926]">
                                                {opt.label}
                                            </span>
                                            <ArrowRight className="w-5 h-5 text-[#8C4005] group-hover:translate-x-2 transition-transform" />
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
                        <div className="text-center space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-6xl font-editorial text-[#2D2926]">Escucha Profunda</h2>
                                <p className="text-xl font-editorial italic text-[#8C4005]">
                                    "¿Qué sensaciones emergen en tu cuerpo al hacer este test?"
                                </p>
                            </div>
                            
                            <div className="max-w-2xl mx-auto bg-[#8C4005]/5 p-8 rounded-[2rem] border-l-4 border-[#8C4005] space-y-4 text-left">
                                <p className="text-[#2D2926] text-lg font-body leading-relaxed">
                                    Este es un espacio para registrar lo que tu sistema nervioso está comunicando en este momento. Al recordar situaciones o identificar tensiones, tu cuerpo suele reaccionar con sensaciones físicas concretas.
                                </p>
                                <div className="pt-2 border-t border-[#8C4005]/10">
                                    <p className="text-[#8C4005] font-bold text-xs uppercase tracking-widest font-guide mb-2">Ejemplos de lo que puedes escribir:</p>
                                    <p className="text-[#4D4D4D] italic text-base font-editorial">
                                        "Siento un nudo en la garganta", "picazón en las manos", "mis hombros están muy pesados" o "un frío que recorre mi espalda".
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <textarea
                            value={reflection}
                            onChange={(e) => setReflection(e.target.value)}
                            placeholder="Describe brevemente tu sentir actual..."
                            className="w-full h-64 p-10 text-2xl font-editorial text-[#2D2926] bg-white rounded-[2.5rem] shadow-xl border-none focus:ring-2 focus:ring-[#8C4005] outline-none resize-none"
                        />

                        <div className="flex justify-end pr-4 -mt-6 relative z-20">
                            <button
                                onClick={async () => {
                                    if (!reflection.trim()) return;
                                    setIsRefining(true);
                                    try {
                                        const response = await fetch('/api/ai/somatic-test/refine-reflection', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ text: reflection })
                                        });
                                        const data = await response.json();
                                        if (data.refinedText) setReflection(data.refinedText);
                                    } catch (err) {
                                        console.error("Refinement error:", err);
                                    } finally {
                                        setIsRefining(false);
                                    }
                                }}
                                disabled={isRefining || !reflection.trim()}
                                className="bg-[#8C4005] text-white px-6 py-3 rounded-full text-[10px] font-bold flex items-center gap-2 hover:bg-[#B8835A] transition-all disabled:opacity-20 disabled:cursor-not-allowed uppercase tracking-widest shadow-lg"
                            >
                                {isRefining ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Sparkles className="w-4 h-4" />
                                )}
                                Interpretación de Yelitze
                            </button>
                        </div>

                        <div className="flex justify-center pt-8">
                            <button
                                onClick={() => setStep('form')}
                                disabled={!reflection || isRefining}
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
                            {isLoading ? "Consultando tu sistema..." : "Ver mi diagnóstico"}
                        </button>
                    </motion.div>
                )}

                {/* 5. LOADING */}
                {isLoading && step === 'result' && (
                    <div className="max-w-3xl mx-auto py-32 text-center space-y-8">
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 180, 270, 360] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-20 h-20 border-4 border-[#B8835A]/20 border-t-[#8C4005] rounded-full mx-auto"
                        />
                        <h2 className="text-3xl font-editorial text-[#2D2926]">Analizando tu biología...</h2>
                        <p className="text-[#8C4005] italic font-editorial text-xl">"Restaura el orden, y el equilibrio llegará por añadidura."</p>
                    </div>
                )}

                {/* 6. RESULT STEP */}
                {step === 'result' && !isLoading && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-5xl mx-auto space-y-16 py-10"
                    >
                        {/* Main Analysis Banner */}
                        <div className="bg-[#2D2926] text-[#F5EFE6] p-16 md:p-24 rounded-[4rem] md:rounded-[6rem] shadow-3xl text-center space-y-10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#8C4005]/10 to-transparent opacity-50" />
                            <div className="relative z-10 flex flex-col items-center gap-8">
                                <div className="bg-[#B8835A]/20 p-6 rounded-full">
                                    <stressResult.icon className="w-12 h-12 text-[#B8835A]" />
                                </div>
                                <div className="space-y-4">
                                    <span className="text-[#B8835A] font-bold tracking-[0.5em] uppercase text-xs block font-guide">Auditoría Biológica</span>
                                    <h2 className="text-4xl md:text-7xl font-editorial leading-tight text-[#B8835A]">
                                        {stressResult.type}
                                    </h2>
                                </div>
                                
                                <div className="max-w-3xl mx-auto py-8 border-y border-white/10">
                                    <p className="text-xl md:text-3xl font-editorial italic opacity-95 leading-relaxed">
                                        "{aiResult?.personalized_analysis || stressResult.desc}"
                                    </p>
                                </div>

                                {aiResult?.somatic_insight && (
                                    <div className="bg-[#B8835A] text-white px-8 py-4 rounded-2xl inline-block shadow-xl">
                                        <p className="font-editorial text-lg italic uppercase tracking-wider">
                                            {aiResult.somatic_insight}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recommendation Sections */}
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Primary Action from IA */}
                            <div className="md:col-span-2 bg-white p-12 md:p-16 rounded-[4rem] border border-[#B8835A]/10 shadow-xl space-y-8 flex flex-col justify-center">
                                <div className="space-y-4 text-center md:text-left">
                                    <span className="text-[#8C4005] font-bold tracking-[0.2em] uppercase text-[10px] block font-guide">Tu Primer Paso Maestro</span>
                                    <h3 className="text-3xl md:text-5xl font-editorial text-[#2D2926]">Guía de Regulación</h3>
                                    <p className="text-2xl font-editorial italic text-[#8C4005] leading-relaxed">
                                        {aiResult?.action_step || "Escucha el silencio de tu cuerpo y permite una exhalación profunda."}
                                    </p>
                                </div>
                            </div>

                            {/* Venezuela en el Cuerpo CTA */}
                            <div className="bg-[#8C4005] text-[#F5EFE6] p-12 rounded-[4rem] flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                                <div className="relative z-10 space-y-6 text-center">
                                    <h4 className="text-3xl font-editorial leading-snug">¿Lista para restaurar el orden?</h4>
                                    <p className="opacity-80 font-body text-base leading-relaxed">
                                        {aiResult?.venezuela_connection || "El Tour Venezuela en el Cuerpo es el espacio para tu liberación."}
                                    </p>
                                    <Link 
                                        href="/venezuela-en-el-cuerpo"
                                        className="inline-flex items-center gap-2 bg-[#F5EFE6] text-[#8C4005] px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-lg mx-auto"
                                    >
                                        Inscribirme al Tour
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Secondary Tools - Less redundant, more supportive */}
                        <div className="space-y-12">
                            <div className="text-center space-y-2">
                                <span className="text-[#8C4005] font-bold tracking-[0.2em] uppercase text-[10px] block font-guide">Recursos de sostenibilidad</span>
                                <h4 className="text-3xl md:text-4xl font-editorial text-[#2D2926]">Prácticas de Sostenimiento</h4>
                            </div>
                            <div className="grid md:grid-cols-3 gap-6">
                                {recommendedExercises.map((ex, idx) => (
                                    <ExerciseCard key={idx} title={ex.title} desc={ex.desc} />
                                ))}
                            </div>
                        </div>

                        {/* FOOTER & WHATSAPP */}
                        <div className="text-center space-y-8 pt-16 border-t border-[#B8835A]/10">
                            <div className="space-y-4">
                                <p className="text-[#8C4005] font-editorial italic text-2xl uppercase tracking-tighter">Tu diagnóstico completo ha sido enviado a {email}</p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <button 
                                        onClick={() => window.location.href = `https://wa.me/${whatsapp?.replace(/\D/g, '') || '584120000000'}?text=Hola Yelitze, acabo de terminar mi Test Somático y soy ${stressResult.type}. Me gustaría profundizar en mi proceso.`}
                                        className="flex items-center gap-4 bg-[#25D366] text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-[0.25em] text-xs hover:scale-105 transition-all shadow-xl"
                                    >
                                        <Activity className="w-5 h-5" />
                                        WhatsApp
                                    </button>

                                    <button 
                                        onClick={handleDownloadPDF}
                                        disabled={isDownloading}
                                        className="flex items-center gap-4 bg-[#8C4005] text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-[0.25em] text-xs hover:scale-105 transition-all shadow-xl disabled:opacity-50"
                                    >
                                        <Download className="w-5 h-5" />
                                        {isDownloading ? "Descargando..." : "Descargar PDF"}
                                    </button>
                                </div>
                            </div>
                            <div className="pt-10">
                                <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#2D2926]/40">YELITZE RANGEL • Tu Coach Ancestral • 2026</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HIDDEN PRINTABLE CONTENT (CAPTURED BY JS) */}
            <div 
                ref={pdfContentRef} 
                className="hidden" 
                style={{ width: '210mm', backgroundColor: '#FDFBFA', color: '#2D2926', fontFamily: 'serif' }}
            >
                {/* PDF Header */}
                <div style={{ backgroundColor: '#F5EFE6', padding: '40px 60px', borderBottom: '2px solid #B8835A30', textAlign: 'center' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/images/logo-color.png" alt="Logo" style={{ height: '60px', margin: '0 auto 20px' }} />
                    <h1 style={{ fontSize: '32px', fontStyle: 'italic', color: '#8C4005', margin: 0 }}>Diagnóstico de Reconexión Somática</h1>
                    <p style={{ letterSpacing: '0.3em', fontSize: '10px', marginTop: '10px', fontWeight: 'bold', color: '#B8835A' }}>PROCESO PERSONALIZADO 2026</p>
                </div>

                <div style={{ padding: '60px' }}>
                    {/* User Info */}
                    <div style={{ marginBottom: '40px', borderBottom: '1px solid #B8835A20', paddingBottom: '20px' }}>
                        <p style={{ fontSize: '14px', textTransform: 'uppercase', opacity: 0.6 }}>Preparado para:</p>
                        <h2 style={{ fontSize: '28px', margin: '5px 0' }}>{name}</h2>
                    </div>

                    {/* Stress Result */}
                    <div style={{ backgroundColor: '#FDFBF7', padding: '30px', borderRadius: '20px', borderLeft: '5px solid #8C4005', marginBottom: '40px' }}>
                        <h3 style={{ margin: '0 0 10px 0', color: '#8C4005', fontStyle: 'italic' }}>Tu Estado Actual</h3>
                        <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 10px 0' }}>{stressResult.type}</p>
                        <p style={{ fontSize: '16px', opacity: 0.8, lineHeight: '1.6' }}>{stressResult.desc}</p>
                    </div>

                    {/* AI Analysis */}
                    {aiResult && (
                        <div style={{ marginBottom: '40px' }}>
                            <h3 style={{ fontSize: '18px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B8835A', marginBottom: '20px' }}>Análisis Maestro de Yelitze</h3>
                            <div style={{ fontSize: '17px', lineHeight: '1.8', fontStyle: 'italic', backgroundColor: 'white', padding: '30px', borderRadius: '20px', border: '1px solid #B8835A15' }}>
                                {aiResult.personalized_analysis}
                            </div>
                        </div>
                    )}

                    {/* Resources for sustainability - DYNAMIC SECTION */}
                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B8835A', marginBottom: '20px', textAlign: 'center' }}>Recursos de Sostenibilidad / Prácticas de Sostenimiento</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            {recommendedExercises.map((ex, idx) => (
                                <div key={idx} style={{ backgroundColor: '#FDFBF7', padding: '20px', borderRadius: '15px' }}>
                                    <h4 style={{ color: '#8C4005', fontSize: '16px', margin: '0 0 10px 0' }}>{ex.title}</h4>
                                    <p style={{ fontSize: '13px', opacity: 0.7, margin: 0 }}>{ex.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reflection */}
                    {reflection && (
                        <div style={{ marginBottom: '40px' }}>
                            <h3 style={{ fontSize: '12px', opacity: 0.5, textTransform: 'uppercase', marginBottom: '10px' }}>Tu Reflexión Inicial</h3>
                            <p style={{ fontSize: '14px', opacity: 0.7 }}>"{reflection}"</p>
                        </div>
                    )}

                    {/* CTA/Footer */}
                    <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid #B8835A20', textAlign: 'center' }}>
                        <p style={{ fontStyle: 'italic', fontSize: '18px', color: '#8C4005', marginBottom: '20px' }}>"No es magia, es orden. Restaura el orden y el equilibrio llega por añadidura."</p>
                        <p style={{ fontSize: '10px', opacity: 0.4 }}>YELITZE RANGEL • COACH ANCESTRAL • YELITZERANGELOFICIAL.COM</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ExerciseCard({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="bg-white/50 p-8 rounded-[3rem] border border-[#B8835A]/10 shadow-sm hover:shadow-md transition-all space-y-4 text-center">
            <h5 className="text-xl font-bold font-editorial text-[#8C4005]">{title}</h5>
            <p className="text-sm text-[#2D2926]/60 leading-relaxed font-body italic">
                {desc}
            </p>
        </div>
    );
}
