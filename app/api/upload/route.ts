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
        const ext = file.name.split('.').pop();
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
