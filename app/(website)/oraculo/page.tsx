'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, ArrowLeft, User, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import OracleCard from '@/components/oracle/OracleCard';

const MESSAGES = [
    { title: "La Madre", message: "La vida te llegó a través de ella, con sus luces y sus sombras. Honrarla es aceptar tu propia existencia." },
    { title: "La Abuela", message: "Las memorias de fuerza y resiliencia que ella guardó son hoy las raíces de tu propia fortaleza." },
    { title: "Lealtades", message: "Devuelvo con amor a mi linaje los dolores y destinos que no me pertenecen. Elijo mi propia vida." },
    { title: "El Vientre", message: "Tu útero es un centro sagrado de creación y soberanía. Limpia sus memorias para florecer." },
    { title: "Mujer Medicina", message: "La sanadora que buscas afuera habita en tu ADN. Activa la sabiduría de las mujeres de tu sangre." },
    { title: "El Perdón", message: "Perdonar no es justificar, es liberar tu corazón del peso de esperar un pasado diferente." },
    { title: "Fuerza Femenina", message: "Tu linaje femenino es una fuente de poder, no una limitación. Bebe de su sabiduría ancestral." },
    { title: "Memorias", message: "Lo que tus ancestras callaron por miedo, tú hoy puedes darle voz y sanarlo a través de tu verdad." },
    { title: "Renacer", message: "Cada ciclo que cierras con consciencia es el nacimiento de una nueva versión de ti misma, más libre." },
    { title: "El Legado", message: "Eres el sueño más audaz de tus ancestras hecho realidad. Camina con la dignidad de quien es amada." },
    { title: "Sacralidad", message: "Tu cuerpo es el templo vivo de todas las mujeres que te precedieron. Trátalo con reverencia y amor." },
    { title: "Unión Sagrada", message: "El hilo rojo que te une a ellas es de puro amor. Transforma el dolor heredado en sabiduría de vida." }
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
        if (step === 'RESULT') return;
        
        if (selectedIndices.includes(index)) {
            setSelectedIndices(selectedIndices.filter(i => i !== index));
        } else if (selectedIndices.length < 3) {
            setSelectedIndices([...selectedIndices, index]);
        }
    };

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
                            <h2 className="text-4xl md:text-5xl font-editorial leading-tight text-[#B8835A]">Inicia tu<br/><span className="italic text-white">Consulta Alquímica</span></h2>
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
                        <header className="relative z-10 text-center mb-12 space-y-4">
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

                        <div className="relative z-10 w-full max-w-7xl">
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-10 justify-items-center items-center py-8">
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
                                                className={`${step === 'RESULT' ? 'col-span-2 md:col-span-2 lg:col-span-2' : ''}`}
                                            >
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
                                            <p className="text-base font-editorial italic mb-6">
                                                Si quieres profundizar en este mensaje y tener el oráculo completo, puedes adquirirlo en formato PDF en mi tienda.
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
        </div>
    );
}
