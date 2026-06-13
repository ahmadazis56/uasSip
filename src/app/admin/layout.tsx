import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { logoutAction } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Protect Admin Route
  if (!session || session.role !== 'admin') {
    redirect('/login');
  }

  const navItems = [
    { name: 'Ringkasan', href: '/admin', icon: 'dashboard' },
    { name: 'Kelola Wisata', href: '/admin/wisata', icon: 'forest' },
    { name: 'Kelola Berita', href: '/admin/berita', icon: 'newspaper' },
    { name: 'Kelola Galeri', href: '/admin/galeri', icon: 'photo_library' },
    { name: 'Pesan Masuk', href: '/admin/pesan', icon: 'mail' },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-primary text-white flex flex-col border-r border-primary-container/20">
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-primary-container/10 flex justify-between items-center">
          <div>
            <h2 className="font-extrabold text-xl tracking-tight">Admin Selelos</h2>
            <p className="text-[10px] text-primary-container/80 font-medium">Pengelola Portal Pariwisata</p>
          </div>
          <span className="material-symbols-outlined text-primary-container">admin_panel_settings</span>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm font-semibold"
            >
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-primary-container/10 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 text-xs font-semibold text-primary-container/85 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">globe</span> Lihat Web Publik
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-red-600/35 hover:bg-red-600 text-xs font-bold transition-all text-left"
            >
              <span className="material-symbols-outlined text-sm">logout</span> Keluar Log
            </button>
          </form>
        </div>

      </aside>

      {/* Main Admin Content Container */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
