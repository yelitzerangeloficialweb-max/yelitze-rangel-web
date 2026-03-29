'use client';

import { useState, useRef, useEffect } from 'react';
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
    const [yoSoy, setYoSoy] = useState<{ yo_soy: string; ancla: string; decreto_diario: string } | null>(null);
    const [isGeneratingYoSoy, setIsGeneratingYoSoy] = useState(false);

    useEffect(() => {
        if (!isAnalyzing && data.analysis && !yoSoy && !isGeneratingYoSoy) {
            setIsGeneratingYoSoy(true);
            fetch('/api/ai/yo-soy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pillars: data.pillars,
                    reflections: data.reflections,
                    userName: registrationData?.name || '',
                    userGender: registrationData?.gender || 'mujer'
                })
            })
            .then(r => r.json())
            .then(result => { if (result.yo_soy) setYoSoy(result); })
            .catch(err => console.error('[YO SOY]:', err))
            .finally(() => setIsGeneratingYoSoy(false));
        }
    }, [isAnalyzing, data.analysis]);

    const handleDownloadPDF = async () => {
        const element = pdfContentRef.current;
        if (!element) return;
        try {
            await document.fonts.ready;
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
            const pages = Array.from(element.children);
            let capturedCount = 0;
            for (let i = 0; i < pages.length; i++) {
                const page = pages[i] as HTMLElement;
                if (!page.classList.contains('pdf-page-marker')) continue;
                const canvas = await html2canvas(page, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: false,
                    logging: false,
                    backgroundColor: '#F9F7F2',
                    imageTimeout: 15000,
                });
                const imgData = canvas.toDataURL('image/jpeg', 0.9);
                if (capturedCount > 0) pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
                capturedCount++;
            }
            if (capturedCount > 0) {
                const fileName = `Arquitectura_Intencional_${registrationData?.name?.replace(/\s/g, '_') || 'Vida'}.pdf`;
                pdf.save(fileName);
            }
        } catch (err) {
            console.error('[PDF Export] Error:', err);
        } finally {
            if (element) element.style.display = 'none';
        }
    };

    if (isAnalyzing) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 text-center animate-pulse">
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/20" />
                    <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-3xl font-editorial text-[#2D2926]">Trazando tu Arquitectura...</h3>
            </div>
        );
    }

    const firstName = registrationData?.name?.split(' ')[0] || 'Arquitecta';
    const isMale = registrationData?.gender === 'hombre';
    const totalPages = yoSoy ? 6 : 5;

    return (
        <div className="max-w-7xl mx-auto space-y-16 pb-20 px-4">
            <div className="no-print space-y-12">
                <div className="bg-[#2D2926] text-[#F9F7F2] p-8 md:p-10 rounded-[2rem] border border-[#B8835A30] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-visible text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 w-full md:w-auto">
                        <div className="w-16 h-16 bg-[#B8835A] text-[#2D2926] rounded-full flex items-center justify-center shrink-0">
                            <Sparkles className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="font-editorial text-2xl md:text-3xl text-white">¡Diseño Finalizado!</h3>
                            <p className="text-[#B8835A] font-guide text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold mt-2">Tu plano maestro está listo, {firstName}</p>
                        </div>
                    </div>
                    <button onClick={handleDownloadPDF} className="w-full md:w-auto px-4 py-4 rounded-xl bg-[#B8835A] text-[#2D2926] hover:bg-[#D4AF37] font-bold shadow-lg flex items-center justify-center gap-2 transition-all uppercase text-[10px] md:text-xs tracking-widest text-center group">
                        <Download className="w-4 h-4 md:w-5 md:h-5 shrink-0 group-hover:-translate-y-1 transition-transform" />
                        <span>Descargar <br className="md:hidden" /> PDF Completo</span>
                    </button>
                </div>

                {/* VISUALIZACIÓN WEB RESPONSIVA DE LOS RESULTADOS */}
                <div className="space-y-16">
                    {/* CARTA DE YELITZE */}
                    <div className="max-w-4xl mx-auto bg-white p-10 md:p-20 rounded-[3rem] shadow-xl border border-[#3C2A2105] relative space-y-8 font-editorial leading-relaxed">
                        <h4 className="text-[#8C4005] text-3xl md:text-4xl italic mb-8">Hola, {firstName}.</h4>
                        <div className="space-y-6 text-[#2D2926] text-lg md:text-xl opacity-90">
                            <p>Has dado el primer paso más valioso: detenerte a mirar. Lo que tienes ante ti no es solo un resumen, es el Plano Maestro de tu nueva realidad.</p>
                            <p>Este mapa que acabas de co-crear conmigo es tu brújula para el 2026. Es el primer paso de tu transformación sistémica porque, antes de construir los muros de tus sueños, necesitamos asegurar que los cimientos estén alineados con quien eres hoy.</p>
                            <p className="border-l-4 border-[#B8835A] pl-6 md:pl-8 italic font-bold my-10 text-xl md:text-2xl text-[#8C4005]">
                                "Restaura el orden, y el equilibrio llegará por añadidura."
                            </p>
                            <div className="pt-8 md:pt-12">
                                <p className="text-xs uppercase tracking-[0.3em] font-guide text-[#B8835A] font-bold mb-2">Con amor y certeza,</p>
                                <p className="text-2xl font-bold">YELITZE RANGEL</p>
                                <p className="text-[#B8835A] italic text-lg mt-1">Tu Coach Ancestral</p>
                            </div>
                        </div>
                    </div>

                    {/* TABLERO MAESTRO - WEB VIEW (Responsive) */}
                    <div className="max-w-6xl mx-auto bg-white p-8 md:p-16 rounded-[3rem] shadow-xl border border-[#3C2A2105] space-y-12">
                        <div className="text-center">
                            <p className="text-[#B8835A] font-bold tracking-widest text-xs uppercase mb-2">Diseño Visual 2026</p>
                            <h2 className="text-4xl md:text-5xl font-editorial text-[#2D2926]">Tablero Maestro</h2>
                        </div>
                        
                        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 md:gap-8">
                            {/* Centro (Soberanía) primero en móvil */}
                            <div className="order-first md:order-[3] w-48 h-48 md:w-56 md:h-56 bg-[#F9F7F2] border-2 border-[#B8835A] rounded-full flex flex-col items-center justify-center p-6 text-center shadow-lg transform hover:scale-105 transition-all">
                                <span className="text-[10px] text-[#B8835A] font-bold tracking-widest uppercase mb-2">SOBERANÍA</span>
                                <span className="text-lg md:text-2xl font-editorial italic text-[#2D2926]">{data.analysis?.identity || 'La Arquitecta'}</span>
                            </div>
                            
                            {/* Pilares */}
                            {data.pillars.map((p, i) => (
                                <div key={p.id} className="w-full sm:w-[320px] md:w-[260px] bg-[#F9F7F2] p-4 md:p-5 border border-[#B8835A30] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-[#8C4005] text-white text-[10px] text-center p-2 mb-4 font-bold rounded-lg uppercase tracking-wider">{p.title}</div>
                                    <div className="aspect-video w-full bg-white overflow-hidden rounded-xl mb-4 relative shadow-inner">
                                        {p.images && p.images.length > 0 && <img src={p.images[p.images.length - 1]} className="w-full h-full object-cover" alt={p.title} />}
                                    </div>
                                    <div className="text-sm font-bold text-center text-[#2D2926] mb-3 px-2 line-clamp-2">{p.title}</div>
                                    <div className="text-xs text-center text-[#8C4005] leading-relaxed italic line-clamp-3 bg-[#8C4005]/5 p-3 rounded-lg">{p.action}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PORTALES Y BITÁCORA */}
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                        {/* Portales */}
                        <div className="bg-[#F9F7F2] p-8 md:p-12 rounded-[3rem] space-y-8 shadow-inner border border-[#3C2A2105]">
                            <header>
                                <p className="text-[#B8835A] font-bold tracking-widest text-xs uppercase">PORTALES DE PODER</p>
                                <h3 className="text-3xl font-editorial mt-2 text-[#2D2926]">Reflexiones de Apertura</h3>
                            </header>
                            <div className="space-y-6">
                                {Object.entries(data.reflections).map(([id, text], idx) => (
                                    <div key={id} className="bg-white p-6 md:p-8 rounded-2xl border-l-4 border-[#B8835A] shadow-sm transform hover:-translate-y-1 transition-transform">
                                        <p className="text-[10px] text-[#B8835A] font-bold mb-3 uppercase tracking-widest">PORTAL 0{idx + 1}</p>
                                        <p className="text-[#2D2926] italic text-lg leading-relaxed">"{text}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bitácora / Pilares */}
                        <div className="space-y-6">
                            <div className="bg-transparent p-4">
                                <p className="text-[#B8835A] font-bold tracking-widest text-xs uppercase px-2">BITÁCORA DE OBRA</p>
                                <h3 className="text-3xl font-editorial text-[#2D2926] mt-2 px-2">Desglose de Pilares</h3>
                            </div>
                            {data.pillars.map((p, i) => (
                                <div key={p.id} className="bg-white p-8 rounded-3xl border border-[#3C2A2105] shadow-sm hover:shadow-md transition-shadow">
                                    <h4 className="text-[#8C4005] font-bold text-xl mb-6 flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-full bg-[#F9F7F2] flex items-center justify-center text-sm">{i + 1}</span> 
                                        {p.title.toUpperCase()}
                                    </h4>
                                    <div className="space-y-5">
                                        <p className="text-base"><span className="font-bold text-[#B8835A] block mb-1 text-xs tracking-wider">INTENCIÓN:</span> <span className="text-[#2D2926]">{p.intention}</span></p>
                                        <p className="text-base"><span className="font-bold text-[#B8835A] block mb-1 text-xs tracking-wider">DIRECCIÓN:</span> <span className="text-[#2D2926]">{p.direction}</span></p>
                                        <div className="bg-[#2D2926] p-6 rounded-2xl mt-4 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
                                            <p className="text-[10px] text-[#B8835A] font-bold tracking-widest mb-2 relative z-10">ACCIÓN MAESTRA</p>
                                            <p className="text-base font-bold text-[#F9F7F2] relative z-10">{p.action}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* MANIFIESTO Y YO SOY */}
                    <div className="bg-[#231916] p-10 md:p-20 rounded-[3rem] text-center space-y-16 shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[#8C4005]/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#8C4005]/20 via-transparent to-transparent"></div>
                        
                        <div className="space-y-6 relative z-10">
                            <p className="text-[#B8835A] font-bold tracking-[0.4em] text-xs uppercase">Yo Soy</p>
                            <h2 className="text-[#F9F7F2] text-xl sm:text-2xl md:text-4xl font-editorial italic px-4 md:px-16 leading-relaxed">
                                {yoSoy?.yo_soy || data.analysis?.identity || 'La Arquitecta de mi Realidad'}
                            </h2>
                        </div>

                        <div className="bg-[#B8835A20] backdrop-blur-sm border border-[#B8835A40] p-8 md:p-14 rounded-3xl mx-2 md:mx-12 relative z-10">
                            <p className="text-[#B8835A] font-guide text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-6">Mi Manifiesto 2026</p>
                            <p className="text-[#F9F7F2] text-lg md:text-2xl font-editorial opacity-95 leading-relaxed italic px-2">
                                {data.analysis?.manifesto || 'Declaro mi soberanía y orden sistémico...'}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 text-left md:px-12 relative z-10">
                            <div className="bg-[#2D2926]/50 p-8 rounded-3xl border border-white/5">
                                <p className="text-[#B8835A] font-bold text-xs uppercase tracking-[0.2em] mb-4">PASOS DE CONSTRUCCIÓN</p>
                                <ul className="text-[#F9F7F2] text-sm md:text-base space-y-3 opacity-80 leading-relaxed">
                                    {data.analysis?.guide_steps?.map((s, i) => <li key={i} className="flex gap-2"><Sparkles className="w-4 h-4 text-[#B8835A] shrink-0 mt-1"/> <span>{s}</span></li>)}
                                </ul>
                            </div>
                            <div className="bg-[#B8835A]/10 p-8 rounded-3xl border border-[#B8835A]/20">
                                <p className="text-[#B8835A] font-bold text-xs uppercase tracking-[0.2em] mb-4">RITUAL DIARIO</p>
                                <p className="text-[#F9F7F2] text-sm md:text-base opacity-90 leading-relaxed">
                                    {yoSoy?.decreto_diario || data.analysis?.practice}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* HIDDEN CONTAINER FOR PERFECT A4 PDF GENERATION */}
            {/* The width is strictly 800px so html2canvas ignores mobile screen width and mimics an A4 rendering */}
            <div data-pdf-content ref={pdfContentRef} className="hidden" style={{ width: '800px', backgroundColor: '#F9F7F2' }}>
                
                {/* PAGE 1: CARTA */}
                <div className="pdf-page-marker relative flex flex-col" style={{ backgroundColor: '#F9F7F2', minHeight: '1131px', pageBreakAfter: 'always' }}>
                    <div style={{ backgroundColor: '#231916', padding: '14px 0 10px' }}>
                        <img src="/assets/images/logo-yelitze-new.png" alt="Yelitze Rangel" style={{ height: '30px', margin: '0 auto', display: 'block', filter: 'brightness(0) invert(1)' }} />
                        <p style={{ color: '#B8835A', fontSize: '8px', textAlign: 'center', fontWeight: '700', letterSpacing: '0.3em', marginTop: '6px', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>TU COACH ANCESTRAL</p>
                    </div>
                    <div style={{ padding: '60px 80px', flex: 1, fontFamily: 'serif' }}>
                        <h3 style={{ color: '#8C4005', fontSize: '32px', fontStyle: 'italic', marginBottom: '30px' }}>Hola, {firstName}.</h3>
                        <div className="space-y-6 text-[#2D2926] text-lg leading-relaxed opacity-90">
                            <p>Has dado el primer paso más valioso: detenerte a mirar. Lo que tienes en tus manos no es solo un documento, es el Plano Maestro de tu nueva realidad.</p>
                            <p>Este mapa que acabas de co-crear conmigo es tu brújula para el 2026. Es el primer paso de tu transformación sistémica porque, antes de construir los muros de tus sueños, necesitamos asegurar que los cimientos estén alineados con quien eres hoy.</p>
                            <p className="border-l-4 border-[#B8835A] pl-8 italic font-bold text-xl text-[#8C4005] my-12">
                                "Restaura el orden, y el equilibrio llegará por añadidura."
                            </p>
                            <div className="pt-12">
                                <p className="text-[#B8835A] font-bold text-xs uppercase tracking-widest">Con amor y certeza,</p>
                                <p className="text-2xl mt-2 font-bold text-[#8C4005]">YELITZE RANGEL</p>
                                <p className="text-[#B8835A] italic text-sm">Tu Coach Ancestral</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: '20px 64px', borderTop: '1px solid rgba(184,131,90,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>YELITZE RANGEL • TU COACH ANCESTRAL • 2026</span>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>01 / 06</span>
                    </div>
                </div>

                {/* PAGE 2: TABLERO MAESTRO */}
                <div className="pdf-page-marker relative flex flex-col" style={{ backgroundColor: '#FFFFFF', minHeight: '1131px', pageBreakAfter: 'always' }}>
                    <div style={{ backgroundColor: '#231916', padding: '14px 0 10px' }}>
                        <img src="/assets/images/logo-yelitze-new.png" alt="Yelitze Rangel" style={{ height: '30px', margin: '0 auto', display: 'block', filter: 'brightness(0) invert(1)' }} />
                        <p style={{ color: '#B8835A', fontSize: '8px', textAlign: 'center', fontWeight: '700', letterSpacing: '0.3em', marginTop: '6px', textTransform: 'uppercase' }}>ARQUITECTURA DE VIDA INTENCIONAL</p>
                    </div>
                    <div style={{ padding: '40px 64px', flex: 1 }}>
                        <h2 className="text-center text-4xl font-editorial text-[#2D2926] mb-12 mt-8">Tablero Maestro</h2>
                        <div className="relative mx-auto mt-16" style={{ height: '600px', width: '600px' }}>
                            {/* Simple render of the 5 pillars in the grid positions explicitly optimized for 800px PDF container */}
                            {data.pillars.map((p, i) => (
                                <div key={p.id} className="absolute border border-[#B8835A30] bg-[#F9F7F2] p-2" 
                                     style={{ 
                                         width: '160px', height: '200px',
                                         left: i === 0 ? '50%' : i === 1 ? '5%' : i === 2 ? '65%' : i === 3 ? '15%' : '60%',
                                         top: i === 0 ? '5%' : i === 1 ? '35%' : i === 2 ? '35%' : i === 3 ? '65%' : '65%',
                                         transform: i === 0 ? 'translateX(-50%)' : 'none'
                                     }}>
                                    <div className="bg-[#8C4005] text-white text-[8px] text-center p-1 mb-1 font-bold">{p.title.toUpperCase()}</div>
                                    <div className="h-24 bg-white overflow-hidden">
                                        {p.images && p.images.length > 0 && <img src={p.images[p.images.length - 1]} className="w-full h-full object-cover" />}
                                    </div>
                                    <div className="mt-2 text-[10px] font-bold text-center text-[#2D2926] truncate">{p.title}</div>
                                    <div className="mt-1 text-[8px] text-center text-[#8C4005] leading-tight line-clamp-2">{p.action}</div>
                                </div>
                            ))}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#F9F7F2] border-2 border-[#B8835A] rounded-full flex flex-col items-center justify-center p-4 text-center">
                                <span className="text-[10px] text-[#B8835A] font-bold">SOBERANÍA</span>
                                <span className="text-xs font-editorial mt-1 italic text-[#2D2926] leading-snug">{data.analysis?.identity || 'La Arquitecta'}</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: '20px 64px', borderTop: '1px solid rgba(184,131,90,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>YELITZE RANGEL • TU COACH ANCESTRAL • 2026</span>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>02 / 06</span>
                    </div>
                </div>

                {/* PAGE 3: PORTALES */}
                <div className="pdf-page-marker relative flex flex-col" style={{ backgroundColor: '#F9F7F2', minHeight: '1131px', pageBreakAfter: 'always' }}>
                    <div className="p-16 flex-1 space-y-12 mt-10">
                        <header>
                            <p className="text-[#B8835A] font-bold tracking-widest text-xs">PORTALES DE PODER</p>
                            <h2 className="text-3xl font-editorial mt-2">Tus Reflexiones de Apertura</h2>
                        </header>
                        <div className="space-y-8">
                            {Object.entries(data.reflections).map(([id, text], idx) => (
                                <div key={id} className="bg-white p-8 border-l-4 border-[#B8835A] shadow-sm">
                                    <p className="text-[10px] text-[#B8835A] font-bold mb-2 lowercase tracking-widest">PORTAL 0{idx + 1}</p>
                                    <p className="text-[#2D2926] italic text-lg leading-relaxed">"{text}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ padding: '20px 64px', borderTop: '1px solid rgba(184,131,90,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>YELITZE RANGEL • TU COACH ANCESTRAL • 2026</span>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>03 / 06</span>
                    </div>
                </div>

                {/* PAGE 4: PILARES 1-3 */}
                <div className="pdf-page-marker relative flex flex-col" style={{ backgroundColor: '#FFFFFF', minHeight: '1131px', pageBreakAfter: 'always' }}>
                    <div className="p-16 flex-1 space-y-10 mt-10">
                        <header>
                            <p className="text-[#B8835A] font-bold tracking-widest text-xs">BITÁCORA DE OBRA I</p>
                            <h2 className="text-3xl font-editorial mt-2">Cimentación del Ser</h2>
                        </header>
                        <div className="space-y-6">
                            {data.pillars.slice(0, 3).map((p, i) => (
                                <div key={p.id} className="bg-[#F9F7F2] p-8 space-y-4">
                                    <h4 className="text-[#8C4005] font-bold text-xl">{i + 1}. {p.title.toUpperCase()}</h4>
                                    <div className="grid grid-cols-4 gap-4 text-sm">
                                        <div className="font-bold text-[#B8835A]">INTENCIÓN:</div>
                                        <div className="col-span-3 text-[#2D2926]">{p.intention}</div>
                                        <div className="font-bold text-[#B8835A]">DIRECCIÓN:</div>
                                        <div className="col-span-3 text-[#2D2926]">{p.direction}</div>
                                    </div>
                                    <div className="bg-[#2D2926] text-[#F9F7F2] p-4 mt-2">
                                        <p className="text-[10px] text-[#B8835A] font-bold tracking-widest mb-1">ACCIÓN MAESTRA</p>
                                        <p className="text-sm font-bold">{p.action}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ padding: '20px 64px', borderTop: '1px solid rgba(184,131,90,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>YELITZE RANGEL • TU COACH ANCESTRAL • 2026</span>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>04 / 06</span>
                    </div>
                </div>

                {/* PAGE 5: PILARES 4-5 + IDENTITY */}
                <div className="pdf-page-marker relative flex flex-col" style={{ backgroundColor: '#FFFFFF', minHeight: '1131px', pageBreakAfter: 'always' }}>
                    <div className="p-16 flex-1 space-y-10 mt-10">
                        <header>
                            <p className="text-[#B8835A] font-bold tracking-widest text-xs">BITÁCORA DE OBRA II</p>
                            <h2 className="text-3xl font-editorial mt-2">Expansión y Vitalidad</h2>
                        </header>
                        <div className="space-y-6">
                            {data.pillars.slice(3, 5).map((p, i) => (
                                <div key={p.id} className="bg-[#F9F7F2] p-8 space-y-4">
                                    <h4 className="text-[#8C4005] font-bold text-xl">{i + 4}. {p.title.toUpperCase()}</h4>
                                    <div className="grid grid-cols-4 gap-4 text-sm">
                                        <div className="font-bold text-[#B8835A]">INTENCIÓN:</div>
                                        <div className="col-span-3 text-[#2D2926]">{p.intention}</div>
                                        <div className="font-bold text-[#B8835A]">DIRECCIÓN:</div>
                                        <div className="col-span-3 text-[#2D2926]">{p.direction}</div>
                                    </div>
                                    <div className="bg-[#2D2926] text-[#F9F7F2] p-4 mt-2">
                                        <p className="text-[10px] text-[#B8835A] font-bold tracking-widest mb-1">ACCIÓN MAESTRA</p>
                                        <p className="text-sm font-bold">{p.action}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ padding: '20px 64px', borderTop: '1px solid rgba(184,131,90,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>YELITZE RANGEL • TU COACH ANCESTRAL • 2026</span>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>05 / 06</span>
                    </div>
                </div>

                {/* PAGE 6: MANIFIESTO */}
                <div className="pdf-page-marker relative flex flex-col" style={{ backgroundColor: '#231916', minHeight: '1131px', pageBreakAfter: 'always' }}>
                    <div className="p-16 flex-1 flex flex-col justify-center text-center space-y-12">
                        <div className="space-y-4">
                            <p className="text-[#B8835A] font-bold tracking-[0.4em] text-xs uppercase">Yo Soy</p>
                            {/* Ajustamos a text-2xl/xl para que no colapse con el largo del texto AI en el PDF */}
                            <h2 className="text-[#F9F7F2] text-xl font-editorial italic px-12 leading-relaxed">
                                {yoSoy?.yo_soy || data.analysis?.identity || 'La Arquitecta de mi Realidad'}
                            </h2>
                        </div>
                        <div className="bg-[#B8835A20] border border-[#B8835A40] p-10 mx-8">
                            <p className="text-[#B8835A] font-guide text-[10px] uppercase tracking-widest mb-4">MI MANIFIESTO 2026</p>
                            <p className="text-[#F9F7F2] text-xl font-editorial opacity-90 leading-relaxed italic">
                                {data.analysis?.manifesto || 'Declaro mi soberanía y orden sistémico...'}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 text-left px-8">
                            <div className="space-y-2">
                                <p className="text-[#B8835A] font-bold text-[8px] uppercase tracking-widest">PASOS DE CONSTRUCCIÓN</p>
                                <ul className="text-[#F9F7F2] text-[10px] space-y-1 opacity-70">
                                    {data.analysis?.guide_steps?.map((s, i) => <li key={i}>• {s}</li>)}
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[#B8835A] font-bold text-[8px] uppercase tracking-widest">RITUAL DIARIO</p>
                                <p className="text-[#F9F7F2] text-[10px] opacity-70">
                                    {yoSoy?.decreto_diario || data.analysis?.practice}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: '20px 64px', borderTop: '1px solid rgba(184,131,90,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>YELITZE RANGEL • TU COACH ANCESTRAL • 2026</span>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>06 / 06</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ArchitecturalCard({ pillar, label, small, printMode }: { pillar: any, label: string, small?: boolean, printMode?: boolean }) {
    if (!pillar) return null;
    return <div className="p-4 border border-[#B8835A20]">{label}</div>;
}
