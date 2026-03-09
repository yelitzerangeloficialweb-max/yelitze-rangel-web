'use client';

import { useState, useEffect } from 'react';
import { Download, Loader2, Users, MapPin, Calendar, Phone, QrCode, X, CheckCircle2, XCircle } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import { TicketQR } from '@/components/ui/TicketQR';

interface Registration {
    id: string;
    createdAt: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    scanned: boolean;
    scannedAt: string | null;
}

const safeFormatDate = (dateStr: string, formatStr: string, options?: any) => {
    try {
        const date = new Date(dateStr);
        if (!isValid(date)) return 'Fecha inválida';
        return format(date, formatStr, options);
    } catch (error) {
        return 'N/A';
    }
};

export default function AdminVenezuelaPage() {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const res = await fetch('/api/admin/venezuela/registrations');
            const data = await res.json();
            if (Array.isArray(data)) {
                setRegistrations(data);
            } else {
                console.error('API did not return an array:', data);
                setRegistrations([]);
            }
        } catch (error) {
            console.error('Error fetching registrations:', error);
            setRegistrations([]);
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        if (registrations.length === 0) return;

        const headers = ['Nombre', 'Email', 'WhatsApp', 'Ciudad', 'Fecha de Registro'];
        const csvContent = [
            headers.join(','),
            ...registrations.map(r => [
                `"${r.name}"`,
                `"${r.email}"`,
                `"${r.whatsapp}"`,
                `"${r.city}"`,
                `"${safeFormatDate(r.createdAt, 'yyyy-MM-dd HH:mm:ss')}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `registros_venezuela_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading text-[var(--color-primary)] font-bold mb-2">
                        Venezuela en el Cuerpo
                    </h1>
                    <p className="text-stone-500">
                        {registrations.length} personas inscritas en total
                    </p>
                </div>
                <button
                    onClick={exportToCSV}
                    disabled={registrations.length === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                    <Download className="w-5 h-5" />
                    Exportar CSV
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex items-center gap-6">
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <Users className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-stone-500 font-medium">Total Inscritos</p>
                        <p className="text-2xl font-bold text-[var(--color-primary)]">{registrations.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex items-center gap-6">
                    <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center">
                        <MapPin className="w-7 h-7 text-orange-600" />
                    </div>
                    <div>
                        <p className="text-sm text-stone-500 font-medium">Ciudades Impactadas</p>
                        <p className="text-2xl font-bold text-[var(--color-primary)]">
                            {new Set(registrations.map(r => r.city)).size}
                        </p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex items-center gap-6">
                    <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
                        <Phone className="w-7 h-7 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm text-stone-500 font-medium">Últimas 24h</p>
                        <p className="text-2xl font-bold text-[var(--color-primary)]">
                            {registrations.filter(r => new Date(r.createdAt) > new Date(Date.now() - 86400000)).length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Registrations Table */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-stone-50 border-b border-stone-100">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-bold text-stone-500 uppercase tracking-widest">Nombre</th>
                                <th className="text-left px-6 py-4 text-sm font-bold text-stone-500 uppercase tracking-widest">WhatsApp</th>
                                <th className="text-left px-6 py-4 text-sm font-bold text-stone-500 uppercase tracking-widest">Ciudad</th>
                                <th className="text-left px-6 py-4 text-sm font-bold text-stone-500 uppercase tracking-widest">Email</th>
                                <th className="text-left px-6 py-4 text-sm font-bold text-stone-500 uppercase tracking-widest">Fecha y Hora</th>
                                <th className="text-center px-6 py-4 text-sm font-bold text-stone-500 uppercase tracking-widest">Estado</th>
                                <th className="text-center px-6 py-4 text-sm font-bold text-stone-500 uppercase tracking-widest">Pase QR</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {registrations.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-20 text-center text-stone-400">
                                        No hay registros todavía
                                    </td>
                                </tr>
                            ) : (
                                registrations.map((r) => (
                                    <tr key={r.id} className="hover:bg-stone-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-[var(--color-primary)]">{r.name}</td>
                                        <td className="px-6 py-4 text-stone-600">{r.whatsapp}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-bold text-stone-600 uppercase tracking-wider line-clamp-1 max-w-[150px]">
                                                {r.city}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-stone-500 text-sm whitespace-nowrap">
                                            {safeFormatDate(r.createdAt, "d MMM, yyyy - HH:mm", { locale: es })}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {r.scanned ? (
                                                <div className="flex flex-col items-center gap-1 group relative">
                                                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                                                    <span className="text-[10px] text-green-600 font-bold uppercase">Escaneado</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-1">
                                                    <XCircle className="w-6 h-6 text-red-400 opacity-40" />
                                                    <span className="text-[10px] text-stone-400 font-bold uppercase">Pendiente</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => setSelectedRegistration(r)}
                                                className="p-2 bg-[var(--color-primary)] text-white rounded-lg hover:scale-110 transition-transform shadow-md inline-flex items-center justify-center"
                                                title="Ver Pase QR"
                                            >
                                                <QrCode className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Ticket Preview Modal */}
            {selectedRegistration && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-[#2D2926]/80 backdrop-blur-sm"
                        onClick={() => setSelectedRegistration(null)}
                    />
                    <div className="relative w-full max-w-lg bg-transparent animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setSelectedRegistration(null)}
                            className="absolute -top-12 right-0 p-2 text-white hover:text-[#B8835A] transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <div className="scale-90 md:scale-100">
                            <TicketQR
                                name={selectedRegistration.name}
                                city={selectedRegistration.city}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
