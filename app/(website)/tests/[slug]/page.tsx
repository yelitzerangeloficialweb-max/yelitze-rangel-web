import { notFound } from 'next/navigation';
import { TESTS_DATA } from '@/lib/tests-data';
import TestRunner from '@/components/tests/TestRunner';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface TestPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function TestPage({ params }: TestPageProps) {
    const { slug } = await params;
    const test = TESTS_DATA.find((t) => t.slug === slug);

    if (!test) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-36 pb-12">
            <div className="container">
                {/* Header / Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors mb-12"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al Inicio
                </Link>

                {/* Test Title & Description */}
                <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
                    <span className="uppercase tracking-widest text-sm font-semibold text-[var(--color-secondary)] mb-2 block">
                        Test Interactivo
                    </span>
                    <h1 className="text-4xl md:text-5xl font-heading mb-4 text-[var(--color-primary)]">
                        {test.title}
                    </h1>
                    <p className="text-lg text-[var(--color-text-light)]">
                        {test.description}
                    </p>
                </div>

                {/* The Runner */}
                <TestRunner test={test} />
            </div>
        </div>
    );
}
