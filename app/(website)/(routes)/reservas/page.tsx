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
    eachDayOfInterval,
    isBefore,
    startOfDay
} from 'date-fns';
import { es } from 'date-fns/locale';
import { 
    ChevronLeft, 
    ChevronRight, 
    Loader2, 
    Clock, 
    User, 
    CheckCircle, 
    Calendar as CalendarIcon,
    Video,
    ShieldCheck
} from 'lucide-react';

interface DayAvailability {
    date: string;
    morningFree: boolean;
    afternoonFree: boolean;
}

export default function ReservationsPage() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [availability, setAvailability] = useState<DayAvailability[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<'morning' | 'afternoon' | null>(null);
    const [step, setStep] = useState(1); // 1: Date/Slot, 2: Details, 3: Success
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        paymentMethod: 'paypal'
    });

    useEffect(() => {
        setMounted(true);
        fetchAvailability();
    }, [currentMonth]);

    const fetchAvailability = async () => {
        setLoading(true);
        try {
            const month = currentMonth.getMonth() + 1;
            const year = currentMonth.getFullYear();
            const res = await fetch(`/api/availability?month=${month}&year=${year}`);
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data)) {
                    setAvailability(data);
                } else {
                    console.error('Availability data is not an array:', data);
                }
            }
        } catch (error) {
            console.error('Error fetching availability:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDate || !selectedSlot) return;

        setSubmitting(true);
        try {
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: selectedDate.toISOString(),
                    slot: selectedSlot,
                    customerName: formData.name,
                    customerEmail: formData.email,
                    customerPhone: formData.whatsapp,
                    paymentMethod: formData.paymentMethod
                })
            });

            if (res.ok) {
                setStep(3);
            } else {
                const error = await res.json();
                alert(error.error || 'Error al procesar la reserva');
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('Error de conexión. Intenta de nuevo.');
        } finally {
            setSubmitting(false);
        }
    };

    const renderCalendar = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);
        const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

        return (
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-stone-100">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 hover:bg-stone-50 rounded-full transition-colors">
                        <ChevronLeft className="w-5 h-5 text-stone-600" />
                    </button>
                    <h3 className="text-lg font-bold text-[var(--color-primary)] capitalize">
                        {format(currentMonth, 'MMMM yyyy', { locale: es })}
                    </h3>
                    <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 hover:bg-stone-50 rounded-full transition-colors">
                        <ChevronRight className="w-5 h-5 text-stone-600" />
                    </button>
                </div>
                
                <div className="grid grid-cols-7 mb-2">
                    {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, i) => (
                        <div key={i} className="text-center text-[10px] font-bold text-stone-300 uppercase letter-spacing-1">{d}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, i) => {
                        const dayData = Array.isArray(availability) ? availability.find(a => a && a.date && isSameDay(new Date(a.date), day)) : null;
                        const isAvailable = !!dayData;
                        const isPast = isBefore(day, startOfDay(new Date()));
                        const isSelected = selectedDate && isSameDay(day, selectedDate);

                        return (
                            <button
                                key={i}
                                disabled={!isAvailable || isPast}
                                onClick={() => {
                                    setSelectedDate(day);
                                    setSelectedSlot(null);
                                }}
                                className={`
                                    relative h-12 flex flex-col items-center justify-center rounded-xl transition-all
                                    ${!isSameMonth(day, monthStart) ? 'opacity-20' : ''}
                                    ${isSelected ? 'bg-[var(--color-primary)] text-white shadow-lg' : isAvailable && !isPast ? 'hover:bg-[var(--color-secondary)]/10 text-[var(--color-primary)] font-bold' : 'text-stone-300 cursor-not-allowed'}
                                `}
                            >
                                <span className={isSelected ? 'text-lg' : 'text-sm'}>{format(day, 'd')}</span>
                                {isAvailable && !isPast && !isSelected && (
                                    <div className="flex gap-0.5 mt-0.5">
                                        {dayData.morningFree && <div className="w-1 h-1 rounded-full bg-emerald-400"></div>}
                                        {dayData.afternoonFree && <div className="w-1 h-1 rounded-full bg-amber-400"></div>}
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    if (step === 3) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] pt-36 pb-20 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 text-center border border-stone-100">
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-heading text-[var(--color-primary)] font-bold mb-4">¡Reserva Exitosa!</h2>
                    <p className="text-stone-500 mb-8">
                        Hemos enviado un correo de confirmación a <span className="font-bold text-[var(--color-primary)]">{formData.email}</span> con los detalles de tu sesión. Nos pondremos en contacto pronto.
                    </p>
                    <button 
                        onClick={() => window.location.href = '/'}
                        className="w-full py-4 bg-[var(--color-primary)] text-white font-bold rounded-2xl hover:bg-[var(--color-primary-light)] transition-all"
                    >
                        Volver al Inicio
                    </button>
                </div>
            </div>
        );
    }

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-36 pb-20">
            <div className="container mx-auto px-4 text-center mb-12">
                <span className="uppercase tracking-widest text-sm font-semibold text-[var(--color-secondary)] mb-2 block">
                    Agenda tu Sesión
                </span>
                <h1 className="text-4xl md:text-5xl font-heading text-[var(--color-primary)] mb-6">
                    Diseña tu Arquitectura de Vida
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-[var(--color-text-light)]">
                    Elige el momento perfecto para iniciar tu transformación profunda.
                </p>
            </div>

            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Step 1: Calendar */}
                    <div className="lg:col-span-1 space-y-6">
                        <h4 className="flex items-center gap-2 font-bold text-[var(--color-primary)] mb-2 px-2">
                            <CalendarIcon className="w-5 h-5" /> 1. Fecha
                        </h4>
                        {renderCalendar()}
                        <div className="px-4 py-3 bg-[var(--color-primary)]/5 rounded-2xl border border-[var(--color-primary)]/10 flex items-center gap-3 text-sm text-[var(--color-primary)]">
                            <ShieldCheck className="w-5 h-5" />
                            <span>Proceso 100% privado y seguro</span>
                        </div>
                    </div>

                    {/* Step 2: Slot Selection */}
                    <div className="lg:col-span-1 space-y-6">
                        <h4 className="flex items-center gap-2 font-bold text-[var(--color-primary)] mb-2 px-2">
                            <Clock className="w-5 h-5" /> 2. Horario
                        </h4>
                        {!selectedDate ? (
                            <div className="h-[400px] rounded-3xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center text-center p-8 text-stone-400">
                                <CalendarIcon className="w-12 h-12 mb-4 opacity-20" />
                                <p>Selecciona una fecha en el calendario para ver horarios disponibles.</p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl shadow-xl p-8 border border-stone-100 h-full">
                                <div className="mb-6">
                                    <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Día seleccionado</p>
                                    <p className="text-xl font-bold text-[var(--color-primary)] capitalize">
                                        {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        disabled={!Array.isArray(availability) || !availability.find(a => a && a.date && isSameDay(new Date(a.date), selectedDate))?.morningFree}
                                        onClick={() => setSelectedSlot('morning')}
                                        className={`w-full p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                                            selectedSlot === 'morning' 
                                                ? 'border-[var(--color-secondary)] bg-[var(--color-secondary)]/5' 
                                                : 'border-stone-100 hover:border-stone-200'
                                        } disabled:opacity-40 disabled:grayscale`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-full ${selectedSlot === 'morning' ? 'bg-[var(--color-secondary)] text-white' : 'bg-stone-50 text-stone-400'}`}>
                                                <Clock className="w-5 h-5" />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-[var(--color-primary)]">Bloque Mañana</p>
                                                <p className="text-sm text-stone-400">9:00 AM - 1:00 PM</p>
                                            </div>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedSlot === 'morning' ? 'border-[var(--color-secondary)]' : 'border-stone-200'}`}>
                                            {selectedSlot === 'morning' && <div className="w-3 h-3 rounded-full bg-[var(--color-secondary)]"></div>}
                                        </div>
                                    </button>

                                    <button
                                        disabled={!Array.isArray(availability) || !availability.find(a => a && a.date && isSameDay(new Date(a.date), selectedDate))?.afternoonFree}
                                        onClick={() => setSelectedSlot('afternoon')}
                                        className={`w-full p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                                            selectedSlot === 'afternoon' 
                                                ? 'border-[var(--color-secondary)] bg-[var(--color-secondary)]/5' 
                                                : 'border-stone-100 hover:border-stone-200'
                                        } disabled:opacity-40 disabled:grayscale`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-full ${selectedSlot === 'afternoon' ? 'bg-[var(--color-secondary)] text-white' : 'bg-stone-50 text-stone-400'}`}>
                                                <Clock className="w-5 h-5" />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-[var(--color-primary)]">Bloque Tarde</p>
                                                <p className="text-sm text-stone-400">2:00 PM - 6:00 PM</p>
                                            </div>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedSlot === 'afternoon' ? 'border-[var(--color-secondary)]' : 'border-stone-200'}`}>
                                            {selectedSlot === 'afternoon' && <div className="w-3 h-3 rounded-full bg-[var(--color-secondary)]"></div>}
                                        </div>
                                    </button>
                                </div>

                                <div className="mt-8 pt-8 border-t border-stone-50 flex items-center gap-3 text-stone-400">
                                    <Video className="w-5 h-5" />
                                    <p className="text-xs">Las sesiones se realizan vía Zoom. Recibirás el enlace tras la confirmación.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Step 3: Details */}
                    <div className="lg:col-span-1 space-y-6">
                        <h4 className="flex items-center gap-2 font-bold text-[var(--color-primary)] mb-2 px-2">
                            <User className="w-5 h-5" /> 3. Tus Datos
                        </h4>
                        <div className={`bg-white rounded-3xl shadow-xl p-8 border border-stone-100 transition-opacity ${!selectedSlot ? 'opacity-40 pointer-events-none' : ''}`}>
                            <form onSubmit={handleBooking} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Nombre Completo</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-[var(--color-secondary)] transition-colors" 
                                        placeholder="Tu nombre" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Email</label>
                                    <input 
                                        required
                                        type="email" 
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                        className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-[var(--color-secondary)] transition-colors" 
                                        placeholder="tu@email.com" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">WhatsApp</label>
                                    <input 
                                        required
                                        type="tel" 
                                        value={formData.whatsapp}
                                        onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                                        className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-[var(--color-secondary)] transition-colors" 
                                        placeholder="+58..." 
                                    />
                                </div>

                                <div className="pt-4">
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Método de Pago</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button 
                                            type="button" 
                                            onClick={() => setFormData({...formData, paymentMethod: 'paypal'})}
                                            className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${formData.paymentMethod === 'paypal' ? 'border-[#0070BA] bg-[#0070BA]/5' : 'border-stone-100'}`}
                                        >
                                            <span className="font-bold text-[#0070BA]">PayPal</span>
                                            <span className="text-[10px] text-stone-400">Mastercard / Visa</span>
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => setFormData({...formData, paymentMethod: 'zelle'})}
                                            className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${formData.paymentMethod === 'zelle' ? 'border-[#6D28D9] bg-[#6D28D9]/5' : 'border-stone-100'}`}
                                        >
                                            <span className="font-bold text-[#6D28D9]">Zelle</span>
                                            <span className="text-[10px] text-stone-400">Directo</span>
                                        </button>
                                    </div>
                                </div>

                                <button 
                                    disabled={submitting || !selectedSlot}
                                    type="submit" 
                                    className="w-full py-5 mt-6 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white rounded-[2rem] font-bold transition-all shadow-xl shadow-[var(--color-primary)]/20 disabled:opacity-50 flex items-center justify-center gap-3 group"
                                >
                                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                        <>
                                            Confirmar Reserva
                                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
