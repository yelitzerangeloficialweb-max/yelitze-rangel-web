'use client';

import { useState, useEffect } from 'react';
import { 
    format, 
    addMonths, 
    subMonths, 
    startOfMonth, 
    endOfMonth, 
    startOfWeek, 
    endOfWeek, 
    isSameMonth, 
    isSameDay, 
    addDays, 
    eachDayOfInterval 
} from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Loader2, Save, Calendar as CalendarIcon, Clock, User, Video, Info, Check, Phone, Mail, ExternalLink, X, FileText } from 'lucide-react';
import React from 'react';

interface Availability {
    id: string;
    date: string;
    morningEnabled: boolean;
    afternoonEnabled: boolean;
}

interface Appointment {
    id: string;
    date: string;
    slot: 'morning' | 'afternoon';
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    paymentMethod: string;
    status: string;
    meetingType?: string;
    notes?: string;
}

export default function AdminAvailabilityPage() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [availability, setAvailability] = useState<Availability[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchData();
    }, [currentMonth]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const availRes = await fetch('/api/admin/availability');
            if (availRes.ok && availRes.headers.get('content-type')?.includes('application/json')) {
                const availData = await availRes.json().catch(() => null);
                if (Array.isArray(availData)) {
                    setAvailability(availData);
                }
            }

            const appRes = await fetch('/api/admin/appointments'); 
            if (appRes.ok && appRes.headers.get('content-type')?.includes('application/json')) {
                const appData = await appRes.json().catch(() => null);
                if (Array.isArray(appData)) {
                    setAppointments(appData);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleAvailability = async (date: Date, slot: 'morning' | 'afternoon') => {
        const normalizedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dateKey = format(date, 'yyyy-MM-dd');
        
        setSaving(dateKey);
        
        try {
            const existing = availability.find(a => {
                if (!a || !a.date) return false;
                return new Date(a.date).getTime() === normalizedDate.getTime();
            });

            const morningEnabled = slot === 'morning' ? !existing?.morningEnabled : existing?.morningEnabled ?? false;
            const afternoonEnabled = slot === 'afternoon' ? !existing?.afternoonEnabled : existing?.afternoonEnabled ?? false;

            const res = await fetch('/api/admin/availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date: normalizedDate.toISOString(),
                    morningEnabled,
                    afternoonEnabled
                })
            });

            if (res.ok) {
                const updated = await res.json();
                setAvailability(prev => {
                    const filtered = prev.filter(a => new Date(a.date).getTime() !== normalizedDate.getTime());
                    return [...filtered, updated];
                });
            }
        } catch (error) {
            console.error('Error saving availability:', error);
        } finally {
            setSaving(null);
        }
    };

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    if (!mounted) return null;

    return (
        <div className="space-y-8 pb-20 animate-fade-in">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-heading font-bold text-[var(--color-primary)] mb-2">
                        Agenda y Sesiones
                    </h1>
                    <p className="text-stone-500 font-medium italic">Gestiona tus horarios de atención y consultas activas.</p>
                </div>
                
                <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-[2rem] border border-stone-100 shadow-sm">
                    <button 
                        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                        className="p-3 hover:bg-stone-50 rounded-xl transition-all hover:text-[var(--color-primary)]"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <span className="text-xl font-heading font-bold text-[var(--color-primary)] min-w-[180px] text-center capitalize">
                        {format(currentMonth, 'MMMM yyyy', { locale: es })}
                    </span>
                    <button 
                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                        className="p-3 hover:bg-stone-50 rounded-xl transition-all hover:text-[var(--color-primary)]"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Calendar View */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-stone-100 relative overflow-hidden">
                        {loading && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                                <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary)]" />
                            </div>
                        )}
                        
                        {/* Day Names */}
                        <div className="grid grid-cols-7 mb-6">
                            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                                <div key={day} className="text-center text-[10px] font-bold text-stone-400 uppercase tracking-widest pb-4">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-3">
                            {calendarDays.map((day, i) => {
                                const calendarDayUTC = new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate()));
                                const dayAvailability = availability.find(a => a && a.date && new Date(a.date).getTime() === calendarDayUTC.getTime());
                                const dayAppointments = appointments.filter(a => a && a.date && new Date(a.date).getTime() === calendarDayUTC.getTime());
                                const isMorningBooked = dayAppointments.some(a => a.slot === 'morning');
                                const isAfternoonBooked = dayAppointments.some(a => a.slot === 'afternoon');
                                const isToday = isSameDay(day, new Date());
                                const isCurrentMonth = isSameMonth(day, monthStart);

                                return (
                                    <div 
                                        key={i} 
                                        className={`min-h-[160px] rounded-[2rem] p-4 transition-all border ${
                                            !isCurrentMonth ? 'opacity-20 pointer-events-none' : 'bg-stone-50/50 border-stone-100'
                                        } ${isToday ? 'bg-stone-100/50 border-[var(--color-primary)]/20' : ''}`}
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <span className={`text-sm font-bold ${isToday ? 'text-[var(--color-primary)]' : 'text-stone-400'}`}>
                                                {format(day, 'd')}
                                            </span>
                                            {isToday && <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></div>}
                                        </div>

                                        <div className="space-y-2">
                                            {/* Morning */}
                                            <button
                                                onClick={() => toggleAvailability(day, 'morning')}
                                                disabled={saving === format(day, 'yyyy-MM-dd')}
                                                className={`w-full group relative overflow-hidden px-3 py-3 rounded-2xl transition-all flex flex-col items-start gap-1 border ${
                                                    dayAvailability?.morningEnabled 
                                                        ? 'bg-white border-emerald-100 shadow-sm' 
                                                        : 'bg-stone-100/50 border-transparent grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between w-full">
                                                    <span className={`text-[8px] font-bold uppercase tracking-widest ${dayAvailability?.morningEnabled ? 'text-emerald-600' : 'text-stone-400'}`}>AM</span>
                                                    {isMorningBooked ? (
                                                        <div className="flex items-center gap-1 bg-emerald-500 text-white p-1 rounded-full animate-pulse">
                                                            <Check size={8} strokeWidth={4} />
                                                        </div>
                                                    ) : (
                                                        <div className={`w-1.5 h-1.5 rounded-full ${dayAvailability?.morningEnabled ? 'bg-emerald-400' : 'bg-stone-200'}`}></div>
                                                    )}
                                                </div>
                                                <span className={`text-[9px] font-bold ${dayAvailability?.morningEnabled ? 'text-stone-700' : 'text-stone-400'}`}>
                                                    {isMorningBooked ? 'Ocupado' : (dayAvailability?.morningEnabled ? 'Libre' : 'Cerrado')}
                                                </span>
                                            </button>

                                            {/* Afternoon */}
                                            <button
                                                onClick={() => toggleAvailability(day, 'afternoon')}
                                                disabled={saving === format(day, 'yyyy-MM-dd')}
                                                className={`w-full group relative overflow-hidden px-3 py-3 rounded-2xl transition-all flex flex-col items-start gap-1 border ${
                                                    dayAvailability?.afternoonEnabled 
                                                        ? 'bg-white border-amber-100 shadow-sm' 
                                                        : 'bg-stone-100/50 border-transparent grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between w-full">
                                                    <span className={`text-[8px] font-bold uppercase tracking-widest ${dayAvailability?.afternoonEnabled ? 'text-amber-600' : 'text-stone-400'}`}>PM</span>
                                                    {isAfternoonBooked ? (
                                                        <div className="flex items-center gap-1 bg-amber-500 text-white p-1 rounded-full animate-pulse">
                                                            <Check size={8} strokeWidth={4} />
                                                        </div>
                                                    ) : (
                                                        <div className={`w-1.5 h-1.5 rounded-full ${dayAvailability?.afternoonEnabled ? 'bg-amber-400' : 'bg-stone-200'}`}></div>
                                                    )}
                                                </div>
                                                <span className={`text-[9px] font-bold ${dayAvailability?.afternoonEnabled ? 'text-stone-700' : 'text-stone-400'}`}>
                                                    {isAfternoonBooked ? 'Ocupado' : (dayAvailability?.afternoonEnabled ? 'Libre' : 'Cerrado')}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar: Stats & Next Appts */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Next Appointments */}
                    <div className="bg-white p-8 rounded-[3rem] border border-stone-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-heading font-bold text-[var(--color-primary)]">Próximas Sesiones</h3>
                            <div className="w-10 h-10 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400">
                                <Clock size={20} />
                            </div>
                        </div>

                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {appointments.length === 0 ? (
                                <div className="py-10 text-center">
                                    <p className="text-stone-400 italic text-sm">No hay citas registradas.</p>
                                </div>
                            ) : (
                                appointments
                                    .filter(a => new Date(a.date).getTime() >= new Date().setHours(0,0,0,0))
                                    .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                                    .slice(0, 8)
                                    .map(app => (
                                        <button 
                                            key={app.id} 
                                            onClick={() => setSelectedAppointment(app)}
                                            className="w-full group p-4 rounded-[1.5rem] bg-stone-50 border border-transparent hover:border-[var(--color-primary)]/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all text-left"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                                                    app.slot === 'morning' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                                }`}>
                                                    {app.slot === 'morning' ? 'Mañana' : 'Tarde'}
                                                </span>
                                                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                                    {format(new Date(app.date), 'dd MMM')}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-stone-900 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">{app.customerName}</h4>
                                            <div className="flex items-center gap-3 mt-2">
                                                <div className="flex items-center gap-1 text-[10px] text-stone-400 font-bold uppercase">
                                                    {app.meetingType === 'presencial' ? <User size={10} /> : <Video size={10} />}
                                                    {app.meetingType || 'Online'}
                                                </div>
                                            </div>
                                        </button>
                                    ))
                            )}
                        </div>
                    </div>

                    {/* Quick Guide */}
                    <div className="bg-[var(--color-primary)] p-8 rounded-[3rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                        <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-3">
                            <Info size={24} className="text-[var(--color-secondary)]" />
                            Guía de Agenda
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { text: 'Los bloques activos son visibles para los usuarios.', icon: Check },
                                { text: 'Haz clic en un bloque AM/PM para cambiar su estado.', icon: Check },
                                { text: 'Las citas confirmadas se marcan con un check automático.', icon: Check },
                                { text: 'Citas presenciales se distinguen de las virtuales por color.', icon: Check },
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-4 text-sm font-medium opacity-80 leading-relaxed">
                                    <div className="mt-1 flex-shrink-0">
                                        <item.icon size={14} className="text-[var(--color-secondary)]" />
                                    </div>
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Detailed Appointment Modal */}
            {selectedAppointment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="relative w-full max-w-xl bg-[#FAF9F6] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="p-8 border-b border-stone-200 bg-white flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg text-white ${
                                    selectedAppointment.meetingType === 'presencial' ? 'bg-amber-500' : 'bg-blue-500'
                                }`}>
                                    {selectedAppointment.meetingType === 'presencial' ? <User size={28} /> : <Video size={28} />}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-heading font-bold text-[var(--color-primary)]">Detalle de Sesión</h2>
                                    <p className="text-stone-500 font-medium italic">Gestión de contacto y logística para esta cita.</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedAppointment(null)} className="p-4 text-stone-400 hover:text-stone-900 transition-colors">
                                <X size={32} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-10 space-y-8 bg-white/50">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Paciente / Cliente</label>
                                    <div className="bg-white p-4 rounded-2xl border border-stone-100 font-bold text-stone-900 text-lg">
                                        {selectedAppointment.customerName}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Modalidad de Sesión</label>
                                    <div className={`p-4 rounded-2xl border font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 ${
                                        selectedAppointment.meetingType === 'presencial' 
                                            ? 'bg-amber-50 border-amber-100 text-amber-700' 
                                            : 'bg-blue-50 border-blue-100 text-blue-700'
                                    }`}>
                                        {selectedAppointment.meetingType === 'presencial' ? <User size={14} /> : <Video size={14} />}
                                        {selectedAppointment.meetingType || 'Online / Por Definir'}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Contacto Directo</label>
                                    <a 
                                        href={`https://wa.me/${selectedAppointment.customerPhone.replace(/\D/g, '')}`} 
                                        target="_blank"
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-stone-100 hover:border-emerald-500/30 transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                            <Phone size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">WhatsApp</p>
                                            <p className="text-sm font-bold text-stone-700">{selectedAppointment.customerPhone}</p>
                                        </div>
                                        <ExternalLink size={14} className="ml-auto text-stone-300 group-hover:text-emerald-500 transition-colors" />
                                    </a>
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-stone-100">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                            <Mail size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Correo</p>
                                            <p className="text-sm font-bold text-stone-700">{selectedAppointment.customerEmail}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Logística de Cita</label>
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-stone-100">
                                        <div className="w-10 h-10 rounded-xl bg-stone-50 text-stone-600 flex items-center justify-center">
                                            <CalendarIcon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Fecha</p>
                                            <p className="text-sm font-bold text-stone-700 capitalize">
                                                {format(new Date(selectedAppointment.date), 'EEEE, dd MMM', { locale: es })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-stone-100">
                                        <div className="w-10 h-10 rounded-xl bg-stone-50 text-stone-600 flex items-center justify-center">
                                            <Clock size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Franja Horaria</p>
                                            <p className="text-sm font-bold text-stone-700">
                                                {selectedAppointment.slot === 'morning' ? 'Mañana (9:00 - 13:00)' : 'Tarde (14:00 - 18:00)'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {selectedAppointment.notes && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">Notas del Paciente</label>
                                    <div className="p-6 bg-white rounded-3xl border border-stone-100 italic text-stone-600 text-sm leading-relaxed relative">
                                        <div className="absolute top-4 left-4 text-stone-100 opacity-50">
                                            <FileText size={40} />
                                        </div>
                                        <p className="relative z-10">"{selectedAppointment.notes}"</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 border-t border-stone-200 bg-white flex gap-6">
                            <div className="flex items-center gap-3 mr-auto">
                                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Pago:</span>
                                <span className="px-4 py-2 bg-stone-100 rounded-full text-[10px] font-bold text-stone-600 uppercase tracking-widest">
                                    {selectedAppointment.paymentMethod}
                                </span>
                            </div>
                            <button 
                                onClick={() => setSelectedAppointment(null)}
                                className="px-12 py-5 bg-[var(--color-primary)] text-white font-bold rounded-[1.5rem] shadow-xl shadow-primary/20 hover:bg-[var(--color-primary-light)] transition-all text-xs uppercase tracking-[0.3em]"
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
