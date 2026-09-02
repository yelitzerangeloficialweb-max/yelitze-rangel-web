'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { Users, Loader2, Mail, User, Calendar, Phone, Search, Download, Edit2, Trash2, X, Check, MapPin, MoreVertical, ExternalLink, FileSpreadsheet } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import React from 'react';

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
            if (res.status === 401) {
                window.location.href = '/admin/login?redirect=/admin/workshop';
                return;
            }
            if (!res.ok) throw new Error('Error al cargar inscripciones');
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
            <div className="flex flex-col items-center justify-center py-40 gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-[var(--color-primary)]" />
                <p className="text-stone-500 font-medium italic">Cargando almas...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-heading font-bold text-[var(--color-primary)] mb-2">
                        Inscripciones Workshop
                    </h1>
                    <p className="text-stone-500 font-medium italic">
                        Gestiona las almas listas para conectar y sanar.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-white px-8 py-4 rounded-[2rem] border border-stone-100 shadow-sm hidden md:flex items-center gap-4">
                        <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center text-[var(--color-primary)]">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Total Inscritos</p>
                            <p className="text-2xl font-heading font-bold text-[var(--color-primary)] leading-none">{registrations.length}</p>
                        </div>
                    </div>
                    <button
                        onClick={downloadCSV}
                        className="flex items-center justify-center gap-3 px-10 py-5 bg-[var(--color-primary)] text-white font-bold rounded-[1.5rem] hover:bg-[var(--color-primary-light)] transition-all shadow-xl shadow-primary/20 hover:-translate-y-1"
                    >
                        <FileSpreadsheet className="w-5 h-5" />
                        Exportar
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative group">
                <div className="absolute inset-0 bg-[var(--color-primary)]/5 blur-2xl rounded-[3rem] opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center bg-white p-2 rounded-[2.5rem] border border-stone-100 shadow-sm transition-all focus-within:shadow-xl focus-within:border-[var(--color-primary)]/20">
                    <div className="w-14 h-14 flex items-center justify-center text-stone-300">
                        <Search size={24} />
                    </div>
                    <input 
                        type="text"
                        placeholder="Busca por nombre, email, ciudad..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow bg-transparent border-none outline-none text-lg text-stone-700 placeholder:text-stone-300 font-medium"
                    />
                </div>
            </div>

            {/* Content Area */}
            {filteredRegistrations.length === 0 ? (
                <div className="bg-white rounded-[4rem] py-32 text-center border border-stone-100 shadow-sm animate-fade-in">
                    <div className="w-32 h-32 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-8 text-stone-200">
                        <Users size={64} strokeWidth={1} />
                    </div>
                    <h2 className="text-3xl font-heading text-[var(--color-primary)] font-bold mb-3">Sin resultados</h2>
                    <p className="text-stone-400 font-medium max-w-sm mx-auto italic">No hemos encontrado inscripciones con esos términos.</p>
                </div>
            ) : (
                <div className="bg-white rounded-[3.5rem] overflow-hidden border border-stone-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-stone-100 bg-[#FBFBFB]">
                                    <th className="px-10 py-8 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Inscrita</th>
                                    <th className="px-10 py-8 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Contacto Directo</th>
                                    <th className="px-10 py-8 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Ubicación</th>
                                    <th className="px-10 py-8 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Fecha</th>
                                    <th className="px-10 py-8 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-50">
                                {filteredRegistrations.map(reg => (
                                    <tr key={reg.id} className="group hover:bg-[#F9F8F6] transition-all duration-300">
                                        <td className="px-10 py-8">
                                            {editingId === reg.id ? (
                                                <input 
                                                    type="text" 
                                                    value={editForm.name} 
                                                    onChange={e => setEditForm({...editForm, name: e.target.value})}
                                                    className="w-full px-6 py-4 border border-stone-200 rounded-[1rem] outline-none focus:border-[var(--color-primary)] bg-white font-bold text-[var(--color-primary)] shadow-inner"
                                                />
                                            ) : (
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 rounded-[1.5rem] bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-400 font-bold text-xl group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all shadow-sm">
                                                        {reg.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-lg text-stone-900 group-hover:text-[var(--color-primary)] transition-colors leading-tight mb-1">{reg.name}</p>
                                                        <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">ID: {reg.id.slice(-6).toUpperCase()}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-10 py-8">
                                            {editingId === reg.id ? (
                                                <div className="space-y-3">
                                                    <input 
                                                        type="email" 
                                                        value={editForm.email} 
                                                        onChange={e => setEditForm({...editForm, email: e.target.value})}
                                                        className="w-full px-5 py-3 border border-stone-200 rounded-xl outline-none text-sm font-medium"
                                                    />
                                                    <input 
                                                        type="text" 
                                                        value={editForm.whatsapp} 
                                                        onChange={e => setEditForm({...editForm, whatsapp: e.target.value})}
                                                        className="w-full px-5 py-3 border border-stone-200 rounded-xl outline-none text-sm font-medium"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    <a href={`mailto:${reg.email}`} className="flex items-center gap-3 text-stone-600 hover:text-[var(--color-primary)] transition-colors font-medium text-sm group/link">
                                                        <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center group-hover/link:bg-primary/5">
                                                            <Mail size={14} className="text-stone-300" />
                                                        </div>
                                                        {reg.email}
                                                    </a>
                                                    <a href={`https://wa.me/${reg.whatsapp.replace(/\D/g, '')}`} target="_blank" className="flex items-center gap-3 text-stone-600 hover:text-emerald-600 transition-colors font-medium text-sm group/link">
                                                        <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center group-hover/link:bg-emerald-50">
                                                            <Phone size={14} className="text-stone-300" />
                                                        </div>
                                                        {reg.whatsapp}
                                                    </a>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-10 py-8">
                                            {editingId === reg.id ? (
                                                <input 
                                                    type="text" 
                                                    value={editForm.city} 
                                                    onChange={e => setEditForm({...editForm, city: e.target.value})}
                                                    className="w-full px-5 py-3 border border-stone-200 rounded-xl outline-none text-sm font-medium"
                                                />
                                            ) : (
                                                <div className="flex items-center gap-3 text-stone-700 font-bold">
                                                    <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                                        <MapPin size={14} className="text-[var(--color-primary)]" />
                                                    </div>
                                                    <span className="text-sm">{reg.city}</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-10 py-8 text-stone-400 font-bold">
                                            <div className="flex items-center gap-3">
                                                <Calendar size={14} />
                                                <span className="text-[11px] uppercase tracking-wider">{format(new Date(reg.createdAt), "d MMM, yy", { locale: es })}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                {editingId === reg.id ? (
                                                    <>
                                                        <button 
                                                            onClick={handleEditSave}
                                                            disabled={actionLoading === reg.id}
                                                            className="px-6 py-3 bg-[var(--color-primary)] text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2"
                                                        >
                                                            {actionLoading === reg.id ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} strokeWidth={3} />}
                                                            Guardar
                                                        </button>
                                                        <button 
                                                            onClick={handleEditCancel}
                                                            className="p-3 text-stone-400 hover:text-stone-900 transition-colors"
                                                        >
                                                            <X size={20} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button 
                                                            onClick={() => handleEditStart(reg)}
                                                            className="w-12 h-12 flex items-center justify-center bg-white border border-stone-100 rounded-xl text-stone-400 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 hover:shadow-lg transition-all"
                                                        >
                                                            <Edit2 size={18} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(reg.id)}
                                                            className="w-12 h-12 flex items-center justify-center bg-white border border-stone-100 rounded-xl text-stone-400 hover:text-rose-500 hover:border-rose-100 hover:shadow-lg transition-all"
                                                        >
                                                            <Trash2 size={18} />
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
