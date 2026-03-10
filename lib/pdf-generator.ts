import { jsPDF } from 'jspdf';

export async function generateVisionBoardPDF(name: string, analysis: any, pillars: any[], gender: string) {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const isMale = gender === 'hombre';
    let y = 30;

    // --- PAGE 1: CARTA DE YELITZE ---
    pdf.setFillColor(249, 247, 242); // Background #F9F7F2
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Header Line
    pdf.setDrawColor(140, 64, 5);
    pdf.setLineWidth(0.5);
    pdf.line(margin, 25, pageWidth - margin, 25);

    y = 50;
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Hola, ${name.split(' ')[0]}.`, margin, y);
    y += 15;

    pdf.setTextColor(45, 41, 38);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');

    const letterText = [
        "Has dado el primer paso más valioso: detenerte a mirar. Lo que tienes en tus manos no es solo un documento, es el Plano Maestro de tu nueva realidad. En mi camino acompañando a cientos de personas, he aprendido que el desequilibrio en nuestra vida rara vez es falta de voluntad; la mayoría de las veces es falta de orden.",
        "",
        "Este mapa que acabas de co-crear conmigo es tu brújula para el 2026. Es el primer paso de tu transformación sistémica porque, antes de construir los muros de tus sueños, necesitamos asegurar que los cimientos—tu lealtad, tus intenciones y tus hábitos—estén alineados con quien eres hoy, y no con quien otros esperaban que fueras.",
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
        if (paragraph === "YELITZE RANGEL") {
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(14);
            pdf.setTextColor(140, 64, 5);
        } else if (paragraph === "Con amor y certeza,") {
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(10);
            pdf.setTextColor(184, 131, 90);
        } else {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(11);
            pdf.setTextColor(45, 41, 38);
        }

        const lines = pdf.splitTextToSize(paragraph, pageWidth - margin * 2);
        pdf.text(lines, margin, y);
        y += (lines.length * 6) + 3;
    });

    // --- PAGE 2: EL PLANO MAESTRO (Blueprint Style) ---
    pdf.addPage();
    pdf.setFillColor(15, 23, 42); // Deep Blue #0F172A
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Grid lines
    pdf.setDrawColor(56, 189, 248); // Light Blue #38BDF8
    pdf.setLineWidth(0.05);
    for (let i = 0; i < pageWidth; i += 10) pdf.line(i, 0, i, pageHeight);
    for (let i = 0; i < pageHeight; i += 10) pdf.line(0, i, pageWidth, i);

    pdf.setLineWidth(0.3);
    pdf.setDrawColor(56, 189, 248);
    pdf.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');

    y = 25;
    pdf.setTextColor(56, 189, 248);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TRACKING DE LA ARQUITECTURA INTENCIONAL DE TU VIDA', margin, y);
    y += 8;

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text('EL PLANO MAESTRO', margin, y);

    // Inner frame
    pdf.setDrawColor(56, 189, 248);
    pdf.setLineWidth(0.1);
    pdf.circle(pageWidth / 2, pageHeight / 2, 60, 'S');

    // Core Identity
    y = pageHeight / 2 - 10;
    pdf.setTextColor(56, 189, 248);
    pdf.setFontSize(8);
    pdf.text('CORE ARCHITECTURE', pageWidth / 2, y, { align: 'center' });
    y += 10;
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.text('YO SOY', pageWidth / 2, y, { align: 'center' });
    y += 10;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'italic');
    const identityText = analysis.identity || (isMale ? 'EL ARQUITECTO DE MI PROPIO ORDEN' : 'LA ARQUITECTA DE MI PROPIO ORDEN');
    const idLines = pdf.splitTextToSize(identityText, 80);
    pdf.text(idLines, pageWidth / 2, y, { align: 'center' });

    // Pillars (Simplified for Blueprint)
    const pillarPositions = [
        { x: margin, y: 70 },
        { x: pageWidth - margin - 50, y: 70 },
        { x: margin, y: 200 },
        { x: pageWidth - margin - 50, y: 200 }
    ];

    pillars.slice(1, 5).forEach((p, i) => {
        const pos = pillarPositions[i];
        pdf.setDrawColor(56, 189, 248);
        pdf.rect(pos.x, pos.y, 50, 30, 'S');
        pdf.setTextColor(56, 189, 248);
        pdf.setFontSize(7);
        pdf.text(`AXIS 0${i + 2}`, pos.x + 2, pos.y + 5);
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(9);
        pdf.text(p.title.toUpperCase(), pos.x + 2, pos.y + 12);
        pdf.setFontSize(7);
        pdf.setTextColor(56, 189, 248);
        pdf.text(`ACT: ${p.action || 'REORDER'}`, pos.x + 2, pos.y + 25);
    });

    // Technical Footer
    y = pageHeight - 40;
    pdf.setDrawColor(56, 189, 248);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 10;
    pdf.setTextColor(56, 189, 248);
    pdf.text('SOBERANÍA SISTÉMICA / LO QUE SUELTAS', margin, y);
    pdf.text('PRÁCTICA MAESTRA / HÁBITO', pageWidth / 2 + 10, y);
    y += 6;
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(8);
    pdf.text(pdf.splitTextToSize(analysis.release || '', 80), margin, y);
    pdf.text(pdf.splitTextToSize(analysis.practice || '', 80), pageWidth / 2 + 10, y);

    // --- PAGE 3: BITÁCORA ---
    pdf.addPage();
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    y = 30;
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(18);
    pdf.text(`LA RUTA DE LA ${isMale ? 'ARQUITECTO' : 'ARQUITECTA'}`, pageWidth / 2, y, { align: 'center' });
    y += 20;

    pdf.setFillColor(249, 247, 242);
    pdf.rect(margin, y, pageWidth - margin * 2, 80, 'F');
    y += 10;
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(12);
    pdf.text('PASOS DE ACCIÓN INMEDIATA', margin + 10, y);
    y += 10;
    pdf.setTextColor(45, 41, 38);
    pdf.setFontSize(10);
    (analysis.guide_steps || []).forEach((step: string, i: number) => {
        pdf.text(`${i + 1}. ${step}`, margin + 10, y, { maxWidth: pageWidth - margin * 2 - 20 });
        y += 8;
    });

    // Final signature
    y = pageHeight - 30;
    pdf.setFontSize(8);
    pdf.setTextColor(184, 131, 90);
    pdf.text('YELITZE RANGEL • Tracking de la Arquitectura Intencional de tu Vida • 2026', pageWidth / 2, y, { align: 'center' });

    return Buffer.from(pdf.output('arraybuffer'));
}
