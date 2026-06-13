import { getWisataById } from '@/lib/actions';
import EditWisataForm from '@/components/EditWisataForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditWisataPage({ params }: PageProps) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);

  if (isNaN(id)) {
    notFound();
  }

  const destinasi = await getWisataById(id);

  if (!destinasi) {
    notFound();
  }

  return <EditWisataForm destinasi={destinasi} />;
}
