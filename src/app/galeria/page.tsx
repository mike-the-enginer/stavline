import Navbar from '@/components/Navbar';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { getGalleryFolders } from '@/lib/google-drive';

export default async function GalleryPage() {
    const folders = await getGalleryFolders();

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-16">
                <Gallery folders={folders} />
            </div>
            <Contact />
            <Footer />
        </main>
    );
}
