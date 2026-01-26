"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Instagram,
    Globe,
    MessageCircle,
    Calendar,
    Sparkles,
    User,
    Compass,
    ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/motion";

const links = [
    {
        title: "Agenda tu sesión individual",
        subtitle: "Acompañamiento personal presencial u online",
        icon: Calendar,
        href: "https://wa.me/17867268717",
        primary: true
    },
    {
        title: "Ceremonias íntimas",
        subtitle: "Individuales y grupales",
        icon: Sparkles,
        href: "/servicios",
    },
    {
        title: "Coaching ancestral",
        subtitle: "La Anatomía del Alma",
        icon: Compass,
        href: "/servicios/coaching-ancestral",
    },
    {
        title: "Tarot Coaching terapéutico",
        subtitle: "Un enfoque evolutivo",
        icon: User,
        href: "/servicios",
    },
    {
        title: "Masajes & Reconexión Sistémica",
        subtitle: "Sesiones corporales profundas",
        icon: Sparkles,
        href: "/servicios/sesiones-corporales",
    },
    {
        title: "Web oficial",
        subtitle: "Explora todo mi universo",
        icon: Globe,
        href: "/",
    }
];

const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/yelitzerrangel/", label: "Instagram" },
    { icon: MessageCircle, href: "https://wa.me/17867268717", label: "WhatsApp" },
    {
        icon: () => (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
            </svg>
        ),
        href: "#",
        label: "TikTok"
    }
];

export default function BioPage() {
    return (
        <main className="min-h-screen bg-[#0c0a09] selection:bg-[var(--color-secondary)] selection:text-white relative overflow-hidden flex flex-col items-center py-16 px-4">

            {/* Background Decor & Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg aspect-square bg-[var(--color-secondary)]/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-[var(--color-primary)]/5 blur-[100px] rounded-full -z-10" />

            {/* Watermark Logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square opacity-[0.03] pointer-events-none -z-10 animate-pulse-slow">
                <Image
                    src="/assets/images/logo-white.png"
                    alt="Watermark"
                    fill
                    className="object-contain grayscale contrast-200"
                />
            </div>

            {/* Elegant Lines */}
            <div className="absolute inset-0 pointer-events-none -z-5">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-stone-800/30 to-transparent" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-stone-800/30 to-transparent" />
            </div>

            {/* Profile Section */}
            <div className="text-center max-w-md w-full mb-12 relative">
                {/* Decorative Circles around profile */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-stone-800/50 rounded-full -z-1 animate-spin-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-stone-800/20 rounded-full -z-1" />

                <ScaleIn>
                    <div className="relative w-32 h-32 mx-auto mb-8 p-1 rounded-full border border-stone-700 bg-stone-900/50 backdrop-blur-md shadow-2xl">
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                            <Image
                                src="/assets/images/yelitze/manifesto-new.jpg"
                                alt="Yelitzé Rangel"
                                fill
                                className="object-cover scale-110"
                            />
                        </div>
                    </div>
                </ScaleIn>

                <FadeIn transition={{ delay: 0.2 }}>
                    <h1 className="text-white text-3xl font-heading mb-2 tracking-tight">Yelitzé Rangel</h1>
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-px w-6 bg-stone-800" />
                        <p className="text-[var(--color-secondary)] text-[10px] tracking-[0.4em] font-bold uppercase">Espíritu & Cuerpo</p>
                        <div className="h-px w-6 bg-stone-800" />
                    </div>
                    <p className="text-stone-300 text-sm font-light italic leading-relaxed mb-4 px-6">
                        “Sanación desde el cuerpo 🌿 <br /> Donde lo invisible cobra voz”
                    </p>
                    <p className="text-stone-500 text-[11px] font-medium leading-relaxed max-w-xs mx-auto uppercase tracking-widest opacity-80">
                        Psicóloga & Terapeuta Somática
                    </p>
                </FadeIn>
            </div>

            {/* Links Section */}
            <StaggerContainer className="w-full max-w-md space-y-4 mb-16 px-2">
                {links.map((link, i) => (
                    <StaggerItem key={i}>
                        <Link
                            href={link.href}
                            className={`group flex items-center gap-5 p-5 rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden ${link.primary
                                    ? "bg-gradient-to-r from-[var(--color-secondary)] to-[#994200] border-transparent text-white shadow-[0_15px_35px_rgba(153,66,0,0.25)]"
                                    : "bg-[#141210]/60 border-stone-800/60 text-stone-300 hover:bg-stone-800/40 hover:border-stone-600 backdrop-blur-xl"
                                }`}
                        >
                            {/* Shine effect for primary */}
                            {link.primary && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            )}

                            <div className={`p-3.5 rounded-2xl transition-transform duration-500 group-hover:scale-110 ${link.primary ? "bg-white/15" : "bg-stone-800/40 text-[var(--color-secondary)]"}`}>
                                <link.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 text-left">
                                <p className="font-semibold text-[15px] tracking-wide">{link.title}</p>
                                <p className={`text-[10px] uppercase tracking-widest mt-0.5 ${link.primary ? "text-white/70" : "text-stone-500 font-medium opacity-80"}`}>{link.subtitle}</p>
                            </div>
                            <ArrowRight className={`w-4 h-4 transition-all duration-300 group-hover:translate-x-1.5 ${link.primary ? "text-white/60" : "text-stone-700"}`} />
                        </Link>
                    </StaggerItem>
                ))}
            </StaggerContainer>

            {/* Modality & Socials Wrapper */}
            <div className="w-full max-w-xs text-center">
                <FadeIn className="mb-10">
                    <div className="inline-flex items-center gap-4 text-stone-500 text-[10px] tracking-[0.3em] font-bold uppercase bg-stone-900/30 px-6 py-2 rounded-full border border-stone-800/50">
                        <span>Presencial</span>
                        <span className="w-1 h-1 bg-[var(--color-secondary)] rounded-full animate-pulse" />
                        <span>Online</span>
                    </div>
                </FadeIn>

                <FadeIn transition={{ delay: 0.5 }}>
                    <div className="flex gap-6 justify-center mb-16">
                        {socialLinks.map((social, i) => (
                            <Link
                                key={i}
                                href={social.href}
                                aria-label={social.label}
                                className="group relative p-4 rounded-full bg-stone-900/40 border border-stone-800 text-stone-500 hover:text-white transition-all backdrop-blur-sm"
                            >
                                <div className="absolute inset-0 bg-[var(--color-secondary)] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 -z-1 opacity-20" />
                                <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                            </Link>
                        ))}
                    </div>
                </FadeIn>

                {/* Final Quote & Footer */}
                <FadeIn className="text-center relative">
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-stone-800 to-transparent mx-auto mb-6" />
                    <p className="text-stone-400 text-xs italic mb-3 font-light">“El cuerpo recuerda el camino”</p>
                    <p className="text-[var(--color-secondary)] text-[8px] tracking-[0.5em] font-black uppercase opacity-60">
                        🕊️ Primero el cuerpo, luego todo lo demás
                    </p>
                </FadeIn>
            </div>

        </main>
    );
}
