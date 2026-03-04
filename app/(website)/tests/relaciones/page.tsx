import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import StandaloneDiagnosticWizard from '@/components/heridas-test/StandaloneDiagnosticWizard';
import { DIAGNOSTIC_AMOR_QUESTIONS } from '@/lib/diagnostic-amor-data';

export const metadata: Metadata = {
    title: 'Test: Patrones en Relaciones | Yelitzé Rangel',
    description: 'Identifica los patrones de dolor, codependencia y desconfianza en tus relaciones de pareja.',
};

export default function RelacionesPage() {
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
                        title="Módulo: Patrones en Relaciones"
                        subtitle="Identifica ciclos de abandono, codependencia y desconfianza para sanar tu vínculo con el otro."
                        testId="Relaciones"
                        questions={DIAGNOSTIC_AMOR_QUESTIONS}
                        image="/assets/images/tests/test_relaciones.png"
                    />
                </div>
            </div>
        </div>
    );
}
