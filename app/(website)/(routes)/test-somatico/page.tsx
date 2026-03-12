import { Metadata } from 'next';
import SomaticQuiz from '@/components/test-somatico/SomaticQuiz';

export const metadata: Metadata = {
    title: 'Test Somático: Identifica tus Emociones Atrapadas en la Fascia • Yelitze Rangel',
    description: 'Descubre qué emociones podría estar sosteniendo tu cuerpo en este momento a través de la exploración de tu red fascial.',
};

export default function TestSomaticoPage() {
    return (
        <main className="min-h-screen bg-[#F5EFE6] relative overflow-hidden selection:bg-[#B8835A] selection:text-white">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#8C4005]/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#B8835A]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 py-32 relative z-10">
                <SomaticQuiz />
            </div>
        </main>
    );
}
