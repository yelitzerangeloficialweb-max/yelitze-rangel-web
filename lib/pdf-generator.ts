import { jsPDF } from 'jspdf';

export async function generateVisionBoardPDF(name: string, analysis: any, pillars: any[]) {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    let y = 30;

    // --- PAGE 1: CARTA DE YELITZE ---
    pdf.setFillColor(249, 247, 242); // Background #F9F7F2
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Brand Header on Carta
    pdf.setFillColor(45, 41, 38);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.text('ARQUITECTURA INTENCIONAL DE VIDA', pageWidth / 2, 25, { align: 'center' });

    y = 60;
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Hola, ${name.split(' ')[0]}.`, margin, y);
    y += 15;

    pdf.setTextColor(45, 41, 38);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');

    const letterText = [
        "Has dado el primer paso más valioso: detenerte a mirar. Lo que tienes en tus manos no es solo un documento, es el Plano Maestro de tu nueva realidad. En mi camino acompañando a cientos de personas, he aprendido que el desequilibrio en nuestra vida rara vez es falta de voluntad; la mayoría de las veces es falta de orden.",
        "",
        "Este mapa que acabas de co-crear conmigo es tu brújula para el 2026. Es el primer paso de tu transformación sistémica porque, antes de construir los muros de tus sueños, necesitamos asegurar que los cimientos—tus lealtades, tus intenciones y tus habitos—estén alineados con quien eres hoy, y no con quien otros esperaban que fueras.",
        "",
        "El equilibrio que buscas nace de habitar tu propia soberanía. Este diseño te permitirá dejar de cargar pesos ajenos y empezar a moverte con la ligereza de quien sabe exactamente hacia dónde va y desde qué paz decide.",
        "",
        "Restaura el orden, y el equilibrio llegará por añadidura.",
        "",
        "Con amor y certeza,",
        "",
        "YELITZE RANGEL",
        "Mentora de Vida y Diseño Intencional"
    ];

    letterText.forEach(paragraph => {
        if (paragraph === "YELITZE RANGEL" || paragraph === "Con amor y certeza,") {
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(140, 64, 5);
        } else {
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(45, 41, 38);
        }

        const lines = pdf.splitTextToSize(paragraph, pageWidth - margin * 2);
        pdf.text(lines, margin, y);
        y += (lines.length * 6) + 4;
    });

    // --- PAGE 2: EL PLANO MAESTRO ---
    pdf.addPage();
    pdf.setFillColor(245, 239, 230); // Background #F5EFE6
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    pdf.setFillColor(45, 41, 38);
    pdf.rect(0, 0, pageWidth, 50, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.text('ARQUITECTURA INTENCIONAL DE VIDA', pageWidth / 2, 20, { align: 'center' });

    pdf.setFontSize(24);
    pdf.text('MI PLANO MAESTRO 2026', pageWidth / 2, 35, { align: 'center' });

    y = 70;

    // --- Identidad Central ---
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
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
    pdf.setFont('helvetica', 'bold');
    pdf.text('TU MANIFIESTO DE PODER:', margin, y);
    y += 8;

    pdf.setTextColor(45, 41, 38);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(analysis.manifesto || '', margin, y, { maxWidth: pageWidth - (margin * 2) });
    y += 25;

    // --- Pillars ---
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('LOS 5 PILARES DE TU DISEÑO', margin, y);
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

        const iLines = pdf.splitTextToSize(intentionText, pageWidth - (margin * 2) - 10);
        pdf.text(iLines, margin + 5, y);
        y += (iLines.length * 5) + 2;

        pdf.setTextColor(140, 64, 5);
        pdf.setFont('helvetica', 'bold');
        pdf.text(actionText, margin + 5, y);
        y += 12;
    }

    // --- Page 3: Strategy ---
    pdf.addPage();
    y = 30;

    pdf.setFillColor(140, 64, 5);
    pdf.rect(margin, y, 5, 5, 'F');
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('DIAGNÓSTICO Y RUTA DE SALIDA', margin + 10, y + 5);
    y += 20;

    pdf.setTextColor(45, 41, 38);
    pdf.setFontSize(12);
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

    // Final Footer
    y = pageHeight - 20;
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text('YELITZE RANGEL • Arquitectura Intencional de Vida • 2026', pageWidth / 2, y, { align: 'center' });

    return Buffer.from(pdf.output('arraybuffer'));
}
