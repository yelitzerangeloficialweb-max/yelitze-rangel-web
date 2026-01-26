"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Sparkles, Star, ArrowDown,
  BookOpen, Compass, Heart, Zap, Waves,
  CheckCircle2, ShieldCheck, ExternalLink
} from "lucide-react";
import TypewriterText from "@/components/ui/TypewriterText";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/motion";
import InstagramFeed from "@/components/ui/InstagramFeed";
import NewsletterSection from "@/components/home/NewsletterSection";
import HomeEvents from "@/components/home/HomeEvents";
import HomeGallery from "@/components/home/HomeGallery";
import HeroSlider from "@/components/home/HeroSlider";
import TestSpotlight from "@/components/home/TestSpotlight";
import BlogSpotlight from "@/components/home/BlogSpotlight";

export default function HomePage() {
  return (
    <main className="bg-[#fafcfe] min-h-screen selection:bg-[var(--color-secondary)] selection:text-white">

      {/* 1. HERO SECTION: RESTORED SLIDER */}
      <HeroSlider />

      {/* 2. MANIFIESTO SECTION: OBSIDIAN ELEGANCE */}
      <section id="manifiesto" className="py-24 bg-stone-950 relative overflow-hidden border-b border-stone-800">
        <div className="absolute inset-0 bg-[url('/assets/images/noise.png')] opacity-[0.03] pointer-events-none" />
        <div className="absolute -right-40 -top-40 w-[800px] h-[800px] opacity-[0.05] pointer-events-none brightness-0 invert">
          <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain" />
        </div>

        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative order-2 lg:order-1">
              <FadeIn>
                <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-[100px_0_100px_0] overflow-hidden shadow-2xl border border-stone-800">
                  <Image
                    src="/assets/images/yelitze/manifesto-new.jpg"
                    alt="Yelitzé Rangel"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </FadeIn>
            </div>

            {/* Text Side */}
            <div className="text-center lg:text-left order-1 lg:order-2">
              <FadeIn>
                <span className="text-[var(--color-secondary)] font-bold tracking-[0.4em] uppercase text-xs mb-8 block">Sobre Mí</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-stone-100 mb-10 italic leading-snug">
                  Bienvenida Familia de Almas
                </h2>
                <div className="w-24 h-px bg-[var(--color-secondary)]/30 mx-auto lg:mx-0 mb-10" />
                <p className="text-lg md:text-xl text-stone-400 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                  Soy <strong>Yelitzé Rangel</strong>. Acompaño a personas valientes a mirar con amor su historia familiar, para liberar cargas que no les pertenecen y tomar la fuerza de sus ancestros.
                </p>
                <p className="text-lg md:text-xl text-stone-400 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                  Durante años he integrado la Psicología, la Tanatología y las Constelaciones Familiares para crear un método que no solo se queda en la mente, sino que baja al corazón y al cuerpo.
                </p>
                <div>
                  <Link href="/sobre-mi" className="inline-block px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white text-xs font-bold tracking-[0.3em] uppercase hover:bg-white/10 transition-all">
                    Conoce mi historia completa ➝
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ALQUIMIA PERSONAL (Services Narrative) */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <FadeIn className="text-center mb-32">
            <span className="text-[var(--color-secondary)] font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Ecosistemas de Evolución</span>
            <h2 className="text-4xl md:text-6xl font-heading text-[var(--color-primary)]">¿Cómo quieres <br /> <span className="italic">comenzar?</span></h2>
          </FadeIn>

          <div className="space-y-40 lg:space-y-64">
            {/* Block 1: Sesiones Íntimas */}
            <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
              <div className="lg:col-span-7 relative">
                <ScaleIn>
                  <div className="relative aspect-[4/3] rounded-[4rem] overflow-hidden shadow-2xl group">
                    <Image
                      src="/assets/images/services/coaching-luxe.png"
                      alt="Coaching Ancestral"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-stone-900/10" />
                  </div>
                  <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[3rem] shadow-xl border border-stone-50 max-w-xs hidden md:block">
                    <Heart className="w-10 h-10 text-[var(--color-secondary)] mb-4" />
                    <p className="text-sm font-light text-stone-500 italic">"Un espacio donde lo invisible cobra voz y tu alma puede expresarse con verdad."</p>
                  </div>
                </ScaleIn>
              </div>
              <div className="lg:col-span-5 space-y-8">
                <FadeIn>
                  <span className="text-[var(--color-secondary)] font-bold tracking-[0.3em] uppercase text-[10px]">Portal 01</span>
                  <h3 className="text-4xl md:text-5xl font-heading text-[var(--color-primary)] leading-tight">Coaching <br /> Ancestral</h3>
                  <p className="text-lg text-stone-500 font-light leading-relaxed">
                    Un viaje profundo de 'Anatomía del Alma'. Utilizamos psicología sistémica y rituales para restaurar el orden en tus vínculos y propósitos.
                  </p>
                  <Link href="/servicios/coaching-ancestral" className="btn-premium px-10 py-4 group w-fit">
                    Entrar al Portal
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </FadeIn>
              </div>
            </div>

            {/* Block 2: Sesiones Corporales */}
            <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
              <div className="lg:col-span-5 space-y-8 order-2 lg:order-1 lg:text-right">
                <FadeIn>
                  <span className="text-[var(--color-secondary)] font-bold tracking-[0.3em] uppercase text-[10px]">Portal 02</span>
                  <h3 className="text-4xl md:text-5xl font-heading text-[var(--color-primary)] leading-tight">Cuerpo <br /> & Santuario</h3>
                  <p className="text-lg text-stone-500 font-light leading-relaxed">
                    Libera las memorias atrapadas en la piel. Desde masajes ancestrales hasta shirodhara, el cuerpo es el templo donde ocurre la verdadera liberación.
                  </p>
                  <div className="flex lg:justify-end">
                    <Link href="/servicios/sesiones-corporales" className="btn-premium px-10 py-4 group w-fit">
                      Honrar mi Templo
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </FadeIn>
              </div>
              <div className="lg:col-span-7 relative order-1 lg:order-2">
                <ScaleIn>
                  <div className="relative aspect-[4/3] rounded-[4rem] overflow-hidden shadow-2xl group">
                    <Image
                      src="/assets/images/services/ritual-luxe.png"
                      alt="Santuario Corporal"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-stone-900/10" />
                  </div>
                  <div className="absolute -top-10 -left-10 bg-white p-8 rounded-[3rem] shadow-xl border border-stone-50 max-w-xs hidden md:block">
                    <Waves className="w-10 h-10 text-[var(--color-secondary)] mb-4" />
                    <p className="text-sm font-light text-stone-500 italic">"El lenguaje más antiguo que hace vibrar la piel y acaricia el alma."</p>
                  </div>
                </ScaleIn>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto max-w-7xl mt-24 flex justify-center">
          <Link href="/servicios" className="inline-flex items-center justify-center gap-2 px-12 py-5 rounded-full border border-stone-200 bg-white text-stone-500 font-bold text-xs tracking-[0.2em] uppercase hover:bg-stone-50 hover:scale-105 transition-all shadow-lg">
            Ver todos los Servicios
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. NEW: TEST SPOTLIGHT (Arquitectura de Vida) */}
      <TestSpotlight />

      {/* 5. COFRE DE SABIDURÍA (Books) */}
      <section className="py-32 bg-[#fdfaf7] relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn className="space-y-10">
              <span className="text-[var(--color-secondary)] font-bold tracking-[0.4em] uppercase text-xs">Biblioterapia</span>
              <h2 className="text-[var(--color-primary)] text-4xl md:text-6xl font-heading leading-tight italic">
                Cofre de <br /> <span className="opacity-40">Sabiduría</span>
              </h2>
              <p className="text-stone-500 text-xl font-light italic leading-relaxed max-w-lg">
                Libros diseñados para ser espejos de tu alma. El conocimiento que buscas ya habita en ti; estos libros solo te ayudan a recordarlo.
              </p>
              <Link
                href="/libros"
                className="btn-premium px-12 py-5 shadow-xl group"
              >
                Explorar los Libros
                <BookOpen className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              </Link>
            </FadeIn>

            <div className="relative group">
              <FadeIn delay={0.3}>
                <div className="relative aspect-[3/4] max-w-[450px] mx-auto shadow-2xl rounded-[3rem] overflow-hidden border border-white/20">
                  <Image
                    src="/assets/images/yelitze/cofre-sabiduria-premium.png"
                    alt="Yelitze Rangel Leyendo"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[3000ms]"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEW: BLOG SPOTLIGHT (Crónicas del Alma) */}
      <BlogSpotlight />

      {/* 7. AGENDA DEL ALMA (Events Grid) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 text-center mb-20">
          <FadeIn>
            <span className="text-[var(--color-secondary)] font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Encuentros Sagrados</span>
            <h2 className="text-4xl md:text-6xl font-heading text-[var(--color-primary)] italic">Agenda <span className="opacity-40">del Alma</span></h2>
          </FadeIn>
        </div>
        <HomeEvents />
      </section>

      {/* 8. HISTORIAS DE TRANSFORMACIÓN (Testimonials) */}
      <section className="py-32 bg-[#fafcfe] relative">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-heading text-[var(--color-primary)] leading-tight italic">
              Historias de <br /> <span className="text-stone-300">Transformación</span>
            </h2>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-10">
            {[
              {
                text: "Hacer el test fue el inicio de todo. Entendí por qué repetía patrones en mis relaciones. Las sesiones con Yelitzé cambiaron mi vida.",
                author: "Ana M.",
                location: "Argentina",
                image: "/assets/images/testimonials/ana-premium.png"
              },
              {
                text: "Su enfoque es tan amoroso y respetuoso. Me sentí sostenida en todo momento mientras sanaba mi relación con mamá.",
                author: "Carolina R.",
                location: "México",
                image: "/assets/images/testimonials/carolina-premium.png"
              },
              {
                text: "El libro es una joya. Cada página me hablaba directamente a mí. Gracias por tanta luz y por guiarme a mi propio centro.",
                author: "Sofia L.",
                location: "España",
                image: "/assets/images/testimonials/sofia-premium.png"
              }
            ].map((t, i) => (
              <StaggerItem key={i}>
                <div className="bg-white p-10 rounded-[3rem] border border-stone-50 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-700 h-full flex flex-col text-center">
                  <div className="relative w-24 h-24 mb-10 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <Image src={t.image} alt={t.author} fill className="object-cover" />
                  </div>
                  <div className="space-y-8 flex-grow">
                    <Sparkles className="w-8 h-8 text-[var(--color-secondary)] mx-auto opacity-30" />
                    <p className="text-xl font-serif italic text-stone-500 leading-relaxed">
                      "{t.text}"
                    </p>
                  </div>
                  <div className="mt-10 pt-8 border-t border-stone-50">
                    <h4 className="text-xl font-heading text-[var(--color-primary)]">{t.author}</h4>
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-secondary)] mt-2 block opacity-60">
                      {t.location}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 9. NEW: GALLERY (Momentos de Conexión) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 text-center mb-20">
          <FadeIn>
            <span className="text-[var(--color-secondary)] font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Viviendo la Alquimia</span>
            <h2 className="text-4xl md:text-6xl font-heading text-[var(--color-primary)] italic">Galería de <span className="opacity-40">Momentos</span></h2>
            <Link
              href="/galeria"
              className="inline-flex items-center gap-4 text-[var(--color-secondary)] font-bold tracking-[0.2em] uppercase text-[10px] mt-8 hover:opacity-70 transition-opacity"
            >
              Ver Bitácora Visual <ArrowRight className="w-3 h-3" />
            </Link>
          </FadeIn>
        </div>
        <HomeGallery />
      </section>

      {/* 10. INSTAGRAM & COMMUNITY */}
      <section className="bg-stone-50/50 py-24 border-y border-stone-100">
        <div className="container mx-auto px-4 mb-16 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-heading text-[var(--color-primary)]">Sigue el hilo <br /> <span className="text-stone-300">en redes</span></h2>
            <a
              href="https://instagram.com/yelitzerangel"
              target="_blank"
              className="inline-flex items-center gap-3 text-[var(--color-secondary)] font-bold tracking-widest uppercase text-xs mt-8 hover:opacity-70 transition-opacity"
            >
              @yelitzerangel <ExternalLink className="w-4 h-4" />
            </a>
          </FadeIn>
        </div>
        <InstagramFeed />
      </section>

      {/* FINAL CTA: THE CALL TO ORDER */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
          <Image src="/assets/images/watermark-logo.png" alt="" fill className="object-contain scale-150 rotate-12" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <Star className="w-16 h-16 text-[var(--color-secondary)] mx-auto mb-16 opacity-30" />
            <h2 className="text-5xl md:text-8xl font-heading text-[var(--color-primary)] mb-12 italic">
              ¿Lista para tu <br /> Proceso?
            </h2>
            <p className="text-stone-400 text-xl font-light mb-20 max-w-2xl mx-auto italic">
              "El movimiento solo ocurre cuando dejas de resistir y empiezas a aceptar lo que es."
            </p>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <Link
                href="/reservas"
                className="btn-premium px-16 py-6 text-2xl shadow-2xl"
              >
                Agendar mi Alquimia
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link
                href="/contacto"
                className="px-16 py-6 rounded-full border border-stone-200 text-stone-400 hover:bg-stone-50 transition-all font-medium text-xl italic"
              >
                Consultar Disponibilidad
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <NewsletterSection />
    </main>
  );
}
