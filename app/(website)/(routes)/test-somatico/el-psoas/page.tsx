import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Zap, ShieldCheck, Activity, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
    title: 'El Músculo Psoas: Soberanía y Mente Proactiva • Yelitze Rangel',
    description: 'Descubre por qué el Psoas es conocido como el músculo del alma y su papel fundamental en la regulación de tu mente proactiva.',
};

export default function PsoasPage() {
    return (
        <main className="min-h-screen bg-[#F5EFE6] py-32 relative overflow-hidden selection:bg-[#B8835A] selection:text-white">
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#B8835A]/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            
            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <Link href="/test-somatico" className="inline-flex items-center gap-2 text-[#8C4005] font-bold text-xs font-guide uppercase tracking-widest mb-12 hover:translate-x-[-4px] transition-transform">
                    <ArrowLeft className="w-4 h-4" /> Volver al Test
                </Link>

                <article className="space-y-16">
                    <header className="space-y-6 text-center md:text-left">
                        <span className="text-[#8C4005] font-bold tracking-[0.4em] uppercase text-xs block font-guide">Anatomía Sagrada</span>
                        <h1 className="text-5xl md:text-7xl font-editorial text-[#2D2926] leading-tight">
                            El Músculo PSOAS:<br />
                            <span className="italic text-[#B8835A]">El guardián de tu soberanía personal</span>
                        </h1>
                    </header>

                    <section className="bg-white/60 backdrop-blur-md p-12 md:p-20 rounded-[4rem] border border-[#B8835A]/10 shadow-xl space-y-16">
                        
                        {/* Intro Section */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6 text-xl font-body font-light text-[#2D2926]/80 leading-relaxed">
                                <h3 className="text-3xl font-editorial text-[#2D2926]">¿Qué representa en tu cuerpo?</h3>
                                <p>
                                    EL Psoas ilíaco es el único músculo que conecta la columna lumbar con las piernas, vital para la postura y la marcha.
                                </p>
                                <p>
                                    Debido a su conexión directa con el diafragma y el sistema nervioso, almacena tensión física ante el estrés crónico, el miedo o la ansiedad.
                                </p>
                            </div>
                            <div className="bg-[#F5EFE6] p-8 rounded-[3rem] border border-[#B8835A]/20 flex flex-col items-center text-center space-y-4">
                                <Zap className="w-12 h-12 text-[#8C4005]" />
                                <h4 className="text-2xl font-editorial text-[#8C4005]">El Bloqueo de la Mente Proactiva</h4>
                                <p className="text-sm font-body text-[#2D2926]/70 italic">
                                    "Un Psoas contraído envía una señal constante de peligro al cerebro. Bajo esta señal, es biológicamente imposible crear una mente proactiva."
                                </p>
                            </div>
                        </div>

                        {/* Why is it the muscle of emotions? */}
                        <div className="space-y-8">
                            <h3 className="text-4xl font-editorial text-[#2D2926] text-center mb-12">¿Por qué se le llama el "Músculo de las Emociones"?</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-white p-8 rounded-3xl border border-[#B8835A]/10 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-[#8C4005]/10 rounded-full flex items-center justify-center mb-4">
                                        <Activity className="w-6 h-6 text-[#8C4005]" />
                                    </div>
                                    <h4 className="text-xl font-bold font-editorial text-[#8C4005]">Conexión con el Sistema Nervioso</h4>
                                    <p className="text-sm leading-relaxed text-[#2D2926]/70 font-body">Está íntimamente ligado al sistema nervioso autónomo y al diafragma, reaccionando instantáneamente al estrés poniéndose en estado de "lucha o huida".</p>
                                </div>
                                <div className="bg-white p-8 rounded-3xl border border-[#B8835A]/10 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-[#8C4005]/10 rounded-full flex items-center justify-center mb-4">
                                        <ShieldCheck className="w-6 h-6 text-[#8C4005]" />
                                    </div>
                                    <h4 className="text-xl font-bold font-editorial text-[#8C4005]">Almacén de Tensión</h4>
                                    <p className="text-sm leading-relaxed text-[#2D2926]/70 font-body">Bajo estrés constante, se mantiene en contracción crónica, provocando dolor lumbar y fatiga. Actúa como guardián de emociones reprimidas.</p>
                                </div>
                                <div className="bg-white p-8 rounded-3xl border border-[#B8835A]/10 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-[#8C4005]/10 rounded-full flex items-center justify-center mb-4">
                                        <Sparkles className="w-6 h-6 text-[#8C4005]" />
                                    </div>
                                    <h4 className="text-xl font-bold font-editorial text-[#8C4005]">Músculo del Alma</h4>
                                    <p className="text-sm leading-relaxed text-[#2D2926]/70 font-body">Al ser el músculo más profundo, afecta la sensación de seguridad interior, conectando el cuerpo con la experiencia emocional profunda.</p>
                                </div>
                            </div>
                        </div>

                        {/* How to release it */}
                        <div className="space-y-8 bg-[#8C4005]/5 p-12 rounded-[3xl] border border-[#8C4005]/10 mt-12">
                            <h3 className="text-3xl font-editorial text-[#2D2926] text-center mb-8">Cómo liberar el Psoas</h3>
                            <div className="grid sm:grid-cols-2 gap-8 text-[#2D2926]/80 text-lg font-body font-light">
                                <div className="space-y-2">
                                    <strong className="font-bold text-[#8C4005] block font-editorial text-xl">1. Respiración Consciente</strong>
                                    <p>Por su conexión con el diafragma, la respiración diafragmática profunda ayuda a relajar el psoas.</p>
                                </div>
                                <div className="space-y-2">
                                    <strong className="font-bold text-[#8C4005] block font-editorial text-xl">2. Posturas de Yoga</strong>
                                    <p>Posturas que abren la cadera (ej. el corredor o el puente) estiran y liberan la tensión acumulada.</p>
                                </div>
                                <div className="space-y-2">
                                    <strong className="font-bold text-[#8C4005] block font-editorial text-xl">3. Descanso en el suelo</strong>
                                    <p>Acostarse boca arriba con rodillas flexionadas y pies apoyados por 5-10 minutos permite al psoas ceder.</p>
                                </div>
                                <div className="space-y-2">
                                    <strong className="font-bold text-[#8C4005] block font-editorial text-xl">4. Trabajo Somático Consciente</strong>
                                    <p>Técnicas de masoterapia, liberación de puntos gatillo y movimientos somáticos suaves guiados.</p>
                                </div>
                            </div>
                        </div>

                        {/* Conclusion */}
                        <div className="text-center max-w-2xl mx-auto space-y-6 pt-8 border-t border-[#B8835A]/20">
                            <p className="text-2xl font-editorial italic text-[#2D2926]">
                                "Su liberación no solo alivia el dolor físico, sino que también ayuda a soltar tensiones emocionales, mejorando la vitalidad y reduciendo la ansiedad."
                            </p>
                        </div>

                    </section>
                </article>
            </div>
        </main>
    );
}
