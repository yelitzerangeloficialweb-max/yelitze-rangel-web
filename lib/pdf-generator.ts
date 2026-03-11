import { jsPDF } from 'jspdf';

export async function generateVisionBoardPDF(name: string, analysis: any, pillars: any[], gender: string) {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const isMale = gender === 'hombre';
    let y = 30;

    // Helper to add footer to every page
    const addFooter = (pageNum: number, totalPages: number) => {
        pdf.setFontSize(8);
        pdf.setTextColor(184, 131, 90);
        pdf.text(`PÁGINA 0${pageNum}/0${totalPages}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
        pdf.text('YELITZE RANGEL • Arquitectura Intencional de Vida • 2026', margin, pageHeight - 10);
    };

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
        "\"Restaura el orden, y el equilibrio llegará por añadidura.\"",
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
        } else if (paragraph.startsWith('"')) {
            pdf.setFont('helvetica', 'bolditalic');
            pdf.setFontSize(13);
            pdf.setTextColor(140, 64, 5);
        } else {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(11);
            pdf.setTextColor(45, 41, 38);
        }

        const lines = pdf.splitTextToSize(paragraph, pageWidth - margin * 2);
        pdf.text(lines, margin, y);
        y += (lines.length * 6) + 3;
    });

    addFooter(1, 3);

    // --- PAGE 2: TABLERO VISUAL ---
    pdf.addPage();
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Background decoration
    pdf.setDrawColor(212, 175, 55, 0.1);
    pdf.setLineWidth(0.1);
    pdf.circle(pageWidth / 2, pageHeight / 2, 80, 'S');

    y = 25;
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ESTRUCTURA VISUAL 2026', pageWidth / 2, y, { align: 'center' });
    y += 10;
    pdf.setFontSize(24);
    pdf.setTextColor(45, 41, 38);
    pdf.text('Tablero de Visión', pageWidth / 2, y, { align: 'center' });

    // Render pillars in a grid-like structure
    const renderPillarBox = (p: any, x: number, yPos: number, label: string) => {
        pdf.setDrawColor(184, 131, 90, 0.3);
        pdf.rect(x, yPos, 50, 65, 'S');
        
        pdf.setFillColor(140, 64, 5);
        pdf.rect(x, yPos, 50, 5, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(6);
        pdf.text(label, x + 25, yPos + 3.5, { align: 'center' });

        // Placeholder for image
        pdf.setFillColor(249, 247, 242);
        pdf.rect(x + 5, yPos + 8, 40, 30, 'F');
        
        // Try to add image if available (AI image is usually last)
        if (p.images && p.images.length > 0) {
            try {
                const imgData = p.images.length >= 4 ? p.images[3] : p.images[0];
                if (imgData.startsWith('data:image')) {
                    pdf.addImage(imgData, 'JPEG', x + 5, yPos + 8, 40, 30);
                }
            } catch (e) {
                // Silently skip if image data is invalid
            }
        }

        pdf.setTextColor(45, 41, 38);
        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'bold');
        const titleLines = pdf.splitTextToSize(p.title || '', 40);
        pdf.text(titleLines, x + 25, yPos + 45, { align: 'center' });

        pdf.setTextColor(140, 64, 5);
        pdf.setFontSize(6);
        const actionLines = pdf.splitTextToSize(p.action || '', 40);
        pdf.text(actionLines, x + 25, yPos + 58, { align: 'center' });
    };

    // Central Identity
    const centerX = pageWidth / 2;
    const centerY = pageHeight / 2;

    // Position 1: Propósito (Top Center)
    if (pillars[0]) renderPillarBox(pillars[0], centerX - 25, 50, "PROPÓSITO");
    
    // Middle row
    if (pillars[1]) renderPillarBox(pillars[1], margin, centerY - 32.5, "RECURSOS");
    
    // Central Circle Identity
    pdf.setFillColor(253, 251, 247);
    pdf.setDrawColor(184, 131, 90, 0.4);
    pdf.circle(centerX, centerY, 25, 'FD');
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(6);
    pdf.text('CENTRADO EN', centerX, centerY - 8, { align: 'center' });
    pdf.setTextColor(45, 41, 38);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bolditalic');
    const idText = analysis.identity || (isMale ? 'El Arquitecto' : 'La Arquitecta');
    const idLines = pdf.splitTextToSize(idText, 40);
    pdf.text(idLines, centerX, centerY + 2, { align: 'center' });

    if (pillars[2]) renderPillarBox(pillars[2], pageWidth - margin - 50, centerY - 32.5, "VÍNCULOS");

    // Bottom row
    if (pillars[3]) renderPillarBox(pillars[3], margin + 15, pageHeight - 100, "EXPANSIÓN");
    if (pillars[4]) renderPillarBox(pillars[4], pageWidth - margin - 65, pageHeight - 100, "VITALIDAD");

    addFooter(2, 3);

    // --- PAGE 3: BITÁCORA ---
    pdf.addPage();
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    y = 30;
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('BITÁCORA DE CONSTRUCCIÓN', pageWidth / 2, y, { align: 'center' });
    y += 10;
    pdf.setTextColor(45, 41, 38);
    pdf.setFontSize(22);
    pdf.text(`La Ruta de la ${isMale ? 'Arquitecta' : 'Arquitecto'}`, pageWidth / 2, y, { align: 'center' });
    y += 20;

    // Actions Section
    pdf.setFillColor(249, 247, 242);
    pdf.rect(margin, y, pageWidth - margin * 2, 70, 'F');
    let actionY = y + 10;
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(12);
    pdf.text('PASOS DE ACCIÓN INMEDIATA', margin + 10, actionY);
    actionY += 10;
    pdf.setTextColor(45, 41, 38);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    
    const actionSteps = (analysis.guide_steps && analysis.guide_steps.length > 0)
        ? analysis.guide_steps
        : pillars.map(p => p.action).filter(a => a && a.trim() !== '');

    actionSteps.slice(0, 5).forEach((step: string, i: number) => {
        const stepLines = pdf.splitTextToSize(`${i + 1}. ${step}`, pageWidth - margin * 2 - 20);
        pdf.text(stepLines, margin + 10, actionY);
        actionY += (stepLines.length * 5) + 2;
    });

    y += 85;

    // Reflections Section
    pdf.setTextColor(45, 41, 38);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('REFLEXIONES DE LOS PORTALES', margin, y);
    y += 10;
    
    const reflections = analysis.reflections || {}; // Should be passed but analysis might have it or not
    // If not in analysis, we rely on the caller but here we'll just show what we can
    // In analyze-board/route.ts, we have reflections variables.
    
    // Note: Since lib/pdf-generator doesn't get reflections mapping directly from analysis object (usually)
    // we should update the route to pass it or use analysis summary if available.
    // For now, let's just use the space for the Manifesto.

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(140, 64, 5);
    pdf.text('MI MANIFIESTO DE PODER:', margin, y);
    y += 8;
    pdf.setTextColor(45, 41, 38);
    pdf.setFont('helvetica', 'italic');
    const manifestoLines = pdf.splitTextToSize(analysis.manifesto || 'No hay manifiesto disponible.', pageWidth - margin * 2);
    pdf.text(manifestoLines, margin, y);
    y += (manifestoLines.length * 6) + 15;

    // Technical Details
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(140, 64, 5);
    pdf.text('SOBERANÍA SISTÉMICA / LO QUE SUELTAS:', margin, y);
    y += 6;
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(45, 41, 38);
    const releaseLines = pdf.splitTextToSize(analysis.release || '', pageWidth - margin * 2);
    pdf.text(releaseLines, margin, y);
    y += (releaseLines.length * 5) + 10;

    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(140, 64, 5);
    pdf.text('PRÁCTICA MAESTRA / HÁBITO:', margin, y);
    y += 6;
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(45, 41, 38);
    const practiceLines = pdf.splitTextToSize(analysis.practice || '', pageWidth - margin * 2);
    pdf.text(practiceLines, margin, y);

    addFooter(3, 3);

    return Buffer.from(pdf.output('arraybuffer'));
}
