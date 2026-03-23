import { jsPDF } from 'jspdf';

// ---------------------------------------------------------------------------
// Vision Board PDF — shared types & section config
// ---------------------------------------------------------------------------

export interface PillarInput {
    id: string;
    title: string;
    label: string;       // uppercase PDF grid label, e.g. "PROPÓSITO"
    intention: string;
    direction: string;
    action: string;
    images: string[];
}

export interface PortalReflection {
    id: string;          // e.g. "portal1"
    label: string;       // display name, e.g. "Cierre"
    text: string;        // the user's written reflection
}

export interface BoardAnalysis {
    release: string;
    identity: string;
    practice: string;
    manifesto?: string;
    guide_steps?: string[];
    cta_message?: string;
}

export interface VisionBoardPDFInput {
    name: string;
    gender: string;
    analysis: BoardAnalysis;
    pillars: PillarInput[];
    portals: PortalReflection[];
}

/**
 * Single source of truth for pillar grid labels.
 * Add a new entry here (and create the matching PillarsStep UI) to extend the board.
 */
export const PILLAR_LABELS: Record<string, string> = {
    '1': 'PROPÓSITO',
    '2': 'RECURSOS',
    '3': 'VÍNCULOS',
    '4': 'EXPANSIÓN',
    '5': 'VITALIDAD',
};

/**
 * Single source of truth for portal display names.
 * Add a new entry here (and create the matching PortalNStep UI) to extend the board.
 */
export const PORTAL_LABELS: Record<string, string> = {
    portal1: 'Cierre',
    portal2: 'Foco',
    portal3: 'Poder',
    portal4: 'Orden',
};

// ---------------------------------------------------------------------------

