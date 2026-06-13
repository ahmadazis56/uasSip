'use client';

import { useState } from 'react';

interface Foto {
  id: number;
  title: string;
  category: string;
  image_url: string;
  description: string;
}

export default function GaleriClient({ initialPhotos }: { initialPhotos: Foto[] }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['Semua', 'Alam', 'Budaya', 'Kegiatan'];

  const filteredPhotos = initialPhotos.filter((photo) => {
    return selectedCategory === 'Semua' || photo.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prevIndex) => (prevIndex! + 1) % filteredPhotos.length);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prevIndex) => (prevIndex! - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center bg-white p-4 rounded-2xl border border-surface-container-low shadow-sm max-w-md mx-auto">
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

      {/* Grid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPhotos.length > 0 ? (
          filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-surface-container-low"
            >
              <img
                src={photo.image_url}
                alt={photo.title || 'Foto Selelos'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-[9px] font-extrabold uppercase bg-secondary text-white px-2 py-0.5 rounded-full w-fit mb-2">
                  {photo.category}
                </span>
                <h4 className="font-serif font-bold text-lg leading-tight mb-1">{photo.title}</h4>
                <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">{photo.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-20 text-on-surface-variant bg-white rounded-2xl border border-surface-container-low">
            <span className="material-symbols-outlined text-4xl block text-secondary mb-2">photo_library</span>
            <p className="text-sm font-semibold">Tidak ada foto ditemukan.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={closeLightbox}
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          <button
            className="absolute left-6 text-white p-3 hover:bg-white/10 rounded-full transition-colors hidden sm:block"
            onClick={showPrev}
          >
            <span className="material-symbols-outlined text-3xl">chevron_left</span>
          </button>

          <div 
            className="max-w-4xl max-h-[80vh] flex flex-col items-center gap-4 text-white text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredPhotos[lightboxIndex].image_url}
              alt={filteredPhotos[lightboxIndex].title}
              className="max-w-full max-h-[70vh] rounded-xl object-contain border border-white/10 shadow-2xl"
            />
            <div className="space-y-1">
              <span className="text-[9px] font-extrabold uppercase bg-secondary text-white px-2.5 py-0.5 rounded-full inline-block">
                {filteredPhotos[lightboxIndex].category}
              </span>
              <h3 className="font-serif font-bold text-lg md:text-xl">{filteredPhotos[lightboxIndex].title}</h3>
              <p className="text-xs text-white/70 max-w-lg leading-relaxed">{filteredPhotos[lightboxIndex].description}</p>
            </div>
          </div>

          <button
            className="absolute right-6 text-white p-3 hover:bg-white/10 rounded-full transition-colors hidden sm:block"
            onClick={showNext}
          >
            <span className="material-symbols-outlined text-3xl">chevron_right</span>
          </button>
        </div>
      )}
    </div>
  );
}
