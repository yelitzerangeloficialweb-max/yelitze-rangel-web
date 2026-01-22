'use client';

import { useRef } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Download, FileText, ChevronDown, ChevronRight } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useState } from 'react';

interface Result {
    id: string;
    createdAt: Date;
    testTitle: string;
    score: number;
    maxScore: number;
    answers: string;
    aiAnalysis: string;
    userEmail: string | null;
    userName: string | null;
}

interface GroupedResults {
    [key: string]: Result[];
}

export default function AdminResponsesList({ groupedResults }: { groupedResults: GroupedResults }) {
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
        Object.keys(groupedResults).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    const pdfRef = useRef<HTMLDivElement>(null);
    const [generatingId, setGeneratingId] = useState<string | null>(null);

    const toggleGroup = (title: string) => {
        setExpandedGroups(prev => ({ ...prev, [title]: !prev[title] }));
    };

    const downloadPDF = async (result: Result) => {
        setGeneratingId(result.id);

        // Short timeout to ensure the PDF content is rendered in the hidden container
        setTimeout(async () => {
            const element = document.getElementById(`pdf-content-${result.id}`);
            if (!element) {
                setGeneratingId(null);
                return;
            }

            try {
                await document.fonts.ready;
                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: '#ffffff'
                });

                const imgData = canvas.toDataURL('image/jpeg', 1.0);
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const imgWidth = pdfWidth;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
                pdf.save(`Reporte_${result.testTitle.replace(/\s+/g, '_')}_${result.userName?.replace(/\s+/g, '_') || 'Anonimo'}.pdf`);
            } catch (error) {
                console.error('Error generating PDF:', error);
            } finally {
                setGeneratingId(null);
            }
        }, 100);
    };

    return (
        <div className="space-y-12">
            {Object.entries(groupedResults).map(([title, results]) => (
                <div key={title} className="space-y-4">
                    <button
                        onClick={() => toggleGroup(title)}
                        className="flex items-center gap-3 w-full text-left border-b-2 border-[var(--color-primary)]/10 pb-2 group"
                    >
                        {expandedGroups[title] ?
                            <ChevronDown className="w-6 h-6 text-[var(--color-primary)]" /> :
                            <ChevronRight className="w-6 h-6 text-[var(--color-primary)]" />
                        }
                        <h2 className="text-2xl font-heading text-[var(--color-primary)]">
                            {title}
                            <span className="ml-3 text-sm font-sans font-normal text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                                {results.length} respuestas
                            </span>
                        </h2>
                    </button>

                    {expandedGroups[title] && (
                        <div className="grid gap-6">
                            {results.map((result) => {
                                const answersObj = JSON.parse(result.answers);
                                const isVisionBoard = result.testTitle === "Arquitectura de Vida";

                                return (
                                    <div key={result.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative">
                                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4 border-b border-gray-100 pb-4">
                                            <div>
                                                <h3 className="font-bold text-[var(--color-primary)] text-lg">
                                                    {result.userName || 'Usuario Anónimo'}
                                                </h3>
                                                <div className="text-sm text-gray-500 flex flex-col sm:flex-row sm:gap-4 mt-1">
                                                    <span>{result.userEmail || 'Sin correo registrado'}</span>
                                                    <span className="hidden sm:inline text-gray-300">•</span>
                                                    <span className="capitalize">
                                                        {format(new Date(result.createdAt), "EEEE d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {!isVisionBoard && (
                                                    <div className="bg-[var(--color-secondary)]/10 px-4 py-2 rounded-lg text-center min-w-[100px]">
                                                        <span className="text-[10px] text-[var(--color-secondary)] font-bold uppercase block">Puntaje</span>
                                                        <span className="text-[var(--color-primary)] font-bold text-lg">
                                                            {result.score} <span className="text-xs text-gray-400">/ {result.maxScore}</span>
                                                        </span>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => downloadPDF(result)}
                                                    disabled={generatingId === result.id}
                                                    className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-xl text-sm font-bold hover:bg-opacity-90 transition-all disabled:opacity-50"
                                                >
                                                    {generatingId === result.id ? (
                                                        <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                                                    ) : (
                                                        <Download className="w-4 h-4" />
                                                    )}
                                                    PDF
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div>
                                                <h4 className="font-bold text-gray-800 mb-3 text-[10px] uppercase tracking-wider text-[var(--color-secondary)]">Respuestas</h4>
                                                <div className="bg-gray-50 p-4 rounded-xl text-sm max-h-60 overflow-y-auto">
                                                    {isVisionBoard ? (
                                                        <div className="space-y-4">
                                                            <div>
                                                                <p className="font-bold text-[10px] text-gray-400 uppercase mb-2">Reflexiones</p>
                                                                {answersObj.reflections && Object.entries(answersObj.reflections).map(([id, text]: any) => (
                                                                    <div key={id} className="mb-2">
                                                                        <span className="font-bold text-[var(--color-primary)] text-[10px] uppercase">{id}:</span>
                                                                        <p className="text-gray-600 text-xs italic leading-tight">{text}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="border-t border-gray-200 pt-2">
                                                                <p className="font-bold text-[10px] text-gray-400 uppercase mb-2">Pilares</p>
                                                                {answersObj.pillars && (answersObj.pillars as any[]).map((p, i) => (
                                                                    <div key={i} className="text-xs text-gray-600 mb-1">
                                                                        <span className="font-bold text-[var(--color-primary)]">{p.title}:</span> {p.intention}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        Object.entries(answersObj).map(([qId, val]) => (
                                                            <div key={qId} className="flex justify-between border-b border-gray-100 py-1 last:border-0">
                                                                <span className="text-gray-600">Pregunta {qId}:</span>
                                                                <span className="font-bold text-[var(--color-primary)]">Opción {String(val)}</span>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="font-bold text-gray-800 mb-3 text-[10px] uppercase tracking-wider text-[var(--color-secondary)]">Análisis de Yelitzé</h4>
                                                <div className="bg-[var(--color-primary)]/5 p-4 rounded-xl text-xs prose prose-sm max-h-60 overflow-y-auto w-full italic text-gray-700 whitespace-pre-wrap">
                                                    {result.aiAnalysis}
                                                </div>
                                            </div>
                                        </div>

                                        {/* HIDDEN PDF CONTENT FOR CAPTURE */}
                                        <div className="fixed left-[-9999px] top-0">
                                            <div id={`pdf-content-${result.id}`} className="bg-white p-12 w-[800px] text-[#2C3E50] space-y-8 font-sans">
                                                <div className="flex justify-between items-start border-b-2 border-[#D4AF37] pb-6">
                                                    <div>
                                                        <p className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-1">Resultado de Experiencia</p>
                                                        <h1 className="text-2xl font-heading text-[#2C3E50] uppercase">{result.testTitle}</h1>
                                                    </div>
                                                    <div className="text-right space-y-1">
                                                        <p className="text-sm font-bold">{result.userName || 'Usuario Anónimo'}</p>
                                                        <p className="text-xs text-gray-500">{result.userEmail || 'Sin correo'}</p>
                                                        <p className="text-[10px] text-gray-400 capitalize">
                                                            {format(new Date(result.createdAt), "d MMMM, yyyy", { locale: es })}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37]">Tus Respuestas</h2>
                                                    <div className="bg-gray-50 p-6 rounded-2xl space-y-3">
                                                        {isVisionBoard ? (
                                                            <div className="space-y-4">
                                                                {Object.entries(answersObj.reflections || {}).map(([id, text]: any) => (
                                                                    <div key={id}>
                                                                        <p className="text-[10px] font-bold uppercase text-gray-400 truncate">Portal {id}</p>
                                                                        <p className="text-xs italic text-gray-600">{text}</p>
                                                                    </div>
                                                                ))}
                                                                <div className="grid grid-cols-2 gap-4 pt-2">
                                                                    {(answersObj.pillars || []).map((p: any, i: number) => (
                                                                        <div key={i} className="text-[10px] border-l-2 border-[#D4AF37]/30 pl-3">
                                                                            <p className="font-bold uppercase">{p.title}</p>
                                                                            <p className="text-gray-500">{p.intention}</p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            Object.entries(answersObj).map(([qId, val]) => (
                                                                <div key={qId} className="flex justify-between border-b border-gray-100 pb-1 text-xs">
                                                                    <span className="text-gray-500">Pregunta {qId}</span>
                                                                    <span className="font-bold">Opción {String(val)}</span>
                                                                </div>
                                                            ))
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="bg-[#2C3E50]/5 p-8 rounded-2xl border border-[#D4AF37]/20 space-y-6">
                                                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] text-center">Análisis Personalizado</h2>
                                                    <div className="text-sm leading-relaxed whitespace-pre-wrap font-serif italic text-gray-700">
                                                        {result.aiAnalysis}
                                                    </div>
                                                </div>

                                                <div className="text-center pt-8 border-t border-gray-100">
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.4em]">Anatomía del Alma · Yelitzé Rangel</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
