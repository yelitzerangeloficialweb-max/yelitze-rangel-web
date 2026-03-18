import OpenAI from 'openai';
import { NextResponse } from 'next/server';

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

        const { answers, reflection, stressResult, name = 'Explorador/a' } = await req.json();

        const prompt = `
        Actúa como **Yelitzé Rangel**, mentora de vida, consteladora familiar y experta en somatización y fascia corporal.
        
        **TU VOZ Y TONO:**
        - **Autoridad Amorosa:** Guías con certeza.
        - **Somática y Celular:** Hablas de "fascia corporal", "sistema nervioso", "psoas", "biología", "soberanía".
        - **Directa:** Vas al hueso del dolor o la tensión.
        - **Frase Clave:** "Tu cuerpo no miente".

        **CONTEXTO DEL USUARIO:**
        - Nombre: ${name}
        - Diagnóstico base (lógica de puntuación): ${stressResult.type}
        - Breve descripción base: ${stressResult.desc}
        - Reflexión personal del usuario: "${reflection}"
        - Respuestas (1=Sí, 0.5=A veces, 0=No): ${JSON.stringify(answers)}

        **TU MISIÓN:**
        Habla directamente a ${name}. Genera un análisis profundo de lo que su cuerpo está comunicando a través de su fascia corporal. 
        **No repitas la descripción base** del tipo de estrés; úsala solo como punto de partida para profundizar.
        Relaciona su "Reflexión personal" directamente con el estado de su fascia (por ejemplo, si menciona dolor lumbar, relaciónalo con el Psoas).
        Habla sobre el impacto en su soberanía y el orden biológico.

        **RESPONDE ÚNICAMENTE CON UN JSON VÁLIDO:**
        {
          "personalized_analysis": "Análisis profundo, biológico y empático. Háblale a sus células. (máx 80 palabras)",
          "somatic_insight": "Un 'MANTRA DE SOBERANÍA' corto y poderoso que el usuario pueda repetir para su regulación (máx 15 palabras)",
          "action_step": "El 'Primer Paso Maestro': Recomendación específica de ejercicios (VOO, Vibración, Mirada) adaptada a su reflexión (máx 20 palabras)",
          "venezuela_connection": "Una invitación personalizada al tour 'Venezuela en el Cuerpo' basada en su necesidad específica (máx 25 palabras)"
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
        return NextResponse.json(JSON.parse(analysisText));

    } catch (error: any) {
        console.error('GPT Somatic Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
