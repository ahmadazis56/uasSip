import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LestariDesa() {
  return (
    <>
      <Header />
      <main className="pt-16">
        
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              alt="Lestari Desa Selelos"
              src="https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=1600&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-black/85"></div>
          </div>
          <div className="relative z-10 text-center px-6 text-white max-w-3xl space-y-4">
            <h2 className="font-extrabold text-3xl md:text-5xl tracking-tight">Selelos Lestari</h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">
              Inisiatif Pelestarian Alam, Ekowisata Berkelanjutan, dan Konservasi Hutan Adat.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
          
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-primary font-bold text-xs uppercase tracking-widest block">Menjaga Warisan Bumi</span>
              <h3 className="font-bold text-2xl md:text-3xl text-on-surface">Visi Konservasi Selelos</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                Masyarakat Selelos mempercayai bahwa alam adalah pemberi kehidupan yang harus dihormati. Hutan adat kami dilindungi oleh hukum adat (Awig-Awig) yang ketat untuk mencegah penebangan liar dan pembakaran hutan, demi menjaga mata air pegunungan tetap mengalir ke seluruh desa.
              </p>
            </div>
            <div>
              <img 
                className="rounded-2xl shadow-lg w-full aspect-[4/3] object-cover" 
                alt="Green forest conservation" 
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80"
              />
            </div>
          </section>

          {/* Program-Program */}
          <section className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="font-bold text-2xl md:text-3xl text-on-surface">Program Pelestarian Utama</h3>
              <p className="text-on-surface-variant text-sm md:text-base">
                Tindakan nyata masyarakat Desa Selelos untuk meminimalkan dampak lingkungan dan menjaga ekosistem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                  <span className="material-symbols-outlined">forest</span>
                </div>
                <h4 className="font-bold text-lg text-primary">Adopsi Pohon</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Wisatawan dapat berkontribusi dengan menanam dan mengadopsi bibit pohon lokal di kawasan hutan penyangga untuk mendukung penyerapan karbon.
                </p>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                  <span className="material-symbols-outlined">recycle</span>
                </div>
                <h4 className="font-bold text-lg text-primary">Bebas Plastik Sekali Pakai</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Gerakan pengurangan sampah plastik di tempat wisata dengan mengimbau pengunjung membawa tumbler dan menggunakan pembungkus dari serat daun kelapa.
                </p>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                  <span className="material-symbols-outlined">water_drop</span>
                </div>
                <h4 className="font-bold text-lg text-primary">Perlindungan Daerah Aliran Sungai</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Kerja bakti rutin penanaman pohon bambu di pinggiran sungai dan sekitar tebing air terjun untuk mencegah erosi dan menjaga kelestarian mata air.
                </p>
              </div>
            </div>
          </section>

          {/* Kampanye Ajakan */}
          <section className="bg-primary-container text-on-primary-container p-8 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 space-y-3">
              <h4 className="font-bold text-xl md:text-2xl">Mari Berkontribusi dalam Pelestarian</h4>
              <p className="text-sm opacity-90 leading-relaxed">
                Jadilah wisatawan yang bertanggung jawab. Anda dapat mendukung program penanaman pohon ini atau menyumbang dalam kegiatan bersih-bersih lingkungan hutan adat kami saat Anda berkunjung.
              </p>
            </div>
            <div className="text-left md:text-right">
              <span className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-full text-sm">
                Pelajari Panduan Wisata Hijau
              </span>
            </div>
          </section>

        </div>

      </main>
      <Footer />
    </>
  );
}
