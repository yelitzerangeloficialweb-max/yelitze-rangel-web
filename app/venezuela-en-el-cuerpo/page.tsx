"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight, CheckCircle2, ShieldCheck,
    MessageCircle, ChevronDown, User, Star,
    Target, BookOpen, QrCode, TrendingUp,
    AlertCircle, Sparkles, Heart, Activity,
    Zap, BatteryMedium, Brain, Repeat
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/motion";
import { SacredGeometry, FloatingStars, ThinGoldenLine, WaveDivider } from "@/components/ui/MysticalElements";

export default function VenezuelaEnElCuerpoPage() {
    const router = useRouter();
    const [submitted, setSubmitted] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const BackgroundCircles = () => (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] border border-[#B8835A] rounded-full opacity-10"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [0, -90, 0],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] border border-[#8C4005] rounded-full opacity-10"
            />
        </div>
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const city = formData.get("city") as string;
        const whatsapp = formData.get("phone") as string;

        try {
            // Save to database
            const res = await fetch('/api/venezuela-en-el-cuerpo/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, whatsapp, city }),
            });

            if (res.ok) {
                // Redirect to success page with query params
                router.push(`/venezuela-en-el-cuerpo/success?name=${encodeURIComponent(name)}&city=${encodeURIComponent(city)}`);
            } else {
                console.error('Registration failed');
                // You could add a toast or error state here if needed
                alert("Hubo un error al registrarte. Por favor intenta de nuevo.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Error de conexión. Intenta de nuevo.");
        }
    };

    return (
        <main className="min-h-screen selection:bg-[#B8835A] selection:text-[#F5EFE6]" style={{
            backgroundColor: '#F5EFE6', // Clean white
            '--color-terracotta': '#B8835A', // Golden accent
            '--color-earth': '#2D2926',      // Medium Gray text
            '--color-forest': '#2D2926',     // Dark Gray/Black heading
            '--color-cream': '#F5EFE6',      // White
            '--color-accent-ocre': '#B8835A' // Light Gold
        } as React.CSSProperties}>

            {/* 1. HERO (ATENCIÓN) */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#F5EFE6]">
                <BackgroundCircles />
                <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <FadeIn>
                        <span className="inline-block text-[#C1530A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-8 border border-[#C1530A]/20 px-4 py-2 rounded-full bg-white/40 backdrop-blur-sm shadow-sm ring-1 ring-[#C1530A]/5">
                            Evento de Registro
                        </span>
                        <h2 className="text-2xl md:text-3xl font-body text-[#8C4005] mb-4 font-semibold leading-snug">
                            Tu ansiedad no es el problema, es la solución que tu cuerpo encontró
                        </h2>
                        <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-script text-[#8C4005] mb-6 leading-none pt-4 tracking-normal font-normal">
                            Venezuela en el Cuerpo
                        </h1>
                        <p className="text-[#C1530A] text-lg font-medium mb-6 max-w-xl">
                            Una propuesta terapéutica para regular, integrar y abrir nuevas posibilidades
                        </p>
                        <p className="text-[#2D2926] text-lg font-light mb-10 max-w-xl leading-relaxed">
                            Esto no es solo una conferencia. Es una experiencia de regulación <strong className="text-[#8C4005] font-bold underline decoration-[#C1530A]/30">presencial u online</strong>. Es un espacio seguro para comprender lo que el cuerpo guarda y para ampliar nuestra capacidad de bienestar en vivo.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link
                                href="#registro"
                                className="bg-[#C1530A] text-[#F5EFE6] px-10 py-5 rounded-full font-bold shadow-[0_15px_30px_-5px_rgba(193,83,10,0.4)] hover:bg-[#A84A2F] hover:shadow-[0_20px_40px_-5px_rgba(193,83,10,0.5)] transition-all flex items-center justify-center gap-3 group"
                            >
                                Generar mi pase QR y recibir las coordenadas
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </FadeIn>

                    <ScaleIn delay={0.2} className="relative aspect-[4/5] lg:aspect-square group cursor-pointer">
                        <div className="absolute inset-0 border-2 border-[#B8835A]/20 rounded-[3rem] -rotate-6 scale-95 group-hover:rotate-0 transition-transform duration-500" />
                        <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-[#F5EFE6] transition-transform duration-500 group-hover:scale-[1.03]">
                            <Image
                                src="/assets/images/venezuela/hero-venezuela-new.jpg"
                                alt="Venezuela en el Cuerpo"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2D2926]/40 to-transparent" />
                        </div>
                    </ScaleIn>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#C1530A]/5 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2D2926]/5 rounded-full blur-[120px] -z-10" />
            </section>

            {/* 2. SEGMENTACIÓN */}
            <section className="py-24 bg-[#F5EFE6] relative overflow-hidden">
                <BackgroundCircles />
                <div className="container mx-auto px-4 max-w-6xl">
                    <FadeIn className="mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading text-[#8C4005] font-bold mb-6">
                            ¿Por qué nuestro cuerpo?
                        </h2>
                        <p className="text-[#2D2926] text-lg font-light leading-relaxed max-w-4xl">
                            Cuando una emoción no puede expresarse en su momento, el cuerpo la almacena como tensión o bloqueo. Con el tiempo, esto puede manifestarse de diversas formas.
                        </p>
                    </FadeIn>

                    <StaggerContainer className="flex flex-wrap justify-center gap-x-6 gap-y-12">
                        {[
                            {
                                icon: Target,
                                title: "Ansiedad",
                                desc: "Estado de alerta constante y anticipación del peligro"
                            },
                            {
                                icon: Zap,
                                title: "Estrés",
                                desc: "Tensión acumulada que afecta el funcionamiento diario"
                            },
                            {
                                icon: BatteryMedium,
                                title: "Cansancio",
                                desc: "Fatiga profunda que no se alivia con descanso"
                            },
                            {
                                icon: Brain,
                                title: "Dolor físico",
                                desc: "Manifestaciones somáticas de tensiones no resueltas"
                            },
                            {
                                icon: Repeat,
                                title: "Reacciones automáticas",
                                desc: "Respuestas rápidas e involuntarias ante estímulos"
                            }
                        ].map((item, i) => (
                            <StaggerItem key={i} className="flex-1 min-w-[300px] max-w-[380px] bg-[#F5EFE6] px-8 pb-8 pt-10 rounded-xl border border-stone-200 shadow-sm relative mt-6 hover:shadow-lg transition-shadow">
                                {/* Top Golden Border */}
                                <div className="absolute top-0 left-0 right-0 h-[6px] bg-gradient-to-r from-[#B8835A] to-[#B8835A] rounded-t-xl" />

                                {/* Icon Overlay */}
                                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-b from-[#B8835A] to-[#B8835A] rounded-full flex items-center justify-center shadow-lg border-4 border-[#F5EFE6]">
                                    <item.icon className="w-5 h-5 text-[#F5EFE6] stroke-[2.5]" />
                                </div>

                                <h3 className="text-xl font-heading text-[#8C4005] mb-3 font-bold mt-2">{item.title}</h3>
                                <p className="text-[#2D2926] font-light text-[15px] leading-relaxed">{item.desc}</p>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 3. EL PROBLEMA (AGITACIÓN) */}
            <section className="pt-52 pb-48 bg-[#2D2926] text-[#F5EFE6] relative overflow-hidden">
                <WaveDivider position="top" fill="#F5EFE6" />
                <FloatingStars count={30} className="opacity-50" />
                <SacredGeometry className="-left-40 top-1/2 -translate-y-1/2 w-[800px] h-[800px] text-[#B8835A]/5" />
                <ThinGoldenLine d="M0,100 Q250,250 500,100 T1000,100" className="top-20 left-0 w-full h-64 opacity-20" />

                <div className="absolute inset-0 opacity-[0.03] bg-[url('/assets/images/noise.png')] pointer-events-none" />
                <div className="container mx-auto px-4 max-w-4xl relative z-10">
                    <FadeIn className="text-center">
                        <h2 className="text-4xl lg:text-5xl font-heading text-[#8C4005] mb-12 italic font-light">
                            Vivir en <span className="text-[#B8835A] font-bold">modo supervivencia</span> no es vivir, es resistir mientras te consumes.
                        </h2>
                        <div className="space-y-8 text-xl text-[#F5EFE6]/80 font-light leading-relaxed">
                            <p>
                                El cuerpo humano está diseñado para protegerse del peligro, pero no para vivir en él indefinidamente. Cuando el "modo alerta" se vuelve tu estado permanente, tu cerebro desconecta la creatividad y la visión de futuro para priorizar la respiración básica.
                            </p>
                            <p>
                                Por eso, por más que leas sobre finanzas o planificación, si tu sistema nervioso sigue sintiéndose en "ruina", siempre saboteará tus intentos de progreso. Sanar el cuerpo es la premisa básica para reconstruir la economía.
                            </p>
                        </div>
                    </FadeIn>
                </div>
                <WaveDivider position="bottom" fill="#F5EFE6" />
            </section>

            {/* 4. BIOGRAFÍA (YELITZE RANGEL) */}
            <section className="py-32 bg-[#F5EFE6] relative overflow-hidden">
                <BackgroundCircles />
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <FadeIn>
                                <div className="relative aspect-[3/4] w-full rounded-tr-[120px] rounded-bl-[120px] rounded-tl-none rounded-br-none overflow-hidden shadow-2xl border-x-4 border-t-4 border-[#F5EFE6]">
                                    <Image
                                        src="/assets/images/yelitze/manifesto-new.jpg"
                                        alt="Yelitze Rangel"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#2D2926]/40 to-transparent" />
                                </div>
                                <div className="absolute -bottom-8 -right-8 bg-[#F5EFE6] p-8 rounded-3xl shadow-xl border border-[#F5EFE6]">
                                    <p className="text-[#C1530A] text-4xl font-bold font-heading">+8000</p>
                                    <p className="text-[#2D2926] text-sm font-bold uppercase tracking-widest">Vidas Impactadas</p>
                                </div>
                            </FadeIn>
                        </div>

                        <div className="space-y-8">
                            <FadeIn>
                                <span className="text-[#C1530A] font-bold tracking-[0.4em] uppercase text-xs mb-6 block">Tu Guía en este Proceso</span>
                                <h2 className="text-4xl lg:text-6xl font-heading text-[#8C4005] mb-8 font-bold italic">Yelitze Rangel</h2>
                                <div className="w-24 h-px bg-[#C1530A]/30 mb-8" />
                                <div className="space-y-6 text-lg text-[#2D2926] font-light leading-relaxed">
                                    <p>
                                        Soy <span className="bg-[#B8835A] text-[#F5EFE6] px-2 py-0.5 font-medium rounded-md inline-block shadow-sm">Yelitze Rangel</span>, psicóloga - terapeuta somática especializada en el descongelamiento del trauma corporal. A lo largo de mi carrera, he acompañado a cientos de personas en su proceso de regulación del sistema nervioso y en la sanación de memorias atrapadas en el cuerpo. Lo que vengo a compartir hoy no es solo un conocimiento, es un proceso de transformación profundo que cada uno de nosotros puede iniciar desde dentro.
                                    </p>
                                    <p>
                                        He liderado este proceso terapéutico acompañando a personas en distintos países, integrando ciencia, experiencia y sabiduría ancestral.
                                    </p>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. LA SOLUCIÓN (EL HITO) */}
            <section className="py-32 bg-[#F5EFE6] relative overflow-hidden">
                <BackgroundCircles />
                <div className="container mx-auto px-4 max-w-5xl text-center">
                    <FadeIn>
                        <h2 className="text-[#2D2926] font-bold tracking-[0.4em] uppercase text-xs mb-8">El Método</h2>
                        <h3 className="text-4xl lg:text-7xl font-heading text-[#8C4005] mb-12 font-bold leading-tight uppercase tracking-tight">
                            Arquitectura <br className="md:hidden" /> <span className="text-[#C1530A]">de vida Intencional</span>
                        </h3>
                        <p className="text-2xl text-[#2D2926] font-light max-w-3xl mx-auto italic mb-20">
                            Dejamos de reaccionar al entorno para empezar a diseñar nuestra respuesta interna.
                        </p>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 gap-8 items-stretch">
                        <FadeIn delay={0.2} className="flex-1 bg-[#F5EFE6] p-12 rounded-[3.5rem] border border-[#2D2926]/10 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 -scale-x-100 group-hover:scale-x-110 transition-transform">
                                <AlertCircle className="w-32 h-32" />
                            </div>
                            <h4 className="text-6xl font-heading text-[#C1530A]/20 mb-6 font-bold">01</h4>
                            <h5 className="text-2xl font-bold text-[#8C4005] mb-6">Estado de Supervivencia</h5>
                            <p className="text-[#2D2926] font-light">Cuerpos tensos, mentes nubladas, decisiones basadas en el miedo al hoy.</p>
                        </FadeIn>

                        <FadeIn delay={0.4} className="flex-1 bg-[#2D2926] p-12 rounded-[3.5rem] text-[#F5EFE6] relative group overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                <Sparkles className="w-32 h-32" />
                            </div>
                            <h4 className="text-6xl font-heading text-[#B8835A]/20 mb-6 font-bold">02</h4>
                            <h5 className="text-2xl font-bold text-[#8C4005] mb-6">Arquitectura de vida Intencional</h5>
                            <p className="text-stone-300 font-light">Sistemas regulados, visión de largo plazo y capacidad real de crear abundancia.</p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 6. ENTREGABLES */}
            <section className="py-40 bg-[#2D2926] text-[#F5EFE6] relative overflow-hidden">
                <WaveDivider position="top" fill="#F5EFE6" />
                <FloatingStars count={25} className="opacity-30" />
                <SacredGeometry className="left-[-10%] bottom-[-10%] w-[600px] h-[600px] text-[#B8835A]/5" />

                <div className="container mx-auto px-4 relative z-10">
                    <FadeIn className="text-center mb-24">
                        <h2 className="text-4xl lg:text-7xl font-heading text-[#B8835A] font-bold">Lo que recibirás</h2>
                        <div className="w-24 h-px bg-[#B8835A]/30 mx-auto mt-8" />
                    </FadeIn>

                    <StaggerContainer className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto">
                        {[
                            {
                                icon: QrCode,
                                title: "Pase de Acceso QR",
                                desc: "Tu entrada personal e intransferible para el evento digital en vivo."
                            },
                            {
                                icon: CheckCircle2,
                                title: "Test de Percepción",
                                desc: "Un diagnóstico corporal para identificar tu nivel de estrés somático."
                            },
                            {
                                icon: Sparkles,
                                title: "Arquitectura de vida Intencional",
                                desc: "El mapa práctico para diseñar tu respuesta interna y habitar una nueva soberanía."
                            }
                        ].map((item, i) => (
                            <StaggerItem key={i} className="flex flex-col items-center text-center group">
                                <div className="w-28 h-28 bg-[#F5EFE6] rounded-[2.5rem] flex items-center justify-center shadow-2xl border border-[#B8835A]/20 mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                    <item.icon className="w-12 h-12 text-[#C1530A]" />
                                </div>
                                <h4 className="text-2xl font-heading text-[#B8835A] mb-4 font-bold uppercase tracking-tight">{item.title}</h4>
                                <p className="text-[#F5EFE6]/70 font-light leading-relaxed max-w-[280px]">{item.desc}</p>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    <FadeIn delay={0.6} className="mt-20 text-center max-w-3xl mx-auto">
                        <p className="text-lg text-[#F5EFE6]/60 font-light leading-relaxed">
                            Estos recursos han sido diseñados como un acompañamiento integral para tu proceso. Al participar, obtendrás herramientas prácticas y digitales que te permitirán empezar a aplicar los principios de la regulación somática de inmediato, asegurando que tu transformación comience incluso antes del evento central.
                        </p>
                    </FadeIn>
                </div>
                <WaveDivider position="bottom" fill="#F5EFE6" />
            </section>


            {/* 8. PRUEBA SOCIAL */}
            <section className="py-32 bg-[#F5EFE6] relative overflow-hidden">
                <BackgroundCircles />
                <div className="container mx-auto px-4">
                    <FadeIn className="text-center mb-20">
                        <h2 className="text-4xl lg:text-5xl font-heading text-[#8C4005] font-bold">Resultados Reales</h2>
                        <p className="text-[#2D2926] mt-4 font-light italic">De quienes ya habitan una nueva soberanía corporal.</p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {[
                            {
                                name: "Ana María G.",
                                role: "Emprendedora",
                                image: "/assets/images/testimonials/ana.png",
                                text: "Pensé que vivir en alerta era mi única opción. Gracias a la Arquitectura de Vida Intencional, hoy tomo decisiones desde la calma y la claridad."
                            },
                            {
                                name: "Carolina P.",
                                role: "Consultora",
                                image: "/assets/images/testimonials/carolina.png",
                                text: "Recuperé mi capacidad de dormir y crear. Al regular mi sistema nervioso, mi productividad se disparó porque dejé de actuar desde el miedo."
                            },
                            {
                                name: "Sofía R.",
                                role: "Líder de Equipos",
                                image: "/assets/images/testimonials/sofia.png",
                                text: "Descubrí que mi cuerpo guardaba tensiones que no me dejaban avanzar. Soltar esas memorias atrapadas fue el inicio de mi verdadera libertad."
                            }
                        ].map((item, i) => (
                            <StaggerItem key={i} className="bg-[#F5EFE6] p-8 md:p-12 rounded-[3.5rem] shadow-xl border border-stone-100 flex flex-col items-center text-center">
                                <div className="flex gap-1 mb-6">
                                    {[1, 2, 3, 4, 5].map(v => <Star key={v} className="w-4 h-4 fill-[#B8835A] text-[#B8835A]" />)}
                                </div>
                                <p className="text-lg text-[#2D2926] mb-8 font-light italic leading-relaxed">"{item.text}"</p>
                                <div className="flex flex-col items-center gap-4 border-t border-stone-100 pt-8 w-full">
                                    <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg border-2 border-[#B8835A]/20">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#20D2926]">{item.name}</p>
                                        <p className="text-xs text-[#2D2926] uppercase tracking-widest font-bold opacity-60">{item.role}</p>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. GARANTÍA */}
            <section className="py-24 bg-[#F5EFE6] relative overflow-hidden">
                <BackgroundCircles />
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <FadeIn className="flex flex-col items-center">
                        <ShieldCheck className="w-20 h-20 text-[#2D2926] mb-8 opacity-60" />
                        <h2 className="text-2xl font-bold text-[#8C4005] mb-6">Un Proyecto con Respaldo</h2>
                        <p className="text-xl text-[#2D2926] font-light leading-relaxed italic">
                            <strong>Impacto:</strong> Salud mental comunitaria, prevención de violencia y fortalecimiento del tejido social.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* 10. FAQ */}
            <section className="py-32 bg-[#F5EFE6] relative overflow-hidden">
                <BackgroundCircles />
                <div className="container mx-auto px-4 max-w-4xl">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl font-heading text-[#8C4005] font-bold">Preguntas Frecuentes</h2>
                    </FadeIn>

                    <div className="space-y-4">
                        {[
                            {
                                q: "¿Cómo obtengo mi Pase QR?",
                                a: "Al completar el formulario de registro al final de esta página, el sistema generará automáticamente tu pase único y lo recibirás en tu correo y WhatsApp."
                            },
                            {
                                q: "¿Este evento tiene propósitos políticos?",
                                a: "No. Venezuela en el Cuerpo es una iniciativa estrictamente terapéutica y de sanación somática. El enfoque es el impacto individual del entorno social en el sistema nervioso."
                            },
                            {
                                q: "¿Tengo que estar en Venezuela para participar?",
                                a: "No necesariamente. Aunque el tour tiene encuentros presenciales en Venezuela, el formato también permite la participación online desde cualquier parte del mundo, permitiéndote vivir la experiencia de regulación somática en comunidad y en vivo."
                            }
                        ].map((item, i) => (
                            <FadeIn key={i}>
                                <div className="border border-[#2D2926]/10 bg-[#F5EFE6] rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                                    <button
                                        onClick={() => toggleFaq(i)}
                                        className="w-full px-8 py-6 flex items-center justify-between text-left group"
                                    >
                                        <span className="text-lg font-bold text-[#2D2926]">{item.q}</span>
                                        <ChevronDown className={`w-5 h-5 text-[#C1530A] transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                                    </button>
                                    <div className={`transition-all duration-300 ease-in-out ${openFaq === i ? "max-h-48 opacity-100 p-8 pt-0" : "max-h-0 opacity-0 overflow-hidden"}`}>
                                        <p className="text-[#2D2926] font-light leading-relaxed">{item.a}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 10.5 SOCIAL COMMITMENT */}
            <section className="pt-52 pb-24 bg-[#B8835A] text-[#F5EFE6] relative overflow-hidden">
                <WaveDivider position="top" fill="#F5EFE6" />
                <div className="absolute inset-0 bg-[url('/assets/images/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
                    <FadeIn>
                        <MessageCircle className="w-16 h-16 mx-auto mb-8 text-[#F5EFE6]/50" />
                        <h2 className="text-3xl md:text-5xl font-heading mb-8 font-bold leading-tight">
                            "La transformación social no comienza afuera. Comienza en la biología de cada persona."
                        </h2>
                        <p className="text-5xl md:text-6xl font-script text-[#F5EFE6]/70 -mt-4 mb-8">— Yelitze Rangel</p>
                        <div className="w-24 h-px bg-[#F5EFE6]/30 mx-auto mb-10" />
                        <p className="text-xl font-light mb-12 max-w-2xl mx-auto">
                            Sella tu compromiso. Ve ahora mismo al perfil de Instagram de Yelitze Rangel, busca la publicación oficial del evento y <strong>comenta tu asistencia</strong>.
                        </p>
                        <a
                            href="https://www.instagram.com/yelitzerangeloficial/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-[#F5EFE6] text-[#8C4005] px-10 py-5 rounded-full font-bold shadow-[0_15px_30px_-5px_rgba(45,41,38,0.2)] hover:scale-105 transition-transform"
                        >
                            Ir al Instagram Oficial
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </FadeIn>
                </div>
            </section>

            {/* 11. FOOTER (FORMULARIO) */}
            <section id="registro" className="pt-60 pb-20 bg-[#2D2926] text-[#F5EFE6] overflow-hidden relative">
                <WaveDivider position="top" fill="#B8835A" />
                {/* Visual Cue for QR & Mystical Elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#B8835A] to-transparent" />
                <FloatingStars count={40} className="opacity-60" />
                <SacredGeometry className="right-[-20%] bottom-[-20%] w-[1000px] h-[1000px] text-[#B8835A]/5" />
                <ThinGoldenLine d="M0,200 Q300,0 600,200 T1200,200" className="bottom-0 left-0 w-full h-96 opacity-10" />

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <FadeIn>
                            <h2 className="text-4xl lg:text-6xl font-heading text-[#8C4005] mb-8 font-bold italic leading-tight">
                                <span className="text-[#B8835A]">Tour Nacional de</span> <br /> Venezuela en el Cuerpo
                            </h2>
                            <p className="text-[#F5EFE6] text-xl font-light mb-12 opacity-80 leading-relaxed">
                                Selecciona tu ciudad para generar tu Pase QR. Una vez registrado, recibirás un mensaje inmediato con la ubicación exacta y la hora del encuentro.
                            </p>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-start gap-4 opacity-80 backdrop-blur-sm bg-[#2D2926]/30 p-6 rounded-3xl border border-[#B8835A]/10">
                                    <div className="min-w-12 h-12 border border-[#B8835A]/30 rounded-full flex items-center justify-center bg-[#B8835A]/10">
                                        <QrCode className="w-5 h-5 text-[#B8835A]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#F5EFE6] mb-1">¿Cómo funciona tu acceso?</p>
                                        <ul className="text-sm space-y-2 text-[#F5EFE6]/70">
                                            <li><strong className="text-[#B8835A]">Paso 1:</strong> Te registras seleccionando tu ciudad.</li>
                                            <li><strong className="text-[#B8835A]">Paso 2:</strong> Recibes un mensaje automático con tu Pase QR único.</li>
                                            <li><strong className="text-[#B8835A]">Paso 3:</strong> En ese mismo mensaje, te enviamos el Lugar y Hora detallados del evento en tu ciudad.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.3} className="bg-[#F5EFE6] p-10 lg:p-14 rounded-[4rem] text-[#2D2926] shadow-2xl relative min-h-[500px] flex flex-col justify-center">
                            {/* Form Header */}
                            <div className="flex items-center gap-6 mb-12">
                                <div className="w-20 h-20 bg-[#F5EFE6] rounded-3xl flex items-center justify-center shadow-lg border border-stone-100">
                                    <QrCode className="w-10 h-10 text-[#C1530A]" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C1530A] mb-1">Paso Final</p>
                                    <h4 className="text-2xl font-bold font-heading text-[#8C4005]">Registro Oficial</h4>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-[#2D2926] uppercase tracking-widest mb-3 block ml-2">Nombre Completo</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full bg-[#F5EFE6] border border-stone-200 rounded-3xl px-8 py-5 focus:ring-2 focus:ring-[#C1530A]/20 focus:border-[#C1530A] transition-all outline-none"
                                        placeholder="(Para tu pase personalizado)"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-[#2D2926] uppercase tracking-widest mb-3 block ml-2">Email Principal</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full bg-[#F5EFE6] border border-stone-200 rounded-3xl px-8 py-5 focus:ring-2 focus:ring-[#C1530A]/20 focus:border-[#C1530A] transition-all outline-none"
                                        placeholder="tu@correo.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-[#2D2926] uppercase tracking-widest mb-3 block ml-2">Selecciona tu Ciudad</label>
                                    <div className="relative">
                                        <select
                                            name="city"
                                            className="w-full bg-[#F5EFE6] border border-stone-200 rounded-3xl px-8 py-5 focus:ring-2 focus:ring-[#C1530A]/20 focus:border-[#C1530A] transition-all outline-none appearance-none cursor-pointer"
                                            required
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Selecciona una opción...</option>
                                            <option value="amazonas">Amazonas</option>
                                            <option value="anzoategui">Anzoátegui</option>
                                            <option value="apure">Apure</option>
                                            <option value="aragua">Aragua</option>
                                            <option value="barinas">Barinas</option>
                                            <option value="bolivar">Bolívar</option>
                                            <option value="carabobo">Carabobo</option>
                                            <option value="cojedes">Cojedes</option>
                                            <option value="delta-amacuro">Delta Amacuro</option>
                                            <option value="distrito-capital">Distrito Capital</option>
                                            <option value="falcon">Falcón</option>
                                            <option value="guarico">Guárico</option>
                                            <option value="lara">Lara</option>
                                            <option value="merida">Mérida</option>
                                            <option value="miranda">Miranda</option>
                                            <option value="monagas">Monagas</option>
                                            <option value="nueva-esparta">Nueva Esparta</option>
                                            <option value="portuguesa">Portuguesa</option>
                                            <option value="sucre">Sucre</option>
                                            <option value="tachira">Táchira</option>
                                            <option value="trujillo">Trujillo</option>
                                            <option value="la-guaira">La Guaira</option>
                                            <option value="yaracuy">Yaracuy</option>
                                            <option value="zulia">Zulia</option>
                                        </select>
                                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C1530A] pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-[#2D2926] uppercase tracking-widest mb-3 block ml-2">WhatsApp</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="w-full bg-[#F5EFE6] border border-stone-200 rounded-3xl px-8 py-5 focus:ring-2 focus:ring-[#C1530A]/20 focus:border-[#C1530A] transition-all outline-none"
                                        placeholder="(Donde recibirás coordenadas y QR)"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#C1530A] text-[#F5EFE6] py-6 rounded-3xl font-bold md:text-lg shadow-[0_15px_30px_-5px_rgba(193,83,10,0.4)] hover:bg-[#A84A2F] hover:shadow-[0_20px_40px_-5px_rgba(193,83,10,0.5)] transition-all transform hover:-translate-y-1 mt-6 flex items-center justify-center gap-4 group"
                                >
                                    <span className="text-center">GENERAR MI PASE QR Y<br className="sm:hidden" /> RECIBIR COORDENADAS</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>

                            <p className="text-center mt-6 text-xs text-[#2D2926] font-light opacity-80">
                                Toda la información sobre el lugar y la hora se enviará a tu WhatsApp junto con tu Pase QR al finalizar el registro.
                            </p>
                            <p className="text-center mt-2 text-[10px] text-[#2D2926] uppercase tracking-widest font-bold opacity-40">
                                Al registrarte aceptas nuestra política de privacidad
                            </p>
                        </FadeIn>
                    </div>
                </div>

                {/* Final Credits */}
                <div className="container mx-auto px-4 mt-32 border-t border-[#F5EFE6]/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
                    &copy; 2026 Yelitze Rangel. Todos los derechos reservados. | Desarrollado por Kick-Off Development | Diseñado por Digital Marketing DMK
                    <div className="flex gap-8">
                        <Heart className="w-4 h-4" />
                        <Sparkles className="w-4 h-4" />
                        <ShieldCheck className="w-4 h-4" />
                    </div>
                </div>
            </section>

        </main>
    );
}
