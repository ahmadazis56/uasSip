'use client';

import { useState } from 'react';
import { togglePesanStatus, deletePesan } from '@/lib/actions';
import { useRouter } from 'next/navigation';

interface Pesan {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminPesanClient({ initialMessages }: { initialMessages: Pesan[] }) {
  const [selectedMessage, setSelectedMessage] = useState<Pesan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleToggleStatus = async (pesan: Pesan) => {
    setError(null);
    const result = await togglePesanStatus(pesan.id, pesan.status);
    if (result?.error) {
      setError(result.error);
    } else {
      // Update locally if selected
      if (selectedMessage && selectedMessage.id === pesan.id) {
        setSelectedMessage({
          ...selectedMessage,
          status: pesan.status === 'Baru' ? 'Dibaca' : 'Baru'
        });
      }
      router.refresh();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pesan ini?')) return;
    
    setError(null);
    const result = await deletePesan(id);
    if (result?.error) {
      setError(result.error);
    } else {
      setSelectedMessage(null);
      router.refresh();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
      
      {/* Inbox List */}
      <div className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm overflow-hidden h-[600px] flex flex-col">
        <div className="p-4 border-b border-outline-variant/60 bg-surface/30">
          <h3 className="font-bold text-base text-primary flex items-center gap-1.5">
            <span className="material-symbols-outlined text-lg">inbox</span> Kotak Masuk ({initialMessages.length})
          </h3>
        </div>
        
        <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/30">
          {initialMessages.length > 0 ? (
            initialMessages.map((msg) => {
              const isSelected = selectedMessage?.id === msg.id;
              const isUnread = msg.status === 'Baru';
              return (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (isUnread) handleToggleStatus(msg);
                  }}
                  className={`p-4 cursor-pointer hover:bg-surface/50 transition-colors space-y-1 relative ${
                    isSelected ? 'bg-primary-container/10 border-l-4 border-primary' : ''
                  } ${isUnread ? 'bg-surface font-semibold' : ''}`}
                >
                  <div className="flex justify-between items-center text-[10px] text-outline">
                    <span className="font-bold text-on-surface-variant">{msg.name}</span>
                    <span>{new Date(msg.created_at).toLocaleDateString('id-ID')}</span>
                  </div>
                  <h5 className="text-xs text-on-surface line-clamp-1">{msg.subject || 'Tanpa Subjek'}</h5>
                  <p className="text-[11px] text-on-surface-variant line-clamp-1 font-normal">{msg.message}</p>
                  
                  {isUnread && (
                    <span className="absolute top-4 right-4 bg-primary text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase">
                      Baru
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 text-on-surface-variant text-sm">
              Kotak masuk pesan kosong.
            </div>
          )}
        </div>
      </div>

      {/* Message Reader View */}
      <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm p-6 flex flex-col h-[600px]">
        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs font-semibold mb-4">
            {error}
          </div>
        )}

        {selectedMessage ? (
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-6">
              {/* Message Header */}
              <div className="border-b border-outline-variant/60 pb-4 flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="font-bold text-base md:text-lg text-on-surface leading-tight">
                    {selectedMessage.subject || 'Tanpa Subjek'}
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Pengirim: <span className="font-bold text-on-surface">{selectedMessage.name}</span> &lt;{selectedMessage.email}&gt;
                  </p>
                  <p className="text-[10px] text-outline">
                    Diterima pada: {new Date(selectedMessage.created_at).toLocaleString('id-ID')}
                  </p>
                </div>
                
                {/* Status Indicator */}
                <button
                  onClick={() => handleToggleStatus(selectedMessage)}
                  className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase shadow-sm ${
                    selectedMessage.status === 'Baru'
                      ? 'bg-amber-500/10 text-amber-700'
                      : 'bg-green-500/10 text-green-700'
                  }`}
                >
                  {selectedMessage.status}
                </button>
              </div>

              {/* Message Body */}
              <div className="flex-1 overflow-y-auto max-h-[350px] pr-2">
                <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
                  {selectedMessage.message}
                </p>
              </div>
            </div>

            {/* Message Actions */}
            <div className="border-t border-outline-variant/60 pt-4 flex gap-3">
              <a
                href={`mailto:${selectedMessage.email}?subject=Balasan: ${selectedMessage.subject}`}
                className="flex-1 py-2.5 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">reply</span> Balas via Email
              </a>
              <button
                onClick={() => handleDelete(selectedMessage.id)}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">delete</span> Hapus
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-on-surface-variant text-sm space-y-2">
            <span className="material-symbols-outlined text-4xl text-outline">mail_outline</span>
            <p>Pilih pesan dari kotak masuk di samping untuk membaca.</p>
          </div>
        )}
      </div>

    </div>
  );
}
