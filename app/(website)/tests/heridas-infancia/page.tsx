import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import HeridasWizard from '@/components/heridas-test/HeridasWizard';

export const metadata: Metadata = {
    title: 'Test Heridas de la Infancia | Yelitzé Rangel',
    description: 'Descubre qué herida emocional de tu infancia influye en tu vida adulta.',
};

export default function HeridasPage() {
    return (
        <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-12 overflow-x-hidden">
            <div className="container mx-auto px-4">
                {/* Header / Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors mb-8 text-sm uppercase tracking-widest"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al Inicio
                </Link>

                {/* Wizard Container */}
                <div className="max-w-4xl mx-auto">
                    <HeridasWizard />
                </div>
            </div>
        </div>
    );
}
