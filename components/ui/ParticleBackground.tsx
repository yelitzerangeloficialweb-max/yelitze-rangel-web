'use client';

// Simple CSS-only particle effect to avoid heavy JS libraries
export default function ParticleBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            {/* Golden Glow Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-secondary)]/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] animate-pulse duration-[4000ms]" />

            {/* Floating Particles (Simulated with simple divs) */}
            <div className="particles-container absolute inset-0 opacity-50">
                {/* We can add specific small particles here if needed, 
             but the gradient orbs often look more elegant/mystical for this brand */}
            </div>
        </div>
    );
}
