import { NextRequest, NextResponse } from 'next/server';
import { getDriveClient } from '@/lib/google-drive';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
    }

    try {
        const drive = getDriveClient();

        // Get file metadata to check mime type
        const fileMetadata = await drive.files.get({
            fileId: id,
            fields: 'mimeType, name',
        });

        const mimeType = fileMetadata.data.mimeType || 'application/octet-stream';

        // Get the file content as a stream
        const response = await drive.files.get(
            {
                fileId: id,
                alt: 'media',
            },
            { responseType: 'stream' }
        );

        // Create a new response with the stream
        // @ts-expect-error - ReadableStream type mismatch between node and web
        return new NextResponse(response.data, {
            headers: {
                'Content-Type': mimeType,
                'Cache-Control': 'public, max-age=3600',
            },
        });
    } catch (error) {
        console.error('Error fetching image:', error);
        return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
    }
}
