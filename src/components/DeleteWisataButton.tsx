'use client';

import { useState } from 'react';
import { deleteWisata } from '@/lib/actions';

export default function DeleteWisataButton({ id, name }: { id: number; name: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Apakah Anda yakin ingin menghapus destinasi "${name}"?`)) return;
    
    setLoading(true);
    const result = await deleteWisata(id);
    setLoading(false);
    
    if (result?.error) {
      alert(result.error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
      title="Hapus Destinasi"
    >
      <span className="material-symbols-outlined text-sm">
        {loading ? 'hourglass_empty' : 'delete'}
      </span>
    </button>
  );
}
