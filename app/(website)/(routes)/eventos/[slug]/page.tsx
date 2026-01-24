"use client";

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowLeft, Clock, MapPin, Calendar,
    Share2, ArrowRight, Sparkles, Star
} from 'lucide-react';
import { getEventBySlug } from '@/lib/events';
import { notFound } from 'next/navigation';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';

export default function EventPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const formatText = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return (
                    <strong key={index} className="font-bold text-[var(--color-primary)]">
                        {part.slice(2, -2)}
                    </strong>
                );
            }
            return part;
        });
    };

    const renderContent = () => {
        const sections: React.ReactNode[] = [];
        let currentModuleTitle = "";
        let currentModuleContent: string[] = [];
        let isCollectingModule = false;

        event.fullDescription.forEach((line, index) => {
            const isModuleHeader = line.startsWith("**Módulo") ||
                line.includes("ESTRUCTURA DE LA CAPACITACIÓN") ||
                line.includes("INFORMACIÓN GENERAL");

            if (isModuleHeader) {
                if (isCollectingModule && currentModuleTitle) {
                    sections.push(
                        <details key={`module-${index}-prev`} className="group bg-white rounded-3xl shadow-sm border border-stone-100 mb-4 overflow-hidden">
                            <summary className="flex cursor-pointer items-center justify-between p-8 bg-[#fafcfe] hover:bg-white transition-all">
                                <h3 className="text-xl font-heading text-[var(--color-primary)] group-open:text-[var(--color-secondary)]">
                                    {formatText(currentModuleTitle)}
                                </h3>
                                <span className="shrink-0 ml-4 p-2 rounded-full border border-stone-200 text-stone-400 group-open:rotate-180 transition-transform duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </summary>
                            <div className="p-8 text-[var(--color-text-light)] leading-relaxed border-t border-stone-50 space-y-4">
                                {currentModuleContent.map((l, i) => (
                                    <p key={i}>{formatText(l)}</p>
                                ))}
                            </div>
                        </details>
                    );
                    currentModuleContent = [];
                }

                if (line.includes("Módulo") || line.includes("INFORMACIÓN GENERAL")) {
                    isCollectingModule = true;
                    currentModuleTitle = line;
                } else {
                    isCollectingModule = false;
                    sections.push(
                        <h4 key={index} className="text-2xl font-heading text-[var(--color-primary)] mt-12 mb-6 border-b border-stone-100 pb-4">
                            {formatText(line)}
                        </h4>
                    );
                }

            } else {
                if (isCollectingModule) {
                    currentModuleContent.push(line);
                } else {
                    sections.push(
                        <p key={index} className="mb-6 text-lg text-[var(--color-text-light)] leading-relaxed">
                            {formatText(line)}
                        </p>
                    );
                }
            }
        });

        if (isCollectingModule && currentModuleTitle) {
            sections.push(
                <details key={`module-last`} className="group bg-white rounded-3xl shadow-sm border border-stone-100 mb-4 overflow-hidden">
                    <summary className="flex cursor-pointer items-center justify-between p-8 bg-[#fafcfe] hover:bg-white transition-all">
                        <h3 className="text-xl font-heading text-[var(--color-primary)] group-open:text-[var(--color-secondary)]">
                            {formatText(currentModuleTitle)}
                        </h3>
                        <span className="shrink-0 ml-4 p-2 rounded-full border border-stone-200 text-stone-400 group-open:rotate-180 transition-transform duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </summary>
                    <div className="p-8 text-[var(--color-text-light)] leading-relaxed border-t border-stone-50 space-y-4">
                        {currentModuleContent.map((l, i) => (
                            <p key={i}>{formatText(l)}</p>
                        ))}
                    </div>
                </details>
            );
        }

        return sections;
    };

    return (
        <main className="bg-[#fafcfe] min-h-screen pb-20">
            {/* Split-Panel Header */}
            <section className="relative min-h-[70vh] flex flex-col lg:flex-row overflow-hidden pt-20">
                {/* Left Panel: Breadcrumbs & Title */}
                <div className="lg:w-[45%] bg-white p-8 md:p-16 lg:p-24 flex flex-col justify-center relative overflow-hidden">
                    {/* Subtle Watermark */}
                    <div className="absolute -left-32 -bottom-32 w-[800px] h-[800px] opacity-[0.02] pointer-events-none">
                        <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                    </div>

                    <FadeIn>
                        <div className="flex flex-col items-start gap-4 mb-12">
                            <Link href="/eventos" className="inline-flex items-center gap-2 text-stone-400 hover:text-[var(--color-secondary)] transition-colors uppercase text-xs tracking-widest font-bold">
                                <ArrowLeft className="w-4 h-4" />
                                Volver a la Agenda
                            </Link>

                            <div className="inline-block">
                                <span className="px-6 py-2 rounded-full border border-[var(--color-secondary)]/20 bg-[var(--color-secondary)]/[0.03] text-[var(--color-secondary)] text-[10px] font-bold tracking-[0.2em] uppercase">
                                    {event.type}
                                </span>
                            </div>
                        </div>

                        <h1 className="text-[var(--color-primary)] text-4xl md:text-5xl lg:text-7xl font-heading mb-10 leading-tight">
                            {event.title}
                        </h1>

                        <div className="flex flex-wrap gap-8 text-sm text-stone-400">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[var(--color-secondary)]" />
                                <span className="font-medium">{event.date}</span>
                            </div>
                            {event.time && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-[var(--color-secondary)]" />
                                    <span className="font-medium">{event.time}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-[var(--color-secondary)]" />
                                <span className="font-medium">{event.location}</span>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Right Panel: Hero Image */}
                <div className="lg:w-[55%] relative min-h-[400px] lg:min-h-full">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent hidden lg:block" />
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 px-4 overflow-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
                        {/* Main Body */}
                        <div className="lg:col-span-8 space-y-12">
                            <FadeIn>
                                <div className="p-12 bg-white rounded-[3rem] shadow-sm border border-stone-100 relative overflow-hidden group">
                                    <div className="absolute -right-20 -top-20 w-80 h-80 opacity-[0.02] pointer-events-none rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                                        <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
                                    </div>
                                    <p className="text-2xl md:text-3xl text-[var(--color-primary)] font-light leading-relaxed italic relative z-10">
                                        “{event.aida.attention}”
                                    </p>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.2} className="prose prose-stone max-w-none">
                                <div className="space-y-4">
                                    {renderContent()}
                                </div>
                            </FadeIn>
                        </div>

                        {/* Sidebar / CTA */}
                        <div className="lg:col-span-4">
                            <FadeIn className="sticky top-32">
                                <div className="p-10 bg-stone-900 rounded-[3rem] shadow-2xl text-white relative overflow-hidden">
                                    {/* Background decoration */}
                                    <div className="absolute top-0 right-0 p-10 opacity-10">
                                        <Sparkles className="w-20 h-20" />
                                    </div>

                                    <h3 className="text-2xl font-heading mb-8 relative z-10">Reserva tu Lugar</h3>

                                    <div className="space-y-6 mb-12 relative z-10">
                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                            <Calendar className="w-5 h-5 text-[var(--color-secondary)] mt-1" />
                                            <div>
                                                <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Fecha</span>
                                                <span className="text-lg font-medium">{event.date}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                            <MapPin className="w-5 h-5 text-[var(--color-secondary)] mt-1" />
                                            <div>
                                                <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Lugar</span>
                                                <span className="text-lg font-medium">{event.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <a
                                        href="https://wa.me/17867268717"
                                        target="_blank"
                                        className="btn-premium w-full bg-white !text-stone-950 hover:!bg-stone-200 shadow-xl py-5 group"
                                    >
                                        {event.aida.action || "Solicitar Información"}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </a>

                                    <p className="text-center text-xs text-white/40 mt-8 font-light italic">
                                        * Cupos limitados para garantizar un espacio de contención e intimidad.
                                    </p>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
