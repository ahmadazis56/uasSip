'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { addPesan } from '@/lib/actions';

export default function KontakPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await addPesan(formData);

    setLoading(false);
    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-surface">
        
        {/* Banner Section */}
        <section className="relative h-[250px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              alt="Hubungi Kami"
              src="https://images.unsplash.com/photo-1423662055905-373fa95cf4af?auto=format&fit=crop&w=1200&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-black/75"></div>
          </div>
          <div className="relative z-10 text-center px-6 text-white space-y-2 animate-fade-in">
            <h2 className="font-serif font-extrabold text-3xl md:text-4xl tracking-tight">Hubungi Kami</h2>
            <p className="text-xs md:text-sm opacity-90 max-w-md mx-auto">
              Rencanakan liburan impian Anda ke Desa Wisata Selelos dengan mengirimkan pesan ke pengelola kami.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Contact Information */}
            <div className="md:col-span-5 space-y-8 animate-fade-in">
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-surface-container-low shadow-sm space-y-6">
                <h3 className="font-serif font-bold text-xl text-primary flex items-center gap-2 border-b border-surface-container-low pb-3">
                  <span className="material-symbols-outlined text-secondary">contact_support</span> Informasi Kontak
                </h3>
                
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Kami siap membantu memandu perjalanan Anda, mulai dari koordinasi homestay tradisional, tour guide trekking, hingga pemesanan durian segar.
                </p>

                <div className="space-y-4 text-xs text-on-surface-variant">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-base mt-0.5">location_on</span>
                    <div>
                      <p className="font-bold text-on-surface">Kantor Pelayanan Desa</p>
                      <p>Jl. Raya Wisata No. 1, Desa Selelos, Kec. Kayangan, Lombok Utara, NTB</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-base mt-0.5">mail</span>
                    <div>
                      <p className="font-bold text-on-surface">Email Hubungan Publik</p>
                      <p>info@desaselelos.id</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-base mt-0.5">call</span>
                    <div>
                      <p className="font-bold text-on-surface">Layanan Telepon/WhatsApp</p>
                      <p>+62 812-3456-7890</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operating hours card */}
              <div className="bg-primary text-white p-6 rounded-2xl shadow-md space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                <h4 className="font-serif font-bold text-base text-secondary">Waktu Pelayanan Wisata</h4>
                <ul className="text-xs space-y-2 opacity-95">
                  <li>Setiap Hari: 08.00 - 17.00 WITA</li>
                  <li>Layanan Reservasi: 24 Jam (Melalui Email/Form)</li>
                </ul>
              </div>
            </div>

            {/* Message Form */}
            <div className="md:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-surface-container-low shadow-sm animate-fade-in">
              <h3 className="font-serif font-bold text-xl text-primary flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-secondary">chat</span> Kirimkan Formulir Rencana Liburan
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {success && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 text-xs font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Formulir berhasil terkirim. Admin pengelola Selelos akan menghubungi Anda kembali.
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Masukkan nama Anda"
                      className="w-full px-4 py-2.5 rounded-xl border border-surface-container-low focus:outline-none focus:border-secondary text-xs bg-surface"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Alamat Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Masukkan email Anda"
                      className="w-full px-4 py-2.5 rounded-xl border border-surface-container-low focus:outline-none focus:border-secondary text-xs bg-surface"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Subjek / Topik Liburan</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Contoh: Reservasi Homestay 3 Hari"
                    className="w-full px-4 py-2.5 rounded-xl border border-surface-container-low focus:outline-none focus:border-secondary text-xs bg-surface"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Rincian Pertanyaan / Rencana Perjalanan</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tuliskan detail liburan, jumlah orang, tanggal kedatangan, atau hal penting lainnya..."
                    className="w-full px-4 py-2.5 rounded-xl border border-surface-container-low focus:outline-none focus:border-secondary text-xs bg-surface"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-secondary text-white font-bold rounded-full text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-55"
                >
                  {loading ? (
                    'Mengirim...'
                  ) : (
                    <>
                      Kirim Formulir <span className="material-symbols-outlined text-xs">send</span>
                    </>
                  )}
                </button>

              </form>
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
