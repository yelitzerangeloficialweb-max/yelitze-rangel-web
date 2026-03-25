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
                if (!page.classList.contains('min-h-[1120px]')) continue;
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
        <div className="max-w-7xl mx-auto space-y-16 pb-20">
            <div className="no-print space-y-8">
                <div className="bg-[#2D2926] text-[#F9F7F2] p-8 rounded-[2rem] border border-[#B8835A30] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-visible">
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-16 h-16 bg-[#B8835A] text-[#2D2926] rounded-full flex items-center justify-center">
                            <Sparkles className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="font-editorial text-2xl md:text-3xl text-white">¡Diseño Finalizado, {firstName}!</h3>
                            <p className="text-[#B8835A] font-guide text-[10px] uppercase tracking-[0.3em] font-bold mt-1">Tu arquitectura de vida está lista</p>
                        </div>
                    </div>
                    <button onClick={handleDownloadPDF} className="px-8 py-4 rounded-xl bg-[#B8835A] text-[#2D2926] hover:bg-[#D4AF37] font-bold shadow-lg flex items-center gap-3 transition-all uppercase text-[11px] tracking-[0.2em] whitespace-nowrap group">
                        <Download className="w-4 h-4 group-hover:-translate-y-1" /> descargar arquitectura Intencional en PDF
                    </button>
                </div>

                <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[3rem] shadow-xl border border-[#3C2A2105] relative space-y-8 font-editorial leading-relaxed">
                    <h4 className="text-[#8C4005] text-3xl italic mb-12">Hola, {firstName}.</h4>
                    <div className="space-y-6 text-[#2D2926] text-lg md:text-xl opacity-90">
                        <p>Has dado el primer paso más valioso: detenerte a mirar...</p>
                        <p className="text-[#8C4005] font-bold italic border-l-4 border-[#B8835A] pl-8 my-12 text-2xl">
                            "Restaura el orden, y el equilibrio llegará por añadidura."
                        </p>
                        <div className="pt-12">
                            <p className="text-sm uppercase tracking-[0.3em] font-guide text-[#B8835A] font-bold">Con amor y certeza,</p>
                            <p className="text-2xl mt-2">YELITZE RANGEL • TU COACH ANCESTRAL</p>
                        </div>
                    </div>
                </div>
            </div>

            <div data-pdf-content ref={pdfContentRef} className="overflow-hidden hidden" style={{ width: '210mm', backgroundColor: '#F9F7F2' }}>
                {/* PAGE 1: CARTA */}
                <div className="min-h-[1120px] relative flex flex-col" style={{ backgroundColor: '#F9F7F2', pageBreakAfter: 'always' }}>
                    <div style={{ backgroundColor: '#231916', padding: '14px 0 10px' }}>
                        <img src="/assets/images/logo-yelitze-new.png" alt="Yelitze Rangel" style={{ height: '30px', margin: '0 auto', display: 'block' }} />
                        <p style={{ color: '#B8835A', fontSize: '8px', textAlign: 'center', fontWeight: '700', letterSpacing: '0.3em', marginTop: '6px', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>TU COACH ANCESTRAL</p>
                    </div>
                    <div style={{ height: '3px', backgroundColor: '#B8835A' }} />
                    <div style={{ padding: '40px 64px', flex: 1, fontFamily: 'serif' }}>
                        <h3 style={{ color: '#8C4005', fontSize: '30px', fontStyle: 'italic', marginBottom: '20px' }}>Hola, {firstName}.</h3>
                        <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '20px' }}>Has dado el primer paso...</p>
                    </div>
                    <div style={{ padding: '10px 64px', borderTop: '1px solid rgba(184,131,90,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>YELITZE RANGEL • TU COACH ANCESTRAL • 2026</span>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>01 / {totalPages}</span>
                    </div>
                </div>

                {/* PAGE 2: TABLERO */}
                <div className="min-h-[1120px] relative flex flex-col" style={{ backgroundColor: '#FFFFFF', pageBreakAfter: 'always' }}>
                    <div style={{ backgroundColor: '#231916', padding: '14px 0 10px' }}>
                        <img src="/assets/images/logo-yelitze-new.png" alt="Yelitze Rangel" style={{ height: '30px', margin: '0 auto', display: 'block' }} />
                        <p style={{ color: '#B8835A', fontSize: '8px', textAlign: 'center', fontWeight: '700', letterSpacing: '0.3em', marginTop: '6px', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>ARQUITECTURA DE VIDA INTENCIONAL • TU COACH ANCESTRAL</p>
                    </div>
                    <div style={{ height: '3px', backgroundColor: '#B8835A' }} />
                    <div style={{ padding: '40px 64px', flex: 1 }}>
                        <h2 style={{ textAlign: 'center', fontSize: '36px' }}>Diseño de Realidad</h2>
                    </div>
                    <div style={{ padding: '10px 64px', borderTop: '1px solid rgba(184,131,90,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>YELITZE RANGEL • TU COACH ANCESTRAL • 2026</span>
                        <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>02 / {totalPages}</span>
                    </div>
                </div>

                {/* YO SOY PAGE */}
                {yoSoy && (
                    <div className="min-h-[1120px] relative flex flex-col" style={{ backgroundColor: '#231916', pageBreakAfter: 'always' }}>
                        <div style={{ backgroundColor: '#231916', padding: '14px 0 10px', borderBottom: '3px solid #B8835A' }}>
                            <img src="/assets/images/logo-yelitze-new.png" alt="Yelitze Rangel" style={{ height: '30px', margin: '0 auto', display: 'block', filter: 'brightness(0) invert(1)' }} />
                            <p style={{ color: '#B8835A', fontSize: '8px', textAlign: 'center', fontWeight: '700', letterSpacing: '0.3em', marginTop: '6px', textTransform: 'uppercase' }}>DECLARACIÓN DE IDENTIDAD • TU COACH ANCESTRAL</p>
                        </div>
                        <div style={{ flex: 1, padding: '40px 64px', textAlign: 'center', color: '#F9F7F2' }}>
                            <h2 style={{ fontSize: '72px', fontStyle: 'italic', color: '#B8835A' }}>YO SOY</h2>
                            <p style={{ fontSize: '24px', fontStyle: 'italic' }}>{yoSoy.yo_soy}</p>
                        </div>
                        <div style={{ padding: '10px 64px', borderTop: '1px solid rgba(184,131,90,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>YELITZE RANGEL • TU COACH ANCESTRAL • 2026</span>
                            <span className="font-guide text-[#B8835A]" style={{ fontSize: '9px' }}>{totalPages - 1} / {totalPages}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function ArchitecturalCard({ pillar, label, small, printMode }: { pillar: any, label: string, small?: boolean, printMode?: boolean }) {
    if (!pillar) return null;
    return <div className="p-4 border border-[#B8835A20]">{label}</div>;
}
