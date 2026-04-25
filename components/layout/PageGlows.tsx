"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

export default function PageGlows() {
    const pathname = usePathname();
    
    // Check if we are on a page that shouldn't have these specific flows (optional)
    // For now, we apply it to everything in the website layout as requested for "white pages"
    
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[50]">
            {/* Top Left Orange Glow */}
            <div 
                className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full opacity-40"
                style={{
                    background: 'radial-gradient(circle at center, rgba(233, 123, 50, 0.35) 0%, rgba(233, 123, 50, 0.1) 40%, transparent 70%)',
                    filter: 'blur(100px)',
                }}
            />
            
            {/* Bottom Right Orange Glow */}
            <div 
                className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full opacity-30"
                style={{
                    background: 'radial-gradient(circle at center, rgba(233, 123, 50, 0.3) 0%, rgba(233, 123, 50, 0.05) 40%, transparent 70%)',
                    filter: 'blur(100px)',
                }}
            />
        </div>
    );
}
