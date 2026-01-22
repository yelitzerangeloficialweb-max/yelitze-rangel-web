import { Mail, MessageSquare, MapPin, Send } from "lucide-react";

export default function ContactPage() {
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
                                        <p className="text-white/80 font-light">contacto@yelitzerangel.com</p>
                                        <p className="text-sm text-white/50 mt-1">Respuesta en 24-48 horas</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/10 rounded-lg">
                                        <MessageSquare className="w-6 h-6 text-[var(--color-secondary)]" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg mb-1">WhatsApp</h4>
                                        <p className="text-white/80 font-light">+58 (412) 123-4567</p>
                                        <p className="text-sm text-white/50 mt-1">Lunes a Viernes, 9am - 5pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/10 rounded-lg">
                                        <MapPin className="w-6 h-6 text-[var(--color-secondary)]" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg mb-1">Ubicación</h4>
                                        <p className="text-white/80 font-light">Consultas Online</p>
                                        <p className="text-sm text-white/50 mt-1">Disponible para todo el mundo</p>
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

                            <button type="button" className="w-full py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                Enviar Mensaje
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
