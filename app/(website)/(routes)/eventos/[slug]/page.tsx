import { getEventBySlug, EVENTS_DATA } from '@/lib/events';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Clock, ArrowLeft, CheckCircle2, Sparkles, Heart } from 'lucide-react';
import ParticleBackground from '@/components/ui/ParticleBackground';

// Generate static params for existing events
export async function generateStaticParams() {
    return EVENTS_DATA.map((event) => ({
        slug: event.slug,
    }));
}

export default async function EventPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const isFree = event.type === 'Gratuito';
    const colorClass = isFree ? 'text-[var(--color-secondary)]' : 'text-[var(--color-primary)]';
    const bgClass = isFree ? 'bg-[var(--color-secondary)]' : 'bg-[var(--color-primary)]';
    const buttonClass = isFree
        ? 'bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-light)] shadow-lg shadow-[var(--color-secondary)]/20'
        : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] shadow-lg shadow-[var(--color-primary)]/20';

    return (
        <main className="min-h-screen bg-[var(--color-background)] relative">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <ParticleBackground />
            </div>

            {/* Hero Header */}
            <section className="relative h-[60vh] flex items-end pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover object-center"
                        priority
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/40 to-transparent" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <Link href="/eventos" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Volver a Eventos
                    </Link>
                    <div className="max-w-4xl">
                        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4 text-white ${bgClass}`}>
                            {event.type}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-heading text-[var(--color-primary)] mb-6 leading-tight drop-shadow-sm">
                            {event.title}
                        </h1>
                        <div className="flex flex-wrap gap-6 text-[var(--color-text-light)] font-medium text-lg">
                            <div className="flex items-center gap-2">
                                <Calendar className={`w-5 h-5 ${colorClass}`} />
                                <span>{event.date}</span>
                            </div>
                            {event.time && (
                                <div className="flex items-center gap-2">
                                    <Clock className={`w-5 h-5 ${colorClass}`} />
                                    <span>{event.time}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <MapPin className={`w-5 h-5 ${colorClass}`} />
                                <span>{event.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 pb-20 relative z-10">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* ATTENTION / HOOK */}
                        <div className="prose prose-lg max-w-none text-[var(--color-text-light)]">
                            <h2 className="text-3xl font-heading text-[var(--color-primary)] flex items-center gap-3">
                                <Sparkles className={`w-6 h-6 ${colorClass}`} />
                                ¿Por qué este espacio es para ti?
                            </h2>
                            <p className="text-xl italic font-medium leading-relaxed border-l-4 border-[var(--color-secondary)] pl-6 text-[var(--color-primary)]/80 my-8 bg-white/50 p-6 rounded-r-xl">
                                "{event.aida.attention}"
                            </p>

                            <div className="relative w-full h-64 md:h-96 my-10 rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.01] transition-transform duration-500">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>

                            {event.fullDescription.map((paragraph, idx) => (
                                <p key={idx} className="mb-6 text-lg text-[var(--color-text-light)] leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* DESIRE / OUTCOME */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-heading text-[var(--color-primary)] mb-6 flex items-center gap-2">
                                <CheckCircle2 className={`w-6 h-6 ${colorClass}`} />
                                Lo que lograrás
                            </h3>
                            <p className="text-lg leading-relaxed text-[var(--color-text-light)]">
                                {event.aida.desire}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar / CTA */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-8">
                            {/* INTEREST / TARGET AUDIENCE */}
                            <div className="bg-[var(--color-primary)]/5 p-6 rounded-2xl border border-[var(--color-primary)]/10">
                                <h4 className="font-heading text-[var(--color-primary)] mb-4 flex items-center gap-2 text-lg">
                                    <Heart className="w-5 h-5" />
                                    Para quién es
                                </h4>
                                <p className="text-[var(--color-text-light)] text-sm leading-relaxed">
                                    {event.aida.interest}
                                </p>
                            </div>

                            {/* Registration Card */}
                            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[var(--color-secondary)] text-center">
                                <h3 className="text-xl font-heading text-[var(--color-primary)] mb-2">¡Reserva tu lugar!</h3>
                                <p className="text-sm text-gray-500 mb-6">Plazas limitadas para asegurar la intimidad del grupo.</p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center justify-between text-sm py-2 border-b border-gray-100">
                                        <span className="text-gray-500">Fecha</span>
                                        <span className="font-semibold text-[var(--color-primary)]">{event.date}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm py-2 border-b border-gray-100">
                                        <span className="text-gray-500">Modalidad</span>
                                        <span className="font-semibold text-[var(--color-primary)]">Online</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm py-2 border-b border-gray-100">
                                        <span className="text-gray-500">Inversión</span>
                                        <span className="font-semibold text-[var(--color-secondary)] uppercase">{event.type}</span>
                                    </div>
                                </div>

                                <Link
                                    href="https://wa.me/1234567890" // Placeholder for WhatsApp or Registration Link
                                    target="_blank"
                                    className={`block w-full py-4 text-white font-bold rounded-xl transition-all transform hover:scale-105 ${buttonClass}`}
                                >
                                    {event.aida.action}
                                </Link>
                                <p className="text-xs text-gray-400 mt-4">
                                    Al hacer clic serás redirigida al formulario de inscripción.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
