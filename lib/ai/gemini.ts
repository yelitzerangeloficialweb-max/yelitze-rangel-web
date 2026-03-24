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
    // Build a rich contextual fallback first so it's ALWAYS available if Gemini fails
    const contextualFallback = buildContextualPrompt(intention, direction, action);

    try {
        const visionModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `Analiza visualmente las ${images.length} imágenes adjuntas y el texto del usuario para crear un prompt de imagen en INGLÉS para DALL-E 3.

TEXTO DEL USUARIO:
- Intención: "${intention}"
- Propósito: "${direction || ''}"
- Acción diaria: "${action || ''}"

REGLAS ESTRICTAS para el prompt:
1. El prompt DEBE INCLUIR palabras clave o conceptos extraídos DIRECTAMENTE del texto del usuario. Si el usuario habla de "recursos con alegría", el prompt debe incluir algo relacionado con alegría y abundancia; si habla de "vínculos honestos", incluir conexión humana o manos juntas.
2. Analiza los COLORES, TEXTURAS y ESTADO EMOCIONAL de las imágenes de referencia e inclúyelos en el estilo.
3. Incluye presencia humana cuando sea simbólicamente relevante: siluetas, gestos de manos, cuerpos en movimiento, miradas.
4. PROHIBIDO: arquitectura gris genérica, edificios sin contexto, stock photos estéticas sin alma.
5. Estilo: Fine art photography, cinematic lighting, luxury editorial, ethereal and intentional.

SOLO devuelve el prompt en inglés, sin explicaciones.`;

        const imageParts = images.map(img => {
            const [header, data] = img.split(',');
            const mimeType = header.match(/:(.*?);/)?.[1] || "image/jpeg";
            return { inlineData: { data, mimeType } };
        });

        const result = await visionModel.generateContent([prompt, ...imageParts]);
        const generatedPrompt = result.response.text().trim();
        console.log('[Gemini Vision] Prompt generado:', generatedPrompt.substring(0, 150));
        return generatedPrompt;

    } catch (error: any) {
        console.error('[Gemini Vision] Error — usando fallback contextual:', error?.message || error);
        return contextualFallback;
    }
}

// Builds a meaningful contextual prompt from user text when Gemini is unavailable
function buildContextualPrompt(intention: string, direction?: string, action?: string): string {
    const core = direction || intention;
    return `Fine art photography: ${core}. A human figure or expressive hands interacting with soft golden light, luxury textures, ethereal atmosphere. The scene symbolizes: ${intention}. Cinematic, minimalist, editorial, high-end professional photography. No grey buildings.`;
}

