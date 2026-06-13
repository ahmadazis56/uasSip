'use client';

import { useState } from 'react';
import { addBerita, updateBerita, deleteBerita } from '@/lib/actions';
import { useRouter } from 'next/navigation';

interface Berita {
  id: number;
  title: string;
  category: string;
  content: string;
  image_url: string;
  author: string;
  published_at: string;
}

export default function AdminBeritaClient({ initialBerita }: { initialBerita: Berita[] }) {
  const [editingItem, setEditingItem] = useState<Berita | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddOrUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    let result;

    if (editingItem) {
      formData.append('id', editingItem.id.toString());
      result = await updateBerita(formData);
    } else {
      result = await addBerita(formData);
    }

    setLoading(false);
    if (result?.error) {
      setError(result.error);
    } else {
      setEditingItem(null);
      (e.target as HTMLFormElement).reset();
      router.refresh();
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus berita "${title}"?`)) return;
    
    setError(null);
    const result = await deleteBerita(id);
    if (result?.error) {
      setError(result.error);
    } else {
      router.refresh();
    }
  };

  const categories = ['Kegiatan Desa', 'Pembangunan', 'Penghargaan', 'Info Wisata'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
      
      {/* Form Section */}
      <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm h-fit space-y-5">
        <h3 className="font-bold text-lg text-primary flex items-center gap-2">
          <span className="material-symbols-outlined">{editingItem ? 'edit' : 'add_circle'}</span>
          {editingItem ? 'Ubah Berita' : 'Tambah Berita Baru'}
        </h3>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleAddOrUpdate} className="space-y-4" encType="multipart/form-data" key={editingItem?.id || 'new'}>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Judul Berita</label>
            <input
              type="text"
              name="title"
              required
              defaultValue={editingItem?.title || ''}
              placeholder="Contoh: Perbaikan Jalur Puncak"
              className="w-full px-4 py-2 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Kategori</label>
              <select
                name="category"
                required
                defaultValue={editingItem?.category || ''}
                className="w-full px-4 py-2 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
              >
                <option value="">-- Pilih --</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Penulis</label>
              <input
                type="text"
                name="author"
                defaultValue={editingItem?.author || 'Admin'}
                className="w-full px-4 py-2 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Konten Berita</label>
            <textarea
              name="content"
              required
              rows={6}
              defaultValue={editingItem?.content || ''}
              placeholder="Tuliskan berita lengkap..."
              className="w-full px-4 py-2 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Foto Berita</label>
            <div className="flex items-center gap-3">
              {editingItem?.image_url && (
                <img
                  src={editingItem.image_url}
                  alt=""
                  className="w-10 h-10 rounded-lg object-cover border border-outline-variant"
                />
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                className="text-xs text-outline file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">URL Foto Fallback</label>
            <input
              type="text"
              name="image_url_fallback"
              defaultValue={editingItem ? '' : 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80'}
              placeholder="Contoh: https://images.unsplash.com/..."
              className="w-full px-4 py-2 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:scale-105 active:scale-95 transition-all shadow-md disabled:opacity-55"
            >
              {loading ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Terbitkan Berita'}
            </button>
            {editingItem && (
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2.5 bg-surface border border-outline-variant text-on-surface-variant font-bold rounded-xl text-xs hover:bg-surface-variant"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm overflow-hidden h-fit">
        <div className="p-4 border-b border-outline-variant/60">
          <h3 className="font-bold text-lg text-primary">Daftar Berita</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface border-b border-outline-variant/60 font-bold text-on-surface-variant">
                <th className="p-4 pl-6">Foto</th>
                <th className="p-4">Judul</th>
                <th className="p-4">Kategori</th>
                <th className="p-4 pr-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-on-surface">
              {initialBerita.length > 0 ? (
                initialBerita.map((item) => (
                  <tr key={item.id} className="hover:bg-surface/30 transition-colors">
                    <td className="p-4 pl-6">
                      <img
                        src={item.image_url || 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=80&q=80'}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover border border-outline-variant"
                      />
                    </td>
                    <td className="p-4">
                      <p className="font-bold line-clamp-1">{item.title}</p>
                      <p className="text-[10px] text-outline">Oleh: {item.author} • {new Date(item.published_at).toLocaleDateString('id-ID')}</p>
                    </td>
                    <td className="p-4 text-xs font-semibold text-primary">{item.category}</td>
                    <td className="p-4 pr-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                          title="Ubah Berita"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                          title="Hapus Berita"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-on-surface-variant">
                    Belum ada berita diterbitkan.
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
