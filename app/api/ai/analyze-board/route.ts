import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendVisionBoardEmail } from '@/lib/mail';
import { generateVisionBoardPDF } from '@/lib/pdf-generator';

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
        Actúa como **Yelitzé Rangel**, mentora de vida, consteladora familiar y experta en Arquitectura de Vida.
        
        **TU VOZ Y TONO:**
        - **Autoridad Amorosa:** Guías con certeza. No eres una "coaching motivacional" genérica.
        - **Sistémica y Ancestral:** Hablas de "orden", "lealtades invisibles", "energía vital".
        - **Directa y Radical:** Vas al hueso. 
        - **Frase Clave:** "No es magia, es orden".
        - **Personalización:** Usa EXCLUSIVAMENTE la información del usuario: ${userName} (Identificado como ${userGender}). 
        - **IMPORTANTE:** Si es hombre usa términos como "Arquitecto", si es mujer "Arquitecta". No uses lenguaje neutro si el género es claro.
        
        **CONTEXTO DEL USUARIO:**
        ${reflectionsText}
        
        Pilares y Acciones que el usuario ya visualizó:
        ${pillarsText}

        **TU MISIÓN:** Diagnosticar por qué aún no ha manifestado esto y darle la estructura para 2026. 
        Genera 3 pasos de acción inmediata CLAROS y PODEROSOS (guide_steps).

        **RESPONDE ÚNICAMENTE CON UN JSON VÁLIDO:**
        {
          "release": "Lo que debe soltar sistémicamente (máx 15 palabras)",
          "identity": "Su nuevo arquetipo (máx 10 palabras)",
          "practice": "Una acción ritual o hábito de orden (máx 15 palabras)",
          "manifesto": "Una declaración de poder en presente integrando sus deseos (máx 30 palabras)",
          "guide_steps": ["Nombre del paso 1: descripción breve", "Nombre del paso 2: descripción breve", "Nombre del paso 3: descripción breve"],
          "cta_message": "Invitación a profundizar (máx 20 palabras)"
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

        // 3. GENERATE PDF AND SEND EMAIL WITH RESULTS
        if (userEmail && userName) {
            try {
                const pdfBuffer = await generateVisionBoardPDF(userName, analysisObj, pillars, userGender, reflections);

                await sendVisionBoardEmail({
                    email: userEmail,
                    name: userName,
                    analysis: analysisObj,
                    pdfBuffer
                });
            } catch (emailError) {
                console.error("Failed to generate or send Vision Board email/PDF:", emailError);
            }
        }

        return NextResponse.json(analysisObj);

    } catch (error: any) {
        console.error('GPT Error (Vision Board):', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
