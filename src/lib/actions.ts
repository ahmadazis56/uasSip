'use server';

import { sql } from './db';
import { revalidatePath } from 'next/cache';
import { createSession, destroySession } from './auth';
import { redirect } from 'next/navigation';
import fs from 'fs';
import path from 'path';

// Helper to save uploaded file locally in development
async function saveUploadedFile(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;
  
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `upload_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const filePath = path.join(uploadDir, filename);

    fs.writeFileSync(filePath, buffer);
    return `/uploads/${filename}`;
  } catch (error) {
    console.error('File save error:', error);
    return null;
  }
}

// ─── AUTH ACTIONS ────────────────────────────────────────────────

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email dan password harus diisi.' };
  }

  try {
    const result = await sql`
      SELECT id, name, email, password, role FROM users WHERE email = ${email}
    `;

    if (result.rows.length === 0) {
      return { error: 'Email tidak ditemukan.' };
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return { error: 'Password salah.' };
    }

    if (user.role !== 'admin') {
      return { error: 'Akses ditolak. Hanya administrator yang dapat masuk.' };
    }

    await createSession({
      id: user.id,
      name: user.name,
      email: user.email,
      role: 'admin',
    });

    return { success: true };
  } catch (error: any) {
    console.error('Login error:', error);
    return { error: 'Terjadi kesalahan saat masuk. Coba lagi.' };
  }
}

export async function logoutAction() {
  await destroySession();
  redirect('/login');
}

// ─── WISATA ACTIONS ──────────────────────────────────────────────

export async function getWisataList(category?: string, search?: string) {
  try {
    let query = 'SELECT * FROM destinasi WHERE 1=1';
    const params: any[] = [];

    if (category && category !== 'Semua') {
      query += ` AND category = $${params.length + 1}`;
      params.push(category);
    }

    if (search && search.trim() !== '') {
      query += ` AND (name ILIKE $${params.length + 1} OR description ILIKE $${params.length + 2})`;
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY id DESC';

    const result = await sql([query] as any, ...params);
    return result.rows;
  } catch (error) {
    console.error('Error fetching wisata list:', error);
    return [];
  }
}

export async function getWisataById(id: number) {
  try {
    const result = await sql`SELECT * FROM destinasi WHERE id = ${id}`;
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching wisata detail:', error);
    return null;
  }
}

export async function addWisata(formData: FormData) {
  const name = formData.get('name') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const location = formData.get('location') as string;
  const open_hours = formData.get('open_hours') as string;
  const ticket_price = parseFloat(formData.get('ticket_price') as string) || 0;
  const rating = parseFloat(formData.get('rating') as string) || 4.5;
  const file = formData.get('image') as File | null;
  let image_url = formData.get('image_url_fallback') as string || '/uploads/default_wisata.jpg';

  if (!name || !category || !description) {
    return { error: 'Nama, kategori, dan deskripsi wajib diisi.' };
  }

  try {
    const uploadedUrl = await saveUploadedFile(file);
    if (uploadedUrl) {
      image_url = uploadedUrl;
    }

    await sql`
      INSERT INTO destinasi (name, category, description, image_url, location, rating, open_hours, ticket_price)
      VALUES (${name}, ${category}, ${description}, ${image_url}, ${location}, ${rating}, ${open_hours}, ${ticket_price})
    `;

    revalidatePath('/wisata');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error adding wisata:', error);
    return { error: error.message || 'Gagal menambahkan destinasi wisata.' };
  }
}

export async function updateWisata(formData: FormData) {
  const idStr = formData.get('id') as string;
  const name = formData.get('name') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const location = formData.get('location') as string;
  const open_hours = formData.get('open_hours') as string;
  const ticket_price = parseFloat(formData.get('ticket_price') as string) || 0;
  const rating = parseFloat(formData.get('rating') as string) || 4.5;
  const file = formData.get('image') as File | null;
  
  if (!idStr) return { error: 'ID destinasi tidak valid.' };
  const id = parseInt(idStr);

  try {
    // Check existing
    const existing = await sql`SELECT image_url FROM destinasi WHERE id = ${id}`;
    if (existing.rows.length === 0) return { error: 'Destinasi tidak ditemukan.' };
    let image_url = existing.rows[0].image_url;

    const uploadedUrl = await saveUploadedFile(file);
    if (uploadedUrl) {
      image_url = uploadedUrl;
    }

    await sql`
      UPDATE destinasi 
      SET name = ${name}, category = ${category}, description = ${description}, image_url = ${image_url}, 
          location = ${location}, rating = ${rating}, open_hours = ${open_hours}, ticket_price = ${ticket_price}
      WHERE id = ${id}
    `;

    revalidatePath('/wisata');
    revalidatePath(`/wisata/${id}`);
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating wisata:', error);
    return { error: error.message || 'Gagal mengubah destinasi wisata.' };
  }
}

export async function deleteWisata(id: number) {
  try {
    await sql`DELETE FROM destinasi WHERE id = ${id}`;
    revalidatePath('/wisata');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting wisata:', error);
    return { error: error.message || 'Gagal menghapus destinasi wisata.' };
  }
}

// ─── BERITA ACTIONS ──────────────────────────────────────────────

export async function getBeritaList(category?: string, search?: string) {
  try {
    let query = 'SELECT * FROM berita WHERE 1=1';
    const params: any[] = [];

    if (category && category !== 'Semua') {
      query += ` AND category = $${params.length + 1}`;
      params.push(category);
    }

    if (search && search.trim() !== '') {
      query += ` AND (title ILIKE $${params.length + 1} OR content ILIKE $${params.length + 2})`;
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY id DESC';

    const result = await sql([query] as any, ...params);
    return result.rows;
  } catch (error) {
    console.error('Error fetching berita list:', error);
    return [];
  }
}

export async function getBeritaById(id: number) {
  try {
    const result = await sql`SELECT * FROM berita WHERE id = ${id}`;
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching berita detail:', error);
    return null;
  }
}

export async function addBerita(formData: FormData) {
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const content = formData.get('content') as string;
  const author = formData.get('author') as string || 'Admin';
  const file = formData.get('image') as File | null;
  let image_url = formData.get('image_url_fallback') as string || '/uploads/default_berita.jpg';

  if (!title || !category || !content) {
    return { error: 'Judul, kategori, dan konten wajib diisi.' };
  }

  try {
    const uploadedUrl = await saveUploadedFile(file);
    if (uploadedUrl) {
      image_url = uploadedUrl;
    }

    await sql`
      INSERT INTO berita (title, category, content, image_url, author, published_at)
      VALUES (${title}, ${category}, ${content}, ${image_url}, ${author}, NOW())
    `;

    revalidatePath('/berita');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error adding berita:', error);
    return { error: error.message || 'Gagal menambahkan berita.' };
  }
}

export async function updateBerita(formData: FormData) {
  const idStr = formData.get('id') as string;
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const content = formData.get('content') as string;
  const author = formData.get('author') as string || 'Admin';
  const file = formData.get('image') as File | null;
  
  if (!idStr) return { error: 'ID berita tidak valid.' };
  const id = parseInt(idStr);

  try {
    const existing = await sql`SELECT image_url FROM berita WHERE id = ${id}`;
    if (existing.rows.length === 0) return { error: 'Berita tidak ditemukan.' };
    let image_url = existing.rows[0].image_url;

    const uploadedUrl = await saveUploadedFile(file);
    if (uploadedUrl) {
      image_url = uploadedUrl;
    }

    await sql`
      UPDATE berita 
      SET title = ${title}, category = ${category}, content = ${content}, image_url = ${image_url}, author = ${author}
      WHERE id = ${id}
    `;

    revalidatePath('/berita');
    revalidatePath(`/berita/${id}`);
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating berita:', error);
    return { error: error.message || 'Gagal mengubah berita.' };
  }
}

export async function deleteBerita(id: number) {
  try {
    await sql`DELETE FROM berita WHERE id = ${id}`;
    revalidatePath('/berita');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting berita:', error);
    return { error: error.message || 'Gagal menghapus berita.' };
  }
}

// ─── GALERI ACTIONS ──────────────────────────────────────────────

export async function getGaleriList(category?: string) {
  try {
    let query = 'SELECT * FROM galeri';
    const params: any[] = [];

    if (category && category !== 'Semua') {
      query += ' WHERE category = $1';
      params.push(category);
    }

    query += ' ORDER BY id DESC';

    const result = await sql([query] as any, ...params);
    return result.rows;
  } catch (error) {
    console.error('Error fetching galeri list:', error);
    return [];
  }
}

export async function addGaleri(formData: FormData) {
  const title = formData.get('title') as string || 'Foto Selelos';
  const category = formData.get('category') as string || 'Alam';
  const description = formData.get('description') as string || '';
  const file = formData.get('image') as File | null;
  let image_url = formData.get('image_url_fallback') as string || '/uploads/default_galeri.jpg';

  try {
    const uploadedUrl = await saveUploadedFile(file);
    if (uploadedUrl) {
      image_url = uploadedUrl;
    }

    await sql`
      INSERT INTO galeri (title, category, image_url, description)
      VALUES (${title}, ${category}, ${image_url}, ${description})
    `;

    revalidatePath('/galeri');
    return { success: true };
  } catch (error: any) {
    console.error('Error adding galeri:', error);
    return { error: error.message || 'Gagal menambahkan galeri.' };
  }
}

export async function deleteGaleri(id: number) {
  try {
    await sql`DELETE FROM galeri WHERE id = ${id}`;
    revalidatePath('/galeri');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting galeri:', error);
    return { error: error.message || 'Gagal menghapus galeri.' };
  }
}

// ─── PESAN ACTIONS ───────────────────────────────────────────────

export async function getPesanList() {
  try {
    const result = await sql`SELECT * FROM pesan ORDER BY id DESC`;
    return result.rows;
  } catch (error) {
    console.error('Error fetching pesan list:', error);
    return [];
  }
}

export async function addPesan(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { error: 'Nama, Email, dan Pesan wajib diisi.' };
  }

  try {
    await sql`
      INSERT INTO pesan (name, email, subject, message, status)
      VALUES (${name}, ${email}, ${subject || 'Tanya Selelos'}, ${message}, 'Baru')
    `;

    return { success: true };
  } catch (error: any) {
    console.error('Error sending message:', error);
    return { error: error.message || 'Gagal mengirimkan pesan.' };
  }
}

export async function deletePesan(id: number) {
  try {
    await sql`DELETE FROM pesan WHERE id = ${id}`;
    revalidatePath('/admin/pesan');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting message:', error);
    return { error: error.message || 'Gagal menghapus pesan.' };
  }
}

export async function togglePesanStatus(id: number, currentStatus: string) {
  const nextStatus = currentStatus === 'Baru' ? 'Dibaca' : 'Baru';
  try {
    await sql`UPDATE pesan SET status = ${nextStatus} WHERE id = ${id}`;
    revalidatePath('/admin/pesan');
    return { success: true };
  } catch (error: any) {
    console.error('Error toggling message status:', error);
    return { error: error.message || 'Gagal mengubah status pesan.' };
  }
}

// ─── DASHBOARD METRICS ──────────────────────────────────────────

export async function getAdminDashboardStats() {
  try {
    const wisataCountRes = await sql`SELECT COUNT(*) as count FROM destinasi`;
    const beritaCountRes = await sql`SELECT COUNT(*) as count FROM berita`;
    const galeriCountRes = await sql`SELECT COUNT(*) as count FROM galeri`;
    const pesanCountRes = await sql`SELECT COUNT(*) as count FROM pesan`;
    const pesanBaruCountRes = await sql`SELECT COUNT(*) as count FROM pesan WHERE status = 'Baru'`;

    return {
      wisataCount: Number(wisataCountRes.rows[0]?.count || 0),
      beritaCount: Number(beritaCountRes.rows[0]?.count || 0),
      galeriCount: Number(galeriCountRes.rows[0]?.count || 0),
      pesanCount: Number(pesanCountRes.rows[0]?.count || 0),
      pesanBaruCount: Number(pesanBaruCountRes.rows[0]?.count || 0),
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      wisataCount: 0,
      beritaCount: 0,
      galeriCount: 0,
      pesanCount: 0,
      pesanBaruCount: 0,
    };
  }
}
