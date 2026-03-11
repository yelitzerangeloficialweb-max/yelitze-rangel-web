import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
    console.warn('GOOGLE_GEMINI_API_KEY is missing.');
}

const genAI = new GoogleGenerativeAI(apiKey || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function refineTextWithGemini(prompt: string, context?: string) {
    try {
        const systemInstruction = `Eres un asistente de 'Arquitectura de Vida' experto en coaching ontológico.
    Tu objetivo es transformar intenciones vagas en declaraciones poderosas y afirmativas.
    Usa un tono cálido, profundo y breve.
    ${context ? `Contexto: ${context}` : ''}`;

        const fullPrompt = `${systemInstruction}\n\nUser Intention: "${prompt}"\n\nRefined Intention:`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
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
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Prompt Error:", error);
        return "abstract spiritual minimalist art, golden light"; // Fallback
    }
}
export async function generateVisionPrompt(intention: string, images: string[]) {
    try {
        const visionModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `Estas son 3 imágenes que el usuario ha subido para representar su pilar de arquitectura de vida: "${intention}".
        Analiza visualmente estas 3 imágenes y genera una descripción maestra en INGLÉS para una 4ta imagen que combine los elementos clave, colores y estética de las anteriores, pero elevándolas a un nivel de arte conceptual, minimalista y arquitectónico.
        Solo devuelve el prompt final en inglés, sin explicaciones.`;

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
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Vision Error:", error);
        return intention + ", conceptual art, minimalist, architectural, hyper-realistic"; // Fallback
    }
}
