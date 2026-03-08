"use client";

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

export const FloatingStars = ({ count = 20, className = "" }: { count?: number, className?: string }) => (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        {[...Array(count)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute bg-[#B8835A] rounded-full"
                style={{
                    width: Math.random() * 3 + 1 + "px",
                    height: Math.random() * 3 + 1 + "px",
                    left: Math.random() * 100 + "%",
                    top: Math.random() * 100 + "%",
                    boxShadow: "0 0 8px 2px rgba(184, 131, 90, 0.4)",
                }}
                animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.8, 1.5, 0.8],
                }}
                transition={{
                    duration: Math.random() * 4 + 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 5,
                }}
            />
        ))}
    </div>
);

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
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+2px)] left-[-1px] h-[70px] md:h-[140px]">
            {/* Main Brush Shape */}
            <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,103.83-6.17,203.22,46.21,304,60,103,14,204.14-1,303.8-21.6,73.57-15.24,117.09-40.45,158.2-61.16V0Z"
                fill={fill}
            />
            {/* Brush Streaks/Texture (Roughness) */}
            <path
                d="M0,40 C150,60 350,10 550,80 C750,150 950,50 1200,60 L1200,0 L0,0 Z"
                fill={fill}
                opacity="0.3"
                className="mix-blend-multiply"
            />
            <path
                d="M0,50 C200,20 400,90 600,40 C800,-10 1000,110 1200,30 L1200,0 L0,0 Z"
                fill={fill}
                opacity="0.2"
            />
            {/* Top rough edge simulation */}
            <path
                d="M0,45 L10,47 L20,44 L30,48 L40,43 L50,49 L60,42 L70,50 L80,44 L90,52 L100,43 L110,51 L120,44 L130,53 L140,45 L150,54 L160,46 L170,55 L180,47 L190,56 L200,48 L210,57 L220,49 L230,58 L240,50 L250,59 L260,51 L270,60 L280,52 L290,61 L300,53 L310,62 L320,54 L330,63 L340,55 L350,64 L360,56 L370,65 L380,57 L390,66 L400,58 L410,67 L420,59 L430,68 L440,60 L450,69 L460,61 L470,70 L480,62 L490,71 L500,63 L510,72 L520,64 L530,73 L540,65 L550,74 L560,66 L570,75 L580,67 L590,76 L600,68 L610,77 L620,69 L630,78 L640,70 L650,79 L660,71 L670,80 L680,72 L690,81 L700,73 L710,82 L720,74 L730,83 L740,75 L750,84 L760,76 L770,85 L780,77 L790,86 L800,78 L810,87 L820,79 L830,88 L840,80 L850,89 L860,81 L870,90 L880,82 L890,91 L900,83 L910,92 L920,84 L930,93 L940,85 L950,94 L960,86 L970,95 L980,87 L990,96 L1000,88 L1010,97 L1020,89 L1030,98 L1040,90 L1050,99 L1060,91 L1070,100 L1080,92 L1090,101 L1100,93 L1110,102 L1120,94 L1130,103 L1140,95 L1150,104 L1160,96 L1170,105 L1180,97 L1190,106 L1200,98 V0 H0 Z"
                fill={fill}
                opacity="0.1"
            />
        </svg>
    </div>
);
