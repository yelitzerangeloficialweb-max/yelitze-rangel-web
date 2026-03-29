import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateSomaticPDF, generateVisionBoardPDF } from '@/lib/pdf-generator';
import { buildVisionBoardPDFInput } from '@/lib/vision-board-utils';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const result = await db.testResult.findUnique({ where: { id } });

        if (!result) {
            return new NextResponse('Test Result not found', { status: 404 });
        }

        let parsedAnswers: any = {};
        try {
            parsedAnswers = JSON.parse(result.answers);
        } catch (e) {
            console.error('Error parsing answers for PDF download', e);
        }

        let pdfBuffer: Buffer | null = null;
        let filename = 'documento.pdf';

        if (result.testTitle.includes('Somático')) {
            const analysis = result.aiAnalysis;
            const aiData = analysis.startsWith('{') ? JSON.parse(analysis) : {
                personalized_analysis: analysis,
                somatic_insight: 'Mi cuerpo ya puede soltar lo que no es mío.',
                action_step: 'Respiración de transición diaria.',
                venezuela_connection: 'Únete a nuestro programa presencial.'
            };
            pdfBuffer = await generateSomaticPDF(
                result.userName || 'Explorador/a',
                aiData,
                parsedAnswers.stressResult || { type: 'ACTIVACIÓN MEDIA', desc: 'Respuesta adaptativa general' },
                parsedAnswers.reflection || 'Mi cuerpo está hablando.'
            );
            filename = `Somatico_${result.userName?.replace(/\s/g, '_') || 'Explorador'}.pdf`;
        } else if (result.testTitle.includes('Arquitectura')) {
            const analysis = result.aiAnalysis;
            const aiData = analysis.startsWith('{') ? JSON.parse(analysis) : {
                release: 'Patrones limitantes.',
                identity: 'La Arquitecta de tu Realidad.',
                practice: 'Observación diaria.',
                manifesto: 'Declaro mi soberanía.',
                guide_steps: ['Paso 1: Respira', 'Paso 2: Observa', 'Paso 3: Actúa']
            };
            const input = buildVisionBoardPDFInput({
                name: result.userName || 'Arquitecta',
                gender: parsedAnswers.userGender || 'mujer',
                analysis: aiData,
                pillars: parsedAnswers.pillars || [],
                reflections: parsedAnswers.reflections || {}
            });
            pdfBuffer = await generateVisionBoardPDF(input);
            filename = `Arquitectura_${result.userName?.replace(/\s/g, '_') || 'Vida'}.pdf`;
        } else {
            return new NextResponse('Invalid test type for PDF', { status: 400 });
        }

        if (!pdfBuffer) {
            return new NextResponse('Error generating PDF', { status: 500 });
        }

        return new NextResponse(pdfBuffer as unknown as BodyInit, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`
            }
        });

    } catch (error) {
        console.error('PDF Generation API Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
