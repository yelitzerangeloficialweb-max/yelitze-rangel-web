import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/admin-auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
    const authError = await requireAdminAuth();
    if (authError) return authError;

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No se subió ningún archivo' }, { status: 400 });
        }

        // Limit size to 5MB
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            return NextResponse.json({ error: 'El archivo excede el tamaño máximo de 5MB' }, { status: 400 });
        }

        // Validate MIME type
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedMimeTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Tipo de archivo no permitido. Solo se permiten imágenes (JPG, PNG, WEBP, GIF).' }, { status: 400 });
        }

        // Validate and clean extension
        const rawExt = file.name.split('.').pop()?.toLowerCase();
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
        if (!rawExt || !allowedExtensions.includes(rawExt)) {
            return NextResponse.json({ error: 'Extensión de archivo no permitida' }, { status: 400 });
        }

        // Normalize extension (e.g. jpeg -> jpg)
        const ext = rawExt === 'jpeg' ? 'jpg' : rawExt;

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload directory
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        
        // Ensure directory exists
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (error) {
            console.error('Error creando el directorio uploads:', error);
        }

        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${uniqueSuffix}.${ext}`;
        const path = join(uploadDir, filename);

        await writeFile(path, buffer);

        const url = `/uploads/${filename}`;

        return NextResponse.json({ url });
    } catch (error) {
        console.error('Error al subir archivo:', error);
        return NextResponse.json({ error: 'Error interno al subir el archivo' }, { status: 500 });
    }
}
