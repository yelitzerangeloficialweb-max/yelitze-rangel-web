"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WisdomChest() {
    return (
        <section className="py-24 bg-[#1a1a1a] text-background overflow-hidden font-body">
            <div className="container mx-auto px-4">
                <div className="bg-[#2D2926] rounded-[40px] overflow-hidden shadow-2xl border border-white/5">
                    <div className="flex flex-col md:flex-row items-stretch">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 p-12 md:p-20 flex flex-col justify-center space-y-8"
                        >
                            <div className="space-y-4">
                                <span className="text-xs font-bold font-body tracking-[0.3em] text-accent uppercase opacity-70">
                                    Libros del Alma
                                </span>
                                <h2 className="text-4xl md:text-6xl font-script text-accent-light italic">
                                    Cofre de Sabiduría
                                </h2>
                            </div>

                            <p className="text-lg text-white/60 font-body font-light leading-relaxed">
                                Libros diseñados para ser espejos de tu alma. El conocimiento que buscas ya habita dentro de ti, estos libros ahora te ayudarán a recordarlo.
                            </p>

                            <div className="pt-4">
                                <Link
                                    href="/libros"
                                    className="btn-outline border-white/20 text-white font-heading hover:bg-white hover:text-black"
                                >
                                    Explorar el cofre
                                </Link>
                            </div>
                        </motion.div>

                        {/* Image Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 min-h-[400px] relative mt-1"
                        >
                            <Image
                                src="/images/home_redesign/wisdom_chest.png"
                                alt="Cofre de Sabiduría"
                                fill
                                className="object-cover"
                            />
                            {/* Inner Shadow for blend */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#2D2926] via-transparent to-transparent hidden md:block" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2D2926] via-transparent to-transparent md:hidden" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
