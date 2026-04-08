'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EyeGeometricIcon, MenuThinIcon, CloseThinIcon } from '@/components/icons/CustomIcons';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import CartButton from '@/components/shop/CartButton';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };
        if (isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSearchOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
            setMobileMenuOpen(false);
        }
    };

    // Logic: Show "Scrolled" style (White BG, Dark Text) if:
    // 1. We differ from Home, About or Services page (these have dark/hero backgrounds or intentional transparent headers)
    // 2. We are scrolled down
    const isTransparentPage = useMemo(() => {
        const path = pathname.toLowerCase().replace(/\/$/, '') || '/';
        
        // 1. Home is always transparent
        if (path === '/') return true;
        
        // 2. Section landings with dark heroes
        const mainLandings = ['/blog', '/tienda', '/libros', '/galeria', '/servicios', '/eventos'];
        if (mainLandings.includes(path)) return true;
        
        // 3. Specific sub-sections where dark heroes are known to continue
        const transparentSubSections = ['/servicios/', '/eventos/'];
        if (transparentSubSections.some(prefix => path.startsWith(prefix))) return true;
        
        // 4. Default to solid (for details, Sobre Mi, tests, etc.)
        return false;
    }, [pathname]);

    const showScrolled = isScrolled || !isTransparentPage;

    const navLinks = [
        { name: 'Inicio', href: '/' },
        {
            name: 'La Esencia',
            href: '#',
            children: [
                { name: 'Sobre Mí', href: '/sobre-mi' },
                { name: 'Galería', href: '/galeria' },
                { name: 'Blog', href: '/blog' },
            ]
        },
        {
            name: 'Acompañamiento',
            href: '#',
            children: [
                { name: 'Servicios', href: '/servicios' },
                { name: 'Eventos & Talleres', href: '/eventos' },
                { name: 'Sanando el Linaje', href: '/eventos/sanando-linaje-femenino' },
                { name: 'Sánate Mujer', href: '/eventos/sanate-mujer' },
            ]
        },
        {
            name: 'Herramientas',
            href: '#',
            children: [
                { name: 'Tests de Autoconocimiento', href: '/tests' },
                { name: 'Test Somático', href: '/test-somatico' },
                { name: 'Arquitectura Intencional', href: '/arquitectura-de-vida-intencional' },
                { name: 'Heridas de la Infancia', href: '/tests/heridas-infancia' },
                { name: 'Creencias sobre el Amor', href: '/tests/creencias-amor' },
                { name: 'Creencias sobre el Dinero', href: '/tests/creencias-dinero' }
            ]
        },
        {
            name: 'Tienda',
            href: '#',
            children: [
                { name: 'Tienda Online', href: '/tienda' },
                { name: 'Libros', href: '/libros' },
                { name: 'Hilos de Conexión', href: '/libros/hilos-de-conexion' },
                { name: 'Conversaciones con mi Chamana', href: '/libros/conversaciones-con-mi-chamana' }
            ]
        },
    ];

    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                showScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-48 h-20">
                        <Image
                            src={showScrolled ? "/assets/images/logo-color-scroll.png" : "/assets/images/logo-yelitze-new.png"}
                            alt="Yelitze Rangel Logo"
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
                                onClick={(e) => link.href === '#' && e.preventDefault()}
                                className={cn(
                                    "text-sm font-medium font-body tracking-[0.05em] transition-colors hover:text-secondary flex items-center gap-1 py-2",
                                    pathname === link.href || (link.children && link.children.some(child => pathname === child.href))
                                        ? "text-secondary"
                                        : (showScrolled ? "text-primary" : "text-white/90 hover:text-white")
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
                                                    child.href === '/arquitectura-de-vida-intencional'
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
                    <div className="flex items-center" ref={searchRef}>
                        <AnimatePresence mode="wait">
                            {isSearchOpen ? (
                                <motion.form
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "240px", opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    onSubmit={handleSearch}
                                    className="relative flex items-center overflow-hidden"
                                >
                                    <input
                                        type="text"
                                        placeholder="Buscar..."
                                        autoFocus
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className={cn(
                                            "w-full h-10 pl-4 pr-10 rounded-full text-sm border focus:outline-none focus:ring-2 focus:ring-secondary/50",
                                            showScrolled ? "bg-background border-primary/10 text-primary" : "bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/60"
                                        )}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsSearchOpen(false)}
                                        className="absolute right-3 text-current opacity-60 hover:opacity-100 transition-opacity"
                                    >
                                        <CloseThinIcon size={16} />
                                    </button>
                                </motion.form>
                            ) : (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsSearchOpen(true)}
                                    className={cn(
                                        "p-2 rounded-full transition-colors hover:bg-primary/5",
                                        showScrolled || pathname === '/sobre-mi' ? "text-primary" : "text-white/90"
                                    )}
                                >
                                    <EyeGeometricIcon size={20} />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                    <CartButton iconColor={showScrolled ? 'text-primary' : 'text-white/90'} />
                    <Link
                        href="/reservas"
                        className="btn-premium px-6 py-2 text-sm font-heading bg-[var(--color-accent)] text-[var(--color-background)] hover:brightness-110"
                    >
                        Reservar Sesión
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-primary"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <CloseThinIcon /> : <MenuThinIcon className={showScrolled || pathname === '/sobre-mi' ? "text-primary" : "text-white"} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-t p-4 md:hidden flex flex-col gap-4 shadow-xl max-h-[80vh] overflow-y-auto z-[50]">
                    {navLinks.map((link) => (
                        <div key={link.name}>
                            <Link
                                href={link.href}
                                onClick={(e) => {
                                    if (link.href === '#') {
                                        e.preventDefault();
                                    } else if (!link.children) {
                                        setMobileMenuOpen(false);
                                    }
                                }}
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
                    <form onSubmit={handleSearch} className="px-4 mb-2">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-11 pl-4 pr-11 rounded-xl bg-background border border-primary/10 text-primary text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
                            />
                            <button
                                type="submit"
                                className="absolute right-3 p-1 text-primary/60"
                            >
                                <EyeGeometricIcon size={18} />
                            </button>
                        </div>
                    </form>
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
