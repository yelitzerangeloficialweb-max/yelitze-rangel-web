'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, Mail, Lock } from 'lucide-react';

function ResultsContent() {
    const searchParams = useSearchParams();
    const testId = searchParams.get('testId');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('¡Gracias! En una implementación real, aquí enviaríamos los datos a N8N.');
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-[var(--color-primary)]/10">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-secondary)]/10 rounded-full mb-4">
                    <Sparkles className="w-8 h-8 text-[var(--color-secondary)]" />
                </div>
                <h1 className="text-3xl font-heading text-[var(--color-primary)] mb-2">
                    ¡Análisis Completo!
                </h1>
                <p className="text-[var(--color-text-light)]">
                    Hemos procesado tus respuestas. Para recibir tu <strong>informe detallado y personalizado</strong> sobre tu arquetipo de sanación, por favor ingresa tus datos.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text)] mb-1">
                        Tu Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        placeholder="María Pérez"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)] mb-1">
                        Tu Correo Electrónico
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="tu@email.com"
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                    Ver Mis Resultados ➝
                </button>

                <p className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4">
                    <Lock className="w-3 h-3" />
                    Tus datos están 100% seguros y no compartimos spam.
                </p>
            </form>
        </div>
    );
}

export default function ResultsPage() {
    return (
        <div className="min-h-screen bg-[var(--color-background)] py-12 px-4 flex items-center justify-center">
            <Suspense fallback={<div>Cargando...</div>}>
                <ResultsContent />
            </Suspense>
        </div>
    );
}
