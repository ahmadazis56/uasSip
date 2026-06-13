'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginAction } from '@/lib/actions';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-surface px-6 relative overflow-hidden">
      
      {/* Background circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-lg space-y-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-1.5 text-primary text-xs font-bold hover:underline mb-2">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span> Kembali ke Beranda
          </Link>
          <h2 className="font-extrabold text-2xl text-primary">Portal Admin</h2>
          <p className="text-xs text-on-surface-variant">
            Masuk untuk mengelola pariwisata Desa Selelos
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Alamat Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="admin@selelos.go.id"
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Kata Sandi (Password)</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-sm bg-surface"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white font-bold rounded-xl text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-55"
          >
            {loading ? 'Masuk...' : 'Masuk Log'}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-[10px] text-outline">
            Akun default: <span className="font-semibold text-on-surface">admin@selelos.go.id</span> / <span className="font-semibold text-on-surface">admin123</span>
          </p>
        </div>

      </div>
    </main>
  );
}
