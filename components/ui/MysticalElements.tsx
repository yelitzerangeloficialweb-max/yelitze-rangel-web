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
