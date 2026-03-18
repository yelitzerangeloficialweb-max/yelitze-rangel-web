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

                        {/* New Section: Emotions */}
                        <div className="pt-12 border-t border-[#B8835A]/10 space-y-10">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-4xl font-editorial text-[#8C4005]">Emociones Comunes "Atrapadas" en la Fascia</h3>
                                <p className="text-lg font-body font-light text-[#2D2926]/70 leading-relaxed">
                                    La fascia es extremadamente sensible a la química del estrés (cortisol y adrenalina). Cuando una emoción no se procesa, el tejido puede volverse rígido o inflamarse.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { e: "Miedo y Supervivencia", l: "Psoas (el 'músculo del alma') y zona lumbar." },
                                    { e: "Ira y Frustración", l: "Mandíbula (bruxismo), cuello y hombros." },
                                    { e: "Tristeza y Duelo", l: "Pecho, diafragma y zona dorsal (peso en la espalda)." },
                                    { e: "Culpabilidad / Responsabilidad", l: "Hombros y trapecios (carga pesada)." },
                                    { e: "Ansiedad y Control", l: "Fascia abdominal rígida y restricción respiratoria." }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-white/40 p-6 rounded-3xl border border-[#B8835A]/5 space-y-2">
                                        <h4 className="font-bold font-editorial text-[#8C4005]">{item.e}</h4>
                                        <p className="text-base text-[#2D2926]/80 font-body font-light">Suele alojarse en: <strong>{item.l}</strong></p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* New Section: Physical Symptoms */}
                        <div className="pt-12 border-t border-[#B8835A]/10 space-y-10">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-4xl font-editorial text-[#8C4005]">Síntomas de Restricción Fascial-Emocional</h3>
                                <p className="text-lg font-body font-light text-[#2D2926]/70 leading-relaxed">
                                    Si la fascia está "atrapada" por una carga emocional, el cuerpo presenta síntomas que a veces no tienen una explicación médica clara:
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    { t: "Dolor Crónico Errante", d: "Aparecen y desaparecen en diferentes partes sin causa aparente." },
                                    { t: "Rigidez Matutina", d: "Sensación de estar 'oxidado' o 'acartonado' al despertar." },
                                    { t: "Restricción del Movimiento", d: "Sentir que los músculos están cortos o que no puedes estirarte." },
                                    { t: "Nudos o Puntos Gatillo", d: "Zonas de tensión extrema que parecen 'piedras' bajo la piel." },
                                    { t: "Fatiga Crónica", d: "El cuerpo gasta energía inmensa manteniendo tejidos contraídos." },
                                    { t: "Alteraciones Viscerales", d: "Afecta la digestión y el sueño debido a la tensión fascial profunda." }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl bg-[#8C4005]/5">
                                        <Sparkles className="w-5 h-5 text-[#8C4005] mt-1 flex-shrink-0" />
                                        <div className="space-y-1">
                                            <h5 className="font-bold font-editorial text-[#2D2926] text-lg">{item.t}</h5>
                                            <p className="text-sm text-[#2D2926]/70 font-body font-light leading-snug">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </article>
            </div>
        </main>
    );
}
