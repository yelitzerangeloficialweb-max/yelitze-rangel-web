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
        
        // Temporary visibility for capture
        element.style.display = 'block';
        element.style.position = 'fixed';
        element.style.left = '-9999px';
        element.style.top = '0';

        const images = Array.from(element.getElementsByTagName('img'));
        await Promise.all(images.map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
            });
        }));

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        // Capture each page separately to avoid information being cut between pages
        const pages = Array.from(element.children);
        
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i] as HTMLElement;
            
            // Skip non-page elements if any
            if (!page.classList.contains('min-h-[1120px]')) continue;

            const canvas = await html2canvas(page, {
                scale: 3, 
                useCORS: true,
                allowTaint: true,
                logging: false,
                backgroundColor: '#F9F7F2',
                imageTimeout: 15000,
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            
            if (pdf.internal.pages.length > 1 && i > 0) {
                pdf.addPage();
            }
            
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        }

        element.style.display = 'none';

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
                        <button onClick={handleDownloadPDF} className="px-8 py-4 rounded-xl bg-[#B8835A] text-[#2D2926] hover:bg-[#D4AF37] font-bold shadow-lg flex items-center gap-3 transition-all uppercase text-[11px] tracking-[0.2em] whitespace-nowrap group">
                            <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /> descargar arquitectura Intencional en PDF
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

                        {/* Results Bitácora in UI too */}
                        {data.analysis && (
                            <div className="mt-16 pt-16 border-t border-[#B8835A20] space-y-12">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-[#B8835A10] space-y-4">
                                        <h5 className="text-[#8C4005] font-bold text-sm tracking-widest uppercase font-guide italic">Mi Manifiesto 2026</h5>
                                        <p className="text-xl md:text-2xl italic font-editorial leading-relaxed text-[#2D2926]">"{data.analysis.manifesto}"</p>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="bg-[#FDFBF7] p-6 rounded-xl border border-[#B8835A10]">
                                            <h5 className="text-[#8C4005] font-bold text-[10px] tracking-widest uppercase font-guide mb-2">Soberanía Sistémica / Lo que hoy suelto</h5>
                                            <p className="text-[#2D2926] opacity-80 font-editorial text-lg">{data.analysis.release}</p>
                                        </div>
                                        <div className="bg-[#FDFBF7] p-6 rounded-xl border border-[#B8835A10]">
                                            <h5 className="text-[#8C4005] font-bold text-[10px] tracking-widest uppercase font-guide mb-2">Práctica Maestra / Mi ritual de orden</h5>
                                            <p className="text-[#2D2926] opacity-80 font-editorial text-lg">{data.analysis.practice}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 2.5 BITÁCORA DE CONSTRUCCIÓN (Match PDF Content in Web UI) */}
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h3 className="text-3xl md:text-5xl font-editorial text-[#2D2926]">Bitácora de Construcción</h3>
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-px w-12 bg-[#B8835A]/30" />
                            <p className="text-[#B8835A] font-guide text-[10px] uppercase tracking-[0.4em] font-bold">Ruta de Acción y Reflexión</p>
                            <div className="h-px w-12 bg-[#B8835A]/30" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Action Steps */}
                        <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-[#B8835A10] space-y-8">
                            <h4 className="text-[#8C4005] font-editorial text-2xl italic border-b border-[#B8835A20] pb-6">Pasos de Acción Inmediata</h4>
                            <div className="space-y-6">
                                {(() => {
                                    const actionSteps = (data.analysis?.guide_steps && data.analysis.guide_steps.length > 0)
                                        ? data.analysis.guide_steps
                                        : data.pillars.map(p => p.action).filter(a => a && a.trim() !== '');
                                    
                                    if (actionSteps.length === 0) return <p className="text-[#2D2926]/40 italic font-editorial">Define tus micropasos en los Pilares para verlos aquí.</p>;
                                    
                                    return actionSteps.map((step: string, i: number) => (
                                        <div key={i} className="flex gap-4 items-start group">
                                            <span className="w-8 h-8 rounded-full bg-[#B8835A15] text-[#8C4005] flex items-center justify-center font-bold font-editorial shrink-0 group-hover:bg-[#B8835A] group-hover:text-white transition-all duration-300">
                                                {i + 1}
                                            </span>
                                            <p className="text-[#2D2926] font-editorial text-lg leading-snug pt-1 opacity-90">{step}</p>
                                        </div>
                                    ));
                                })()}
                            </div>
                        </div>

                        {/* Portal reflections */}
                        <div className="space-y-8">
                            <h4 className="text-[#8C4005] font-editorial text-2xl italic pl-2">Eco de los Portales</h4>
                            <div className="grid gap-4">
                                {Object.entries(data.reflections).map(([id, text], idx) => {
                                    const portalTitles: Record<string, string> = {
                                        portal1: 'Cierre Consciente', portal2: 'Foco y Dispersión',
                                        portal3: 'Recuperar Mi Poder', portal4: 'Arquitectura de Orden',
                                    };
                                    return (
                                        <div key={idx} className="bg-white p-6 rounded-2xl border border-[#B8835A15] shadow-sm hover:shadow-md transition-all group">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[#B8835A] font-guide font-bold text-[9px] uppercase tracking-widest block opacity-60">
                                                    Portal {idx + 1} · {portalTitles[id] || ''}
                                                </span>
                                            </div>
                                            <p className="text-[#2D2926] font-editorial italic text-lg leading-relaxed opacity-80">"{text}"</p>
                                        </div>
                                    );
                                })}
                            </div>
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

            {/* 4. PRINTABLE BLUEPRINT CONTAINER (Hidden from UI, captured on Export) */}
            <div data-pdf-content ref={pdfContentRef} className="overflow-hidden hidden" style={{ width: '210mm', backgroundColor: '#F9F7F2' }}>

                {/* ── PAGE 1: CARTA DE YELITZE ── */}
                <div className="min-h-[1120px] relative flex flex-col" style={{ backgroundColor: '#F9F7F2', pageBreakAfter: 'always' }}>
                    {/* Dark header band */}
                    <div style={{ backgroundColor: '#231916', padding: '14px 0 10px' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/assets/images/logo-yelitze-new.png" alt="Yelitze Rangel" style={{ height: '30px', margin: '0 auto', display: 'block' }} />
                        <p style={{ color: '#B8835A', fontSize: '8px', textAlign: 'center', fontWeight: '700', letterSpacing: '0.3em', marginTop: '6px', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
                            TU COACH ANCESTRAL
                        </p>
                    </div>
                    <div style={{ height: '3px', backgroundColor: '#B8835A' }} />

                    {/* Letter body */}
                    <div style={{ padding: '40px 64px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 className="text-[#8C4005] text-4xl font-editorial italic" style={{ marginBottom: '28px' }}>Hola, {firstName}.</h3>
                        <div className="font-editorial text-xl leading-relaxed space-y-6 text-[#2D2926]" style={{ flex: 1 }}>
                            <p>Has dado el primer paso más valioso: detenerte a mirar. Lo que tienes en tus manos no es solo un documento, es el <strong>Plano Maestro de tu nueva realidad</strong>. En mi camino acompañando a cientos de personas, he aprendido que el desequilibrio en nuestra vida rara vez es falta de voluntad; la mayoría de las veces es falta de orden.</p>
                            <p>Este mapa que acabas de co-crear conmigo es tu brújula para el 2026. Es el primer paso de tu transformación sistémica porque, antes de construir los muros de tus sueños, necesitamos asegurar que los cimientos—tus lealtades, tus intenciones y tus hábitos—estén alineados con quien eres hoy, y no con quien otros esperaban que fueras.</p>
                            <p>El equilibrio que buscas nace de habitar tu propia soberanía. Este diseño te permitirá dejar de cargar pesos ajenos y empezar a moverte con la ligereza de quien sabe exactamente hacia dónde va y desde qué paz decide.</p>
                            <p className="text-[#8C4005] font-bold italic text-2xl" style={{ borderLeft: '4px solid #B8835A', paddingLeft: '24px', margin: '24px 0' }}>
                                "Restaura el orden, y el equilibrio llegará por añadidura."
                            </p>

                            {/* Analysis summary cards */}
                            {data.analysis && (
                                <div className="grid grid-cols-2 gap-6" style={{ marginTop: '20px' }}>
                                    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', borderLeft: '3px solid #8C4005' }}>
                                        <p className="font-guide font-bold text-[#8C4005] uppercase text-[10px] tracking-widest" style={{ marginBottom: '8px' }}>Lo que suelto</p>
                                        <p className="font-editorial text-base text-[#2D2926] opacity-80">{data.analysis.release}</p>
                                    </div>
                                    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', borderLeft: '3px solid #B8835A' }}>
                                        <p className="font-guide font-bold text-[#B8835A] uppercase text-[10px] tracking-widest" style={{ marginBottom: '8px' }}>Mi identidad</p>
                                        <p className="font-editorial text-base text-[#2D2926] opacity-80 italic">{data.analysis.identity}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Signature */}
                        <div style={{ marginTop: '32px' }}>
                            <p className="font-guide text-[#B8835A] uppercase text-xs font-bold tracking-widest" style={{ marginBottom: '6px' }}>Con amor y certeza,</p>
                            <div style={{ width: '80px', height: '1px', backgroundColor: '#B8835A', marginBottom: '8px' }} />
                            <p className="font-editorial text-[#8C4005] text-3xl">YELITZE RANGEL</p>
                            <p className="font-editorial text-[#B8835A] italic text-sm">Tu Coach Ancestral</p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{ padding: '10px 64px', borderTop: '1px solid rgba(184,131,90,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>yelitzerangeloficial.com</span>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>01 / 04</span>
                    </div>
                </div>

                {/* ── PAGE 2: TABLERO VISUAL ── */}
                <div className="min-h-[1120px] relative flex flex-col" style={{ backgroundColor: '#FFFFFF', pageBreakAfter: 'always' }}>
                    {/* Dark header band */}
                    <div style={{ backgroundColor: '#231916', padding: '14px 0 10px' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/assets/images/logo-yelitze-new.png" alt="Yelitze Rangel" style={{ height: '30px', margin: '0 auto', display: 'block' }} />
                        <p style={{ color: '#B8835A', fontSize: '8px', textAlign: 'center', fontWeight: '700', letterSpacing: '0.3em', marginTop: '6px', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
                            ARQUITECTURA DE VIDA INTENCIONAL
                        </p>
                    </div>
                    <div style={{ height: '3px', backgroundColor: '#B8835A' }} />

                    {/* Board title */}
                    <div style={{ padding: '18px 48px 12px', textAlign: 'center' }}>
                        <p className="font-guide font-bold text-[#8C4005] uppercase tracking-widest" style={{ fontSize: '10px', marginBottom: '4px' }}>Tablero de Visión 2026</p>
                        <h2 className="font-editorial text-[#2D2926]" style={{ fontSize: '36px' }}>Diseño de Realidad</h2>
                    </div>

                    {/* 3×3 Grid */}
                    <div style={{ padding: '0 32px', flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto auto auto', gap: '16px', alignItems: 'center' }}>
                        {/* Row 1: only center column */}
                        <div style={{ gridColumn: '1', gridRow: '1', visibility: 'hidden' }} />
                        <div style={{ gridColumn: '2', gridRow: '1' }}>
                            <ArchitecturalCard pillar={data.pillars[0]} label="PROPÓSITO" printMode />
                        </div>
                        <div style={{ gridColumn: '3', gridRow: '1', visibility: 'hidden' }} />

                        {/* Row 2: left card, center circle, right card */}
                        <div style={{ gridColumn: '1', gridRow: '2' }}>
                            <ArchitecturalCard pillar={data.pillars[1]} label="RECURSOS" small printMode />
                        </div>
                        <div style={{ gridColumn: '2', gridRow: '2', aspectRatio: '1/1', backgroundColor: '#FDFBF7', borderRadius: '50%', border: '1px solid rgba(184,131,90,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
                            <span className="font-guide font-bold text-[#8C4005] uppercase" style={{ fontSize: '8px', letterSpacing: '0.25em', marginBottom: '8px' }}>CENTRADO EN</span>
                            <h4 className="font-editorial italic text-[#2D2926]" style={{ fontSize: '15px', lineHeight: '1.2', margin: '0 0 8px' }}>
                                {data.analysis?.identity || (isMale ? 'El Arquitecto' : 'La Arquitecta')}
                            </h4>
                            <div style={{ width: '28px', height: '1px', backgroundColor: 'rgba(184,131,90,0.4)', margin: '0 auto 8px' }} />
                            <p className="font-guide font-bold text-[#B8835A]" style={{ fontSize: '8px' }}>2026</p>
                        </div>
                        <div style={{ gridColumn: '3', gridRow: '2' }}>
                            <ArchitecturalCard pillar={data.pillars[2]} label="VÍNCULOS" small printMode />
                        </div>

                        {/* Row 3: two cards + center quote */}
                        <div style={{ gridColumn: '1', gridRow: '3' }}>
                            <ArchitecturalCard pillar={data.pillars[3]} label="EXPANSIÓN" small printMode />
                        </div>
                        <div style={{ gridColumn: '2', gridRow: '3', backgroundColor: '#F9F7F2', borderRadius: '12px', padding: '16px', textAlign: 'center', border: '1px solid rgba(184,131,90,0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <p className="font-guide font-bold text-[#8C4005] uppercase" style={{ fontSize: '7px', letterSpacing: '0.2em', marginBottom: '8px' }}>PRÁCTICA MAESTRA</p>
                            <p className="font-editorial italic text-[#2D2926]" style={{ fontSize: '11px', lineHeight: '1.4', opacity: 0.85 }}>
                                {data.analysis?.practice || '"El orden es la primera ley del cielo."'}
                            </p>
                        </div>
                        <div style={{ gridColumn: '3', gridRow: '3' }}>
                            <ArchitecturalCard pillar={data.pillars[4]} label="VITALIDAD" small printMode />
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{ padding: '10px 48px', borderTop: '1px solid rgba(184,131,90,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>yelitzerangeloficial.com</span>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>02 / 04</span>
                    </div>
                </div>

                {/* ── PAGE 3: BITÁCORA ── */}
                <div className="min-h-[1120px] relative flex flex-col" style={{ backgroundColor: '#FFFFFF', pageBreakAfter: 'always' }}>
                    {/* Dark header band */}
                    <div style={{ backgroundColor: '#231916', padding: '14px 0 10px' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/assets/images/logo-yelitze-new.png" alt="Yelitze Rangel" style={{ height: '30px', margin: '0 auto', display: 'block' }} />
                        <p style={{ color: '#B8835A', fontSize: '8px', textAlign: 'center', fontWeight: '700', letterSpacing: '0.3em', marginTop: '6px', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
                            BIT&#193;CORA DE CONSTRUCCI&#211;N
                        </p>
                    </div>
                    <div style={{ height: '3px', backgroundColor: '#B8835A' }} />

                    <div style={{ padding: '32px 64px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '28px' }}>
                        <div>
                            <h2 className="font-editorial text-[#2D2926]" style={{ fontSize: '40px', marginBottom: '4px' }}>La Ruta del {isMale ? 'Arquitecto' : 'Arquitecta'}</h2>
                            <div style={{ width: '60px', height: '2px', backgroundColor: '#B8835A' }} />
                        </div>

                        {/* Action steps */}
                        <div style={{ backgroundColor: '#F9F7F2', borderRadius: '16px', padding: '28px', borderLeft: '4px solid #8C4005' }}>
                            <h3 className="font-editorial text-[#8C4005]" style={{ fontSize: '20px', marginBottom: '20px', borderBottom: '1px solid rgba(184,131,90,0.3)', paddingBottom: '10px' }}>
                                Pasos de Acción Inmediata
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {(() => {
                                    const actionSteps = (data.analysis?.guide_steps && data.analysis.guide_steps.length > 0)
                                        ? data.analysis.guide_steps
                                        : data.pillars.map(p => p.action).filter(a => a && a.trim() !== '');
                                    if (actionSteps.length === 0) return <p className="font-editorial text-gray-400 italic">Define tus micropasos en los Pilares.</p>;
                                    return actionSteps.map((step: string, i: number) => (
                                        <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                            <span className="font-editorial font-bold text-[#8C4005]" style={{ minWidth: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(184,131,90,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{i + 1}</span>
                                            <p className="font-editorial text-[#2D2926]" style={{ fontSize: '16px', lineHeight: '1.5', opacity: 0.9, paddingTop: '4px' }}>{step}</p>
                                        </div>
                                    ));
                                })()}
                            </div>
                        </div>

                        {/* Portal reflections */}
                        <div>
                            <h3 className="font-editorial text-[#2D2926]" style={{ fontSize: '20px', marginBottom: '16px', borderBottom: '1px solid rgba(184,131,90,0.15)', paddingBottom: '8px' }}>
                                Reflexiones de los Portales
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                {Object.entries(data.reflections).map(([id, text], idx) => {
                                    const portalTitles: Record<string, string> = {
                                        portal1: 'Cierre Consciente', portal2: 'Foco y Dispersión',
                                        portal3: 'Recuperar Mi Poder', portal4: 'Arquitectura de Orden',
                                    };
                                    const portalSubtitles: Record<string, string> = {
                                        portal1: '¿Dónde se fue mi energía?', portal2: '¿Dónde perdí mi centro?',
                                        portal3: 'Lo que dejo de cargar', portal4: 'Gestión Consciente de Energía',
                                    };
                                    return (
                                        <div key={idx} style={{ padding: '16px', backgroundColor: '#F9F7F2', borderRadius: '12px', borderLeft: '2px solid rgba(184,131,90,0.4)' }}>
                                            <span className="font-guide font-bold text-[#B8835A] uppercase tracking-widest" style={{ fontSize: '9px', display: 'block', marginBottom: '3px' }}>
                                                Portal {idx + 1} · {portalTitles[id] || ''}
                                            </span>
                                            <p className="font-editorial text-[#8C4005] italic" style={{ fontSize: '9px', opacity: 0.6, marginBottom: '6px' }}>{portalSubtitles[id] || ''}</p>
                                            <p className="font-editorial text-[#2D2926] italic" style={{ fontSize: '13px', opacity: 0.75, lineHeight: '1.4' }}>"{text}"</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{ padding: '10px 64px', borderTop: '1px solid rgba(184,131,90,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>yelitzerangeloficial.com</span>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>03 / 04</span>
                    </div>
                </div>

                {/* ── PAGE 4: MANIFIESTO Y COMPROMISO ── */}
                <div className="min-h-[1120px] relative flex flex-col" style={{ backgroundColor: '#FFFFFF' }}>
                    {/* Dark header band */}
                    <div style={{ backgroundColor: '#231916', padding: '14px 0 10px' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/assets/images/logo-yelitze-new.png" alt="Yelitze Rangel" style={{ height: '30px', margin: '0 auto', display: 'block' }} />
                        <p style={{ color: '#B8835A', fontSize: '8px', textAlign: 'center', fontWeight: '700', letterSpacing: '0.3em', marginTop: '6px', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
                            MANIFIESTO Y COMPROMISO
                        </p>
                    </div>
                    <div style={{ height: '3px', backgroundColor: '#B8835A' }} />

                    <div style={{ padding: '40px 64px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <div>
                            <h2 className="font-editorial text-[#2D2926]" style={{ fontSize: '40px', marginBottom: '4px' }}>Mi Nueva Realidad</h2>
                            <div style={{ width: '60px', height: '2px', backgroundColor: '#B8835A' }} />
                        </div>

                        {/* Manifesto quote */}
                        <div style={{ textAlign: 'center', padding: '32px 48px', backgroundColor: '#F9F7F2', borderRadius: '20px' }}>
                            <p className="font-guide font-bold text-[#8C4005] uppercase tracking-widest" style={{ fontSize: '10px', marginBottom: '16px', opacity: 0.7 }}>Declaración de Poder</p>
                            <p className="font-editorial italic text-[#2D2926]" style={{ fontSize: '28px', lineHeight: '1.4' }}>
                                "{data.analysis?.manifesto || 'Soy el arquitecto de mi propia paz y abundancia.'}"
                            </p>
                            <div style={{ width: '60px', height: '1px', backgroundColor: 'rgba(184,131,90,0.4)', margin: '20px auto 0' }} />
                        </div>

                        {/* Release & Practice */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                            <div style={{ backgroundColor: '#F9F7F2', padding: '28px 32px', borderRadius: '16px', borderLeft: '4px solid #8C4005' }}>
                                <h4 className="font-guide font-bold text-[#8C4005] uppercase tracking-widest" style={{ fontSize: '10px', marginBottom: '10px' }}>Soberanía Sistémica / Lo que hoy suelto</h4>
                                <p className="font-editorial text-[#2D2926]" style={{ fontSize: '20px', opacity: 0.9 }}>{data.analysis?.release || 'Las lealtades que ya no me pertenecen.'}</p>
                            </div>
                            <div style={{ backgroundColor: '#F9F7F2', padding: '28px 32px', borderRadius: '16px', borderLeft: '4px solid #B8835A' }}>
                                <h4 className="font-guide font-bold text-[#B8835A] uppercase tracking-widest" style={{ fontSize: '10px', marginBottom: '10px' }}>Práctica Maestra / Mi ritual de orden</h4>
                                <p className="font-editorial text-[#2D2926]" style={{ fontSize: '20px', opacity: 0.9 }}>{data.analysis?.practice || 'Habitar mi presente con intención diaria.'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{ padding: '10px 64px', borderTop: '1px solid rgba(184,131,90,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="font-guide text-[#B8835A] italic font-editorial" style={{ fontSize: '9px', opacity: 0.6 }}>
                            "La arquitectura de tu vida es el reflejo del orden en tu alma."
                        </span>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>04 / 04</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ArchitecturalCard({ pillar, label, small, printMode }: { pillar: any, label: string, small?: boolean, printMode?: boolean }) {
    if (!pillar) return null;

    const images = pillar.images || [];
    const hasImages = images.length > 0;

    const aiImage = images.length >= 4 ? images[3] : null;
    const userImages = images.slice(0, 3);

    return (
        <div className={`bg-white shadow-xl border border-[#B8835A20] p-3 flex flex-col relative transition-all duration-500 hover:shadow-2xl ${printMode ? 'w-full' : (small ? 'w-52' : 'w-64')}`}>
            {/* Label Badge */}
            <div className={`absolute -top-3 left-4 bg-[#8C4005] text-white px-4 py-1.5 text-[9px] uppercase tracking-[0.25em] font-bold z-20 rounded-sm shadow-lg ${small ? 'scale-90' : ''}`}>
                {label}
            </div>

            {/* Image Section */}
            <div className={`w-full ${small ? 'h-40' : 'h-52'} bg-[#F9F7F2] relative overflow-hidden mb-4 border border-[#3C2A21]/5 rounded-sm`}>
                {!hasImages ? (
                    <div className="w-full h-full flex items-center justify-center text-[#B8835A]/30 text-[8px] font-bold tracking-widest italic">DISEÑO EN ORDEN</div>
                ) : aiImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={aiImage} alt="" className="w-full h-full object-cover grayscale-[10%] sepia-[5%] contrast-105" />
                ) : (
                    <div className="w-full h-full flex flex-col gap-0.5">
                        {images.length === 1 ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={images[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <div className="h-2/3 w-full">
                                    {/* eslint-disable-next-line @next/next/no-img-element */ }
                                    <img src={userImages[0]} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="h-1/3 w-full flex gap-0.5">
                                    <div className="w-1/2 h-full">
                                        {/* eslint-disable-next-line @next/next/no-img-element */ }
                                        <img src={userImages[1] || userImages[0]} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="w-1/2 h-full">
                                        {/* eslint-disable-next-line @next/next/no-img-element */ }
                                        <img src={userImages[2] || userImages[0]} alt="" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="text-center px-1 space-y-3 mt-auto">
                <div className="space-y-1">
                    <p className={`font-guide font-bold text-[#8C4005] uppercase tracking-widest ${small ? 'text-[7px]' : 'text-[8px]'} opacity-50`}>Intención</p>
                    <p className={`font-editorial italic text-[#2D2926] leading-snug ${small ? 'text-xs' : 'text-sm'}`}>
                        "{pillar.intention || 'Por definir'}"
                    </p>
                </div>

                {pillar.direction && (
                    <div className="space-y-1">
                        <p className={`font-guide font-bold text-[#B8835A] uppercase tracking-widest ${small ? 'text-[7px]' : 'text-[8px]'} opacity-60`}>Propósito / Resultado</p>
                        <p className={`font-editorial text-[#2D2926] leading-tight ${small ? 'text-[10px]' : 'text-xs'} opacity-90`}>
                            {pillar.direction}
                        </p>
                    </div>
                )}

                <div className="w-8 h-[0.5px] bg-[#B8835A]/30 mx-auto" />
                
                <div className="space-y-1 pb-1">
                    <p className={`font-guide font-bold text-[#2D2926] uppercase tracking-[0.2em] ${small ? 'text-[8px]' : 'text-[9px]'}`}>
                        {pillar.action || 'Micropaso pendiente'}
                    </p>
                </div>
            </div>
        </div>
    );
}
