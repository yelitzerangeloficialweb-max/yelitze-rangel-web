import { Calendar, MapPin, Clock, ArrowRight, CheckCircle2, Heart, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface EventProps {
    title: string;
    type: 'Gratuito' | 'Pago';
    date: string;
    time?: string;
    location: string;
    image: string;
    aida: {
        attention: string;
        interest: string; // Para quién
        desire: string;   // Qué obtendrán / Resultado
        action: string;   // CTA Text
    };
    link: string;
}

export default function EventCard({ event }: { event: EventProps }) {
    const isFree = event.type === 'Gratuito';

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
            {/* Image Header */}
            <Link href={event.link} className="block relative h-64 overflow-hidden cursor-pointer">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                />
                <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase ${isFree
                        ? 'bg-[var(--color-secondary)] text-white'
                        : 'bg-[var(--color-primary)] text-white'
                        }`}>
                        {event.type}
                    </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-24">
                    <h3 className="text-2xl font-heading text-white mb-2 leading-tight">{event.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                        </div>
                        {event.time && (
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                <span>{event.time}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                        </div>
                    </div>
                </div>
            </Link>

            <div className="p-8 flex-1 flex flex-col gap-6">
                {/* ATTENTION */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[var(--color-secondary)] font-semibold text-xs tracking-widest uppercase">
                        <Sparkles className="w-4 h-4" />
                        <span>¿Te resuena esto?</span>
                    </div>
                    <p className="text-lg font-medium text-[var(--color-primary)] italic leading-relaxed">
                        "{event.aida.attention}"
                    </p>
                </div>

                {/* INTEREST - Para quién */}
                <div className="bg-[var(--color-background)] p-5 rounded-xl border border-[var(--color-primary)]/5">
                    <h4 className="font-heading text-[var(--color-primary)] mb-3 flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Para quién es este espacio
                    </h4>
                    <p className="text-[var(--color-text-light)] text-sm leading-relaxed">
                        {event.aida.interest}
                    </p>
                </div>

                {/* DESIRE - Resultado */}
                <div className="space-y-3 flex-1">
                    <h4 className="font-heading text-[var(--color-primary)] flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-secondary)]" />
                        Lo que te llevarás
                    </h4>
                    <p className="text-[var(--color-text-light)] leading-relaxed">
                        {event.aida.desire}
                    </p>
                </div>

                {/* ACTION */}
                <div className="pt-4 mt-auto border-t border-gray-100">
                    <Link
                        href={event.link}
                        className={`btn-premium w-full ${!isFree ? '!bg-[var(--color-primary)] hover:!bg-[var(--color-primary-light)]' : ''}`}
                    >
                        {event.aida.action}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
