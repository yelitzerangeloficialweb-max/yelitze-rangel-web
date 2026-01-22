import { Share2, Download, CircleDot } from 'lucide-react';
import Image from 'next/image';

interface SessionReportProps {
    clientName: string;
    date: string;
    topic: string;
    boardInsights: string; // "El Tablero Habló"
    originPoint: string;   // "Origen del Bloqueo"
    resources: string[];   // "Recursos de Apoyo"
    nextSteps: string[];   // "Pasos a Seguir"
}

export default function SessionReportTemplate({
    clientName = "Nombre del Consultante",
    date = "DD/MM/AAAA",
    topic = "Tema de la Sesión",
    boardInsights = "Aquí se detallará lo observado en el movimiento de las piezas...",
    originPoint = "Descripción del área del círculo de vida donde se halló el origen...",
    resources = ["Recurso 1", "Recurso 2"],
    nextSteps = ["Paso 1", "Paso 2"]
}: Partial<SessionReportProps>) {
    return (
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-none md:rounded-2xl overflow-hidden my-8 print:shadow-none print:my-0">
            {/* Header / Branding */}
            <div className="bg-[var(--color-primary)] text-white p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <Image
                        src="/assets/images/logo-white.png"
                        alt="Watermark"
                        fill
                        className="object-contain object-center scale-150"
                    />
                </div>
                <div className="relative z-10">
                    <h1 className="font-heading text-3xl md:text-4xl mb-2">Anatomía del Alma</h1>
                    <p className="text-[var(--color-secondary)] uppercase tracking-widest text-sm font-semibold">Reporte de Sesión Íntima</p>
                </div>
            </div>

            {/* Client Info */}
            <div className="bg-[var(--color-background)] p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    <h2 className="text-[var(--color-text-light)] text-sm uppercase tracking-wider mb-1">Consultante</h2>
                    <p className="text-xl font-heading text-[var(--color-primary)]">{clientName}</p>
                </div>
                <div className="text-center md:text-right">
                    <p className="text-[var(--color-text-light)] text-sm">{date}</p>
                    <p className="font-semibold text-[var(--color-primary)]">{topic}</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-8 md:p-12 space-y-10">

                {/* Insight 1: El Tablero Habló */}
                <section>
                    <h3 className="flex items-center gap-3 text-xl font-heading text-[var(--color-primary)] mb-4 pb-2 border-b border-[var(--color-secondary)]/20">
                        <CircleDot className="w-5 h-5 text-[var(--color-secondary)]" />
                        Lo que el Tablero Habló
                    </h3>
                    <p className="text-[var(--color-text-light)] leading-relaxed italic text-lg bg-gray-50 p-6 rounded-xl border-l-4 border-[var(--color-secondary)]">
                        "{boardInsights}"
                    </p>
                </section>

                {/* Insight 2: Origen del Bloqueo */}
                <section>
                    <h3 className="flex items-center gap-3 text-xl font-heading text-[var(--color-primary)] mb-4 pb-2 border-b border-[var(--color-secondary)]/20">
                        <Share2 className="w-5 h-5 text-[var(--color-secondary)]" />
                        Origen del Bloqueo
                    </h3>
                    <p className="text-[var(--color-text-light)] leading-relaxed">
                        {originPoint}
                    </p>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Resources */}
                    <div className="bg-[var(--color-background)] p-6 rounded-xl">
                        <h4 className="font-heading text-[var(--color-primary)] mb-4 text-lg">Recursos de Apoyo</h4>
                        <ul className="space-y-2">
                            {resources.map((res, i) => (
                                <li key={i} className="flex gap-2 text-sm text-[var(--color-text-light)]">
                                    <span className="text-[var(--color-secondary)] font-bold">✓</span>
                                    {res}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-[var(--color-background)] p-6 rounded-xl">
                        <h4 className="font-heading text-[var(--color-primary)] mb-4 text-lg">Próximos Pasos</h4>
                        <ul className="space-y-2">
                            {nextSteps.map((step, i) => (
                                <li key={i} className="flex gap-2 text-sm text-[var(--color-text-light)]">
                                    <span className="text-[var(--color-secondary)] font-bold">→</span>
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>

            {/* Footer */}
            <div className="bg-[var(--color-primary)] text-white/80 p-6 text-center text-sm">
                <p>Yelitzé Rangel | Terapia Sistémica y Sanación Ancestral</p>
                <div className="flex justify-center gap-4 mt-4 print:hidden">
                    <button className="flex items-center gap-2 hover:text-white transition-colors">
                        <Download className="w-4 h-4" /> Guardar PDF
                    </button>
                    <button className="flex items-center gap-2 hover:text-white transition-colors">
                        <Share2 className="w-4 h-4" /> Compartir
                    </button>
                </div>
            </div>
        </div>
    );
}
