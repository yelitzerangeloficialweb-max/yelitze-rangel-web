'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, ScaleIn } from "@/components/ui/motion";
import { GALLERY_IMAGES } from "@/lib/gallery-data";

export default function HomeGallery() {
    // Select first 5 images for the home grid with varying sizes
    const displayImages = [
        { ...GALLERY_IMAGES[0], className: "h-64 md:h-80" },
        { ...GALLERY_IMAGES[1], className: "h-64 md:h-80" },
        { ...GALLERY_IMAGES[2], className: "h-[450px] md:h-[600px] md:col-span-2" },
        { ...GALLERY_IMAGES[4], className: "h-64 md:h-80" },
        { ...GALLERY_IMAGES[5], className: "h-64 md:h-80" }
    ];

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayImages.map((img, idx) => (
                    <ScaleIn
                        key={idx}
                        delay={idx * 0.1}
                        className={`relative rounded-[3rem] overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 ${img.className}`}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-[var(--color-primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                            <span className="text-[var(--color-secondary)] font-bold tracking-[0.4em] uppercase text-[10px] mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                Vivencia
                            </span>
                            <p className="text-white font-heading text-xl italic translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                                {img.alt}
                            </p>
                        </div>
                    </ScaleIn>
                ))}
            </div>

            <div className="text-center mt-20">
                <Link
                    href="/galeria"
                    className="inline-flex items-center gap-4 text-stone-300 font-bold tracking-widest uppercase border-b border-stone-100 pb-4 hover:border-[var(--color-secondary)] transition-all group"
                >
                    Explorar Inmersión Completa
                    <ArrowRight className="w-5 h-5 text-[var(--color-secondary)] group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
