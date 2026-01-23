import Link from "next/link";
import { ArrowRight, Calendar, Users, BookOpen } from "lucide-react";

export default function ServicesPage() {
    const services = [
        {
            title: "Sesiones Íntimas",
            description: "Bienvenida/o a este espacio íntimo de Coaching Ancestral – Anatomía del Alma. Un encuentro 1:1 donde lo invisible cobra voz y tu alma puede expresarse con verdad.",
            price: "Desde $197 USD",
            icon: <Users className="w-8 h-8 text-[var(--color-secondary)]" />,
            features: ["Modalidad Online o Presencial", "Tablero Terapéutico", "Seguimiento Personalizado"],
            link: "/servicios/coaching-ancestral",
            cta: "Ver Todos los Detalles",
            highlight: true
        },
        {
            title: "Capacitaciones Grupales",
            description: "Talleres intensivos para sanar en tribu. La energía del grupo potencia el trabajo individual mediante espejos sistémicos.",
            price: "Desde $47 USD",
            icon: <Calendar className="w-8 h-8 text-[var(--color-secondary)]" />,
            features: ["Encuentros en vivo", "Cuaderno de trabajo PDF", "Acceso a comunidad"],
            link: "/eventos", // Linking to events for now as these are usually dated
            cta: "Ver Próximos Talleres",
            highlight: false
        },
        {
            title: "Libros y Recursos",
            description: "'Hilos de Conexión' y otras herramientas para empezar tu viaje de autodescubrimiento a tu propio ritmo.",
            price: "$19.99 USD",
            icon: <BookOpen className="w-8 h-8 text-[var(--color-secondary)]" />,
            features: ["Lectura Transformadora", "Ejercicios Prácticos", "Formato Digital e Impreso"],
            link: "/libros",
            cta: "Explorar Librería",
            highlight: false
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-36 pb-20">
            <div className="container mx-auto px-4 text-center mb-16">
                <span className="uppercase tracking-widest text-sm font-semibold text-[var(--color-secondary)] mb-2 block animate-fade-in">
                    Mis Propuestas
                </span>
                <h1 className="text-4xl md:text-5xl font-heading text-[var(--color-primary)] mb-6 animate-fade-in-up uppercase">
                    ALQUIMIA PERSONAL Y ORGANIZACIONAL
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-[var(--color-text-light)] animate-fade-in-up delay-100">
                    Herramientas y espacios sagrados diseñados para acompañarte en cada etapa de tu proceso de evolución.
                </p>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className={`rounded-2xl p-8 shadow-xl transition-all duration-300 flex flex-col relative group overflow-hidden ${service.highlight
                                ? 'bg-white border-2 border-[var(--color-secondary)] transform lg:-translate-y-4 shadow-2xl'
                                : 'bg-white border border-[var(--color-primary)]/5 hover:border-[var(--color-secondary)]/30 hover:shadow-2xl'
                                }`}
                        >
                            {service.highlight && (
                                <div className="absolute top-0 right-0 bg-[var(--color-secondary)] text-white text-xs font-bold px-4 py-1 rounded-bl-lg uppercase tracking-wider">
                                    Más Popular
                                </div>
                            )}

                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto transition-colors ${service.highlight ? 'bg-[var(--color-secondary)]/10' : 'bg-[var(--color-primary)]/5 group-hover:bg-[var(--color-primary)]/10'
                                }`}>
                                {service.icon}
                            </div>

                            <h3 className="text-2xl lg:text-3xl font-heading text-[var(--color-primary)] mb-4 text-center group-hover:text-[var(--color-secondary)] transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-[var(--color-text-light)] text-center mb-8 flex-grow leading-relaxed">
                                {service.description}
                            </p>

                            <div className="bg-[var(--color-background)] rounded-xl p-6 mb-8 text-center">
                                <ul className="space-y-3 inline-block text-left mb-4">
                                    {service.features.map((feat, i) => (
                                        <li key={i} className="flex items-center text-sm text-[var(--color-text)]">
                                            <span className={`w-1.5 h-1.5 rounded-full mr-3 ${service.highlight ? 'bg-[var(--color-secondary)]' : 'bg-[var(--color-primary)]/40'}`} />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                                {service.title === "Sesiones Íntimas" && (
                                    <div className="border-t border-[var(--color-primary)]/5 pt-4 mt-2">
                                        <p className="text-sm italic font-medium text-[var(--color-secondary)]">
                                            Este es un espacio seguro, consciente y transformador.
                                        </p>
                                        <p className="text-xs text-[var(--color-text-light)] mt-1 italic">
                                            Gracias por confiar en tu proceso.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="text-center mt-auto">
                                <Link
                                    href={service.link}
                                    className="btn-premium w-full"
                                >
                                    {service.cta}
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
