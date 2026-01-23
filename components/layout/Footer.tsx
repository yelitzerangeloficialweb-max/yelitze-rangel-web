import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[var(--color-secondary)] text-white py-16 border-t border-white/10">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="mb-6">
                            <div className="relative w-48 h-16">
                                <Image
                                    src="/assets/images/logo-yelitze-new.png"
                                    alt="Yelitzé Rangel Logo"
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed mb-6">
                            Acompañándote a sanar tus raíces para que florezcas en tu propio destino. Terapia Sistémica y Sanación Ancestral.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/yelitzerangeloficial/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-[var(--color-secondary)] transition-colors text-white">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[var(--color-secondary)] transition-colors text-white">
                                <MessageCircle className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[var(--color-secondary)] transition-colors text-white">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="text-lg font-heading mb-6 text-white">Explora</h4>
                        <ul className="space-y-3 text-white/70 text-sm">
                            <li><Link href="/sobre-mi" className="hover:text-[var(--color-secondary)] transition-colors">Sobre Mí</Link></li>
                            <li><Link href="/servicios" className="hover:text-[var(--color-secondary)] transition-colors">Servicios</Link></li>
                            <li><Link href="/tests/heridas-infancia" className="hover:text-[var(--color-secondary)] transition-colors">Tests Gratuitos</Link></li>
                            <li><Link href="/blog" className="hover:text-[var(--color-secondary)] transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="text-lg font-heading mb-6 text-white">Legal</h4>
                        <ul className="space-y-3 text-white/70 text-sm">
                            <li><Link href="/privacidad" className="hover:text-[var(--color-secondary)] transition-colors">Política de Privacidad</Link></li>
                            <li><Link href="/terminos" className="hover:text-[var(--color-secondary)] transition-colors">Términos y Condiciones</Link></li>
                            <li><Link href="/contacto" className="hover:text-[var(--color-secondary)] transition-colors">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-heading mb-6 text-white">Únete a la Comunidad</h4>
                        <p className="text-white/80 text-sm mb-4">Recibe reflexiones semanales y ejercicios sistémicos en tu correo.</p>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Tu email aquí..."
                                className="px-4 py-2 rounded bg-white/10 border border-white/20 focus:border-[var(--color-secondary)] outline-none text-white placeholder:text-white/40"
                            />
                            <button className="btn-premium w-full justify-center">
                                Suscribirme
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-center text-white/40 text-xs">
                    <p>© {new Date().getFullYear()} Yelitzé Rangel. Todos los derechos reservados. | Desarrollado por Kick-Off Development</p>
                </div>
            </div>
        </footer>
    );
}
