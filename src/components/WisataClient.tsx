'use client';

import { useState } from 'react';
import Link from 'next/link';

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

export default function WisataClient({ initialWisata }: { initialWisata: Destinasi[] }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Wisata', 'Homestay', 'Pengalaman'];

  const filteredWisata = initialWisata.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(search.toLowerCase()) || 
      item.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'Semua' || 
      item.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Search and Category Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-6 rounded-2xl border border-surface-container-low shadow-sm">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96 flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant/70 text-lg">search</span>
          <input
            type="text"
            placeholder="Cari destinasi, homestay, atau aktivitas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-container-low focus:outline-none focus:border-secondary text-sm bg-surface"
          />
        </div>

        {/* Categories Tab */}
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

      {/* Grid of Attractions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredWisata.length > 0 ? (
          filteredWisata.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-2xl overflow-hidden border border-surface-container-low shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={dest.image_url || 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80'}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-primary text-white text-[9px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {dest.category}
                </span>
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[14px] text-yellow-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  {dest.rating || '4.5'}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif font-bold text-lg text-on-surface leading-tight mb-2 group-hover:text-primary transition-colors">
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-3">
                    <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
                    <span>{dest.location || 'Desa Selelos'}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                    {dest.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-surface-container-low flex justify-between items-center mt-auto">
                  <div>
                    <span className="text-[9px] text-outline block uppercase tracking-wider font-semibold">
                      {dest.category === 'Homestay' ? 'Per Malam' : 'Harga Tiket'}
                    </span>
                    <span className="text-xs font-extrabold text-primary">
                      {dest.ticket_price > 0 ? `Rp ${dest.ticket_price.toLocaleString('id-ID')}` : 'Gratis'}
                    </span>
                  </div>
                  <Link
                    href={`/wisata/${dest.id}`}
                    className="border border-secondary hover:bg-secondary hover:text-white text-secondary text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-colors flex items-center gap-1"
                  >
                    Detail <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-20 text-on-surface-variant bg-white rounded-2xl border border-surface-container-low">
            <span className="material-symbols-outlined text-4xl block text-secondary mb-2">sentiment_dissatisfied</span>
            <p className="text-sm font-semibold">Tidak ada hasil ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
