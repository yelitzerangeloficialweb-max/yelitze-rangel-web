'use client';

import { useState } from 'react';
import ParticleBackground from '@/components/ui/ParticleBackground';
import EventCard from '@/components/ui/EventCard';
import { EVENTS_DATA } from '@/lib/events';

export default function EventsPage() {
    const [filter, setFilter] = useState<'Todos' | 'Gratuito' | 'Pago'>('Todos');

    const filteredEvents = EVENTS_DATA.filter(event =>
        filter === 'Todos' ? true : event.type === filter
    );

    return (
        <main className="min-h-screen pt-24 pb-20 bg-[var(--color-background)] relative">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <ParticleBackground />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-[var(--color-secondary)] font-semibold uppercase tracking-widest text-sm mb-4 block">
                        Agenda de Transformación
                    </span>
                    <h1 className="text-4xl md:text-5xl font-heading text-[var(--color-primary)] mb-6">
                        Eventos y Formaciones
                    </h1>
                    <p className="text-xl text-[var(--color-text-light)] font-light">
                        Espacios sagrados diseñados para tu sanación, crecimiento y reconexión con tu poder ancestral.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex justify-center mb-16">
                    <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-100 flex gap-2">
                        {['Todos', 'Gratuito', 'Pago'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f as any)}
                                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${filter === f
                                    ? 'bg-[var(--color-primary)] text-white shadow-md'
                                    : 'text-[var(--color-text-light)] hover:bg-gray-50'
                                    }`}
                            >
                                {f}s
                            </button>
                        ))}
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {filteredEvents.map(event => (
                        <EventCard
                            key={event.id}
                            event={{
                                ...event,
                                link: `/eventos/${event.slug}`
                            }}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredEvents.length === 0 && (
                    <div className="text-center py-20 text-[var(--color-text-light)]">
                        No hay eventos de este tipo disponibles en este momento.
                    </div>
                )}
            </div>
        </main>
    );
}
