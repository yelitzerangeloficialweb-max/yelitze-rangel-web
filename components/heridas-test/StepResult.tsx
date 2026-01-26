'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, RefreshCw, Sparkles, Feather, Quote } from 'lucide-react';
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
        email_subject: string;
        email_body: string;
    };
    userName: string;
    onFinalize: () => void;
}

export default function StepResult({ resultData, userName, onFinalize }: StepResultProps) {
    const pdfRef = useRef<HTMLDivElement>(null);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

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
                logging: false,
                backgroundColor: '#ffffff'
            });

            element.style.display = 'none';

            const imgData = canvas.toDataURL('image/jpeg', 0.9);
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeight);
            pdf.save(`Heridas_Infancia_YelitzeRangel.pdf`);

        } catch (error) {
            console.error("Error generating PDF", error);
            alert("Hubo un error generando el PDF.");
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 pb-24 font-sans">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
            >
                {/* Paper Container */}
                <div className="bg-[#FAF9F6] relative rounded-sm shadow-2xl overflow-hidden">

                    {/* Top Torn Paper Effect (CSS Mask or Image trick, simulating with border/shadow here) */}
                    <div className="h-4 bg-[var(--color-primary)]/10 w-full absolute top-0 left-0" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)' }}></div>

                    <div className="p-8 md:p-16 pt-20">
                        {/* Header Branding */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] mb-4">
                                <Feather className="w-8 h-8" />
                            </div>
                            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-[var(--color-primary)] mb-2">Carta del Alma</h2>
                            <div className="w-12 h-0.5 bg-[var(--color-secondary)] mx-auto opacity-50"></div>
                        </div>

                        {/* Main Content */}
                        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-serif">
                            {/* Force Greeting Style */}
                            <div className="first-letter:text-5xl first-letter:font-heading first-letter:text-[var(--color-primary)] first-letter:float-left first-letter:mr-3">
                                <ReactMarkdown components={{
                                    p: ({ node, ...props }) => <p className="mb-6" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-bold text-[var(--color-primary)]" {...props} />
                                }}>
                                    {resultData.screen_message}
                                </ReactMarkdown>
                            </div>
                        </div>

                        {/* Ritual Section */}
                        {resultData.ritual && (
                            <div className="my-12 p-8 bg-[var(--color-primary)]/5 rounded-2xl border border-[var(--color-primary)]/10 relative">
                                <Sparkles className="absolute top-6 left-6 w-6 h-6 text-[var(--color-secondary)] opacity-50" />
                                <h3 className="text-center font-heading text-2xl text-[var(--color-primary)] mb-6">Ritual Sugerido</h3>
                                <p className="text-center text-gray-600 italic leading-relaxed max-w-lg mx-auto">
                                    {resultData.ritual}
                                </p>
                            </div>
                        )}

                        {/* Mantra Box */}
                        {resultData.mantra && (
                            <div className="relative py-12 px-8 text-center mt-12 mb-8">
                                <Quote className="w-12 h-12 text-[var(--color-secondary)]/20 absolute top-0 left-1/2 -translate-x-1/2" />
                                <div className="border-t border-b border-[var(--color-secondary)]/30 py-8">
                                    <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-[var(--color-secondary)] mb-4">Tu Mantra de Sanación</h4>
                                    <p className="text-2xl md:text-3xl font-heading text-[var(--color-primary)] italic leading-snug">
                                        "{resultData.mantra}"
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Signature */}
                        <div className="text-right mt-16 pt-8 border-t border-gray-100/50">
                            <p className="font-heading text-2xl text-[var(--color-secondary)]">Yelitzé Rangel</p>
                            <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">Facilitadora de Procesos de Vida</p>
                        </div>
                    </div>

                    {/* Bottom Torn Paper Effect */}
                    <div className="h-4 bg-white w-full absolute bottom-0 left-0 transform rotate-180" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)' }}></div>
                </div>

                {/* Actions */}
                <div className="mt-12 flex flex-col items-center gap-6">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDownloadPDF}
                        disabled={isGeneratingPdf}
                        className="px-10 py-5 bg-[var(--color-primary)] text-white text-lg rounded-full font-bold shadow-xl hover:shadow-2xl hover:bg-[var(--color-primary-light)] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-wait min-w-[300px]"
                    >
                        {isGeneratingPdf ? (
                            <>
                                <RefreshCw className="w-5 h-5 animate-spin" /> Preparando tu carta...
                            </>
                        ) : (
                            <>
                                Descargar Carta en PDF
                                <Download className="w-5 h-5" />
                            </>
                        )}
                    </motion.button>

                    <button onClick={onFinalize} className="text-sm text-gray-400 underline hover:text-[var(--color-primary)] transition-colors">
                        Finalizar experiencia
                    </button>
                </div>
            </motion.div>

            {/* HIDDEN PDF TEMPLATE (Kept simple/clean for print) */}
            <div className="absolute top-0 left-[-9999px]">
                <div ref={pdfRef} className="w-[800px] bg-white p-20 text-[#2C3E50] font-sans relative">
                    {/* Header */}
                    <div className="border-b-2 border-[#D4AF37]/20 pb-8 mb-12 flex justify-between items-center">
                        <div className="flex-1">
                            <h1 className="text-4xl font-heading text-[var(--color-primary)] mb-2">Heridas de la Infancia</h1>
                            <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-2">Informe de Autoconocimiento</p>
                            <p className="text-sm text-gray-400 font-serif italic">Preparado con amor para: <strong className="text-[var(--color-primary)]">{userName}</strong></p>
                        </div>
                        <div className="w-48">
                            <img
                                src="/assets/images/logo-color-scroll.png"
                                alt="Yelitze Rangel"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-xl max-w-none text-gray-700 leading-relaxed space-y-6 font-serif">
                        <ReactMarkdown>{resultData.pdf_content}</ReactMarkdown>
                    </div>

                    {resultData.mantra && (
                        <div className="mt-12 p-8 bg-[#FAF9F6] border-l-4 border-[#D4AF37] text-center rounded-r-xl">
                            <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">Mantra de Sanación</p>
                            <p className="text-2xl font-heading text-[var(--color-primary)] italic">"{resultData.mantra}"</p>
                        </div>
                    )}

                    {/* Booking CTA (Visual Button for PDF) */}
                    <div className="mt-16 mb-8 text-center p-8 border border-dashed border-[#D4AF37]/50 rounded-xl bg-[#FFFBF0]">
                        <p className="text-lg text-[var(--color-primary)] font-medium mb-4">¿Sientes el llamado a profundizar en tu sanación?</p>
                        <div className="inline-block bg-[var(--color-secondary)] text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm shadow-md">
                            Reservar Sesión de Acompañamiento
                        </div>
                        <p className="text-xs text-gray-500 mt-3 font-mono">Agenda tu espacio en: <span className="text-[var(--color-primary)]">www.yelitzerangel.com/reservas</span></p>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-end">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-1">Anatomía del Alma</p>
                            <p className="text-[10px] text-gray-300">Guía espiritual · No sustituye terapia clínica</p>
                        </div>
                        <div className="text-right">
                            <p className="text-base font-bold text-[var(--color-secondary)] font-heading">Yelitzé Rangel</p>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">www.yelitzerangel.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
