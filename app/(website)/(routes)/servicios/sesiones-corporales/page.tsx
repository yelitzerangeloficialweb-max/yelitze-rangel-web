"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

export default function SesionesCorporalesPage() {
    return (
        <main className="bg-black text-white">

            {/* ─── 1. HERO ──────────────────────────────────────────────────── */}
            <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden group">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/home_redesign/Web-Yelitze20.png"
                        alt="Reconexión Integral"
                        fill
                        className="object-cover transition-transform duration-[3000ms] group-hover:scale-110 opacity-90"
                        priority
                        quality={100}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#333333]/40 via-[#333333]/20 to-[#333333]/60" />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <FadeIn>
                        {/* Tag */}
                        <span className="inline-block px-6 py-2 rounded-full border border-[#B8835A]/50 text-[#B8835A] text-[10px] font-guide font-bold tracking-[0.4em] uppercase mb-10">
                            Alquimia del Tacto
                        </span>

                        {/* Title */}
                        <h1 className="text-6xl lg:text-[7rem] font-bold text-white mb-2 leading-none tracking-tight uppercase">
                            Reconexión
                        </h1>
                        <h1 className="text-6xl lg:text-[7rem] font-bold text-white mb-10 leading-none tracking-tight uppercase">
                            Integral
                        </h1>

                        {/* Subtitle */}
                        <p className="text-4xl md:text-6xl font-script text-[#D4B896] mb-14 max-w-4xl mx-auto leading-tight">
                            El lenguaje existencial que habita<br className="hidden md:block" /> en el santuario de tu alma
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/reservas" className="btn-premium text-xs font-guide tracking-[0.25em] uppercase px-10 py-4">
                                Reserva Tu Experiencia
                            </Link>
                            <a
                                href="https://wa.me/17867268717"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline text-xs font-guide tracking-[0.25em] uppercase px-10 py-4"
                            >
                                Consulta Disponibilidad
                            </a>
                        </div>
                    </FadeIn>
                </div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#333333] to-transparent z-10" />
            </section>

            {/* ─── 2. FILOSOFÍA (REDESIGN) ─────────────────────────────────── */}
            <section className="py-28 px-6 bg-[#333333] relative overflow-hidden">
                {/* Atmospheric Glow */}
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#B8835A]/10 rounded-full blur-[140px] pointer-events-none" />
                
                {/* Boundary Shadow (Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-20" />

                <div className="container mx-auto max-w-6xl relative z-10">
                    <FadeIn className="text-center mb-20">
                        <span className="text-white/40 font-guide font-bold tracking-[0.4em] uppercase text-[10px] block mb-6">
                            La Filosofía
                        </span>
                        <h2 className="text-5xl md:text-8xl font-script text-[#B8835A] leading-none mb-10">
                            Un sistema de integración humana y renovación celular
                        </h2>
                        <p className="text-white/80 text-lg leading-relaxed max-w-3xl mx-auto font-light">
                            Trabajaremos con la propuesta de disolución de las defensas instaladas en el músculo en forma de estrés y tensión.
                            Mediante un viaje que combina medicina ancestral, herbolaria y rituales chamánicos, buscaremos la armonía total
                            del estado de ánimo, el cuerpo y la mente.
                        </p>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Renovación", desc: "Integración celular y orgánica." },
                            { title: "Re-educación", desc: "Gestión emocional profunda." },
                            { title: "Vitalidad", desc: "Despertar de la energía vital." },
                        ].map((item, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="group relative bg-black/20 border border-[#B8835A]/30 rounded-[100px] px-10 py-16 flex flex-col items-center text-center h-full transition-all duration-700 hover:bg-black/40 hover:border-[#B8835A]/60 shadow-2xl">
                                    <h4 className="text-3xl md:text-4xl font-editorial italic text-white mb-4 transition-transform duration-500 group-hover:scale-105">
                                        {item.title}
                                    </h4>
                                    <p className="text-white/50 text-sm italic font-light">{item.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 3. GOTAS DE SABIDURÍA (REDESIGN) ───────────────────────── */}
            <section className="py-28 px-6 bg-[#333333] relative overflow-hidden">
                {/* Background Decor: Large Sweep Watermark */}
                <div 
                    className="absolute inset-0 z-0 pointer-events-none opacity-40"
                >
                    <div 
                        className="absolute -top-20 -left-20 -right-20 -bottom-20"
                        style={{
                            WebkitMaskImage: 'url(/images/diseno-elementos/gota-sabiduria.png)',
                            maskImage: 'url(/images/diseno-elementos/gota-sabiduria.png)',
                            WebkitMaskRepeat: 'no-repeat',
                            maskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                            maskPosition: 'center',
                            WebkitMaskSize: '110% 110%',
                            maskSize: '110% 110%',
                            backgroundColor: '#594d40'
                        }}
                    />
                </div>

                {/* Boundary Shadow (Top) */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/20 to-transparent pointer-events-none z-20" />

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left: Text Content */}
                        <FadeIn>
                            <div className="mb-12">
                                <span className="text-white/60 font-guide font-bold tracking-[0.4em] uppercase text-[10px] block mb-4">
                                    Medicina Ayurveda
                                </span>
                                <h3 className="text-6xl lg:text-[7.5rem] font-editorial italic text-[#B8835A] leading-none mb-8 drop-shadow-xl">
                                    Gotas de Sabiduría
                                </h3>
                                <p className="text-white font-editorial italic text-xl leading-relaxed max-w-md drop-shadow-sm">
                                    "Un contacto de cuerpo a cuerpo que restaura la creatividad y la expansión del espíritu."
                                </p>
                            </div>

                            <div className="space-y-3">
                                {[
                                    {
                                        title: "Shirodhara & Shirobtana",
                                        text: "Un río de aceite tibio que transporta al éxtasis. 3 horas de rejuvenecimiento y descanso mental profundo.",
                                    },
                                    {
                                        title: "Masaje Abhyanga",
                                        text: "Frotación con polvos herbarios y aceites naturales para dispersar la tensión y nutrir el sistema motor.",
                                    },
                                    {
                                        title: "Cabeza Indio (Siro Abhyanga)",
                                        text: "Toque amoroso que nivela el centro de las emociones, activando la oxigenación cerebral y el chakra coronario.",
                                    },
                                ].map((item, i) => (
                                    <div 
                                        key={i} 
                                        className="bg-black/30 backdrop-blur-md border-y border-white/5 py-8 px-10 transition-all duration-700 hover:bg-black/50 group relative overflow-hidden"
                                    >
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#B8835A]/0 group-hover:bg-[#B8835A] transition-all duration-500" />
                                        <h4 className="text-[#B8835A] font-bold text-2xl md:text-3xl mb-1 transition-transform duration-500 group-hover:translate-x-2">{item.title}</h4>
                                        <p className="text-white/80 text-sm md:text-base leading-relaxed font-light transition-transform duration-500 group-hover:translate-x-2">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>

                        {/* Right: Image Content */}
                        <FadeIn delay={0.2}>
                            <div className="relative aspect-square rounded-[5rem] md:rounded-[8rem] rounded-br-[2rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] group">
                                <Image
                                    src="/images/home_redesign/ayurveda_ritual.png"
                                    alt="Gotas de Sabiduría"
                                    fill
                                    className="object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ─── 4. SINCRONÍA ANCESTRAL (REDESIGN) ────────────────────────── */}
            <section className="py-28 px-6 bg-[#333333] relative overflow-hidden">
                {/* Subtle Copper Blur */}
                <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-[#B8835A]/10 rounded-full blur-[140px] pointer-events-none" />

                <div className="container mx-auto max-w-7xl relative z-10">
                    <FadeIn className="text-center mb-20">
                        <h2 className="text-5xl md:text-7xl font-editorial text-white leading-tight">
                            Sincronía Ancestral
                        </h2>
                        <div className="h-px w-24 bg-[#B8835A] mx-auto mt-6 opacity-30" />
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Sincronización a 4 y 6 Manos",
                                sub: "Un nado sincronizado al alma",
                                items: [
                                    "Trabaja hemisferios cerebrales",
                                    "Armoniza sistema motor",
                                    "3 horas de estimulación",
                                ],
                            },
                            {
                                title: "El Vuelo de las Águilas",
                                sub: "Reestructura el árbol genealógico",
                                items: [
                                    "Sincronización a 4 manos",
                                    "Renovación celular",
                                    "Integración de medicinas",
                                ],
                            },
                            {
                                title: "Amura / Alma Shamana",
                                sub: "Magia y medicina chamánica",
                                items: [
                                    "Instrumentos de poder",
                                    "Baños medicinales",
                                    "Ritual de visualización",
                                ],
                            },
                        ].map((item, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="group relative bg-black/20 border border-[#B8835A]/30 rounded-[100px] px-10 py-20 flex flex-col items-center text-center h-full transition-all duration-700 hover:bg-black/40 hover:border-[#B8835A]/60 shadow-2xl">
                                    <h3 className="text-3xl md:text-4xl font-editorial italic text-white mb-6 leading-tight group-hover:scale-105 transition-transform duration-500">
                                        {item.title}
                                    </h3>
                                    <p className="text-[#B8835A] font-guide italic text-base mb-10 tracking-wide uppercase">
                                        {item.sub}
                                    </p>
                                    <div className="space-y-4 mt-auto">
                                        {item.items.map((line, j) => (
                                            <p key={j} className="text-white/60 text-sm italic font-light">
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 5. EL LENGUAJE MÁS ANTIGUO (REDESIGN) ─────────────────────── */}
            <section className="py-28 px-6 bg-[#333333] relative overflow-hidden">
                {/* Atmospheric Blur */}
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#B8835A]/10 rounded-full blur-[140px] pointer-events-none" />

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-14 items-center">

                        {/* Left Column */}
                        <FadeIn>
                            <h3 className="text-5xl md:text-6xl font-editorial text-[#B8835A] mb-8 leading-tight">
                                El lenguaje<br />más antiguo...
                            </h3>
                            <p className="text-white/80 italic text-lg leading-relaxed border-l-2 border-[#B8835A]/30 pl-6 mb-12">
                                "Escucha el Santuario del Alma. Los cimientos del organismo exigen ser tratados con la profundidad del amor para liberar los bloqueos acumulados."
                            </p>
                            
                            <div className="grid grid-cols-2 gap-6">
                                <div className="relative aspect-[4/5] rounded-t-[3.5rem] rounded-br-[3.5rem] overflow-hidden shadow-2xl group">
                                    <Image
                                        src="/assets/images/relief-mental.png"
                                        alt="Alivio Mental"
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2000ms] group-hover:scale-110"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-10">
                                        <p className="text-white text-[11px] font-guide font-medium leading-relaxed text-center">
                                            Resuelve dolores de cabeza, migrañas y fatiga crónica.
                                        </p>
                                    </div>
                                </div>
                                <div className="relative aspect-[4/5] rounded-t-[3.5rem] rounded-bl-[3.5rem] overflow-hidden shadow-2xl group">
                                    <Image
                                        src="/assets/images/circulation-vital.png"
                                        alt="Circulación Vital"
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2000ms] group-hover:scale-110"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-10">
                                        <p className="text-white text-[11px] font-guide font-medium leading-relaxed text-center">
                                            Mejora la circulación y la toma de oxígeno celular.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Right Column: Modern Dark Card */}
                        <FadeIn delay={0.2}>
                            <div className="bg-black rounded-[4rem] p-12 lg:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/5">
                                <span className="text-white/40 font-guide font-bold tracking-[0.35em] uppercase text-[10px] block mb-12">
                                    Equilibrio Estructural
                                </span>
                                <div className="space-y-12">
                                    {[
                                        {
                                            title: "Masaje Cráneo Sacral",
                                            text: "\"Los cimientos del organismo exigen ser tratados con la profundidad del amor para liberar los bloqueos acumulados.\"",
                                        },
                                        {
                                            title: "Shiat-Yurveda Yoga Massage",
                                            text: "Combinación de silla ergonómica (yoga asistida) y camilla (Abhyanga) para despertar la memoria celular.",
                                        },
                                        {
                                            title: "El Camino (Masaje de Pies)",
                                            text: "Liberación de tensiones a través de los portales terrenales. Refresca tus cimientos y sincroniza tu energía vital.",
                                        },
                                    ].map((item, i) => (
                                        <div key={i} className="group">
                                            <h4 className="text-[#B8835A] font-editorial text-2xl md:text-3xl mb-4 group-hover:translate-x-2 transition-transform duration-500">{item.title}</h4>
                                            <p className="text-white/60 text-base leading-relaxed font-light">{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ─── 6. LIBERACIÓN DE TRAUMAS (REDESIGN) ─────────────────────── */}
            <section className="py-28 px-6 bg-[#333333] relative overflow-hidden">
                {/* Decorative Blurs */}
                <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-[#B8835A]/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-[#B8835A]/15 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left */}
                        <FadeIn>
                            <span className="text-white/40 font-guide font-bold tracking-[0.4em] uppercase text-[10px] block mb-5">
                                Santuario de Sanación
                            </span>
                            <h2 className="text-5xl md:text-7xl font-script text-[#B8835A] mb-8 leading-none">
                                Liberación de Traumas
                            </h2>
                            <p className="text-white italic text-lg leading-relaxed mb-10">
                                "El trauma es energía estancada que no pudo manifestarse. Liberar las memorias atrapadas en el cuerpo es recorrer el camino hacia la libertad."
                            </p>
                            
                            <div className="space-y-6 text-white/80 text-base leading-relaxed mb-12">
                                <p>
                                    Fusión de medicinas egipcias, africanas y orientales. Usamos Zen Shiatsu y Ayurveda Yoga Massage
                                    para disolver los nudos de tensión que se manifiestan como fatiga, angustia o insomnio.
                                </p>
                                <p>
                                    Diseñado para casos de estrés post-traumático, situaciones repetitivas que congelan o bloqueos
                                    profundos en las relaciones. Regresa al presente con una mente silenciosa.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {["Limpia el Aura", "Ordena el Acuerdo", "Libera el Linaje", "Regula Chakras"].map(
                                    (b, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-[#B8835A]/15 rounded-xl"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#B8835A] shrink-0" />
                                            <span className="text-xs font-guide font-bold text-white/60 uppercase tracking-wider">
                                                {b}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </FadeIn>

                        {/* Right: Photo */}
                        <FadeIn delay={0.2}>
                            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl group">
                                <Image
                                    src="/images/Imagenes-Reediseno/Web-Yelitze24.png"
                                    alt="Liberación de Traumas - Ritual de Sanación"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ─── 7. TANTRA SISTÉMICO (REDESIGN) ────────────────────────────── */}
            <section className="relative min-h-screen lg:min-h-[100vh] flex items-center overflow-hidden bg-black px-6">
                {/* Full Background Image - Subject positioned to the left */}
                <div className="absolute inset-0 z-0 group">
                    <Image
                        src="/images/Imagenes-Reediseno/Web-Yelitze22.png"
                        alt="Tantra Sistémico Intencional"
                        fill
                        className="object-cover object-left md:object-center lg:object-left transition-transform duration-[5000ms] group-hover:scale-110"
                        priority
                    />
                    {/* Deep Right-side Gradient starting from the middle for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-950/20 to-stone-950/95 z-10" />
                </div>

                <div className="container mx-auto max-w-7xl relative z-20">
                    <div className="flex justify-end">
                        <div className="max-w-2xl text-right space-y-12">
                            <FadeIn>
                                <div className="space-y-4">
                                    <span className="text-[#B8835A] font-guide font-bold tracking-[0.4em] uppercase text-[10px] block">
                                        Alquimia de la Intimidad
                                    </span>
                                    <div className="space-y-0">
                                        <span className="font-script text-7xl md:text-[10rem] text-[#B8835A] leading-[0.5] block drop-shadow-2xl">
                                            Tantra Sistémico
                                        </span>
                                        <h2 className="text-5xl md:text-[6.5rem] font-bold text-white tracking-tighter leading-none mt-4 uppercase">
                                            Intencional
                                        </h2>
                                    </div>
                                </div>
                                
                                <div className="space-y-10 mt-12">
                                    <p className="text-xl md:text-2xl text-white italic leading-relaxed font-editorial border-r-2 border-[#B8835A] pr-8 py-2 block max-w-lg ml-auto">
                                        "Tocar el alma a través del cuerpo es entrar en relación con la energía del otro y hacer de él ¡UN TODO!"
                                    </p>
                                    
                                    <p className="text-lg text-white/70 leading-relaxed font-light max-w-lg ml-auto">
                                        Un viaje de 2 horas de magia y reconexión. Incluye rituales de amor, esencias aromáticas y
                                        herramientas para transformar tu relación con la intimidad. No es un ayuno, es un banquete
                                        continuo de vida.
                                    </p>

                                    <ul className="space-y-4 text-white/80 font-medium">
                                        {[
                                            "Equilibrio de Chakras y Vitalidad Real",
                                            "Sanación de Traumas y Bloqueos de Afectividad",
                                        ].map((text, i) => (
                                            <li key={i} className="flex items-center justify-end gap-4 text-lg">
                                                {text}
                                                <span className="w-2 h-2 rounded-full bg-[#B8835A] shrink-0 shadow-[0_0_10px_rgba(184,131,90,0.5)]" />
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="pt-8">
                                        <Link
                                            href="https://wa.me/17867268717"
                                            target="_blank"
                                            className="inline-flex items-center justify-center bg-[#B8835A] text-white hover:brightness-110 transition-all px-12 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs lg:text-sm shadow-2xl group"
                                        >
                                            Vive la Maestría Tántrica »
                                        </Link>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 8. FINAL CTA ─────────────────────────────────────────────── */}
            <section className="relative py-40 px-6 overflow-hidden group">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/Imagenes-Reediseno/Web-Yelitze19.png"
                        alt="Tu cuerpo es un Santuario"
                        fill
                        className="object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                        quality={90}
                    />
                    <div className="absolute inset-0 bg-black/72" />
                </div>

                <div className="container mx-auto max-w-3xl text-center relative z-10">
                    <FadeIn>
                        <h2 className="text-5xl md:text-7xl font-editorial italic text-white mb-8 leading-tight">
                            Tu cuerpo es un Santuario
                        </h2>
                        <p className="text-xl text-white/65 mb-12 italic font-editorial">
                            ¿Estás lista para escuchar lo que tu alma quiere decirte a través de tu piel?
                        </p>
                        <Link
                            href="/reservas"
                            className="btn-premium text-xs font-guide tracking-[0.25em] uppercase px-12 py-5"
                        >
                            Agenda Tu Ceremonia Corporal
                        </Link>
                        <p className="mt-8">
                            <a
                                href="https://wa.me/17867268717"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/35 hover:text-[#B8835A] transition-colors text-sm italic"
                            >
                                📲 Recibir información personalizada sobre cada técnica.
                            </a>
                        </p>
                        <p className="text-white/20 text-xs mt-4 font-guide tracking-wider">
                            Espacios limitados por la profundidad y exclusividad del ritual.
                        </p>
                    </FadeIn>
                </div>
            </section>

        </main>
    );
}
