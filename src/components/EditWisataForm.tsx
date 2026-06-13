'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { updateWisata } from '@/lib/actions';

interface Destinasi {
  id: number;
  name: string;
  category: string;
  description: string;
  image_url: string;
  location: string;
  rating: number;
  open_hours: string;
  ticket_price: number;
}

export default function EditWisataForm({ destinasi }: { destinasi: Destinasi }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await updateWisata(formData);

    setLoading(false);
    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/admin/wisata');
      router.refresh();
    }
  };

  const categories = ['Air Terjun', 'Puncak', 'Budaya', 'Kegiatan'];

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-fade-in">
      
      {/* Breadcrumb */}
      <div>
        <Link 
          href="/admin/wisata" 
          className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold mb-2"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span> Kembali ke Daftar Wisata
        </Link>
        <h1 className="font-extrabold text-2xl md:text-3xl text-on-surface">Ubah Destinasi Wisata</h1>
        <p className="text-sm text-on-surface-variant">
          Perbarui informasi mengenai {destinasi.name}.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl border border-outline-variant shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
          
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
              {error}
            </div>
          )}

          {/* Hidden ID */}
          <input type="hidden" name="id" value={destinasi.id} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Nama Destinasi</label>
              <input
                type="text"
                name="name"
                required
                defaultValue={destinasi.name}
                placeholder="Contoh: Air Terjun Kembar"
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Kategori</label>
              <select
                name="category"
                required
                defaultValue={destinasi.category}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
              >
                <option value="">-- Pilih Kategori --</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Deskripsi Destinasi</label>
            <textarea
              name="description"
              required
              rows={5}
              defaultValue={destinasi.description}
              placeholder="Tuliskan pesona wisata, keistimewaan, daya tarik, dll..."
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Lokasi / Koordinat</label>
              <input
                type="text"
                name="location"
                defaultValue={destinasi.location}
                placeholder="Contoh: Dusun Selelos, Kayangan"
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Jam Buka</label>
              <input
                type="text"
                name="open_hours"
                defaultValue={destinasi.open_hours}
                placeholder="Contoh: 08:00 - 17:00 WITA"
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Harga Tiket Masuk (IDR)</label>
              <input
                type="number"
                name="ticket_price"
                defaultValue={destinasi.ticket_price}
                placeholder="Contoh: 10000"
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Rating Awal (1.0 - 5.0)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                name="rating"
                defaultValue={destinasi.rating}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Foto Saat Ini</label>
              <div className="flex items-center gap-3">
                <img
                  src={destinasi.image_url}
                  alt={destinasi.name}
                  className="w-12 h-12 rounded-lg object-cover border border-outline-variant"
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="text-xs text-outline file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-bold rounded-xl text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-55"
          >
            {loading ? 'Memperbarui...' : 'Simpan Perubahan'}
          </button>

        </form>
      </div>

    </div>
  );
}
