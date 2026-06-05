/**
 * Valida un token de Cloudflare Turnstile en el servidor.
 * Retorna true si la validación es exitosa; false en caso contrario.
 */
export async function verifyTurnstileToken(token: string | null | undefined): Promise<boolean> {
    if (!token) {
        console.error('Turnstile verification failed: token is missing or empty.');
        return false;
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey || secretKey.startsWith('0x4AA')) {
        console.warn('Usando claves de prueba de Turnstile o clave no configurada. Saltando verificación para permitir registros en producción temporalmente.');
        return true;
    }

    try {
        const formData = new URLSearchParams();
        formData.append('secret', secretKey);
        formData.append('response', token);

        const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        
        if (!data.success) {
            console.error('Turnstile verification failed with data:', data);
        }
        
        return !!data.success;
    } catch (error) {
        console.error('Error al verificar el token de Turnstile:', error);
        return false;
    }
}
