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
        let credentialsString = credentialsJson;

        // Check if the string is Base64 encoded (basic check: no curly braces at start)
        if (!credentialsJson.trim().startsWith('{')) {
            try {
                credentialsString = Buffer.from(credentialsJson, 'base64').toString('utf-8');
            } catch (e) {
                console.warn('Failed to decode Base64 credentials, assuming raw JSON');
            }
        }

        const credentials = JSON.parse(credentialsString);
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

        console.log('Fetching gallery folders from root folder:', rootFolderId);

        const query = `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
        console.log('Drive Query:', query);

        const response = await drive.files.list({
            q: query,
            fields: 'files(id, name, mimeType, parents)',
            orderBy: 'name',
        });

        const folders = (response.data.files as drive_v3.Schema$File[]) || [];
        console.log('Raw Drive Response Files:', JSON.stringify(folders, null, 2));

        console.log(`Found ${folders.length} gallery folders`);

        return folders.map((file) => ({
            id: file.id || '',
            name: file.name || 'Untitled',
        }));
    } catch (error) {
        console.error('Error fetching gallery folders:', error);
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }
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
