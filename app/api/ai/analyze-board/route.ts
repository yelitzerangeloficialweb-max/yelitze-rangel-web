import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Initialize Gemini client using the verified GOOGLE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

export const maxDuration = 60;

export async function POST(req: Request) {
    let resultId = null;
    try {
        if (!process.env.GOOGLE_GEMINI_API_KEY) {
            console.error("Missing GOOGLE_GEMINI_API_KEY");
            return NextResponse.json({
                release: "Tus dudas sobre tu propio potencial.",
                identity: "La Arquitecta Soberana de tu realidad.",
                practice: "La auto-observación diaria sin juicio.",
                error: "Config Error"
            }, { status: 200 });
        }

        const { reflections, pillars, userName, userEmail } = await req.json();

        // 1. SAVE TO DATABASE IMMEDIATELY (Lead Capture)
        try {
            console.log("Saving Vision Board Lead:", userName);
            const saved = await db.testResult.create({
                data: {
                    testTitle: "Arquitectura de Vida",
                    score: 0,
                    maxScore: 0,
                    answers: JSON.stringify({ reflections, pillars }),
                    aiAnalysis: "Analizando energía...", // Placeholder
                    userName: userName || null,
                    userEmail: userEmail || null
                }
            });
            resultId = saved.id;
        } catch (dbError: any) {
            console.error("DB SAVE ERROR (Vision Board):", dbError.message);
        }

        // Default Fallback / Mockup
        let analysisObj = {
            release: "El miedo a brillar con tu propia luz.",
            identity: "La Creadora Consciente de tu destino.",
            practice: "Agradecer 3 veces al día lo que ya eres.",
            manifesto: "Al integrar estas energías, te convertirás en el centro magnético de tu vida.",
            guide_steps: ["Define tus no-negociables diarios.", "Agenda tus bloques de creación sagrada.", "Revisa tus finanzas con gratitud semanal."],
            cta_message: "No tienes que construir sola. Únete a nuestros planes de acompañamiento y haz de este diseño una realidad tangible."
        };

        // 2. CALL GEMINI
        try {
            // Construct context
            const pillarsText = pillars.map((p: any) =>
                `- ${p.title}: Intención="${p.intention}", Dirección="${p.direction}"`
            ).join('\n');

            const reflectionsText = Object.entries(reflections).map(([k, v]) =>
                `- Portal ${k}: "${v}"`
            ).join('\n');

            const prompt = `
            Actúa como **Yelitzé Rangel**, mentora de vida, consteladora familiar y experta en Arquitectura de Vida.
            
            **TU VOZ Y TONO:**
            - **Autoridad Amorosa:** No pides permiso, guías con certeza. No eres una "coaching motivacional" (evita frases como "¡Tú puedes!", "Ánimo").
            - **Sistémica y Ancestral:** Hablas de "orden", "lealtades invisibles", "tomar a los padres", "lugar en el sistema", "energía vital".
            - **Directa y Radical:** Vas al hueso. Si la persona dice "quiero dinero" pero siente culpa, se lo señalas.
            - **Frase Clave:** "No es magia, es orden".
            - **Personalización:** Usa EXCLUSIVAMENTE la información que te ha dado el usuario. Si su pilar es sobre "abrir una panadería", SÁCALO en la respuesta. No des ejemplos genéricos.

            **CONTEXTO DEL USUARIO (Lee con atención):**
            Reflexiones (Sus bloqueos actuales):
            ${reflectionsText}
            
            Pilares de Vida (Sus deseos):
            ${pillarsText}

            **TU MISIÓN:**
            Diagnosticar por qué aún no ha manifestado esto y darle la estructura para 2026.

            **Genera un JSON con estas claves (Responde en Español neutro/latino pero con peso):**
            - "release": (Máx 15 palabras) Lo que debe soltar. Sé sistémica. Ej: "La lealtad a la escasez de tu linaje materno".
            - "identity": (Máx 10 palabras) Su nuevo arquetipo. Ej: "La Matriarca de Negocios Digitales".
            - "practice": (Máx 15 palabras) Una acción ritual o hábito de orden. Ej: "Ordenar tu cartera cada noche agradeciendo".
            - "manifesto": (Máx 30 palabras) Una declaración de poder en presente, integrando sus deseos específicos.
            - "guide_steps": (Array de 3 strings) 3 pasos de "Arquitectura" (orden físico/agenda) para sus metas específicas.
            - "cta_message": (Máx 20 palabras) Invitación a profundizar en el programa "Arquitectura de Vida", conectando con su dolor principal.
            `;

            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash-latest",
                generationConfig: { responseMimeType: "application/json" }
            });

            const result = await model.generateContent(prompt);
            const responseText = result.response.text();
            analysisObj = JSON.parse(responseText);

            // 3. UPDATE DATABASE WITH ANALYSIS
            if (resultId) {
                await db.testResult.update({
                    where: { id: resultId },
                    data: { aiAnalysis: responseText }
                });
            }
        } catch (aiError: any) {
            console.error('AI Analysis Error (Vision Board):', aiError.message);
            // If AI fails, update DB with a notification
            if (resultId) {
                await db.testResult.update({
                    where: { id: resultId },
                    data: { aiAnalysis: `**Error AI:** ${aiError.message}\n\nSe usó respuesta por defecto.` }
                });
            }
        }

        return NextResponse.json(analysisObj);

    } catch (error: any) {
        console.error('TOP LEVEL API ERROR (Board):', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
