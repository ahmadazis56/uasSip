import { getPesanList } from '@/lib/actions';
import AdminPesanClient from '@/components/AdminPesanClient';

export const dynamic = 'force-dynamic';

export default async function AdminPesanPage() {
  const initialMessages = await getPesanList();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-extrabold text-2xl md:text-3xl text-on-surface">Pesan Masuk</h1>
        <p className="text-sm text-on-surface-variant">
          Daftar pesan dan formulir kontak yang dikirimkan oleh pengunjung website.
        </p>
      </div>

      <AdminPesanClient initialMessages={initialMessages} />

    </div>
  );
}
