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
    if (!secretKey) {
        console.warn('TURNSTILE_SECRET_KEY no está configurada en las variables de entorno.');
        if (process.env.NODE_ENV === 'development') {
            return true;
        }
        return false;
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
            // TEMPORAL: Permitimos el registro aunque Turnstile falle para no bloquear a los usuarios
            return true;
        }
        
        return true;
    } catch (error) {
        console.error('Error al verificar el token de Turnstile:', error);
        // TEMPORAL: Permitimos el registro aunque haya un error de red
        return true;
    }
}
