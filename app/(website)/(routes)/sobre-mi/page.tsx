'use client';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const textParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

    return (
        <div ref={containerRef} className="min-h-screen bg-[var(--color-background)] overflow-hidden selection:bg-[var(--color-secondary)] selection:text-white">

            {/* DECORATIVE BACKGROUND ELEMENTS (Parallax) */}
            <motion.div style={{ y: yBackground }} className="fixed inset-0 pointer-events-none z-0 opacity-40">
                <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] rounded-full bg-[radial-gradient(circle,rgba(161,136,127,0.1)_0%,rgba(255,255,255,0)_70%)] blur-3xl" />
                <div className="absolute bottom-[10%] right-[-5%] w-[40vh] h-[40vh] rounded-full bg-[radial-gradient(circle,rgba(161,136,127,0.08)_0%,rgba(255,255,255,0)_70%)] blur-3xl" />
                <div className="absolute top-[40%] right-[20%] w-[20vh] h-[20vh] rounded-full bg-[radial-gradient(circle,rgba(161,136,127,0.05)_0%,rgba(255,255,255,0)_70%)] blur-2xl" />
            </motion.div>

            {/* 1. HERO DE IMPACTO (Ritual Image with Ethereal Fade) */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/images/story/circle-gathering.jpg"
                        alt="Ritual Sagrado Yelitze"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    {/* Dark Overlay for Contrast */}
                    <div className="absolute inset-0 bg-black/50 z-10" />

                    {/* Gradient Overlay (The "Effect") */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[var(--color-background)] z-10" />
                </div>

                <div className="relative z-20 w-full max-w-5xl mx-auto px-4 text-center mt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <span className="inline-block py-1.5 px-4 border border-white/40 rounded-full text-[11px] uppercase tracking-[0.3em] text-white bg-black/10 backdrop-blur-md shadow-lg">
                            La Historia Detrás del Método
                        </span>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading text-white leading-[0.9] drop-shadow-lg">
                            Donde la <span className="font-script text-[#E6DCCF] ml-2 relative -top-2">Psicología</span><br />
                            abraza al <span className="font-script text-[#E6DCCF] ml-2 relative -top-2">Linaje</span>
                        </h1>

                        <p className="text-xl text-white/90 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md font-sans">
                            "Mi misión es ser el puente. Unir la ciencia que estudia la mente con la sabiduría antigua que sana el alma."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. LÍNEA DE TIEMPO (Vertically Scrollable Journey) */}
            <section className="relative z-10 py-20 px-4 md:px-0" ref={containerRef}>
                <div className="max-w-5xl mx-auto relative">
                    {/* Vertical Line Container */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-[var(--color-secondary)]/30 transform md:-translate-x-1/2 overflow-hidden">
                        {/* Animated Filling Line */}
                        <motion.div
                            style={{ height: useTransform(scrollYProgress, [0.2, 0.9], ["0%", "100%"]) }}
                            className="w-full bg-[var(--color-primary)] absolute top-0 left-0"
                        />
                    </div>

                    {[
                        {
                            id: 1,
                            year: "El Origen",
                            title: "Cuando escuché el llamado",
                            image: "/assets/images/story/el-origen-new.jpg",
                            content: "Antes de leer, respira. Que este camino no sea recorrido solo con los ojos, sino sentido con la honra. Hubo un momento en mi carrera donde los títulos universitarios en Administración y Psicología, aunque valiosos, dejaron de ser suficientes para explicar el susurro constante de mi linaje. Escuché la memoria antigua que vive bajo la piel, esa voz de 'chamana interna' —mujer sabia, sanadora y valiente— que se eleva desde el centro y no quema, sino transforma. Entendí entonces que mi misión no era elegir entre la ciencia y el espíritu, sino ser el puente vivo entre ambos."
                        },
                        {
                            id: 2,
                            year: "Identidad",
                            title: "Tribu Lunar & Danzante del Sol",
                            image: "/assets/images/story/tribu-lunar.jpg",
                            content: "Como danzante del sol y de la tribu lunar, mi identidad no conoce fronteras geográficas. Me reconozco simplemente como 'hilos de conexión', parte de una totalidad mayor. Soy caminante de todos los caminos y ciudadana universal. En este viaje, celebramos a quien fuiste, abrazamos a quien eres y honramos a quien estás naciendo. Mi labor es recordarte que tu alma sin olvido tiene la capacidad de sanar sin culpa, y que recordar tu linaje sin dolor es el acto de amor más profundo hacia tu propio cuerpo."
                        },
                        {
                            id: 3,
                            year: "El Salto",
                            title: "El Miedo es el Inicio",
                            image: "/assets/images/story/transforma-tu-miedo.jpg",
                            content: "Hace 20 años me fui a estudiar a la India, sin dinero y sin el idioma, pero con la certeza de que el éxito me esperaba. Emigrar siempre es difícil, pero el que está vivo, encuentra el camino. Durante cuatro años estudié Medicina Ayurveda con el maestro Satyarthi Pelokhin (terapeuta corporal de Osho). En un momento de soledad, a punto de rendirme y regresar, mi papá me llamó. Él, que a sus casi 70 años subía a pie un cerro para estudiar aduanas, me dijo: 'Hija, todavía creo que cuando atraviesas el miedo comienza la vida'. Y cuánta razón tenía. Si estás a punto de enfrentar un nuevo camino y el miedo te paraliza, contáctame, yo te acompaño."
                        },
                        {
                            id: 4,
                            year: "Legado",
                            title: "La Anatomía del Alma",
                            image: "/assets/images/story/legado-anatomia.jpg",
                            content: "Soy la creadora de diversos oráculos y del 'Lenguaje Emocional de los Síntomas'. Mi trabajo se ha cristalizado en el sistema de 'Coaching Ancestral' y el 'Tablero Terapéutico: La Anatomía del Alma'. Como tejedora de varios oráculos (Corazón Chamánico, Cuerpo Sistémico, 7 Direcciones), acompaño como tanatóloga a personas con síntomas últimos y guío en el manejo del duelo, crecimiento y la expansión del Ser. Cada herramienta que entrego es una llave para despertar a las guardianas que habitan en ti."
                        },
                        {
                            id: 5,
                            year: "Manifiesto",
                            title: "Tu Historia se Habita",
                            image: "/assets/images/story/reescribe-tu-historia.jpg",
                            content: "Además de la terapia, me dedico a rituales de bodas ancestrales, danzas en honor a la mujer y coaching para mujeres alfa. Pero al final, todo se resume en esto: Tu útero recuerda lo que tu mente olvida. Que tu cuerpo reconozca que es altar. Que tu alama reciba el canto de las abuelas que susurran desde la sangre y el silencio. Que honres tu linaje con fuego en el pecho, que sueltes lo que ya cumplió su ciclo y abraces tu verdad como quien abraza la primera luz del día. Que este camino sea medicina."
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`flex flex-col md:flex-row items-center gap-8 mb-24 relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                        >
                            {/* Dot on Timeline */}
                            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[var(--color-secondary)] rounded-full transform -translate-x-1/2 border-2 border-[var(--color-background)] z-20 shadow-lg" />

                            {/* Image Side */}
                            <div className="w-full md:w-1/2 pl-12 md:pl-0 flex justify-center p-4">
                                <div className="relative w-full max-w-md aspect-[4/5] rounded-tl-[50px] rounded-br-[50px] overflow-hidden shadow-2xl group border border-[var(--color-secondary)]/20">
                                    <div className="absolute inset-0 bg-[var(--color-secondary)]/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                </div>
                            </div>

                            {/* Text Side */}
                            <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                                <span className="text-xs font-bold text-[var(--color-secondary)] uppercase tracking-[0.2em] mb-2 block font-sans">
                                    {item.year}
                                </span>
                                <h3 className="text-3xl md:text-4xl font-heading text-[var(--color-primary)] mb-6 leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 font-light leading-relaxed text-lg font-serif">
                                    {item.content}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {/* Final CTA Button embedded in timeline flow */}
                    <div className="text-center mt-32 relative z-20">
                        <Link href="/servicios" className="inline-flex items-center gap-3 px-10 py-5 bg-[var(--color-secondary)] text-white rounded-full font-bold hover:bg-[var(--color-secondary-light)] transition-all duration-300 shadow-xl group hover:-translate-y-1">
                            <span className="uppercase tracking-widest text-sm">Reserva tu Sesión</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                </div>
            </section>
        </div>
    );
}
