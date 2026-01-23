'use client';

import Image from "next/image";
import { FadeIn, ScaleIn } from "@/components/ui/motion";

export default function HomeGallery() {
    // Using available assets to simulate a gallery
    const galleryImages = [
        { src: "/assets/images/gallery/gallery-1.jpg", alt: "Círculo de Mujeres", className: "h-64 md:h-80" },
        { src: "/assets/images/gallery/gallery-2.jpg", alt: "Taller Vivencial", className: "h-64 md:h-80" },
        { src: "/assets/images/gallery/gallery-3.jpg", alt: "Constelaciones Familiares", className: "h-64 md:h-80" },
        { src: "/assets/images/gallery/gallery-4.jpg", alt: "Conexión con la Naturaleza", className: "h-64 md:h-80" },
        { src: "/assets/images/gallery/gallery-5.jpg", alt: "Herramientas de Sanación", className: "h-64 md:h-80" }
    ];

    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-4">
                <FadeIn className="text-center mb-16">
                    <span className="uppercase tracking-widest text-sm font-semibold text-[var(--color-secondary)] mb-2 block">
                        Galería
                    </span>
                    <h2 className="text-3xl md:text-4xl font-heading text-[var(--color-primary)] mb-6">
                        Momentos de Conexión
                    </h2>
                    <p className="max-w-2xl mx-auto text-[var(--color-text-light)] text-lg">
                        Instantes de magia, sanación y encuentro en nuestra comunidad.
                    </p>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((img, idx) => (
                        <ScaleIn
                            key={idx}
                            delay={idx * 0.1}
                            className={`relative rounded-2xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${img.className}`}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <p className="text-white font-medium text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {img.alt}
                                </p>
                            </div>
                        </ScaleIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
