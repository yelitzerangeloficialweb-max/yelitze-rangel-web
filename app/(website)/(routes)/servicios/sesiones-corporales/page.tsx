"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight, Heart, Sparkles, CheckCircle2, ShieldCheck,
    Moon, Sun, Wind, Gem, Zap, Layers, Waves
} from "lucide-react";
import TypewriterText from "@/components/ui/TypewriterText";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default function SesionesCorporalesPage() {
    return (
        <main className="bg-black text-white selection:bg-[var(--color-secondary)] selection:text-white">

            {/* 1. Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/images/hero-corporales.png"
                        alt="Ritual de Sesiones Corporales"
                        fill
                        className="object-cover opacity-60"
                        priority
                        quality={100}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <FadeIn>
                        <div className="inline-block mb-10">
                            <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-light tracking-[0.2em] uppercase">
                                Alquimia del Tacto
                            </span>
                        </div>
                        <h1 className="text-4xl lg:text-7xl font-heading text-white mb-6 leading-tight font-bold">
                            Reconexión Integral
                        </h1>
                        <div className="inline-block bg-[#7b5735] px-6 py-2 mb-12 shadow-xl transform skew-x-[-2deg]">
                            <h2 className="text-xl md:text-3xl text-white font-light italic m-0 skew-x-[2deg]">
                                <TypewriterText
                                    text="El lenguaje existencial que habita en el santuario de tu alma."
                                    delay={0.5}
                                />
                            </h2>
                        </div>
                        <div className="max-w-3xl mx-auto">
                            <p className="text-xl text-gray-300 mb-12 leading-relaxed italic">
                                “El lenguaje más antiguo que hace vibrar la piel, nutre el corazón y acaricia el alma.”
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/reservas"
                                className="btn-premium text-lg px-10 py-4 shadow-2xl transition-all"
                            >
                                Reservar Experiencia
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <a
                                href="https://wa.me/17867268717"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-10 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all font-medium"
                            >
                                Consultar Disponibilidad
                                <span className="text-xl">📲</span>
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 2. Intro: El Concepto */}
            <section className="py-32 px-4 bg-stone-950 border-y border-white/5">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto text-center">
                        <FadeIn>
                            <span className="text-[var(--color-secondary)] font-bold tracking-widest uppercase text-xs mb-4 block">
                                La Filosofía
                            </span>
                            <h2 className="text-3xl md:text-5xl font-heading text-white mb-8">
                                Un sistema de integración humana y renovación celular
                            </h2>
                            <p className="text-lg text-gray-400 leading-relaxed mb-12">
                                Trabajaremos con la propuesta de disolución de las defensas instaladas en el músculo en forma de estrés y tensión.
                                Mediante un viaje que combina medicina ancestral, herbolaria y rituales chamánicos, buscaremos la armonía total
                                del estado de ánimo, el cuerpo y la mente.
                            </p>
                            <div className="grid md:grid-cols-3 gap-8">
                                {[
                                    { icon: Waves, title: "Renovación", text: "Integración celular y orgánica." },
                                    { icon: Heart, title: "Re-educación", text: "Gestión emocional profunda." },
                                    { icon: Zap, title: "Vitalidad", text: "Despertar de la energía vital." }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/5">
                                        <item.icon className="w-8 h-8 text-[var(--color-secondary)] mx-auto mb-4" />
                                        <h4 className="font-bold text-white mb-2">{item.title}</h4>
                                        <p className="text-sm text-gray-400">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 3. Modality Group: Gotas de Sabiduría */}
            <section className="py-32 px-4 bg-black overflow-hidden">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <FadeIn>
                                <span className="text-[var(--color-secondary)] font-bold tracking-widest uppercase text-xs mb-2 block">
                                    Medicina Ayurveda
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-heading text-white mb-10">Gotas de Sabiduría</h2>
                                <p className="text-gray-400 mb-12 italic leading-relaxed">
                                    "Un contacto de cuerpo a cuerpo que restaura la creatividad y la expansión del espíritu."
                                </p>
                                <StaggerContainer className="space-y-8">
                                    {[
                                        {
                                            title: "Shirodhara & Shirobtana",
                                            text: "Un río de aceite tibio que transporta al éxtasis. 3 horas de rejuvenecimiento y descanso mental profundo."
                                        },
                                        {
                                            title: "Masaje Abhyanga",
                                            text: "Frotación con polvos herbarios y aceites naturales para dispersar la tensión y nutrir el sistema motor."
                                        },
                                        {
                                            title: "Cabeza Indio (Siro Abhyanga)",
                                            text: "Toque amoroso que nivela el centro de las emociones, activando la oxigenación cerebral y el chakra coronario."
                                        }
                                    ].map((item, i) => (
                                        <StaggerItem key={i} className="relative pl-8 border-l border-[var(--color-secondary)]/30 group">
                                            <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-[var(--color-secondary)] transform scale-0 group-hover:scale-100 transition-transform" />
                                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-secondary)] transition-colors">{item.title}</h4>
                                            <p className="text-sm text-gray-400 leading-relaxed">{item.text}</p>
                                        </StaggerItem>
                                    ))}
                                </StaggerContainer>
                            </FadeIn>
                        </div>
                        <FadeIn className="order-1 lg:order-2">
                            <div className="relative aspect-square rounded-[3rem] overflow-hidden rotate-3 shadow-2xl border-2 border-white/10 group">
                                <Image
                                    src="/assets/images/ayurveda-detail.png"
                                    alt="Ritual Ayurveda"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 4. Modality Group: Sincronía & Rituales */}
            <section className="py-32 px-4 bg-stone-900/50">
                <div className="container mx-auto">
                    <FadeIn className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-heading text-white">Sincronía Ancestral</h2>
                        <div className="h-1 w-24 bg-[var(--color-secondary)] mx-auto mt-6" />
                    </FadeIn>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {[
                            {
                                title: "Sincronización a 4 y 6 Manos",
                                subtitle: "Un nado sincronizado al alma",
                                features: ["Trabaja hemisferios cerebrales", "Armoniza sistema motor", "3 horas de estimulación"],
                                icon: Layers
                            },
                            {
                                title: "El Vuelo de las Águilas",
                                subtitle: "Reestructura el árbol genealógico",
                                features: ["Sincronización a 4 manos", "Renovación celular", "Integración de medicinas"],
                                icon: Wind
                            },
                            {
                                title: "Amura / Alma Shamana",
                                subtitle: "Magia y medicina chamánica",
                                features: ["Instrumentos de poder", "Baños medicinales", "Ritual de visualización"],
                                icon: Moon
                            }
                        ].map((item, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="bg-black/40 p-10 rounded-[2.5rem] border border-white/5 hover:border-[var(--color-secondary)]/20 transition-all h-full flex flex-col group">
                                    <item.icon className="w-12 h-12 text-[var(--color-secondary)] mb-6 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
                                    <p className="text-[var(--color-secondary)] text-sm mb-6 italic">{item.subtitle}</p>
                                    <ul className="space-y-4 mb-8 flex-grow">
                                        {item.features.map((f, j) => (
                                            <li key={j} className="flex items-center gap-3 text-sm text-gray-400">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]/50" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Equilibrio Estructural */}
            <section className="py-32 px-4 bg-black">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <div className="relative p-1 bg-gradient-to-br from-[var(--color-secondary)]/20 to-transparent rounded-3xl">
                                <div className="bg-stone-900 border border-white/5 rounded-[1.4rem] p-10">
                                    <span className="text-[var(--color-secondary)] font-bold tracking-widest uppercase text-xs mb-8 block">Equilibrio Estructural</span>
                                    <div className="space-y-12">
                                        {[
                                            { title: "Masaje Craneo Sacral", text: "Evaluación y estímulo del sistema craneosacral para restablecer el equilibrio psicosomático y potenciar la auto-curación." },
                                            { title: "Shiat-Yurveda Yoga Massage", text: "Combinación de silla ergonómica (yoga asistida) y camilla (Abhyanga) para despertar la memoria celular." },
                                            { title: "El Camino (Masaje de Pies)", text: "Liberación de tensiones a través de los portales terrenales. Refresca tus cimientos y sincroniza tu energía vital." }
                                        ].map((item, i) => (
                                            <div key={i} className="group">
                                                <h4 className="text-xl font-bold text-white mb-2 group-hover:translate-x-2 transition-transform">{item.title}</h4>
                                                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                        <div className="space-y-12">
                            <FadeIn delay={0.2}>
                                <h3 className="text-3xl md:text-4xl font-heading mb-6">El lenguaje más antiguo...</h3>
                                <p className="text-gray-400 leading-relaxed italic border-l-2 border-[var(--color-secondary)] pl-6">
                                    “Escucha el Santuario del Alma. Los cimientos del organismo exigen ser tratados con la profundidad del amor para liberar los bloqueos acumulados.”
                                </p>
                            </FadeIn>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group">
                                    <Image
                                        src="/assets/images/relief-mental.png"
                                        alt="Alivio Mental"
                                        fill
                                        className="object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6 text-center bg-black/40">
                                        <p className="text-[10px] md:text-xs text-white font-medium drop-shadow-lg leading-relaxed">Resuelve dolores de cabeza, migrañas y fatiga crónica.</p>
                                    </div>
                                </div>
                                <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group">
                                    <Image
                                        src="/assets/images/circulation-vital.png"
                                        alt="Oxigenación Vital"
                                        fill
                                        className="object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6 text-center bg-black/40">
                                        <p className="text-[10px] md:text-xs text-white font-medium drop-shadow-lg leading-relaxed">Mejora la circulación y la toma de oxígeno celular.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Sacred Sexuality: Tantra Sistémico */}
            <section className="py-32 px-4 bg-stone-950">
                <div className="container mx-auto">
                    <div className="bg-black/60 border border-white/10 rounded-[4rem] overflow-hidden shadow-2xl">
                        <div className="grid lg:grid-cols-2">
                            <div className="relative min-h-[500px]">
                                <Image
                                    src="/assets/images/tantra-detail.png"
                                    alt="Sexualidad Sagrada"
                                    fill
                                    className="object-cover grayscale-[0.3]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent hidden lg:block" />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 lg:hidden" />
                            </div>
                            <div className="p-10 lg:p-20 flex flex-col justify-center">
                                <FadeIn>
                                    <span className="text-[var(--color-secondary)] font-bold tracking-widest uppercase text-xs mb-4 block">Alquimia de la Intimidad</span>
                                    <h2 className="text-4xl md:text-5xl font-heading text-white mb-6">Tantra Sistémico</h2>
                                    <p className="text-lg text-gray-300 mb-8 italic">
                                        “Tocar el alma a través del cuerpo es entrar en relación con la energía del otro y hacer de él ¡UN TODO!”
                                    </p>
                                    <p className="text-gray-400 mb-10 text-sm leading-relaxed">
                                        Un viaje de 2 horas de magia y reconexión. Incluye rituales de amor, esencias aromáticas y herramientas
                                        para transformar tu relación con la intimidad. No es un ayuno, es un banquete continuo de vida.
                                    </p>

                                    <div className="space-y-4 mb-12">
                                        <div className="flex items-center gap-4 text-sm text-gray-200">
                                            <Sun className="w-5 h-5 text-[var(--color-secondary)]" />
                                            <span>Equilibrio de Chakras y Vitalidad Real</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-200">
                                            <Moon className="w-5 h-5 text-[var(--color-secondary)]" />
                                            <span>Sanación de Traumas y Bloqueos de Afectividad</span>
                                        </div>
                                    </div>

                                    <Link href="/contacto" className="btn-premium px-10 py-4 group">
                                        Vivir la Maestría Sexual
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </FadeIn>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Deep Dive: Liberación de Trauma */}
            <section className="py-32 px-4 bg-black relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--color-secondary)]/5 rounded-full blur-[120px] -z-10" />

                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2 space-y-8">
                            <FadeIn>
                                <span className="text-[var(--color-secondary)] font-bold tracking-widest uppercase text-xs mb-4 block">Santuario de Sanación</span>
                                <h2 className="text-4xl md:text-6xl font-heading text-white mb-6">Liberación de Trauma</h2>
                                <p className="text-lg text-gray-200 italic leading-relaxed">
                                    “El trauma es energía estancada que no pudo manifestarse. Liberar las memorias atrapadas en el cuerpo es recorrer el camino hacia la libertad.”
                                </p>
                                <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
                                    <p>
                                        Fusión de medicinas egipcias, africanas y orientales. Usamos Zen Shiatsu y Ayurveda Yoga Massage
                                        para disolver los nudos de tensión que se manifiestan como fatiga, angustia o insomnio.
                                    </p>
                                    <p>
                                        Diseñado para casos de estrés post-traumático, situaciones repetitivas que congelan o bloqueos profundos
                                        en las relaciones. Regresa al presente con una mente silenciosa.
                                    </p>
                                </div>
                            </FadeIn>

                            <StaggerContainer className="grid grid-cols-2 gap-4">
                                {[
                                    "Limpia el Aura", "Ordena el Acuerdo", "Libera el Linaje", "Regula Chakras"
                                ].map((benefit, i) => (
                                    <StaggerItem key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[var(--color-secondary)]/30 transition-all">
                                        <CheckCircle2 className="w-4 h-4 text-[var(--color-secondary)] flex-shrink-0" />
                                        <span className="text-xs font-medium">{benefit}</span>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </div>

                        <FadeIn className="lg:w-1/2">
                            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl group">
                                <Image
                                    src="/assets/images/trauma-peace.png"
                                    alt="Somatic Peace"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-10 left-10 p-8 backdrop-blur-md bg-black/40 rounded-2xl border border-white/10 max-w-xs">
                                    <p className="text-sm italic text-gray-200 m-0">
                                        “El cuerpo sabe los canales de desagüe. La sanación es una manera de regresar al PRESENTE.”
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 8. Final CTA & Guarantee */}
            <section className="py-32 bg-stone-950 border-t border-white/5">
                <div className="container mx-auto max-w-4xl text-center px-4">
                    <FadeIn>
                        <ShieldCheck className="w-16 h-16 text-[var(--color-secondary)] mx-auto mb-10 opacity-80" />
                        <h2 className="text-4xl lg:text-7xl font-heading text-white mb-10 font-bold">
                            Tu cuerpo es un Santuario.
                        </h2>
                        <p className="text-xl text-gray-400 mb-12 italic">
                            ¿Estás lista para escuchar lo que tu alma quiere decirte a través de tu piel?
                        </p>

                        <div className="flex flex-col items-center gap-6">
                            <Link href="/reservas" className="btn-premium text-xl px-12 py-5 shadow-2xl">
                                Agendar Ceremonia Corporal
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <a
                                href="https://wa.me/17867268717"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-white hover:text-[var(--color-secondary)] transition-colors text-lg italic"
                            >
                                📲 Recibir información personalizada sobre cada técnica.
                            </a>
                            <p className="text-gray-500 text-sm italic mt-8">
                                Espacios limitados por la profundidad y exclusividad del ritual.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

        </main>
    );
}
