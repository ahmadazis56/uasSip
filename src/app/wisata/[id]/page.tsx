import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getWisataById } from '@/lib/actions';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailWisataPage({ params }: PageProps) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  
  if (isNaN(id)) {
    notFound();
  }

  const destinasi = await getWisataById(id);

  if (!destinasi) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-surface">
        
        {/* Banner with image */}
        <section className="relative h-[480px] w-full overflow-hidden flex items-end">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              alt={destinasi.name}
              src={destinasi.image_url || 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-10 text-white w-full">
            <Link 
              href="/wisata" 
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-wider mb-5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
            >
              <span className="material-symbols-outlined text-[14px]">arrow_back</span> Kembali ke Wisata
            </Link>
            <div className="space-y-3">
              <span className="bg-secondary text-white text-[9px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md w-fit inline-block">
                {destinasi.category}
              </span>
              <h1 className="font-serif font-extrabold text-4xl md:text-6xl tracking-tight leading-none">
                {destinasi.name}
              </h1>
            </div>
          </div>
        </section>

        {/* Content Details */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Description */}
            <div className="lg:col-span-8 space-y-8 animate-fade-in">
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-surface-container-low shadow-sm space-y-5">
                <h2 className="font-serif font-bold text-xl text-primary flex items-center gap-2.5 border-b border-surface-container-low pb-3">
                  <span className="material-symbols-outlined text-secondary">description</span> Deskripsi Lengkap
                </h2>
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed whitespace-pre-line text-justify font-normal">
                  {destinasi.description}
                </p>
              </div>

              {/* Tips Berkunjung */}
              <div className="bg-surface-container-low p-6 md:p-8 rounded-2xl border border-surface-container/60 space-y-4">
                <h3 className="font-serif font-bold text-lg text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">lightbulb</span> Tips untuk Pengunjung
                </h3>
                <ul className="list-disc pl-5 space-y-2.5 text-xs md:text-sm text-on-surface-variant leading-relaxed font-normal">
                  <li>Gunakan sepatu atau alas kaki luar ruangan yang nyaman.</li>
                  <li>Bantu kami menjaga kelestarian dengan membawa botol minum isi ulang (Tumbler).</li>
                  <li>Hormati adat istiadat warga setempat dengan berpakaian sopan.</li>
                  <li>Untuk hasil foto terbaik, kunjungi lokasi di pagi hari saat cahaya matahari terbit keemasan.</li>
                </ul>
              </div>
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-4 space-y-8 animate-fade-in">
              
              {/* Information Cards */}
              <div className="bg-white p-6 rounded-2xl border border-surface-container-low shadow-sm space-y-6">
                <h3 className="font-serif font-bold text-lg text-primary border-b border-surface-container-low pb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">info</span> Informasi Detail
                </h3>
                
                <div className="space-y-4">
                  
                  {/* Rating */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                    <div>
                      <p className="text-[9px] text-outline font-bold uppercase tracking-wider">Rating Wisatawan</p>
                      <p className="font-bold text-sm text-on-surface">{destinasi.rating || '4.5'} / 5.0</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-lg">location_on</span>
                    </div>
                    <div>
                      <p className="text-[9px] text-outline font-bold uppercase tracking-wider">Lokasi</p>
                      <p className="font-bold text-sm text-on-surface">{destinasi.location || 'Kayangan, Lombok Utara'}</p>
                    </div>
                  </div>

                  {/* Open Hours */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-lg">schedule</span>
                    </div>
                    <div>
                      <p className="text-[9px] text-outline font-bold uppercase tracking-wider">Jam Layanan</p>
                      <p className="font-bold text-sm text-on-surface">{destinasi.open_hours || '08:00 - 17:00'}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-lg">payments</span>
                    </div>
                    <div>
                      <p className="text-[9px] text-outline font-bold uppercase tracking-wider">
                        {destinasi.category === 'Homestay' ? 'Harga Kamar' : 'Tiket Masuk'}
                      </p>
                      <p className="font-extrabold text-sm text-primary">
                        {destinasi.ticket_price > 0 ? `Rp ${destinasi.ticket_price.toLocaleString('id-ID')}` : 'Gratis'}
                      </p>
                    </div>
                  </div>

                </div>

                <Link
                  href="/kontak"
                  className="w-full py-3 bg-secondary hover:bg-secondary/95 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">chat</span> Rencanakan Liburan
                </Link>
              </div>

            </div>

          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
