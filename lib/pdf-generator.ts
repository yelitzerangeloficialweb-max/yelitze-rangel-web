import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

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

/**
 * Loads a public asset as a base64 data URL for use in jsPDF.
 * Returns null if the file cannot be read (e.g. in CI/test environments).
 */
function loadImageAsBase64(relativePath: string): string | null {
    try {
        const fullPath = path.join(process.cwd(), 'public', relativePath);
        const buffer = fs.readFileSync(fullPath);
        const ext = path.extname(relativePath).slice(1).toLowerCase();
        const mime = (ext === 'jpg' || ext === 'jpeg') ? 'jpeg' : 'png';
        return `data:image/${mime};base64,${buffer.toString('base64')}`;
    } catch {
        return null;
    }
}

// ---------------------------------------------------------------------------

export async function generateVisionBoardPDF(input: VisionBoardPDFInput) {
    const { name, gender, analysis, pillars, portals } = input;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const isMale = gender === 'hombre';
    let y = 30;

    const logoData = loadImageAsBase64('assets/images/logo-color.png');
    const watermarkData = loadImageAsBase64('assets/images/watermark-logo.png');

    const addLogo = () => {
        if (!logoData) return;
        try { pdf.addImage(logoData, 'PNG', pageWidth - margin - 32, 7, 32, 11); } catch { /* skip */ }
    };

    const addWatermark = () => {
        if (!watermarkData) return;
        try {
            pdf.saveGraphicsState();
            pdf.setGState((pdf as any).GState({ opacity: 0.06 }));
            const sz = 110;
            pdf.addImage(watermarkData, 'PNG', (pageWidth - sz) / 2, (pageHeight - sz) / 2, sz, sz);
            pdf.restoreGraphicsState();
        } catch { /* skip if GState unsupported */ }
    };

    // Helper to add footer to every page
    const addFooter = (pageNum: number, totalPages: number) => {
        pdf.setFontSize(8);
        pdf.setTextColor(184, 131, 90);
        pdf.text(`PÁGINA 0${pageNum}/0${totalPages}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
        pdf.text('YELITZE RANGEL • Tu Coach Ancestral • 2026', margin, pageHeight - 10);
    };

    // --- PAGE 1: CARTA DE YELITZE ---
    pdf.setFillColor(249, 247, 242);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    addLogo();
    addWatermark();

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
    addLogo();
    addWatermark();

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
        pdf.setDrawColor(184, 131, 90);
        pdf.setLineWidth(0.3);
        pdf.rect(x, yPos, 50, 65, 'S');

        pdf.setFillColor(140, 64, 5);
        pdf.rect(x, yPos, 50, 5, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(6);
        pdf.text(label, x + 25, yPos + 3.5, { align: 'center' });

        pdf.setFillColor(249, 247, 242);
        pdf.rect(x + 5, yPos + 8, 40, 30, 'F');

        if (p.images && p.images.length > 0) {
            try {
                const imgData = p.images.length >= 4 ? p.images[3] : p.images[0];
                if (imgData.startsWith('data:image')) {
                    pdf.addImage(imgData, 'JPEG', x + 5, yPos + 8, 40, 30);
                }
            } catch { /* silently skip invalid image data */ }
        }
        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(45, 41, 38);
        const titleLines = pdf.splitTextToSize(p.title || '', 40);
        pdf.text(titleLines, x + 25, yPos + 45, { align: 'center' });

        pdf.setTextColor(140, 64, 5);
        pdf.setFontSize(6);
        const actionLines = pdf.splitTextToSize(p.action || '', 40);
        pdf.text(actionLines, x + 25, yPos + 58, { align: 'center' });
    };

    const centerX = pageWidth / 2;
    const centerY = pageHeight / 2;

    if (pillars[0]) renderPillarBox(pillars[0], centerX - 25, 50, pillars[0].label);
    if (pillars[1]) renderPillarBox(pillars[1], margin, centerY - 32.5, pillars[1].label);

    // Central Circle Identity
    pdf.setFillColor(253, 251, 247);
    pdf.setDrawColor(184, 131, 90);
    pdf.setLineWidth(0.4);
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
    if (pillars[3]) renderPillarBox(pillars[3], margin + 15, pageHeight - 100, pillars[3].label);
    if (pillars[4]) renderPillarBox(pillars[4], pageWidth - margin - 65, pageHeight - 100, pillars[4].label);

    addFooter(2, 3);

    // --- PAGE 3: BITÁCORA ---
    pdf.addPage();
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    addLogo();
    addWatermark();

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

    // Actions Section
    pdf.setFillColor(249, 247, 242);
    pdf.rect(margin, y, pageWidth - margin * 2, 55, 'F');
    let actionY = y + 8;
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
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

        portals.slice(0, 6).forEach((portal, idx) => {
            const label = `P${idx + 1} (${portal.label}): `;
            const lines = pdf.splitTextToSize(label + `"${portal.text}"`, pageWidth - margin * 2);
            pdf.setTextColor(184, 131, 90);
            pdf.setFont('helvetica', 'bolditalic');
            pdf.setFontSize(8);
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
    const PAD = 8;            // inner box padding (compact)
    const TW  = CW - PAD * 2; // text width inside boxes = 154 mm

    // Calibrated line-height for jsPDF Helvetica
    const lh = (fs: number) => Math.ceil(fs * 0.41 * 10) / 10;

    const logoData      = loadImageAsBase64('assets/images/logo-yelitze-new.png');
    const logoWhiteData = loadImageAsBase64('assets/images/logo-white.png');
    const watermarkData = loadImageAsBase64('assets/images/watermark-logo.png');

    // ── Reusable page elements ──────────────────────────────────────────────

    const drawBackground = (warm = true) => {
        pdf.setFillColor(warm ? 249 : 253, warm ? 247 : 251, warm ? 242 : 248);
        pdf.rect(0, 0, W, H, 'F');
    };

    const drawWatermark = () => {
        if (!watermarkData) return;
        try {
            pdf.saveGraphicsState();
            pdf.setGState((pdf as any).GState({ opacity: 0.07 }));
            const sz = 110;
            pdf.addImage(watermarkData, 'PNG', (W - sz) / 2, (H - sz) / 2, sz, sz);
            pdf.restoreGraphicsState();
        } catch { /* skip if GState unsupported */ }
    };

    // Dark branded band at page top (height = bandH mm)
    // Uses the full script text logo (logo-yelitze-new.png, ~3:1 ratio) centered in the band.
    const drawDarkBand = (bandH: number, subtitle: string) => {
        pdf.setFillColor(35, 25, 22);
        pdf.rect(0, 0, W, bandH, 'F');

        // Full text logo centered — try color version first (dark bg makes it visible)
        const logoSrc = logoData || logoWhiteData;
        if (logoSrc) {
            const logoW = 58;   // mm — wide enough for script text
            const logoH = 19;   // mm — 3:1 ratio
            try {
                pdf.addImage(logoSrc, 'PNG', (W - logoW) / 2, (bandH - logoH) / 2 - 3, logoW, logoH);
            } catch { /* skip */ }
        }

        pdf.setTextColor(184, 131, 90);
        pdf.setFontSize(6.5);
        pdf.setFont('helvetica', 'bold');
        pdf.text(subtitle, W / 2, bandH - 5, { align: 'center' });

        // Gold accent line at bottom of band
        pdf.setFillColor(184, 131, 90);
        pdf.rect(0, bandH, W, 1.2, 'F');
    };

    const drawFooter = (label: string) => {
        pdf.setFontSize(7);
        pdf.setTextColor(184, 131, 90);
        pdf.setFont('helvetica', 'normal');
        pdf.text('yelitzerangeloficial.com  \u2022  2026', M, H - 8);
        pdf.text(label, W - M, H - 8, { align: 'right' });
    };

    const accentBar = (color: [number, number, number], boxY: number, boxH: number) => {
        pdf.setFillColor(color[0], color[1], color[2]);
        pdf.rect(M, boxY, 3, boxH, 'F');
    };

    // ── PAGE 1: CARTA DE YELITZE ─────────────────────────────────────────────

    drawBackground(true);
    drawWatermark();

    const BAND_H = 38;
    drawDarkBand(BAND_H, 'TU COACH ANCESTRAL');

    let y = BAND_H + 14;

    // Two-line greeting: small copper label, then large serif name
    // Gap must clear the 36pt ascender (~9mm above baseline) so they don't overlap.
    const firstName = name.split(' ')[0];
    pdf.setTextColor(184, 131, 90);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'italic');
    pdf.text('Hola,', M, y);
    y += 15;  // enough space: cap-height(11pt≈3mm) + gap(3mm) + ascender(36pt≈9mm)

    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(36);
    pdf.setFont('times', 'bolditalic');
    pdf.text(`${firstName}.`, M, y);
    y += lh(36) + 6;

    // Thin copper rule
    pdf.setFillColor(184, 131, 90);
    pdf.rect(M, y, 72, 0.7, 'F');
    y += 9;

    // Body paragraphs
    const stressTypeName = stressResult?.type || 'activación del sistema nervioso';
    const bodyParas = [
        `Has completado un acto de valentía real: detenerte a escuchar a tu propio cuerpo. Lo que encontré en tus respuestas no es casualidad ni debilidad —es la huella de un sistema nervioso que ha estado operando desde el estado de ${stressTypeName}.`,
        'El cuerpo no miente. Lleva la memoria exacta de cada emoción que no pudo ser procesada, de cada momento en que el entorno te exigió más de lo que tenías. Esta inteligencia biológica que construiste te protegió. Y hoy comenzamos el proceso de actualizarla.',
        'Lo que encontrarás en estas páginas no son técnicas frías —son conversaciones respetuosas con tu sistema nervioso. Prácticas que le dicen a tu cuerpo, con cada repetición: el peligro ya pasó, ahora hay espacio para vivir desde otro lugar.',
        'Este no es el final de un test. Es el primer movimiento consciente de tu nueva arquitectura corporal.',
    ];

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10.5);
    pdf.setTextColor(65, 58, 52);
    for (const para of bodyParas) {
        const lines = pdf.splitTextToSize(para, CW);
        pdf.text(lines, M, y);
        y += lines.length * lh(10.5) + 5;
    }

    // Quote card (rounded rect with left accent, like the email template)
    y += 2;
    const quoteText = '\u201CEl cuerpo que se regula, crea. El cuerpo que se libera, trasciende.\u201D';
    const quoteLines = pdf.splitTextToSize(quoteText, CW - 20);
    const qPAD = 10;
    const quoteBoxH = qPAD + quoteLines.length * lh(13) + qPAD;

    pdf.setFillColor(246, 240, 233);
    pdf.roundedRect(M, y, CW, quoteBoxH, 5, 5, 'F');
    pdf.setFillColor(140, 64, 5);
    pdf.rect(M, y, 3.5, quoteBoxH, 'F');

    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(13);
    pdf.setFont('times', 'italic');
    pdf.text(quoteLines, M + 11, y + qPAD);
    y += quoteBoxH + 12;

    // Signature block
    pdf.setTextColor(184, 131, 90);
    pdf.setFontSize(9.5);
    pdf.setFont('helvetica', 'italic');
    pdf.text('Con amor y certeza,', M, y);
    y += lh(9.5) + 5;

    pdf.setFillColor(184, 131, 90);
    pdf.rect(M, y, 54, 0.5, 'F');
    y += 6;

    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(20);
    pdf.setFont('times', 'italic');
    pdf.text('Yelitze Rangel', M, y);
    y += lh(20) + 2;

    pdf.setTextColor(184, 131, 90);
    pdf.setFontSize(8.5);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Tu Coach Ancestral', M, y);

    drawFooter('Carta de Yelitze  \u2022  01 / 02');

    // ── PAGE 2: DIAGNÓSTICO SOMÁTICO ──────────────────────────────────────────

    pdf.addPage();
    drawBackground(false);
    drawWatermark();

    const BAND2_H = 24;
    drawDarkBand(BAND2_H, 'DIAGN\u00D3STICO SOM\u00C1TICO');

    y = BAND2_H + 10;

    // Page subtitle
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(10);
    pdf.setFont('times', 'italic');
    pdf.text(`An\u00E1lisis de ${name}`, M, y);
    y += lh(10) + 6;

    // ── BOX 1: Estado de supervivencia ─────────────────────────────────────

    const stressTypeLines = pdf.splitTextToSize(stressResult?.type || '', TW - 10);
    const stressDescLines = pdf.splitTextToSize(stressResult?.desc || '', TW);
    const box1H = PAD
        + lh(7) + 3
        + stressTypeLines.length * lh(17) + 3
        + stressDescLines.length * lh(9.5)
        + PAD;

    pdf.setFillColor(237, 231, 224);
    pdf.roundedRect(M, y, CW, box1H, 4, 4, 'F');
    accentBar([140, 64, 5], y, box1H);

    // Watermark number
    pdf.setTextColor(218, 205, 192);
    pdf.setFontSize(40);
    pdf.setFont('helvetica', 'bold');
    pdf.text('01', M + CW - 5, y + box1H - 3, { align: 'right' });

    let iy = y + PAD;
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ANTES / ESTADO DE SUPERVIVENCIA', M + PAD, iy);
    iy += lh(7) + 3;

    pdf.setFontSize(17);
    pdf.text(stressTypeLines, M + PAD, iy);
    iy += stressTypeLines.length * lh(17) + 3;

    pdf.setTextColor(65, 58, 52);
    pdf.setFontSize(9.5);
    pdf.setFont('helvetica', 'normal');
    pdf.text(stressDescLines, M + PAD, iy);

    y += box1H + 5;

    // ── BOX 2: Análisis personalizado ──────────────────────────────────────

    const analysisLines = pdf.splitTextToSize(analysis?.personalized_analysis || '', TW);
    const box2H = PAD + lh(8) + 4 + analysisLines.length * lh(10) + PAD;

    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(M, y, CW, box2H, 4, 4, 'F');
    accentBar([184, 131, 90], y, box2H);

    iy = y + PAD;
    pdf.setTextColor(184, 131, 90);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text('AUDITOR\u00CDA DE TU BIOLOG\u00CDA', M + PAD, iy);
    iy += lh(8) + 4;

    pdf.setTextColor(45, 41, 38);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'italic');
    pdf.text(analysisLines, M + PAD, iy);

    y += box2H + 5;

    // ── BOX 3: Insight somático ─────────────────────────────────────────────

    const insightLines = pdf.splitTextToSize(`\u201C${analysis?.somatic_insight || ''}\u201D`, TW);
    const box3H = PAD + lh(8) + 4 + insightLines.length * lh(11) + PAD;

    pdf.setFillColor(246, 240, 233);
    pdf.roundedRect(M, y, CW, box3H, 4, 4, 'F');
    accentBar([140, 64, 5], y, box3H);

    iy = y + PAD;
    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text('INSIGHT SOM\u00C1TICO', M + PAD, iy);
    iy += lh(8) + 4;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bolditalic');
    pdf.text(insightLines, M + PAD, iy);

    y += box3H + 5;

    // ── BOX 4: Paso de acción ───────────────────────────────────────────────

    const actionLines = pdf.splitTextToSize(analysis?.action_step || '', TW);
    const box4H = PAD + lh(7) + 4 + actionLines.length * lh(11) + PAD;

    pdf.setFillColor(35, 31, 28);
    pdf.roundedRect(M, y, CW, box4H, 4, 4, 'F');
    accentBar([184, 131, 90], y, box4H);

    // Watermark number
    pdf.setTextColor(55, 50, 46);
    pdf.setFontSize(40);
    pdf.setFont('helvetica', 'bold');
    pdf.text('02', M + CW - 5, y + box4H - 3, { align: 'right' });

    iy = y + PAD;
    pdf.setTextColor(184, 131, 90);
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'bold');
    pdf.text('DESPU\u00C9S / ARQUITECTURA INTENCIONAL', M + PAD, iy);
    iy += lh(7) + 4;

    pdf.setTextColor(249, 247, 242);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text(actionLines, M + PAD, iy);

    y += box4H + 8;

    // ── RECURSOS (compact) ──────────────────────────────────────────────────

    pdf.setTextColor(140, 64, 5);
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'bold');
    pdf.text('RECURSOS DE SOSTENIMIENTO DIARIO:', M, y);
    y += lh(7) + 3;

    const resources = ['Vibración', 'Mirada perif\u00E9rica', 'Voz (VOO)', 'Respiraci\u00F3n lenta (4:6)'];
    resources.forEach((res, i) => {
        const xPos = M + i * (CW / 4);
        pdf.setFillColor(184, 131, 90);
        pdf.circle(xPos + 2, y - 1.2, 1, 'F');
        pdf.setTextColor(65, 58, 52);
        pdf.setFontSize(8.5);
        pdf.setFont('helvetica', 'normal');
        pdf.text(res, xPos + 5, y);
    });
    y += lh(8.5) + 8;

    // ── REFLEXIÓN (if provided, compact) ────────────────────────────────────

    if (reflection && reflection.trim().length > 10) {
        const refLines = pdf.splitTextToSize(`\u201C${reflection}\u201D`, CW).slice(0, 3);
        pdf.setDrawColor(210, 195, 178);
        pdf.setLineWidth(0.3);
        pdf.line(M, y, W - M, y);
        y += 5;
        pdf.setTextColor(80, 70, 65);
        pdf.setFontSize(8.5);
        pdf.setFont('helvetica', 'italic');
        pdf.text(refLines, M, y);
        y += refLines.length * lh(8.5) + 6;
    }

    // ── FIRMA ────────────────────────────────────────────────────────────────

    const sigY = H - 42;
    if (y + 15 < sigY) {
        pdf.setDrawColor(210, 195, 178);
        pdf.setLineWidth(0.3);
        pdf.line(M, sigY - 4, M + 45, sigY - 4);

        pdf.setTextColor(140, 64, 5);
        pdf.setFontSize(13);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Yelitze Rangel', M, sigY);

        pdf.setTextColor(184, 131, 90);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'italic');
        pdf.text('Tu Coach Ancestral', M, sigY + lh(13) + 1);
    }

    // ── CTA BUTTON ────────────────────────────────────────────────────────────

    const VEC_URL  = 'https://yelitzerangeloficial.com/venezuela-en-el-cuerpo';
    const btnW     = 140;
    const btnH     = 10;
    const btnX     = (W - btnW) / 2;
    const btnY     = H - 30;
    const btnLabel = '\u00BFLISTA PARA PROFUNDIZAR? \u2192  VENEZUELA EN EL CUERPO';

    // Button fill (brand accent)
    pdf.setFillColor(140, 64, 5);
    pdf.roundedRect(btnX, btnY, btnW, btnH, 3, 3, 'F');

    // Button text
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(7.5);
    pdf.setFont('helvetica', 'bold');
    pdf.text(btnLabel, W / 2, btnY + 6.5, { align: 'center' });

    // Clickable link area over the button
    pdf.link(btnX, btnY, btnW, btnH, { url: VEC_URL });

    drawFooter('Diagn\u00F3stico Som\u00E1tico  \u2022  02 / 02');

    return Buffer.from(pdf.output('arraybuffer'));
}
