import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import ParticleBackground from '@/components/ui/ParticleBackground';
import InstagramFeed from '@/components/ui/InstagramFeed';
import PromotionalBanner from '@/components/home/PromotionalBanner';
import HeroSlider from '@/components/home/HeroSlider';
import BooksBanner from '@/components/home/BooksBanner';
import HomeEvents from '@/components/home/HomeEvents';
import HomeGallery from '@/components/home/HomeGallery';
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem, HoverCard } from "@/components/ui/motion";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSlider />

      {/* Promotional Banner */}
      <PromotionalBanner />

      {/* Books Banner */}
      <BooksBanner />

      {/* Intro Section */}
      <section className="py-24 bg-[var(--color-background)]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image */}
            {/* Image - Polaroid Style */}
            <ScaleIn className="relative rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="bg-white p-4 pb-20 shadow-2xl rounded-sm max-w-md mx-auto transform hover:scale-[1.02] transition-all duration-300">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                  <Image
                    src="/assets/images/casual-portrait.jpg"
                    alt="Sesión con Yelitzé"
                    fill
                    className="object-cover object-top hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute bottom-6 left-0 right-0 text-center">
                  <span className="font-handwriting text-2xl text-gray-600 opacity-80 transform -rotate-2 inline-block">
                    Yelitzé Rangel
                  </span>
                </div>
              </div>
            </ScaleIn>

            {/* Content */}
            <div>
              <FadeIn>
                <span className="uppercase tracking-widest text-sm font-semibold text-[var(--color-secondary)] mb-2 block">
                  Sobre Mí
                </span>
                <h2 className="text-4xl font-heading text-[var(--color-primary)] mb-8 leading-tight">
                  Bienvenidas Familias de Almas
                </h2>
                <div className="space-y-6 text-lg text-[var(--color-text-light)] leading-relaxed">
                  <p>
                    Soy <strong>Yelitzé Rangel</strong>. Acompaño a personas valientes a mirar con amor su historia familiar,
                    para liberar cargas que no les pertenecen y tomar la fuerza de sus ancestros.
                  </p>
                  <p>
                    Durante años he integrado la Psicología, la Tanatología y las Constelaciones Familiares para crear un método
                    que no solo se queda en la mente, sino que baja al corazón y al cuerpo.
                  </p>
                  <div className="pt-4">
                    <Link
                      href="/sobre-mi"
                      className="text-[var(--color-primary)] font-semibold border-b-2 border-[var(--color-secondary)] pb-1 hover:text-[var(--color-primary-light)] transition-colors"
                    >
                      Conoce mi historia completa ➝
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl font-heading text-[var(--color-primary)] mb-4">¿Cómo puedo acompañarte?</h2>
            <p className="text-[var(--color-text-light)]">Diferentes caminos para tu proceso de sanación</p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Sesiones Íntimas",
                desc: "Un viaje profundo de 'Anatomía del Alma' donde lo invisible cobra voz.",
                link: "/servicios/coaching-ancestral",
                cta: "Solicitar Acompañamiento"
              },
              {
                title: "Capacitaciones Grupales",
                desc: "Talleres intensivos para sanar en tribu y potenciar el trabajo individual.",
                link: "/eventos",
                cta: "Unirme al Círculo"
              },
              {
                title: "Libros y Recursos",
                desc: "Herramientas escritas para acompañar tu viaje de autodescubrimiento.",
                link: "/libros",
                cta: "Recibir Recursos"
              }
            ].map((item, idx) => (
              <StaggerItem key={idx}>
                <Link href={item.link} className="block h-full">
                  <HoverCard className="group p-8 rounded-2xl bg-[var(--color-background)] border border-transparent hover:border-[var(--color-primary)]/10 shadow-sm transition-all h-full flex flex-col">
                    <h3 className="text-xl font-heading text-[var(--color-primary)] mb-4 group-hover:translate-x-1 transition-transform">{item.title}</h3>
                    <p className="text-[var(--color-text-light)] mb-8 flex-grow leading-relaxed">{item.desc}</p>
                    <span className="btn-premium text-sm py-3 w-full justify-center">
                      {item.cta} <ArrowRight className="w-4 h-4" />
                    </span>
                  </HoverCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Events Section */}
      <HomeEvents />

      {/* Gallery Section */}
      <HomeGallery />

      {/* Testimonials Section */}
      <section className="py-24 bg-[var(--color-primary)]/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-secondary)]/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-heading text-center text-[var(--color-primary)] mb-16">
              Historias de Transformación
            </h2>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
            {[
              {
                text: "Hacer el test fue el inicio de todo. Entendí por qué repetía patrones en mis relaciones. Las sesiones con Yelitzé cambiaron mi vida.",
                author: "Ana M.",
                location: "Argentina",
                image: "/assets/images/testimonials/ana.png"
              },
              {
                text: "Su enfoque es tan amoroso y respetuoso. Me sentí sostenida en todo momento mientras sanaba mi relación con mamá.",
                author: "Carolina R.",
                location: "México",
                image: "/assets/images/testimonials/carolina.png"
              },
              {
                text: "El libro es una joya. Cada página me hablaba directamente a mí. Gracias por tanta luz y por guiarme a mi propio centro.",
                author: "Sofia L.",
                location: "España",
                image: "/assets/images/testimonials/sofia.png"
              }
            ].map((t, i) => (
              <StaggerItem key={i}>
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-[var(--color-secondary)]/20 h-full flex flex-col items-center text-center group">
                  <div className="relative w-24 h-24 mb-6 rounded-full overflow-hidden border-4 border-[var(--color-background)] shadow-inner group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={t.image}
                      alt={t.author}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="mb-6">
                    <Sparkles className="w-6 h-6 text-[var(--color-secondary)] mx-auto opacity-50 mb-4" />
                    <p className="text-[var(--color-text-light)] italic leading-relaxed text-lg">
                      "{t.text}"
                    </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-[var(--color-primary)]/10 w-full">
                    <h4 className="font-heading text-xl text-[var(--color-primary)]">{t.author}</h4>
                    <span className="text-sm uppercase tracking-widest text-[var(--color-secondary)] bg-[var(--color-secondary)]/5 px-3 py-1 rounded-full mt-2 inline-block">
                      {t.location}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src="/assets/images/faq-bg.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for readability if needed, though the image seems to have a gradient */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="container max-w-3xl mx-auto px-4 relative z-10">
          <FadeIn>
            <h2 className="text-3xl font-heading text-center text-white mb-12 drop-shadow-md">
              Preguntas Frecuentes
            </h2>
          </FadeIn>
          <StaggerContainer className="space-y-6">
            <StaggerItem>
              <details className="group bg-white/90 backdrop-blur-sm rounded-lg p-6 [&_summary::-webkit-details-marker]:hidden border border-white/20">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-[var(--color-secondary)] font-medium">
                  <h3 className="text-lg">¿Son presenciales o virtuales?</h3>
                  <span className="shrink-0 rounded-full bg-[var(--color-background)] p-1.5 text-[var(--color-secondary)] sm:p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0 transition duration-300 group-open:-rotate-180" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-[var(--color-primary)]">
                  Todas las sesiones son 100% online vía Zoom, lo que nos permite conectar estés donde estés.
                </p>
              </details>
            </StaggerItem>

            <StaggerItem>
              <details className="group bg-white/90 backdrop-blur-sm rounded-lg p-6 [&_summary::-webkit-details-marker]:hidden border border-white/20">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-[var(--color-secondary)] font-medium">
                  <h3 className="text-lg">¿Cómo sé si esto es para mí?</h3>
                  <span className="shrink-0 rounded-full bg-[var(--color-background)] p-1.5 text-[var(--color-secondary)] sm:p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0 transition duration-300 group-open:-rotate-180" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-[var(--color-primary)]">
                  Si sientes que repites patrones, que hay bloqueos que no logras explicar o sientes una carga emocional que no parece tuya, la sanación ancestral puede ayudarte. Te recomiendo empezar con el Test Gratuito.
                </p>
              </details>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Instagram Grid */}
      <InstagramFeed />
    </main>
  );
}
