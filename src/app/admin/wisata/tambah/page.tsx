'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { addWisata } from '@/lib/actions';

export default function AddWisataPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await addWisata(formData);

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
        <h1 className="font-extrabold text-2xl md:text-3xl text-on-surface">Tambah Destinasi Wisata</h1>
        <p className="text-sm text-on-surface-variant">
          Formulir untuk mempublikasikan tempat wisata baru di Desa Selelos.
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Nama Destinasi</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Contoh: Air Terjun Kembar"
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Kategori</label>
              <select
                name="category"
                required
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
                placeholder="Contoh: Dusun Selelos, Kayangan"
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Jam Buka</label>
              <input
                type="text"
                name="open_hours"
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
                defaultValue={0}
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
                defaultValue={4.5}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Unggah File Foto</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full text-xs text-outline file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">URL Foto Fallback (Bila tidak unggah file)</label>
            <input
              type="text"
              name="image_url_fallback"
              placeholder="Contoh: https://images.unsplash.com/photo-..."
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-bold rounded-xl text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-55"
          >
            {loading ? 'Menyimpan...' : 'Simpan Destinasi'}
          </button>

        </form>
      </div>

    </div>
  );
}
