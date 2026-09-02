'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ShieldCheck, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirect') || '/admin';

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                // Hard refresh to ensure cookies are read immediately by middleware and client
                window.location.href = redirectUrl;
            } else {
                const data = await response.json();
                setError(data.message || 'Contraseña incorrecta');
            }
        } catch (err) {
            setError('Error al conectar con el servidor. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9F8F6] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Aesthetic Blur */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#B8835A]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#8C4005]/5 rounded-full blur-2xl pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full z-10"
            >
                {/* Brand Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-sm border border-stone-100 text-[var(--color-primary)] mb-4">
                        <ShieldCheck size={32} className="text-[#B8835A]" />
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-stone-900 tracking-tight">
                        Panel de Administración
                    </h1>
                    <p className="text-stone-500 text-sm mt-1 font-medium">
                        Yelitze Rangel &bull; Gestión y Contenidos
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-200/40">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                                Contraseña de Acceso
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Ingresa tu clave de administrador"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl border border-stone-200 bg-stone-50/50 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#B8835A]/30 focus:border-[#B8835A] transition-all pr-12 text-sm"
                                    disabled={loading}
                                    autoFocus
                                    required
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">
                                    <Lock size={18} />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-medium text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-[var(--color-primary)] hover:bg-[#8C4005] text-white rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg shadow-stone-900/10 hover:shadow-stone-900/20 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    <span>Verificando...</span>
                                </>
                            ) : (
                                <>
                                    <span>Iniciar Sesión</span>
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-stone-100 text-center">
                        <Link
                            href="/"
                            className="text-xs text-stone-400 hover:text-stone-600 font-medium transition-colors"
                        >
                            &larr; Volver al sitio web principal
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}
