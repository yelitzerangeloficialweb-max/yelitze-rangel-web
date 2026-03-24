/**
 * Vision Board — pure data types, label maps, and input builder.
 *
 * This module has ZERO side-effect imports (no jsPDF, no fs) so it can be
 * imported directly in unit tests without mocking anything.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PillarInput {
    id: string;
    title: string;
    label: string;       // uppercase PDF grid label resolved from PILLAR_LABELS
    intention: string;
    direction: string;
    action: string;
    images: string[];
}

export interface PortalReflection {
    id: string;          // e.g. "portal1"
    label: string;       // display name resolved from PORTAL_LABELS
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

// ---------------------------------------------------------------------------
// Label maps — single source of truth
// ---------------------------------------------------------------------------

/**
 * Maps pillar IDs (as stored in the DB / form state) to their uppercase grid
 * labels used in the PDF. Add a new entry here when adding a new pillar step.
 */
export const PILLAR_LABELS: Record<string, string> = {
    '1': 'PROPÓSITO',
    '2': 'RECURSOS',
    '3': 'VÍNCULOS',
    '4': 'EXPANSIÓN',
    '5': 'VITALIDAD',
};

/**
 * Maps portal IDs (as stored in the DB / form state) to their display names.
 * Add a new entry here when adding a new PortalNStep UI component.
 */
export const PORTAL_LABELS: Record<string, string> = {
    portal1: 'Cierre',
    portal2: 'Foco',
    portal3: 'Poder',
    portal4: 'Orden',
};

// ---------------------------------------------------------------------------
// Builder — transforms raw API payload → VisionBoardPDFInput
// ---------------------------------------------------------------------------

interface RawPillar {
    id: string;
    title: string;
    intention: string;
    direction: string;
    action: string;
    images: string[];
}

/**
 * Converts the raw pillars array and reflections record (as received from the
 * form / API) into the typed VisionBoardPDFInput consumed by generateVisionBoardPDF.
 *
 * Label resolution order:
 *   pillar  → PILLAR_LABELS[id]  ?? pillar.title.toUpperCase()
 *   portal  → PORTAL_LABELS[id]  ?? id   (raw key as fallback)
 */
export function buildVisionBoardPDFInput(params: {
    name: string;
    gender: string;
    analysis: BoardAnalysis;
    pillars: RawPillar[];
    reflections: Record<string, string>;
}): VisionBoardPDFInput {
    const { name, gender, analysis, pillars, reflections } = params;

    return {
        name,
        gender,
        analysis,
        pillars: pillars.map(p => ({
            ...p,
            label: PILLAR_LABELS[p.id] ?? p.title.toUpperCase(),
        })),
        portals: Object.entries(reflections).map(([id, text]) => ({
            id,
            label: PORTAL_LABELS[id] ?? id,
            text,
        })),
    };
}
