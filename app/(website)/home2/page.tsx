import Image from 'next/image';
import Link from 'next/link';
import { Playfair_Display, Montserrat, Whisper } from 'next/font/google';
import { ArrowRight, Sparkles } from 'lucide-react';

// Fonts configuration
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-sans' });
const whisper = Whisper({ weight: ['400'], subsets: ['latin'], variable: '--font-script' });

export default function Home2() {
    return (
        <main className={`${playfair.variable} ${montserrat.variable} ${whisper.variable} font-sans bg-[#FEFAF6] min-h-screen text-[#4A4A4A]`}>

            {/* --- HERO SECTION --- */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Soft Focus Background */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/images/hero-background-new.jpg"
                        alt="Background"
                        fill
                        className="object-cover opacity-90 blur-[2px]"
                        priority
                    />
                    <div className="absolute inset-0 bg-[#FEFAF6]/30 mix-blend-overlay" /> {/* Lighten overlay */}
                </div>

                <div className="relative z-10 text-center container mx-auto px-4 max-w-4xl">
                    <span className="font-script text-4xl md:text-6xl text-[#B7835A] block mb-4 animate-fade-in-up">
                        Bienvenida a tu esencia
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#2C2C2C] mb-8 leading-tight animate-fade-in-up delay-100">
                        Anatomía del Alma
                    </h1>
                    <p className="font-sans text-lg md:text-xl text-[#6B6B6B] mb-10 tracking-wide max-w-2xl mx-auto animate-fade-in-up delay-200">
                        Un espacio sagrado para sanar tu linaje, liberar cargas invisibles y despertar la fuerza que habita en ti.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-300">
                        <Link
                            href="/servicios"
                            className="px-10 py-4 bg-[#B7835A] text-white rounded-full font-serif tracking-widest text-sm hover:bg-[#966844] transition-all transform hover:scale-105 shadow-lg"
                        >
                            EMPEZAR EL VIAJE
                        </Link>
                        <Link
                            href="/tests"
                            className="px-8 py-4 border border-[#B7835A] text-[#B7835A] rounded-full font-serif tracking-widest text-sm hover:bg-[#B7835A] hover:text-white transition-all"
                        >
                            HACER TEST GRATUITO
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- ABOUT SECTION (Polaroid Style) --- */}
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">

                        {/* Polaroid Image */}
                        <div className="relative flex justify-center md:justify-end">
                            <div className="relative bg-white p-4 shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 w-[300px] md:w-[380px]">
                                <div className="aspect-[3/4] relative overflow-hidden bg-gray-100 filter grayscale-[20%] hover:grayscale-0 transition-all duration-700">
                                    <Image
                                        src="/assets/images/hero-portrait.png" // Using portrait as placeholder
                                        alt="Yelitze Rangel"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="pt-6 pb-2 text-center font-script text-2xl text-[#888]">
                                    Hola, soy Yelitzé
                                </div>
                            </div>
                            {/* Decorative Element */}
                            <div className="absolute -top-10 -left-10 w-32 h-32 border border-[#B7835A]/20 rounded-full z-[-1]" />
                        </div>

                        {/* Text Content */}
                        <div className="text-center md:text-left max-w-lg mx-auto md:mx-0">
                            <span className="uppercase tracking-[0.2em] text-[#B7835A] text-xs font-bold mb-4 block">
                                Sobre Mí
                            </span>
                            <h2 className="font-serif text-4xl md:text-5xl text-[#2C2C2C] mb-8 leading-tight">
                                Guiando tu camino de <span className="italic text-[#B7835A]">regreso a casa</span>
                            </h2>
                            <div className="space-y-6 text-[#6B6B6B] font-light leading-relaxed text-lg">
                                <p>
                                    Creo profundamente que nuestras historias familiares no son sentencias, sino mapas. Mapas que nos muestran dónde hubo dolor, pero también dónde reside nuestra mayor fuerza.
                                </p>
                                <p>
                                    A través de mi metodología única, fusiono la psicología moderna con sabidurías ancestrales para ayudarte a mirar lo invisible y transformar tu realidad.
                                </p>
                            </div>
                            <div className="mt-10">
                                <Link href="/sobre-mi" className="group inline-flex items-center gap-2 text-[#B7835A] font-serif hover:text-[#966844] transition-colors border-b border-[#B7835A]">
                                    Leer mi historia
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- DARK MANIFESTO SECTION --- */}
            <section className="py-24 bg-[#1D1D1D] text-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Collage/Visuals Layout */}
                        <div className="relative h-[500px] w-full hidden md:block">
                            {/* Main Large Image */}
                            <div className="absolute top-0 right-0 w-3/4 h-3/4 z-10">
                                <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-700">
                                    <Image src="/assets/images/casual-portrait.jpg" alt="Manifesto Portrait" fill className="object-cover" />
                                </div>
                            </div>
                            {/* Secondary Image Bottom Left */}
                            <div className="absolute bottom-0 left-0 w-2/3 h-2/3 z-20 border-4 border-[#1D1D1D]">
                                <div className="relative w-full h-full">
                                    <Image src="/assets/images/about-ritual.jpg" alt="Ritual" fill className="object-cover" />
                                    {/* Overlay Color */}
                                    <div className="absolute inset-0 bg-[#C5895A]/20 mix-blend-overlay"></div>
                                </div>
                            </div>
                            {/* Decoration */}
                            <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-[#C5895A]/50 rounded-full z-30"></div>
                        </div>

                        {/* Text Content */}
                        <div className="max-w-lg">
                            <h2 className="font-sans font-bold text-2xl uppercase tracking-widest mb-8 text-white">
                                Descubre quién eres sin limitaciones.
                            </h2>
                            <div className="space-y-6 text-gray-300 font-light leading-relaxed text-lg">
                                <p>
                                    Viniste a este mundo a explorar tu potencial infinito. A descubrir cómo romper los límites mentales que has creado para ti misma.
                                </p>
                                <p>
                                    Viniste a alcanzar tu máximo potencial. A vivir en abundancia, paz, expansión, felicidad, amor y fluidez.
                                </p>
                                <p className="text-[#C5895A] font-medium italic">
                                    Este espacio está aquí para recordarte tu potencial y apoyarte a que encuentres el éxito y la fluidez en todo lo que hagas. Pero sobre todo a que ames tu vida y te permitas vivir todo lo que tu corazón anhela.
                                </p>
                            </div>
                            <div className="mt-10">
                                <Link href="/servicios" className="inline-block border border-[#C5895A] text-[#C5895A] px-8 py-3 rounded-full hover:bg-[#C5895A] hover:text-white transition-all uppercase text-xs tracking-widest">
                                    Conoce Más
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SERVICES TRIO (Clean Grid) --- */}
            <section className="py-24 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-20 max-w-2xl mx-auto">
                        <h2 className="font-serif text-3xl md:text-4xl text-[#2C2C2C] mb-4">
                            ¿Cómo puedo servirte?
                        </h2>
                        <div className="w-16 h-[1px] bg-[#B7835A] mx-auto opacity-50"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Card 1 */}
                        <div className="group text-center p-8 hover:bg-[#FEFAF6] transition-colors rounded-3xl duration-500">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#FEFAF6] group-hover:bg-white flex items-center justify-center text-[#B7835A] transition-colors shadow-sm">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h3 className="font-serif text-2xl mb-4 text-[#2C2C2C]">Coaching Ancestral</h3>
                            <p className="text-[#6B6B6B] font-light mb-8 leading-relaxed">
                                Sesiones 1:1 para profundizar en tu árbol genealógico y liberar bloqueos específicos.
                            </p>
                            <Link href="/servicios/coaching-ancestral" className="uppercase text-xs tracking-widest text-[#B7835A] hover:text-[#2C2C2C] transition-colors font-bold">
                                Más Detalles
                            </Link>
                        </div>

                        {/* Card 2 */}
                        <div className="group text-center p-8 hover:bg-[#FEFAF6] transition-colors rounded-3xl duration-500 border border-[#B7835A]/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-[#B7835A] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-lg">
                                Popular
                            </div>
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#FEFAF6] group-hover:bg-white flex items-center justify-center text-[#B7835A] transition-colors shadow-sm">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                            </div>
                            <h3 className="font-serif text-2xl mb-4 text-[#2C2C2C]">Tests Gratuitos</h3>
                            <p className="text-[#6B6B6B] font-light mb-8 leading-relaxed">
                                Herramientas de autoconocimiento para identificar qué heridas emocionales están activas.
                            </p>
                            <Link href="/tests" className="uppercase text-xs tracking-widest text-[#B7835A] hover:text-[#2C2C2C] transition-colors font-bold">
                                Realizar Test
                            </Link>
                        </div>

                        {/* Card 3 */}
                        <div className="group text-center p-8 hover:bg-[#FEFAF6] transition-colors rounded-3xl duration-500">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#FEFAF6] group-hover:bg-white flex items-center justify-center text-[#B7835A] transition-colors shadow-sm">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                            </div>
                            <h3 className="font-serif text-2xl mb-4 text-[#2C2C2C]">Libros y Recursos</h3>
                            <p className="text-[#6B6B6B] font-light mb-8 leading-relaxed">
                                Guías prácticas y lectura transformadora para acompañar tus procesos de sanación.
                            </p>
                            <Link href="/libros" className="uppercase text-xs tracking-widest text-[#B7835A] hover:text-[#2C2C2C] transition-colors font-bold">
                                Ir a la Tienda
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- BANNER (Quote Style) --- */}
            <section className="py-24 bg-[#B7835A] text-white text-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/assets/images/hero-background-new.jpg')] bg-cover opacity-10 mix-blend-overlay"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="font-script text-5xl opacity-50">"</span>
                    <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-8">
                        Sanar no es borrar el pasado,<br /> es amarlo para dejar de repetirlo.
                    </h2>
                    <span className="uppercase tracking-widest text-sm opacity-80">— Yelitzé Rangel</span>
                </div>
            </section>

        </main>
    );
}
