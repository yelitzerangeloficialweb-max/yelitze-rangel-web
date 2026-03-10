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
    registrationData?: { name: string, email: string, gender: string }
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
            backgroundColor: '#F5EFE6'
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

        const fileName = `Arquitectura_Intencional_${registrationData?.name?.replace(/\s/g, '_') || 'Vida'}.pdf`;
        pdf.save(fileName);
    };

    const getCalendarUrl = () => {
        const title = encodeURIComponent("Clase en Vivo: Arquitectura Intencional de Vida con Yelitze Rangel");
        const details = encodeURIComponent("Recuerda tener tu PDF de Arquitectura impreso a la mano. El enlace de Zoom llegará a tu correo.");
        const dates = "20260115T230000Z/20260116T010000Z";
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dates}`;
    };

    if (isAnalyzing) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 text-center animate-pulse">
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/20" />
                    <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[#D4AF37]" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-3xl font-editorial text-[#2D2926]">Trazando tu Arquitectura...</h3>
                    <p className="text-[#8C4005]/70 font-editorial italic text-lg">Yelitze está dándole orden a tu visión 2026.</p>
                </div>
            </div>
        );
    }

    const firstName = registrationData?.name?.split(' ')[0] || 'Arquitecta';
    const isMale = registrationData?.gender === 'hombre';

    return (
        <div className="max-w-7xl mx-auto space-y-16 pb-20">
            {/* 1. Header & Quick Actions */}
            <div className="no-print space-y-8">
                <div className="bg-[#2D2926] text-[#F9F7F2] p-8 rounded-[2rem] border border-[#B8835A30] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#B8835A] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-16 h-16 bg-[#B8835A] text-[#2D2926] rounded-full flex items-center justify-center shadow-inner">
                            <Sparkles className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="font-editorial text-2xl md:text-3xl text-white">¡Diseño Finalizado, {firstName}!</h3>
                            <p className="text-[#B8835A] font-guide text-[10px] uppercase tracking-[0.3em] font-bold mt-1">Tu arquitectura de vida está lista para ser habitada</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 relative z-10">
                        <a href={getCalendarUrl()} target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-full border-2 border-[#B8835A] text-[#B8835A] hover:bg-[#B8835A] hover:text-white transition-all font-bold text-xs uppercase tracking-widest">
                            📅 Agendar Clase
                        </a>
                        <button onClick={handleDownloadPDF} className="px-8 py-3 rounded-full bg-[#B8835A] text-white hover:bg-[#8C4005] font-bold shadow-lg shadow-[#B8835A]/20 flex items-center gap-2 transition-all uppercase text-xs tracking-widest">
                            <Download className="w-4 h-4" /> Exportar Plano Maestro
                        </button>
                    </div>
                </div>

                {/* 2. CARTA DE YELITZE (Directly in UI) */}
                <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[3rem] shadow-xl border border-[#3C2A2105] relative space-y-8 font-editorial leading-relaxed">
                    <div className="absolute top-12 left-12 opacity-5">
                        <FileText className="w-32 h-32" />
                    </div>
                    <h4 className="text-[#8C4005] text-3xl italic mb-12 relative z-10">Hola, {firstName}.</h4>
                    <div className="space-y-6 text-[#2D2926] text-lg md:text-xl opacity-90 relative z-10">
                        <p>
                            Has dado el primer paso más valioso: detenerte a mirar. Lo que tienes en tus manos no es solo un documento, es el <strong>Plano Maestro de tu nueva realidad</strong>. En mi camino acompañando a cientos de personas, he aprendido que el desequilibrio en nuestra vida rara vez es falta de voluntad; la mayoría de las veces es falta de orden.
                        </p>
                        <p>
                            Este mapa que acabas de co-crear conmigo es tu brújula para el 2026. Es el primer paso de tu transformación sistémica porque, antes de construir los muros de tus sueños, necesitamos asegurar que los cimientos—tus lealtades, tus intenciones y tus hábitos—estén alineados con quien eres hoy, y no con quien otros esperaban que fueras.
                        </p>
                        <p>
                            El equilibrio que buscas nace de habitar tu propia soberanía. Este diseño te permitirá dejar de cargar pesos ajenos y empezar a moverte con la ligereza de quien sabe exactamente hacia dónde va y desde qué paz decide.
                        </p>
                        <p className="text-[#8C4005] font-bold italic border-l-4 border-[#B8835A] pl-8 my-12 text-2xl">
                            "Restaura el orden, y el equilibrio llegará por añadidura."
                        </p>
                        <div className="pt-12">
                            <p className="text-sm uppercase tracking-[0.3em] font-guide text-[#B8835A] font-bold">Con amor y certeza,</p>
                            <p className="text-2xl mt-2">YELITZE RANGEL</p>
                            <p className="text-[#B8835A] text-sm italic">Mentora de Vida y Diseño Intencional</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. THE VISUAL BOARD (Web Interactive Version) */}
            <div className="space-y-6 no-print">
                <div className="text-center">
                    <h3 className="text-3xl font-editorial text-[#2D2926]">Tu Diseño de Realidad 2026</h3>
                    <p className="text-[#B8835A] font-guide text-[10px] uppercase tracking-[0.2em] font-bold">Representación Visual de tus Pilares</p>
                </div>
                <div
                    id="vision-board-canvas"
                    className="bg-[#FDFBF7] p-8 md:p-16 relative overflow-hidden text-[#4A3B32] shadow-2xl mx-auto rounded-[3rem] border border-[#B8835A10]"
                    style={{ aspectRatio: '10/14', maxWidth: '800px' }}
                >
                    {/* Background Sacred Geometry */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                        <svg width="100%" height="100%">
                            <line x1="50%" y1="20%" x2="50%" y2="80%" stroke="#D4AF37" strokeWidth="1" />
                            <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#D4AF37" strokeWidth="1" />
                            <circle cx="50%" cy="50%" r="15%" fill="none" stroke="#D4AF37" strokeWidth="1" />
                        </svg>
                    </div>

                    <div className="relative z-10 w-full h-full flex flex-col items-center">
                        <div className="text-center mb-16">
                            <p className="text-[10px] uppercase tracking-[0.4em] text-[#8C4005] mb-2 font-guide font-bold">Proyecto de Vida</p>
                            <h1 className="text-3xl md:text-5xl font-editorial text-[#2D2926] uppercase tracking-wide">Arquitectura<br />Intencional</h1>
                        </div>

                        <div className="grid grid-cols-3 grid-rows-3 w-full gap-4 md:gap-8 items-center justify-items-center relative">
                            {/* Connections */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-30">
                                <circle cx="50%" cy="50%" r="22%" stroke="#B8835A" strokeWidth="0.5" strokeDasharray="4 4" fill="none" />
                                <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="#B8835A" strokeWidth="0.5" />
                                <line x1="50%" y1="50%" x2="10%" y2="50%" stroke="#B8835A" strokeWidth="0.5" />
                                <line x1="50%" y1="50%" x2="90%" y2="50%" stroke="#B8835A" strokeWidth="0.5" />
                            </svg>

                            <div className="col-start-2 row-start-1"><ArchitecturalCard pillar={data.pillars[0]} label="PROPOSITO" /></div>
                            <div className="col-start-1 row-start-2"><ArchitecturalCard pillar={data.pillars[1]} label="RECURSOS" small /></div>

                            <div className="col-start-2 row-start-2 w-full aspect-square bg-white rounded-full border-2 border-[#B8835A] flex flex-col items-center justify-center p-6 text-center shadow-xl ring-8 ring-[#FDFBF7]">
                                <span className="text-[8px] font-guide font-bold text-[#B8835A] uppercase tracking-widest mb-1">YO SOY</span>
                                <p className="text-xs italic font-editorial leading-tight text-[#2D2926]">
                                    "{data.analysis?.identity || (isMale ? 'El Arquitecto de mi propio orden' : 'La Arquitecta de mi propio orden')}"
                                </p>
                            </div>

                            <div className="col-start-3 row-start-2"><ArchitecturalCard pillar={data.pillars[2]} label="VINCULOS" small /></div>
                            <div className="col-start-1 row-start-3"><ArchitecturalCard pillar={data.pillars[3]} label="EXPANSIÓN" small /></div>
                            <div className="col-start-3 row-start-3"><ArchitecturalCard pillar={data.pillars[4]} label="VITALIDAD" small /></div>
                        </div>

                        <div className="mt-auto pt-16 text-center border-t border-[#B8835A20] w-full">
                            <p className="text-sm italic font-editorial text-[#2D2926] opacity-60">"No es magia, es orden."</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. PRINTABLE BLUEPRINT CONTAINER (Hidden from UI, visible on Export) */}
            <div ref={pdfContentRef} className="bg-[#F9F7F2] text-[#2D2926] overflow-hidden">

                {/* PDF PAGE 1: LA CARTA */}
                <div className="min-h-[1120px] p-24 relative flex flex-col page-break-after-always">
                    <div className="border-b-2 border-[#8C4005] pb-8 mb-16 flex justify-between items-end">
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase font-guide font-bold tracking-[0.4em] text-[#8C4005]">Proyecto de Vida</p>
                            <h2 className="text-2xl font-editorial uppercase tracking-widest">Plano Maestro 2026</h2>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-guide text-gray-400">PÁGINA 01/03</p>
                        </div>
                    </div>

                    <div className="max-w-2xl mx-auto space-y-10 font-editorial text-xl pt-12 leading-relaxed">
                        <h3 className="text-[#8C4005] text-4xl italic mb-16">Hola, {firstName}.</h3>
                        <p>Has dado el primer paso más valioso: detenerte a mirar. Lo que tienes en tus manos no es solo un documento, es el <strong>Plano Maestro de tu nueva realidad</strong>. En mi camino acompañando a cientos de personas, he aprendido que el desequilibrio en nuestra vida rara vez es falta de voluntad; la mayoría de las veces es falta de orden.</p>
                        <p>Este mapa que acabas de co-crear conmigo es tu brújula para el 2026. Es el primer paso de tu transformación sistémica porque, antes de construir los muros de tus sueños, necesitamos asegurar que los cimientos—tus lealtades, tus intenciones y tus habitos—estén alineados con quien eres hoy, y no con quien otros esperaban que fueras.</p>
                        <p>El equilibrio que buscas nace de habitar tu propia soberanía. Este diseño te permitirá dejar de cargar pesos ajenos y empezar a moverte con la ligereza de quien sabe exactamente hacia dónde va y desde qué paz decide.</p>
                        <p className="text-[#8C4005] font-bold text-center italic text-2xl py-12 px-8">"Restaura el orden, y el equilibrio llegará por añadidura."</p>
                        <div className="pt-20">
                            <p className="text-xs uppercase tracking-[0.4em] text-[#B8835A] font-guide font-bold mb-2">Con amor y certeza,</p>
                            <p className="text-3xl">YELITZE RANGEL</p>
                            <p className="text-[#B8835A] text-sm italic">Mentora de Vida y Diseño Intencional</p>
                        </div>
                    </div>
                </div>

                {/* PDF PAGE 2: EL PLANO (Architect Blueprint Aesthetic) */}
                <div className="min-h-[1120px] p-12 relative flex flex-col bg-[#0F172A] text-white page-break-after-always overflow-hidden">
                    {/* Technical Grid Overlay */}
                    <div className="absolute inset-0 opacity-[0.07]"
                        style={{ backgroundImage: 'linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(90deg, #38BDF8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    <div className="absolute inset-0 opacity-[0.03]"
                        style={{ backgroundImage: 'linear-gradient(#38BDF8 0.5px, transparent 0.5px), linear-gradient(90deg, #38BDF8 0.5px, transparent 0.5px)', backgroundSize: '8px 8px' }} />

                    {/* Blueprint Border & Rulers */}
                    <div className="absolute inset-8 border border-[#38BDF8]/40 pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full border-l border-r border-[#38BDF8]/20 mx-12 px-12 py-16">
                        {/* Header Technical Block */}
                        <div className="flex justify-between items-start border-b border-[#38BDF8]/40 pb-12 mb-16">
                            <div className="space-y-4">
                                <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-[#38BDF8]">TECHNICAL SPECIFICATION: LIFE ARCHITECTURE</h2>
                                <h1 className="text-4xl font-editorial text-white tracking-widest italic lowercase">el plano maestro</h1>
                            </div>
                            <div className="text-right font-mono text-[9px] text-[#38BDF8]/60 space-y-1">
                                <p>SCALE: 1:LIFE</p>
                                <p>REF: 2026-BOARD-{registrationData?.name?.substring(0, 3).toUpperCase()}</p>
                                <p>STATUS: VERIFIED</p>
                            </div>
                        </div>

                        {/* Central Blueprint Schema */}
                        <div className="flex-1 relative flex items-center justify-center">
                            {/* Blueprint Lines */}
                            <div className="absolute inset-0 flex items-center justify-center -z-10">
                                <svg width="100%" height="80%" className="opacity-40">
                                    <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#38BDF8" strokeWidth="0.5" strokeDasharray="10 5" />
                                    <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#38BDF8" strokeWidth="0.5" strokeDasharray="10 5" />
                                    <circle cx="50%" cy="50%" r="35%" stroke="#38BDF8" strokeWidth="1" fill="none" />
                                    <circle cx="50%" cy="50%" r="15%" stroke="#38BDF8" strokeWidth="0.5" strokeDasharray="2 2" fill="none" />
                                    {/* Diagonal guidelines */}
                                    <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="#38BDF8" strokeWidth="0.3" strokeDasharray="5 5" />
                                    <line x1="80%" y1="20%" x2="20%" y2="80%" stroke="#38BDF8" strokeWidth="0.3" strokeDasharray="5 5" />
                                </svg>
                            </div>

                            {/* Data Nodes */}
                            <div className="grid grid-cols-2 grid-rows-2 gap-x-32 gap-y-48 relative z-20">
                                {data.pillars.slice(1).map((p, i) => (
                                    <div key={i} className="bg-[#0F172A] border border-[#38BDF8]/60 p-6 rounded-sm w-48 shadow-[0_0_20px_rgba(56,189,248,0.15)] relative">
                                        <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-[#38BDF8]" />
                                        <span className="text-[8px] font-mono text-[#38BDF8] block mb-2">AXIS: 0{i + 2}</span>
                                        <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-2 border-b border-[#38BDF8]/20 pb-1">{p.title}</h4>
                                        <p className="text-[9px] text-[#38BDF8]/80 italic line-clamp-3">"{p.intention || 'INTENCION EN PROCESO'}"</p>
                                        <div className="mt-4 pt-2 border-t border-[#38BDF8]/10">
                                            <p className="text-[8px] font-mono text-white tracking-widest">ACT: {p.action || 'RECODER'}</p>
                                        </div>
                                    </div>
                                ))}

                                {/* Center Identity Core */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#0F172A] border-4 border-double border-[#38BDF8] rounded-full flex flex-col items-center justify-center p-8 text-center shadow-[0_0_40px_rgba(56,189,248,0.2)]">
                                    <span className="text-[9px] font-mono text-[#38BDF8] uppercase tracking-[0.3em] mb-3">core architecture</span>
                                    <h3 className="text-2xl font-editorial text-white mb-2">YO SOY</h3>
                                    <div className="w-12 h-[1px] bg-[#38BDF8]/40 mb-3" />
                                    <p className="text-[11px] font-mono text-[#38BDF8] italic leading-relaxed">
                                        "{data.analysis?.identity || (isMale ? 'EL ARQUITECTO DE MI PROPIO ORDEN' : 'LA ARQUITECTA DE MI PROPIO ORDEN')}"
                                    </p>
                                </div>

                                {/* Purpose Axis - Top Overlay */}
                                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-56 bg-[#0F172A] border-2 border-[#38BDF8] p-6 shadow-xl text-center">
                                    <span className="text-[8px] font-mono text-[#38BDF8] block mb-1">PRIMARY AXIS: 01</span>
                                    <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">PROPÓSITO</h4>
                                    <p className="text-[9px] text-[#38BDF8]/90 italic">"{data.pillars[0].intention || 'FUNDAMENTAL'}"</p>
                                </div>
                            </div>
                        </div>

                        {/* Analysis Footer Technical Info */}
                        <div className="mt-20 grid grid-cols-2 gap-8 border-t border-[#38BDF8]/40 pt-12">
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-widest">SOBERANÍA SISTÉMICA / LO QUE SUELTAS</h3>
                                <p className="text-sm font-editorial italic text-white/90 leading-relaxed border-l-2 border-[#38BDF8] pl-6">
                                    {data.analysis?.release || "DEPURANDO LEALTADES..."}
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-widest">PRÁCTICA MAESTRA / HÁBITO DE ORDEN</h3>
                                <p className="text-sm font-editorial italic text-white/90 leading-relaxed border-l-2 border-[#38BDF8] pl-6">
                                    {data.analysis?.practice || "ESTABLECIENDO RITMO..."}
                                </p>
                            </div>
                        </div>

                        {/* Technical Manifesto Footer */}
                        <div className="mt-16 text-center">
                            <p className="text-[9px] font-mono text-[#38BDF8]/60 uppercase tracking-[1em] mb-4">M A N I F E S T O</p>
                            <p className="text-lg font-editorial text-white italic max-w-2xl mx-auto leading-relaxed border border-[#38BDF8]/20 p-8 bg-white/5">
                                "{data.analysis?.manifesto || 'DISEÑANDO REALIDAD...'}"
                            </p>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="absolute bottom-8 left-0 right-0 text-center font-mono text-[8px] text-[#38BDF8]/40 uppercase tracking-[0.5em]">
                        Yelitze Rangel • Tracking de la Arquitectura Intencional de tu Vida • 2026
                    </div>
                </div>

                {/* PDF PAGE 3: BITÁCORA (Reflections & Steps) */}
                <div className="min-h-[1120px] p-24 bg-white space-y-16">
                    <div className="text-center space-y-4">
                        <span className="bg-[#8C4005] text-[#F9F7F2] px-6 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] font-guide">Bitácora de Construcción</span>
                        <h2 className="text-5xl font-editorial text-[#2D2926]">La Ruta de la {isMale ? 'Arquitecto' : 'Arquitecta'}</h2>
                    </div>

                    {/* Steps Section */}
                    <div className="grid grid-cols-1 gap-12 pt-12">
                        <div className="bg-[#FDFBF7] p-12 rounded-[2rem] border border-[#B8835A20] space-y-10">
                            <h3 className="text-2xl font-editorial text-[#8C4005] border-b border-[#B8835A30] pb-4">Pasos de Acción Inmediata</h3>
                            <div className="space-y-8">
                                {data.analysis?.guide_steps?.map((step: string, i: number) => (
                                    <div key={i} className="flex gap-8 items-start">
                                        <span className="w-10 h-10 rounded-full bg-[#B8835A]/10 text-[#8C4005] flex items-center justify-center font-editorial text-xl font-bold shrink-0">{i + 1}</span>
                                        <p className="text-[#2D2926] text-xl font-editorial leading-relaxed opacity-90 pt-1">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reflections Section */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-editorial text-[#2D2926] border-b border-[#B8835A10] pb-4">Reflexiones de los Portales</h3>
                            <div className="grid grid-cols-2 gap-8">
                                {Object.entries(data.reflections).map(([id, text], idx) => (
                                    <div key={idx} className="p-6 bg-[#FDFBF7] rounded-2xl border border-[#B8835A10]">
                                        <span className="text-[10px] uppercase font-bold text-[#B8835A] font-guide tracking-widest block mb-2">Portal {idx + 1}</span>
                                        <p className="text-sm italic font-editorial text-[#2D2926] opacity-70 leading-relaxed">"{text}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-24 text-center">
                        <p className="text-[10px] uppercase font-guide font-bold tracking-[0.4em] text-[#B8835A] opacity-40">Diseño Intencional 2026</p>
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
                        // Collage for 2-4 images
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
                <div className="w-8 h-[1px] bg-[var(--color-secondary)] mx-auto my-2"></div>
                <p className={`font-bold text-[var(--color-secondary)] uppercase ${small ? 'text-[7px]' : 'text-[8px]'}`}>{pillar.action}</p>
            </div>
        </div>
    );
}
