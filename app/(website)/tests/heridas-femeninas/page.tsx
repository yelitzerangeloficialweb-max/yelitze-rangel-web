import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import StandaloneDiagnosticWizard from '@/components/heridas-test/StandaloneDiagnosticWizard';
import { DIAGNOSTIC_FEMENINA_QUESTIONS } from '@/lib/diagnostic-heridas-femeninas-data';

export const metadata: Metadata = {
    title: 'Test: Heridas Femeninas | Yelitze Rangel • Tu coach ancestral',
    description: 'Identifica las heridas de abandono, rechazo e injusticia específicas de la energía femenina.',
};

export default function HeridasFemeninasPage() {
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
                    <StandaloneDiagnosticWizard
                        title="Módulo: Heridas Femeninas Clásicas"
                        subtitle="Identifica las heridas de abandono, rechazo e injusticia en tu energía femenina sagrada."
                        testId="Heridas Femeninas"
                        questions={DIAGNOSTIC_FEMENINA_QUESTIONS}
                        image="/assets/images/tests/test_femeninas.png"
                    />
                </div>
            </div>
        </div>
    );
}
