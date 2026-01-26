import DineroWizard from '@/components/dinero-test/DineroWizard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Test: Creencias del Dinero | Yelitze Rangel',
    description: 'Descubre tus bloqueos inconscientes con la abundancia y cómo tu cuerpo aprendió a relacionarse con el dinero.',
};

export default function CreenciasDineroPage() {
    return (
        <main className="min-h-screen bg-[#fafcfe] pt-32 pb-20">
            <div className="container mx-auto px-4">
                <DineroWizard />
            </div>
        </main>
    );
}
