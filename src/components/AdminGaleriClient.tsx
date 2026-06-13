'use client';

import { useState } from 'react';
import { addGaleri, deleteGaleri } from '@/lib/actions';
import { useRouter } from 'next/navigation';

interface Foto {
  id: number;
  title: string;
  category: string;
  image_url: string;
  description: string;
}

export default function AdminGaleriClient({ initialPhotos }: { initialPhotos: Foto[] }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await addGaleri(formData);

    setLoading(false);
    if (result?.error) {
      setError(result.error);
    } else {
      (e.target as HTMLFormElement).reset();
      router.refresh();
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus foto "${title || 'Tanpa Judul'}" dari galeri?`)) return;
    
    setError(null);
    const result = await deleteGaleri(id);
    if (result?.error) {
      setError(result.error);
    } else {
      router.refresh();
    }
  };

  const categories = ['Alam', 'Budaya', 'Kegiatan'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
      
      {/* Upload Form */}
      <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm h-fit space-y-5">
        <h3 className="font-bold text-lg text-primary flex items-center gap-2">
          <span className="material-symbols-outlined">add_photo_alternate</span>
          Unggah Foto Baru
        </h3>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Judul Foto</label>
            <input
              type="text"
              name="title"
              placeholder="Contoh: Menenun Songket"
              className="w-full px-4 py-2 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Kategori</label>
            <select
              name="category"
              required
              className="w-full px-4 py-2 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
            >
              <option value="">-- Pilih --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Keterangan / Deskripsi</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Tuliskan cerita singkat tentang foto ini..."
              className="w-full px-4 py-2 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">File Foto</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="text-xs text-outline file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">URL Foto Fallback</label>
            <input
              type="text"
              name="image_url_fallback"
              placeholder="Contoh: https://images.unsplash.com/photo-..."
              className="w-full px-4 py-2 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:scale-105 active:scale-95 transition-all shadow-md disabled:opacity-55"
          >
            {loading ? 'Mengunggah...' : 'Unggah Foto'}
          </button>
        </form>
      </div>

      {/* Photos Grid */}
      <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm p-6 space-y-4 h-fit">
        <h3 className="font-bold text-lg text-primary border-b border-outline-variant/60 pb-3">Galeri Foto</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
          {initialPhotos.length > 0 ? (
            initialPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative rounded-xl overflow-hidden border border-outline-variant shadow-sm aspect-[4/3]"
              >
                <img
                  src={photo.image_url}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between text-white">
                  <span className="text-[9px] font-extrabold uppercase bg-primary text-white px-2 py-0.5 rounded-full w-fit">
                    {photo.category}
                  </span>
                  <div>
                    <h5 className="font-bold text-sm leading-tight line-clamp-1">{photo.title}</h5>
                    <p className="text-[10px] text-white/80 line-clamp-2 mt-1 mb-3">{photo.description}</p>
                    <button
                      onClick={() => handleDelete(photo.id, photo.title)}
                      className="w-full py-1.5 bg-red-600 text-white font-bold rounded-lg text-[10px] hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">delete</span> Hapus Foto
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 text-on-surface-variant">
              Belum ada foto dalam galeri.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
