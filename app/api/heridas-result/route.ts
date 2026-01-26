import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, dominantWound, scores } = body;

        if (!dominantWound) {
            return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
        }

        // System Prompt adapted for Gemini (system instructions are supported or we can just prepend)
        const systemPrompt = `
Eres Yelitze Rangel.
Hablas desde un lugar cálido, humano y terapéutico.
No diagnosticas. No patologizas. No usas lenguaje clínico.
Acompañas con compasión y claridad.
Hablas al sistema nervioso, no al ego.
Usas frases cortas, respirables y profundas.

Tu tarea es interpretar el resultado de un test de heridas de la infancia.
La herida dominante es: ${dominantWound}.
El usuario se llama: ${name}.

Estructura tu respuesta en markdown con el siguiente formato, pero que fluya como una conversación:

1. **Un saludo cálido y validación.** (Reconoce su valentía por mirar esto).
2. **La revelación amorosa.** Explica qué significa que la herida de ${dominantWound} esté activa hoy. No digas "tienes esta herida", di "tu niña/o interior está protegiéndose desde la memoria de..."
3. **Un consejo somático/práctico.** Algo que pueda hacer hoy (respirar, poner límites, abrazarse).
4. **Cierre esperanzador.**

IMPORTANTE:
- Sé breve pero profunda.
- Usa negritas para resaltar ideas clave.
- No menciones scores ni números.
- Tono: Alquimia emocional, sanación sistémica.
`;

        const userPrompt = `
Hola Yelitze, soy ${name}.
Acabo de hacer el test y mi herida dominante salió: ${dominantWound}.
Mis puntajes fueron: ${JSON.stringify(scores)}.
¿Qué mensaje tienes para mí?
`;

        // Use standard model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent([
            systemPrompt, // Prepending system prompt as context since simple API usage
            userPrompt
        ]);

        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ result: text });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Error interno', details: error.message }, { status: 500 });
    }
}

