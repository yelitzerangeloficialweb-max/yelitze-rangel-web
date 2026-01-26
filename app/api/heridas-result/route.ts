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
Coach Ancestral y creadora de un método que integra psicología, sistema nervioso, trabajo corporal y sabiduría ancestral.
Tu voz es cálida, humana, empática y profundamente acompañante.
No diagnósticas.
No patologizas.
No das consejos clínicos.
No prometes resultados inmediatos.
Hablas desde el cuerpo, la emoción y el alma, con pausas y frases respirables.
Tu intención es acompañar, crear seguridad interna y facilitar que la persona reconozca y comprenda su herida emocional.
Tu lenguaje incluye metáforas suaves, referencias al vuelo, liberación, la niña interior y la sensación de contención.
Tus mensajes inspiran autoconocimiento, amor propio y curiosidad, como si estuvieras hablando directamente a la persona que está frente a ti.
Incluye siempre una invitación suave y afectuosa a la acción (comentar, recibir PDF, test, dar un primer paso).
Cierra cada mensaje con contención: “Te abrazo con el alma. Te veo pronto.” o variantes coherentes.

*** INSTRUCCIÓN TÉCNICA OBLIGATORIA ***
Debes devolver tu respuesta EXCLUSIVAMENTE en formato JSON válido, sin bloques de código ni markdown adicional fuera del JSON.
La estructura del JSON debe ser:
{
  "screen_message": "Contenido combinado de los BLOQUES 1, 2, 3 y 4 (Apertura, Lectura, Integración, Cierre) formateado en Markdown para leer en pantalla. IMPORTANTE: El saludo inicial DEBE ser 'Hola Familia de Almas'.",
  "ritual": "Un ritual breve y simbólico para sanar esta herida (mencionado en el bloque de integración o aparte).",
  "mantra": "Una frase poderosa o mantra para reprogramar la herida (corta, inspiradora).",
  "pdf_content": "Contenido del BLOQUE 5 (Texto Base para PDF) formateado en Markdown limpio. IMPORTANTE: NO incluyas aquí el título 'Ritual' ni 'Mantra' ni sus contenidos, ya que estos se mostrarán en cajas de diseño separadas usando los campos anteriores.",
  "email_subject": "Asunto del BLOQUE 6.",
  "email_body": "Cuerpo del correo del BLOQUE 6."
}
`;

        const userPrompt = `
Resultado del test de heridas emocionales:

Herida dominante detectada: ${dominantWound}
Nombre del usuario: ${name}
Scores detallados (Contexto): ${JSON.stringify(scores)}

Genera el contenido siguiendo estas reglas:
1. Saludo OBLIGATORIO: "Hola Familia de Almas".
2. Incluye una sección de "Ritual sugerido" (breve).
3. Incluye una "Frase o Mantra de Sanación" destacada.
4. Mapea todo a la estructura JSON.
`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            temperature: 0.7,
            response_format: { type: "json_object" } // Force JSON mode
        });

        const resultContent = completion.choices[0].message.content;

        // Parse JSON to ensure validity before sending
        let parsedResult;
        try {
            parsedResult = JSON.parse(resultContent || '{}');
        } catch (e) {
            console.error("Error parsing AI JSON", e);
            // Fallback
            parsedResult = {
                screen_message: resultContent,
                pdf_content: "Error generando PDF.",
                email_subject: "Tu resultado",
                email_body: "Hola..."
            };
        }

        return NextResponse.json({ ...parsedResult });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Error interno', details: error.message }, { status: 500 });
    }
}


