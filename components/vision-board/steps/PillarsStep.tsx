'use client';

import { useState } from 'react';
import { VisionData } from '../VisionBoardWizard';
import { Image as ImageIcon, ArrowLeft, ArrowRight, Cloud, Info, Lightbulb, Trash2, Plus, Zap, Sparkles, Loader2 } from 'lucide-react';
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
    const [isGeneratingAI, setIsGeneratingAI] = useState(false);
    const activePillar = data.pillars[currentPillarIndex];

    const PILLAR_CONTENT = [
        {
            label1: "Enraizando mi Sentido",
            help1: "¿Qué actividad o rol hoy se siente desconectado de tu alma? ¿Cómo sería vivir tu misión con gozo y no como una carga?",
            placeholder1: "Ej: Deseo que mi trabajo sea un canal de servicio ligero y no una lucha de supervivencia...",
            label2: "Mi Misión en Orden",
            help2: "¿Cómo se vería tu día a día si cada acción estuviera alineada a tu gran 'Para Qué'? Describe el éxito con propósito.",
            placeholder2: "Ej: Veo mi agenda fluida, impactando vidas mientras respeto mi tiempo de descanso...",
            helpAction: "Define una acción tan pequeña que no requiera esfuerzo: Ej. 'Escribir mi intención del día en un post-it'.",
            placeholderAction: "Ej: Escribir 1 intención diaria..."
        },
        {
            label1: "Sanando mi Relación con el Recibir",
            help1: "¿Dónde estás operando desde la escasez o el miedo? ¿Qué pesos ancestrales cargas sobre el dinero y los recursos?",
            placeholder1: "Ej: Suelto la lealtad a la pobreza de mis ancestros y me abro a la abundancia sin culpa...",
            label2: "Flujo de Abundancia",
            help2: "Visualiza tu flujo financiero como un río que nutre tu vida sin esfuerzo. ¿Qué libertad te permite ese fluir?",
            placeholder2: "Ej: Genero recursos con alegría, permitiéndome viajar y sostener mi bienestar con holgura...",
            helpAction: "Una pequeña acción de gratitud financiera: Ej. 'Agradecer por un ingreso al verlo en mi cuenta'.",
            placeholderAction: "Ej: Agradecer cada flujo de dinero..."
        },
        {
            label1: "Ordenando mis Relaciones",
            help1: "¿Qué vínculos se sienten desequilibrados? ¿A quién estás intentando 'salvar' o cargar que no te corresponde?",
            placeholder1: "Ej: Regreso a cada quien su carga y tomo solo lo que me pertenece en mis relaciones...",
            label2: "Vínculos en Sintonía",
            help2: "¿Cómo se siente estar en relaciones donde hay orden y cada quien ocupa su lugar? Describe la paz del encuentro.",
            placeholder2: "Ej: Mis relaciones son honestas, nutritivas y basadas en el respeto mutuo de nuestros destinos...",
            helpAction: "Un gesto de equilibrio: Ej. 'Mandar un mensaje de aprecio a alguien sin esperar respuesta'.",
            placeholderAction: "Ej: Expresar aprecio genuino..."
        },
        {
            label1: "Abriéndome a lo Nuevo",
            help1: "¿En qué área te has quedado pequeña por miedo? ¿Qué fronteras (físicas o mentales) necesitas cruzar este 2026?",
            placeholder1: "Ej: Me doy permiso de brillar en mi máximo potencial sin miedo a ser vista o juzgada...",
            label2: "Mi Máxima Expansión",
            help2: "Vete expandiéndote, ocupando todo tu espacio. ¿Qué nuevas experiencias están esperando tu 'Sí' definitivo?",
            placeholder2: "Ej: Conquisto nuevos mercados/países y mi mensaje llega a miles con claridad y fuerza...",
            helpAction: "Un paso hacia lo desconocido: Ej. 'Leer 5 páginas de un libro que me inspire a crecer'.",
            placeholderAction: "Ej: Leer 5 páginas inspiradoras..."
        },
        {
            label1: "Habitando mi Templo",
            help1: "¿Qué señales de tu cuerpo has ignorado? ¿Dónde el cansancio es una señal de falta de orden en tu energía vital?",
            placeholder1: "Ej: Elijo escuchar a mi cuerpo y darle el descanso sagrado que requiere para sanar...",
            label2: "Energía Vital Radiante",
            help2: "Imagínate con una salud vibrante, donde tu cuerpo es el aliado de tus sueños. ¿Qué hábitos de amor te sostienen?",
            placeholder2: "Ej: Despierto cada mañana con vitalidad, nutriendo mi templo con alimentos vivos y movimiento...",
            helpAction: "Un ritual de presencia física: Ej. 'Beber un vaso de agua al despertar antes de ver el celular'.",
            placeholderAction: "Ej: Beber agua en presencia..."
        }
    ];

    const content = PILLAR_CONTENT[currentPillarIndex];

    const handleGenerateAIImage = async () => {
        if (activePillar.images.length < 3) return;

        setIsGeneratingAI(true);
        try {
            const res = await fetch('/api/ai/generate-pillar-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pillarTitle: activePillar.title,
                    intention: activePillar.intention,
                    images: activePillar.images
                })
            });
            const data = await res.json();
            if (data.imageUrl) {
                updatePillarImages(currentPillarIndex, [...activePillar.images, data.imageUrl]);
            } else if (data.error) {
                console.error("AI Generation server error:", data.error, data.details);
                alert(`Error: ${data.details || data.error}`);
            }
        } catch (error) {
            console.error("AI Generation failed:", error);
            alert("Error de conexión al generar imagen. Intenta de nuevo.");
        } finally {
            setIsGeneratingAI(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (activePillar.images.length >= 4) {
                alert("Máximo 4 imágenes por pilar.");
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
        <div className="max-w-6xl mx-auto px-4 py-8 bg-[#F5EFE6] rounded-[3rem] min-h-[85vh] flex flex-col relative">
            {/* Brand Graphic Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8C4005]/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-[#B8835A]/5 blur-[120px] rounded-full pointer-events-none" />

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;600&display=swap');
                
                .font-editorial { font-family: 'Cormorant Garamond', serif; }
                .font-guide { font-family: 'Montserrat', sans-serif; }
            `}</style>

            {/* Header Section */}
            <div className="text-center mb-12 space-y-2">
                <span className="text-[#8C4005] tracking-[0.5em] font-bold text-[10px] uppercase block font-guide">
                    PORTAL 5 · ARQUITECTURA · PILAR {currentPillarIndex + 1}/{data.pillars.length}
                </span>
                <h2 className="text-5xl md:text-6xl font-editorial text-[#2D2926] leading-tight">
                    TU DISEÑO 2026
                </h2>
                <p className="text-[#8C4005] italic text-xl md:text-2xl font-editorial tracking-wide opacity-90">
                    {activePillar.title}
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-start relative z-10">

                {/* Left Column: Form Section */}
                <div className="space-y-10 relative z-20">
                    <div className="space-y-2">
                        <label className="text-lg font-bold text-[#2D2926] font-guide block">
                            {content.label1} <span className="text-[#8C4005]/60 block text-xs font-normal italic">(Elevando la Intención)</span>
                        </label>
                        <textarea
                            value={activePillar.intention}
                            onChange={(e) => updatePillar(currentPillarIndex, 'intention', e.target.value)}
                            className="w-full h-32 p-6 bg-white border border-[#3C2A21]/10 rounded-[2rem] focus:ring-2 focus:ring-[#8C4005]/20 outline-none resize-none text-[#2D2926] font-editorial text-xl placeholder:text-[#3C2A21]/30 shadow-sm transition-all"
                            placeholder={content.placeholder1}
                        />
                        <p className="text-[#3C2A21]/60 font-guide text-[11px] leading-relaxed italic">
                            {content.help1}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-lg font-bold text-[#2D2926] font-guide block">
                            {content.label2} <span className="text-[#8C4005]/60 block text-xs font-normal italic">(Redefiniendo el Resultado)</span>
                        </label>
                        <textarea
                            value={activePillar.direction}
                            onChange={(e) => updatePillar(currentPillarIndex, 'direction', e.target.value)}
                            className="w-full h-32 p-6 bg-white border border-[#3C2A21]/10 rounded-[2rem] focus:ring-2 focus:ring-[#8C4005]/20 outline-none resize-none text-[#2D2926] font-editorial text-xl placeholder:text-[#3C2A21]/30 shadow-sm transition-all"
                            placeholder={content.placeholder2}
                        />
                        <p className="text-[#3C2A21]/60 font-guide text-[11px] leading-relaxed italic">
                            {content.help2}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-lg font-bold text-[#2D2926] font-guide block">
                            Cimiento de Acción Diaria <span className="text-[#8C4005]/60 block text-xs font-normal italic">(Hábito Anti-gravedad)</span>
                        </label>
                        <input
                            type="text"
                            value={activePillar.action}
                            onChange={(e) => updatePillar(currentPillarIndex, 'action', e.target.value)}
                            className="w-full p-6 bg-white border border-[#3C2A21]/10 rounded-[1.5rem] focus:ring-2 focus:ring-[#8C4005]/20 outline-none text-[#2D2926] font-editorial text-xl shadow-sm transition-all"
                            placeholder={content.placeholderAction}
                        />
                        <p className="text-[#3C2A21]/60 font-guide text-[11px] leading-relaxed italic">
                            {content.helpAction}
                        </p>
                    </div>
                </div>

                {/* Right Column: Visual Section */}
                <div className="bg-white p-10 rounded-[3rem] shadow-[0_20px_60px_rgba(45,41,38,0.06)] border border-[#3C2A21]/10 flex flex-col min-h-[500px] relative z-20 overflow-hidden group">
                    {/* Floating Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#8C4005]/5 blur-3xl rounded-full" />

                    <div className="text-center mb-8 space-y-3">
                        <h4 className="font-editorial text-3xl text-[#2D2926]">Mesa de Diseño Maestro</h4>
                        <p className="text-sm text-[#3C2A21]/70 font-guide max-w-xs mx-auto leading-relaxed">
                            ¡Guarda tu energía! Sube hasta <strong>3 imágenes</strong> o diseños que representen tu nueva estructura, fluidez o expansión para que la arquitectura se complete. <span className="italic block mt-1">No tienen que ser realistas.</span>
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

                        {/* AI Button - Visible when 3 images are present */}
                        {activePillar.images.length === 3 && (
                            <button
                                onClick={handleGenerateAIImage}
                                disabled={isGeneratingAI}
                                className="w-full mb-4 bg-black text-[#F9F7F2] py-4 rounded-[1.5rem] font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#8C4005] transition-all disabled:opacity-50"
                            >
                                {isGeneratingAI ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Componiendo Visión...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4 text-[#B8835A]" />
                                        Completar pilar
                                    </>
                                )}
                            </button>
                        )}

                        {/* Upload Trigger */}
                        {activePillar.images.length < 4 ? (
                            <label className={`w-full group cursor-pointer transition-all duration-500 ${activePillar.images.length > 0 ? 'h-32' : 'flex-grow h-48'}`}>
                                <div className="h-full border-2 border-dashed border-[#8C4005]/20 rounded-[2.5rem] bg-[#F9F7F2]/50 hover:bg-white hover:border-[#8C4005]/40 flex flex-col items-center justify-center gap-4 group-hover:shadow-inner transition-all">
                                    <div className="bg-[#8C4005]/10 p-4 rounded-full group-hover:scale-110 transition-transform duration-500">
                                        <Cloud className="w-8 h-8 text-[#8C4005]" />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-sm font-bold text-[#8C4005] font-guide block">
                                            Cargar Referencias de Diseño
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
            <div className="mt-auto pt-10 flex flex-col md:flex-row justify-between items-center gap-8 relative z-20">
                <button
                    onClick={() => {
                        if (currentPillarIndex > 0) setCurrentPillarIndex(c => c - 1);
                        else onBack();
                    }}
                    className="px-10 py-5 rounded-full border-2 border-[#3C2A21]/10 text-[#3C2A21]/60 hover:text-[#2D2926] hover:border-[#3C2A21]/30 hover:bg-white transition-all flex items-center gap-2 font-guide text-sm font-bold uppercase tracking-widest"
                >
                    <ArrowLeft className="w-4 h-4" /> Anterior
                </button>

                <div className="flex flex-col items-end gap-2">
                    <button
                        onClick={() => {
                            if (!activePillar.intention.trim()) {
                                alert("Por favor, escribe tu intención para poder avanzar.");
                                return;
                            }
                            if (!isLastPillar) setCurrentPillarIndex(c => c + 1);
                            else onNext();
                        }}
                        className={`bg-[#8C4005] text-[#F9F7F2] px-14 py-6 rounded-2xl font-bold uppercase tracking-[0.25em] text-xs hover:scale-[1.02] shadow-[0_20px_40px_rgba(140,64,5,0.2)] transition-all active:scale-95 group flex items-center gap-4 font-guide ${!activePillar.intention.trim() ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                        {isLastPillar ? 'Confirmar mi Elevación' : 'Siguiente Pilar'}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    {!activePillar.intention.trim() && (
                        <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest animate-pulse">
                            * Escribe tu intención para continuar
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
