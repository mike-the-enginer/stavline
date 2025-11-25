import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { getGalleryFolders } from '@/lib/google-drive';

export default async function Home() {
  const folders = await getGalleryFolders();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <Gallery folders={folders} />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}
