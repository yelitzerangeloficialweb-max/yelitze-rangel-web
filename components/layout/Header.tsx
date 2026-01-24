'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Logic: Show "Scrolled" style (White BG, Dark Text) if:
    // 1. We differ from Home page (internal pages usually have light bg)
    // 2. We are scrolled down
    const isHome = pathname === '/';
    const showScrolled = isScrolled || !isHome;

    const navLinks = [
        { name: 'Inicio', href: '/' },
        { name: 'Sobre Mí', href: '/sobre-mi' },
        { name: 'Servicios', href: '/servicios' },
        {
            name: 'Eventos',
            href: '/eventos',
            children: [
                { name: 'Ver Todos', href: '/eventos' },
                { name: 'Sánate Mujer', href: '/eventos/sanate-mujer' },
                { name: 'Sanando el Linaje', href: '/eventos/sanando-linaje-femenino' }
            ]
        },
        { name: 'Blog', href: '/blog' },
        {
            name: 'Libros',
            href: '/libros',
            children: [
                { name: 'Ver Todos', href: '/libros' },
                { name: 'Hilos de Conexión', href: '/libros/hilos-de-conexion' },
                { name: 'Conversaciones con mi Chamana', href: '/libros/conversaciones-con-mi-chamana' }
            ]
        },
        {
            name: 'Tests',
            href: '/tests',
            children: [
                { name: 'Ver Todos', href: '/tests' },
                { name: 'Arquitectura de Vida Intencional 2026', href: '/experiencia-guiada' },
                { name: 'Heridas de la Infancia', href: '/tests/heridas-infancia' },
                { name: 'Creencias sobre el Amor', href: '/tests/creencias-amor' },
                { name: 'Creencias sobre el Dinero', href: '/tests/creencias-dinero' }
            ]
        },
    ];

    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                showScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4 border-b border-primary/5" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-48 h-20">
                        <Image
                            src={showScrolled ? "/assets/images/logo-color-scroll.png" : "/assets/images/logo-yelitze-new.png"}
                            alt="Yelitzé Rangel Logo"
                            fill
                            className="object-contain object-left transition-opacity duration-300"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="relative"
                            onMouseEnter={() => setHoveredLink(link.name)}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            <Link
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-secondary flex items-center gap-1 py-2",
                                    pathname === link.href || (link.children && pathname.startsWith(link.href))
                                        ? "text-secondary"
                                        : (showScrolled ? "text-primary" : "text-white/90 hover:text-white mix-blend-difference")
                                )}
                            >
                                {link.name}
                                {link.children && (
                                    <svg className={cn("w-3 h-3 transition-transform", hoveredLink === link.name ? "rotate-180" : "")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                )}
                            </Link>

                            {/* Dropdown */}
                            {link.children && hoveredLink === link.name && (
                                <div className="absolute top-full left-0 pt-2 animate-fade-in w-64 z-[60]">
                                    <div className="bg-white rounded-xl shadow-xl border border-primary/5 overflow-hidden">
                                        {link.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className={cn(
                                                    "block px-4 py-3 text-sm text-primary hover:bg-background transition-colors border-b border-primary/5 last:border-0",
                                                    child.href === '/experiencia-guiada'
                                                        ? "hover:text-[var(--color-accent-light)] font-medium"
                                                        : "hover:text-secondary"
                                                )}
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <Link
                        href="/reservas"
                        className="btn-premium px-6 py-2 text-sm"
                    >
                        Reservar Sesión
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-primary"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu className={showScrolled ? "text-primary" : "text-white"} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-t p-4 md:hidden flex flex-col gap-4 shadow-xl max-h-[80vh] overflow-y-auto z-[50]">
                    {navLinks.map((link) => (
                        <div key={link.name}>
                            <Link
                                href={link.href}
                                onClick={() => !link.children && setMobileMenuOpen(false)}
                                className="flex items-center justify-between text-primary font-medium py-3 px-4 hover:bg-background rounded-lg border-b border-gray-100"
                            >
                                {link.name}
                            </Link>

                            {/* Always show children in mobile for simplicity or create toggle state */}
                            {link.children && (
                                <div className="pl-8 space-y-1 bg-gray-50/50 py-2 rounded-b-lg">
                                    {link.children.map(child => (
                                        <Link
                                            key={child.href}
                                            href={child.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block text-sm text-primary-light hover:text-secondary py-2 px-2"
                                        >
                                            • {child.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <Link
                        href="/reservas"
                        onClick={() => setMobileMenuOpen(false)}
                        className="btn-premium w-full justify-center mt-2"
                    >
                        Reservar Sesión
                    </Link>
                </div>
            )}
        </header>
    );
}
