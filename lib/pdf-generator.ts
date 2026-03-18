import { jsPDF } from 'jspdf';

export async function generateVisionBoardPDF(name: string, analysis: any, pillars: any[], gender: string, portalReflections?: Record<string, string>) {
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

    y = 25;
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('BITÁCORA DE CONSTRUCCIÓN', pageWidth / 2, y, { align: 'center' });
    y += 10;
    pdf.setTextColor(45, 41, 38);
    pdf.setFontSize(20);
    pdf.text(`La Ruta del ${isMale ? 'Arquitecto' : 'Arquitecta'}`, pageWidth / 2, y, { align: 'center' });
    y += 15;

    // Actions Section - More compact
    pdf.setFillColor(249, 247, 242);
    pdf.rect(margin, y, pageWidth - margin * 2, 55, 'F');
    let actionY = y + 8;
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(11);
    pdf.text('PASOS DE ACCIÓN INMEDIATA', margin + 10, actionY);
    actionY += 8;
    pdf.setTextColor(45, 41, 38);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    
    const actionSteps = (analysis.guide_steps && analysis.guide_steps.length > 0)
        ? analysis.guide_steps
        : pillars.map(p => p.action).filter(a => a && a.trim() !== '');

    actionSteps.slice(0, 4).forEach((step: string, i: number) => {
        const stepLines = pdf.splitTextToSize(`${i + 1}. ${step}`, pageWidth - margin * 2 - 20);
        pdf.text(stepLines, margin + 10, actionY);
        actionY += (stepLines.length * 4.5) + 1.5;
    });

    y += 65;

    // Reflections Section - NEW!
    if (portalReflections) {
        pdf.setTextColor(140, 64, 5);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text('REFLEXIONES DE LOS PORTALES', margin, y);
        y += 8;
        
        pdf.setFont('helvetica', 'italic');
        pdf.setFontSize(8);
        const reflectionEntries = Object.entries(portalReflections);
        
        // Render 4 reflections in a simplified way
        const portalNames: Record<string, string> = {
            'portal1': 'Cierre',
            'portal2': 'Foco',
            'portal3': 'Poder',
            'portal4': 'Orden'
        };

        reflectionEntries.slice(0, 4).forEach(([id, text], idx) => {
            const label = `P${idx + 1} (${portalNames[id] || id}): `;
            const lines = pdf.splitTextToSize(label + `"${text}"`, pageWidth - margin * 2);
            pdf.setTextColor(184, 131, 90);
            pdf.setFont('helvetica', 'bolditalic');
            pdf.text(label, margin, y);
            
            pdf.setTextColor(80, 80, 80);
            pdf.setFont('helvetica', 'italic');
            const labelWidth = pdf.getTextWidth(label);
            pdf.text(pdf.splitTextToSize(`"${text}"`, pageWidth - margin * 2 - labelWidth), margin + labelWidth, y);
            
            y += (lines.length * 4) + 2;
        });
        y += 5;
    }

    // Manifesto Section
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(140, 64, 5);
    pdf.text('MI MANIFIESTO DE PODER:', margin, y);
    y += 7;
    pdf.setTextColor(45, 41, 38);
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(10);
    const manifestoLines = pdf.splitTextToSize(analysis.manifesto || 'No hay manifiesto disponible.', pageWidth - margin * 2);
    pdf.text(manifestoLines, margin, y);
    y += (manifestoLines.length * 5) + 12;

    // Release & Practice
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(140, 64, 5);
    pdf.text('SOBERANÍA SISTÉMICA / LO QUE SUELTO:', margin, y);
    y += 5;
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(45, 41, 38);
    const releaseLines = pdf.splitTextToSize(analysis.release || 'Lo que ya no me pertenece.', pageWidth - margin * 2);
    pdf.text(releaseLines, margin, y);
    y += (releaseLines.length * 4.5) + 8;

    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(140, 64, 5);
    pdf.text('PRÁCTICA MAESTRA / HÁBITO:', margin, y);
    y += 5;
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(45, 41, 38);
    const practiceLines = pdf.splitTextToSize(analysis.practice || 'Mi ritual de orden diario.', pageWidth - margin * 2);
    pdf.text(practiceLines, margin, y);

    addFooter(3, 3);

    return Buffer.from(pdf.output('arraybuffer'));
}

export async function generateSomaticPDF(name: string, analysis: any, stressResult: any, reflection: string) {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const isMale = false;

    // Background Cream
    pdf.setFillColor(245, 239, 230);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Header Line
    pdf.setDrawColor(140, 64, 5);
    pdf.setLineWidth(0.5);
    pdf.line(margin, 25, pageWidth - margin, 25);

    let y = 45;
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Diagnóstico Somático', margin, y);
    
    y += 10;
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'italic');
    pdf.text(`Consultante: ${name}`, margin, y);
    
    y += 20;
    // Analysis Card
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(margin, y, pageWidth - margin * 2, 85, 5, 5, 'F');
    
    let innerY = y + 12;
    pdf.setTextColor(184, 131, 90);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('AUDITORÍA DE TU BIOLOGÍA', margin + 10, innerY);
    
    innerY += 10;
    pdf.setTextColor(45, 41, 38);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'italic');
    const analysisLines = pdf.splitTextToSize(`"${analysis.personalized_analysis}"`, pageWidth - margin * 2 - 20);
    pdf.text(analysisLines, margin + 10, innerY);
    
    y += 100;
    // Insight
    pdf.setFillColor(253, 251, 247);
    pdf.roundedRect(margin, y, pageWidth - margin * 2, 45, 5, 5, 'F');
    innerY = y + 10;
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.text('INSIGHT SOMÁTICO', margin + 10, innerY);
    innerY += 8;
    pdf.setTextColor(60, 60, 60);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const insightLines = pdf.splitTextToSize(analysis.somatic_insight, pageWidth - margin * 2 - 20);
    pdf.text(insightLines, margin + 10, innerY);

    y += 55;
    // Action Step (Dark Box)
    pdf.setFillColor(45, 41, 38);
    pdf.roundedRect(margin, y, pageWidth - margin * 2, 45, 5, 5, 'F');
    innerY = y + 15;
    pdf.setTextColor(184, 131, 90);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TU PRIMER PASO DE REGULACIÓN', pageWidth / 2, innerY, { align: 'center' });
    innerY += 12;
    pdf.setTextColor(245, 239, 230);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    const actionLines = pdf.splitTextToSize(analysis.action_step, pageWidth - margin * 2 - 30);
    pdf.text(actionLines, pageWidth / 2, innerY, { align: 'center' });

    // Footer
    const pgNum = 1;
    pdf.setFontSize(8);
    pdf.setTextColor(184, 131, 90);
    pdf.text(`PÁGINA 0${pgNum}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
    pdf.text('YELITZE RANGEL • Arquitectura Intencional de Vida • 2026', margin, pageHeight - 10);

    return Buffer.from(pdf.output('arraybuffer'));
}

