import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Star, Users, Map, Heart, AlertCircle, Briefcase, Calendar, CheckCircle2, ShieldCheck, XCircle } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default function CoachingAncestralPage() {
    return (
        <main className="min-h-screen bg-[var(--color-background)]">
            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden text-white">
                <div className="absolute inset-0">
                    <Image
                        src="/assets/images/hero-background-new.jpg"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <FadeIn>
                            <span className="inline-block px-4 py-2 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-sm font-semibold tracking-wider mb-6 border border-[var(--color-secondary)]/20">
                                Coaching Ancestral
                            </span>
                            <h1 className="text-4xl md:text-6xl font-heading text-[var(--color-primary)] mb-6 leading-tight">
                                Anatomía del Alma: <br />
                                <span className="text-[var(--color-secondary)]">Donde lo Invisible Cobra Voz</span>
                            </h1>
                            <p className="text-xl text-[var(--color-text-light)] mb-10 leading-relaxed max-w-2xl mx-auto">
                                Un sistema terapéutico único para identificar en qué parte del círculo de la vida se encuentra tu bloqueo. Rompe la ceguera involuntaria y recupera tu poder personal.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Link
                                    href="/reservas"
                                    className="btn-premium"
                                >
                                    Agendar Mi Ceremonia
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* What is it? (The Board) */}
            {/* El Método (The Board & Totems) */}
            <section className="py-20 bg-[var(--color-primary)] text-white relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <div className="relative max-w-md mx-auto lg:mx-0">
                                <div className="absolute -inset-4 bg-[var(--color-secondary)]/10 rounded-2xl transform rotate-3" />
                                <Image
                                    src="/assets/images/tablero-terapeutico-new.jpg"
                                    alt="Yelitzé Rangel - Tablero Terapéutico"
                                    width={450}
                                    height={600}
                                    className="relative rounded-2xl shadow-xl w-full object-cover aspect-[3/4]"
                                />
                                <div className="absolute -bottom-6 -right-6 bg-[var(--color-secondary)] p-6 rounded-xl shadow-lg max-w-sm hidden md:block text-white">
                                    <p className="text-sm italic font-medium">
                                        "No es ajedrez, no es Jumanji, ni una ouija. Es el protagonista de mi coaching ancestral: la anatomía del alma."
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                        <div>
                            <FadeIn delay={0.2}>
                                <span className="text-[var(--color-secondary)] font-bold tracking-wider uppercase text-sm mb-2 block">
                                    El Método
                                </span>
                                <h2 className="text-3xl font-heading text-white mb-6">
                                    El Tablero Terapéutico
                                </h2>
                                <p className="text-white/80 mb-6 leading-relaxed">
                                    Se trata de una consulta terapéutica donde observamos aspectos de tu vida que te inquietan. Descubriremos <strong>cómo ubicar las piezas a tu gusto</strong> en este círculo de coaching ancestral.
                                </p>
                                <p className="text-white/80 mb-8 leading-relaxed">
                                    Identificaremos en qué lugar del círculo de la vida te has parado con todos tus vínculos (profesión, pareja, familia). Cada parte del círculo te deja saber aspectos importantes sobre ti mismo:
                                </p>

                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                                            <AlertCircle className="w-5 h-5 text-[var(--color-secondary)]" />
                                        </div>
                                        <div>
                                            <strong className="text-white block">Creencias Limitantes</strong>
                                            <span className="text-sm text-white/60">Aquello que aún no tiene rostro en tu vida y urge sanar.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                                            <Clock className="w-5 h-5 text-[var(--color-secondary)]" />
                                        </div>
                                        <div>
                                            <strong className="text-white block">Fechas de Vencimiento</strong>
                                            <span className="text-sm text-white/60">Lo que ya cumplió su ciclo y no sabes cómo soltar.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                                            <Users className="w-5 h-5 text-[var(--color-secondary)]" />
                                        </div>
                                        <div>
                                            <strong className="text-white block">Los Tótems</strong>
                                            <span className="text-sm text-white/60">Elementos principales que te permiten observar con diferentes posiciones una información para expandir tu ser.</span>
                                        </div>
                                    </li>
                                </ul>

                                <p className="text-sm text-[var(--color-secondary)] font-semibold italic border-t border-white/10 pt-4">
                                    "No es una bola de cristal. No predico el futuro. Es un sistema que me ha llevado casi 10 años desarrollar para darle una mirada circular a tu destino."
                                </p>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modalities (Online vs Presencial) */}
            <section className="py-20 bg-[var(--color-background)]">
                <div className="container mx-auto px-4">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-3xl font-heading text-[var(--color-primary)] mb-4">Modalidades de la Sesión</h2>
                        <p className="text-[var(--color-text-light)]">Elige el formato que mejor resuene contigo</p>
                    </FadeIn>

                    <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <StaggerItem>
                            {/* Online */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[var(--color-primary)]/5 hover:border-[var(--color-secondary)]/30 transition-all group h-full">
                                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Users className="w-7 h-7 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-heading text-[var(--color-primary)] mb-4">Online (Global)</h3>
                                <ul className="space-y-4 text-[var(--color-text-light)]">
                                    <li className="flex gap-3">
                                        <Calendar className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0" />
                                        <span>Duración: <strong>3 Horas</strong> intensivas.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <Briefcase className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0" />
                                        <span>Video de comprensiones post-sesión vía WhatsApp.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0" />
                                        <span>Documento PDF con lo vivido, ejercicios y herramientas claves.</span>
                                    </li>
                                </ul>
                            </div>
                        </StaggerItem>

                        <StaggerItem>
                            {/* Presencial */}
                            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-[var(--color-secondary)]/10 relative overflow-hidden group h-full">
                                <div className="absolute top-0 right-0 bg-[var(--color-secondary)] text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                                    Experiencia VIP
                                </div>
                                <div className="w-14 h-14 bg-[var(--color-secondary)]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Heart className="w-7 h-7 text-[var(--color-secondary)]" />
                                </div>
                                <h3 className="text-2xl font-heading text-[var(--color-primary)] mb-4">Presencial (Íntimo)</h3>
                                <p className="text-sm text-[var(--color-text-light)] mb-6 italic">
                                    "Más que una sesión, una celebración de tu sanación."
                                </p>
                                <ul className="space-y-4 text-[var(--color-text-light)]">
                                    <li className="flex gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0" />
                                        <span><strong>Bienvenida de Celebración:</strong> Brindamos por tu decisión de sanar.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0" />
                                        <span><strong>Almuerzo incluido:</strong> Compartimos alimentos tras la sesión.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <Star className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0" />
                                        <span><strong>Masaje de Liberación:</strong> Armonización corporal para cerrar la experiencia.</span>
                                    </li>
                                </ul>
                            </div>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

            {/* Benefits & Pain Points */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16">
                        {/* Pain Points */}
                        <FadeIn delay={0.1}>
                            <div>
                                <h3 className="text-2xl font-heading text-[var(--color-primary)] mb-8 flex items-center gap-3">
                                    <AlertCircle className="w-6 h-6 text-red-400" />
                                    ¿Te sientes así?
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "Ansiedad constante por lo cambiante de la vida.",
                                        "Miedo a perder lo que tienes o repetir patrones familiares.",
                                        "Sensación de 'ceguera' ante tus propios bloqueos.",
                                        "Dolores de cabeza, fatiga mental o apatía.",
                                        "Vivir en 'modo supervivencia' sin disfrutar tus logros."
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 text-[var(--color-text-light)] bg-red-50/50 p-4 rounded-lg">
                                            <span className="text-red-400 font-bold">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>

                        {/* Benefits */}
                        <FadeIn delay={0.3}>
                            <div>
                                <h3 className="text-2xl font-heading text-[var(--color-primary)] mb-8 flex items-center gap-3">
                                    <Star className="w-6 h-6 text-[var(--color-secondary)]" />
                                    Lo que lograrás
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "Mejora tu percepción del éxito y reduce la ansiedad.",
                                        "Recupera tu sueño y paz mental.",
                                        "Salida del 'niño herido' para habitar tu 'adulto exitoso'.",
                                        "Claridad inmediata: 70% de la batalla ganada con la toma de conciencia.",
                                        "Mejora en relaciones de pareja, familia y laborales."
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 text-[var(--color-text-light)] bg-green-50/50 p-4 rounded-lg">
                                            <CheckCircle2 className="text-green-600 w-5 h-5 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Preparation / Ruta del Alma (Simplified) */}
            <section className="py-20 bg-[var(--color-background)] border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <FadeIn>
                        <h2 className="text-3xl font-heading text-[var(--color-primary)] mb-8">
                            ¿Para quién es esto?
                        </h2>
                        <p className="text-lg text-[var(--color-text-light)] mb-8">
                            Para profesionales de la salud, terapeutas, amas de casa y cualquier persona (entre 28 y 70 años) dispuesta a <strong>hacerse cargo</strong>.
                        </p>
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-[var(--color-secondary)]/20 inline-block text-left max-w-2xl">
                            <div className="flex items-start gap-4">
                                <ShieldCheck className="w-10 h-10 text-[var(--color-secondary)] flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-[var(--color-primary)] text-xl mb-2">Garantía de Claridad</h3>
                                    <p className="text-[var(--color-text-light)]">
                                        Mi promesa es firme: <strong>Si no identificamos la problemática</strong> durante la sesión para que puedas tomar acciones, <strong>te devuelvo tu dinero</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 text-center">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl font-heading text-[var(--color-primary)] mb-8">
                            ¿Lista para darle voz a lo invisible?
                        </h2>
                        <Link href="/reservas" className="btn-premium text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                            Agendar Sesión Ahora
                        </Link>
                        <p className="mt-4 text-sm text-[var(--color-text-light)]">
                            Inversión en tu paz y futuro.
                        </p>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
