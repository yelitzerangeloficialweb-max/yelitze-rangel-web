'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface OracleCardProps {
    index: number;
    isSelected: boolean;
    isRevealed: boolean;
    onClick: () => void;
    content: {
        title: string;
        message: string;
        image?: string;
    };
}

export default function OracleCard({ index, isSelected, isRevealed, onClick, content }: OracleCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.5, rotateY: 0 }}
            animate={{ 
                opacity: 1, 
                scale: isSelected ? 1.2 : 1,
                rotateY: isRevealed ? 180 : 0,
                zIndex: isSelected ? 50 : 10
            }}
            whileHover={!isRevealed && !isSelected ? { scale: 1.05, y: -5 } : {}}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className={`relative w-48 h-48 md:w-56 md:h-56 cursor-pointer preserve-3d group`}
            onClick={onClick}
        >
            {/* FRONT OF THE CARD (BACK IN REALITY) */}
            <div 
                className={`absolute inset-0 w-full h-full rounded-full border-4 border-[#B8835A]/30 bg-[#2D2926] flex items-center justify-center backface-hidden shadow-2xl transition-all duration-500 group-hover:border-[#B8835A]`}
            >
                <div className="relative w-3/4 h-3/4 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Image 
                        src="/assets/images/watermark-logo.png" 
                        alt="Místico" 
                        fill 
                        className="object-contain brightness-0 invert" 
                    />
                </div>
                {/* Golden Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#B8835A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* BACK OF THE CARD (FRONT REVEALED) */}
            <div 
                className="absolute inset-0 w-full h-full rounded-full border-4 border-[#B8835A] bg-[#F9F7F2] flex flex-col items-center justify-center p-6 text-center backface-hidden shadow-2xl"
                style={{ transform: 'rotateY(180deg)' }}
            >
                <span className="text-[#B8835A] font-guide text-[10px] uppercase tracking-[0.3em] font-bold mb-2">
                    Mensaje de Luz
                </span>
                <h3 className="text-[#8C4005] text-xl md:text-2xl font-editorial leading-tight mb-2">
                    {content.title}
                </h3>
                <p className="text-[#2D2926]/70 text-xs md:text-sm font-light leading-relaxed">
                    {content.message}
                </p>
                
                {/* Decorative element */}
                <div className="mt-4 w-8 h-[1px] bg-[#B8835A]/40" />
            </div>
        </motion.div>
    );
}
