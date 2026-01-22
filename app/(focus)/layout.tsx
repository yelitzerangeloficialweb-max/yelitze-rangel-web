
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
                © {new Date().getFullYear()} Yelitzé Rangel. Todos los derechos reservados. | Desarrollado por Kick-Off Development
            </footer>
        </div>
    );
}
