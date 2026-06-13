import Link from 'next/link';
import { getWisataList } from '@/lib/actions';
import DeleteWisataButton from '@/components/DeleteWisataButton';

export const dynamic = 'force-dynamic';

export default async function AdminWisataPage() {
  const wisataList = await getWisataList('Semua');

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-extrabold text-2xl md:text-3xl text-on-surface">Kelola Wisata</h1>
          <p className="text-sm text-on-surface-variant">
            Daftar destinasi wisata Desa Selelos yang ditampilkan ke publik.
          </p>
        </div>
        <Link
          href="/admin/wisata/tambah"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl text-xs transition-all shadow-md"
        >
          <span className="material-symbols-outlined text-sm">add_circle</span> Tambah Destinasi
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface border-b border-outline-variant/60 font-bold text-on-surface-variant">
                <th className="p-4 pl-6">Foto</th>
                <th className="p-4">Nama Destinasi</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Lokasi</th>
                <th className="p-4 text-right">Harga Tiket</th>
                <th className="p-4 pr-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-on-surface">
              {wisataList.length > 0 ? (
                wisataList.map((item) => (
                  <tr key={item.id} className="hover:bg-surface/30 transition-colors">
                    <td className="p-4 pl-6">
                      <img
                        src={item.image_url || 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=80&q=80'}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover border border-outline-variant"
                      />
                    </td>
                    <td className="p-4 font-bold">{item.name}</td>
                    <td className="p-4 text-xs font-semibold text-primary">{item.category}</td>
                    <td className="p-4 text-xs text-on-surface-variant">{item.location || '-'}</td>
                    <td className="p-4 text-right font-semibold">
                      {item.ticket_price > 0 ? `Rp ${item.ticket_price.toLocaleString('id-ID')}` : 'Gratis'}
                    </td>
                    <td className="p-4 pr-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/wisata/edit/${item.id}`}
                          className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                          title="Ubah Destinasi"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </Link>
                        
                        <DeleteWisataButton id={item.id} name={item.name} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl block text-outline mb-2">sentiment_dissatisfied</span>
                    Tidak ada destinasi wisata ditemukan. Klik **Tambah Destinasi** untuk membuat baru.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
