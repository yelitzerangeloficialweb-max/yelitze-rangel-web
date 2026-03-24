import { describe, it, expect } from 'vitest';
import {
    buildVisionBoardPDFInput,
    PILLAR_LABELS,
    PORTAL_LABELS,
} from '../lib/vision-board-utils';

// ---------------------------------------------------------------------------
// PILLAR_LABELS
// ---------------------------------------------------------------------------

describe('PILLAR_LABELS', () => {
    it('has entries for all 5 pillars', () => {
        expect(Object.keys(PILLAR_LABELS)).toHaveLength(5);
    });

    it('maps pillar id "1" to PROPÓSITO', () => {
        expect(PILLAR_LABELS['1']).toBe('PROPÓSITO');
    });

    it('maps all pillar ids to uppercase strings', () => {
        for (const label of Object.values(PILLAR_LABELS)) {
            expect(label).toBe(label.toUpperCase());
        }
    });
});

// ---------------------------------------------------------------------------
// PORTAL_LABELS
// ---------------------------------------------------------------------------

describe('PORTAL_LABELS', () => {
    it('has entries for all 4 portals', () => {
        expect(Object.keys(PORTAL_LABELS)).toHaveLength(4);
    });

    it('maps portal1 → Cierre, portal2 → Foco, portal3 → Poder, portal4 → Orden', () => {
        expect(PORTAL_LABELS['portal1']).toBe('Cierre');
        expect(PORTAL_LABELS['portal2']).toBe('Foco');
        expect(PORTAL_LABELS['portal3']).toBe('Poder');
        expect(PORTAL_LABELS['portal4']).toBe('Orden');
    });
});

// ---------------------------------------------------------------------------
// buildVisionBoardPDFInput
// ---------------------------------------------------------------------------

const BASE_PILLARS = [
    { id: '1', title: 'Propósito', intention: 'Mi norte', direction: 'Norte', action: 'Meditar', images: [] },
    { id: '2', title: 'Recursos', intention: 'Abundancia', direction: 'Sur', action: 'Ahorrar', images: [] },
];

const BASE_REFLECTIONS: Record<string, string> = {
    portal1: 'Lo que suelto',
    portal2: 'Mi foco principal',
};

const BASE_ANALYSIS = {
    release: 'La lealtad al sacrificio',
    identity: 'La Arquitecta Soberana',
    practice: 'Diseña tu semana cada domingo',
};

describe('buildVisionBoardPDFInput', () => {
    it('passes name, gender, and analysis through unchanged', () => {
        const result = buildVisionBoardPDFInput({
            name: 'María',
            gender: 'mujer',
            analysis: BASE_ANALYSIS,
            pillars: BASE_PILLARS,
            reflections: BASE_REFLECTIONS,
        });
        expect(result.name).toBe('María');
        expect(result.gender).toBe('mujer');
        expect(result.analysis).toBe(BASE_ANALYSIS);
    });

    it('resolves pillar label from PILLAR_LABELS when id is known', () => {
        const result = buildVisionBoardPDFInput({
            name: 'Test',
            gender: 'mujer',
            analysis: BASE_ANALYSIS,
            pillars: BASE_PILLARS,
            reflections: {},
        });
        expect(result.pillars[0].label).toBe('PROPÓSITO');
        expect(result.pillars[1].label).toBe('RECURSOS');
    });

    it('falls back to pillar title uppercased when id is unknown', () => {
        const result = buildVisionBoardPDFInput({
            name: 'Test',
            gender: 'mujer',
            analysis: BASE_ANALYSIS,
            pillars: [{ id: '99', title: 'Custom', intention: '', direction: '', action: '', images: [] }],
            reflections: {},
        });
        expect(result.pillars[0].label).toBe('CUSTOM');
    });

    it('preserves all other pillar fields unchanged', () => {
        const result = buildVisionBoardPDFInput({
            name: 'Test',
            gender: 'mujer',
            analysis: BASE_ANALYSIS,
            pillars: BASE_PILLARS,
            reflections: {},
        });
        const p = result.pillars[0];
        expect(p.id).toBe('1');
        expect(p.title).toBe('Propósito');
        expect(p.intention).toBe('Mi norte');
        expect(p.images).toEqual([]);
    });

    it('converts reflections record to PortalReflection array with correct labels', () => {
        const result = buildVisionBoardPDFInput({
            name: 'Test',
            gender: 'mujer',
            analysis: BASE_ANALYSIS,
            pillars: [],
            reflections: BASE_REFLECTIONS,
        });
        expect(result.portals).toHaveLength(2);
        const cierre = result.portals.find(p => p.id === 'portal1')!;
        expect(cierre.label).toBe('Cierre');
        expect(cierre.text).toBe('Lo que suelto');
    });

    it('falls back to raw portal id when portal key is unknown', () => {
        const result = buildVisionBoardPDFInput({
            name: 'Test',
            gender: 'mujer',
            analysis: BASE_ANALYSIS,
            pillars: [],
            reflections: { portalX: 'texto libre' },
        });
        expect(result.portals[0].label).toBe('portalX');
        expect(result.portals[0].text).toBe('texto libre');
    });

    it('returns empty pillars and portals arrays when inputs are empty', () => {
        const result = buildVisionBoardPDFInput({
            name: 'Test',
            gender: 'mujer',
            analysis: BASE_ANALYSIS,
            pillars: [],
            reflections: {},
        });
        expect(result.pillars).toEqual([]);
        expect(result.portals).toEqual([]);
    });

    it('handles all 5 pillars in correct order', () => {
        const allPillars = ['1', '2', '3', '4', '5'].map(id => ({
            id, title: `Pilar ${id}`, intention: '', direction: '', action: '', images: [],
        }));
        const result = buildVisionBoardPDFInput({
            name: 'Test',
            gender: 'mujer',
            analysis: BASE_ANALYSIS,
            pillars: allPillars,
            reflections: {},
        });
        const labels = result.pillars.map(p => p.label);
        expect(labels).toEqual(['PROPÓSITO', 'RECURSOS', 'VÍNCULOS', 'EXPANSIÓN', 'VITALIDAD']);
    });

    it('handles all 4 portals', () => {
        const allPortals: Record<string, string> = {
            portal1: 'r1', portal2: 'r2', portal3: 'r3', portal4: 'r4',
        };
        const result = buildVisionBoardPDFInput({
            name: 'Test',
            gender: 'mujer',
            analysis: BASE_ANALYSIS,
            pillars: [],
            reflections: allPortals,
        });
        const labels = result.portals.map(p => p.label).sort();
        expect(labels).toEqual(['Cierre', 'Foco', 'Orden', 'Poder']);
    });
});
