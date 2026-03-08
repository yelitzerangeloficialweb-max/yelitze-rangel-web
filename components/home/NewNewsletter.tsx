"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function NewNewsletter() {
    return (
        <section className="relative py-32 overflow-hidden font-body">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/home_redesign/newsletter_bg.png"
                    alt="Newsletter Background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto space-y-10"
                >
                    <div className="space-y-4">
                        <span className="text-xs font-bold font-body tracking-[0.3em] uppercase opacity-80">
                            Comunidad Consciente
                        </span>
                        <h2 className="text-4xl md:text-7xl font-script text-accent-light italic">
                            Únete al Círculo
                        </h2>
                        <p className="text-lg md:text-xl text-white/80 font-body font-light leading-relaxed">
                            Recibe inspiración semanal, herramientas de sanación y acceso exclusivo a talleres y eventos para tu evolución.
                        </p>
                    </div>

                    <form className="flex flex-col md:flex-row items-center justify-center gap-4 bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/20">
                        <input
                            type="email"
                            placeholder="Escribe tu correo electrónico"
                            className="flex-grow bg-transparent border-none px-8 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-0 w-full font-body"
                        />
                        <button
                            type="submit"
                            className="btn-premium whitespace-nowrap px-10 py-4 bg-accent text-background font-heading hover:bg-accent-light"
                        >
                            Suscribirme
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
