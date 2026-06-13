import { getBeritaList } from '@/lib/actions';
import AdminBeritaClient from '@/components/AdminBeritaClient';

export const dynamic = 'force-dynamic';

export default async function AdminBeritaPage() {
  const initialBerita = await getBeritaList('Semua');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-extrabold text-2xl md:text-3xl text-on-surface">Kelola Berita</h1>
        <p className="text-sm text-on-surface-variant">
          Terbitkan artikel kegiatan desa, pembangunan, atau informasi wisata terbaru.
        </p>
      </div>

      <AdminBeritaClient initialBerita={initialBerita} />

    </div>
  );
}
