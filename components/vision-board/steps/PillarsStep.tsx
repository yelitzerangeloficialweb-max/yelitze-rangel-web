'use client';

import { useState } from 'react';
import { VisionData } from '../VisionBoardWizard';
import { Image as ImageIcon, ArrowLeft, ArrowRight, Cloud, Info, Lightbulb, Trash2, Plus, Zap } from 'lucide-react';
import Image from 'next/image';

interface Props {
    data: VisionData;
    updatePillar: (index: number, field: string, value: string) => void;
    updatePillarImages: (index: number, newImages: string[]) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function PillarsStep({ data, updatePillar, updatePillarImages, onNext, onBack }: Props) {
    const [currentPillarIndex, setCurrentPillarIndex] = useState(0);
    const activePillar = data.pillars[currentPillarIndex];

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (activePillar.images.length >= 3) {
                alert("Máximo 3 imágenes por pilar.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                updatePillarImages(currentPillarIndex, [...activePillar.images, base64]);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (imgIndex: number) => {
        const newImages = activePillar.images.filter((_, i) => i !== imgIndex);
        updatePillarImages(currentPillarIndex, newImages);
    };

    const isLastPillar = currentPillarIndex === data.pillars.length - 1;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 bg-[#F5EFE6] rounded-[3rem] min-h-[85vh] flex flex-col relative overflow-hidden">
            {/* Brand Graphic Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8C4005]/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-[#B8835A]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
                <Image
                    src="/assets/images/hilos-bg.png"
                    alt=""
                    fill
                    className="object-cover scale-110 rotate-12"
                />
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;600&display=swap');
                
                .font-editorial { font-family: 'Cormorant Garamond', serif; }
                .font-guide { font-family: 'Montserrat', sans-serif; }
            `}</style>

            {/* Header Section */}
            <div className="text-center mb-12 space-y-2">
                <span className="text-[#8C4005] tracking-[0.5em] font-bold text-[10px] uppercase block font-guide">
                    PORTAL 5 · ARQUITECTURA
                </span>
                <h2 className="text-5xl md:text-6xl font-editorial text-[#2D2926] leading-tight flex items-center justify-center gap-4">
                    TU DISEÑO 2026: <span className="opacity-60 italic">ANTIGRAVITY</span>
                </h2>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-start relative z-10">

                {/* Left Column: Form Section */}
                <div className="space-y-10">
                    <div className="space-y-2">
                        <label className="text-lg font-bold text-[#2D2926] font-guide block">
                            Elevando la Intención <span className="text-[#8C4005]/60 block text-xs font-normal italic">(¿Dónde quieres ligereza?)</span>
                        </label>
                        <textarea
                            value={activePillar.intention}
                            onChange={(e) => updatePillar(currentPillarIndex, 'intention', e.target.value)}
                            className="w-full h-32 p-6 bg-white border border-[#3C2A21]/10 rounded-[2rem] focus:ring-2 focus:ring-[#8C4005]/20 outline-none resize-none text-[#2D2926] font-editorial text-xl placeholder:text-[#3C2A21]/30 shadow-sm transition-all"
                            placeholder="Ej: Quiero sentir paz financiera y soltar la lucha..."
                        />
                        <p className="text-[#3C2A21]/60 font-guide text-[11px] leading-relaxed italic">
                            ¿Qué área de tu vida se siente pesada o estancada? Visualiza cómo sería soltar esa carga y flotar sobre ella.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-lg font-bold text-[#2D2926] font-guide block">
                            Redefiniendo el Resultado <span className="text-[#8C4005]/60 block text-xs font-normal italic">(¿Cómo se ve el éxito sin esfuerzo?)</span>
                        </label>
                        <input
                            type="text"
                            value={activePillar.direction}
                            onChange={(e) => updatePillar(currentPillarIndex, 'direction', e.target.value)}
                            className="w-full p-6 bg-white border border-[#3C2A21]/10 rounded-[1.5rem] focus:ring-2 focus:ring-[#8C4005]/20 outline-none text-[#2D2926] font-editorial text-xl shadow-sm transition-all"
                        />
                        <p className="text-[#3C2A21]/60 font-guide text-[11px] leading-relaxed italic">
                            Imagina tu meta alcanzada sin el estrés habitual. Describe el resultado como si fuera una consecuencia natural de tu bienestar.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-lg font-bold text-[#2D2926] font-guide block">
                            El Micropaso de Flotación <span className="text-[#8C4005]/60 block text-xs font-normal italic">(Hábito Anti-gravedad)</span>
                        </label>
                        <input
                            type="text"
                            value={activePillar.action}
                            onChange={(e) => updatePillar(currentPillarIndex, 'action', e.target.value)}
                            className="w-full p-6 bg-white border border-[#3C2A21]/10 rounded-[1.5rem] focus:ring-2 focus:ring-[#8C4005]/20 outline-none text-[#2D2926] font-editorial text-xl shadow-sm transition-all"
                        />
                        <p className="text-[#3C2A21]/60 font-guide text-[11px] leading-relaxed italic">
                            Define una acción tan pequeña que no requiera fuerza de voluntad. Ej: 'Respirar 2 minutos' o 'Agradecer un logro'.
                        </p>
                    </div>
                </div>

                {/* Right Column: Visual Section */}
                <div className="bg-white p-10 rounded-[3rem] shadow-[0_20px_60px_rgba(45,41,38,0.06)] border border-[#3C2A21]/10 flex flex-col min-h-[500px] relative overflow-hidden group">
                    {/* Floating Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#8C4005]/5 blur-3xl rounded-full" />

                    <div className="text-center mb-8 space-y-3">
                        <h4 className="font-editorial text-3xl text-[#2D2926]">Tu Espacio de Flotación</h4>
                        <p className="text-sm text-[#3C2A21]/70 font-guide max-w-xs mx-auto leading-relaxed">
                            ¡Guarda tu energía! Sube hasta <strong>3 imágenes</strong> o diseños que representen libertad, fluidez o expansión. <span className="italic block mt-1">No tienen que ser realistas.</span>
                        </p>
                    </div>

                    <div className="flex-grow flex flex-col items-center justify-center">
                        {/* Image Grid */}
                        {activePillar.images.length > 0 && (
                            <div className={`w-full grid gap-4 ${activePillar.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} mb-8`}>
                                {activePillar.images.map((img, idx) => (
                                    <div key={idx} className={`relative group rounded-[1.5rem] overflow-hidden border border-[#3C2A21]/5 shadow-md ${activePillar.images.length === 3 && idx === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
                                        <Image src={img} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <button
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[#2D2926] rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:text-red-500 shadow-lg"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Upload Trigger */}
                        {activePillar.images.length < 3 ? (
                            <label className={`w-full group cursor-pointer transition-all duration-500 ${activePillar.images.length > 0 ? 'h-32' : 'flex-grow h-48'}`}>
                                <div className="h-full border-2 border-dashed border-[#8C4005]/20 rounded-[2.5rem] bg-[#F9F7F2]/50 hover:bg-white hover:border-[#8C4005]/40 flex flex-col items-center justify-center gap-4 group-hover:shadow-inner transition-all">
                                    <div className="bg-[#8C4005]/10 p-4 rounded-full group-hover:scale-110 transition-transform duration-500">
                                        <Cloud className="w-8 h-8 text-[#8C4005]" />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-sm font-bold text-[#8C4005] font-guide block">
                                            Subir Espacio de Flotación
                                        </span>
                                        <span className="text-[10px] text-[#3C2A21]/40 font-bold uppercase tracking-widest mt-1 block">
                                            ({activePillar.images.length}/3)
                                        </span>
                                    </div>
                                </div>
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </label>
                        ) : (
                            <div className="text-xs text-[#8C4005] font-bold uppercase tracking-[0.2em] bg-[#F9F7F2] px-6 py-3 rounded-full border border-[#8C4005]/10 flex items-center gap-2">
                                <Zap className="w-3 h-3" /> Máximo alcanzado
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Section */}
            <div className="mt-auto pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <button
                    onClick={() => {
                        if (currentPillarIndex > 0) setCurrentPillarIndex(c => c - 1);
                        else onBack();
                    }}
                    className="px-10 py-5 rounded-full border-2 border-[#3C2A21]/10 text-[#3C2A21]/60 hover:text-[#2D2926] hover:border-[#3C2A21]/30 hover:bg-white transition-all flex items-center gap-2 font-guide text-sm font-bold uppercase tracking-widest"
                >
                    <ArrowLeft className="w-4 h-4" /> Anterior
                </button>

                <div className="flex gap-4">
                    {!isLastPillar && (
                        <button
                            onClick={() => setCurrentPillarIndex(c => c + 1)}
                            className="bg-[#2D2926]/5 text-[#2D2926] px-8 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white border border-[#2D2926]/10 transition-all"
                        >
                            Siguiente Pilar
                        </button>
                    )}
                    <button
                        onClick={() => {
                            if (!isLastPillar) setCurrentPillarIndex(c => c + 1);
                            else onNext();
                        }}
                        disabled={!activePillar.intention || activePillar.images.length === 0}
                        className="bg-[#8C4005] text-[#F9F7F2] px-14 py-6 rounded-2xl font-bold uppercase tracking-[0.25em] text-xs hover:scale-[1.02] shadow-[0_20px_40px_rgba(140,64,5,0.2)] disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-95 group flex items-center gap-4 font-guide"
                    >
                        {isLastPillar ? 'Confirmar mi Elevación' : 'Siguiente Pilar'}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
