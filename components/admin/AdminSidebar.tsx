'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    LayoutDashboard, 
    Package, 
    ShoppingBag, 
    ClipboardList, 
    MapPin, 
    FileText, 
    Users, 
    Calendar, 
    ChevronLeft,
    Menu,
    X,
    LogOut,
    ExternalLink
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Productos', href: '/admin/products', icon: Package },
    { label: 'Pedidos', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Resultados Tests', href: '/admin/tests', icon: ClipboardList },
    { label: 'Evento Vigía', href: '/admin/venezuela', icon: MapPin },
    { label: 'Blog', href: '/admin/blog', icon: FileText },
    { label: 'Workshop', href: '/admin/workshop', icon: Users },
    { label: 'Disponibilidad', href: '/admin/disponibilidad', icon: Calendar },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Toggle */}
            <button 
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[var(--color-primary)] text-white rounded-lg shadow-lg"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Backdrop */}
            {isOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-screen bg-white border-r border-stone-200 z-40 transition-all duration-300
                ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-64'}
            `}>
                <div className="flex flex-col h-full p-6">
                    {/* Logo / Header */}
                    <div className="mb-10 px-2">
                        <Link href="/admin" className="block">
                            <h2 className="text-xl font-heading font-bold text-[var(--color-primary)] tracking-tight">
                                Yelitze Rangel
                                <span className="block text-[10px] uppercase tracking-[0.2em] text-stone-400 font-sans font-bold mt-1">
                                    Admin Dashboard
                                </span>
                            </h2>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-grow space-y-1 overflow-y-auto">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            // Check if active: exact match or starts with (for subpages)
                            // But for Dashboard (/admin), we want exact match only or else it matches everything
                            const isActive = item.href === '/admin' 
                                ? pathname === '/admin' 
                                : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                                        ${isActive 
                                            ? 'bg-[var(--color-primary)] text-white shadow-md shadow-primary/20' 
                                            : 'text-stone-500 hover:bg-stone-50 hover:text-[var(--color-primary)]'}
                                    `}
                                >
                                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="mt-auto pt-6 space-y-2 border-t border-stone-100">
                        <Link 
                            href="/"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-stone-500 hover:bg-stone-50 transition-all"
                        >
                            <ExternalLink size={18} />
                            Ver sitio web
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}
