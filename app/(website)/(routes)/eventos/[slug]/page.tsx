import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, MapPin, Calendar, Share2 } from 'lucide-react';
import { getEventBySlug } from '@/lib/events';
import { notFound } from 'next/navigation';

export default function EventPage({ params }: { params: { slug: string } }) {
    const event = getEventBySlug(params.slug);
    console.log('DEBUG: EventPage called. Slug:', params.slug);
    console.log('DEBUG: Event found:', event ? event.title : 'null');

    if (!event) {
        console.log('DEBUG: Event not found for slug:', params.slug);
        notFound();
    }

    // Function to process text: remove ** and make bold
    const formatText = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index} className="font-bold text-[var(--color-primary)]">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    // Grouping content into sections logic
    // We want to detect "Módulo" to start an accordion.
    // General text before modules stays as paragraphs.

    const renderContent = () => {
        const sections: React.ReactNode[] = [];
        let currentModuleTitle = "";
        let currentModuleContent: string[] = [];
        let isCollectingModule = false;

        event.fullDescription.forEach((line, index) => {
            // Check if line indicates a new Module or Section that should be an accordion
            const isModuleHeader = line.startsWith("**Módulo") || line.includes("ESTRUCTURA DE LA CAPACITACIÓN") || line.includes("INFORMACIÓN GENERAL");

            // If we hit a new module header or special section
            if (isModuleHeader) {
                // If we were already collecting a module, push the previous one
                if (isCollectingModule && currentModuleTitle) {
                    sections.push(
                        <details key={`module-${index}-prev`} className="group bg-white rounded-xl shadow-sm border border-[var(--color-primary)]/10 mb-4 overflow-hidden">
                            <summary className="flex cursor-pointer items-center justify-between p-6 bg-[var(--color-background)] hover:bg-[var(--color-secondary)]/5 transition-colors">
                                <h3 className="text-lg font-heading text-[var(--color-primary)] group-open:text-[var(--color-secondary)] font-bold">
                                    {formatText(currentModuleTitle)}
                                </h3>
                                <span className="shrink-0 ml-4 p-1.5 rounded-full bg-white text-[var(--color-secondary)] shadow-sm group-hover:bg-[var(--color-secondary)] group-hover:text-white transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0 transition duration-300 group-open:-rotate-180" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </summary>
                            <div className="p-6 text-[var(--color-text-light)] leading-relaxed border-t border-[var(--color-primary)]/5">
                                {currentModuleContent.map((l, i) => (
                                    <p key={i} className="mb-2">{formatText(l)}</p>
                                ))}
                            </div>
                        </details>
                    );
                    currentModuleContent = [];
                }

                // If it's "ESTRUCTURA", just print it as a header? Or treat as start of modules?
                // The user specifically wants "Módulos" to be accordions.
                // Let's treat lines starting with "**Módulo" as the trigger.
                if (line.includes("Módulo")) {
                    isCollectingModule = true;
                    currentModuleTitle = line;
                } else {
                    // For "ESTRUCTURA..." or "INFORMACIÓN...", we can just render them as titles if they are not modules but dividers
                    // But user asked "la parte de los modulos".
                    if (isCollectingModule) {
                        // We were collecting a module, but hit a non-module header (e.g. Info General). 
                        // Close previous module (handled above).
                    }

                    // If it's not a module header but arguably a section header, we might want to display it
                    // For now, if it's not "Módulo", just render as text, unless we want Info General to be an accordion too.
                    // Let's make "INFORMACIÓN GENERAL" an accordion too as it contains logistics.
                    if (line.includes("INFORMACIÓN GENERAL")) {
                        isCollectingModule = true;
                        currentModuleTitle = line;
                    } else {
                        isCollectingModule = false;
                        sections.push(<p key={index} className="mb-4 text-lg text-[var(--color-text-light)]">{formatText(line)}</p>);
                    }
                }

            } else {
                // Not a header line
                if (isCollectingModule) {
                    currentModuleContent.push(line);
                } else {
                    sections.push(<p key={index} className="mb-4 text-lg text-[var(--color-text-light)]">{formatText(line)}</p>);
                }
            }
        });

        // Push the last collected module if exists
        if (isCollectingModule && currentModuleTitle) {
            sections.push(
                <details key={`module-last`} className="group bg-white rounded-xl shadow-sm border border-[var(--color-primary)]/10 mb-4 overflow-hidden">
                    <summary className="flex cursor-pointer items-center justify-between p-6 bg-[var(--color-background)] hover:bg-[var(--color-secondary)]/5 transition-colors">
                        <h3 className="text-lg font-heading text-[var(--color-primary)] group-open:text-[var(--color-secondary)] font-bold">
                            {formatText(currentModuleTitle)}
                        </h3>
                        <span className="shrink-0 ml-4 p-1.5 rounded-full bg-white text-[var(--color-secondary)] shadow-sm group-hover:bg-[var(--color-secondary)] group-hover:text-white transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0 transition duration-300 group-open:-rotate-180" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </summary>
                    <div className="p-6 text-[var(--color-text-light)] leading-relaxed border-t border-[var(--color-primary)]/5">
                        {currentModuleContent.map((l, i) => (
                            <p key={i} className="mb-2">{formatText(l)}</p>
                        ))}
                    </div>
                </details>
            );
        }

        return sections;
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Header Image */}
            <div className="relative h-[50vh] w-full">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white z-10">
                    <div className="container mx-auto">
                        <Link href="/eventos" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Volver a Eventos
                        </Link>
                        <span className="block text-[var(--color-secondary)] font-semibold tracking-wider uppercase mb-2">
                            {event.type}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-heading mb-6 max-w-4xl leading-tight">
                            {event.title}
                        </h1>
                        <div className="flex flex-wrap gap-6 text-sm md:text-base text-white/90">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[var(--color-secondary)]" />
                                {event.date}
                            </div>
                            {event.time && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-[var(--color-secondary)]" />
                                    {event.time}
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-[var(--color-secondary)]" />
                                {event.location}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Intro Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <p className="text-xl text-[var(--color-primary)] font-medium leading-relaxed italic">
                                "{event.aida.attention}"
                            </p>
                        </div>

                        {/* Dynamic Content Rendering */}
                        <div className="space-y-4">
                            {renderContent()}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-[var(--color-secondary)]/20 sticky top-24">
                            <h3 className="text-xl font-heading text-[var(--color-primary)] mb-6">Detalles del Encuentro</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <span className="p-2 bg-[var(--color-background)] rounded-full text-[var(--color-secondary)]">
                                        <Calendar className="w-5 h-5" />
                                    </span>
                                    <div>
                                        <span className="block text-sm text-gray-500">Fecha</span>
                                        <span className="font-semibold text-[var(--color-primary)]">{event.date}</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="p-2 bg-[var(--color-background)] rounded-full text-[var(--color-secondary)]">
                                        <Clock className="w-5 h-5" />
                                    </span>
                                    <div>
                                        <span className="block text-sm text-gray-500">Horario</span>
                                        <span className="font-semibold text-[var(--color-primary)]">{event.time || "Por confirmar"}</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="p-2 bg-[var(--color-background)] rounded-full text-[var(--color-secondary)]">
                                        <MapPin className="w-5 h-5" />
                                    </span>
                                    <div>
                                        <span className="block text-sm text-gray-500">Ubicación</span>
                                        <span className="font-semibold text-[var(--color-primary)]">{event.location}</span>
                                    </div>
                                </div>
                            </div>

                            <a
                                href={event.aida.action.includes("Información") ? "https://wa.me/17867268717" : "#"}
                                target="_blank"
                                className="btn-premium w-full justify-center text-center py-4 mb-4"
                            >
                                {event.aida.action}
                            </a>

                            <p className="text-center text-sm text-gray-400">
                                Cupos limitados para preservar la intimidad del espacio.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
