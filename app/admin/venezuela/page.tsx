'use client';

import { useState, useEffect } from 'react';
import { Download, Loader2, Users, MapPin, Calendar, Phone, QrCode, X, CheckCircle2, XCircle, Camera, Pencil, Trash2, AlertCircle, Repeat } from 'lucide-react';
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
    const [deletingId, setDeletingId] = useState<string | null>(null);
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
                // The QR contains a URL like: https://target.com/admin/venezuela/entry/ID
                // Or sometimes just the path. We extract the ID or the path.
                if (decodedText.includes('/admin/venezuela/entry/')) {
                    const url = new URL(decodedText);
                    router.push(url.pathname);
                    setIsScanning(false);
                } else if (decodedText.startsWith('/')) {
                    router.push(decodedText);
                    setIsScanning(false);
                }
            }, (error) => {
                // console.warn(error);
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
        if (!confirm('¿Estás seguro de que deseas eliminar este registro?')) return;

        try {
            const res = await fetch(`/api/admin/venezuela/registrations/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setRegistrations(prev => prev.filter(r => r.id !== id));
            } else {
                alert('Error al eliminar el registro');
            }
        } catch (error) {
            console.error('Error deleting registration:', error);
            alert('Error de conexión');
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
            } else {
                alert('Error al actualizar el registro');
            }
        } catch (error) {
            console.error('Error updating registration:', error);
            alert('Error de conexión');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResetQR = async () => {
        if (!editingRegistration) return;
        if (!confirm('¿Estás seguro de que deseas reiniciar el estado del QR a pendiente?')) return;

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
            } else {
                alert('Error al reiniciar el QR');
            }
        } catch (error) {
            console.error('Error resetting QR:', error);
            alert('Error de conexión');
        } finally {
            setIsSubmitting(false);
        }
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
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsScanning(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#C1530A] text-white font-bold rounded-xl hover:bg-[#A84A2F] transition-colors"
                    >
                        <Camera className="w-5 h-5" />
                        Escanear QR
                    </button>
                    <button
                        onClick={async () => {
                            if (!confirm('¿Estás seguro de que deseas eliminar registros con correos o números duplicados? Esta acción es permanente.')) return;
                            try {
                                setLoading(true);
                                const res = await fetch('/api/admin/venezuela/registrations/deduplicate', { method: 'POST' });
                                const data = await res.json();
                                alert(data.message || data.error);
                                fetchRegistrations();
                            } catch (e) {
                                alert('Error al procesar la limpieza');
                            } finally {
                                setLoading(false);
                            }
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-colors"
                    >
                        <Repeat className="w-5 h-5" />
                        Limpiar Duplicados
                    </button>
                    <button
                        onClick={exportToCSV}
                        disabled={registrations.length === 0}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                        <Download className="w-5 h-5" />
                        Exportar CSV
                    </button>
                </div>
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
                            {registrations.filter((r: Registration) => new Date(r.createdAt) > new Date(Date.now() - 86400000)).length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
                <div className="flex-grow">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block">Buscador</label>
                    <input
                        type="text"
                        placeholder="Buscar por nombre, email o WhatsApp..."
                        className="w-full px-5 py-3 rounded-2xl border border-stone-100 bg-stone-50 text-stone-700 focus:ring-2 focus:ring-[#C1530A]/20 focus:border-[#C1530A] transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="md:w-48">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block">Ciudad</label>
                    <select
                        className="w-full px-5 py-3 rounded-2xl border border-stone-100 bg-stone-50 text-stone-700 outline-none"
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                    >
                        <option value="all">Todas las ciudades</option>
                        {Array.from(new Set(registrations.map((r: Registration) => r.city))).sort().map((city: string) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div className="md:w-48">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 block">Estado</label>
                    <select
                        className="w-full px-5 py-3 rounded-2xl border border-stone-100 bg-stone-50 text-stone-700 outline-none"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">Cualquier estado</option>
                        <option value="scanned">Escaneados</option>
                        <option value="pending">Pendientes</option>
                    </select>
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
                                <th className="text-left px-6 py-4 text-sm font-bold text-stone-500 uppercase tracking-widest">Instagram</th>
                                <th className="text-left px-6 py-4 text-sm font-bold text-stone-500 uppercase tracking-widest">Ciudad</th>
                                <th className="text-left px-6 py-4 text-sm font-bold text-stone-500 uppercase tracking-widest">Email</th>
                                <th className="text-left px-6 py-4 text-sm font-bold text-stone-500 uppercase tracking-widest">Fecha y Hora</th>
                                <th className="text-center px-6 py-4 text-sm font-bold text-stone-500 uppercase tracking-widest">Estado</th>
                                <th className="text-center px-6 py-4 text-sm font-bold text-stone-500 uppercase tracking-widest">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {(() => {
                                const filtered = registrations.filter((r: Registration) => {
                                    const matchesSearch =
                                        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        r.whatsapp.includes(searchTerm);

                                    const matchesCity = cityFilter === 'all' || r.city === cityFilter;
                                    const matchesStatus = statusFilter === 'all' ||
                                        (statusFilter === 'scanned' ? r.scanned : !r.scanned);

                                    return matchesSearch && matchesCity && matchesStatus;
                                });

                                if (filtered.length === 0) {
                                    return (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-20 text-center text-stone-400">
                                                No se encontraron resultados que coincidan con los filtros.
                                            </td>
                                        </tr>
                                    );
                                }

                                return filtered.map((r: Registration) => (
                                    <tr key={r.id} className="hover:bg-stone-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-[var(--color-primary)]">{r.name}</td>
                                        <td className="px-6 py-4 text-stone-600">{r.whatsapp}</td>
                                        <td className="px-6 py-4 text-stone-500 text-sm">{r.instagram || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-bold text-stone-600 uppercase tracking-wider line-clamp-1 max-w-[150px]">
                                                {r.city}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-stone-500 text-sm whitespace-nowrap">{r.email}</td>
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
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => setSelectedRegistration(r)}
                                                    className="p-2 bg-stone-100 text-stone-600 rounded-lg hover:bg-stone-200 transition-colors"
                                                    title="Ver Pase QR"
                                                >
                                                    <QrCode className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => setEditingRegistration(r)}
                                                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                                    title="Editar"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(r.id)}
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ));
                            })()}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Ticket Preview Modal */}
            {
                selectedRegistration && (
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
                                    id={selectedRegistration.id}
                                    name={selectedRegistration.name}
                                    city={selectedRegistration.city}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
            {/* QR Scanner Modal */}
            {isScanning && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        onClick={() => setIsScanning(false)}
                    />
                    <div className="relative w-full max-w-md bg-white rounded-[3rem] p-8 shadow-2xl">
                        <button
                            onClick={() => setIsScanning(false)}
                            className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-900 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-[#C1530A]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#C1530A]/20">
                                <Camera className="w-8 h-8 text-[#C1530A]" />
                            </div>
                            <h3 className="text-xl font-bold font-heading text-stone-900">Escanear Pase</h3>
                            <p className="text-sm text-stone-500 mt-1">Coloca el código QR frente a la cámara</p>
                        </div>

                        <div id="qr-reader" className="overflow-hidden rounded-2xl border-2 border-dashed border-stone-200"></div>

                        <p className="text-[10px] text-center mt-6 text-stone-400 font-bold uppercase tracking-widest">
                            Control de Acceso • Venezuela en el Cuerpo
                        </p>
                    </div>
                </div>
            )}

            {/* Edit Registration Modal */}
            {editingRegistration && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setEditingRegistration(null)}
                    />
                    <div className="relative w-full max-w-md bg-white rounded-[2rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setEditingRegistration(null)}
                            className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-900 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold font-heading text-stone-900">Editar Registro</h3>
                            <p className="text-sm text-stone-500 mt-1">Actualiza la información del participante</p>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1 block">Nombre Completo</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={editingRegistration.name}
                                    className="w-full px-5 py-3 rounded-2xl border border-stone-100 bg-stone-50 text-stone-700 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1 block">Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    defaultValue={editingRegistration.email}
                                    className="w-full px-5 py-3 rounded-2xl border border-stone-100 bg-stone-50 text-stone-700 outline-none"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1 block">WhatsApp</label>
                                    <input
                                        type="text"
                                        name="whatsapp"
                                        defaultValue={editingRegistration.whatsapp}
                                        className="w-full px-5 py-3 rounded-2xl border border-stone-100 bg-stone-50 text-stone-700 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1 block">Ciudad</label>
                                    <input
                                        type="text"
                                        name="city"
                                        defaultValue={editingRegistration.city}
                                        className="w-full px-5 py-3 rounded-2xl border border-stone-100 bg-stone-50 text-stone-700 outline-none"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1 block">Instagram</label>
                                <input
                                    type="text"
                                    name="instagram"
                                    defaultValue={editingRegistration.instagram}
                                    className="w-full px-5 py-3 rounded-2xl border border-stone-100 bg-stone-50 text-stone-700 outline-none"
                                    placeholder="@usuario"
                                />
                            </div>
                            <div className="pt-4 flex flex-col gap-3">
                                <button
                                    type="button"
                                    onClick={handleResetQR}
                                    disabled={isSubmitting}
                                    className={`w-full py-3 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 border ${editingRegistration.scanned
                                            ? "bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100"
                                            : "bg-stone-50 text-stone-400 border-stone-100 cursor-not-allowed opacity-60"
                                        }`}
                                >
                                    <Repeat className="w-4 h-4" />
                                    {editingRegistration.scanned ? "Reiniciar QR (Volver a pendiente)" : "QR ya está en pendiente"}
                                </button>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setEditingRegistration(null)}
                                        className="flex-1 py-3 bg-stone-100 text-stone-600 font-bold rounded-xl hover:bg-stone-200 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 py-3 bg-[#C1530A] text-white font-bold rounded-xl hover:bg-[#A84A2F] transition-colors disabled:opacity-50 flex items-center justify-center"
                                    >
                                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Guardar Cambios'}
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
