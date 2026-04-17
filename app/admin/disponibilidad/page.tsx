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
import { ChevronLeft, ChevronRight, Loader2, Save, Calendar as CalendarIcon, Clock, User } from 'lucide-react';

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
}

export default function AdminAvailabilityPage() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [availability, setAvailability] = useState<Availability[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
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
                } else {
                    console.error('Availability data is not an array or invalid:', availData);
                }
            } else {
                console.error('Invalid response from availability API:', availRes.status, availRes.statusText);
            }

            const appRes = await fetch('/api/admin/appointments'); 
            if (appRes.ok && appRes.headers.get('content-type')?.includes('application/json')) {
                const appData = await appRes.json().catch(() => null);
                if (Array.isArray(appData)) {
                    setAppointments(appData);
                } else {
                    console.error('Appointments data is not an array or invalid:', appData);
                }
            } else {
                console.error('Invalid response from appointments API:', appRes.status, appRes.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleAvailability = async (date: Date, slot: 'morning' | 'afternoon') => {
        const dateStr = date.toISOString();
        const key = `${dateStr}-${slot}`;
        setSaving(key);

        const existing = availability.find(a => isSameDay(new Date(a.date), date));
        
        const morningEnabled = slot === 'morning' ? !existing?.morningEnabled : existing?.morningEnabled ?? false;
        const afternoonEnabled = slot === 'afternoon' ? !existing?.afternoonEnabled : existing?.afternoonEnabled ?? false;

        try {
            const res = await fetch('/api/admin/availability', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: dateStr,
                    morningEnabled,
                    afternoonEnabled
                })
            });

            if (res.ok) {
                const updated = await res.json();
                setAvailability(prev => {
                    const filtered = prev.filter(a => !isSameDay(new Date(a.date), date));
                    return [...filtered, updated];
                });
            }
        } catch (error) {
            console.error('Error saving availability:', error);
        } finally {
            setSaving(null);
        }
    };

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-heading text-[var(--color-primary)] font-bold flex items-center gap-3">
                        <CalendarIcon className="w-8 h-8" />
                        Gestión de Disponibilidad
                    </h1>
                    <p className="text-stone-500">Activa o desactiva bloques de citas por la mañana y tarde.</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-stone-100">
                    <button 
                        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                        className="p-2 hover:bg-stone-50 rounded-xl transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6 text-stone-600" />
                    </button>
                    <span className="text-lg font-bold text-[var(--color-primary)] min-w-[150px] text-center capitalize">
                        {format(currentMonth, 'MMMM yyyy', { locale: es })}
                    </span>
                    <button 
                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                        className="p-2 hover:bg-stone-50 rounded-xl transition-colors"
                    >
                        <ChevronRight className="w-6 h-6 text-stone-600" />
                    </button>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        return (
            <div className="grid grid-cols-7 mb-2">
                {days.map(day => (
                    <div key={day} className="text-center text-xs font-bold text-stone-400 uppercase tracking-widest py-2">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const calendarDays = eachDayOfInterval({
            start: startDate,
            end: endDate,
        });

        if (!Array.isArray(availability) || !Array.isArray(appointments)) {
            return <div className="p-8 text-center text-red-500">Error: El formato de datos no es válido.</div>;
        }

        return (
            <div className="grid grid-cols-7 bg-stone-100 gap-px border border-stone-200 rounded-3xl overflow-hidden shadow-inner">
                {calendarDays.map((day, i) => {
                    const dayAvailability = availability.find(a => a && a.date && isSameDay(new Date(a.date), day));
                    const dayAppointments = appointments.filter(a => a && a.date && isSameDay(new Date(a.date), day));
                    const isMorningBooked = dayAppointments.some(a => a.slot === 'morning');
                    const isAfternoonBooked = dayAppointments.some(a => a.slot === 'afternoon');

                    return (
                        <div 
                            key={i} 
                            className={`min-h-[140px] bg-white p-3 transition-colors ${
                                !isSameMonth(day, monthStart) ? 'bg-stone-50/50 grayscale' : ''
                            }`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <span className={`text-sm font-bold ${
                                    isSameDay(day, new Date()) 
                                        ? 'bg-[var(--color-secondary)] text-white w-7 h-7 flex items-center justify-center rounded-full' 
                                        : 'text-stone-400'
                                }`}>
                                    {format(day, 'd')}
                                </span>
                            </div>

                            <div className="space-y-2">
                                {/* Morning Slot */}
                                <button
                                    onClick={() => toggleAvailability(day, 'morning')}
                                    disabled={saving === `${day.toISOString()}-morning`}
                                    className={`w-full text-left p-2 rounded-xl text-[10px] font-bold transition-all flex items-center justify-between group ${
                                        dayAvailability?.morningEnabled 
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100' 
                                            : 'bg-stone-50 text-stone-400 border border-transparent hover:bg-stone-100'
                                    }`}
                                >
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        MAÑANA
                                    </span>
                                    {isMorningBooked ? (
                                        <span className="bg-emerald-500 text-white px-1.5 py-0.5 rounded-md flex items-center gap-1">
                                            <User className="w-2.5 h-2.5" />
                                            OK
                                        </span>
                                    ) : (
                                        <span className={`w-2 h-2 rounded-full ${dayAvailability?.morningEnabled ? 'bg-emerald-400' : 'bg-stone-200'}`}></span>
                                    )}
                                </button>

                                {/* Afternoon Slot */}
                                <button
                                    onClick={() => toggleAvailability(day, 'afternoon')}
                                    disabled={saving === `${day.toISOString()}-afternoon`}
                                    className={`w-full text-left p-2 rounded-xl text-[10px] font-bold transition-all flex items-center justify-between group ${
                                        dayAvailability?.afternoonEnabled 
                                            ? 'bg-amber-50 text-amber-700 border border-amber-100 hover:bg-amber-100' 
                                            : 'bg-stone-50 text-stone-400 border border-transparent hover:bg-stone-100'
                                    }`}
                                >
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        TARDE
                                    </span>
                                    {isAfternoonBooked ? (
                                        <span className="bg-amber-500 text-white px-1.5 py-0.5 rounded-md flex items-center gap-1">
                                            <User className="w-2.5 h-2.5" />
                                            OK
                                        </span>
                                    ) : (
                                        <span className={`w-2 h-2 rounded-full ${dayAvailability?.afternoonEnabled ? 'bg-amber-400' : 'bg-stone-200'}`}></span>
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    if (!mounted) return null;

    if (loading && availability.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-[var(--color-secondary)]" />
                <p className="text-stone-500 font-medium">Cargando disponibilidad...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            {renderHeader()}
            
            <div className="bg-white p-8 rounded-[40px] shadow-xl shadow-stone-200/50 border border-stone-100 mb-12">
                {renderDays()}
                {renderCells()}
            </div>

            {/* Selected Day Details / Appointments List */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[40px] shadow-lg border border-stone-100">
                    <h3 className="text-xl font-heading text-[var(--color-primary)] font-bold mb-6 flex items-center gap-2">
                        <User className="w-6 h-6" />
                        Próximas Citas
                    </h3>
                    <div className="space-y-4">
                        {!Array.isArray(appointments) || appointments.length === 0 ? (
                            <p className="text-stone-400 italic">No hay citas registradas aún.</p>
                        ) : (
                            appointments.filter(a => a && a.date && new Date(a.date) >= new Date()).slice(0, 5).map(app => (
                                <div key={app.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-[var(--color-primary)]">{app.customerName}</p>
                                        <p className="text-xs text-stone-500">
                                            {format(new Date(app.date), 'dd/MM/yyyy')} - {app.slot === 'morning' ? 'Mañana' : 'Tarde'}
                                        </p>
                                    </div>
                                    <span className="px-3 py-1 bg-white border border-stone-200 rounded-full text-[10px] font-bold text-stone-400 uppercase">
                                        {app.paymentMethod}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="bg-[var(--color-primary)] p-8 rounded-[40px] shadow-lg text-white">
                    <h3 className="text-xl font-heading font-bold mb-4">Instrucciones</h3>
                    <ul className="space-y-3 text-sm opacity-90">
                        <li className="flex gap-2">
                            <span className="font-bold text-[var(--color-secondary)]">1.</span>
                            Selecciona los bloques (Mañana o Tarde) en los que estarás disponible para atender citas.
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-[var(--color-secondary)]">2.</span>
                            Los bloques en <span className="text-emerald-300">verde</span> están activos y visibles para el público.
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-[var(--color-secondary)]">3.</span>
                            Cuando un usuario reserva un bloque, aparecerá marcado con un icono de usuario y "OK".
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-[var(--color-secondary)]">4.</span>
                            Recuerda que los cambios son instantáneos.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
