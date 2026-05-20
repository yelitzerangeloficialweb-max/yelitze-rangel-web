import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

interface RouteParams {
    params: Promise<{ filename: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { filename } = await params;
        const filePath = join(process.cwd(), 'public', 'uploads', filename);

        // Check if the file actually exists
        if (!existsSync(filePath)) {
            return new NextResponse('File not found', { status: 404 });
        }

        // Read file contents
        const fileBuffer = await readFile(filePath);
        
        // Determine correct Content-Type based on extension
        const ext = filename.split('.').pop()?.toLowerCase();
        let contentType = 'application/octet-stream';
        
        if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
        else if (ext === 'png') contentType = 'image/png';
        else if (ext === 'webp') contentType = 'image/webp';
        else if (ext === 'gif') contentType = 'image/gif';
        else if (ext === 'svg') contentType = 'image/svg+xml';
        else if (ext === 'ico') contentType = 'image/x-icon';

        // Return image response with browser caching (1 year cache control)
        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error('Error serving uploaded file:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
