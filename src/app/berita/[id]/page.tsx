import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getBeritaById } from '@/lib/actions';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailBeritaPage({ params }: PageProps) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);

  if (isNaN(id)) {
    notFound();
  }

  const berita = await getBeritaById(id);

  if (!berita) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-surface">
        
        {/* Main Section */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          
          <Link 
            href="/berita" 
            className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold mb-6"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span> Kembali ke Berita
          </Link>

          <article className="space-y-6">
            
            {/* Header info */}
            <div className="space-y-3">
              <span className="bg-primary text-white text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full">
                {berita.category}
              </span>
              <h1 className="font-extrabold text-2xl md:text-4xl text-on-surface leading-tight">
                {berita.title}
              </h1>
              <div className="flex items-center gap-4 text-xs text-outline pt-2 border-t border-outline-variant/30">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-primary">person</span> Ditulis oleh: <span className="font-semibold text-on-surface">{berita.author || 'Admin'}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-primary">calendar_month</span> {new Date(berita.published_at || berita.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Article Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-sm border border-outline-variant">
              <img 
                src={berita.image_url || 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80'} 
                alt={berita.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Body Content */}
            <div className="bg-surface-container-lowest p-6 md:p-10 rounded-2xl border border-outline-variant shadow-sm">
              <p className="text-on-surface-variant text-sm md:text-base leading-relaxed whitespace-pre-line text-justify">
                {berita.content}
              </p>
            </div>

          </article>
        </div>

      </main>
      <Footer />
    </>
  );
}
