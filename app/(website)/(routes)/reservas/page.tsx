import Link from "next/link";
import { Calendar, CreditCard, Clock, CheckCircle, Mail } from "lucide-react";

export default function ReservationsPage() {
    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-36 pb-20">
            <div className="container mx-auto px-4 text-center mb-12">
                <span className="uppercase tracking-widest text-sm font-semibold text-[var(--color-secondary)] mb-2 block">
                    Agenda tu Sesión
                </span>
                <h1 className="text-4xl md:text-5xl font-heading text-[var(--color-primary)] mb-6">
                    Reserva tu Espacio de Sanación
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-[var(--color-text-light)]">
                    Elige el momento perfecto para iniciar tu transformación.
                </p>
            </div>

            <div className="container mx-auto px-4 max-w-4xl">
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Service Summary */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-[var(--color-primary)]/10">
                        <h3 className="text-2xl font-heading text-[var(--color-primary)] mb-6">Servicios Disponibles</h3>

                        <div className="space-y-6">
                            <div className="p-4 rounded-xl bg-[var(--color-background)] border border-[var(--color-secondary)]/20 hover:border-[var(--color-secondary)] transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-[var(--color-primary)]">Sesión Íntima Sanación Ancestral</h4>
                                    <span className="text-[var(--color-secondary)] font-bold">$97 USD</span>
                                </div>
                                <p className="text-sm text-[var(--color-text-light)] mb-3">60 minutos de trabajo profundo individual por Zoom.</p>
                                <div className="flex items-center text-xs text-[var(--color-text-light)] gap-4">
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 60 min</span>
                                    <span className="flex items-center gap-1"><VideoWrapper /> Zoom</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white border border-gray-100 hover:border-[var(--color-secondary)]/50 transition-colors cursor-pointer opacity-75 hover:opacity-100">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-[var(--color-primary)]">Capacitación Grupal</h4>
                                    <span className="text-[var(--color-secondary)] font-bold">Desde $47 USD</span>
                                </div>
                                <p className="text-sm text-[var(--color-text-light)]">Próximas fechas por anunciar.</p>
                            </div>
                        </div>
                    </div>

                    {/* Booking Form / Placeholder */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-[var(--color-primary)]/10">
                        <h3 className="text-2xl font-heading text-[var(--color-primary)] mb-6">Tus Datos</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--color-primary)] mb-1">Nombre Completo</label>
                                <input type="text" className="w-full px-4 py-3 rounded-lg bg-[var(--color-background)] border border-gray-200 focus:outline-none focus:border-[var(--color-secondary)] transition-colors" placeholder="Tu nombre" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--color-primary)] mb-1">Email</label>
                                <input type="email" className="w-full px-4 py-3 rounded-lg bg-[var(--color-background)] border border-gray-200 focus:outline-none focus:border-[var(--color-secondary)] transition-colors" placeholder="tu@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--color-primary)] mb-1">WhatsApp</label>
                                <input type="tel" className="w-full px-4 py-3 rounded-lg bg-[var(--color-background)] border border-gray-200 focus:outline-none focus:border-[var(--color-secondary)] transition-colors" placeholder="+58..." />
                            </div>

                            <div className="pt-4">
                                <label className="block text-sm font-medium text-[var(--color-primary)] mb-3">Método de Pago</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button type="button" className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 hover:border-[#0070BA] hover:bg-[#0070BA]/5 transition-all">
                                        <span className="font-bold text-[#0070BA]">PayPal</span>
                                        <span className="text-xs text-gray-500">Tarjetas / Saldo</span>
                                    </button>
                                    <button type="button" className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 hover:border-[#6D28D9] hover:bg-[#6D28D9]/5 transition-all">
                                        <span className="font-bold text-[#6D28D9]">Zelle</span>
                                        <span className="text-xs text-gray-500">Transferencia Directa</span>
                                    </button>
                                </div>
                            </div>

                            <button type="button" className="w-full py-4 mt-6 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                Confirmar Reserva
                                <CheckCircle className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Calendar Placeholder */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-[var(--color-primary)]/10 text-center">
                    <Calendar className="w-12 h-12 text-[var(--color-secondary)] mx-auto mb-4" />
                    <h3 className="text-2xl font-heading text-[var(--color-primary)] mb-2">Selecciona tu Horario</h3>
                    <p className="text-[var(--color-text-light)] mb-6">
                        El calendario interactivo se cargará una vez confirmes tus datos iniciales.
                        <br /><span className="text-sm italic">(Integración de Calendly/Google Calendar próximamente)</span>
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] font-medium bg-[var(--color-background)] px-4 py-2 rounded-full">
                        <Clock className="w-4 h-4" />
                        Horarios disponibles: Lun - Vie, 9:00 AM - 5:00 PM (EST)
                    </div>
                </div>
            </div>
        </div>
    );
}

function VideoWrapper() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" /></svg>
    )
}
