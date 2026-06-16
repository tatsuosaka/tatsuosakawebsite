import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { WorkGrid } from '@/components/WorkGrid';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <WorkGrid />
      <Contact />
    </main>
  );
}
