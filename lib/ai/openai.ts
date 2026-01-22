import OpenAI from 'openai';

// Initialize the client strictly on the server side
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.warn('OPENAI_API_KEY is missing from environment variables.');
}

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: false, // Ensure strictly server-side
});

export async function refineTextWithAI(prompt: string, context?: string) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o", // Or gpt-3.5-turbo if cost is a concern, but 4o is intelligent
            messages: [
                {
                    role: "system",
                    content: `Eres un asistente de 'Arquitectura de Vida' experto en coaching ontológico y sanación ancestral. 
          Tu objetivo es ayudar al usuario a transformar intenciones vagas en declaraciones poderosas, afirmativas y de acción.
          Usa un tono cálido, profundo pero directo. No uses jerga corporativa, usa lenguaje del alma.
          ${context ? `Contexto adicional: ${context}` : ''}`
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 150,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI Refinement Error:", error);
        throw new Error("No se pudo conectar con el asistente de escritura.");
    }
}

export async function generateImagePrompt(intention: string) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "Eres un experto creador de prompts para generación de imágenes (DALL-E 3). Tu tarea es convertir una intención abstracta ('Quiero más paz') en una descripción visual simbólica, estética y minimalista ('Una habitación blanca con luz dorada entrando por una ventana, estilo cinemático, alta resolución'). Solo devuelve el prompt en inglés."
                },
                {
                    role: "user",
                    content: intention
                }
            ]
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Prompt Generation Error", error);
        return null; // Fail gracefully
    }
}

export default openai;
