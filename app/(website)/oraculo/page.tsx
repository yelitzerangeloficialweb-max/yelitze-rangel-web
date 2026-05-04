'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, ArrowLeft, User, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import OracleCard from '@/components/oracle/OracleCard';

const MESSAGES = [
    { 
        title: "Decisiones para renacer", 
        message: "No puedes renacer si sigues eligiendo lo que te apaga. Cada decisión que postergas también es una forma de elegir quedarte donde ya no eres. Hoy no necesitas más claridad, necesitas coraje. Elige distinto. Aunque tiemble tu voz. Aunque duela soltar. Porque cuando te eliges… tu alma vuelve a la vida." 
    },
    { 
        title: "Espiral de los cambios", 
        message: "Nada en ti retrocede… todo se transforma. La espiral no te lleva al mismo lugar, te guía más profundo hacia tu verdad. Honra cada giro, cada cierre, cada renacer. Aunque no lo veas, estás regresando a ti." 
    },
    { 
        title: "La magia de la Maga", 
        message: "La magia que buscas no está afuera… vive en la mujer que decides ser. No es un don lejano, es una memoria que despierta cuando te eliges. Tu palabra crea. Tu intención abre caminos. Tu presencia transforma. Recuerda… la maga no pide permiso. Confía, y actúa." 
    },
    { 
        title: "La araña que teje", 
        message: "Eres the tejedora de tu destino. Hilo a hilo, decisión a decisión, vas creando la historia que habitas. No todo lo que tejiste fue consciente, pero hoy… sí lo es. La mujer ancestral en ti recuerda: puedes soltar viejas tramas y comenzar de nuevo. Teje con intención. Teje con verdad. Porque la red que creas… también te sostiene." 
    },
    { 
        title: "El poder de la serpiente", 
        message: "Te enseñaron a temerle… pero la serpiente no es sombra, es medicina. Ella no destruye, se transforma. Muda la piel sin culpa, sin apego, sin mirar atrás. La mujer que despierta en ti sabe: no viniste a quedarte en la misma versión de ti misma. Viniste a soltar, a renovar, a renacer cuantas veces sea necesario. Tu poder no es oscuro… es profundo. Y en esa profundidad, habita tu sanación." 
    },
    { 
        title: "El colibrí te habla", 
        message: "Grandiosa mujer, recuerda. El colibrí no carga el peso del mundo, pero conoce el néctar de la vida. Va ligero, pero preciso. Sabe dónde sí… y dónde no quedarse. La sabiduría ancestral susurra en su vuelo: no todo es lucha, también es dulzura. Detente. Respira. Vuelve a lo que te da vida. Porque la mujer que honra su alegría… también está sanando su linaje." 
    },
    { 
        title: "El conejo te habla", 
        message: "Mujer… siente. El conejo no duda de su instinto, escucha la tierra y se mueve en el momento justo. Es ternura… pero también es alerta. Es vida que se multiplica, es fertilidad de ideas, de caminos, de nuevos comienzos. La sabiduría antigua te susurra: no ignores lo que tu cuerpo percibe antes que tu mente entienda. Confía en tu intuición. Protege tu energía. Elige dónde sembrarte. Porque la mujer que honra su instinto… siempre encuentra el camino de regreso a sí misma." 
    },
    { 
        title: "El poder de la leona", 
        message: "Mujer… recuerda quién eres. La leona no pide permiso para ocupar su lugar. Camina con certeza, protege lo que ama y no traiciona su instinto. No ruge por todo… pero cuando lo hace, la verdad se escucha. En ti habita esa fuerza: la que sostiene, la que cuida, la que también sabe poner límites. La sabiduría ancestral te llama: no confundas amor con silencio. Tu poder no está en resistirlo todo… está en elegir dónde te quedas y dónde te retiras. Porque la mujer que se honra… se vuelve territorio sagrado." 
    },
    { 
        title: "El equilibrio y el éxito", 
        message: "Mujer… recuerda. El verdadero éxito no nace del sacrificio constante, sino del equilibrio que honra tu alma. No estás aquí para agotarte demostrando tu valor, sino para sostener una vida que también te sostenga a ti. La sabiduría antigua lo susurra: todo lo que crece en desbalance… termina por romperse. Aprende a dar, pero también a recibir. Avanzar, pero también a detenerte. Porque cuando te alineas contigo, el éxito deja de ser lucha… y se convierte en expansión." 
    },
    { 
        title: "La Tortuga", 
        message: "Vístete despacio que vas de prisa. Mujer… detente. La prisa dispersa, pero la presencia ordena. No es haciendo más como llegas más lejos, es enfocando tu energía en lo que realmente importa. La sabiduría antigua lo sabía: quien camina con conciencia, no se pierde. Respira. Elige. Concéntrate. Porque cuando tu atención se alinea, tu energía deja de fragmentarse… y tu camino se abre con claridad." 
    },
    { 
        title: "La libélula te habla", 
        message: "Mujer… escucha el agua de tu interior. La libélula no vive en la prisa del mundo, vive entre cambios de luz, entre lo que fue… y lo que está por revelarse. Vuela ligera porque no se aferra a ninguna versión de sí misma. Se transforma sin pedir permiso. La sabiduría ancestral te susurra en sus alas: no eres la misma de ayer… y eso es sagrado. Deja de exigirte permanencia. Honra tu cambio. Confía en tu evolución. Porque cuando dejas de resistirte a tu transformación… tu vida se vuelve más clara, más liviana, más verdadera." 
    },
    { 
        title: "El poder de ser mujer", 
        message: "Cuando la mujer honra su lugar interno, no desde la sumisión, sino desde la presencia, algo en su vida se ordena. La energía femenina no es pasividad… es raíz, es intuición, es sabiduría que sostiene sin perderse. Y desde ese centro, las relaciones dejan de ser lucha. No porque el otro “deba hacer más”, sino porque ya no hay vacío que llenar a costa propia. Cada quien ocupa su responsabilidad, sin rescates, sin cargas invisibles. Sanar la relación con los padres —esa primera raíz— es volver a ti sin miedo, sin lealtades que te alejen de tu propio centro. No es perder poder… es recuperarlo. Es recordar que tu energía creadora no se entrega afuera para sobrevivir, se habita para vivir con verdad. Porque la mujer que se reconoce… no se busca en otros, se encuentra en sí misma." 
    }
];

