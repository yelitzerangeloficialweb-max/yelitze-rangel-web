'use client';

import { motion } from 'framer-motion';
import { Mail, Calendar, Home } from 'lucide-react';
import Link from 'next/link';

export default function StepFinal() {
    return (
        <div className="text-center max-w-xl mx-auto py-12 px-4">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8"
            >
                <Mail className="w-10 h-10" />
            </motion.div>

            <h2 className="text-3xl font-heading text-[var(--color-primary)] mb-6">
                Tu PDF ya va en camino
            </h2>
            <p className="text-gray-600 text-lg mb-12">
                Revisa tu bandeja de entrada (y spam/promociones por si acaso).<br />
                Gracias por confiar en este espacio y permitirte mirar hacia adentro.
            </p>

            <div className="space-y-4">
                <a
                    href="https://wa.me/XXXXXXXXXXX" // Replace with actual number if available, or hide
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold rounded-xl hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                >
                    Agendar Sesión de Profundización
                </a>

                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 text-gray-500 hover:text-[var(--color-primary)] transition-colors pt-4"
                >
                    <Home className="w-4 h-4" />
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
}
