import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MasterDiagnosticWizard from '@/components/heridas-test/MasterDiagnosticWizard';

export const metadata: Metadata = {
    title: 'Diagnóstico Ancestral Completo | Yelitze Rangel • Tu coach ancestral',
    description: 'Análisis integral de Relaciones, Heridas Profundas y Linaje Femenino guiado por IA.',
};

export default function DiagnosticoAncestralPage() {
    return (
        <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-12 overflow-x-hidden">
            <div className="container mx-auto px-4">
                <Link
                    href="/tests"
                    className="inline-flex items-center text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors mb-8 text-sm uppercase tracking-widest"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver a Tests
                </Link>

                <div className="max-w-4xl mx-auto">
                    <MasterDiagnosticWizard />
                </div>
            </div>
        </div>
    );
}
