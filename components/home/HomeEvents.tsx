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
        <div className="container mx-auto px-4 relative z-10">
            <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {events.map((event) => (
                    <StaggerItem key={event.id} className="h-full">
                        <Link
                            href={event.slug ? `/eventos/${event.slug}` : "/eventos"}
                            className="block h-full"
                        >
                            <div className="group h-full bg-stone-50/50 rounded-[3rem] overflow-hidden border border-stone-100 flex flex-col transition-all duration-700 hover:shadow-2xl hover:bg-white hover:-translate-y-2">
                                {/* Image Container */}
                                <div className="relative h-72 overflow-hidden">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                                    />
                                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-primary)] shadow-sm">
                                        {event.type}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-10 flex flex-col flex-grow">
                                    <div className="flex items-center gap-6 text-[10px] font-bold tracking-widest text-stone-400 uppercase mb-6">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5 text-[var(--color-secondary)] opacity-50" />
                                            <span>{event.date}</span>
                                        </div>
                                        {event.time && (
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-3.5 h-3.5 text-[var(--color-secondary)] opacity-50" />
                                                <span>{event.time}</span>
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-heading text-[var(--color-primary)] mb-4 italic leading-tight group-hover:text-[var(--color-secondary)] transition-colors">
                                        {event.title}
                                    </h3>

                                    <div className="flex items-center gap-2 text-stone-500 text-sm font-light italic mb-8">
                                        <MapPin className="w-4 h-4 text-[var(--color-secondary)] opacity-40 shrink-0" />
                                        <span>{event.location}</span>
                                    </div>

                                    <div className="mt-auto pt-8 border-t border-stone-100 flex items-center justify-between">
                                        <span className="font-bold text-[10px] tracking-[0.3em] uppercase text-[var(--color-primary)]">
                                            Explorar Espacio
                                        </span>
                                        <div className="w-10 h-10 rounded-full bg-white border border-stone-100 flex items-center justify-center group-hover:bg-[var(--color-secondary)] group-hover:text-white transition-all duration-500 shadow-sm">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </StaggerItem>
                ))}
            </StaggerContainer>

            <div className="text-center mt-16">
                <Link
                    href="/eventos"
                    className="inline-flex items-center gap-4 text-[var(--color-primary)] font-bold tracking-widest uppercase border-b border-[var(--color-primary)]/10 pb-4 hover:border-[var(--color-secondary)] transition-all group"
                >
                    Ver Calendario Completo
                    <ArrowRight className="w-5 h-5 text-[var(--color-secondary)] group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
