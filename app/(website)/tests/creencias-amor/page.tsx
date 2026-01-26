import AmorWizard from '@/components/amor-test/AmorWizard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Test: Creencias del Amor | Yelitze Rangel',
    description: 'Descubre desde dónde aprendiste a amar con este test de conciencia, suave y revelador.',
};

export default function CreenciasAmorPage() {
    return (
        <main className="min-h-screen bg-[#fafcfe] pt-32 pb-20">
            <div className="container mx-auto px-4">
                <AmorWizard />
            </div>
        </main>
    );
}
