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
import { ChevronLeft, ChevronRight, Loader2, Save, Calendar as CalendarIcon, Clock, User, Video } from 'lucide-react';

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
        // Create a TRUE Midnight UTC date from the face value of the local date
        const normalizedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dateKey = format(date, 'yyyy-MM-dd');
        
        // Disable the entire day while saving to prevent stale data race conditions
        setSaving(dateKey);
        
        try {
            // Re-find based on strict UTC comparison to get the absolute latest state
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
                    // Filter out using same strict UTC logic
                    const filtered = prev.filter(a => new Date(a.date).getTime() !== normalizedDate.getTime());
                    return [...filtered, updated];
                });
            } else {
                const errorData = await res.json().catch(() => ({}));
                alert(`Error al guardar: ${errorData.details || errorData.error || res.statusText}`);
            }
        } catch (error) {
            console.error('Error saving availability:', error);
            alert('Error de conexión al intentar guardar.');
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
                    // Create a comparable UTC midnight date from the calendar day's local face-value
                    const calendarDayUTC = new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate()));
                    
                    const dayAvailability = availability.find(a => a && a.date && new Date(a.date).getTime() === calendarDayUTC.getTime());
                    const dayAppointments = appointments.filter(a => a && a.date && new Date(a.date).getTime() === calendarDayUTC.getTime());
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
                                    disabled={saving === format(day, 'yyyy-MM-dd')}
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
                                    disabled={saving === format(day, 'yyyy-MM-dd')}
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
                            appointments.filter(a => {
                                if (!a?.date) return false;
                                // Create UTC midnight for today
                                const now = new Date();
                                const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
                                // Compare against appointment date
                                return new Date(a.date).getTime() >= todayUTC;
                            }).slice(0, 15).map(app => (
                                <button 
                                    key={app.id} 
                                    onClick={() => setSelectedAppointment(app)}
                                    className="w-full text-left p-4 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-between hover:bg-stone-100 hover:border-stone-200 transition-all group"
                                >
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-bold text-[var(--color-primary)]">{app.customerName}</p>
                                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                                                app.meetingType === 'presencial' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                                {app.meetingType === 'presencial' ? 'Presencial' : 'Online'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-stone-500">
                                            {format(new Date(app.date), 'dd/MM/yyyy')} - {app.slot === 'morning' ? 'Mañana' : 'Tarde'}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="px-3 py-1 bg-white border border-stone-200 rounded-full text-[10px] font-bold text-stone-400 uppercase">
                                            {app.paymentMethod}
                                        </span>
                                        <span className="text-[9px] text-[var(--color-secondary)] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Ver detalle →</span>
                                    </div>
                                </button>
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

            {/* Appointment Detail Modal */}
            {selectedAppointment && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden border border-stone-100 animate-in fade-in zoom-in duration-200">
                        <div className="bg-[var(--color-primary)] p-8 text-white relative">
                            <button 
                                onClick={() => setSelectedAppointment(null)}
                                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <ChevronRight className="w-6 h-6 rotate-45" />
                            </button>
                            <span className="text-xs font-bold text-[var(--color-secondary)] uppercase tracking-widest mb-2 block">Detalle de Reserva</span>
                            <h2 className="text-3xl font-heading font-bold">{selectedAppointment.customerName}</h2>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1">Email</label>
                                    <p className="text-sm font-medium text-stone-700">{selectedAppointment.customerEmail}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1">WhatsApp</label>
                                    <a 
                                        href={`https://wa.me/${selectedAppointment.customerPhone.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-bold text-[var(--color-secondary)] hover:underline flex items-center gap-1.5"
                                    >
                                        {selectedAppointment.customerPhone}
                                        <span className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-full">Abrir Chat</span>
                                    </a>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-stone-50">
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1">Fecha</label>
                                    <p className="text-sm font-bold text-[var(--color-primary)]">
                                        {format(new Date(selectedAppointment.date), 'EEEE, dd/MM/yyyy', { locale: es })}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1">Horario</label>
                                    <p className="text-sm font-bold text-[var(--color-primary)]">
                                        {selectedAppointment.slot === 'morning' ? 'Mañana (9 AM - 1 PM)' : 'Tarde (2 PM - 6 PM)'}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-stone-50">
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1">Modalidad</label>
                                    <div className="flex items-center gap-2">
                                        {selectedAppointment.meetingType === 'presencial' ? (
                                            <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full font-bold text-[10px]">
                                                <User className="w-3 h-3" /> PRESENCIAL
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-bold text-[10px]">
                                                <Video className="w-3 h-3" /> ONLINE (ZOOM)
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1">Método de Pago</label>
                                    <span className="px-3 py-1 bg-stone-100 border border-stone-200 rounded-full text-[10px] font-bold text-stone-500 uppercase">
                                        {selectedAppointment.paymentMethod}
                                    </span>
                                </div>
                            </div>

                            {selectedAppointment.notes && (
                                <div className="pt-4 border-t border-stone-50">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1">Notas del Cliente</label>
                                    <p className="text-sm text-stone-600 bg-stone-50 p-4 rounded-2xl italic leading-relaxed">
                                        "{selectedAppointment.notes}"
                                    </p>
                                </div>
                            )}

                            <div className="pt-6">
                                <button 
                                    onClick={() => setSelectedAppointment(null)}
                                    className="w-full py-4 bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold rounded-2xl transition-all"
                                >
                                    Cerrar Detalle
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
