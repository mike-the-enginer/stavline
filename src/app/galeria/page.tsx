import Navbar from '@/components/Navbar';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { getGalleryFolders } from '@/lib/google-drive';

// Revalidate every 5 minutes so Drive changes appear without redeploy while reducing per-request load.
export const revalidate = 300;

export default async function GalleryPage() {
    const folders = await getGalleryFolders();

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-16">
                {folders.length > 0 ? (
                    <Gallery folders={folders} />
                ) : (
                    <div className="container mx-auto px-4 py-20 text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Galéria nie je dostupná</h2>
                        <p className="text-gray-600">
                            Nepodarilo sa načítať priečinky z Google Drive. Skontrolujte prosím konfiguráciu.
                        </p>
                        <div className="mt-8 p-4 bg-gray-100 rounded text-left overflow-auto max-w-2xl mx-auto">
                            <p className="font-mono text-sm">Debug info:</p>
                            <p className="font-mono text-xs text-gray-500">Folders count: {folders.length}</p>
                        </div>
                    </div>
                )}
            </div>
            <Contact />
            <Footer />
        </main>
    );
}
