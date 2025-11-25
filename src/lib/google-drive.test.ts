import { getGalleryFolders, getFolderImages } from './google-drive';

describe('Google Drive Service', () => {
    it('should return mock folders', async () => {
        const folders = await getGalleryFolders();
        expect(folders).toHaveLength(3);
        expect(folders[0].name).toBe('Kúpeľne');
    });

    it('should return mock images for a folder', async () => {
        const images = await getFolderImages('1');
        expect(images).toHaveLength(2);
        expect(images[0].name).toBe('Bathroom 1');
    });

    it('should return empty array for unknown folder', async () => {
        const images = await getFolderImages('999');
        expect(images).toHaveLength(0);
    });
});
