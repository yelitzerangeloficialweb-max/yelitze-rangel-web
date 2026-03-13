import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Activity, ShieldAlert, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Síntomas Físicos y Somatización • Yelitze Rangel',
    description: 'Entiende cómo la fascia corporal guarda memorias de estrés y cómo estas se manifiestan en condiciones como la fibromialgia.',
};

export default function SintomasSomaticosPage() {
    return (
        <main className="min-h-screen bg-[#F5EFE6] py-32 relative overflow-hidden selection:bg-[#B8835A] selection:text-white">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#8C4005]/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <Link href="/test-somatico" className="inline-flex items-center gap-2 text-[#8C4005] font-bold text-xs font-guide uppercase tracking-widest mb-12 hover:translate-x-[-4px] transition-transform">
                    <ArrowLeft className="w-4 h-4" /> Volver al Test
                </Link>

                <article className="space-y-16">
                    <header className="space-y-6 text-center md:text-left">
                        <span className="text-[#8C4005] font-bold tracking-[0.4em] uppercase text-xs block font-guide">Conciencia Corporal</span>
                        <h1 className="text-5xl md:text-7xl font-editorial text-[#2D2926] leading-tight transition-all">
                            Síntomas Físicos:<br />
                            <span className="italic text-[#B8835A]">Cuando el cuerpo habla lo que el alma calla</span>
                        </h1>
                    </header>

                    <section className="bg-white/60 backdrop-blur-md p-10 md:p-16 rounded-[4rem] border border-[#B8835A]/10 shadow-xl space-y-10">
                        <p className="text-2xl font-editorial italic text-[#2D2926] leading-relaxed">
                            "La somatización no es una invención de la mente; es una densificación de la fascia corporal producto de una respuesta biológica que nunca llegó a su fin."
                        </p>
                        
                        <div className="space-y-8 text-[#2D2926]/80 text-xl font-body font-light leading-relaxed">
                            <p>
                                Cuando vivimos situaciones de estrés crónico o impactos emocionales fuertes, nuestra <strong>fascia corporal</strong> se contrae para protegernos. Si esta contracción se mantiene en el tiempo, el tejido se espesa y pierde su capacidad de comunicación elástica.
                            </p>
                            
                            <div className="bg-[#8C4005]/5 p-8 rounded-3xl border-l-4 border-[#8C4005] space-y-4">
                                <h3 className="text-2xl font-editorial text-[#8C4005] flex items-center gap-3">
                                    <ShieldAlert className="w-6 h-6" /> El Caso de la Fibromialgia
                                </h3>
                                <p>
                                    La fibromialgia es, en muchos casos, el resultado de un sistema nervioso en modo de hiperalerta constante. La fascia corporal está tan tensa y sensibilizada que cualquier estímulo se procesa como dolor. No es solo dolor muscular; es un grito del sistema pidiendo seguridad y regulación.
                                </p>
                            </div>

                            <p>
                                Otros síntomas comunes relacionados con la experiencia somática incluyen migrañas tensionales, trastornos digestivos (el "segundo cerebro"), fatiga crónica y bruxismo. Todos ellos tienen una raíz común: un ciclo fisiológico interrumpido.
                            </p>
                        </div>
                    </section>
                </article>
            </div>
        </main>
    );
}
