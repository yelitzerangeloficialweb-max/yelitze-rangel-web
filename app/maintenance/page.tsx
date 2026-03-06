'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function MaintenancePage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/maintenance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                window.location.reload(); // Reload to trigger middleware re-evaluation
            } else {
                const data = await response.json();
                setError(data.message || 'Contraseña incorrecta');
            }
        } catch (err) {
            setError('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5EFE6] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] border border-[#B8835A] rounded-full opacity-10"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -90, 0],
                        opacity: [0.1, 0.15, 0.1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] border border-[#8C4005] rounded-full opacity-10"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-md w-full text-center z-10"
            >
                <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl text-[#B8835A]">
                    <Sparkles size={40} strokeWidth={1.5} />
                </div>

                <h1 className="text-4xl md:text-5xl font-serif text-[#8C4005] mb-4">
                    Próximamente
                </h1>

                <p className="text-lg text-[#2D2926] mb-12 font-light italic">
                    Estamos preparando un espacio sagrado para tu transformación.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Contraseña de acceso"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-6 py-4 rounded-full border-2 border-white bg-white/50 backdrop-blur-sm text-[#2D2926] placeholder:text-[#2D2926]/40 focus:outline-none focus:border-[#B8835A] transition-all shadow-sm pr-12"
                            disabled={loading}
                            required
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B8835A]">
                            <Lock size={18} />
                        </div>
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-sm font-medium"
                        >
                            {error}
                        </motion.p>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-[#B8835A] text-[#F5EFE6] rounded-full font-semibold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#8C4005] transition-colors shadow-lg disabled:opacity-50"
                    >
                        {loading ? 'Verificando...' : 'Entrar'}
                        {!loading && <ArrowRight size={18} />}
                    </motion.button>
                </form>

                <p className="mt-12 text-[#2D2926]/60 text-sm font-medium tracking-wide">
                    Yelitze Rangel &bull; Alquimia Ancestral
                </p>
            </motion.div>
        </div>
    );
}
