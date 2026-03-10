import { jsPDF } from 'jspdf';

export async function generateVisionBoardPDF(name: string, analysis: any, pillars: any[]) {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let y = 30;

    // --- Header ---
    pdf.setFillColor(45, 41, 38);
    pdf.rect(0, 0, pageWidth, 50, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.text('ARQUITECTURA INTENCIONAL DE VIDA', pageWidth / 2, 20, { align: 'center' });

    pdf.setFontSize(24);
    pdf.text('MI PLANO MAESTRO 2026', pageWidth / 2, 35, { align: 'center' });

    pdf.setFontSize(12);
    pdf.text(`DISEÑADO PARA: ${name.toUpperCase()}`, pageWidth / 2, 45, { align: 'center' });

    y = 70;

    // --- Identidad Central ---
    pdf.setTextColor(140, 64, 5); // Brand Brown
    pdf.setFontSize(10);
    pdf.text('TU IDENTIDAD CENTRAL:', margin, y);
    y += 10;

    pdf.setTextColor(45, 41, 38);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'italic');
    pdf.text(`"YO SOY: ${analysis.identity}"`, margin, y, { maxWidth: pageWidth - (margin * 2) });
    y += 20;

    // --- Manifiesto ---
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('TU MANIFIESTO DE PODER:', margin, y);
    y += 8;

    pdf.setTextColor(45, 41, 38);
    pdf.setFontSize(12);
    pdf.text(analysis.manifesto || '', margin, y, { maxWidth: pageWidth - (margin * 2) });
    y += 25;

    // --- Pillars (Simplified Architecture) ---
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(14);
    pdf.text('LOS 5 PILARES DE TU ARQUITECTURA', margin, y);
    y += 10;

    for (const pillar of pillars) {
        if (y > 250) {
            pdf.addPage();
            y = 30;
        }

        pdf.setTextColor(45, 41, 38);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text(pillar.title.toUpperCase(), margin, y);
        y += 6;

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        const intentionText = pillar.intention || 'Sin definir';
        const actionText = `ACCIÓN: ${pillar.action || 'Sin definir'}`;

        pdf.text(intentionText, margin + 5, y, { maxWidth: pageWidth - (margin * 2) - 10 });
        const intentionLines = pdf.splitTextToSize(intentionText, pageWidth - (margin * 2) - 10).length;
        y += (intentionLines * 5) + 2;

        pdf.setTextColor(140, 64, 5);
        pdf.setFont('helvetica', 'bold');
        pdf.text(actionText, margin + 5, y);
        y += 12;
    }

    // --- Page 2: Strategy ---
    pdf.addPage();
    y = 30;

    pdf.setFillColor(140, 64, 5);
    pdf.rect(margin, y, 5, 5, 'F');
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(16);
    pdf.text('DIAGNÓSTICO Y ESTRATEGIA', margin + 10, y + 5);
    y += 20;

    // Soul Diagnosis
    pdf.setTextColor(45, 41, 38);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('1. SOBERANÍA SISTÉMICA (Lo que sueltas)', margin, y);
    y += 8;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.text(analysis.release || '', margin, y, { maxWidth: pageWidth - (margin * 2) });
    y += 15;

    pdf.setFont('helvetica', 'bold');
    pdf.text('2. PRÁCTICA MAESTRA (Tu hábito de orden)', margin, y);
    y += 8;
    pdf.setFont('helvetica', 'normal');
    pdf.text(analysis.practice || '', margin, y, { maxWidth: pageWidth - (margin * 2) });
    y += 25;

    // Action Steps
    pdf.setFontSize(14);
    pdf.setTextColor(140, 64, 5);
    pdf.text('PASOS DE ACCIÓN INMEDIATA', margin, y);
    y += 12;

    const steps = analysis.guide_steps || [];
    pdf.setTextColor(45, 41, 38);
    pdf.setFontSize(11);
    steps.forEach((step: string, i: number) => {
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${i + 1}.`, margin, y);
        pdf.setFont('helvetica', 'normal');
        pdf.text(step, margin + 8, y, { maxWidth: pageWidth - margin * 2 - 8 });
        const stepLines = pdf.splitTextToSize(step, pageWidth - margin * 2 - 8).length;
        y += (stepLines * 6) + 4;
    });

    // --- Footer ---
    y = pdf.internal.pageSize.getHeight() - 20;
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text('YELITZE RANGEL • Arquitectura Intencional de Vida • 2026', pageWidth / 2, y, { align: 'center' });

    return Buffer.from(pdf.output('arraybuffer'));
}
