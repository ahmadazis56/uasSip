import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProfilDesa() {
  return (
    <>
      <Header />
      <main className="pt-16">
        
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              alt="Profil Desa Selelos"
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/45 to-black/85"></div>
          </div>
          <div className="relative z-10 text-center px-6 text-white max-w-3xl space-y-4">
            <h2 className="font-extrabold text-3xl md:text-5xl tracking-tight">Mengenal Desa Selelos</h2>
            <p className="text-base md:text-lg opacity-90 leading-relaxed">
              Harmoni Alam, Pelestarian Budaya, dan Keberlanjutan di Jantung Lombok Utara.
            </p>
          </div>
        </section>

        {/* Content Shell */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Body */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Tentang Desa */}
              <article className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <span className="material-symbols-outlined text-2xl font-bold">info</span>
                  <h3 className="font-bold text-2xl md:text-3xl text-on-surface">Tentang Desa</h3>
                </div>
                <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-sm border border-outline-variant leading-relaxed text-on-surface-variant space-y-4">
                  <p>
                    Desa Selelos merupakan permata tersembunyi yang terletak di lereng pegunungan Lombok Utara, menawarkan udara sejuk dan pemandangan hijau yang membentang indah. Desa ini dikenal sebagai gerbang menuju petualangan alam yang autentik, di mana adat istiadat suku Sasak tetap dijaga kelestariannya.
                  </p>
                  <p>
                    Keanekaragaman hayati yang melimpah, mulai dari perkebunan kopi robusta/arabika yang harum hingga air terjun tersembunyi yang megah, menjadikan Selelos destinasi utama bagi mereka yang mencari keasrian alam dan ketenangan pikiran.
                  </p>
                </div>
              </article>

              {/* Sejarah Desa */}
              <article className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <img 
                    className="rounded-2xl shadow-md w-full aspect-square object-cover" 
                    alt="Sejarah Sasak" 
                    src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80"
                  />
                </div>
                <div className="order-1 md:order-2 space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <span className="material-symbols-outlined text-2xl font-bold">history</span>
                    <h3 className="font-bold text-2xl md:text-3xl text-on-surface">Sejarah Desa</h3>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                    Berdiri sejak berabad-abad lalu, nama "Selelos" berasal dari dialek lokal Sasak yang bermakna "Tempat yang Bercahaya". Awalnya dihuni oleh para peladang yang mencari lahan pegunungan yang subur untuk menanam buah-buahan, kopi, dan padi. Seiring waktu, Selelos tumbuh menjadi desa adat penting yang mandiri, dan berhasil mempertahankan tradisi warisan leluhurnya hingga hari ini.
                  </p>
                </div>
              </article>

              {/* Visi & Misi */}
              <article className="space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <span className="material-symbols-outlined text-2xl font-bold">verified</span>
                  <h3 className="font-bold text-2xl md:text-3xl text-on-surface">Visi & Misi</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-primary p-6 md:p-8 rounded-2xl text-white shadow-md flex flex-col justify-center">
                    <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined">visibility</span> Visi
                    </h4>
                    <p className="text-sm md:text-base opacity-95 italic leading-relaxed">
                      "Menjadi Desa Wisata Mandiri yang Unggul dalam Pelestarian Alam dan Kesejahteraan Masyarakat Berbasis Kearifan Lokal Sasak pada Tahun 2030."
                    </p>
                  </div>
                  <div className="bg-surface-container-high p-6 md:p-8 rounded-2xl border border-primary/20 flex flex-col justify-center">
                    <h4 className="font-bold text-xl text-primary mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined">task_alt</span> Misi
                    </h4>
                    <ul className="space-y-2.5 text-xs md:text-sm list-disc pl-5 text-on-surface-variant leading-relaxed">
                      <li>Membangun fasilitas penunjang wisata ramah lingkungan.</li>
                      <li>Memberdayakan usaha mikro dan agrowisata kopi & durian lokal.</li>
                      <li>Melestarikan kesenian daerah, ritual adat, dan cagar alam desa.</li>
                      <li>Mengembangkan sistem tata kelola pariwisata yang transparan.</li>
                    </ul>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar / Quick Info */}
            <aside className="lg:col-span-4 space-y-8">
              
              {/* Struktur Organisasi */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm space-y-6">
                <h3 className="font-bold text-lg text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined">groups</span> Struktur Organisasi
                </h3>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">AS</div>
                    <div>
                      <p className="font-bold text-sm">Bapak Ahmad Sauki</p>
                      <p className="text-xs text-on-surface-variant">Kepala Desa Selelos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">SA</div>
                    <div>
                      <p className="font-bold text-sm">Ibu Siti Aminah</p>
                      <p className="text-xs text-on-surface-variant">Sekretaris Desa</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">WS</div>
                    <div>
                      <p className="font-bold text-sm">Bapak Wayan Sudirta</p>
                      <p className="text-xs text-on-surface-variant">Bendahara Desa</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Potensi Desa Chips */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm space-y-4">
                <h3 className="font-bold text-lg text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined">star</span> Potensi Desa
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">Agrowisata</span>
                  <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold">Kopi robusta</span>
                  <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold">Tenun Songket</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">Madu Pegunungan</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">Budaya Sasak</span>
                </div>
              </div>
            </aside>
          </div>

          {/* Potensi Detail Section */}
          <section className="mt-20 border-t border-outline-variant pt-16">
            <div className="text-center mb-12">
              <h3 className="font-bold text-2xl md:text-3xl text-primary mb-2">Potensi Unggulan Kami</h3>
              <p className="text-on-surface-variant text-sm md:text-base max-w-xl mx-auto">
                Mengulik keunikan hasil alam dan kerajinan masyarakat Desa Selelos.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant hover:shadow-md transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt="Kopi Selelos" 
                    src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h4 className="font-bold text-lg text-primary">Kopi Lereng Pegunungan</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Biji kopi pilihan yang dipanen di ketinggian lereng pegunungan, diproses dengan cara tradisional Sasak untuk aroma eksotik yang khas.
                  </p>
                </div>
              </div>
              {/* Card 2 */}
              <div className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant hover:shadow-md transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt="Wisata Alam" 
                    src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=600&q=80"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h4 className="font-bold text-lg text-primary">Keindahan Ekowisata</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Air terjun kembar tersembunyi, hutan adat yang lestari, serta jalur trekking Puncak Selelos yang menyegarkan mata dan pikiran.
                  </p>
                </div>
              </div>
              {/* Card 3 */}
              <div className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant hover:shadow-md transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt="Kerajinan Sasak" 
                    src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h4 className="font-bold text-lg text-primary">Kerajinan Kain Tenun</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Setiap helai benang ditenun secara telaten menggunakan metode tradisional oleh wanita Selelos, menjaga keaslian motif Sasak.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

      </main>
      <Footer />
    </>
  );
}
