import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendVisionBoardEmail } from '@/lib/mail';
import { generateVisionBoardPDF } from '@/lib/pdf-generator';
import { buildVisionBoardPDFInput } from '@/lib/vision-board-utils';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || ''
});

export const maxDuration = 60;

export async function POST(req: Request) {
    let resultId = null;
    try {
        if (!process.env.OPENAI_API_KEY) {
            console.error("Missing OPENAI_API_KEY");
            return NextResponse.json({
                release: "Tus dudas sobre tu propio potencial.",
                identity: "La Arquitecta Soberana de tu realidad.",
                practice: "La auto-observación diaria sin juicio.",
                guide_steps: [
                    "Presencia: Identifica 3 momentos del día donde pierdes tu centro.",
                    "Orden: Organiza tu agenda priorizando tu energía vital primero.",
                    "Decreto: Repite tu manifiesto frente al espejo cada mañana."
                ],
                error: "Config Error"
            }, { status: 200 });
        }

        const { reflections, pillars, userName, userEmail, userGender } = await req.json();

        // 1. SAVE TO DATABASE IMMEDIATELY
        try {
            const saved = await db.testResult.create({
                data: {
                    testTitle: "Arquitectura de Vida",
                    score: 0,
                    maxScore: 0,
                    answers: JSON.stringify({ reflections, pillars, userGender }),
                    aiAnalysis: "Analizando con GPT...",
                    userName: userName || null,
                    userEmail: userEmail || null
                }
            });
            resultId = saved.id;
        } catch (dbError: any) {
            console.error("DB SAVE ERROR:", dbError.message);
        }

        const pillarsText = pillars.map((p: any) =>
            `- ${p.title}: Intención="${p.intention}", Dirección="${p.direction}", Acción Propuesta="${p.action}"`
        ).join('\n');

        const reflectionsText = Object.entries(reflections).map(([k, v]) =>
            `- Portal ${k}: "${v}"`
        ).join('\n');

        const prompt = `
        Actúa como **Yelitzé Rangel**: Coach Ancestral, consteladora familiar y creadora del sistema "Arquitectura de Vida".

        **IDENTIDAD Y VOZ:**
        - Tu metodología une el orden sistémico-familiar con el diseño intencional de vida. No eres coaching motivacional.
        - Frase raíz: "No es magia, es orden. Restaura el orden y el equilibrio llega por añadidura."
        - Vocabulario obligatorio: lealtades invisibles, orden sistémico, soberanía, energía vital, linaje, diseño del alma, anclaje.
        - Tono: Autoridad Amorosa. Directa, sin rodeos. Poética pero concreta.
        - Género: ${userGender === 'hombre' ? 'Usa "Arquitecto" y lenguaje masculino.' : 'Usa "Arquitecta" y lenguaje femenino.'} Nunca lenguaje neutro si el género es claro.
        - **PROHIBIDO:** Lenguaje motivacional vacío, afirmaciones genéricas de autoayuda, frases como "¡confía en ti!" o "¡lo mereces todo!".

        **CONTEXTO DE ${userName}:**
        Reflexiones por Portal:
        ${reflectionsText}

        Pilares y visión construida:
        ${pillarsText}

        **TU MISIÓN:** Diagnostica el patrón sistémico (lealtad invisible, mandato de linaje o creencia estructural) que ha impedido la manifestación. Diseña la arquitectura de orden para 2026.

        **RESPONDE ÚNICAMENTE CON UN JSON VÁLIDO:**
        {
          "release": "El patrón sistémico específico que debe soltar: un mandato de linaje, una lealtad invisible o una creencia estructural. No una emoción genérica. Ej: 'La lealtad inconsciente al sacrificio de tu linaje materno.' (máx 15 palabras)",
          "identity": "Su nuevo arquetipo de poder con el género correcto. Ej: 'La Arquitecta Soberana de su realidad.' o 'El Arquitecto del Orden Ancestral.' (máx 10 palabras)",
          "practice": "Un ritual de orden concreto: acción semanal anclada en su cuerpo o espacio físico, no una afirmación. Ej: 'Diseña tu semana cada domingo priorizando tu energía vital primero.' (máx 15 palabras)",
          "manifesto": "Declaración de poder en PRIMERA PERSONA y TIEMPO PRESENTE que integre sus pilares y portales. Que resuene como un cimiento, no como una afirmación de autoayuda. Debe empezar con 'Yo, [nombre]...' o 'Desde mi soberanía...'. (máx 30 palabras)",
          "guide_steps": ["[Nombre del paso — verbo de acción]: descripción específica de qué hacer esta semana, cómo y para qué sistémicamente", "[Nombre del paso 2]: ...", "[Nombre del paso 3]: ..."],
          "cta_message": "Invitación a trabajar con Yelitzé conectada con el patrón específico que detectaste. Natural, no publicitaria. (máx 20 palabras)"
        }
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Eres Yelitzé Rangel. Responde siempre en JSON." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }
        });

        const analysisText = response.choices[0].message.content || '{}';
        const analysisObj = JSON.parse(analysisText);

        if (resultId) {
            await db.testResult.update({
                where: { id: resultId },
                data: { aiAnalysis: analysisText }
            });
        }

        // 3. TRIGGER PDF GENERATION AND EMAIL
        if (userEmail && userName) {
            try {
                console.log(`[Vision Board] Starting PDF/Email for ${userEmail}...`);
                const pdfInput = buildVisionBoardPDFInput({
                    name: userName,
                    gender: userGender,
                    analysis: analysisObj,
                    pillars: pillars as any[],
                    reflections: reflections as Record<string, string>,
                });
                
                const { generateVisionBoardPDF } = await import('@/lib/pdf-generator');
                const pdfBuffer = await generateVisionBoardPDF(pdfInput);
                
                const mailRes = await sendVisionBoardEmail({
                    email: userEmail,
                    name: userName,
                    analysis: analysisObj,
                    pdfBuffer
                });
                console.log('[Vision Board Mail] Result:', mailRes.success ? 'Success' : 'Failed', mailRes.error || '');
            } catch (emailError) {
                console.error("[Vision Board Mail] error:", emailError);
            }
        }

        return NextResponse.json(analysisObj);

    } catch (error: any) {
        console.error('GPT Error (Vision Board):', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
