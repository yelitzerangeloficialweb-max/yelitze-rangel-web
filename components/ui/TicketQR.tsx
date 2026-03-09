'use client';

import { motion } from "framer-motion";
import { QrCode, Calendar, MapPin, User, Download, Share2, CheckCircle2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect } from "react";

interface TicketProps {
    id?: string;
    name: string;
    city: string;
    date?: string;
    time?: string;
}

export const TicketQR = ({
    id = "demo-id",
    name = "Participante",
    city = "Caracas",
    date = "Próximamente",
    time = "Por confirmar"
}: TicketProps) => {
    const [qrUrl, setQrUrl] = useState("");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setQrUrl(`${window.location.origin}/admin/venezuela/entry/${id}`);
        }
    }, [id]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            className="relative w-full max-w-md mx-auto aspect-[0.7] font-sans"
        >
            {/* Main Ticket Container */}
            <div className="absolute inset-0 bg-[#F5EFE6] rounded-3xl shadow-2xl border-2 border-[#B8835A]/30 overflow-hidden flex flex-col">

                {/* Header / Brand */}
                <div className="bg-[#8C4005] p-6 text-center border-b-2 border-dashed border-[#F5EFE6]/30">
                    <span className="text-[#F5EFE6]/60 text-[10px] uppercase tracking-[0.4em] font-bold block mb-1">Pase Oficial de Ingreso</span>
                    <h2 className="text-[#F5EFE6] font-heading text-2xl font-bold tracking-tight uppercase">VENEZUELA EN EL CUERPO</h2>
                </div>

                {/* Perforated Divider Top */}
                <div className="relative h-4 flex items-center">
                    <div className="absolute -left-3 w-6 h-6 bg-[#2D2926] rounded-full" />
                    <div className="w-full border-t-2 border-dashed border-[#B8835A]/20" />
                    <div className="absolute -right-3 w-6 h-6 bg-[#2D2926] rounded-full" />
                </div>

                {/* Main Content Area */}
                <div className="flex-grow p-8 flex flex-col items-center justify-between bg-[url('/assets/images/noise.png')] bg-opacity-5">

                    {/* QR Code Section */}
                    <div className="relative group p-6 border-2 border-[#B8835A]/10 rounded-3xl bg-white shadow-inner">
                        {qrUrl ? (
                            <QRCodeSVG
                                value={qrUrl}
                                size={192}
                                fgColor="#8C4005"
                                level="H"
                                includeMargin={false}
                            />
                        ) : (
                            <QrCode className="w-48 h-48 text-[#8C4005]/20 stroke-[1]" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-3xl">
                            <div className="text-center space-y-2">
                                <CheckCircle2 className="w-8 h-8 text-[#8C4005] mx-auto" />
                                <span className="text-[#8C4005] font-bold text-[10px] uppercase tracking-widest block">Acceso Validado</span>
                            </div>
                        </div>
                    </div>

                    {/* Attendee Info */}
                    <div className="w-full text-center space-y-4">
                        <div className="space-y-1">
                            <span className="text-[#8C4005]/40 text-[9px] uppercase tracking-widest font-bold">Titular del Pase</span>
                            <p className="text-[#2D2926] font-heading text-xl font-bold uppercase tracking-tight line-clamp-1">{name}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-[#B8835A]/10 pt-4">
                            <div className="text-left">
                                <span className="text-[#8C4005]/40 text-[9px] uppercase tracking-widest font-bold block">Sede</span>
                                <div className="flex items-center gap-1 text-[#2D2926]">
                                    <MapPin className="w-3 h-3 text-[#B8835A]" />
                                    <span className="font-bold text-xs uppercase truncate">{city}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-[#8C4005]/40 text-[9px] uppercase tracking-widest font-bold block">Horario</span>
                                <div className="flex items-center justify-end gap-1 text-[#2D2926]">
                                    <Calendar className="w-3 h-3 text-[#B8835A]" />
                                    <span className="font-bold text-[9px] uppercase">Vía Whatsapp</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Perforated Divider Bottom */}
                <div className="relative h-4 flex items-center">
                    <div className="absolute -left-3 w-6 h-6 bg-[#2D2926] rounded-full" />
                    <div className="w-full border-t-2 border-dashed border-[#B8835A]/20" />
                    <div className="absolute -right-3 w-6 h-6 bg-[#2D2926] rounded-full" />
                </div>

                {/* Footer Stub */}
                <div className="bg-[#F5EFE6] p-4 text-center border-t border-[#B8835A]/5">
                    <div className="flex justify-center gap-4 mb-2">
                        <span className="text-[#8C4005] font-mono text-[9px] tracking-tighter opacity-70">ID: {id.split('-')[0].toUpperCase()}</span>
                        <span className="text-[#8C4005] font-mono text-[9px] tracking-tighter opacity-70">PASE: VIP</span>
                        <span className="text-[#8C4005] font-mono text-[9px] tracking-tighter opacity-70">TOUR: 2024</span>
                    </div>
                    <p className="text-[#8C4005]/60 text-[7px] uppercase font-bold tracking-[0.2em]">Pase intransferible • Requerido para Ingreso</p>
                </div>
            </div>

            {/* Side Labels (Vertical) */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 hidden md:block">
                <span className="text-[#F5EFE6]/10 font-mono text-[8px] tracking-[0.5em] uppercase">Cinema Exp • Yelitze Rangel</span>
            </div>
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 rotate-90 hidden md:block">
                <span className="text-[#F5EFE6]/10 font-mono text-[8px] tracking-[0.5em] uppercase">Admit One • No Refund</span>
            </div>
        </motion.div>
    );
};
