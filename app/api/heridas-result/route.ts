import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, dominantWound, scores } = body;

        if (!dominantWound) {
            return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
        }

        // System Prompt
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

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Or gpt-3.5-turbo if 4o-mini not available
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            temperature: 0.7,
        });

        const result = completion.choices[0].message.content;

        // In a real app, here we would save the contact to DB/CRM (e.g. Resend, Mailchimp)
        // saveContact(email, name, dominantWound, ...);

        return NextResponse.json({ result });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Error interno', details: error.message }, { status: 500 });
    }
}