const REFLECTIONS = [
    "Hija mía, lo que hoy ves en estas cartas no es casualidad. Tu linaje femenino está hablando a través de ti. Recuerda que no caminas sola; miles de mujeres te sostienen la espalda. Tu sanación es la de ellas también.",
    "Siente el palpitar de tu centro. Esas memorias que hoy emergen son invitaciones a la libertad. Has sido elegida para romper las cadenas del silencio y habitar tu soberanía con plenitud. Yo te acompaño en este despertar.",
    "El orden sistémico nos enseña que el amor fluye cuando cada una ocupa su lugar. Hoy, al elegir estas cartas, has dado un paso hacia tu propio lugar de fuerza. Honra lo que fue, para que puedas crear lo que será.",
    "Mirar el linaje con amor es el acto de valentía más grande de una mujer. No cargues lo que no es tuyo; devuelve con gratitud y quédate con la fuerza. Eres la portadora de una nueva historia para todas las que vendrán."
];

export default function OraclePage() {
    const [userName, setUserName] = useState('');
    const [step, setStep] = useState<'NAME' | 'ORACLE' | 'RESULT'>('NAME');
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [shuffledMessages, setShuffledMessages] = useState(MESSAGES);
    const [selectedMessage, setSelectedMessage] = useState<{title: string, message: string} | null>(null);
    const [yelitzeReflection, setYelitzeReflection] = useState('');

    useEffect(() => {
        setShuffledMessages([...MESSAGES].sort(() => Math.random() - 0.5));
    }, []);

    const handleStart = (e: React.FormEvent) => {
        e.preventDefault();
        if (userName.trim()) {
            setStep('ORACLE');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleCardClick = (index: number) => {
        if (step === 'RESULT') {
            setSelectedMessage(shuffledMessages[index]);
            return;
        }
        
        if (selectedIndices.includes(index)) {
            setSelectedIndices(selectedIndices.filter(i => i !== index));
        } else if (selectedIndices.length < 3) {
            setSelectedIndices([...selectedIndices, index]);
        }
    };

    const closeMessageModal = () => setSelectedMessage(null);

    const handleReveal = () => {
        if (selectedIndices.length === 3) {
            setYelitzeReflection(REFLECTIONS[Math.floor(Math.random() * REFLECTIONS.length)]);
            setStep('RESULT');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleReset = () => {
        setSelectedIndices([]);
        setStep('ORACLE');
        setShuffledMessages([...MESSAGES].sort(() => Math.random() - 0.5));
    };

    return (
        <div className="min-h-screen bg-[#2D2926] text-[#F5EFE6] relative overflow-hidden flex flex-col items-center justify-center p-4 md:p-8">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#B8835A]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#8C4005]/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/assets/images/watermark-logo.png')] bg-no-repeat bg-center opacity-[0.02] scale-150" />
            </div>

            <Link 
                href="/" 
                className="absolute top-8 left-8 z-50 flex items-center gap-2 text-[#B8835A] hover:text-white transition-colors uppercase text-[10px] tracking-widest font-bold"
            >
                <ArrowLeft className="w-4 h-4" />
                Volver
            </Link>

            <AnimatePresence mode="wait">
                {step === 'NAME' && (
                    <motion.div 
                        key="name-step"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="relative z-10 w-full max-w-lg text-center space-y-12 bg-[#F9F7F2]/5 p-12 md:p-20 rounded-[4rem] backdrop-blur-xl border border-[#B8835A]/10 shadow-2xl"
                    >
                        <div className="space-y-4">
                            <span className="text-[#B8835A] font-guide text-xs uppercase tracking-[0.4em] font-bold block">Sanando el Linaje Femenino</span>
                            <h2 className="text-2xl md:text-4xl font-editorial leading-tight text-[#B8835A]">Inicia tu<br/><span className="italic text-white">Consulta Alquímica</span></h2>
                        </div>
                        
                        <form onSubmit={handleStart} className="space-y-8">
                            <div className="relative">
                                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B8835A]/50" />
                                <input 
                                    type="text" 
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="Escribe tu nombre..."
                                    className="w-full bg-[#2D2926]/50 border-2 border-[#B8835A]/20 rounded-2xl py-6 pl-16 pr-6 text-xl font-editorial focus:border-[#B8835A] focus:ring-0 transition-all outline-none"
                                    required
                                />
                            </div>
                            <button 
                                type="submit"
                                className="w-full bg-[#B8835A] text-[#2D2926] py-6 rounded-2xl font-bold uppercase tracking-[0.25em] text-xs hover:scale-[1.02] transition-all shadow-xl"
                            >
                                Entrar al Espacio Sagrado
                            </button>
                        </form>
                        <p className="text-[#F5EFE6]/40 text-[10px] uppercase tracking-widest leading-loose">
                            "Para sanar a la mujer que eres,<br/>primero debes honrar a las mujeres que te hicieron."
                        </p>
                    </motion.div>
                )}

                {(step === 'ORACLE' || step === 'RESULT') && (
                    <div className="w-full flex flex-col items-center">
                        <header className="relative z-10 text-center mb-12 space-y-4 mt-16 md:mt-24">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <span className="text-[#B8835A] font-guide text-xs md:text-sm uppercase tracking-[0.4em] font-bold block mb-2">
                                    Oráculo de las Almas
                                </span>
                                <h1 className="text-4xl md:text-6xl font-editorial leading-tight">
                                    Sanando el <span className="italic text-[#B8835A]">Linaje Femenino</span>
                                </h1>
                            </motion.div>
                            
                            {step === 'ORACLE' && (
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-[#F5EFE6]/60 font-light text-sm md:text-lg max-w-lg mx-auto"
                                >
                                    Bienvenida, <strong className="text-white">{userName}</strong>. Respira profundo y elige <strong className="text-[#B8835A]">3 cartas</strong> que llamen a tu alma femenina hoy.
                                </motion.p>
                            )}
                        </header>

                        <div className="relative z-10 w-full max-w-7xl mt-12 md:mt-20">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24 justify-items-center items-center py-16">
                                <AnimatePresence mode="popLayout">
                                    {shuffledMessages.map((msg, idx) => {
                                        const isSelected = selectedIndices.includes(idx);
                                        const shouldShow = step === 'ORACLE' || isSelected;

                                        if (!shouldShow) return null;

                                        return (
                                            <motion.div
                                                key={idx}
                                                layout
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                                transition={{ duration: 0.6, type: "spring" }}
                                                className={`${step === 'RESULT' ? 'col-span-2 md:col-span-2 lg:col-span-2 flex flex-col items-center gap-6' : ''}`}
                                            >
                                                {step === 'RESULT' && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.5 }}
                                                        className="text-center"
                                                    >
                                                        <span className="text-[#B8835A] font-guide text-[10px] uppercase tracking-[0.4em] font-bold block mb-1">Posición Sagrada</span>
                                                        <h4 className="text-white font-editorial italic text-xl">
                                                            {selectedIndices.indexOf(idx) === 0 && "La Raíz"}
                                                            {selectedIndices.indexOf(idx) === 1 && "El Corazón"}
                                                            {selectedIndices.indexOf(idx) === 2 && "El Propósito"}
                                                        </h4>
                                                    </motion.div>
                                                )}
                                                <OracleCard 
                                                    index={idx}
                                                    isSelected={isSelected}
                                                    isRevealed={step === 'RESULT'}
                                                    content={msg}
                                                    onClick={() => handleCardClick(idx)}
                                                />
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </div>

                        {step === 'RESULT' && (
                            <motion.div 
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="relative z-10 mt-16 max-w-4xl w-full bg-[#F9F7F2] p-10 md:p-20 rounded-[4rem] text-[#2D2926] shadow-3xl"
                            >
                                <div className="flex flex-col items-center text-center space-y-8">
                                    <div className="w-16 h-16 bg-[#B8835A]/10 rounded-full flex items-center justify-center text-[#B8835A]">
                                        <MessageCircle className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-4">
                                        <span className="text-[#B8835A] font-guide text-xs uppercase tracking-[0.4em] font-bold block">Reflexión de Yelitze Rangel</span>
                                        <h3 className="text-3xl md:text-4xl font-editorial italic leading-tight">Querida {userName}...</h3>
                                    </div>
                                    <p className="text-xl md:text-2xl font-editorial font-light leading-relaxed opacity-90 max-w-2xl">
                                        "{yelitzeReflection}"
                                    </p>
                                    <div className="pt-8 border-t border-[#B8835A]/20 w-full flex flex-col items-center gap-6">
                                        <p className="text-sm font-guide uppercase tracking-widest font-bold text-[#B8835A]">Con amor y certeza sistémica,</p>
                                        <div className="text-center mb-8">
                                            <p className="text-3xl font-editorial italic">Yelitze Rangel</p>
                                            <p className="text-[#B8835A] text-sm italic mt-1 font-editorial">Tu Coach Ancestral</p>
                                        </div>

                                        {/* Store CTA */}
                                        <div className="bg-[#B8835A]/5 rounded-3xl p-8 border border-[#B8835A]/20 w-full">
                                            <p className="text-base md:text-xl font-editorial italic mb-6 leading-relaxed">
                                                ¿Te gustaría llevar esta sabiduría contigo? Adquiere el <strong className="text-[#8C4005] not-italic">Oráculo Ancestral completo</strong> en formato PDF para imprimirlo y realizar tus propias consultas sagradas siempre que lo necesites.
                                            </p>
                                            <Link 
                                                href="/tienda" 
                                                className="inline-flex items-center gap-3 bg-[#B8835A] text-[#2D2926] px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-lg"
                                            >
                                                Visitar la Tienda
                                            </Link>
                                    </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <footer className="relative z-10 mt-16 pb-20 flex flex-col items-center gap-8">
                            {step === 'ORACLE' ? (
                                <div className="flex flex-col items-center gap-6">
                                    <div className="flex gap-2">
                                        {[0, 1, 2].map((i) => (
                                            <div 
                                                key={i} 
                                                className={`w-3 h-3 rounded-full border border-[#B8835A] transition-colors ${i < selectedIndices.length ? 'bg-[#B8835A]' : 'bg-transparent'}`} 
                                            />
                                        ))}
                                    </div>
                                    
                                    <button
                                        onClick={handleReveal}
                                        disabled={selectedIndices.length !== 3}
                                        className={`px-12 py-5 rounded-full font-bold uppercase tracking-[0.25em] text-xs transition-all flex items-center gap-3 ${
                                            selectedIndices.length === 3 
                                            ? 'bg-[#B8835A] text-[#2D2926] hover:scale-105 shadow-xl' 
                                            : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/10'
                                        }`}
                                    >
                                        <Sparkles className="w-4 h-4" />
                                        Revelar Mensajes
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleReset}
                                    className="px-10 py-4 border-2 border-[#B8835A] text-[#B8835A] hover:bg-[#B8835A] hover:text-[#2D2926] rounded-full font-bold uppercase tracking-[0.2em] text-[10px] transition-all flex items-center gap-3"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" />
                                    Reiniciar Oráculo
                                </button>
                            )}
                        </footer>
                    </div>
                )}
            </AnimatePresence>

            {/* Custom Styles for 3D */}
            <style jsx global>{`
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                }
            `}</style>
            
            {/* MESSAGE MODAL */}
            <AnimatePresence>
                {selectedMessage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
                    >
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeMessageModal}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md" 
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-[#F9F7F2] rounded-[3rem] p-10 md:p-16 text-[#2D2926] shadow-4xl overflow-hidden"
                        >
                            <div className="absolute top-8 right-8">
                                <button 
                                    onClick={closeMessageModal}
                                    className="w-10 h-10 rounded-full bg-[#B8835A]/10 flex items-center justify-center text-[#B8835A] hover:bg-[#B8835A] hover:text-white transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-8">
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <span className="text-[#B8835A] font-guide text-xs uppercase tracking-[0.4em] font-bold block">Mensaje Ancestral</span>
                                    <h3 className="text-3xl md:text-5xl font-editorial italic leading-tight text-[#8C4005]">
                                        {selectedMessage.title}
                                    </h3>
                                </div>

                                <div className="h-[1px] w-full bg-[#B8835A]/20" />

                                <p className="text-lg md:text-2xl font-editorial font-light leading-relaxed text-[#2D2926]/90 text-center italic">
                                    "{selectedMessage.message}"
                                </p>

                                <div className="pt-4 flex justify-center">
                                    <div className="w-12 h-12 bg-[#B8835A]/5 rounded-full flex items-center justify-center text-[#B8835A]">
                                        <Sparkles className="w-6 h-6 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
