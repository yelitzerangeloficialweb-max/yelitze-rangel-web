import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import StandaloneDiagnosticWizard from '@/components/heridas-test/StandaloneDiagnosticWizard';
import { PROFUNDAS_QUESTIONS } from '@/lib/diagnostic-heridas-profundas-data';

export const metadata: Metadata = {
    title: 'Test: Heridas Profundas | Yelitzé Rangel',
    description: 'Explora las huellas en tu mente, alma y cuerpo para una sanación consciente.',
};

export default function HeridasProfundasPage() {
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
                        title="Módulo: Heridas Profundas (Somática)"
                        subtitle="Explora las huellas en tu mente, alma y cuerpo. Un paso hacia la sanación desde la consciencia corporal."
                        testId="Heridas Profundas"
                        questions={PROFUNDAS_QUESTIONS}
                        image="/assets/images/tests/test_profundas.png"
                    />
                </div>
            </div>
        </div>
    );
}
