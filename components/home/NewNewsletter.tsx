"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function NewNewsletter() {
    return (
        <section className="relative py-64 min-h-[750px] flex items-center overflow-hidden font-body bg-white">


            {/* Background Image - Sunset/Field theme */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/home_redesign/Home_02.jpg"
                    alt="Newsletter Background"
                    fill
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#2D2926] to-transparent z-10" />
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
                    <div className="space-y-6">
                        <h2 className="text-6xl md:text-[8rem] font-script text-white italic leading-[0.7] drop-shadow-lg">
                            Únete al Círculo
                        </h2>
                        <p className="text-xl md:text-2xl text-white/90 font-body font-light leading-relaxed max-w-2xl mx-auto">
                            Recibe inspiración semanal, herramientas de sanación y acceso exclusivo a talleres y eventos para tu evolución.
                        </p>
                    </div>

                    <form className="max-w-xl mx-auto space-y-8">
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Escribe tu correo electrónico"
                                className="w-full bg-transparent border-b-2 border-white/30 px-4 py-4 text-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#B8835A] transition-colors font-body text-center"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-block px-16 py-5 bg-[#B8835A] text-white rounded-2xl font-body font-bold tracking-widest uppercase transition-all hover:scale-105 hover:bg-[#c9956d] shadow-2xl active:scale-95"
                        >
                            SUSCRIBIRME
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
