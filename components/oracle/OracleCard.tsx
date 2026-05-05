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

const CARD_COVERS = [
    'Tarjetas-Circulo-Ancestral-3_03.jpg',
    'Tarjetas-Circulo-Ancestral-3_04.jpg',
    'Tarjetas-Circulo-Ancestral-3_05.jpg',
    'Tarjetas-Circulo-Ancestral-3_06.jpg',
    'Tarjetas-Circulo-Ancestral-3_07.jpg',
    'Tarjetas-Circulo-Ancestral-3_08.jpg',
    'Tarjetas-Circulo-Ancestral-3_11.jpg',
    'Tarjetas-Circulo-Ancestral-3_12.jpg',
    'Tarjetas-Circulo-Ancestral-3_13.jpg',
    'Tarjetas-Circulo-Ancestral-3_18.jpg',
    'Tarjetas-Circulo-Ancestral-3_19.jpg',
    'Tarjetas-Circulo-Ancestral-3_20.jpg'
];

export default function OracleCard({ index, isSelected, isRevealed, onClick, content }: OracleCardProps) {
    const coverImage = CARD_COVERS[index % CARD_COVERS.length];
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
            className={`relative w-64 h-64 md:w-72 md:h-72 cursor-pointer preserve-3d group`}
            onClick={onClick}
        >
            {/* FRONT OF THE CARD (BACK IN REALITY) */}
            <div 
                className={`absolute inset-0 w-full h-full rounded-full border-4 border-[#B8835A]/50 bg-[#2D2926] overflow-hidden backface-hidden shadow-2xl transition-all duration-500 group-hover:border-[#B8835A] group-hover:scale-105`}
            >
                {/* Animal Cover Image */}
                <div className="absolute inset-0 w-full h-full">
                    <Image 
                        src={`/images/oraculo/${coverImage}`}
                        alt={`Carta ${index + 1}`}
                        fill
                        className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                </div>

                {/* Flower Watermark Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                    <div className="w-1/2 h-1/2">
                        <Image 
                            src="/assets/images/watermark-logo.png" 
                            alt="Místico" 
                            fill 
                            className="object-contain brightness-0 invert" 
                        />
                    </div>
                </div>

                {/* Golden Glow & Vignette */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#B8835A]/20 via-transparent to-black/40" />
                <div className="absolute inset-0 rounded-full border-inner border-[#B8835A]/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]" />
            </div>

            {/* BACK OF THE CARD (FRONT REVEALED) */}
            <div 
                className="absolute inset-0 w-full h-full rounded-full border-4 border-[#B8835A] bg-[#F9F7F2] flex flex-col items-center justify-center p-6 pt-10 text-center backface-hidden shadow-2xl"
                style={{ transform: 'rotateY(180deg)' }}
            >
                <span className="text-[#B8835A] font-guide text-[9px] uppercase tracking-[0.3em] font-bold mb-3">
                    {[
                        "Sabiduría Ancestral",
                        "Guía del Linaje",
                        "Mensaje de Luz",
                        "Voz de las Almas",
                        "Claridad Sagrada",
                        "Eco del Corazón"
                    ][index % 6]}
                </span>
                <h3 className="text-[#8C4005] text-2xl md:text-4xl font-editorial leading-tight mb-4 px-4">
                    {content.title}
                </h3>
                <p className="text-[#2D2926]/70 text-sm md:text-lg font-light leading-relaxed line-clamp-3 px-6">
                    {content.message}
                </p>
                
                {/* Decorative element */}
                <div className="mt-6 w-12 h-[1px] bg-[#B8835A]/40" />
            </div>
        </motion.div>
    );
}
