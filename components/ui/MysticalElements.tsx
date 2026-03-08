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
    <div className={`absolute left-0 w-full overflow-hidden leading-none z-20 ${position === 'top' ? 'top-0 rotate-180' : 'bottom-0'} ${className}`}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[120px]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.34,204.4,109.84,244.64,104.75,283.64,84.15,321.39,56.44Z" fill={fill}></path>
        </svg>
    </div>
);
