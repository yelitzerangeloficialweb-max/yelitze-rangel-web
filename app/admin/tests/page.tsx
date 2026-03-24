'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { ClipboardList, Loader2, Mail, User, Calendar, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

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

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const res = await fetch('/api/admin/tests', { cache: 'no-store' });
            const data = await res.json();
            setResults(data);
        } catch (error) {
            console.error('Error fetching results:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-secondary)]" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-heading text-[var(--color-primary)] font-bold">
                    Resultados de Tests
                </h1>
                <p className="text-stone-500">{results.length} resultados registrados</p>
            </div>

            {results.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center">
                    <ClipboardList className="w-16 h-16 text-stone-200 mx-auto mb-4" />
                    <h2 className="text-xl font-heading text-[var(--color-primary)] mb-2">No hay resultados</h2>
                    <p className="text-stone-500">Aún no se han completado tests en la plataforma</p>
                </div>
            ) : (
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
                    <table className="w-full">
                        <thead className="bg-stone-50 border-b border-stone-100">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-medium text-stone-500">Usuario</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-stone-500">Test</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-stone-500">Fecha</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-stone-500">Puntaje</th>
                                <th className="text-right px-6 py-4 text-sm font-medium text-stone-500">Detalles</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {results.map(result => (
                                <>
                                    <tr key={result.id} className="hover:bg-stone-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2 font-medium text-[var(--color-primary)]">
                                                    <User className="w-3.5 h-3.5" />
                                                    {result.userName || 'Anónimo'}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-stone-500">
                                                    <Mail className="w-3.5 h-3.5" />
                                                    {result.userEmail || 'Sin correo'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-medium text-stone-700">{result.testTitle}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-stone-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(result.createdAt).toLocaleDateString('es-ES', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                (result.score / result.maxScore) > 0.7 ? 'bg-green-100 text-green-700' : 
                                                (result.score / result.maxScore) > 0.4 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                                {result.score} / {result.maxScore}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => toggleExpand(result.id)}
                                                className="p-2 text-stone-400 hover:text-[var(--color-secondary)] hover:bg-stone-100 rounded-lg transition-colors inline-flex items-center gap-1"
                                            >
                                                {expandedId === result.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedId === result.id && (
                                        <tr className="bg-stone-50/50">
                                            <td colSpan={5} className="px-8 py-8">
                                                <div className="grid md:grid-cols-2 gap-12">
                                                    <div className="space-y-4">
                                                        <h4 className="text-sm font-bold uppercase tracking-widest text-[var(--color-primary)] border-b border-stone-200 pb-2">Respuestas</h4>
                                                        <div className="bg-white p-6 rounded-2xl border border-stone-100 text-stone-700 text-sm leading-relaxed overflow-x-auto">
                                                            <pre className="whitespace-pre-wrap font-sans">
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
                                                    <div className="space-y-4">
                                                        <h4 className="text-sm font-bold uppercase tracking-widest text-[var(--color-primary)] border-b border-stone-200 pb-2">Análisis de la IA</h4>
                                                        <div className="bg-white p-6 rounded-2xl border border-stone-100 text-stone-700 text-sm leading-relaxed italic">
                                                            {result.aiAnalysis || 'No se generó análisis IA para este resultado.'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
