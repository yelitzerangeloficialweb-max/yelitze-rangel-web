/**
 * Valida un token de Cloudflare Turnstile en el servidor.
 * Retorna true si la validación es exitosa; false en caso contrario.
 */
export async function verifyTurnstileToken(token: string | null | undefined): Promise<boolean> {
    if (!token) {
        return false;
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) {
        console.warn('TURNSTILE_SECRET_KEY no está configurada en las variables de entorno.');
        // Para desarrollo local, si no está configurado, podemos permitirlo si estamos en desarrollo, 
        // pero en producción SIEMPRE debe estar configurado.
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
        return !!data.success;
    } catch (error) {
        console.error('Error al verificar el token de Turnstile:', error);
        return false;
    }
}
