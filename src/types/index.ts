export interface GalleryFolder {
    id: string;
    name: string;
}

export interface GalleryImage {
    id: string;
    name: string;
    url: string; // webViewLink or similar
    thumbnailUrl?: string;
}
