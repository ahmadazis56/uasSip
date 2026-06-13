import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WisataClient from '@/components/WisataClient';
import { getWisataList } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function WisataPage() {
  const initialWisata = await getWisataList('Semua');

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-surface">
        
        {/* Banner Section */}
        <section className="relative h-[250px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              alt="Destinasi Wisata"
              src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-black/75"></div>
          </div>
          <div className="relative z-10 text-center px-6 text-white space-y-2">
            <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight">Destinasi Wisata</h2>
            <p className="text-sm md:text-base opacity-90">
              Temukan keindahan alam tersembunyi dan petualangan yang tak terlupakan di Desa Selelos.
            </p>
          </div>
        </section>

        {/* Filters and List Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          <WisataClient initialWisata={initialWisata} />
        </div>

      </main>
      <Footer />
    </>
  );
}
