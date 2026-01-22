'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideo() {
    const containerRef = useRef(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const textRef = useRef(null);

    useGSAP(() => {
        const video = videoRef.current;
        if (!video) return;

        // Ensure video metadata is loaded for duration
        video.onloadedmetadata = () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top", // When top of container hits top of viewport
                    end: "+=2000",   // Scroll distance of 2000px to play the video width
                    scrub: 1,        // Smooth scrubbing
                    pin: true,       // Pin the container
                    anticipatePin: 1
                }
            });

            // 1. Scrub the video playback
            tl.fromTo(video,
                { currentTime: 0 },
                { currentTime: video.duration || 10, ease: "none" }
            );

            // 2. Animate text out as we scroll deep
            gsap.to(textRef.current, {
                opacity: 0,
                y: -50,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "center top",
                    end: "bottom top",
                    scrub: true
                }
            });
        };
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-background">
            {/* Extended height hidden container for scroll space if needed by pin is handled automatically by ScrollTrigger */}

            <div className="absolute inset-0 z-0">
                {/* Placeholder Video - Replace 'src' with local file e.g. /assets/videos/hero-intro.mp4 */}
                <video
                    ref={videoRef}
                    className="object-cover w-full h-full opacity-60 mix-blend-multiply grayscale-[0.2]"
                    muted
                    playsInline
                    preload="auto"
                    // Using a high-quality stock video URL as placeholder (Nature/Healing vibe)
                    // Users should replace this with their local file
                    src="https://videos.pexels.com/video-files/3209043/3209043-hd_1920_1080_25fps.mp4"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent z-10" />

            <div ref={textRef} className="relative z-20 container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl text-white">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                        <Sparkles className="w-4 h-4 text-secondary" />
                        <span className="text-white text-sm font-light tracking-wider">Sanación Ancestral & Constelaciones</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 font-heading leading-tight drop-shadow-lg">
                        Sana tus Raíces, <br />
                        <span className="text-secondary text-transparent bg-clip-text bg-gradient-to-r from-secondary to-gold-light">
                            Transforma tu Destino
                        </span>
                    </h1>



                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/tests/heridas-infancia"
                            className="px-8 py-4 bg-secondary hover:bg-gold-dark text-white rounded-full font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl"
                        >
                            Realizar Test Gratuito
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/servicios"
                            className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white rounded-full font-semibold transition-all text-center"
                        >
                            Explorar Servicios
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce text-white/50">
                <span className="text-xs uppercase tracking-widest">Desliza para ver la magia</span>
            </div>
        </section>
    );
}
