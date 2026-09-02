'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { ClipboardList, Loader2, Mail, User, Calendar, ExternalLink, ChevronDown, ChevronUp, Search, Brain, Download, X, MoreVertical, FileText } from 'lucide-react';

interface TestResult {
    id: string;
    createdAt: string;
    testTitle: string;
    score: number;
    maxScore: number;
    answers: string;
    aiAnalysis: string;
    userEmail: string | null;
    userName: string | null;
}

export default function AdminTestsPage() {
    const [results, setResults] = useState<TestResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const res = await fetch('/api/admin/tests', { cache: 'no-store' });
            if (res.status === 401) {
                window.location.href = '/admin/login?redirect=/admin/tests';
                return;
            }
            if (!res.ok) throw new Error('Error al cargar resultados');
            const data = await res.json();
            if (Array.isArray(data)) {
                setResults(data);
            }
        } catch (error) {
            console.error('Error fetching results:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const filteredResults = results.filter(result => 
        (result.userName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (result.userEmail?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        result.testTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center py-40">
                <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary)]" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-heading font-bold text-[var(--color-primary)] mb-2">
                        Psicometría y Análisis
                    </h1>
                    <p className="text-stone-500 font-medium italic">Gestión de resultados y diagnósticos asistidos por IA.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-[2.5rem] border border-stone-100 shadow-sm">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300 w-5 h-5" />
                    <input 
                        type="text"
                        placeholder="Buscar por usuario, correo o test..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 rounded-[1.5rem] border border-transparent bg-stone-50 focus:bg-white focus:border-[var(--color-primary)] transition-all outline-none text-stone-600 font-medium"
                    />
                </div>
                <div className="flex items-center gap-2 px-6 py-4 bg-stone-50 rounded-[1.5rem] border border-stone-100 min-w-[200px] justify-center">
                    <ClipboardList className="w-4 h-4 text-stone-400" />
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">{results.length} Registros</span>
                </div>
            </div>

            {/* Results List */}
            {filteredResults.length === 0 ? (
                <div className="bg-white rounded-[3rem] py-40 text-center border border-stone-100 shadow-sm">
                    <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Brain className="w-10 h-10 text-stone-200" />
                    </div>
                    <h2 className="text-3xl font-heading text-stone-300 font-bold mb-4">No hay resultados aún</h2>
                    <p className="text-stone-400 max-w-md mx-auto italic">
                        Los diagnósticos y respuestas de tus usuarios aparecerán aquí una vez que completen los tests.
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-stone-100">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-stone-50 border-b border-stone-100">
                                    <th className="text-left px-8 py-6 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Paciente / Usuario</th>
                                    <th className="text-left px-8 py-6 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Instrumento</th>
                                    <th className="text-left px-8 py-6 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Fecha / Sesión</th>
                                    <th className="text-left px-8 py-6 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Puntaje</th>
                                    <th className="text-right px-8 py-6 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Análisis</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {filteredResults.map(result => (
                                    <React.Fragment key={result.id}>
                                        <tr className={`group transition-all ${expandedId === result.id ? 'bg-[var(--color-primary)]/[0.02]' : 'hover:bg-stone-50'}`}>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-[var(--color-primary)] font-bold group-hover:bg-white transition-colors">
                                                        {(result.userName?.[0] || 'A').toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-stone-900 leading-tight">{result.userName || 'Usuario Anónimo'}</p>
                                                        <p className="text-xs text-stone-400 font-medium">{result.userEmail || 'Sin correo registrado'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <FileText size={14} className="text-stone-300" />
                                                    <span className="font-bold text-stone-700 text-sm">{result.testTitle}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-sm text-stone-500 font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} className="text-stone-300" />
                                                    {new Date(result.createdAt).toLocaleDateString('es-ES', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-grow bg-stone-100 h-1.5 rounded-full max-w-[60px] overflow-hidden">
                                                        <div 
                                                            className={`h-full rounded-full ${
                                                                (result.score / result.maxScore) > 0.7 ? 'bg-emerald-500' : 
                                                                (result.score / result.maxScore) > 0.4 ? 'bg-amber-500' : 'bg-rose-500'
                                                            }`}
                                                            style={{ width: `${(result.score / result.maxScore) * 100}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-bold text-stone-600">{result.score}/{result.maxScore}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button
                                                    onClick={() => toggleExpand(result.id)}
                                                    className={`p-3 rounded-xl transition-all ${
                                                        expandedId === result.id 
                                                            ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-primary/20' 
                                                            : 'text-stone-400 hover:text-[var(--color-primary)] hover:bg-white'
                                                    }`}
                                                >
                                                    {expandedId === result.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                                </button>
                                            </td>
                                        </tr>
                                        {expandedId === result.id && (
                                            <tr>
                                                <td colSpan={5} className="px-8 py-8 bg-stone-50/50">
                                                    <div className="bg-white rounded-[2rem] p-8 border border-stone-200 shadow-sm animate-in slide-in-from-top-4 duration-300">
                                                        <div className="flex items-center justify-between mb-10 border-b border-stone-100 pb-6">
                                                            <div className="flex items-center gap-3">
                                                                <Brain size={24} className="text-[var(--color-primary)]" />
                                                                <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">Diagnóstico Expandido</h4>
                                                            </div>
                                                            { (result.testTitle.includes('Somático') || result.testTitle.includes('Arquitectura')) && (
                                                                <a 
                                                                    href={`/api/admin/tests/download-pdf/${result.id}`} 
                                                                    download 
                                                                    target="_blank" 
                                                                    className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white text-[10px] font-bold rounded-xl hover:bg-stone-800 transition-all shadow-lg uppercase tracking-widest"
                                                                >
                                                                    <Download size={14} /> Reporte PDF
                                                                </a>
                                                            )}
                                                        </div>
                                                        
                                                        <div className="grid lg:grid-cols-2 gap-12">
                                                            {/* Analysis Column */}
                                                            <div className="space-y-6">
                                                                <h5 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-2">Análisis de Inteligencia Artificial</h5>
                                                                <div className="bg-[#FAF9F6] p-8 rounded-[1.5rem] border border-stone-100 text-stone-700 text-sm leading-relaxed italic relative">
                                                                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-white border border-stone-100 rounded-full flex items-center justify-center text-[var(--color-primary)] shadow-sm">
                                                                        <Brain size={14} />
                                                                    </div>
                                                                    {result.aiAnalysis || 'El motor de análisis no se ejecutó para este registro.'}
                                                                </div>
                                                            </div>

                                                            {/* Answers Column */}
                                                            <div className="space-y-6">
                                                                <h5 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-2">Respuestas en Bruto</h5>
                                                                <div className="bg-stone-900 p-8 rounded-[1.5rem] text-stone-300 text-xs font-mono leading-relaxed overflow-x-auto max-h-[400px] custom-scrollbar">
                                                                    <pre className="whitespace-pre-wrap">
                                                                        {(() => {
                                                                            try {
                                                                                const parsed = JSON.parse(result.answers);
                                                                                return JSON.stringify(parsed, null, 2);
                                                                            } catch (e) {
                                                                                return result.answers;
                                                                            }
                                                                        })()}
                                                                    </pre>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

import React from 'react';
