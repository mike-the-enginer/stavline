import { NextRequest, NextResponse } from 'next/server';
import { getFolderImages } from '@/lib/google-drive';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const folderId = searchParams.get('folderId');

    if (!folderId) {
        return NextResponse.json({ error: 'Folder ID is required' }, { status: 400 });
    }

    try {
        const images = await getFolderImages(folderId);
        return NextResponse.json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
    }
}
