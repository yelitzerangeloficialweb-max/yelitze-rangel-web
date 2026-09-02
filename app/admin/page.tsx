'use client';

import { useState, useEffect } from 'react';
import { 
    Users, 
    ShoppingBag, 
    Package, 
    FileText, 
    TrendingUp, 
    Clock, 
    ArrowRight,
    Loader2,
    Calendar,
    ClipboardList
} from 'lucide-react';
import Link from 'next/link';

interface Stats {
    counts: {
        products: number;
        orders: number;
        workshop: number;
        venezuela: number;
        blog: number;
        tests: number;
    };
    recent: {
        workshop: { name: string; createdAt: string }[];
        orders: { customerName: string; total: number; createdAt: string }[];
    };
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/stats');
                if (res.status === 401) {
                    window.location.href = '/admin/login?redirect=/admin';
                    return;
                }
                if (!res.ok) {
                    throw new Error('Error al cargar estadísticas');
                }
                const data = await res.json();
                if (data && data.counts) {
                    setStats(data);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary)]" />
            </div>
        );
    }

    const cards = [
        { 
            label: 'Ventas Totales', 
            value: stats?.counts.orders || 0, 
            icon: ShoppingBag, 
            color: 'bg-blue-50 text-blue-600',
            href: '/admin/orders'
        },
        { 
            label: 'Inscritos Workshop', 
            value: stats?.counts.workshop || 0, 
            icon: Users, 
            color: 'bg-orange-50 text-orange-600',
            href: '/admin/workshop'
        },
        { 
            label: 'Inscritos Evento', 
            value: stats?.counts.venezuela || 0, 
            icon: Calendar, 
            color: 'bg-purple-50 text-purple-600',
            href: '/admin/venezuela'
        },
        { 
            label: 'Productos Activos', 
            value: stats?.counts.products || 0, 
            icon: Package, 
            color: 'bg-green-50 text-green-600',
            href: '/admin/products'
        },
        { 
            label: 'Artículos Blog', 
            value: stats?.counts.blog || 0, 
            icon: FileText, 
            color: 'bg-amber-50 text-amber-600',
            href: '/admin/blog'
        },
        { 
            label: 'Tests Completados', 
            value: stats?.counts.tests || 0, 
            icon: ClipboardList, 
            color: 'bg-rose-50 text-rose-600',
            href: '/admin/tests'
        },
    ];

    return (
        <div className="space-y-10 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-heading font-bold text-[var(--color-primary)] mb-2">
                    Panel de Control
                </h1>
                <p className="text-stone-500 font-medium italic">
                    Bienvenida, Yelitze. Aquí tienes el resumen de tu universo digital.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, i) => (
                    <Link 
                        key={i} 
                        href={card.href}
                        className="group bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-6">
                            <div className={`w-16 h-16 ${card.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                                <card.icon size={32} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-1">{card.label}</p>
                                <p className="text-3xl font-heading font-bold text-stone-900">{card.value}</p>
                            </div>
                        </div>
                        <ArrowRight className="text-stone-200 group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all" />
                    </Link>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                                <Clock size={20} className="text-orange-600" />
                            </div>
                            <h2 className="text-xl font-heading font-bold text-stone-900">Actividad Reciente</h2>
                        </div>
                        <Link href="/admin/workshop" className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider hover:underline">
                            Ver todo
                        </Link>
                    </div>

                    <div className="space-y-6">
                        {(!stats?.recent?.workshop || stats.recent.workshop.length === 0) && (
                            <p className="text-stone-400 italic text-center py-10">No hay actividad reciente.</p>
                        )}
                        {stats?.recent?.workshop?.map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center font-bold text-[var(--color-primary)]">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-stone-900">{item.name}</p>
                                        <p className="text-xs text-stone-500">Inscripción al Workshop Sánate Mujer</p>
                                    </div>
                                </div>
                                <p className="text-xs text-stone-400 font-medium">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions / Integration Status */}
                <div className="bg-[var(--color-primary)] p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden text-white">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-heading font-bold mb-4 text-[#B8835A]">Accesos Directos</h2>
                        <p className="text-white/70 text-sm mb-8 leading-relaxed">
                            Gestiona las áreas clave de tu plataforma con un solo clic. 
                            Todas las actualizaciones se sincronizan automáticamente con el sitio público.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/admin/products" className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all border border-white/10 flex flex-col gap-2 group">
                                <Package size={20} className="text-[#B8835A]" />
                                <span className="font-bold text-sm">Gestionar Inventario</span>
                            </Link>
                            <Link href="/admin/blog" className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all border border-white/10 flex flex-col gap-2 group">
                                <FileText size={20} className="text-[#B8835A]" />
                                <span className="font-bold text-sm">Escribir Crónica</span>
                            </Link>
                            <Link href="/admin/tests" className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all border border-white/10 flex flex-col gap-2 group">
                                <ClipboardList size={20} className="text-[#B8835A]" />
                                <span className="font-bold text-sm">Análisis de Tests</span>
                            </Link>
                            <Link href="/admin/workshop" className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all border border-white/10 flex flex-col gap-2 group">
                                <Users size={20} className="text-[#B8835A]" />
                                <span className="font-bold text-sm">Lista Workshop</span>
                            </Link>
                        </div>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                </div>
            </div>
        </div>
    );
}
