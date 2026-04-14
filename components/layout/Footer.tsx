"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { InstagramThinIcon, MessageLeafIcon, MailThinIcon } from '@/components/icons/CustomIcons';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Turnstile } from "@marsidev/react-turnstile";

export default function Footer() {
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
        <footer className="bg-[var(--color-text)] text-white py-16 border-t border-white/10">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="mb-6">
                            <div className="relative w-60 h-20">
                                <Image
                                    src="/assets/images/logo-yelitze-new.png"
                                    alt="Yelitze Rangel Logo"
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                        </div>
                        <p className="text-white/80 text-[18px] leading-relaxed mb-6">
                            Acompañándote a honrar tus raíces para que florezcas en tu propio destino. Terapia Sistémica y Tu Coach Ancestral.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/yelitzerangeloficial/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-[var(--color-accent)] transition-colors text-white">
                                <InstagramThinIcon size={20} />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-[var(--color-accent)] transition-colors text-white">
                                <MessageLeafIcon size={20} />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-[var(--color-accent)] transition-colors text-white">
                                <MailThinIcon size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="text-2xl font-editorial mb-6 tracking-wide text-[var(--color-accent)]">Explora</h4>
                        <ul className="space-y-3 text-white/70 text-[18px] font-body">
                            <li><Link href="/sobre-mi" className="hover:text-white transition-colors">Sobre Mí</Link></li>
                            <li><Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link></li>
                            <li><Link href="/tests" className="hover:text-white transition-colors">Tests Gratuitos</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="text-2xl font-editorial mb-6 tracking-wide text-[var(--color-accent)]">Legal</h4>
                        <ul className="space-y-3 text-white/70 text-[18px] font-body">
                            <li><Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
                            <li><Link href="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
                            <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-2xl font-editorial mb-6 tracking-wide text-[var(--color-accent)]">Únete a la Comunidad</h4>
                        
                        {status === "success" ? (
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
                                <div className="flex items-center gap-3 text-[var(--color-accent)]">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="font-bold text-sm tracking-widest uppercase">¡Bienvenida!</span>
                                </div>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    Gracias por unirte. Pronto recibirás noticias en tu buzón.
                                </p>
                                <button 
                                    onClick={() => setStatus("idle")}
                                    className="text-[var(--color-accent)] text-[10px] font-bold uppercase tracking-widest hover:underline"
                                >
                                    Suscribir otro
                                </button>
                            </div>
                        ) : (
                            <>
                                <p className="text-white/80 text-[18px] mb-4 font-body leading-relaxed">Recibe reflexiones semanales y ejercicios sistémicos en tu correo.</p>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Tu email aquí..."
                                        className="px-4 py-2 rounded bg-white/10 border border-white/20 focus:border-[var(--color-accent)] outline-none text-white placeholder:text-white/40"
                                    />
                                    <div className="flex justify-center">
                                        <Turnstile
                                            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                                            onSuccess={(token) => setTurnstileToken(token)}
                                            theme="dark"
                                            appearance="interaction-only"
                                        />
                                    </div>
                                    <button 
                                        type="submit"
                                        disabled={status === "loading" || !turnstileToken}
                                        className="w-full bg-[var(--color-accent)] text-[var(--color-background)] hover:brightness-110 px-6 py-3 rounded-full font-bold transition-all uppercase tracking-widest text-xs shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {status === "loading" ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Procesando...
                                            </>
                                        ) : (
                                            "Suscribirme"
                                        )}
                                    </button>
                                    {status === "error" && (
                                        <p className="text-red-400 text-[10px] mt-1 text-center font-bold tracking-widest uppercase">
                                            Error. Reintenta.
                                        </p>
                                    )}
                                </form>
                            </>
                        )}
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-center text-white/40 text-xs">
                    <p>© {new Date().getFullYear()} Yelitze Rangel. Todos los derechos reservados. | Desarrollado por <a href="https://kickoffdevelopment.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-white/20 underline-offset-4">Kick-Off Development</a> | Diseñado por Digital Marketing DMK</p>
                </div>
            </div>
        </footer>
    );
}
