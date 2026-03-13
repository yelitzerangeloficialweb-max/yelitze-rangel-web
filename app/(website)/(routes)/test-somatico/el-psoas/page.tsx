import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Zap, ShieldCheck, Activity } from 'lucide-react';

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

                    <section className="bg-white/60 backdrop-blur-md p-12 md:p-20 rounded-[4rem] border border-[#B8835A]/10 shadow-xl space-y-12">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6 text-xl font-body font-light text-[#2D2926]/80 leading-relaxed">
                                <h3 className="text-3xl font-editorial text-[#2D2926]">¿Qué representa en tu cuerpo?</h3>
                                <p>
                                    Físicamente, el Psoas conecta tu columna vertebral con tus piernas. Es el músculo principal de la respuesta de "lucha o huida".
                                </p>
                                <p>
                                    Holísticamente, se le conoce como el <strong>"Músculo del Alma"</strong>. Es el depósito de nuestros miedos más profundos y de nuestra necesidad de supervivencia básica.
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

                        <div className="space-y-8 text-xl font-body font-light text-[#2D2926]/80 leading-relaxed">
                            <h3 className="text-3xl font-editorial text-[#2D2926]">El camino a la libertad</h3>
                            <p>
                                Liberar el Psoas no es solo estirar un músculo; es decirle a tu sistema nervioso que estás a salvo. Cuando este músculo se relaja, la energía fluye hacia la corteza prefrontal de tu cerebro, permitiéndote tomar decisiones desde la claridad y no desde el miedo.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <div className="bg-white px-6 py-3 rounded-full border border-[#B8835A]/20 text-sm font-bold uppercase tracking-widest text-[#2D2926]/60">Seguridad</div>
                                <div className="bg-white px-6 py-3 rounded-full border border-[#B8835A]/20 text-sm font-bold uppercase tracking-widest text-[#2D2926]/60">Soberanía</div>
                                <div className="bg-white px-6 py-3 rounded-full border border-[#B8835A]/20 text-sm font-bold uppercase tracking-widest text-[#2D2926]/60">Expansión</div>
                            </div>
                        </div>
                    </section>
                </article>
            </div>
        </main>
    );
}
