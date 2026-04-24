"use client";

import { useState } from "react";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function ContactPage() {
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-36 pb-20">
            <div className="container mx-auto px-4 text-center mb-16">
                <span className="uppercase tracking-widest text-sm font-semibold text-[var(--color-secondary)] mb-2 block">
                    Conversemos
                </span>
                <h1 className="text-4xl md:text-5xl font-heading text-[var(--color-primary)] mb-6">
                    Estoy Aquí para Escucharte
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-[var(--color-text-light)]">
                    Si tienes dudas sobre qué camino tomar o quieres saber más sobre mis servicios, escríbeme.
                </p>
            </div>

            <div className="container mx-auto px-4 max-w-5xl">
                <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">

                    {/* Contact Info Side */}
                    <div className="bg-[var(--color-primary)] p-12 text-white flex flex-col justify-between relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-8">Información de Contacto</h3>
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/10 rounded-lg">
                                        <Mail className="w-6 h-6 text-[var(--color-secondary)]" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg mb-1">Email</h4>
                                        <p className="text-white/80 font-light">energyuniversal@gmail.com</p>
                                        <p className="text-sm text-white/50 mt-1">Respuesta en 24-48 horas</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/10 rounded-lg">
                                        <MessageSquare className="w-6 h-6 text-[var(--color-secondary)]" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg mb-1">WhatsApp</h4>
                                        <p className="text-white/80 font-light">+1 (786) 726-8717</p>
                                        <p className="text-sm text-white/50 mt-1">Lunes a Viernes, 9am - 5pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/10 rounded-lg">
                                        <MapPin className="w-6 h-6 text-[var(--color-secondary)]" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg mb-1">Ubicación</h4>
                                        <p className="text-white/80 font-light text-sm">Centro Comercial Salto Ángel, Avenida 3Y, Maracaibo 4001, Zulia, Venezuela</p>
                                        <p className="text-sm text-white/50 mt-1">Atención previa cita</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-12">
                            <p className="italic text-white/70">
                                "La sanación comienza cuando nos atrevemos a hablar de lo que duele."
                            </p>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="p-12">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Nombre</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:border-[var(--color-secondary)] transition-colors" placeholder="Tu nombre" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Apellido</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:border-[var(--color-secondary)] transition-colors" placeholder="Tu apellido" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Email</label>
                                <input type="email" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:border-[var(--color-secondary)] transition-colors" placeholder="tu@email.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Asunto</label>
                                <select className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:border-[var(--color-secondary)] transition-colors">
                                    <option>Información sobre Sesiones</option>
                                    <option>Problemas con un Pago</option>
                                    <option>Colaboraciones / Entrevistas</option>
                                    <option>Otro</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Mensaje</label>
                                <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:border-[var(--color-secondary)] transition-colors resize-none" placeholder="¿En qué puedo ayudarte hoy?"></textarea>
                            </div>

                            <div className="flex justify-center">
                                <Turnstile
                                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                                    onSuccess={(token) => setTurnstileToken(token)}
                                    options={{ theme: "light" }}
                                />
                            </div>

                            <button 
                                type="button" 
                                disabled={!turnstileToken}
                                className={`w-full py-4 text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${turnstileToken ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] hover:shadow-xl' : 'bg-gray-400 cursor-not-allowed opacity-70'}`}
                            >
                                Enviar Mensaje
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>

                </div>

                {/* Map Section */}
                <div className="mt-12 group">
                    <div className="rounded-3xl overflow-hidden shadow-2xl h-[450px] border-8 border-white transition-transform duration-500 hover:scale-[1.01]">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d489.2890520421876!2d-71.60634621008912!3d10.664585149692994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e8998e8cfaaaaab%3A0x158dc20e5bf0fe66!2sCentro%20Comercial%20Salto%20%C3%81ngel!5e0!3m2!1ses-419!2sve!4v1712683000000!5m2!1ses-419!2sve"
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen={true} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación Yelitze Rangel - CC Salto Ángel"
                        ></iframe>
                    </div>
                    <p className="text-center mt-4 text-[var(--color-text-light)] text-sm italic">
                        📍 Centro Comercial Salto Ángel, Avenida 3Y, Maracaibo 4001, Zulia, Venezuela
                    </p>
                </div>
            </div>
        </div>
    );
}
