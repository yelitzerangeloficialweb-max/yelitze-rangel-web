"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const SacredGeometry = ({ className = "" }: { className?: string }) => (
    <div className={`absolute pointer-events-none opacity-10 ${className}`}>
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#B8835A]" fill="none" stroke="currentColor" strokeWidth="0.5">
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="45" />
            <path d="M 10 100 L 190 100" />
            <path d="M 100 10 L 100 190" />
            <path d="M 36 36 L 164 164" />
            <path d="M 36 164 L 164 36" />
            <circle cx="55" cy="55" r="45" />
            <circle cx="145" cy="55" r="45" />
            <circle cx="55" cy="145" r="45" />
            <circle cx="145" cy="145" r="45" />
        </svg>
    </div>
);

export const FloatingStars = ({ count = 20, className = "" }: { count?: number, className?: string }) => {
    const [stars, setStars] = useState<any[]>([]);

    useEffect(() => {
        const newStars = [...Array(count)].map((_, i) => ({
            id: i,
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            duration: Math.random() * 4 + 2,
            delay: Math.random() * 5,
        }));
        setStars(newStars);
    }, [count]);

    if (stars.length === 0) return null;

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
            {stars.map((star: any) => (
                <motion.div
                    key={star.id}
                    className="absolute bg-[#B8835A] rounded-full"
                    style={{
                        width: star.width,
                        height: star.height,
                        left: star.left,
                        top: star.top,
                        boxShadow: "0 0 8px 2px rgba(184, 131, 90, 0.4)",
                    }}
                    animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [0.8, 1.5, 0.8],
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: star.delay,
                    }}
                />
            ))}
        </div>
    );
};

export const ThinGoldenLine = ({ className = "", d }: { className?: string, d: string }) => (
    <div className={`absolute pointer-events-none ${className}`}>
        <svg viewBox="0 0 1000 200" className="w-full h-full text-[#B8835A] opacity-30" fill="none" stroke="currentColor" strokeWidth="1" preserveAspectRatio="none">
            <path d={d} strokeDasharray="5,5" />
        </svg>
    </div>
);

export const WaveDivider = ({
    className = "",
    fill = "#2D2926",
    position = "bottom"
}: {
    className?: string,
    fill?: string,
    position?: "top" | "bottom"
}) => (
    <div className={`absolute left-0 w-full overflow-hidden leading-none z-0 ${position === 'top' ? 'top-[-1px]' : 'bottom-[-1px] scale-y-[-1]'} ${className}`}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+2px)] left-[-1px] h-[80px] md:h-[160px]">
            <defs>
                <filter id="brushRoughness">
                    <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
                </filter>
            </defs>

            {/* Main Solid Body */}
            <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,103.83-6.17,203.22,46.21,304,60,103,14,204.14-1,303.8-21.6,105.4-23.24,160.21-46.45,227.4-75.19V0Z"
                fill={fill}
            />

            {/* Top Textured Edge Layers (Bristles) */}
            <path
                d="M0,45 C200,65 400,15 600,85 C800,155 1000,55 1200,65 L1200,0 L0,0 Z"
                fill={fill}
                opacity="0.4"
                filter="url(#brushRoughness)"
            />

            <path
                d="M0,52 C250,25 500,95 750,45 C1000,-5 1200,105 1200,35 L1200,0 L0,0 Z"
                fill={fill}
                opacity="0.3"
                filter="url(#brushRoughness)"
            />

            {/* Individual Bristle Lines for the 'Dry Brush' look */}
            <path
                d="M0,48 Q300,78 600,48 T1200,48"
                fill="none"
                stroke={fill}
                strokeWidth="2"
                strokeDasharray="20,15,40,10"
                opacity="0.5"
            />
            <path
                d="M0,55 Q300,25 600,85 T1200,55"
                fill="none"
                stroke={fill}
                strokeWidth="1.5"
                strokeDasharray="50,20,30,40"
                opacity="0.4"
            />

            {/* Scratches/Texture Overlay */}
            <rect width="100%" height="100%" fill="none" filter="url(#brushRoughness)" opacity="0.1" />
        </svg>
    </div>
);
