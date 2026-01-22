'use client';

import { useState, useRef } from 'react';
import { VisionData } from '../VisionBoardWizard';
import { ArrowLeft, Download, FileText, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function FinalBoardStep({
    data,
    onBack,
    isAnalyzing,
    registrationData
}: {
    data: VisionData,
    onBack: () => void,
    isAnalyzing?: boolean,
    registrationData?: { name: string, email: string }
}) {
    const pdfContentRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        const element = pdfContentRef.current;
        if (!element) return;

        // Ensure fonts
        await document.fonts.ready;

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#FDFBF7'
        });

        const imgData = canvas.toDataURL('image/jpeg', 1.0);

        // A4 Paper Size calculations (Portrait)
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Add first page
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        // Add extra pages if long
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        const fileName = `Arquitectura_Vida_${registrationData?.name?.replace(/\s/g, '_') || '2026'}.pdf`;
        pdf.save(fileName);
    };

    const getCalendarUrl = () => {
        const title = encodeURIComponent("Clase en Vivo: Arquitectura de Vida Intencional 2026 con Yelitzé Rangel");
        const details = encodeURIComponent("Recuerda tener tu PDF de Arquitectura impreso a la mano. El enlace de Zoom llegará a tu correo.");
        const dates = "20260115T230000Z/20260116T010000Z";
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dates}`;
    };

    if (isAnalyzing) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 text-center animate-pulse">
                <div className="w-20 h-20 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin" />
                <h3 className="text-2xl font-heading text-[var(--color-primary)]">Diseñando tu Arquitectura...</h3>
                <p className="text-gray-500 max-w-md">La IA está construyendo tu plan de acción y manifiesto 2026.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
            {/* Confirmation Header */}
            <div className="no-print">
                <div className="bg-[#2C3E50] text-[#FDFBF7] p-8 rounded-2xl border border-[#D4AF37] flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#D4AF37] text-[#2C3E50] rounded-full flex items-center justify-center font-bold text-xl">✓</div>
                        <div>
                            <h3 className="font-heading text-xl text-white">¡Arquitectura Lista, {registrationData?.name?.split(' ')[0]}!</h3>
                            <p className="text-sm text-gray-300">Hemos enviado detalles adicionales a <strong>{registrationData?.email}</strong></p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <a href={getCalendarUrl()} target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#2C3E50] transition-colors text-sm font-bold uppercase tracking-wider">
                            📅 Agendar Clase
                        </a>
                        <button onClick={handleDownloadPDF} className="px-6 py-2 rounded-full bg-white text-[#2C3E50] hover:bg-gray-100 font-bold shadow-lg flex items-center gap-2">
                            <Download className="w-4 h-4" /> Guardar PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. THE VISUAL BOARD (Architecture Layout) */}
            <div
                id="vision-board-canvas"
                className={`bg-[#FDFBF7] p-12 relative overflow-hidden text-[#4A3B32] shadow-2xl mx-auto transition-all duration-1000 ${!registrationData ? 'blur-sm select-none grayscale' : ''}`}
                style={{ aspectRatio: '10/14', maxWidth: '800px' }}
            >
                {/* Background Lines (Sacred Geometry) */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <svg width="100%" height="100%">
                        <line x1="50%" y1="20%" x2="50%" y2="80%" stroke="#D4AF37" strokeWidth="1" />
                        <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#D4AF37" strokeWidth="1" />
                        <circle cx="50%" cy="50%" r="15%" fill="none" stroke="#D4AF37" strokeWidth="1" />
                    </svg>
                </div>

                {/* Header */}
                <div className="text-center mb-12 relative z-10">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-2">Proyecto de Vida</p>
                    <h1 className="text-3xl md:text-4xl font-heading text-[var(--color-primary)] uppercase tracking-wide">ARQUITECTURA DE VIDA<br />INTENCIONAL 2026</h1>
                </div>

                {/* VISUAL DIAGRAM */}
                {/* VISUAL DIAGRAM - GRID LAYOUT */}
                {/* VISUAL DIAGRAM - SACRED GEOMETRY LAYOUT */}
                <div className="relative z-10 w-full max-w-4xl mx-auto md:aspect-[4/5] p-2 md:p-8 text-[#4A3B32]">

                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,rgba(255,255,255,0)_70%)] pointer-events-none" />

                    <div className="grid grid-cols-3 grid-rows-[auto_1fr_auto] md:grid-rows-3 h-full items-center justify-items-center gap-3 md:gap-6 relative min-h-[600px] md:min-h-0">

                        {/* Connecting Lines (Background of Grid) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-visible opacity-40">
                            {/* Center to Top */}
                            <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="#D4AF37" strokeWidth="0.5" />
                            <circle cx="50%" cy="15%" r="2" fill="#D4AF37" />

                            {/* Center to Left */}
                            <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="#D4AF37" strokeWidth="0.5" />
                            <circle cx="15%" cy="50%" r="2" fill="#D4AF37" />

                            {/* Center to Right */}
                            <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="#D4AF37" strokeWidth="0.5" />
                            <circle cx="85%" cy="50%" r="2" fill="#D4AF37" />

                            {/* Center to Bottom Left */}
                            <line x1="50%" y1="50%" x2="20%" y2="85%" stroke="#D4AF37" strokeWidth="0.5" />
                            <circle cx="20%" cy="85%" r="2" fill="#D4AF37" />

                            {/* Center to Bottom Right */}
                            <line x1="50%" y1="50%" x2="80%" y2="85%" stroke="#D4AF37" strokeWidth="0.5" />
                            <circle cx="80%" cy="85%" r="2" fill="#D4AF37" />

                            {/* Central Circle Halo */}
                            <circle cx="50%" cy="50%" r="20%" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2 2" fill="none" className="opacity-50" />
                        </svg>

                        {/* 1. TOP: Purpose - Centered & Prominent */}
                        <div className="col-start-2 row-start-1 w-full max-w-[200px] z-20 transform hover:scale-105 transition-transform duration-500">
                            <ArchitecturalCard pillar={data.pillars[0]} label="01. PROPÓSITO" />
                        </div>

                        {/* 2. SIDES: Abundance & Relations */}
                        <div className="col-start-1 row-start-2 w-full max-w-[160px] transform hover:scale-105 transition-transform duration-500">
                            <ArchitecturalCard pillar={data.pillars[1]} label="02. RECURSOS" small />
                        </div>

                        {/* 3. CENTER: Identity - The Core */}
                        <div className="col-start-2 row-start-2 w-full max-w-[240px] z-30 text-center bg-white/80 backdrop-blur-sm p-4 md:p-8 rounded-full border border-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.15)] flex flex-col items-center justify-center aspect-square ring-4 ring-white/50">
                            <div className="space-y-2">
                                <span className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">Energía Central</span>
                                <h3 className="font-heading text-2xl md:text-3xl text-[var(--color-primary)] leading-none">YO SOY</h3>
                                <div className="w-12 h-[1px] bg-gray-200 mx-auto" />
                                <p className="text-xs italic text-gray-600 font-serif leading-relaxed px-2 line-clamp-3">
                                    "{data.analysis?.identity || 'La Arquitecta de mi Destino'}"
                                </p>
                            </div>
                        </div>

                        <div className="col-start-3 row-start-2 w-full max-w-[160px] transform hover:scale-105 transition-transform duration-500">
                            <ArchitecturalCard pillar={data.pillars[2]} label="03. VÍNCULOS" small />
                        </div>

                        {/* 4. BOTTOM: Growth & Wellness */}
                        <div className="col-start-1 row-start-3 w-full max-w-[160px] self-start mt-4 transform hover:scale-105 transition-transform duration-500">
                            <ArchitecturalCard pillar={data.pillars[3]} label="04. EXPANSIÓN" small />
                        </div>
                        <div className="col-start-3 row-start-3 w-full max-w-[160px] self-start mt-4 transform hover:scale-105 transition-transform duration-500">
                            <ArchitecturalCard pillar={data.pillars[4]} label="05. TEMPLO" small />
                        </div>
                    </div>
                </div>

                {/* 3. FOOTER: AI SOUL ANALYSIS */}
                <div className="mt-16 border-t-2 border-[#D4AF37] pt-8 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FDFBF7] px-4 text-[#D4AF37] font-serif italic text-lg bg-opacity-100">
                        Diagnóstico de Alma
                    </div>

                    {data.analysis ? (
                        <div className="grid grid-cols-3 gap-8 text-center">
                            <div>
                                <h4 className="font-bold text-[var(--color-primary)] text-xs uppercase tracking-widest mb-2">Debes Soltar</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">{data.analysis.release}</p>
                            </div>
                            <div className="border-l border-r border-[#D4AF37]/20 px-4">
                                <h4 className="font-bold text-[var(--color-primary)] text-xs uppercase tracking-widest mb-2">Tu Nueva Identidad</h4>
                                <p className="text-sm text-gray-600 leading-relaxed font-medium">{data.analysis.identity}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-[var(--color-primary)] text-xs uppercase tracking-widest mb-2">Práctica Maestra</h4>
                                <p className="text-sm text-gray-600 leading-relaxed italic">"{data.analysis.practice}"</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-sm text-gray-400 italic">Generando diagnóstico espiritual...</div>
                    )}

                    <div className="text-center mt-12 opacity-50">
                        <p className="text-[9px] uppercase tracking-[0.3em]">Yelitzé Rangel · Método Ancestral 2026</p>
                    </div>
                </div>
            </div>

            {/* 3. PDF GENERATION CONTAINER (Visible for review, captured for PDF) */}
            <div ref={pdfContentRef} className="bg-white p-8 md:p-16 max-w-[900px] mx-auto shadow-2xl space-y-12 text-[#2C3E50]">
                {/* PAGE 1: VISION BOARD */}
                <div className="space-y-8 page-break-after-always">
                    <div className="flex justify-between items-start border-b-2 border-[#D4AF37] pb-4">
                        <div className="text-left">
                            <p className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-1">Arquitectura de Vida Intencional 2026</p>
                            <h1 className="text-3xl font-heading text-[#2C3E50]">MI PLANO MAESTRO</h1>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-[#2C3E50]">{registrationData?.name}</p>
                            <p className="text-xs text-gray-500">{registrationData?.email}</p>
                        </div>
                    </div>

                    {/* The Visual Board Art */}
                    <div className="relative aspect-[4/5] w-full border-8 border-double border-[#D4AF37]/30 p-8">
                        {/* Background Lines */}
                        <div className="absolute inset-0 pointer-events-none opacity-10">
                            <svg width="100%" height="100%">
                                <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#D4AF37" strokeWidth="1" />
                                <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#D4AF37" strokeWidth="1" />
                                <circle cx="50%" cy="50%" r="30%" fill="none" stroke="#D4AF37" strokeWidth="1" />
                            </svg>
                        </div>

                        {/* Pillars Grid */}
                        <div className="grid grid-cols-2 gap-4 h-full relative z-10">
                            <ArchitecturalCard pillar={data.pillars[1]} label="02. RECURSOS" small />
                            <ArchitecturalCard pillar={data.pillars[2]} label="03. VÍNCULOS" small />
                            <ArchitecturalCard pillar={data.pillars[3]} label="04. EXPANSIÓN" small />
                            <ArchitecturalCard pillar={data.pillars[4]} label="05. TEMPLO" small />

                            {/* Center Identity */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-full shadow-2xl border-2 border-[#D4AF37] w-48 h-48 flex flex-col items-center justify-center text-center">
                                <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Identidad Central</span>
                                <h3 className="font-heading text-xl text-[#2C3E50] leading-none mb-2">YO SOY</h3>
                                <p className="text-[10px] italic text-gray-600 font-serif leading-tight">
                                    {data.analysis?.identity || "La Arquitecta de mi Destino"}
                                </p>
                            </div>

                            {/* Purpose at Top Overlay */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-40">
                                <ArchitecturalCard pillar={data.pillars[0]} label="01. PROPÓSITO" small />
                            </div>
                        </div>
                    </div>

                    {/* Footer P1 */}
                    <div className="text-center pt-8">
                        <p className="text-sm italic font-serif text-gray-500">
                            "{data.analysis?.manifesto || 'Este es el diseño de mi nueva realidad.'}"
                        </p>
                    </div>
                </div>

                {/* PAGE 2: DIAGNOSIS & REFLECTIONS */}
                <div className="space-y-12 pt-12 border-t-4 border-[#D4AF37]">
                    <div className="text-center space-y-4">
                        <span className="bg-[#D4AF37] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Diagnóstico & Estrategia</span>
                        <h2 className="text-4xl font-heading text-[#2C3E50]">La Ruta de la Arquitecta</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-12">
                        {/* Diagnosis */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-heading border-b border-[#D4AF37] pb-2 text-[#D4AF37]">Diagnóstico de Alma</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-1">Lo que sueltas</h4>
                                    <p className="text-gray-700 italic border-l-4 border-[#D4AF37]/30 pl-4">{data.analysis?.release}</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-1">Tu Práctica Maestra</h4>
                                    <p className="text-gray-700 border-l-4 border-[#D4AF37]/30 pl-4">{data.analysis?.practice}</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Plan */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-heading border-b border-[#D4AF37] pb-2 text-[#D4AF37]">Pasos de Organización</h3>
                            <ul className="space-y-4">
                                {data.analysis?.guide_steps?.map((step: string, i: number) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <span className="text-[#D4AF37] font-bold font-heading text-lg leading-none">{i + 1}.</span>
                                        <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                                    </li>
                                )) || (
                                        <p className="text-gray-400 italic">Generando pasos...</p>
                                    )}
                            </ul>
                        </div>
                    </div>

                    {/* NEW SECTION: Tus Reflexiones (The "Answers") */}
                    <div className="bg-gray-50 p-8 rounded-2xl space-y-6">
                        <h3 className="text-xl font-heading text-[#2C3E50] border-b border-gray-200 pb-2">Bitácora de Reflexión</h3>
                        <div className="space-y-4">
                            {Object.entries(data.reflections).map(([id, text], idx) => (
                                <div key={idx} className="space-y-1">
                                    <h4 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">
                                        Portal {id.replace('portal', '')}: {
                                            id === 'portal1' ? 'Cierre Consciente' :
                                                id === 'portal2' ? 'Foco y Dispersión' :
                                                    id === 'portal3' ? 'Poder Personal' : 'Estructura'
                                        }
                                    </h4>
                                    <p className="text-sm text-gray-600 italic">"{text}"</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AIDA CTA */}
                    <div className="bg-[#2C3E50] text-white p-8 rounded-2xl relative overflow-hidden text-center space-y-6">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <h3 className="text-2xl font-heading">¿Lista para Construir?</h3>
                        <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto text-sm">
                            {data.analysis?.cta_message || "Tu diseño es poderoso, pero la construcción requiere acompañamiento. No dejes que este plano se quede en papel."}
                        </p>
                        <div className="pt-4">
                            <p className="inline-block border border-[#D4AF37] text-[#D4AF37] px-8 py-2 rounded-full font-bold text-xs uppercase tracking-widest">
                                PROGRAMA DE ACOMPAÑAMIENTO 2026
                            </p>
                        </div>
                        <p className="text-[9px] text-gray-500 pt-4 uppercase tracking-[0.3em]">Yelitzé Rangel · Arquitectura de Vida 2026</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ArchitecturalCard({ pillar, label, small }: { pillar: any, label: string, small?: boolean }) {
    if (!pillar) return null;

    const hasImages = pillar.images && pillar.images.length > 0;

    return (
        <div className="bg-white p-2 pb-6 shadow-sm border border-gray-100 relative group overflow-hidden h-full flex flex-col">
            <div className={`absolute top-2 left-2 bg-white/90 backdrop-blur text-[#2C3E50] px-2 py-0.5 text-[8px] uppercase tracking-widest font-bold z-10 border border-gray-200 ${small ? 'text-[6px]' : ''}`}>
                {label}
            </div>

            <div className={`w-full ${small ? 'aspect-square' : 'aspect-[3/4]'} bg-gray-50 mb-2 overflow-hidden relative`}>
                {hasImages ? (
                    pillar.images.length === 1 ? (
                        // Single Image
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={pillar.images[0]} alt="" className="w-full h-full object-cover opacity-90 contrast-110" />
                    ) : (
                        // Collage for 2-3 images
                        <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-0.5">
                            {pillar.images.map((img: string, i: number) => (
                                <div key={i} className={`relative overflow-hidden ${pillar.images.length === 3 && i === 0 ? 'col-span-2 row-span-1' : 'col-span-1 row-span-1'} ${pillar.images.length === 2 ? 'row-span-2' : ''}`}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={img} alt="" className="w-full h-full object-cover opacity-90 contrast-110" />
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50 text-[10px]">VACÍO</div>
                )}
            </div>

            <div className="text-center px-1 mt-auto">
                <p className={`font-heading text-[#2C3E50] leading-tight mb-1 ${small ? 'text-[10px]' : 'text-xs'}`}>
                    {pillar.intention ? pillar.intention.substring(0, small ? 25 : 40) + (pillar.intention.length > (small ? 25 : 40) ? '...' : '') : ''}
                </p>
                <div className="w-8 h-[1px] bg-[#D4AF37] mx-auto my-2"></div>
                <p className={`font-bold text-[#D4AF37] uppercase ${small ? 'text-[7px]' : 'text-[8px]'}`}>{pillar.action}</p>
            </div>
        </div>
    );
}
