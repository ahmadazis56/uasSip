'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Berita {
  id: number;
  title: string;
  category: string;
  content: string;
  image_url: string;
  author: string;
  published_at: string;
  created_at: string;
}

export default function BeritaClient({ initialBerita }: { initialBerita: Berita[] }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Kegiatan Desa', 'Pembangunan', 'Penghargaan', 'Info Wisata'];

  const filteredBerita = initialBerita.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(search.toLowerCase()) || 
      item.content.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'Semua' || 
      item.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-6 rounded-2xl border border-surface-container-low shadow-sm">
        
        {/* Search */}
        <div className="relative w-full md:w-96 flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant/70 text-lg">search</span>
          <input
            type="text"
            placeholder="Cari berita atau pengumuman..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-container-low focus:outline-none focus:border-secondary text-sm bg-surface"
          />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-container-low hover:bg-primary/10 text-on-surface-variant'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredBerita.length > 0 ? (
          filteredBerita.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-2xl overflow-hidden border border-surface-container-low shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={news.image_url || 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80'}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-primary text-white text-[9px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {news.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs text-outline mb-2">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-secondary">person</span> {news.author || 'Admin'}
                    </span>
                    <span>{new Date(news.published_at || news.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base md:text-lg text-on-surface leading-tight mb-2 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                    {news.content}
                  </p>
                </div>
                <Link
                  href={`/berita/${news.id}`}
                  className="text-secondary font-bold text-xs flex items-center gap-1 hover:underline mt-auto"
                >
                  Baca Selengkapnya <span className="material-symbols-outlined text-xs">open_in_new</span>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-20 text-on-surface-variant bg-white rounded-2xl border border-surface-container-low">
            <span className="material-symbols-outlined text-4xl block text-secondary mb-2">newspaper</span>
            <p className="text-sm font-semibold">Tidak ada berita ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
