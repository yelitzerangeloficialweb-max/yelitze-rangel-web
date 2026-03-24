import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-stone-100">
            {/* Admin Header */}
            <header className="bg-[var(--color-primary)] text-white shadow-lg">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/admin" className="text-xl font-heading font-bold">
                            🛠️ Admin Panel
                        </Link>
                        <nav className="hidden md:flex gap-4 text-sm">
                            <Link href="/admin" className="hover:text-[var(--color-secondary)] transition-colors">
                                Productos
                            </Link>
                            <Link href="/admin/orders" className="hover:text-[var(--color-secondary)] transition-colors">
                                Pedidos
                            </Link>
                            <Link href="/admin/tests" className="hover:text-[var(--color-secondary)] transition-colors">
                                Resultados Tests
                            </Link>
                            <Link href="/admin/venezuela" className="hover:text-[var(--color-secondary)] transition-colors">
                                Venezuela en el Cuerpo
                            </Link>
                        </nav>
                    </div>
                    <Link
                        href="/"
                        className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                        ← Volver al sitio
                    </Link>
                </div>
            </header>

            {/* Admin Content */}
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
