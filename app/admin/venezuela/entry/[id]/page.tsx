'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, XCircle, User, MapPin, Mail, Phone, Calendar } from 'lucide-react';

interface Registration {
    id: string;
    createdAt: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    scanned: boolean;
}

export default function ParticipantEntryPage() {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [participant, setParticipant] = useState<Registration | null>(null);
    const [scanDone, setScanDone] = useState(false);

    useEffect(() => {
        const fetchAndScan = async () => {
            try {
                // First get the data
                const response = await fetch(`/api/admin/venezuela/registrations`);
                const data = await response.json();
                const found = data.find((r: any) => r.id === params.id);

                if (!found) {
                    setError('Participante no encontrado');
                    setLoading(false);
                    return;
                }

                setParticipant(found);

                // Now mark as scanned
                const scanRes = await fetch(`/api/admin/venezuela/scan/${params.id}`, {
                    method: 'POST'
                });

                if (scanRes.ok) {
                    setScanDone(true);
                } else {
                    console.error('Error marking as scanned');
                }

                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Error al procesar la entrada');
                setLoading(false);
            }
        };

        if (params.id) {
            fetchAndScan();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 text-center">
                <div className="space-y-4">
                    <Loader2 className="w-12 h-12 text-[#C1530A] animate-spin mx-auto" />
                    <p className="text-stone-500 font-medium animate-pulse tracking-widest uppercase text-xs">Validando Pase...</p>
                </div>
            </div>
        );
    }

    if (error || !participant) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 text-center">
                <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-red-100 max-w-sm w-full space-y-6">
                    <XCircle className="w-20 h-20 text-red-500 mx-auto" />
                    <h1 className="text-2xl font-bold text-stone-800">Error de Validación</h1>
                    <p className="text-stone-500">{error || 'No se pudo encontrar el registro.'}</p>
                    <button
                        onClick={() => router.push('/admin/venezuela')}
                        className="w-full bg-stone-800 text-white py-4 rounded-2xl font-bold"
                    >
                        Volver al Panel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden max-w-md w-full border border-stone-100 relative"
            >
                {/* Header Status */}
                <div className="bg-[#C1530A] p-8 text-center relative overflow-hidden">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                        className="relative z-10 inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-md rounded-full border-4 border-white mb-4"
                    >
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </motion.div>
                    <h1 className="text-white text-3xl font-bold font-heading relative z-10">¡Entrada Confirmada!</h1>
                    <p className="text-white/80 text-sm font-medium uppercase tracking-[0.2em] relative z-10 mt-1">Acceso Validado</p>

                    {/* Animated background circle */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 4 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0 bg-white/10 rounded-full"
                    />
                </div>

                <div className="p-10 space-y-8">
                    {/* Participant Details */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-6 p-4 rounded-3xl bg-stone-50 border border-stone-100">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                <User className="w-6 h-6 text-[#C1530A]" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-0.5">Participante</p>
                                <p className="text-xl font-bold text-stone-800">{participant.name}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-center gap-4 px-4 py-3 rounded-2xl border border-stone-50">
                                <MapPin className="w-5 h-5 text-stone-300" />
                                <div>
                                    <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Sede / Ciudad</p>
                                    <p className="text-sm font-bold text-stone-700 uppercase">{participant.city}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 px-4 py-3 rounded-2xl border border-stone-50">
                                <Calendar className="w-5 h-5 text-stone-300" />
                                <div>
                                    <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Validación</p>
                                    <p className="text-sm font-bold text-stone-700">
                                        {new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })} - {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-dashed border-stone-200">
                        <div className="flex justify-between items-center mb-6">
                            <div className="space-y-1">
                                <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">ID Registro</p>
                                <p className="text-xs font-mono text-stone-500 uppercase">{participant.id.split('-')[0]}</p>
                            </div>
                            <div className="text-right space-y-1">
                                <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Tipo de Pase</p>
                                <p className="text-xs font-bold text-[#C1530A] uppercase tracking-tighter">Acceso General</p>
                            </div>
                        </div>

                        <button
                            onClick={() => router.push('/admin/venezuela')}
                            className="w-full bg-stone-900 text-white py-5 rounded-[2rem] font-bold text-sm tracking-widest uppercase hover:bg-stone-800 transition-all shadow-xl shadow-stone-200"
                        >
                            Volver al Listado
                        </button>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-stone-50 rounded-full" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-stone-50 rounded-full" />
            </motion.div>
        </div>
    );
}
