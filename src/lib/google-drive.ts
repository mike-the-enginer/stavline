import { GalleryFolder, GalleryImage } from '@/types';

// Mock data for development
const MOCK_FOLDERS: GalleryFolder[] = [
    { id: '1', name: 'Kúpeľne' },
    { id: '2', name: 'Zateplenie' },
    { id: '3', name: 'Fasády' },
];

const MOCK_IMAGES: Record<string, GalleryImage[]> = {
    '1': [
        { id: 'img1', name: 'Bathroom 1', url: 'https://placehold.co/600x400?text=Kupelna+1' },
        { id: 'img2', name: 'Bathroom 2', url: 'https://placehold.co/600x400?text=Kupelna+2' },
    ],
    '2': [
        { id: 'img3', name: 'Insulation 1', url: 'https://placehold.co/600x400?text=Zateplenie+1' },
    ],
    '3': [
        { id: 'img4', name: 'Facade 1', url: 'https://placehold.co/600x400?text=Fasada+1' },
        { id: 'img5', name: 'Facade 2', url: 'https://placehold.co/600x400?text=Fasada+2' },
        { id: 'img6', name: 'Facade 3', url: 'https://placehold.co/600x400?text=Fasada+3' },
    ],
};

export async function getGalleryFolders(): Promise<GalleryFolder[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_FOLDERS;
}

export async function getFolderImages(folderId: string): Promise<GalleryImage[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_IMAGES[folderId] || [];
}
