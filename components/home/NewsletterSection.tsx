"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

export default function NewsletterSection() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would handle the subscription logic
        console.log("Suscribing email:", email);
        alert("¡Gracias por suscribirte! Pronto recibirás noticias nuestras.");
        setEmail("");
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
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
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
                            className="bg-[var(--color-secondary)] text-white px-8 py-4 rounded-full font-semibold uppercase tracking-wider hover:bg-[var(--color-secondary-light)] transition-all transform hover:translate-y-[-2px] hover:shadow-xl flex items-center justify-center gap-2 group"
                        >
                            Suscribirme
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-white/70">
                        Tu privacidad es sagrada. Libre de spam.
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}
