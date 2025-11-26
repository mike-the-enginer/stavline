import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { getGalleryFolders } from '@/lib/google-drive';

// Revalidate every 5 minutes so Drive changes appear without redeploy while reducing per-request load.
export const revalidate = 300;

export default async function Home() {
  const folders = await getGalleryFolders();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
