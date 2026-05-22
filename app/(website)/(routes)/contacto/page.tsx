"use client";

import { useState, useCallback } from "react";
import { Mail, MessageSquare, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function ContactPage() {
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string | null }>({
        type: null,
        message: null
    });

    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        subject: "Información sobre Sesiones",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTurnstileSuccess = useCallback((token: string) => {
        setTurnstileToken(token);
    }, []);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        
        if (!turnstileToken) {
            setStatus({ type: 'error', message: "Por favor, completa la verificación de seguridad." });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: null, message: null });

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, turnstileToken })
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: "¡Tu mensaje ha sido enviado! Te contactaremos pronto." });
                setFormData({
                    name: "",
                    lastname: "",
                    email: "",
                    subject: "Información sobre Sesiones",
                    message: ""
                });
                // Note: Turnstile will need to be re-solved for a second submission
                setTurnstileToken(null); 
            } else {
                setStatus({ type: 'error', message: data.error || "Algo salió mal. Por favor intenta de nuevo." });
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus({ type: 'error', message: "Error al enviar el mensaje. Por favor revisa tu conexión." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg)] pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-serif italic text-[var(--color-primary)] mb-6">Contáctame</h1>
                    <p className="text-xl text-[var(--color-text-light)] max-w-2xl mx-auto font-light leading-relaxed">
                        Estoy aquí para acompañarte en tu proceso. Si tienes dudas sobre las sesiones, capacitaciones o mi libro, escríbeme.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                    {/* Info Side */}
                    <div className="bg-[var(--color-primary)] rounded-[3rem] p-12 text-white flex flex-col justify-between relative overflow-hidden group shadow-2xl">
                        {/* Abstract Background Element */}
                        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-serif italic mb-12">Información de Contacto</h2>
                            
                            <div className="space-y-10">
                                <div className="flex items-start gap-6 group/item">
                                    <div className="p-4 bg-white/10 rounded-2xl group-hover/item:bg-white/20 transition-colors">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Email</h3>
                                        <p className="text-white/80 font-light">energyuniversal@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group/item">
                                    <div className="p-4 bg-white/10 rounded-2xl group-hover/item:bg-white/20 transition-colors">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">WhatsApp / Teléfono</h3>
                                        <p className="text-white/80 font-light">+58 414 235 3431</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group/item">
                                    <div className="p-4 bg-white/10 rounded-2xl group-hover/item:bg-white/20 transition-colors">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Ubicación</h3>
                                        <p className="text-white/80 font-light">Maracaibo, Venezuela & Miami, USA</p>
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
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Nombre</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:border-[var(--color-secondary)] transition-colors" 
                                        placeholder="Tu nombre" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Apellido</label>
                                    <input 
                                        type="text" 
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:border-[var(--color-secondary)] transition-colors" 
                                        placeholder="Tu apellido" 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:border-[var(--color-secondary)] transition-colors" 
                                    placeholder="tu@email.com" 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Asunto</label>
                                <select 
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:border-[var(--color-secondary)] transition-colors"
                                >
                                    <option value="Información sobre Sesiones">Información sobre Sesiones</option>
                                    <option value="Problemas con un Pago">Problemas con un Pago</option>
                                    <option value="Colaboraciones / Entrevistas">Colaboraciones / Entrevistas</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Mensaje</label>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4} 
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:border-[var(--color-secondary)] transition-colors resize-none" 
                                    placeholder="¿En qué puedo ayudarte hoy?"
                                ></textarea>
                            </div>

                            <div className="flex justify-center min-h-[65px]">
                                <Turnstile
                                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAC20WYl_5FLowYWz"}
                                    onSuccess={handleTurnstileSuccess}
                                    options={{ theme: "light" }}
                                />
                            </div>

                            {status.message && (
                                <div className={`p-4 rounded-lg flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                    {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                    <p className="text-sm font-medium">{status.message}</p>
                                </div>
                            )}

                            <button 
                                type="button" 
                                onClick={() => handleSubmit()}
                                disabled={!turnstileToken || isSubmitting}
                                className={`w-full py-4 text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${turnstileToken && !isSubmitting ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] hover:shadow-xl' : 'bg-gray-400 cursor-not-allowed opacity-70'}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        Enviar Mensaje
                                        <Send className="w-5 h-5" />
                                    </>
                                )}
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