export async function generateVisionBoardPDF(input: VisionBoardPDFInput) {
    const { name, gender, analysis, pillars, portals } = input;
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
        pdf.text('YELITZE RANGEL • Tu Coach Ancestral • 2026', margin, pageHeight - 10);
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
        "Tu Coach Ancestral"
    ];

    letterText.forEach(paragraph => {
        if (paragraph === "YELITZE RANGEL") {
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(14);
            pdf.setTextColor(140, 64, 5);
        } else if (paragraph === "Tu Coach Ancestral") {
            pdf.setFont('helvetica', 'italic');
            pdf.setFontSize(10);
            pdf.setTextColor(184, 131, 90);
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
    const renderPillarBox = (p: PillarInput, x: number, yPos: number, label: string) => {
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
    if (pillars[0]) renderPillarBox(pillars[0], centerX - 25, 50, pillars[0].label);

    // Middle row
    if (pillars[1]) renderPillarBox(pillars[1], margin, centerY - 32.5, pillars[1].label);
    
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

    if (pillars[2]) renderPillarBox(pillars[2], pageWidth - margin - 50, centerY - 32.5, pillars[2].label);

    // Bottom row
    if (pillars[3]) renderPillarBox(pillars[3], margin + 15, pageHeight - 100, pillars[3].label);
    if (pillars[4]) renderPillarBox(pillars[4], pageWidth - margin - 65, pageHeight - 100, pillars[4].label);

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

    // Reflections Section
    if (portals.length > 0) {
        pdf.setTextColor(140, 64, 5);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text('REFLEXIONES DE LOS PORTALES', margin, y);
        y += 8;

        pdf.setFont('helvetica', 'italic');
        pdf.setFontSize(8);

        // slice(0, 6) so any future portals beyond 4 are included automatically
        portals.slice(0, 6).forEach((portal, idx) => {
            const label = `P${idx + 1} (${portal.label}): `;
            const lines = pdf.splitTextToSize(label + `"${portal.text}"`, pageWidth - margin * 2);
            pdf.setTextColor(184, 131, 90);
            pdf.setFont('helvetica', 'bolditalic');
            pdf.text(label, margin, y);

            pdf.setTextColor(80, 80, 80);
            pdf.setFont('helvetica', 'italic');
            const labelWidth = pdf.getTextWidth(label);
            pdf.text(pdf.splitTextToSize(`"${portal.text}"`, pageWidth - margin * 2 - labelWidth), margin + labelWidth, y);

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
    const W  = pdf.internal.pageSize.getWidth();   // 210 mm
    const H  = pdf.internal.pageSize.getHeight();  // 297 mm
    const M  = 20;           // margin
    const CW = W - M * 2;    // content width  = 170 mm
    const PAD = 12;           // inner box padding
    const TW  = CW - PAD * 2; // text width inside boxes = 146 mm

    // Calibrated line-height for jsPDF Helvetica (fs * 1.15 / 2.835)
    const lh = (fs: number) => Math.ceil(fs * 0.41 * 10) / 10;

    // ── Reusable page elements ──────────────────────────────────────────────

    const drawBackground = () => {
        pdf.setFillColor(249, 247, 242);
        pdf.rect(0, 0, W, H, 'F');
    };

    const drawHeader = () => {
        pdf.setDrawColor(140, 64, 5);
        pdf.setLineWidth(0.4);
        pdf.line(M, 18, W - M, 18);
        pdf.setTextColor(140, 64, 5);
        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'bold');
        pdf.text('YELITZE RANGEL | TU COACH ANCESTRAL', W / 2, 15, { align: 'center' });
    };

    const drawFooter = (label: string) => {
        pdf.setFontSize(7);
        pdf.setTextColor(184, 131, 90);
        pdf.setFont('helvetica', 'normal');
        pdf.text('YELITZE RANGEL • Tu Coach Ancestral • 2026', M, H - 8);
        pdf.text(label, W - M, H - 8, { align: 'right' });
    };

    // Returns updated y; adds a new page when remaining space < needed.
    // Footer reserve = 52 mm (signature + CTA + footer line).
    const checkPage = (needed: number, y: number, footerReserve = 52): number => {
        if (y + needed > H - footerReserve) {
            pdf.addPage();
            drawBackground();
            drawHeader();
            return 28;
        }
        return y;
    };

    // Accent bar on left edge of a box
    const accentBar = (color: [number, number, number], boxY: number, boxH: number) => {
        pdf.setFillColor(...color);
        pdf.rect(M, boxY, 3, boxH, 'F');
    };

    // ── PAGE 1 ──────────────────────────────────────────────────────────────

    drawBackground();
    drawHeader();

    let y = 28;

    // Title block
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(26);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Diagnóstico Somático', M, y);
    y += lh(26) + 2;

    pdf.setTextColor(184, 131, 90);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Análisis personalizado para ${name}`, M, y);
    y += lh(10) + 2;

    pdf.setDrawColor(184, 131, 90);
    pdf.setLineWidth(0.3);
    pdf.line(M, y, M + 55, y);
    y += 8;

    // ── BOX 1: Estado de supervivencia ─────────────────────────────────────

    const stressTypeLines = pdf.splitTextToSize(stressResult.type || '', TW - 15);
    const stressDescLines = pdf.splitTextToSize(stressResult.desc || '', TW);
    const box1H = PAD
        + lh(7) + 3           // label
        + stressTypeLines.length * lh(19) + 4  // big title
        + stressDescLines.length * lh(10)       // description
        + PAD;

    y = checkPage(box1H, y);
    pdf.setFillColor(237, 231, 224);
    pdf.roundedRect(M, y, CW, box1H, 5, 5, 'F');
    accentBar([140, 64, 5], y, box1H);

    // Watermark "01" — bottom-right, very subtle
    pdf.setTextColor(218, 205, 192);
    pdf.setFontSize(48);
    pdf.setFont('helvetica', 'bold');
    pdf.text('01', M + CW - 5, y + box1H - 3, { align: 'right' });

    let iy = y + PAD;
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ANTES / ESTADO DE SUPERVIVENCIA', M + PAD, iy);
    iy += lh(7) + 3;

    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(19);
    pdf.setFont('helvetica', 'bold');
    pdf.text(stressTypeLines, M + PAD, iy);
    iy += stressTypeLines.length * lh(19) + 4;

    pdf.setTextColor(65, 58, 52);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(stressDescLines, M + PAD, iy);

    y += box1H + 10;

    // ── BOX 2: Análisis personalizado ──────────────────────────────────────

    const analysisLines = pdf.splitTextToSize(analysis.personalized_analysis || '', TW);
    const box2H = PAD
        + lh(8) + 5           // label
        + analysisLines.length * lh(11)         // body
        + PAD;

    y = checkPage(box2H, y);
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(M, y, CW, box2H, 5, 5, 'F');
    accentBar([184, 131, 90], y, box2H);

    iy = y + PAD;
    pdf.setTextColor(184, 131, 90);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text('AUDITORÍA DE TU BIOLOGÍA', M + PAD, iy);
    iy += lh(8) + 5;

    pdf.setTextColor(45, 41, 38);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'italic');
    pdf.text(analysisLines, M + PAD, iy);

    y += box2H + 10;

    // ── BOX 3: Insight somático ─────────────────────────────────────────────

    const insightLines = pdf.splitTextToSize(`"${analysis.somatic_insight || ''}"`, TW);
    const box3H = PAD
        + lh(8) + 5           // label
        + insightLines.length * lh(12)          // quote
        + PAD;

    y = checkPage(box3H, y);
    pdf.setFillColor(246, 240, 233);
    pdf.roundedRect(M, y, CW, box3H, 5, 5, 'F');
    accentBar([140, 64, 5], y, box3H);

    iy = y + PAD;
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text('INSIGHT SOMÁTICO', M + PAD, iy);
    iy += lh(8) + 5;

    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bolditalic');
    pdf.text(insightLines, M + PAD, iy);

    y += box3H + 10;

    // ── BOX 4: Paso de acción ───────────────────────────────────────────────

    const actionLines = pdf.splitTextToSize(analysis.action_step || '', TW);
    const box4H = PAD
        + lh(7) + 6           // label
        + actionLines.length * lh(12)           // action text
        + PAD;

    y = checkPage(box4H, y);
    pdf.setFillColor(35, 31, 28);
    pdf.roundedRect(M, y, CW, box4H, 5, 5, 'F');
    accentBar([184, 131, 90], y, box4H);

    // Watermark "02"
    pdf.setTextColor(55, 50, 46);
    pdf.setFontSize(48);
    pdf.setFont('helvetica', 'bold');
    pdf.text('02', M + CW - 5, y + box4H - 3, { align: 'right' });

    iy = y + PAD;
    pdf.setTextColor(184, 131, 90);
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'bold');
    pdf.text('DESPUÉS / ARQUITECTURA INTENCIONAL', M + PAD, iy);
    iy += lh(7) + 6;

    pdf.setTextColor(249, 247, 242);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(actionLines, M + PAD, iy);

    y += box4H + 12;

    // ── SECCIÓN 5: Recursos diarios ─────────────────────────────────────────

    const exercises = [
        { t: 'Vibración',              d: 'Movimiento suave para liberar tensión acumulada en el cuerpo.' },
        { t: 'Mirada periférica',      d: 'Amplía tu campo visual para activar el sistema de calma.' },
        { t: 'Voz (VOO)',              d: 'Regula el nervio vago con sonido vibratorio sostenido.' },
        { t: 'Respiración lenta',      d: 'Inhala 4 tiempos, exhala 6. Activa el freno vagal.' },
    ];

    // Estimate height: title + 4 exercises (each ~2 lines max)
    const resourcesEstH = lh(8) + 6 + exercises.length * (lh(10) + lh(9) + 6);
    y = checkPage(resourcesEstH, y);

    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text('RECURSOS DE SOSTENIMIENTO DIARIO', M, y);
    y += lh(8) + 6;

    exercises.forEach(ex => {
        // Title bullet
        pdf.setFillColor(184, 131, 90);
        pdf.circle(M + 1.5, y - 1.5, 1, 'F');

        pdf.setTextColor(140, 64, 5);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(ex.t, M + 5, y);
        y += lh(10) + 1;

        // Description indented
        pdf.setTextColor(75, 68, 62);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        const descLines = pdf.splitTextToSize(ex.d, CW - 8);
        pdf.text(descLines, M + 5, y);
        y += descLines.length * lh(9) + 5;
    });

    // ── FIRMA ───────────────────────────────────────────────────────────────

    const sigY = H - 50;
    if (y + 20 < sigY) {
        pdf.setDrawColor(210, 195, 178);
        pdf.setLineWidth(0.3);
        pdf.line(M, sigY - 6, M + 50, sigY - 6);

        pdf.setTextColor(140, 64, 5);
        pdf.setFontSize(13);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Yelitze Rangel', M, sigY);

        pdf.setTextColor(184, 131, 90);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'italic');
        pdf.text('Tu Coach Ancestral', M, sigY + lh(13) + 1);
    }

    // ── CTA ─────────────────────────────────────────────────────────────────

    pdf.setDrawColor(184, 131, 90);
    pdf.setLineWidth(0.3);
    pdf.line(M, H - 28, W - M, H - 28);

    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text(
        '\u00BFLISTA PARA PROFUNDIZAR? \u00DANETE AL TOUR \u201CVENEZUELA EN EL CUERPO\u201D',
        W / 2, H - 20, { align: 'center' }
    );

    drawFooter('Diagnóstico Somático');

    // ── PÁGINA 2: Reflexión ──────────────────────────────────────────────────

    if (reflection && reflection.length > 10) {
        pdf.addPage();
        drawBackground();
        drawHeader();

        let ry = 30;
        pdf.setTextColor(140, 64, 5);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text('TU ESCUCHA PROFUNDA', M, ry);
        ry += lh(11) + 2;

        pdf.setDrawColor(184, 131, 90);
        pdf.setLineWidth(0.3);
        pdf.line(M, ry, M + 45, ry);
        ry += 8;

        pdf.setTextColor(65, 58, 52);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'italic');
        const refLines = pdf.splitTextToSize(reflection, CW);
        pdf.text(refLines, M, ry);

        drawFooter('Tu Reflexión');
    }

    return Buffer.from(pdf.output('arraybuffer'));
}
