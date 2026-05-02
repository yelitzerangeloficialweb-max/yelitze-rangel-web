import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            console.error("ERROR: OPENAI_API_KEY no detectada.");
            return NextResponse.json({ error: "Falta configuración de OpenAI" }, { status: 500 });
        }

        const body = await req.json();
        const { name, dominantBelief, secondaryBelief, scores } = body;

        console.log(`Análisis Amor para ${name} - Detectado: ${dominantBelief}`);

        if (!dominantBelief) {
            return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
        }

        // System Prompt directly from User Request
        const systemPrompt = `
Actúa como Yelitze Rangel, Coach Ancestral.
Tu misión es generar el contenido para el PDF de resultados del test "Creencias sobre el Amor".

**INSTRUCCIONES DE FORMATO:**
Debes devolver tu respuesta EXCLUSIVAMENTE en formato JSON válido.

La estructura del JSON debe ser:
{
  "screen_message": "Un resumen breve y amoroso para la pantalla (Format: Markdown). Que conecte con la creencia detectada y de esperanza.",
  "ritual": "Un ritual breve y simbólico para sanar esta creencia.",
  "mantra": "Una frase poderosa o mantra para reprogramar la creencia.",
  "pdf_content": "El contenido COMPLETO del PDF siguiendo OBLIGATORIAMENTE la plantilla de abajo. No cambies el texto estático. Solo rellena los espacios entre corchetes [ ]. Usa formato Markdown estándar."
}

*** PLANTILLA OBLIGATORIA PARA PDF_CONTENT ***
(Usa títulos en Markdown #, ##, ### para jerarquía estética)

# TEST DE CREENCIAS SOBRE EL AMOR
### *Cuando la mente comprende, el cuerpo y el alma recuerdan*

---

## BIENVENIDA

Bienvenida, familia de almas.

Si estás leyendo esto, no es casualidad.
Llegaste aquí porque algo dentro de ti sabe que el amor no debería doler tanto,
ni sentirse como esfuerzo, miedo o espera eterna.

Este test no busca decirte qué está mal en ti.
Busca mostrarte cómo aprendiste a amar
y desde dónde tu cuerpo ha estado intentando protegerte.

Aquí no hay juicios.
Aquí hay verdad, conciencia y posibilidad.

Te abrazo.
Gracias por permitirte mirar hacia adentro.

**Yelitze Rangel**
*Coach Ancestral*

---

## ANTES DE LEER TU RESULTADO

Quiero que recuerdes algo importante:

Las creencias sobre el amor no nacen contigo.
Se forman en los primeros vínculos,
cuando amar también significaba sobrevivir.

Tu sistema nervioso aprendió estrategias para no perder el vínculo,
para no quedarse sola,
para no sentir demasiado dolor.

Nada de esto es debilidad.
Es inteligencia emocional en su forma más pura.

---

## TU RESULTADO

### 🌿 Creencia dominante sobre el amor: **[NOMBRE DE LA CREENCIA DETECTADA]**

Esta creencia no apareció porque sí.
Apareció porque en algún momento de tu vida
amar de esta forma fue lo más seguro que conocías.

**Tal vez aprendiste que:**
[Inserta aquí 4 o 5 puntos bullet cortos y potentes específicos de esta creencia, por ejemplo:
- amar era adaptarte
- amar era esperar
- amar era demostrar...]

No porque lo merecieras,
sino porque eso era lo disponible.

### 🌙 Cómo esta creencia se manifiesta en tu vida

Puede que notes que:
[Inserta aquí 4 o 5 puntos bullet describiendo síntomas emocionales/conductuales reales de esta creencia]

Tu cuerpo no está fallando.
Está recordando.
Recordando viejas reglas que ya no necesitas seguir obedeciendo.

---

## 🌀 Lo que tu cuerpo aprendió

Tu sistema nervioso aprendió a amar desde:
**[DEDUCE LA TENDENCIA AQUÍ: Hiperactivación / Evitación / Complacencia / Congelamiento]**

*(Nota para la IA: Elige la que mejor encaje con la creencia detectada)*
* Miedo/Desconfianza -> Hiperactivación (Alerta)*
* Sobreenfuerzo/Complacencia -> Complacencia (Fawning)*
* Evitación/Independencia -> Evitación (Huida)*
* Desesperanza/Resignación -> Congelamiento (Freeze)*

**Esto significa que, ante el amor, tu cuerpo:**
[Describe brevemente la reacción física: se acelera, se cierra, se adapta o se desconecta]

No porque no sepas amar,
sino porque amar sin protección alguna vez dolió.

---

## REENCUADRE ANCESTRAL

Quiero decirte algo con mucha claridad:

**No tienes una herida en el amor.**
**Tienes una historia.**

Y esa historia puede transformarse.

Sanar no es dejar de amar.
Sanar es dejar de sobrevivir en el amor.

Cuando el cuerpo se siente seguro,
el corazón deja de defenderse.

---

## UNA NUEVA POSIBILIDAD

Tal vez hoy no se trata de cambiar nada.
Tal vez solo se trata de empezar a observarte con más ternura.

De preguntarte:
*   ¿Qué parte de mí sigue esperando ser elegida?
*   ¿Desde dónde estoy amando?
*   ¿Mi cuerpo se siente a salvo cuando amo?

Ahí comienza el verdadero cambio.
No en la mente.
En el cuerpo.

---

## CIERRE

Gracias por permitirte este encuentro contigo.

Recuerda:
*cuando el cuerpo recuerda,*
*la vida encuentra una nueva dirección.*

Si sientes que este es solo el inicio
y deseas profundizar este camino de sanación y reconexión,
estaré aquí para acompañarte.

Te abrazo con el alma.
Te veo pronto.

**Yelitze Rangel**
*Coach Ancestral*
`;

        const userPrompt = `
Resultado del test "Tus creencias sobre el amor":

Creencia/Arquetipo dominante detectado: ${dominantBelief}
Creencia secundaria (si aplica): ${secondaryBelief || "N/A"}
Nombre del usuario: ${name}
Scores detallados (Contexto): ${JSON.stringify(scores)}

Genera el contenido siguiendo estrictamente la voz de Yelitze y la estructura JSON solicitada.
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

        // Save to DB
        try {
            await db.testResult.create({
                data: {
                    testTitle: 'Test Creencias sobre el Amor',
                    score: 0,
                    maxScore: 100,
                    answers: JSON.stringify(scores),
                    aiAnalysis: parsedResult.screen_message,
                    userName: name || 'Anónimo',
                    userEmail: body.email || '',
                },
            });
        } catch (dbError) {
            console.error("Error guardando en DB (Amor):", dbError);
        }

        // --- NEW: Send Email (Like Somatic Test) ---
        if (body.email && body.email.includes('@')) {
            try {
                console.log(`[Amor Test] Sending email to ${body.email}...`);
                const { sendGenericTestEmail } = await import('@/lib/mail');
                const { generateGenericTestPDF } = await import('@/lib/pdf-generator');
                
                // Use the full PDF content generated by AI
                const pdfBuffer = await generateGenericTestPDF(name || 'Familia de Almas', 'Creencias sobre el Amor', parsedResult.pdf_content);
                await sendGenericTestEmail({
                    email: body.email,
                    name: name || 'Familia de Almas',
                    testTitle: 'Test: Creencias sobre el Amor',
                    analysis: parsedResult.screen_message,
                    pdfBuffer
                });
                console.log(`[Amor Test] Email sent successfully`);
            } catch (mailError) {
                console.error('[Amor Test Mail Error]:', mailError);
            }
        }

        return NextResponse.json({ ...parsedResult });

    } catch (error: any) {
        console.error('API Amor Error:', error);
        return NextResponse.json({
            error: 'Error interno en análisis de amor',
            details: error.message
        }, { status: 500 });
    }
}
