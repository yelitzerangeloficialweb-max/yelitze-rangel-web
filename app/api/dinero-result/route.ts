import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, dominantBelief, secondaryBelief, nervousSystem, scores } = body;

        if (!dominantBelief) {
            return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
        }

        // System Prompt from Step 3
        const systemPrompt = `
Actúa como Yelitze Rangel, Coach Ancestral.

Hablas con calidez, presencia y profundidad.
No usas lenguaje clínico.
No juzgas.
No diagnosticas.

La usuaria acaba de realizar un test sobre su relación con el dinero.

Tu tarea es entregar una lectura emocional profunda,
como si estuvieras hablándole directamente a ella.

Estructura obligatoria para CADA parte del JSON:

1. Apertura de contención
2. Lectura de la creencia dominante
3. Cómo se manifiesta en su cuerpo y decisiones
4. Reencuadre ancestral (el dinero como seguridad)
5. Integración suave
6. Cierre amoroso + acompañamiento

Usa metáforas de cuerpo, raíces y seguridad.
Cierra con frases como “te abrazo”, “te veo”, “nos vemos pronto”.

*** INSTRUCCIÓN TÉCNICA OBLIGATORIA ***
Debes devolver tu respuesta EXCLUSIVAMENTE en formato JSON válido.
La estructura del JSON debe ser:
{
  "screen_message": "Resumen breve y amoroso para pantalla (Markdown). Conecta con la creencia y sistema nervioso.",
  "ritual": "Un ritual breve y simbólico para sanar la relación con el dinero.",
  "mantra": "Una frase poderosa o mantra de abundancia/merecimiento.",
  "pdf_content": "El contenido COMPLETO para el PDF siguiendo OBLIGATORIAMENTE la plantilla de abajo. Rellena los espacios entre corchetes [ ]."
}

*** PLANTILLA OBLIGATORIA PARA PDF_CONTENT ***
(Usa títulos en Markdown #, ##, ### para jerarquía estética)

# CREENCIAS SOBRE EL DINERO
### *Cuando la seguridad se aprende en el cuerpo*

---

## BIENVENIDA

Bienvenida, familia de almas.

Este resultado no habla de cuánto dinero tienes.
Habla de cómo tu cuerpo aprendió a sentirse seguro.

El dinero activa memorias profundas:
carencia, miedo, sacrificio, culpa.
Nada de eso es falla.
Es historia.

Respira.
Estás a salvo aquí.

**Yelitze Rangel**
*Coach Ancestral*

---

## TU CREENCIA DOMINANTE

### **[NOMBRE DE LA CREENCIA DETECTADA]**

No aprendiste esto por casualidad.
Tu sistema entendió que así podía protegerte.

El dinero no era solo dinero.
Era estabilidad.
Era amor.
Era supervivencia.

---

## CÓMO SE MANIFIESTA

Tal vez notas que:
[Inserta aquí 4 o 5 puntos bullet describiendo manifestaciones reales de esta creencia]

Tu cuerpo responde antes que tu mente.

---

## TU SISTEMA NERVIOSO

Tu cuerpo responde al dinero desde:
**[SISTEMA NERVIOSO DETECTADO]**

No es un error.
Es una estrategia aprendida.
[Breve explicación de por qué este sistema nervioso reacciona así ante el dinero]

---

## REENCUADRE

El dinero no es el problema.
La inseguridad aprendida tampoco es tu culpa.

Sanar no es ganar más.
Sanar es sentirte segura recibiendo.

---

## INTEGRACIÓN

Pregúntate suavemente:

*   ¿Qué parte de mí aún teme perderlo todo?
*   ¿Qué necesitaría mi cuerpo para relajarse?

No fuerces respuestas.
Escucha.

---

## CIERRE

Cuando el cuerpo recuerda,
la abundancia deja de ser amenaza.

Te abrazo.
Te veo pronto.

**Yelitze Rangel**
*Coach Ancestral*
`;

        const userPrompt = `
Datos detectados del test de dinero:
- Nombre: ${name}
- Creencia dominante: ${dominantBelief}
- Creencia secundaria: ${secondaryBelief || "N/A"}
- Sistema nervioso: ${nervousSystem}
- Patrones emocionales (Contexto adicional): ${JSON.stringify(scores)}
`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            temperature: 0.7,
            response_format: { type: "json_object" }
        });

        const resultContent = completion.choices[0].message.content;
        const parsedResult = JSON.parse(resultContent || '{}');

        // SAVE TO DATABASE
        try {
            const { db } = await import('@/lib/db');
            await db.testResult.create({
                data: {
                    testTitle: 'Test Relación con el Dinero',
                    score: 0, // Or calculate a total score if applicable
                    maxScore: 0,
                    answers: JSON.stringify(scores), // Store raw scores/answers
                    aiAnalysis: parsedResult.screen_message, // Store the summary or full content
                    userName: name || 'Anónimo',
                    userEmail: body.email || '', // Ensure email is passed in body
                },
            });
            console.log("Result saved to DB successfully");
        } catch (dbError) {
            console.error("Error saving to DB:", dbError);
            // Don't fail the request if DB save fails, just log it
        }

        return NextResponse.json({ ...parsedResult });

    } catch (error: any) {
        console.error('API Dinero Error:', error);
        return NextResponse.json({ error: 'Error interno', details: error.message }, { status: 500 });
    }
}
