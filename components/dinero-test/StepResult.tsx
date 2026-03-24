'use client';

import { motion } from 'framer-motion';
import { Download, RefreshCw, FileText, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface StepResultProps {
    resultData: {
        screen_message: string;
        ritual?: string;
        mantra?: string;
        pdf_content: string;
    };
    userName: string;
    onFinalize: () => void;
}

export default function StepResult({ resultData, userName, onFinalize }: StepResultProps) {
    const pdfRef = useRef<HTMLDivElement>(null);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    const firstName = userName.split(' ')[0];

    const handleDownloadPDF = async () => {
        if (!pdfRef.current) return;
        setIsGeneratingPdf(true);
        try {
            await document.fonts.ready;
            const element = pdfRef.current;
            element.style.display = 'block';

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: false,
                backgroundColor: '#ffffff',
            });

            element.style.display = 'none';

            const imgData = canvas.toDataURL('image/jpeg', 0.9);
            const pdf = new jsPDF({ orientation: 'p', unit: 'px', format: [canvas.width, canvas.height] });
            pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
            pdf.save(`Creencias_Dinero_YelitzeRangel.pdf`);
        } catch (error) {
            console.error('Error generating PDF', error);
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto space-y-16 pb-20"
        >
            {/* Dark header card */}
            <div className="bg-[#2D2926] text-[#F9F7F2] p-8 rounded-[2rem] border border-[#B8835A30] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#B8835A] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 bg-[#B8835A] text-[#2D2926] rounded-full flex items-center justify-center shadow-inner shrink-0">
                        <Sparkles className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="font-editorial text-2xl md:text-3xl text-white">¡Diagnóstico Listo, {firstName}!</h3>
                        <p className="text-[#B8835A] font-guide text-[10px] uppercase tracking-[0.3em] font-bold mt-1">
                            Tu mapa de creencias sobre el dinero está completo
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4 relative z-10">
                    <button
                        onClick={handleDownloadPDF}
                        disabled={isGeneratingPdf}
                        className="px-6 py-3 rounded-xl bg-[#B8835A] text-[#2D2926] hover:bg-[#D4AF37] font-bold shadow-lg flex items-center gap-2 transition-all uppercase text-[10px] tracking-widest whitespace-nowrap disabled:opacity-70 disabled:cursor-wait"
                    >
                        {isGeneratingPdf
                            ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Preparando...</>
                            : <><Download className="w-3.5 h-3.5" /> Descargar PDF</>}
                    </button>
                </div>
            </div>

            {/* Letter card */}
            <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[3rem] shadow-xl border border-[#3C2A2105] relative space-y-8 font-editorial leading-relaxed">
                <div className="absolute top-12 left-12 opacity-5">
                    <FileText className="w-32 h-32" />
                </div>
                <h4 className="text-[#8C4005] text-3xl italic mb-12 relative z-10">Hola, {firstName}.</h4>
                <div className="space-y-6 text-[#2D2926] text-lg md:text-xl opacity-90 relative z-10">
                    <ReactMarkdown components={{
                        p: ({ ...props }) => <p className="mb-6 leading-relaxed" {...props} />,
                        strong: ({ ...props }) => <strong className="font-bold text-[#8C4005]" {...props} />,
                    }}>
                        {resultData.screen_message}
                    </ReactMarkdown>

                    {resultData.ritual && (
                        <div className="bg-[#F9F7F2] p-8 rounded-2xl border border-[#B8835A10]">
                            <h5 className="text-[#8C4005] font-bold text-sm uppercase tracking-widest font-guide mb-4">Ritual Sugerido</h5>
                            <p className="italic leading-relaxed">{resultData.ritual}</p>
                        </div>
                    )}

                    {resultData.mantra && (
                        <p className="text-[#8C4005] font-bold italic border-l-4 border-[#B8835A] pl-8 my-8 text-2xl">
                            &ldquo;{resultData.mantra}&rdquo;
                        </p>
                    )}

                    <div className="pt-12 border-t border-[#B8835A20]">
                        <p className="text-sm uppercase tracking-[0.3em] font-guide text-[#B8835A] font-bold">Con amor y certeza,</p>
                        <p className="text-2xl mt-2">YELITZE RANGEL</p>
                        <p className="text-[#B8835A] text-sm italic">Tu Coach Ancestral</p>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <button onClick={onFinalize} className="text-sm text-[#B8835A]/60 underline hover:text-[#8C4005] transition-colors font-guide">
                    Finalizar experiencia
                </button>
            </div>

            {/* HIDDEN PDF TEMPLATE */}
            <div className="absolute top-0 left-[-9999px]">
                <div ref={pdfRef} className="bg-white overflow-hidden" style={{ width: '800px', display: 'none' }}>
                    {/* Dark header band */}
                    <div style={{ backgroundColor: '#231916', padding: '16px 0 12px' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/assets/images/logo-yelitze-new.png" alt="Yelitze Rangel" style={{ height: '36px', margin: '0 auto', display: 'block' }} />
                        <p style={{ color: '#B8835A', fontSize: '9px', textAlign: 'center', fontWeight: '700', letterSpacing: '0.3em', marginTop: '8px', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
                            TU COACH ANCESTRAL
                        </p>
                    </div>
                    <div style={{ height: '3px', backgroundColor: '#B8835A' }} />

                    {/* Watermark */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', opacity: 0.03, zIndex: 0 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/assets/images/watermark-logo.png" alt="" style={{ width: '500px', height: '500px', objectFit: 'contain' }} />
                    </div>

                    <div style={{ position: 'relative', zIndex: 1, padding: '48px 80px' }}>
                        <div style={{ borderBottom: '1px solid rgba(184,131,90,0.3)', paddingBottom: '24px', marginBottom: '40px' }}>
                            <p style={{ color: '#B8835A', fontSize: '10px', fontWeight: '700', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '6px' }}>
                                Carta del Alma · Creencias sobre el Dinero
                            </p>
                            <p style={{ color: '#8C4005', fontSize: '14px', fontStyle: 'italic' }}>
                                Preparado para: <strong>{userName}</strong>
                            </p>
                        </div>

                        <div className="prose prose-xl max-w-none text-gray-700 leading-relaxed space-y-6 font-serif">
                            <ReactMarkdown>{resultData.pdf_content}</ReactMarkdown>
                        </div>

                        {resultData.ritual && (
                            <div style={{ marginTop: '32px', padding: '24px 32px', backgroundColor: 'rgba(140,64,5,0.05)', borderRadius: '12px', borderLeft: '4px solid #8C4005' }}>
                                <p style={{ color: '#8C4005', fontSize: '10px', fontWeight: '700', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '8px' }}>Ritual Sugerido</p>
                                <p style={{ color: '#2D2926', fontStyle: 'italic', fontSize: '16px', lineHeight: '1.6' }}>{resultData.ritual}</p>
                            </div>
                        )}

                        {resultData.mantra && (
                            <div style={{ margin: '32px 0', padding: '24px 32px', borderLeft: '4px solid #B8835A' }}>
                                <p style={{ color: '#B8835A', fontSize: '10px', fontWeight: '700', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '8px' }}>Tu Mantra de Abundancia</p>
                                <p style={{ color: '#8C4005', fontSize: '22px', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>&ldquo;{resultData.mantra}&rdquo;</p>
                            </div>
                        )}

                        <div style={{ marginTop: '48px', padding: '28px 32px', border: '1px solid rgba(184,131,90,0.4)', borderRadius: '12px', textAlign: 'center' }}>
                            <p style={{ color: '#8C4005', fontSize: '15px', marginBottom: '8px' }}>¿Lista para desbloquear tu abundancia?</p>
                            <p style={{ color: '#B8835A', fontSize: '11px', fontFamily: 'sans-serif', letterSpacing: '0.1em' }}>yelitzerangeloficial.com</p>
                        </div>

                        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(184,131,90,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <p style={{ color: '#9CA3AF', fontSize: '11px', fontFamily: 'sans-serif' }}>Guía espiritual · No sustituye asesoría financiera</p>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ color: '#B8835A', fontSize: '16px', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Yelitze Rangel</p>
                                <p style={{ color: '#9CA3AF', fontSize: '9px', fontFamily: 'sans-serif', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '2px' }}>Tu Coach Ancestral</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
