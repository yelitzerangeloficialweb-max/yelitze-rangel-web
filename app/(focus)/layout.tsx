
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Arquitectura de Vida Intencional | Yelitze Rangel',
    description: 'Diseña tu Vision Board, programa tu mente subconsciente y enfoca tu energía hacia tus propósitos vitales con esta herramienta interactiva.',
    alternates: {
        canonical: 'https://yelitzerangeloficial.com/arquitectura-de-vida-intencional',
    }
};

export default function FocusLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-mandala-pattern relative">
            <main className="flex-grow relative z-10">
                {children}
            </main>

            {/* Minimal Credits Footer as requested */}
            <footer className="py-6 text-center text-[10px] text-gray-400 uppercase tracking-widest border-t border-[var(--color-secondary)]/10">
                © {new Date().getFullYear()} Yelitzé Rangel. Todos los derechos reservados. | Desarrollado por <a href="https://kickoffdevelopment.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors underline decoration-gray-300 underline-offset-4">Kick-Off Development</a>
            </footer>
        </div>
    );
}
