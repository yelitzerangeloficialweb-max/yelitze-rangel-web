'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import OracleCard from '@/components/oracle/OracleCard';

const MESSAGES = [
    { title: "El Linaje", message: "La fuerza de tus ancestros te sostiene hoy. Honra su camino para liberar el tuyo." },
    { title: "Soberanía", message: "Tú eres la autoridad en tu vida. Recupera tu poder y camina con certeza." },
    { title: "Apertura", message: "Nuevas puertas se abren cuando dejas de empujar las que ya se cerraron." },
    { title: "Raíces", message: "Para volar alto, primero debes estar bien plantada en tu propia tierra." },
    { title: "El Flujo", message: "Suelta la resistencia. Permite que la vida te lleve hacia donde perteneces." },
    { title: "La Paz", message: "El silencio no es ausencia de ruido, es presencia de centro en medio del caos." },
    { title: "Amor Propio", message: "Tu primera y más sagrada relación es contigo misma. Sánala primero." },
    { title: "Abundancia", message: "El orden precede a la riqueza. Ordena tu sistema y el flujo llegará." },
    { title: "Claridad", message: "No busques respuestas afuera. La verdad emerge cuando logras quietud interna." },
    { title: "Coraje", message: "El miedo es solo un umbral. Atraviésalo con la confianza de tu alma." },
    { title: "La Gracia", message: "Recibe los dones de la vida con humildad. Todo lo que necesitas ya está aquí." },
    { title: "Unión", message: "No estás sola. Eres un hilo vital en el gran tejido de la existencia." }
];

export default function OraclePage() {
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [isRevealed, setIsRevealed] = useState(false);
    const [shuffledMessages, setShuffledMessages] = useState(MESSAGES);

    useEffect(() => {
        setShuffledMessages([...MESSAGES].sort(() => Math.random() - 0.5));
    }, []);

    const handleCardClick = (index: number) => {
        if (isRevealed) return;
        
        if (selectedIndices.includes(index)) {
            setSelectedIndices(selectedIndices.filter(i => i !== index));
        } else if (selectedIndices.length < 3) {
            setSelectedIndices([...selectedIndices, index]);
        }
    };

    const handleReveal = () => {
        if (selectedIndices.length === 3) {
            setIsRevealed(true);
        }
    };

    const handleReset = () => {
        setSelectedIndices([]);
        setIsRevealed(false);
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

            <header className="relative z-10 text-center mb-12 space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <span className="text-[#B8835A] font-guide text-xs md:text-sm uppercase tracking-[0.4em] font-bold block mb-2">
                        Conexión con el Alma
                    </span>
                    <h1 className="text-4xl md:text-6xl font-editorial leading-tight">
                        Oráculo de las <span className="italic text-[#B8835A]">Almas</span>
                    </h1>
                </motion.div>
                
                {!isRevealed ? (
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[#F5EFE6]/60 font-light text-sm md:text-lg max-w-lg mx-auto"
                    >
                        Respira profundo, conecta con tu centro y elige <strong className="text-[#B8835A]">3 cartas</strong> para recibir la guía que tu alma necesita hoy.
                    </motion.p>
                ) : (
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[#B8835A] font-editorial italic text-xl"
                    >
                        "Toda respuesta ya habita en tu interior."
                    </motion.p>
                )}
            </header>

            <div className="relative z-10 w-full max-w-7xl">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-10 justify-items-center items-center py-8">
                    <AnimatePresence>
                        {shuffledMessages.map((msg, idx) => {
                            const isSelected = selectedIndices.includes(idx);
                            const shouldShow = !isRevealed || isSelected;

                            if (!shouldShow) return null;

                            return (
                                <motion.div
                                    key={idx}
                                    layout
                                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                    transition={{ duration: 0.5 }}
                                    className={`${isRevealed ? 'col-span-2 md:col-span-2 lg:col-span-2' : ''}`}
                                >
                                    <OracleCard 
                                        index={idx}
                                        isSelected={isSelected}
                                        isRevealed={isRevealed}
                                        content={msg}
                                        onClick={() => handleCardClick(idx)}
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            <footer className="relative z-10 mt-16 flex flex-col items-center gap-8">
                {!isRevealed ? (
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
                            className={`px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all flex items-center gap-3 ${
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
                
                <p className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-bold">
                    Yelitze Rangel • Tu Coach Ancestral
                </p>
            </footer>

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
