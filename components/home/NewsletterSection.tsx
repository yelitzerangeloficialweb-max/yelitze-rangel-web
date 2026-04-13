"use client";

import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

export default function NewsletterSection() {
    const [email, setEmail] = useState("");

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

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
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/assets/images/newsletter-bg.png')" }}
            >
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/80 via-transparent to-transparent" />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
                <FadeIn>
                    <span className="uppercase tracking-[0.2em] text-sm font-semibold text-white/90 mb-4 block">
                        Comunidad Consciente
                    </span>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-6 drop-shadow-md">
                        Únete al Círculo
                    </h2>

                    <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed font-light">
                        Recibe inspiración semanal, herramientas de sanación y acceso exclusivo
                        a talleres y eventos para tu evolución.
                    </p>

                    {/* Subscription Form */}
                    {status === "success" ? (
                        <div className="bg-white/95 p-12 rounded-[2.5rem] shadow-2xl text-[var(--color-primary)]">
                            <Sparkles className="w-12 h-12 mx-auto mb-6 text-[var(--color-secondary)] opacity-50" />
                            <h3 className="text-3xl font-heading mb-4">¡Ya eres parte!</h3>
                            <p className="font-light italic">Te hemos enviado un correo de bienvenida.</p>
                            <button 
                                onClick={() => setStatus("idle")}
                                className="mt-8 text-[var(--color-secondary)] font-bold text-xs tracking-widest uppercase border-b border-[var(--color-secondary)]/30 pb-1"
                            >
                                Suscribir otro
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto relative overflow-hidden">
                            <input
                                type="email"
                                placeholder="Tu correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex-grow px-6 py-4 rounded-full bg-white/95 text-[var(--color-primary)] placeholder:text-[var(--color-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] shadow-lg transition-all"
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="bg-[var(--color-secondary)] text-white px-8 py-4 rounded-full font-semibold uppercase tracking-wider hover:bg-[var(--color-secondary-light)] transition-all transform hover:translate-y-[-2px] hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50"
                            >
                                {status === "loading" ? "..." : (
                                    <>
                                        Suscribirme
                                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                            {status === "error" && (
                                <p className="absolute bottom-[-20px] left-0 right-0 text-[10px] text-red-400 font-bold uppercase">Error al suscribir</p>
                            )}
                        </form>
                    )}

                    <p className="mt-6 text-sm text-white/70">
                        Tu privacidad es sagrada. Libre de spam.
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}
