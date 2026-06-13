import { getGaleriList } from '@/lib/actions';
import AdminGaleriClient from '@/components/AdminGaleriClient';

export const dynamic = 'force-dynamic';

export default async function AdminGaleriPage() {
  const initialPhotos = await getGaleriList('Semua');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-extrabold text-2xl md:text-3xl text-on-surface">Kelola Galeri</h1>
        <p className="text-sm text-on-surface-variant">
          Unggah foto dokumentasi keindahan alam, adat Sasak, dan kerajinan warga lokal Desa Selelos.
        </p>
      </div>

      <AdminGaleriClient initialPhotos={initialPhotos} />

    </div>
  );
}
