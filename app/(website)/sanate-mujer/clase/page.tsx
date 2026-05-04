"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Sparkles, MessageCircle, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { HieroglyphicBackground, SacredGeometry, FloatingStars } from "@/components/ui/MysticalElements";

export default function SanateMujerClase() {
    // This is a placeholder YouTube ID. The user should provide the actual ID later.
    const youtubeVideoId = "dQw4w9WgXcQ"; 

    return (
        <main className="w-full min-h-screen relative bg-[#FDFBFA] selection:bg-[#B8835A]/30 overflow-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]">
                <SacredGeometry className="top-[10%] right-[-10%] w-[600px] h-[600px]" />
                <FloatingStars count={30} />
                <HieroglyphicBackground count={20} />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-20 relative z-10 max-w-5xl">
                <div className="mb-12 flex items-center justify-between">
                    <Link href="/sanate-mujer" className="flex items-center gap-2 text-[#2D2926]/60 hover:text-[#B8835A] transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest">Volver</span>
                    </Link>
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-[#B8835A]/10 rounded-full border border-[#B8835A]/20">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold text-[#B8835A] uppercase tracking-[0.2em]">En Vivo via YouTube</span>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-[#B8835A] font-bold tracking-[0.4em] uppercase text-xs mb-6 block">Workshop: Sánate Mujer</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium text-[#2D2926] leading-tight mb-8">
                        Tu Camino de <span className="text-[#B8835A] italic">Sanación Sistémica</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[#2D2926]/70 leading-relaxed font-light max-w-3xl mx-auto">
                        Estás en el lugar correcto. Disfruta de la sesión, toma nota de tus revelaciones y permítete sentir cada palabra.
                    </p>
                </motion.div>

                {/* Video Player Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative aspect-video w-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-black mb-16"
                >
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
                        title="Workshop Sánate Mujer - Clase en Vivo"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute inset-0"
                    ></iframe>
                </motion.div>

                {/* Interactive/Support Section */}
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-white p-10 rounded-[2.5rem] border border-[#B8835A]/10 shadow-xl flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-12 h-12 bg-[#B8835A]/10 rounded-full flex items-center justify-center mb-6">
                                <Sparkles className="w-6 h-6 text-[#B8835A]" />
                            </div>
                            <h3 className="text-2xl font-heading mb-4 text-[#2D2926]">¿Tienes tu Workbook?</h3>
                            <p className="text-[#2D2926]/60 leading-relaxed mb-8 font-light">
                                Hemos preparado un material exclusivo para que puedas realizar los ejercicios sistémicos durante la clase. Si aún no lo tienes, únete al grupo VIP.
                            </p>
                        </div>
                        <a 
                            href="https://chat.whatsapp.com/TU_GRUPO_AQUÍ" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 inline-flex items-center justify-center gap-3 font-bold uppercase tracking-wider text-sm"
                        >
                            <MessageCircle className="w-5 h-5" />
                            UNIRME AL GRUPO VIP
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-[#2D2926] p-10 rounded-[2.5rem] shadow-xl text-white flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6">
                                <Calendar className="w-6 h-6 text-[#B8835A]" />
                            </div>
                            <h3 className="text-2xl font-heading mb-4">Próximos Pasos</h3>
                            <p className="text-white/60 leading-relaxed mb-8 font-light italic">
                                "La sanación no es un evento, es un proceso. Al finalizar esta clase, tu mirada sobre tu linaje habrá cambiado para siempre."
                            </p>
                        </div>
                        <div className="pt-6 border-t border-white/10">
                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#B8835A] mb-2">Con amor y certeza sistémica,</p>
                            <p className="text-2xl font-editorial italic">Yelitze Rangel</p>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Disclaimer */}
                <div className="mt-20 text-center opacity-30">
                     <p className="text-[10px] leading-relaxed text-[#2D2926] font-light max-w-2xl mx-auto">
                        Este sitio no es parte del sitio web de Facebook ni de Facebook Inc. Además, este sitio NO está respaldado por Facebook de ninguna manera. FACEBOOK es una marca comercial de FACEBOOK, Inc.
                    </p>
                </div>
            </div>
        </main>
    );
}
