import { google, drive_v3 } from 'googleapis';
import { GalleryFolder, GalleryImage } from '@/types';

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

// Helper to initialize the Drive client
export const getDriveClient = () => {
    const credentialsJson = process.env.GOOGLE_DRIVE_CREDENTIALS || process.env.GCP_SA_KEY;
    const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;

    if (!credentialsJson) {
        console.warn('Missing GOOGLE_DRIVE_CREDENTIALS or GCP_SA_KEY. Using mock data would be appropriate here, but throwing error for now.');
        // In a real app, you might want to fallback to mocks if dev, but let's be strict for now as requested.
        throw new Error('Missing GOOGLE_DRIVE_CREDENTIALS or GCP_SA_KEY environment variable');
    }

    if (!rootFolderId) {
        throw new Error('Missing GOOGLE_DRIVE_ROOT_FOLDER_ID environment variable');
    }

    try {
        const credentials = JSON.parse(credentialsJson);
        console.log('Initializing Drive Client with Service Account:', credentials.client_email);
        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: SCOPES,
        });

        return google.drive({ version: 'v3', auth });
    } catch (error) {
        console.error('Error parsing Google Drive credentials:', error);
        throw new Error('Invalid GOOGLE_DRIVE_CREDENTIALS format');
    }
};

export async function getGalleryFolders(): Promise<GalleryFolder[]> {
    try {
        const drive = getDriveClient();
        const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;

        const response = await drive.files.list({
            q: `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
            fields: 'files(id, name)',
            orderBy: 'name',
        });

        const folders = (response.data.files as drive_v3.Schema$File[]) || [];

        return folders.map((file) => ({
            id: file.id || '',
            name: file.name || 'Untitled',
        }));
    } catch (error) {
        console.error('Error fetching gallery folders:', error);
        return [];
    }
}

export async function getFolderImages(folderId: string): Promise<GalleryImage[]> {
    try {
        const drive = getDriveClient();

        const response = await drive.files.list({
            q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
            fields: 'files(id, name, webViewLink, thumbnailLink, webContentLink)',
            orderBy: 'createdTime desc',
        });

        const files = (response.data.files as drive_v3.Schema$File[]) || [];

        return files.map((file) => {
            return {
                id: file.id || '',
                name: file.name || 'Untitled',
                url: `/api/gallery/image/${file.id}`, // Proxy through our API to handle auth
                thumbnailUrl: file.thumbnailLink || undefined,
            };
        });
    } catch (error) {
        console.error(`Error fetching images for folder ${folderId}:`, error);
        return [];
    }
}
