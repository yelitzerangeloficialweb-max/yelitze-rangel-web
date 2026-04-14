"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function NewNewsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !turnstileToken) return;

        setStatus("loading");
        
        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStatus("success");
                setEmail("");
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <section className="relative pt-80 pb-32 md:pt-[420px] md:pb-48 min-h-[850px] flex items-start overflow-x-clip font-body bg-white">
            {/* Background Image - Sunset/Field theme */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/home_redesign/Home_02_hd.png"
                    alt="Newsletter Background"
                    fill
                    quality={100}
                    sizes="100vw"
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent z-10" />
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl mx-auto space-y-12"
                >
                    <AnimatePresence mode="wait">
                        {status === "success" ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6 py-12"
                            >
                                <div className="flex justify-center">
                                    <div className="w-24 h-24 rounded-full bg-[var(--color-secondary)]/20 flex items-center justify-center border border-[var(--color-secondary)]/30">
                                        <CheckCircle2 className="w-12 h-12 text-[var(--color-secondary)]" />
                                    </div>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-script text-white leading-tight">
                                    ¡Bienvenido al Círculo!
                                </h2>
                                <p className="text-xl text-white/80 font-light max-w-md mx-auto">
                                    Tu viaje de transformación ha comenzado. Pronto recibirás noticias en tu buzón.
                                </p>
                                <button 
                                    onClick={() => setStatus("idle")}
                                    className="text-[var(--color-secondary)] font-bold text-xs tracking-widest uppercase border-b border-[var(--color-secondary)]/30 pb-2 hover:border-[var(--color-secondary)] transition-all"
                                >
                                    Volver
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-12"
                            >
                                <div className="space-y-6">
                                    <h2 className="text-6xl md:text-[8rem] font-script text-white/75 leading-[0.8] drop-shadow-lg tracking-[0.03em]">
                                        Únete al Círculo
                                    </h2>
                                    <p className="text-xl md:text-2xl text-white/90 font-body font-light leading-relaxed max-w-2xl mx-auto">
                                        Recibe inspiración semanal, herramientas de sanación y acceso exclusivo a talleres y eventos para tu evolución.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-8">
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="Escribe tu correo electrónico"
                                            className="w-full bg-transparent border-b-2 border-white/30 px-4 py-4 text-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--color-secondary)] transition-colors font-body text-center"
                                        />
                                    </div>
                                    <div className="flex justify-center flex-col items-center gap-6">
                                        <Turnstile
                                            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                                            onSuccess={(token) => setTurnstileToken(token)}
                                            theme="dark"
                                        />
                                        <button
                                            type="submit"
                                            disabled={status === "loading" || !turnstileToken}
                                            className="inline-flex items-center justify-center gap-3 px-16 py-5 bg-[var(--color-secondary)] text-white rounded-2xl font-body font-bold tracking-widest uppercase transition-all hover:scale-105 hover:bg-[#c9956d] shadow-2xl active:scale-95 disabled:opacity-50 disabled:scale-100"
                                        >
                                            {status === "loading" ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Procesando...
                                                </>
                                            ) : (
                                                "SUSCRIBIRME"
                                            )}
                                        </button>
                                    </div>
                                    {status === "error" && (
                                        <p className="text-red-400 text-sm mt-4">
                                            Ocurrió un error. Por favor, intenta de nuevo.
                                        </p>
                                    )}
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
