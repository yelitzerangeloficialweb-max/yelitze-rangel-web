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

        // Ensure fonts and images are ready
        await document.fonts.ready;
        
        // Wait for all images to BE LOADED before capturing
        const images = Array.from(element.getElementsByTagName('img'));
        await Promise.all(images.map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
            });
        }));

        const canvas = await html2canvas(element, {
            scale: 3, // Increased scale for professional printing
            useCORS: true,
            allowTaint: true,
            logging: false,
            backgroundColor: '#F9F7F2',
            imageTimeout: 15000,
            onclone: (doc) => {
                // Ensure visibility of the printable container during capture
                const printable = doc.querySelector('[data-pdf-content]');
                if (printable) {
                    (printable as HTMLElement).style.display = 'block';
                    (printable as HTMLElement).style.position = 'relative';
                }
            }
        });

        const imgData = canvas.toDataURL('image/jpeg', 1.0);

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Standard PDF generation loop for multiple pages
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
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
                <div className="bg-[#2D2926] text-[#F9F7F2] p-8 rounded-[2rem] border border-[#B8835A30] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-visible">
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
                        <a href={getCalendarUrl()} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl border border-[#B8835A] text-[#B8835A] hover:bg-[#B8835A] hover:text-[#2D2926] transition-all font-bold text-[10px] uppercase tracking-widest whitespace-nowrap">
                            📅 Agendar Clase
                        </a>
                        <button onClick={handleDownloadPDF} className="px-6 py-3 rounded-xl bg-[#B8835A] text-[#2D2926] hover:bg-[#D4AF37] font-bold shadow-lg flex items-center gap-2 transition-all uppercase text-[10px] tracking-widest whitespace-nowrap">
                            <Download className="w-3.5 h-3.5" /> Exportar PDF
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
            <div className="space-y-10 no-print">
                <div className="text-center space-y-4">
                    <h3 className="text-4xl md:text-5xl font-editorial text-[#2D2926]">Tu Diseño de Realidad 2026</h3>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-12 bg-[#B8835A]/30" />
                        <p className="text-[#B8835A] font-guide text-[10px] uppercase tracking-[0.4em] font-bold">Arquitectura de Vida Sistémica</p>
                        <div className="h-px w-12 bg-[#B8835A]/30" />
                    </div>
                </div>
                <div
                    id="vision-board-canvas"
                    className="bg-white p-8 md:p-20 md:pb-32 relative overflow-visible text-[#4A3B32] shadow-[0_40px_100px_rgba(45,41,38,0.12)] mx-auto rounded-[4rem] border border-[#B8835A15] group"
                    style={{ minHeight: '1100px', maxWidth: '850px' }}
                >
                    {/* Background Sacred Geometry - More sophisticated */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
                        <svg width="100%" height="100%" viewBox="0 0 100 140">
                            <defs>
                                <radialGradient id="grad-gold" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#B8835A" stopOpacity="0" />
                                </radialGradient>
                            </defs>
                            <circle cx="50" cy="70" r="45" fill="none" stroke="#D4AF37" strokeWidth="0.2" />
                            <circle cx="50" cy="70" r="30" fill="none" stroke="#D4AF37" strokeWidth="0.1" />
                            <line x1="50" y1="0" x2="50" y2="140" stroke="#D4AF37" strokeWidth="0.1" />
                            <line x1="0" y1="70" x2="100" y2="70" stroke="#D4AF37" strokeWidth="0.1" />
                            <path d="M50 25 L75 70 L50 115 L25 70 Z" fill="none" stroke="#D4AF37" strokeWidth="0.1" />
                            <circle cx="50" cy="70" r="2" fill="url(#grad-gold)" />
                        </svg>
                    </div>

                    <div className="relative z-10 w-full h-full flex flex-col items-center">
                        <div className="text-center mb-16 relative">
                            <p className="text-[10px] uppercase tracking-[0.5em] text-[#8C4005] mb-3 font-guide font-bold opacity-60">Master Plan</p>
                            <h1 className="text-4xl md:text-6xl font-editorial text-[#2D2926] uppercase tracking-tighter leading-none">Arquitectura<br /><span className="italic text-[#B8835A]">Intencional</span></h1>
                        </div>

                        <div className="grid grid-cols-3 grid-rows-3 w-full gap-4 md:gap-10 items-center justify-items-center relative flex-grow">
                            {/* Connections - More architectural */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-30">
                                <circle cx="50%" cy="50%" r="22%" stroke="#B8835A" strokeWidth="0.5" strokeDasharray="6 3" fill="none" />
                                <line x1="50%" y1="20%" x2="50%" y2="50%" stroke="#B8835A" strokeWidth="0.5" />
                                <line x1="20%" y1="50%" x2="50%" y2="50%" stroke="#B8835A" strokeWidth="0.5" />
                                <line x1="80%" y1="50%" x2="50%" y2="50%" stroke="#B8835A" strokeWidth="0.5" />
                                <line x1="30%" y1="80%" x2="50%" y2="50%" stroke="#B8835A" strokeWidth="0.5" />
                                <line x1="70%" y1="80%" x2="50%" y2="50%" stroke="#B8835A" strokeWidth="0.5" />
                            </svg>

                            <div className="col-start-2 row-start-1 -translate-y-4"><ArchitecturalCard pillar={data.pillars[0]} label="PROPÓSITO" /></div>
                            <div className="col-start-1 row-start-2 -translate-x-4"><ArchitecturalCard pillar={data.pillars[1]} label="RECURSOS" small /></div>

                            <div className="col-start-2 row-start-2 w-full aspect-square bg-[#FDFBF7] rounded-full border border-[#B8835A]/20 flex flex-col items-center justify-center p-8 text-center shadow-2xl ring-12 ring-white z-20 group-hover:scale-105 transition-transform duration-700">
                                <div className="absolute inset-2 border border-dashed border-[#B8835A]/30 rounded-full animate-[spin_20s_linear_infinite]" />
                                <span className="text-[9px] font-guide font-bold text-[#8C4005] uppercase tracking-[0.3em] mb-3 relative z-10">CENTRADO EN</span>
                                <h4 className="text-lg md:text-xl font-editorial italic leading-tight text-[#2D2926] relative z-10">
                                    {data.analysis?.identity || (isMale ? 'El Arquitecto' : 'La Arquitecta')}
                                </h4>
                                <div className="w-8 h-[1px] bg-[#B8835A]/40 my-3" />
                                <p className="text-[10px] font-guide text-[#B8835A] uppercase tracking-widest font-bold">2026</p>
                            </div>

                            <div className="col-start-3 row-start-2 translate-x-4"><ArchitecturalCard pillar={data.pillars[2]} label="VÍNCULOS" small /></div>
                            <div className="col-start-1 row-start-3"><ArchitecturalCard pillar={data.pillars[3]} label="EXPANSIÓN" small /></div>
                            <div className="col-start-3 row-start-3"><ArchitecturalCard pillar={data.pillars[4]} label="VITALIDAD" small /></div>
                        </div>

                        <div className="mt-auto pt-10 text-center w-full">
                            <p className="text-sm italic font-editorial text-[#2D2926] opacity-40">"El orden es la primera ley del cielo."</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. PRINTABLE BLUEPRINT CONTAINER (Hidden from UI, visible on Export) */}
            <div data-pdf-content ref={pdfContentRef} className="bg-[#F9F7F2] text-[#2D2926] overflow-hidden hidden" style={{ width: '210mm' }}>

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

                {/* PDF PAGE 2: TABLERO VISUAL (The "Vision Board" with Actual Images) */}
                <div className="min-h-[1120px] p-16 bg-white relative flex flex-col page-break-after-always overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                        <svg width="100%" height="100%" viewBox="0 0 100 140">
                             <circle cx="50" cy="70" r="45" fill="none" stroke="#D4AF37" strokeWidth="0.1" />
                             <line x1="50" y1="0" x2="50" y2="140" stroke="#D4AF37" strokeWidth="0.1" />
                        </svg>
                    </div>

                    <div className="relative z-10 flex flex-col h-full items-center">
                        <div className="text-center mb-12">
                             <span className="text-[10px] font-guide font-bold text-[#8C4005] uppercase tracking-[0.5em] block mb-2">Configuración Final</span>
                             <h2 className="text-5xl font-editorial text-[#2D2926]">Tablero de Visión</h2>
                             <div className="flex justify-center mt-4"><p className="text-[10px] font-guide text-gray-400">PÁGINA 02/03</p></div>
                        </div>

                        <div className="grid grid-cols-3 grid-rows-3 w-full gap-8 items-center justify-items-center flex-grow">
                             <div className="col-start-2 row-start-1"><ArchitecturalCard pillar={data.pillars[0]} label="PROPÓSITO" /></div>
                             <div className="col-start-1 row-start-2"><ArchitecturalCard pillar={data.pillars[1]} label="RECURSOS" small /></div>
                             
                             <div className="col-start-2 row-start-2 w-full aspect-square bg-[#FDFBF7] rounded-full border border-[#B8835A]/20 flex flex-col items-center justify-center p-6 text-center shadow-xl">
                                  <span className="text-[8px] font-guide font-bold text-[#8C4005] uppercase tracking-[0.2em] mb-2">CENTRADO EN</span>
                                  <h4 className="text-base font-editorial italic text-[#2D2926]">
                                      {data.analysis?.identity || (isMale ? 'El Arquitecto' : 'La Arquitecta')}
                                  </h4>
                                  <div className="w-6 h-[1px] bg-[#B8835A]/30 my-2" />
                                  <p className="text-[8px] font-guide text-[#B8835A] font-bold">2026</p>
                             </div>

                             <div className="col-start-3 row-start-2"><ArchitecturalCard pillar={data.pillars[2]} label="VÍNCULOS" small /></div>
                             <div className="col-start-1 row-start-3"><ArchitecturalCard pillar={data.pillars[3]} label="EXPANSIÓN" small /></div>
                             <div className="col-start-3 row-start-3"><ArchitecturalCard pillar={data.pillars[4]} label="VITALIDAD" small /></div>
                        </div>

                        <div className="mt-12 text-center text-[10px] font-mono text-[#B8835A] uppercase tracking-widest opacity-60">
                             YELITZE RANGEL • DISEÑO INTENCIONAL • 2026
                        </div>
                    </div>
                </div>

                {/* PDF PAGE 3: BITÁCORA (Reflections & Steps) */}
                <div className="min-h-[1120px] p-24 bg-white space-y-16">
                    <div className="text-center space-y-4">
                        <span className="bg-[#8C4005] text-[#F9F7F2] px-6 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] font-guide">Bitácora de Construcción</span>
                        <h2 className="text-5xl font-editorial text-[#2D2926]">La Ruta de la {isMale ? 'Arquitecta' : 'Arquitecto'}</h2>
                        <div className="flex justify-center mt-4"><p className="text-[10px] font-guide text-gray-400">PÁGINA 03/03</p></div>
                    </div>

                    {/* Steps Section */}
                    <div className="grid grid-cols-1 gap-12 pt-12">
                        <div className="bg-[#FDFBF7] p-12 rounded-[2rem] border border-[#B8835A20] space-y-10">
                            <h3 className="text-2xl font-editorial text-[#8C4005] border-b border-[#B8835A30] pb-4">Pasos de Acción Inmediata</h3>
                            <div className="space-y-8">
                                {(() => {
                                    const actionSteps = (data.analysis?.guide_steps && data.analysis.guide_steps.length > 0)
                                        ? data.analysis.guide_steps
                                        : data.pillars.map(p => p.action).filter(a => a && a.trim() !== '');

                                    if (actionSteps.length === 0) return <p className="text-gray-400 italic">Define tus micropasos en la sección de Pilares para verlos aquí.</p>;

                                    return actionSteps.map((step: string, i: number) => (
                                        <div key={i} className="flex gap-8 items-start">
                                            <span className="w-10 h-10 rounded-full bg-[#B8835A]/10 text-[#8C4005] flex items-center justify-center font-editorial text-xl font-bold shrink-0">{i + 1}</span>
                                            <p className="text-[#2D2926] text-xl font-editorial leading-relaxed opacity-90 pt-1">{step}</p>
                                        </div>
                                    ));
                                })()}
                            </div>
                        </div>

                        {/* Reflections Section */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-editorial text-[#2D2926] border-b border-[#B8835A10] pb-4">Reflexiones de los Portales</h3>
                            <div className="grid grid-cols-2 gap-8">
                                {Object.entries(data.reflections).map(([id, text], idx) => {
                                    const portalTitles: Record<string, string> = {
                                        'portal1': 'Cierre Consciente',
                                        'portal2': 'Foco y Dispersión',
                                        'portal3': 'Recuperar Mi Poder',
                                        'portal4': 'Arquitectura de Orden'
                                    };
                                    return (
                                        <div key={idx} className="p-6 bg-[#FDFBF7] rounded-2xl border border-[#B8835A10]">
                                            <span className="text-[10px] uppercase font-bold text-[#B8835A] font-guide tracking-widest block mb-2">
                                                Portal {idx + 1} · {portalTitles[id] || ''}
                                            </span>
                                            <p className="text-sm italic font-editorial text-[#2D2926] opacity-70 leading-relaxed">"{text}"</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 text-center">
                        <p className="text-[10px] uppercase font-guide font-bold tracking-[0.4em] text-[#B8835A] mb-2 opacity-40">Diseño Intencional 2026</p>
                        <p className="text-[8px] font-guide text-gray-300">©{new Date().getFullYear()} Yelitze Rangel</p>
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
        <div className="bg-white p-2 pb-8 shadow-sm border border-[#B8835A]/10 relative group overflow-visible h-full flex flex-col min-h-[200px]">
            <div className={`absolute top-2 left-2 bg-white/90 backdrop-blur text-[#2C3E50] px-2 py-0.5 text-[8px] uppercase tracking-widest font-bold z-10 border border-gray-200 ${small ? 'text-[6px]' : ''}`}>
                {label}
            </div>

            <div className={`w-full ${small ? 'aspect-square' : 'aspect-[3/4]'} bg-gray-50 mb-2 overflow-hidden relative`}>
                {hasImages ? (
                    (() => {
                        // Priority: AI image (detected if length >= 4, use the 4th image)
                        const imageToDisplay = pillar.images.length >= 4 ? pillar.images[3] : pillar.images[0];
                        
                        return (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={imageToDisplay} alt="" className="w-full h-full object-cover opacity-90 contrast-110" />
                        );
                    })()
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50 text-[10px]">VACÍO</div>
                )}
            </div>

            <div className="text-center px-1 mt-auto">
                <p className={`font-heading text-[#2C3E50] leading-tight mb-1 ${small ? 'text-[10px]' : 'text-xs'}`}>
                    {pillar.intention ? pillar.intention.substring(0, small ? 25 : 40) + (pillar.intention.length > (small ? 25 : 40) ? '...' : '') : ''}
                </p>
                <div className="w-8 h-[1px] bg-[#B8835A]/30 mx-auto my-2"></div>
                <p className={`font-bold text-[#8C4005] uppercase ${small ? 'text-[7px]' : 'text-[8px]'}`}>{pillar.action}</p>
            </div>
        </div>
    );
}
