import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-stone-100">
            {/* Admin Header */}
            <header className="bg-[var(--color-primary)] text-white shadow-lg">
                <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                        <div className="flex items-center justify-between">
                            <Link href="/admin" className="text-xl font-heading font-bold">
                                🛠️ Admin Panel
                            </Link>
                            <Link href="/" className="md:hidden text-xs text-white/70 hover:text-white transition-colors">
                                ← Volver al sitio
                            </Link>
                        </div>
                        <nav className="flex flex-wrap gap-2 text-xs md:text-sm">
                            <Link href="/admin" className="hover:bg-white/10 bg-black/20 px-3 py-1.5 rounded-full transition-colors font-medium">
                                Productos
                            </Link>
                            <Link href="/admin/orders" className="hover:bg-white/10 bg-black/20 px-3 py-1.5 rounded-full transition-colors font-medium">
                                Pedidos
                            </Link>
                            <Link href="/admin/tests" className="hover:bg-white/10 bg-black/20 px-3 py-1.5 rounded-full transition-colors font-medium">
                                Resultados Tests
                            </Link>
                            <Link href="/admin/venezuela" className="hover:bg-white/10 bg-black/20 px-3 py-1.5 rounded-full transition-colors font-medium">
                                Evento Vigía
                            </Link>
                            <Link href="/admin/blog" className="hover:bg-white/10 bg-black/20 px-3 py-1.5 rounded-full transition-colors font-medium">
                                Blog
                            </Link>
                            <Link href="/admin/workshop" className="hover:bg-white/10 bg-[#B8835A] px-3 py-1.5 rounded-full transition-colors font-bold shadow-sm">
                                Workshop
                            </Link>
                        </nav>
                    </div>
                    <Link
                        href="/"
                        className="hidden md:block text-sm text-white/70 hover:text-white transition-colors"
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
