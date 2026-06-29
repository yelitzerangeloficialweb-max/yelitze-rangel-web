const ftp = require("basic-ftp");
const path = require("path");

async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true; // Ver progreso en terminal

    try {
        // 1. Configuración de credenciales FTP para el subdominio
        await client.access({
            host: "documentos.domplacampo.com", // O la IP de tu servidor
            user: "TU_USUARIO_FTP", // Reemplazar con el usuario FTP de ese subdominio
            password: "TU_PASSWORD_FTP", // Reemplazar con la contraseña
            secure: false
        });

        console.log("¡Conectado al servidor FTP de documentos.domplacampo.com!");

        // 2. Ruta remota donde se aloja la aplicación Node.js
        // En cPanel (Hostinger), normalmente se crea una App Node.js en una carpeta fuera de public_html o vinculada a ella.
        // Cambia esto a la carpeta raíz de tu aplicación en el servidor.
        const remoteAppDir = "/"; 
        
        await client.cd(remoteAppDir);

        // Al usar Next.js con output: "standalone", subimos la carpeta "standalone" y "static"

        // 3. Subir el código de la app (Standalone)
        console.log("Subiendo archivos de .next/standalone...");
        await client.uploadFromDir(".next/standalone");

        // 4. Subir la carpeta estática (.next/static debe ir dentro de .next/static remoto)
        console.log("Subiendo archivos estáticos (.next/static)...");
        await client.ensureDir(".next");
        await client.ensureDir(".next/static");
        await client.uploadFromDir(".next/static");

        // 5. Subir la carpeta public (archivos públicos, imágenes)
        console.log("Subiendo carpeta public...");
        await client.cd(remoteAppDir);
        await client.ensureDir("public");
        await client.uploadFromDir("public");

        console.log("\n🚀 ¡Archivos de Next.js subidos correctamente!");
        console.log("⚠️ Recuerda reiniciar tu App Node.js desde el panel de Hostinger/cPanel para aplicar los cambios.");

    } catch (err) {
        console.error("❌ Falló la subida:", err);
    } finally {
        client.close();
    }
}

deploy();
