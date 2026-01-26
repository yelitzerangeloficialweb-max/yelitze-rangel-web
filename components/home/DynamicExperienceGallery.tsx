"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_IMAGES } from '@/lib/gallery-data';

export default function DynamicExperienceGallery() {
    const [activeImages, setActiveImages] = useState<string[]>([]);

    useEffect(() => {
        // Initial random selection of 4 images
        const getRandomImages = () => {
            const shuffled = [...GALLERY_IMAGES].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, 4).map(img => img.src);
        };
        
        setActiveImages(getRandomImages());

        // Interval to rotate one random slot every 5-7 seconds
        const interval = setInterval(() => {
            setActiveImages(prev => {
                const next = [...prev];
                const slotToChange = Math.floor(Math.random() * 4);
                
                // Find an image that is not currently displayed
                const availableImages = GALLERY_IMAGES.filter(img => !next.includes(img.src));
                if (availableImages.length > 0) {
                    const randomNewImg = availableImages[Math.floor(Math.random() * availableImages.length)].src;
                    next[slotToChange] = randomNewImg;
                }
                
                return next;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    if (activeImages.length < 4) return null;

    const gridLayout = [
        { span: "md:col-span-2 md:row-span-2" },
        { span: "" },
        { span: "" },
        { span: "md:col-span-2" }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {activeImages.map((src, i) => (
                <div key={i} className={`relative h-64 md:h-full min-h-[300px] rounded-3xl overflow-hidden group shadow-2xl ${gridLayout[i].span}`}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={src}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={src}
                                alt="Experiencia Yelitze"
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2000ms] group-hover:scale-110"
                            />
                        </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors pointer-events-none" />
                    
                    {/* Subtle aesthetic frame */}
                    <div className="absolute inset-0 border border-white/5 rounded-3xl pointer-events-none" />
                </div>
            ))}
        </div>
    );
}
