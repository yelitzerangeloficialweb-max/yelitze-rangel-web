'use client';

import { useState, useEffect } from 'react';
import { Download, Loader2, Users, MapPin, Calendar, Phone, QrCode, X, CheckCircle2, XCircle, Camera, Pencil, Trash2, AlertCircle, Repeat, Search, Filter, MoreVertical, ExternalLink, Check } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import { TicketQR } from '@/components/ui/TicketQR';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useRouter } from 'next/navigation';

interface Registration {
    id: string;
    createdAt: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    instagram?: string;
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
    const [isScanning, setIsScanning] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [cityFilter, setCityFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [editingRegistration, setEditingRegistration] = useState<Registration | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchRegistrations();
    }, []);

    useEffect(() => {
        let scanner: Html5QrcodeScanner | null = null;

        if (isScanning) {
            scanner = new Html5QrcodeScanner(
                "qr-reader",
                { fps: 10, qrbox: { width: 250, height: 250 } },
                /* verbose= */ false
            );

            scanner.render((decodedText) => {
                if (decodedText.includes('/admin/venezuela/entry/')) {
                    const url = new URL(decodedText);
                    router.push(url.pathname);
                    setIsScanning(false);
                } else if (decodedText.startsWith('/')) {
                    router.push(decodedText);
                    setIsScanning(false);
                }
            }, (error) => {
                // Ignore scanner errors
            });
        }

        return () => {
            if (scanner) {
                scanner.clear().catch(err => console.error("Failed to clear scanner", err));
            }
        };
    }, [isScanning, router]);

    const fetchRegistrations = async () => {
        try {
            const res = await fetch('/api/admin/venezuela/registrations');
            const data = await res.json();
            if (Array.isArray(data)) {
                setRegistrations(data);
            }
        } catch (error) {
            console.error('Error fetching registrations:', error);
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        if (registrations.length === 0) return;

        const headers = ['Nombre', 'Email', 'WhatsApp', 'Instagram', 'Ciudad', 'Fecha de Registro'];
        const csvContent = [
            headers.join(','),
            ...registrations.map(r => [
                `"${r.name}"`,
                `"${r.email}"`,
                `"${r.whatsapp}"`,
                `"${r.instagram || ''}"`,
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

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.')) return;

        try {
            const res = await fetch(`/api/admin/venezuela/registrations/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setRegistrations(prev => prev.filter(r => r.id !== id));
            }
        } catch (error) {
            console.error('Error deleting registration:', error);
        }
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingRegistration) return;

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const whatsapp = formData.get('whatsapp') as string;
        const city = formData.get('city') as string;
        const instagram = formData.get('instagram') as string;

        try {
            setIsSubmitting(true);
            const res = await fetch(`/api/admin/venezuela/registrations/${editingRegistration.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, whatsapp, city, instagram }),
            });

            if (res.ok) {
                const updated = await res.json();
                setRegistrations(prev => prev.map(r => r.id === updated.id ? updated : r));
                setEditingRegistration(null);
            }
        } catch (error) {
            console.error('Error updating registration:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResetQR = async () => {
        if (!editingRegistration) return;
        if (!confirm('¿Deseas reiniciar el estado del QR a pendiente?')) return;

        try {
            setIsSubmitting(true);
            const res = await fetch(`/api/admin/venezuela/registrations/${editingRegistration.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    scanned: false,
                    scannedAt: null
                }),
            });

            if (res.ok) {
                const updated = await res.json();
                setRegistrations(prev => prev.map(r => r.id === updated.id ? updated : r));
                setEditingRegistration(null);
            }
        } catch (error) {
            console.error('Error resetting QR:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeduplicate = async () => {
        if (!confirm('¿Estás segura de eliminar registros duplicados? Esta acción es permanente.')) return;
        try {
            setLoading(true);
            const res = await fetch('/api/admin/venezuela/registrations/deduplicate', { method: 'POST' });
            await fetchRegistrations();
        } catch (e) {
            console.error('Error cleaning duplicates:', e);
        } finally {
            setLoading(false);
        }
    };

    const filteredRegistrations = registrations.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             r.whatsapp.includes(searchTerm);
        const matchesCity = cityFilter === 'all' || r.city === cityFilter;
        const matchesStatus = statusFilter === 'all' || (statusFilter === 'scanned' ? r.scanned : !r.scanned);
        return matchesSearch && matchesCity && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center py-40">
                <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary)]" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20 animate-fade-in">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-heading font-bold text-[var(--color-primary)] mb-2">
                        Venezuela en el Cuerpo
                    </h1>
                    <p className="text-stone-500 font-medium italic">
                        Gestión de accesos y participantes para el evento nacional.
                    </p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={() => setIsScanning(true)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white font-bold rounded-2xl hover:bg-[var(--color-primary-light)] transition-all shadow-lg shadow-primary/20"
                    >
                        <Camera size={20} />
                        Escáner QR
                    </button>
                    <button
                        onClick={handleDeduplicate}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-stone-600 font-bold rounded-2xl border border-stone-200 hover:bg-stone-50 transition-all"
                    >
                        <Repeat size={18} />
                        Limpiar Base
                    </button>
                    <button
                        onClick={exportToCSV}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/10"
                    >
                        <Download size={18} />
                        CSV
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Inscritos', value: registrations.length, icon: Users, color: 'bg-blue-50 text-blue-600' },
                    { label: 'Ciudades', value: new Set(registrations.map(r => r.city)).size, icon: MapPin, color: 'bg-orange-50 text-orange-600' },
                    { label: 'Escaneados', value: registrations.filter(r => r.scanned).length, icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' },
                    { label: 'Últimas 24h', value: registrations.filter(r => new Date(r.createdAt) > new Date(Date.now() - 86400000)).length, icon: Calendar, color: 'bg-purple-50 text-purple-600' }
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-heading font-bold text-stone-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-[2rem] border border-stone-100 shadow-sm">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 w-5 h-5" />
                    <input 
                        type="text"
                        placeholder="Buscar por nombre, email o WhatsApp..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-transparent bg-stone-50 focus:bg-white focus:border-[var(--color-primary)] transition-all outline-none text-stone-600"
                    />
                </div>
                <div className="flex gap-4">
                    <select
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                        className="px-6 py-3 rounded-xl border border-transparent bg-stone-50 focus:bg-white focus:border-[var(--color-primary)] transition-all outline-none text-stone-600 font-medium cursor-pointer"
                    >
                        <option value="all">Todas las Ciudades</option>
                        {Array.from(new Set(registrations.map(r => r.city))).sort().map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-6 py-3 rounded-xl border border-transparent bg-stone-50 focus:bg-white focus:border-[var(--color-primary)] transition-all outline-none text-stone-600 font-medium cursor-pointer"
                    >
                        <option value="all">Estado QR</option>
                        <option value="scanned">Escaneados</option>
                        <option value="pending">Pendientes</option>
                    </select>
                </div>
            </div>

            {/* Content Table */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-stone-100 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-stone-100 bg-stone-50/50">
                                <th className="px-8 py-5 text-xs font-bold text-stone-400 uppercase tracking-[0.2em]">Participante</th>
                                <th className="px-8 py-5 text-xs font-bold text-stone-400 uppercase tracking-[0.2em]">Contacto</th>
                                <th className="px-8 py-5 text-xs font-bold text-stone-400 uppercase tracking-[0.2em]">Ciudad</th>
                                <th className="px-8 py-5 text-xs font-bold text-stone-400 uppercase tracking-[0.2em]">Registro</th>
                                <th className="px-8 py-5 text-xs font-bold text-stone-400 uppercase tracking-[0.2em] text-center">Estado</th>
                                <th className="px-8 py-5 text-xs font-bold text-stone-400 uppercase tracking-[0.2em] text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-50">
                            {filteredRegistrations.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-32 text-center text-stone-400 italic">No se encontraron inscripciones con estos criterios.</td>
                                </tr>
                            ) : (
                                filteredRegistrations.map((r) => (
                                    <tr key={r.id} className="group hover:bg-[#F9F8F6] transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-lg transition-colors ${r.scanned ? 'bg-emerald-50 text-emerald-600' : 'bg-stone-100 text-stone-400'}`}>
                                                    {r.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-stone-900">{r.name}</p>
                                                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{r.id.slice(-6).toUpperCase()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-stone-600 flex items-center gap-2"><Mail size={12} className="text-stone-300" /> {r.email}</p>
                                                <p className="text-sm font-medium text-stone-600 flex items-center gap-2"><Phone size={12} className="text-stone-300" /> {r.whatsapp}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 bg-white border border-stone-100 rounded-lg text-xs font-bold text-stone-600 uppercase tracking-widest">
                                                {r.city}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-xs text-stone-400 font-medium">
                                                {safeFormatDate(r.createdAt, "d 'de' MMM, yyyy", { locale: es })}<br/>
                                                {safeFormatDate(r.createdAt, "HH:mm 'hrs'", { locale: es })}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            {r.scanned ? (
                                                <div className="inline-flex flex-col items-center gap-1">
                                                    <CheckCircle2 size={20} className="text-emerald-500" />
                                                    <span className="text-[10px] font-bold text-emerald-600 uppercase">Validado</span>
                                                </div>
                                            ) : (
                                                <div className="inline-flex flex-col items-center gap-1">
                                                    <XCircle size={20} className="text-stone-300" />
                                                    <span className="text-[10px] font-bold text-stone-400 uppercase">Pendiente</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => setSelectedRegistration(r)}
                                                    className="p-2.5 text-stone-400 hover:text-[var(--color-primary)] hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-stone-100"
                                                    title="Ver Pase"
                                                >
                                                    <QrCode size={18} />
                                                </button>
                                                <button
                                                    onClick={() => setEditingRegistration(r)}
                                                    className="p-2.5 text-stone-400 hover:text-blue-500 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-blue-50"
                                                    title="Editar"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(r.id)}
                                                    className="p-2.5 text-stone-400 hover:text-rose-500 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-rose-50"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
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
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedRegistration(null)} />
                    <div className="relative w-full max-w-lg bg-transparent animate-in zoom-in-95 duration-300">
                        <button onClick={() => setSelectedRegistration(null)} className="absolute -top-14 right-0 p-3 text-white/50 hover:text-white">
                            <X size={32} />
                        </button>
                        <TicketQR id={selectedRegistration.id} name={selectedRegistration.name} city={selectedRegistration.city} />
                    </div>
                </div>
            )}

            {/* Scanner Modal */}
            {isScanning && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsScanning(false)} />
                    <div className="relative w-full max-w-md bg-white rounded-[3rem] p-10 shadow-2xl">
                        <button onClick={() => setIsScanning(false)} className="absolute top-8 right-8 text-stone-400 hover:text-stone-900">
                            <X size={24} />
                        </button>
                        <div className="text-center mb-10">
                            <div className="w-20 h-20 bg-[var(--color-primary)] text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
                                <Camera size={32} />
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-stone-900">Validación de Pases</h3>
                            <p className="text-stone-500 mt-2">Apunta al código QR para registrar la entrada</p>
                        </div>
                        <div id="qr-reader" className="overflow-hidden rounded-[2rem] border-2 border-stone-100 shadow-inner"></div>
                        <p className="text-[10px] text-center mt-10 text-stone-300 font-bold uppercase tracking-[0.3em]">Sistema de Control • VEC 2024</p>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editingRegistration && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setEditingRegistration(null)} />
                    <div className="relative w-full max-w-lg bg-[#FAF9F6] rounded-[2.5rem] p-10 shadow-2xl border border-white">
                        <button onClick={() => setEditingRegistration(null)} className="absolute top-8 right-8 text-stone-400 hover:text-stone-900">
                            <X size={24} />
                        </button>

                        <div className="mb-10">
                            <h3 className="text-2xl font-heading font-bold text-[var(--color-primary)]">Refinar Participante</h3>
                            <p className="text-stone-500 mt-1">Ajusta los detalles de la inscripción.</p>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Nombre</label>
                                    <input type="text" name="name" defaultValue={editingRegistration.name} className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-white font-bold outline-none focus:border-[var(--color-primary)] transition-all" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Ciudad</label>
                                    <input type="text" name="city" defaultValue={editingRegistration.city} className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-white font-bold outline-none focus:border-[var(--color-primary)] transition-all" required />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Email</label>
                                <input type="email" name="email" defaultValue={editingRegistration.email} className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-white font-medium outline-none focus:border-[var(--color-primary)] transition-all" required />
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">WhatsApp</label>
                                    <input type="text" name="whatsapp" defaultValue={editingRegistration.whatsapp} className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-white font-medium outline-none focus:border-[var(--color-primary)] transition-all" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Instagram</label>
                                    <input type="text" name="instagram" defaultValue={editingRegistration.instagram} className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-white font-medium outline-none focus:border-[var(--color-primary)] transition-all" />
                                </div>
                            </div>

                            <div className="pt-6 flex flex-col gap-4">
                                {editingRegistration.scanned && (
                                    <button type="button" onClick={handleResetQR} className="w-full py-4 bg-orange-50 text-orange-600 font-bold rounded-2xl border border-orange-100 hover:bg-orange-100 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                                        <Repeat size={16} /> Reiniciar Estado QR
                                    </button>
                                )}
                                <div className="flex gap-4">
                                    <button type="button" onClick={() => setEditingRegistration(null)} className="flex-1 py-4 bg-white text-stone-500 font-bold rounded-2xl border border-stone-200 hover:bg-stone-50 transition-all text-xs uppercase tracking-widest">Descartar</button>
                                    <button type="submit" disabled={isSubmitting} className="flex-1 py-4 bg-[var(--color-primary)] text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-[var(--color-primary-light)] transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                                        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} Sincronizar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
