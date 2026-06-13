import Link from 'next/link';
import { getAdminDashboardStats } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const stats = await getAdminDashboardStats();

  const statCards = [
    { name: 'Destinasi Wisata', value: stats.wisataCount, icon: 'forest', href: '/admin/wisata', color: 'bg-emerald-500/10 text-emerald-700' },
    { name: 'Artikel Berita', value: stats.beritaCount, icon: 'newspaper', href: '/admin/berita', color: 'bg-blue-500/10 text-blue-700' },
    { name: 'Foto Galeri', value: stats.galeriCount, icon: 'photo_library', href: '/admin/galeri', color: 'bg-indigo-500/10 text-indigo-700' },
    { name: 'Pesan Masuk', value: stats.pesanCount, icon: 'mail', href: '/admin/pesan', color: 'bg-amber-500/10 text-amber-700' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div>
        <h1 className="font-extrabold text-2xl md:text-3xl text-on-surface">Ringkasan Dashboard</h1>
        <p className="text-sm text-on-surface-variant">
          Selamat datang di panel admin. Kelola konten pariwisata Desa Selelos dengan mudah.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.name} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-on-surface-variant block">{card.name}</span>
              <span className="text-3xl font-extrabold text-on-surface block">{card.value}</span>
            </div>
            <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center`}>
              <span className="material-symbols-outlined text-2xl">{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Instruction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Quick Links */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm space-y-4">
          <h3 className="font-bold text-lg text-primary flex items-center gap-2">
            <span className="material-symbols-outlined">bolt</span> Pintasan Tindakan Cepat
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/admin/wisata/tambah"
              className="flex items-center gap-2.5 p-4 rounded-xl bg-surface hover:bg-primary-container/10 border border-outline-variant/60 hover:border-primary transition-all text-xs font-bold text-on-surface-variant hover:text-primary"
            >
              <span className="material-symbols-outlined text-sm">add_circle</span> Tambah Wisata Baru
            </Link>
            <Link
              href="/admin/berita"
              className="flex items-center gap-2.5 p-4 rounded-xl bg-surface hover:bg-primary-container/10 border border-outline-variant/60 hover:border-primary transition-all text-xs font-bold text-on-surface-variant hover:text-primary"
            >
              <span className="material-symbols-outlined text-sm">edit</span> Kelola Berita Desa
            </Link>
            <Link
              href="/admin/galeri"
              className="flex items-center gap-2.5 p-4 rounded-xl bg-surface hover:bg-primary-container/10 border border-outline-variant/60 hover:border-primary transition-all text-xs font-bold text-on-surface-variant hover:text-primary"
            >
              <span className="material-symbols-outlined text-sm">photo_camera</span> Unggah Foto Baru
            </Link>
            <Link
              href="/admin/pesan"
              className="flex items-center gap-2.5 p-4 rounded-xl bg-surface hover:bg-primary-container/10 border border-outline-variant/60 hover:border-primary transition-all text-xs font-bold text-on-surface-variant hover:text-primary relative"
            >
              <span className="material-symbols-outlined text-sm">inbox</span> Lihat Pesan Masuk
              {stats.pesanBaruCount > 0 && (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-[9px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center">
                  {stats.pesanBaruCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Info panel */}
        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 space-y-4">
          <h3 className="font-bold text-lg text-primary flex items-center gap-2">
            <span className="material-symbols-outlined">help</span> Panduan Singkat Admin
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm text-on-surface-variant leading-relaxed">
            <li>**Kelola Wisata**: Tambahkan tempat menarik, tentukan jam buka, deskripsi, harga tiket, dan foto utama untuk ditampilkan di website pariwisata.</li>
            <li>**Kelola Berita**: Buat pengumuman penting atau artikel kegiatan desa agar wisatawan dan masyarakat terus terupdate.</li>
            <li>**Kelola Galeri**: Unggah foto-foto pemandangan atau kebudayaan terbaru desa untuk memamerkan daya tarik Desa Selelos.</li>
            <li>**Pesan Masuk**: Baca pesan atau pertanyaan reservasi tour guide dari form kontak publik dan hubungi balik melalui email mereka.</li>
          </ul>
        </div>

      </div>

    </div>
  );
}
