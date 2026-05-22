"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle2, Loader2, Download } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function WelcomeModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    useEffect(() => {
        // Show after 2 seconds only if not shown before in the current session
        const hasBeenShown = localStorage.getItem("yelitze_welcome_modal_2026_shown");
        if (!hasBeenShown) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem("yelitze_welcome_modal_2026_shown", "true");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !turnstileToken) return;

        setStatus("loading");
        
        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, turnstileToken }),
            });

            if (response.ok) {
                setStatus("success");
                setEmail("");
                // Also set shown so they aren't prompted again
                localStorage.setItem("yelitze_welcome_modal_2026_shown", "true");
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
                    {/* Backdrop Overlay */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ type: "spring", duration: 0.7, bounce: 0.15 }}
                        className="relative w-full max-w-4xl bg-[#FCFAF7] rounded-[2rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.4)] grid md:grid-cols-12 border border-[#B8835A]/10 z-10"
                    >
                        {/* Close Button */}
                        <button 
                            onClick={handleClose}
                            className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 md:bg-stone-100 hover:bg-[#8C4005] hover:text-white text-stone-500 shadow-md transition-all duration-300"
                            aria-label="Cerrar modal"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Left Column: Visual Manual Image */}
                        <div className="md:col-span-5 relative min-h-[220px] md:min-h-[500px] bg-[#8C4005] flex flex-col justify-end overflow-hidden">
                            <Image
                                src="/assets/images/manual-2026.jpg"
                                alt="Manual de Manifestación 2026 Yelitze Rangel"
                                fill
                                sizes="(max-width: 768px) 100vw, 40vw"
                                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                                priority
                            />
                            {/* Decorative shadow gradient over image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
                            
                            {/* Short text overlay */}
                            <div className="relative z-10 p-6 text-white space-y-1">
                                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#B8835A] drop-shadow-sm">Regalo Exclusivo</span>
                                <h3 className="font-editorial text-lg md:text-xl font-bold leading-tight text-white drop-shadow-sm">
                                    Manual de Manifestación 2026
                                </h3>
                                <p className="text-xs text-white/70 font-light font-guide">
                                    Co-crea tu realidad con enfoque sistémico.
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Dynamic Form / Success Content */}
                        <div className="md:col-span-7 p-6 md:p-10 flex flex-col justify-center bg-[#FCFAF7] min-h-[380px]">
                            <AnimatePresence mode="wait">
                                {status !== "success" ? (
                                    <motion.div
                                        key="form-state"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-2">
                                            <span className="font-script text-3xl text-[var(--color-accent)] block">
                                                Bienvenida a este espacio sagrado
                                            </span>
                                            <h2 className="font-editorial text-2xl md:text-3xl text-[#8C4005] font-bold leading-tight">
                                                Descarga tu Manual de Manifestación 2026
                                            </h2>
                                            <p className="text-sm text-stone-600 font-light leading-relaxed font-guide">
                                                Únete a nuestro círculo de almas intencionales. Suscríbete al boletín de sabiduría transgeneracional de Yelitze Rangel y descarga de inmediato esta guía de co-creación de forma gratuita.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="space-y-1">
                                                <input
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Tu correo electrónico principal"
                                                    className="w-full px-6 py-4 rounded-xl bg-white border border-[#B8835A]/20 focus:border-[#8C4005] focus:ring-1 focus:ring-[#8C4005]/20 focus:outline-none transition-all text-stone-800 placeholder-stone-400 font-medium font-guide"
                                                />
                                            </div>

                                            {/* Turnstile Validation */}
                                            <div className="flex justify-center min-h-[65px] my-3">
                                                <Turnstile
                                                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAC20WYl_5FLowYWz"}
                                                    onSuccess={(token) => setTurnstileToken(token)}
                                                    options={{ theme: "light", appearance: "interaction-only" }}
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={status === "loading" || !turnstileToken}
                                                className="w-full py-4 bg-[var(--color-primary)] hover:bg-[#a04a06] disabled:opacity-50 text-white rounded-xl font-bold tracking-[0.05em] uppercase text-xs transition-all duration-300 shadow-lg shadow-[#8C4005]/10 flex items-center justify-center gap-2 group font-guide"
                                            >
                                                {status === "loading" ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        Procesando...
                                                    </>
                                                ) : (
                                                    <>
                                                        Obtener Mi Manual Gratis
                                                        <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform text-[#B8835A]" />
                                                    </>
                                                )}
                                            </button>
                                        </form>

                                        {status === "error" && (
                                            <p className="text-red-600 text-xs text-center font-semibold font-guide uppercase tracking-wider">
                                                Ocurrió un error. Por favor, intenta de nuevo.
                                            </p>
                                        )}

                                        <div className="text-center pt-2">
                                            <button 
                                                onClick={handleClose}
                                                className="text-stone-400 hover:text-stone-600 text-xs underline font-medium font-guide transition-colors"
                                            >
                                                No, gracias, prefiero explorar la web
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success-state"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center space-y-6 py-6"
                                    >
                                        <div className="flex justify-center">
                                            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                                                <CheckCircle2 className="w-8 h-8 text-emerald-600 animate-pulse-subtle" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <span className="font-script text-4xl text-[var(--color-accent)] block">
                                                ¡Te damos la Bienvenida!
                                            </span>
                                            <h2 className="font-editorial text-2xl md:text-3xl text-[#8C4005] font-bold leading-tight">
                                                Tu Manual de Manifestación 2026 está listo
                                            </h2>
                                            <p className="text-sm text-stone-600 font-light font-guide max-w-md mx-auto leading-relaxed">
                                                Gracias por sumarte a esta hermosa comunidad de transformación y sanación. Tu manual práctico se ha desbloqueado correctamente. Haz clic abajo para descargarlo.
                                            </p>
                                        </div>

                                        <div className="pt-4 max-w-xs mx-auto space-y-3">
                                            <a
                                                href="/MANUALDEMANIFESTACION_2026_MH.pdf"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold tracking-[0.05em] uppercase text-xs transition-all duration-300 shadow-lg shadow-emerald-600/10 flex items-center justify-center gap-2 group font-guide"
                                            >
                                                <Download className="w-4 h-4 text-emerald-100 group-hover:translate-y-[1px] transition-transform" />
                                                Descargar Manual (PDF)
                                            </a>

                                            <button
                                                onClick={handleClose}
                                                className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl font-semibold text-xs transition-all font-guide"
                                            >
                                                Comenzar a explorar la web
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
