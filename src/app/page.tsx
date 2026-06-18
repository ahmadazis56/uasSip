import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getWisataList, getBeritaList } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const allDestinasi = await getWisataList('Semua');
  const beritaList = await getBeritaList('Semua');

  // Filter into the Stay Raja Ampat categories
  const wisataList = allDestinasi.filter(d => d.category === 'Wisata').slice(0, 3);
  const homestayList = allDestinasi.filter(d => d.category === 'Homestay').slice(0, 4);
  const pengalamanList = allDestinasi.filter(d => d.category === 'Pengalaman').slice(0, 4);
  const recentBerita = beritaList.slice(0, 3);

  const iconBar = [
    { name: 'Trip Planning', icon: 'calendar_month' },
    { name: 'Hiking', icon: 'hiking' },
    { name: 'Kopi & Agrowisata', icon: 'local_cafe' },
    { name: 'Kebudayaan Sasak', icon: 'theater_comedy' },
    { name: 'Konservasi Alam', icon: 'forest' },
  ];

  return (
    <>
      <Header />
      <main className="pt-0 bg-surface">
        
        {/* 1. Hero Section */}
        <section className="relative h-screen w-full overflow-hidden flex items-center">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              alt="Desa Selelos"
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-white w-full space-y-6 mt-16 text-center md:text-left">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest block">Lombok Utara, Indonesia</span>
            <h1 className="font-serif font-extrabold text-5xl md:text-7xl tracking-tight leading-[1.15] max-w-2xl relative">
              Mountain Stays.<br />Reimagined.
              <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-24 h-1 bg-secondary rounded"></span>
            </h1>
            <p className="text-sm md:text-base max-w-xl opacity-90 leading-relaxed pt-2">
              Authentic Sasak village stays. Pristine mountain nature. Meaningful cultural connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Link 
                href="/wisata" 
                className="bg-primary text-white text-center px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-secondary transition-all shadow-lg"
              >
                Jelajahi Wisata
              </Link>
              <Link 
                href="/profil" 
                className="glass-morphism text-white text-center px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-all"
              >
                Tentang Desa
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Horizontal Icon Bar */}
        <section className="bg-surface-container-low border-b border-surface-container">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-surface-container text-center py-6">
              {iconBar.map((item) => (
                <div key={item.name} className="py-4 sm:py-0 flex flex-col items-center justify-center gap-2.5 text-on-surface-variant hover:text-primary transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-secondary text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. About Section ("Stay Local. Travel Well") */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Video Showcase on Left */}
            <div className="relative group overflow-hidden rounded-2xl shadow-xl aspect-[4/3] w-full">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Air Terjun Tiu Saong" 
                src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80"
              />
              <div className="absolute inset-0 bg-black/35 flex items-center justify-center group-hover:bg-black/20 transition-all">
                <button className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300">
                  <span className="material-symbols-outlined text-3xl pl-1" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </button>
              </div>
            </div>

            {/* Description on Right */}
            <div className="space-y-6">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest block">Authentic, Sustainable, Local</span>
              <h2 className="font-serif font-bold text-4xl md:text-5xl text-primary leading-tight">
                Stay Local.<br />Travel Well.
              </h2>
              <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                Masyarakat Desa Selelos mengelola ekowisata secara mandiri demi melindungi kelestarian hutan adat dan mata air pegunungan Lombok Utara, sekaligus menyambut kedatangan Anda dengan kehangatan budaya suku Sasak.
              </p>
              
              <ul className="space-y-4 pt-2">
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary text-2xl mt-0.5">groups</span>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-on-surface">Community-Owned</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">Dikelola sepenuhnya oleh kelompok sadar wisata (Pokdarwis) desa setempat.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary text-2xl mt-0.5">forest</span>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-on-surface">Sustainably by Nature</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">Hukum adat Awig-Awig menjaga kelestarian hutan adat Selelos tetap hijau lestari.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary text-2xl mt-0.5">explore</span>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-on-surface">Immersive Experiences</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">Ikuti keseharian memetik kopi pegunungan hingga menenun kain tradisional Sasak.</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* 4. Our Attractions Section ("Our Islands" layout) */}
        <section className="py-20 bg-surface-container-low/40 border-t border-b border-surface-container-low">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest block">Our Attractions</span>
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-primary">Pesona Keindahan Alam</h2>
              <div className="w-12 h-[2px] bg-secondary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {wisataList.map((item) => (
                <div key={item.id} className="group relative h-80 rounded-2xl overflow-hidden shadow-md cursor-pointer border border-surface-container/60">
                  <img 
                    src={item.image_url} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent flex flex-col justify-end p-6 text-white space-y-1">
                    <h3 className="font-serif font-bold text-lg">{item.name}</h3>
                    <p className="text-[10px] text-white/70 line-clamp-2 leading-relaxed">{item.description}</p>
                    <Link href={`/wisata/${item.id}`} className="text-[10px] font-bold uppercase tracking-wider text-secondary flex items-center gap-1 hover:text-white pt-2 transition-colors">
                      Jelajahi Wisata <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Featured Homestays Section */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest block">Featured Homestays</span>
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-primary">Penginapan Unggulan</h2>
              <div className="w-12 h-[2px] bg-secondary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {homestayList.map((stay) => (
                <div key={stay.id} className="group bg-white rounded-2xl overflow-hidden border border-surface-container-low shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div className="h-44 w-full overflow-hidden relative">
                    <img 
                      src={stay.image_url} 
                      alt={stay.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px] text-yellow-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      {stay.rating}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-serif font-bold text-sm text-on-surface leading-snug">{stay.name}</h3>
                      <p className="text-[10px] text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-secondary">location_on</span>
                        {stay.location}
                      </p>
                      <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed">
                        {stay.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-surface-container-low flex justify-between items-center mt-auto">
                      <div>
                        <span className="text-[9px] text-outline block uppercase tracking-wider">Per Malam</span>
                        <span className="text-xs font-bold text-primary">Rp {stay.ticket_price.toLocaleString('id-ID')}</span>
                      </div>
                      <Link 
                        href={`/wisata/${stay.id}`}
                        className="border border-secondary hover:bg-secondary hover:text-white text-secondary text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-colors"
                      >
                        Lihat Homestay
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Experiences That Stay With You Section */}
        <section className="py-24 bg-surface-container-low/40 border-t border-surface-container-low">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest block">Experiences That Stay With You</span>
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-primary">Pengalaman Menarik</h2>
              <div className="w-12 h-[2px] bg-secondary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pengalamanList.map((exp) => (
                <div key={exp.id} className="group relative h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <img 
                    src={exp.image_url} 
                    alt={exp.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-90 group-hover:opacity-80 transition-opacity flex flex-col justify-between p-5 text-white">
                    <div></div>
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-sm">{exp.name}</h4>
                      <p className="text-[10px] text-white/70 line-clamp-2 leading-relaxed">{exp.description}</p>
                      <Link href={`/wisata/${exp.id}`} className="text-[9px] font-bold uppercase tracking-wider text-secondary flex items-center gap-1 hover:text-white pt-2">
                        Ikuti Kegiatan <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. CTA Section ("Your escape awaits...") */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto bg-primary rounded-3xl p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80" 
                alt="" 
                className="w-full h-full object-cover opacity-15"
              />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="font-serif font-extrabold text-3xl md:text-5xl leading-tight">Your Selelos escape awaits.</h2>
              <p className="text-sm md:text-base opacity-90 leading-relaxed max-w-lg mx-auto">
                Slow down. Connect deeper. Leave inspired. Rencanakan liburan Anda bersama kami hari ini.
              </p>
              <Link 
                href="/kontak"
                className="inline-block bg-secondary hover:bg-secondary/95 text-white px-10 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                Plan Your Escape
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
