'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Compass, Target } from 'lucide-react';
import Image from 'next/image';

export default function IntroStep({ onNext }: { onNext: () => void }) {
    return (
        <div className="text-center max-w-4xl mx-auto space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
            >
                {/* 1. Yelitze's Photo & Welcome (ATTENTION) */}
                <div className="flex flex-col items-center gap-6">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[var(--color-secondary)]/30 p-1 shadow-xl">
                        <div className="w-full h-full relative rounded-full overflow-hidden bg-[#e5e0d8]">
                            <Image
                                src="/assets/images/hero-portrait.png"
                                alt="Yelitzé Rangel"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div>
                        <span className="text-[var(--color-secondary)] tracking-[0.3em] font-medium text-xs md:text-sm uppercase">No es magia. Es Orden.</span>
                        <h1 className="text-3xl md:text-5xl font-heading text-[var(--color-primary)] mt-2">Deja de Pedir.<br />Empieza a Ordenar.</h1>
                    </div>
                </div>

                {/* 2. Story / Problem (INTEREST) */}
                <div className="prose prose-lg text-[var(--color-text)] mx-auto leading-relaxed max-w-2xl bg-white/50 p-6 rounded-2xl border border-[#D4AF37]/10">
                    <p className="text-base md:text-lg italic text-gray-600">
                        "La mayoría de los mapas de sueños fallan porque nacen de la carencia ('quiero esto porque no lo tengo'). Eso es vibrar en escasez."
                    </p>
                    <p className="text-base md:text-lg font-medium text-[var(--color-primary)] mt-4">
                        Hoy haremos <strong>Arquitectura de Vida Intencional 2026</strong>. No vamos a llenar un tablero de fotos bonitas. Vamos a diseñar la estructura interna para que tus metas tengan donde aterrizar. Si hay orden, la energía fluye.
                    </p>
                </div>

                {/* 3.1 PRE-REQUISITE (Must Have) */}
                <div className="bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-xl p-6 max-w-2xl mx-auto flex gap-4 text-left">
                    <div className="flex-shrink-0 w-10 h-10 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-heading text-lg text-[var(--color-primary)] mb-1">Antes de Iniciar el Viaje</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Para que tu Arquitectura sea completa, necesitarás <strong>buscar 5 imágenes que representen tus deseos</strong> (una para cada pilar: Propósito, Recursos, Vínculos, Expansión y Templo). Tenlas listas en tu galería.
                        </p>
                    </div>
                </div>

                {/* 3. The Promise (DESIRE) */}
                <div className="grid md:grid-cols-3 gap-4 md:gap-6 px-4">
                    <BenefitCard
                        icon={<Sparkles className="w-6 h-6 text-[#D4AF37]" />}
                        title="Claridad Radical"
                        desc="Elimina el ruido. Sabrás exactamente qué es tuyo y qué es prestado."
                    />
                    <BenefitCard
                        icon={<Compass className="w-6 h-6 text-[#D4AF37]" />}
                        title="Coherencia"
                        desc="Alinea tu mente (visión) con tu emoción (combustible). Ahí ocurre la magia."
                    />
                    <BenefitCard
                        icon={<Target className="w-6 h-6 text-[#D4AF37]" />}
                        title="Magnetismo"
                        desc="Deja de perseguir. Conviértete en el imán de lo que por derecho te corresponde."
                    />
                </div>

                {/* 3.5 VSL VIDEO SECTION (New) */}
                <div className="max-w-3xl mx-auto w-full aspect-video bg-black/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 relative group">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&rel=0"
                        title="Mensaje de Bienvenida de Yelitzé"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    ></iframe>
                    {/* Decorative Overlay (optional) */}
                    <div className="absolute inset-0 border border-[#D4AF37]/20 pointer-events-none rounded-xl"></div>
                </div>

                <div className="border-t border-[var(--color-primary)]/10 pt-8 w-24 mx-auto" />

                <div className="border-t border-[var(--color-primary)]/10 pt-8 w-24 mx-auto" />

                {/* 4. Guided Ritual Steps */}
                <div className="text-left max-w-3xl mx-auto space-y-8 bg-white/60 p-8 rounded-3xl border border-[#D4AF37]/20 shadow-sm">
                    <h2 className="text-2xl font-heading text-[var(--color-primary)] text-center mb-2">Instrucciones para el Ritual</h2>
                    <p className="text-center text-sm text-gray-500 mb-8 italic">Sigue estos pasos antes de comenzar:</p>

                    <div className="space-y-8">
                        {/* Step 1: Presence */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-secondary)] text-white flex items-center justify-center font-bold text-sm">1</div>
                            <div>
                                <h3 className="font-bold text-[var(--color-primary)] text-sm uppercase tracking-wide mb-1">Presencia Radical</h3>
                                <p className="text-sm text-gray-600 mb-2">Siéntate con la espalda recta. Pon tu mano derecha sobre tu corazón. Cierra los ojos y repite:</p>
                                <p className="text-lg font-heading text-[var(--color-primary)] bg-white/50 p-3 rounded-lg border-l-4 border-[#D4AF37]">
                                    "Respiro profundo y me presento completa ante mi camino."
                                </p>
                            </div>
                        </div>

                        {/* Step 2: Release */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-secondary)] text-white flex items-center justify-center font-bold text-sm">2</div>
                            <div>
                                <h3 className="font-bold text-[var(--color-primary)] text-sm uppercase tracking-wide mb-1">Limpieza Consciente</h3>
                                <p className="text-sm text-gray-600 mb-2">Visualiza el año que termina saliendo de tu cuerpo como humo gris al exhalar. Di en voz alta:</p>
                                <p className="text-lg font-heading text-[var(--color-primary)] bg-white/50 p-3 rounded-lg border-l-4 border-[#D4AF37]">
                                    "Honro lo que he sido, agradezco lo que aprendí y libero lo que ya cumplió su ciclo."
                                </p>
                            </div>
                        </div>

                        {/* Step 3: Certainty */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-secondary)] text-white flex items-center justify-center font-bold text-sm">3</div>
                            <div>
                                <h3 className="font-bold text-[var(--color-primary)] text-sm uppercase tracking-wide mb-1">Apertura Total</h3>
                                <p className="text-sm text-gray-600 mb-2">Abre los ojos y mira la pantalla. Sonríe suavemente. Estás a punto de crear tu futuro. Decreta:</p>
                                <p className="text-lg font-heading text-[var(--color-primary)] bg-white/50 p-3 rounded-lg border-l-4 border-[#D4AF37]">
                                    "Hoy activo esta visión no desde la carencia, sino desde la certeza de que estoy lista para recibir."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </motion.div>

            <button
                onClick={onNext}
                className="group relative px-8 py-3 bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary-light)] transition-all flex items-center gap-2 mx-auto shadow-lg hover:scale-105 overflow-hidden"
            >
                <span className="relative z-10 font-medium">Comenzar Viaje</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
        </div>
    );
}

function BenefitCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e5e0d8] flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#F9F5E8] flex items-center justify-center mb-1">
                {icon}
            </div>
            <h3 className="font-heading text-lg text-[var(--color-primary)]">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
        </div>
    );
}
