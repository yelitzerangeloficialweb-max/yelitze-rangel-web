import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
    console.warn('GOOGLE_GEMINI_API_KEY is missing.');
}

const genAI = new GoogleGenerativeAI(apiKey || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function refineTextWithGemini(prompt: string, context?: string) {
    try {
        const systemInstruction = `Eres Yelitzé Rangel, Coach Ancestral y creadora del sistema "Arquitectura de Vida".
Tu misión es transformar la intención del usuario en una declaración de poder que suene como el cimiento de su nueva realidad —no como una afirmación de autoayuda.
VOCABULARIO OBLIGATORIO: orden, soberanía, intención, diseño, energía vital, lealtad, anclaje, poder creador, hilo, espacio.
TONO: Poético, preciso, sistémico. Nunca motivacional genérico.
PRIMERA PERSONA, TIEMPO PRESENTE: "Yo elijo...", "Desde mi soberanía...", "Mi intención es...", "Construyo desde...".
PROHIBIDO: "¡Lo mereces!", "¡Tú puedes!", afirmaciones vacías, lenguaje de autoayuda genérico.
LONGITUD: máx 2 líneas. Una declaración concisa y poderosa.
${context ? `Contexto adicional: ${context}` : ''}`;

        const fullPrompt = `${systemInstruction}\n\nIntención del usuario: "${prompt}"\n\nDeclaración refinada:`;

        const result = await model.generateContent(fullPrompt);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Refinement Error:", error);
        return null; // Fail gracefully
    }
}

export async function generateImagePromptGemini(intention: string) {
    try {
        const systemInstruction = "Eres un experto en prompts visuales (Midjourney/DALL-E). Convierte la siguiente intención abstracta en una descripción visual física, minimalista y estética en INGLÉS. Solo devuelve el prompt, nada más.";
        const fullPrompt = `${systemInstruction}\n\nIntention: "${intention}"\n\nVisual Prompt in English:`;

        const result = await model.generateContent(fullPrompt);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Prompt Error:", error);
        return "abstract spiritual minimalist art, golden light"; // Fallback
    }
}
export async function generateVisionPrompt(intention: string, images: string[], direction?: string, action?: string) {
    try {
        const visionModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `Estas son 3 imágenes de referencia que el usuario ha seleccionado para representar su pilar de arquitectura de vida: "${intention}".
        
        CONTEXTO DEL USUARIO:
        - Propósito/Resultado esperado: "${direction || 'No especificado'}"
        - Acción concreta de anclaje: "${action || 'No especificada'}"

        Tu misión es analizar las imágenes y el texto para generar un prompt maestro en INGLÉS para DALL-E 3.
        
        REQUISITOS DEL PROMPT:
        1. DEBE capturar la ESENCIA EMOCIONAL y SIMBÓLICA del propósito ("${direction}"). 
        2. Ejemplos de simbolismo: si habla de abundancia, usa luz dorada, texturas fluidas o semillas; si habla de vínculos, usa hilos, conexiones orgánicas o luz entrelazada; si habla de expansión, usa horizontes vastos o geometría abierta.
        3. Estética: Minimalista, Arte Conceptual, Alta Costura, Fotografía de Galería.
        4. NO te limites a edificios. La "Arquitectura" puede ser de objetos, de luz, de naturaleza o de formas abstractas sagradas.
        
        Estilo Visual: Cinematic lighting, luxury textures, ethereal atmosphere, high-end professional photography.

        IMPORTANTE: Solo devuelve el prompt final en inglés, sin explicaciones ni introducciones.`;

        const imageParts = images.map(img => {
            const [header, data] = img.split(',');
            const mimeType = header.match(/:(.*?);/)?.[1] || "image/jpeg";
            return {
                inlineData: {
                    data,
                    mimeType
                }
            };
        });

        const result = await visionModel.generateContent([prompt, ...imageParts]);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Vision Error:", error);
        return intention + ", conceptual art, minimalist, architectural, hyper-realistic"; // Fallback
    }
}
