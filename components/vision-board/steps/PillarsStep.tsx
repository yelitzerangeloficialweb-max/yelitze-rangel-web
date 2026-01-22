'use client';

import { useState } from 'react';
import { VisionData } from '../VisionBoardWizard';
import { Image as ImageIcon, ArrowLeft, ArrowRight } from 'lucide-react';

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
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
                <span className="text-[var(--color-secondary)] tracking-[0.2em] font-medium text-sm block mb-2">
                    PORTAL 5&6 · ARQUITECTURA
                </span>
                <h2 className="text-3xl font-heading text-[var(--color-primary)]">
                    {activePillar.title} ({currentPillarIndex + 1}/5)
                </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-[var(--color-text)] block mb-2">
                            Intención (¿Cómo quiero habitar esta área?)
                        </label>
                        <textarea
                            value={activePillar.intention}
                            onChange={(e) => updatePillar(currentPillarIndex, 'intention', e.target.value)}
                            className="w-full h-32 p-4 border rounded-xl focus:ring-2 focus:ring-[var(--color-secondary)] outline-none resize-none"
                            placeholder="Ej: Quiero sentir paz financiera..."
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[var(--color-text)] block mb-2">Dirección (Resultado Deseado)</label>
                        <input
                            type="text"
                            value={activePillar.direction}
                            onChange={(e) => updatePillar(currentPillarIndex, 'direction', e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[var(--color-text)] block mb-2">Acción Pequeña (Hábito)</label>
                        <input
                            type="text"
                            value={activePillar.action}
                            onChange={(e) => updatePillar(currentPillarIndex, 'action', e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
                        />
                    </div>
                </div>

                {/* Visual Section */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col min-h-[450px]">

                    {/* Tabs / Header - Simplified to just title since only upload exists */}
                    <div className="text-center mb-4">
                        <h4 className="font-heading text-lg text-[var(--color-primary)]">Tu Visualización</h4>
                        <p className="text-xs text-gray-500 max-w-xs mx-auto mb-2">
                            <strong>¡Importante!</strong> Sube de 1 a 3 imágenes que te inspiren. Sin imagen, este pilar quedará vacío.
                        </p>
                        <div className="bg-[#D4AF37]/10 p-2 rounded-lg inline-block">
                            <p className="text-[10px] text-[#4A3B32] font-medium italic">
                                💡 Idea: {
                                    currentPillarIndex === 0 ? "Tu oficina ideal, un escenario, tu libro publicado..." :
                                        currentPillarIndex === 1 ? "La casa de tus sueños, fajos de billetes, oro, el auto..." :
                                            currentPillarIndex === 2 ? "Cena romántica, familia riendo, anillo de compromiso..." :
                                                currentPillarIndex === 3 ? "Tú meditando, un diploma, un paisaje de paz..." :
                                                    "Comida saludable, cuerpo tonificado, un spa..."
                                }
                            </p>
                        </div>
                    </div>

                    <div className="flex-grow flex flex-col items-center justify-center p-4">
                        {/* Image Grid / Collage */}
                        <div className={`w-full grid gap-2 ${activePillar.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} mb-4`}>
                            {activePillar.images.map((img, idx) => (
                                <div key={idx} className={`relative group rounded-lg overflow-hidden border border-gray-200 shadow-sm ${activePillar.images.length === 3 && idx === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={img} alt={`Visualización ${idx + 1}`} className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Eliminar imagen"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Upload Button (Show if < 3 images) */}
                        {activePillar.images.length < 3 ? (
                            <div className="w-full">
                                <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[var(--color-secondary)]/30 rounded-xl cursor-pointer bg-[var(--color-secondary)]/5 hover:bg-[var(--color-secondary)]/10 transition-colors ${activePillar.images.length > 0 ? 'h-20' : 'h-48'}`}>
                                    <ImageIcon className={`text-[var(--color-secondary)] mb-2 ${activePillar.images.length > 0 ? 'w-6 h-6' : 'w-10 h-10'}`} />
                                    <span className="text-sm font-medium text-[var(--color-secondary)]">
                                        {activePillar.images.length === 0 ? 'Subir Primera Imagen' : 'Agregar otra imagen'}
                                    </span>
                                    <span className="text-xs text-gray-400 mt-1">({activePillar.images.length}/3)</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                </label>
                            </div>
                        ) : (
                            <div className="text-xs text-gray-500 italic bg-gray-50 px-3 py-1 rounded-full">
                                Máximo de imágenes alcanzado (3/3)
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-between mt-8 pt-6 border-t">
                <button onClick={() => {
                    if (currentPillarIndex > 0) setCurrentPillarIndex(c => c - 1);
                    else onBack();
                }} className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center gap-2 font-medium">
                    <ArrowLeft className="w-4 h-4" /> Anterior
                </button>

                <button
                    onClick={() => {
                        if (!isLastPillar) setCurrentPillarIndex(c => c + 1);
                        else onNext();
                    }}
                    className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-opacity-90"
                >
                    {isLastPillar ? 'Ver Vision Board Final' : 'Siguiente Pilar'}
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
