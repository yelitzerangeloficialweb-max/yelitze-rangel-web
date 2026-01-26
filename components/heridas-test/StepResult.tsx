'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, RefreshCw, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface StepResultProps {
    resultData: {
        screen_message: string;
        pdf_content: string;
        email_subject: string;
        email_body: string;
    };
    onFinalize: () => void;
}

export default function StepResult({ resultData, onFinalize }: StepResultProps) {
    const pdfRef = useRef<HTMLDivElement>(null);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    const handleDownloadPDF = async () => {
        if (!pdfRef.current) return;
        setIsGeneratingPdf(true);

        try {
            // Force fonts load (optional but recommended)
            await document.fonts.ready;

            const element = pdfRef.current;
            element.style.display = 'block'; // Temporarily show for capture

            const canvas = await html2canvas(element, {
                scale: 2, // Higher resolution
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            element.style.display = 'none'; // Hide again

            const imgData = canvas.toDataURL('image/jpeg', 0.9);
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeight);
            pdf.save(`Resultado_YelitzeRangel.pdf`);

        } catch (error) {
            console.error("Error generating PDF", error);
            alert("Hubo un error generando el PDF. Por favor intenta de nuevo.");
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto px-4 pb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
                {/* Chat Header */}
                <div className="bg-[var(--color-primary)] p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-white/30 overflow-hidden relative">
                        {/* Placeholder for Yelitze avatar or Logo */}
                        <div className="absolute inset-0 bg-[var(--color-secondary)] flex items-center justify-center text-white font-bold text-lg">YR</div>
                    </div>
                    <div>
                        <h3 className="text-white font-bold">Yelitzé Rangel</h3>
                        <p className="text-white/70 text-xs flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            En línea ahora
                        </p>
                    </div>
                </div>

                {/* Chat Body */}
                <div className="p-6 md:p-10 bg-gray-50 min-h-[400px] space-y-8">
                    {/* Simulated Message Bubble */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex gap-4"
                    >
                        <div className="w-8 h-8 rounded-full bg-[var(--color-secondary)] flex-shrink-0 flex items-center justify-center text-white text-xs mt-1">YR</div>
                        <div className="bg-white p-6 rounded-2xl rounded-tl-none shadow-sm text-gray-700 leading-relaxed border border-gray-100 max-w-[90%]">
                            <div className="prose prose-stone prose-p:mb-4 prose-headings:text-[var(--color-primary)] prose-strong:text-[var(--color-secondary)]">
                                <ReactMarkdown>
                                    {resultData.screen_message}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-white border-t border-gray-100 flex flex-col items-center gap-4">
                    <button
                        onClick={handleDownloadPDF}
                        disabled={isGeneratingPdf}
                        className="w-full md:w-auto px-8 py-4 bg-[var(--color-secondary)] text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-amber-600 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                    >
                        {isGeneratingPdf ? (
                            <>
                                <RefreshCw className="w-5 h-5 animate-spin" /> Generando PDF...
                            </>
                        ) : (
                            <>
                                Descargar mi Resultado (PDF)
                                <Download className="w-5 h-5" />
                            </>
                        )}
                    </button>

                    <button onClick={onFinalize} className="text-sm text-gray-400 underline hover:text-[var(--color-primary)]">
                        Continuar sin descargar
                    </button>
                </div>
            </motion.div>

            {/* HIDDEN PDF TEMPLATE */}
            <div className="absolute top-0 left-[-9999px]">
                <div ref={pdfRef} className="w-[800px] bg-white p-16 text-[#2C3E50] font-sans relative">
                    {/* Header */}
                    <div className="border-b-2 border-[#D4AF37] pb-8 mb-8 flex justify-between items-end">
                        <div>
                            <h1 className="text-4xl font-heading text-[var(--color-primary)] mb-2">Heridas de la Infancia</h1>
                            <p className="text-sm uppercase tracking-widest text-[#D4AF37] font-bold">Informe de Autoconocimiento</p>
                        </div>
                        <div className="text-right">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xs mb-2 ml-auto">YR</div>
                            <p className="text-xs text-gray-400">Yelitzé Rangel</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                        <ReactMarkdown>
                            {resultData.pdf_content}
                        </ReactMarkdown>
                    </div>

                    {/* Footer */}
                    <div className="mt-16 pt-8 border-t border-gray-100 text-center">
                        <p className="text-xs text-gray-400 uppercase tracking-[0.4em]">Anatomía del Alma · 2026</p>
                        <p className="text-[10px] text-gray-300 mt-2">Este documento es una guía espiritual, no un diagnóstico clínico.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
