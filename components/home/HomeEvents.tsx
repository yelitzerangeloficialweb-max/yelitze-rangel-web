'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import { EVENTS_DATA } from "@/lib/events";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from "@/components/ui/motion";

export default function HomeEvents() {
    // Only show future events or featured ones. For now, showing all for demo.
    // In a real app, filter typically by date > today.
    const events = EVENTS_DATA.slice(0, 3);

    return (
        <section className="py-24 bg-[var(--color-background)] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-20 right-0 w-96 h-96 bg-[var(--color-secondary)]/5 rounded-full blur-3xl transform translate-x-1/2" />
                <div className="absolute bottom-20 left-0 w-72 h-72 bg-[var(--color-primary)]/5 rounded-full blur-3xl transform -translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <FadeIn className="text-center mb-16">
                    <span className="uppercase tracking-widest text-sm font-semibold text-[var(--color-secondary)] mb-2 block">
                        Agenda
                    </span>
                    <h2 className="text-3xl md:text-4xl font-heading text-[var(--color-primary)] mb-6">
                        Próximos Encuentros
                    </h2>
                    <p className="max-w-2xl mx-auto text-[var(--color-text-light)] text-lg">
                        Espacios sagrados para tu transformación personal y sanación ancestral.
                    </p>
                </FadeIn>

                <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {events.map((event) => (
                        <StaggerItem key={event.id} className="h-full">
                            <Link href={`/eventos/${event.slug}`} className="block h-full">
                                <HoverCard className="group h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-[var(--color-primary)]/5 flex flex-col transition-all duration-300">
                                    {/* Image Container */}
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-[var(--color-primary)] shadow-sm">
                                            {event.type}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-sm text-[var(--color-text-light)] mb-4">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4 text-[var(--color-secondary)]" />
                                                <span>{event.date}</span>
                                            </div>
                                            {event.time && (
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-4 h-4 text-[var(--color-secondary)]" />
                                                    <span>{event.time}</span>
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-heading text-[var(--color-primary)] mb-3 group-hover:text-[var(--color-secondary)] transition-colors">
                                            {event.title}
                                        </h3>

                                        <div className="flex items-center gap-2 text-sm text-[var(--color-text-light)] mb-6">
                                            <MapPin className="w-4 h-4 text-[var(--color-secondary)]" />
                                            <span>{event.location}</span>
                                        </div>

                                        <p className="text-[var(--color-text-light)] line-clamp-3 mb-6 flex-grow leading-relaxed">
                                            {event.aida.interest}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-[var(--color-primary)]/5 flex items-center justify-between">
                                            <span className="font-semibold text-[var(--color-primary)] text-sm uppercase tracking-wide">
                                                Más Información
                                            </span>
                                            <span className="w-10 h-10 rounded-full bg-[var(--color-background)] flex items-center justify-center group-hover:bg-[var(--color-secondary)] group-hover:text-white transition-all duration-300">
                                                <ArrowRight className="w-5 h-5" />
                                            </span>
                                        </div>
                                    </div>
                                </HoverCard>
                            </Link>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <div className="text-center mt-12">
                    <Link href="/eventos" className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-secondary)] font-semibold border-b-2 border-transparent hover:border-[var(--color-secondary)] transition-all pb-1">
                        Ver Calendario Completo
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
