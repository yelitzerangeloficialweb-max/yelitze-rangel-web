import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
    let resultId = null;
    try {
        if (!process.env.OPENAI_API_KEY) {
            console.error("Missing OPENAI_API_KEY");
            return NextResponse.json({ error: "Configuration Error: Missing OpenAI API Key" }, { status: 500 });
        }

        const body = await req.json();
        const { testTitle, answers, score, maxScore, userName, userEmail } = body;

        console.log("--- TEST SUBMISSION RECEIVED ---");
        console.log("Title:", testTitle);
        console.log("User:", userName, "<", userEmail, ">");
        console.log("Score:", score, "/", maxScore);

        // 1. FIRST SAVE TO DATABASE (Lead Capture)
        try {
            console.log("Saving lead to DB...");
            const saved = await db.testResult.create({
                data: {
                    testTitle,
                    score,
                    maxScore,
                    answers: JSON.stringify(answers),
                    aiAnalysis: "Analizando energía...", // Placeholder
                    userName: userName || null,
                    userEmail: userEmail || null
                }
            });
            resultId = saved.id;
            console.log("Lead saved with ID:", resultId);
        } catch (dbError: any) {
            console.error("CRITICAL DATABASE ERROR ON INITIAL SAVE:", dbError.message);
            // If we can't save to DB at all, we might as well fail or continue for AI only
        }

        // 2. CALL OPENAI
        let analysis = "No se pudo generar el análisis en este momento, pero tus respuestas han sido registradas.";
        try {
            console.log("Starting AI Analysis (OpenAI)...");
            
            const prompt = `
            Actúa como **Yelitzé Rangel**: Coach Ancestral, terapeuta sistémica y consteladora familiar.

            **IDENTIDAD:**
            - Tu metodología une lo ancestral, lo somático y lo psicológico en una sola visión: Arquitectura de Vida.
            - Conceptos clave de tu voz: Lealtades Invisibles, Memorias del Linaje, Orden Sistémico, Soberanía, Fascia Corporal.
            - Frase raíz: "No es magia, es orden."
            - Tono: Directo, poético y sistémico. Nunca clínico ni motivacional vacío.
            - Dirígete directamente a ${userName || "quien lee"}.

            **DATOS:**
            - Test: "${testTitle}"
            - Puntuación: ${score} de ${maxScore} puntos

            **RESPUESTA EN MARKDOWN (máx 200 palabras). Estructura exacta:**

            **Diagnóstico Sistémico**
            Nombra el patrón de Lealtad Invisible o Memoria del Linaje que este puntaje revela. Sé específica/o.

            **El Cuerpo Recuerda**
            Conecta este patrón con una respuesta somática o zona corporal típica donde este peso se almacena.

            **La Arquitectura del Cambio**
            Un camino concreto y sistémico. Nombra UNA acción de orden interno que ${userName || "el usuario"} puede tomar esta semana.

            **El Puente**
            Invita a profundizar con Yelitzé de forma natural y personalizada. No genérica.

            **PROHIBIDO:** "¡Tú puedes!", frases de autoayuda vacías, diagnósticos clínicos, lenguaje motivacional genérico.
            `;

            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "Eres Yelitzé Rangel, terapeuta sistémica. Responde en Markdown siguiendo la estructura solicitada." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7
            });

            analysis = completion.choices[0].message.content || analysis;
            console.log("AI Analysis successful");
        } catch (aiError: any) {
            console.error("AI ANALYSIS ERROR:", aiError.message);
            analysis = `**La energía está en movimiento.**\n\nNo pudimos completar el análisis automático, pero Yelitzé revisará tus respuestas pronto.\n\nError: ${aiError.message}`;
        }

        // 3. UPDATE DATABASE WITH ANALYSIS
        if (resultId) {
            try {
                await db.testResult.update({
                    where: { id: resultId },
                    data: { aiAnalysis: analysis }
                });
                console.log("DB record updated with AI analysis");
            } catch (updateError: any) {
                console.error("UPDATE ERROR:", updateError.message);
            }
        }

        // 4. SEND EMAIL (LIKE SOMATIC TEST)
        if (userEmail && userEmail.includes('@')) {
            try {
                console.log(`[Analyze Test] Sending email for ${testTitle} to ${userEmail}...`);
                const { sendGenericTestEmail } = await import('@/lib/mail');
                const { generateGenericTestPDF } = await import('@/lib/pdf-generator');
                
                const pdfBuffer = await generateGenericTestPDF(userName || 'Explorador/a', testTitle, analysis);
                await sendGenericTestEmail({
                    email: userEmail,
                    name: userName || 'Explorador/a',
                    testTitle,
                    analysis,
                    pdfBuffer
                });
                console.log(`[Analyze Test] Email sent successfully`);
            } catch (mailError) {
                console.error('[Analyze Test Mail Error]:', mailError);
            }
        }

        return NextResponse.json({
            analysis,
            success: true,
            id: resultId
        });

    } catch (error: any) {
        console.error('TOP LEVEL API ERROR:', error);
        return NextResponse.json(
            { error: error.message || "Error interno" },
            { status: 500 }
        );
    }
}
