'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { Users, Loader2, Mail, User, Calendar, Phone, Search, Download, Edit2, Trash2, X, Check } from 'lucide-react';

interface Registration {
    id: string;
    createdAt: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
}

export default function AdminWorkshopPage() {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Registration>>({});
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    useEffect(() => {
        const filtered = registrations.filter(reg => 
            reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.whatsapp.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRegistrations(filtered);
    }, [searchTerm, registrations]);

    const fetchRegistrations = async () => {
        try {
            const res = await fetch('/api/admin/workshop', { cache: 'no-store' });
            const data = await res.json();
            if (Array.isArray(data)) {
                setRegistrations(data);
                setFilteredRegistrations(data);
            }
        } catch (error) {
            console.error('Error fetching registrations:', error);
        } finally {
            setLoading(false);
        }
    };

    const downloadCSV = () => {
        const headers = ['ID', 'Fecha', 'Nombre', 'Email', 'WhatsApp', 'Ciudad/País'];
        const rows = registrations.map(reg => [
            reg.id,
            new Date(reg.createdAt).toLocaleString(),
            reg.name,
            reg.email,
            reg.whatsapp,
            reg.city
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `inscritos_workshop_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás segura de eliminar este registro? Esta acción no se puede deshacer.')) return;
        
        setActionLoading(id);
        try {
            const res = await fetch(`/api/admin/workshop?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setRegistrations(prev => prev.filter(r => r.id !== id));
            }
        } catch (error) {
            console.error('Error deleting registration:', error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleEditStart = (reg: Registration) => {
        setEditingId(reg.id);
        setEditForm(reg);
    };

    const handleEditCancel = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleEditSave = async () => {
        if (!editingId) return;
        
        setActionLoading(editingId);
        try {
            const res = await fetch('/api/admin/workshop', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm),
            });
            
            if (res.ok) {
                const updated = await res.json();
                setRegistrations(prev => prev.map(r => r.id === editingId ? updated : r));
                setEditingId(null);
            }
        } catch (error) {
            console.error('Error updating registration:', error);
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-secondary)]" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-heading text-[var(--color-primary)] font-bold">
                        Inscritos al Workshop
                    </h1>
                    <p className="text-stone-500">{registrations.length} personas registradas en total</p>
                </div>
                <button
                    onClick={downloadCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-xl hover:bg-[var(--color-primary-dark)] transition-colors text-sm font-bold shadow-sm"
                >
                    <Download className="w-4 h-4" />
                    Exportar CSV
                </button>
            </div>

            <div className="mb-6 relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-stone-400">
                    <Search className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    placeholder="Buscar por nombre, email o whatsapp..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/30 transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredRegistrations.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center shadow-sm">
                    <Users className="w-16 h-16 text-stone-200 mx-auto mb-4" />
                    <h2 className="text-xl font-heading text-[var(--color-primary)] mb-2">
                        {searchTerm ? 'No hay resultados para tu búsqueda' : 'No hay inscritos todavía'}
                    </h2>
                    <p className="text-stone-500">
                        {searchTerm ? 'Intenta con otros términos' : 'Aún no se han recibido inscripciones para el workshop'}
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-stone-50 border-b border-stone-100">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-stone-500 uppercase tracking-wider">Nombre</th>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-stone-500 uppercase tracking-wider">Contacto</th>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-stone-500 uppercase tracking-wider">Ciudad/País</th>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-stone-500 uppercase tracking-wider">Fecha Registro</th>
                                    <th className="text-right px-6 py-4 text-sm font-bold text-stone-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {filteredRegistrations.map(reg => (
                                    <tr key={reg.id} className="hover:bg-stone-50 transition-colors">
                                        <td className="px-6 py-5">
                                            {editingId === reg.id ? (
                                                <div className="flex flex-col gap-2">
                                                    <input 
                                                        type="text" 
                                                        value={editForm.name} 
                                                        onChange={e => setEditForm({...editForm, name: e.target.value})}
                                                        className="px-2 py-1 text-sm border rounded"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center text-[var(--color-secondary)]">
                                                        <User className="w-5 h-5" />
                                                    </div>
                                                    <span className="font-bold text-[var(--color-primary)] text-lg">{reg.name}</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-5">
                                            {editingId === reg.id ? (
                                                <div className="flex flex-col gap-2">
                                                    <input 
                                                        type="email" 
                                                        value={editForm.email} 
                                                        onChange={e => setEditForm({...editForm, email: e.target.value})}
                                                        className="px-2 py-1 text-sm border rounded"
                                                    />
                                                    <input 
                                                        type="text" 
                                                        value={editForm.whatsapp} 
                                                        onChange={e => setEditForm({...editForm, whatsapp: e.target.value})}
                                                        className="px-2 py-1 text-sm border rounded"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-stone-600">
                                                        <Mail className="w-4 h-4 text-stone-400" />
                                                        <span className="text-sm">{reg.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-stone-600">
                                                        <Phone className="w-4 h-4 text-stone-400" />
                                                        <span className="text-sm font-medium">{reg.whatsapp}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-5">
                                            {editingId === reg.id ? (
                                                <input 
                                                    type="text" 
                                                    value={editForm.city} 
                                                    onChange={e => setEditForm({...editForm, city: e.target.value})}
                                                    className="px-2 py-1 text-sm border rounded w-full"
                                                />
                                            ) : (
                                                <span className="text-stone-700 font-medium">{reg.city}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-5 text-sm text-stone-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(reg.createdAt).toLocaleDateString('es-ES', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {editingId === reg.id ? (
                                                    <>
                                                        <button 
                                                            onClick={handleEditSave}
                                                            disabled={actionLoading === reg.id}
                                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                            title="Guardar"
                                                        >
                                                            {actionLoading === reg.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                                                        </button>
                                                        <button 
                                                            onClick={handleEditCancel}
                                                            className="p-2 text-stone-400 hover:bg-stone-50 rounded-lg transition-colors"
                                                            title="Cancelar"
                                                        >
                                                            <X className="w-5 h-5" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button 
                                                            onClick={() => handleEditStart(reg)}
                                                            className="p-2 text-stone-400 hover:bg-stone-100 rounded-lg transition-colors hover:text-[var(--color-primary)]"
                                                            title="Editar"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(reg.id)}
                                                            disabled={actionLoading === reg.id}
                                                            className="p-2 text-stone-400 hover:bg-red-50 rounded-lg transition-colors hover:text-red-600"
                                                            title="Eliminar"
                                                        >
                                                            {actionLoading === reg.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
