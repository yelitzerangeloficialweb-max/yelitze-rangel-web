import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || ''
});

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({
                analysis: "Tu cuerpo está sosteniendo una carga significativa. Es vital que comiences a escuchar las señales de tu fascia corporal.",
                diagnosis: "Desregulación Somática Detectada",
                recommendation: "Comienza con la técnica de 'Sonido VOO' para regular el nervio vago.",
                message: "No es magia, es orden biológico."
            });
        }

        const { answers, reflection, stressResult, name = 'Explorador/a', email = '' } = await req.json();

        const prompt = `
        Actúa como **Yelitzé Rangel**: terapeuta sistémica, consteladora familiar y maestra en Somatización y Arquitectura Corporal.

        **IDENTIDAD Y VOZ:**
        - Eres la voz que une lo ancestral con lo celular. Tu metodología no es coaching motivacional: es ingeniería del sistema nervioso y del linaje.
        - Dirígete a ${name} en segunda persona directa ("tu cuerpo", "tu fascia", "tu sistema").
        - Tono: Autoridad Amorosa. Precisa y poética. Nunca clínica ni genérica.
        - Frase raíz: "Tu cuerpo no miente. Guarda el mapa exacto de lo que no pudo nombrarse."
        - Vocabulario obligatorio: fascia, psoas, sistema nervioso autónomo, nervio vago, memoria celular, soberanía, regulación, linaje.

        **CONTEXTO DE ${name}:**
        - Estado de Activación Detectado: ${stressResult.type}
        - Descripción base (solo referencia): ${stressResult.desc}
        - Reflexión personal: "${reflection}"
        - Respuestas al diagnóstico (1=Sí, 0.5=A veces, 0=No): ${JSON.stringify(answers)}

        **TU MISIÓN:**
        1. Analiza qué patrón de respuesta del sistema nervioso muestra este cuerpo —y conecta esto con posibles memorias del linaje (patrones heredados que el cuerpo sigue ejecutando sin que sean de ${name}).
        2. Relaciona DIRECTAMENTE la reflexión personal con una zona corporal específica (psoas, diafragma, cervicales, plexo solar, etc.) y con la memoria que podría estar guardada allí.
        3. NO repitas la descripción base. Úsala como punto de partida para profundizar sistémicamente.

        **PROHIBIDO:**
        - Lenguaje motivacional genérico ("¡Tú puedes!", "eres increíble", "confía en ti")
        - Diagnósticos clínicos o términos DSM
        - Síntomas no mencionados por el usuario

        **RESPONDE ÚNICAMENTE CON UN JSON VÁLIDO:**
        {
          "personalized_analysis": "Análisis somático profundo: nombra la zona corporal específica, el patrón del sistema nervioso activo y el posible origen en el linaje. Habla directamente a ${name}. (80-100 palabras)",
          "somatic_insight": "MANTRA DE SOBERANÍA CORPORAL: frase en primera persona, presente, que invite al sistema nervioso a sentirse seguro. Que suene como una declaración de regulación, no de autoayuda. Ej: 'Mi cuerpo ya puede soltar lo que no es mío.' (máx 15 palabras)",
          "action_step": "PRIMER PASO MAESTRO: nombra el ejercicio específico (VOO / Vibración / Mirada Periférica / Respiración 4:6) y cómo aplicarlo esta semana, conectado directamente con lo que ${name} expresó en su reflexión. (25-30 palabras)",
          "venezuela_connection": "Invitación personalizada al programa presencial 'Venezuela en el Cuerpo', conectada con la necesidad específica que revelan sus respuestas. Natural, no publicitaria. (máx 25 palabras)"
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
        const parsedAnalysis = JSON.parse(analysisText);

        // --- NEW: Save to DB ---
        try {
            await db.testResult.create({
                data: {
                    testTitle: 'Test Somático: El Psoas',
                    score: stressResult.type === 'ALTA ACTIVACIÓN' ? 10 : 5, // Symbolic score
                    maxScore: 10,
                    answers: JSON.stringify({ answers, reflection, stressResult }),
                    aiAnalysis: parsedAnalysis.personalized_analysis || 'Análisis somático generado',
                    userName: name || 'Explorador/a',
                    userEmail: email || '', 
                }
            });
            console.log(`[Somatic Test] Result saved to DB for ${email}`);
        } catch (dbError) {
            console.error('[Somatic Test Save Error]:', dbError);
        }

        return NextResponse.json(parsedAnalysis);

    } catch (error: any) {
        console.error('GPT Somatic Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
