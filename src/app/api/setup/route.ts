import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Drop existing tables to ensure a clean re-seed
    await sql`DROP TABLE IF EXISTS destinasi;`;
    await sql`DROP TABLE IF EXISTS berita;`;
    await sql`DROP TABLE IF EXISTS galeri;`;
    await sql`DROP TABLE IF EXISTS pesan;`;
    await sql`DROP TABLE IF EXISTS users;`;

    // 1. Create Users Table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Create Destinasi (Wisata / Homestay / Pengalaman) Table
    await sql`
      CREATE TABLE IF NOT EXISTS destinasi (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(512),
        location VARCHAR(255),
        rating REAL DEFAULT 4.5,
        open_hours VARCHAR(100),
        ticket_price REAL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 3. Create Berita Table
    await sql`
      CREATE TABLE IF NOT EXISTS berita (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        image_url VARCHAR(512),
        author VARCHAR(255) DEFAULT 'Admin',
        published_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 4. Create Galeri Table
    await sql`
      CREATE TABLE IF NOT EXISTS galeri (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        category VARCHAR(100) DEFAULT 'Alam',
        image_url VARCHAR(512) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 5. Create Pesan (Contact Messages) Table
    await sql`
      CREATE TABLE IF NOT EXISTS pesan (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'Baru',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // --- SEED DATA ---

    // Seed Admin User
    await sql`
      INSERT INTO users (name, email, password, role)
      VALUES ('Administrator Selelos', 'admin@selelos.go.id', 'admin123', 'admin');
    `;

    // Seed Stays/Experiences/Attractions in Destinasi Table
    await sql`
      INSERT INTO destinasi (name, category, description, image_url, location, rating, open_hours, ticket_price)
      VALUES 
      -- Wisata (Attractions)
      ('Air Terjun Gangga', 'Wisata', 'Pesona air terjun kembar yang menakjubkan jatuh dari tebing tinggi di tengah pelukan hutan hujan yang rimbun. Keasrian alam sekitarnya memberikan ketenangan absolut.', 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80', 'Kayangan, Lombok Utara', 4.9, '07:30 - 17:30', 10000),
      ('Puncak Pegunungan Selelos', 'Wisata', 'Menyajikan pemandangan spektakuler perbukitan hijau yang diselimuti kabut tebal di pagi hari. Nikmati sensasi matahari terbit dengan latar belakang Gunung Rinjani yang megah.', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', 'Kayangan, Lombok Utara', 4.8, '24 Jam', 5000),
      ('Kampung Adat Sasak', 'Wisata', 'Jelajahi keaslian pemukiman tradisional Sasak. Saksikan arsitektur rumah bambu beratap jerami kuno, kearifan lokal masyarakat, serta ritual tari adat Sasak yang sakral.', 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80', 'Desa Selelos, Lombok Utara', 4.7, '08:00 - 18:00', 15000),

      -- Homestays
      ('Selelos Eco Lodge', 'Homestay', 'Penginapan ramah lingkungan yang dibangun dari bambu lokal dengan pemandangan langsung ke perkebunan kopi yang asri.', 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80', 'Desa Selelos', 4.9, 'Resepsionis 24 Jam', 350000),
      ('Rinjani View Homestay', 'Homestay', 'Terletak di ketinggian lereng bukit, menawarkan udara sejuk pegunungan dan panorama indah matahari terbit langsung dari jendela kamar.', 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80', 'Puncak Selelos', 4.8, 'Resepsionis 24 Jam', 280000),
      ('Gangga Falls Homestay', 'Homestay', 'Hanya berjarak 5 menit berjalan kaki ke air terjun kembar, penginapan ini menawarkan melodi suara gemercik air yang menenangkan.', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80', 'Kawasan Air Terjun', 4.7, 'Resepsionis 24 Jam', 250000),
      ('Sasak Village Stay', 'Homestay', 'Rasakan pengalaman unik menginap langsung di rumah adat tradisional Sasak bersama keluarga lokal desa yang hangat.', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', 'Kampung Adat', 4.6, 'Resepsionis 24 Jam', 200000),

      -- Pengalaman (Experiences)
      ('Panen Kopi Organik', 'Pengalaman', 'Ikut serta memetik biji kopi robusta/arabika berkualitas dari kebun lereng gunung dan belajar cara menyangrai kopi khas Sasak.', 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80', 'Kebun Kopi Selelos', 4.9, '08:00 - 12:00', 50000),
      ('Kerajinan Tenun Songket', 'Pengalaman', 'Belajar teknik menenun benang katun warna-warni menggunakan alat tenun kayu tradisional Sasak langsung dari para wanita penenun.', 'https://images.unsplash.com/photo-1513829096970-e4d8e3fdc5b6?auto=format&fit=crop&w=800&q=80', 'Pondok Tenun Desa', 4.8, '09:00 - 15:00', 45000),
      ('Agrowisata Durian', 'Pengalaman', 'Tur kebun durian pegunungan berpohon tua. Nikmati buah durian creamy legit manis-pahit yang segar langsung setelah jatuh dari pohon.', 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?auto=format&fit=crop&w=800&q=80', 'Orchard Durian Selelos', 4.9, '10:00 - 16:00', 75000),
      ('Konservasi Adopsi Pohon', 'Pengalaman', 'Dukung pelestarian hutan adat dengan menanam bibit pohon lokal atas nama Anda sendiri untuk menjaga kestabilan mata air pegunungan.', 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=800&q=80', 'Hutan Adat Selelos', 4.7, '08:00 - 11:00', 30000);
    `;

    // Seed News
    await sql`
      INSERT INTO berita (title, category, content, image_url, author, published_at)
      VALUES 
      ('Persiapan Festival Budaya Tahunan Selelos', 'Kegiatan Desa', 'Masyarakat Desa Selelos antusias mempersiapkan gelaran festival adat yang akan diramaikan oleh pertunjukan Gendang Beleq, pameran tenun songket, serta suguhan kuliner durian.', 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80', 'Ahmad Sauki', NOW()),
      ('Peresmian Jalur Tracking Baru di Puncak Selelos', 'Pembangunan', 'Pemerintah daerah meresmikan fasilitas gazebo dan jalur pendakian kayu baru di Puncak Selelos untuk mempermudah petualangan pendaki menikmati sunrise.', 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=800&q=80', 'Siti Aminah', NOW()),
      ('Desa Selelos Raih Penghargaan Desa Wisata Terbaik', 'Penghargaan', 'Desa Selelos menyabet peringkat teratas dalam penghargaan tata kelola ekowisata mandiri berkelanjutan berkat hukum adat Awig-Awig pelindung hutan.', 'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?auto=format&fit=crop&w=800&q=80', 'Humas Desa', NOW());
    `;

    // Seed Gallery
    await sql`
      INSERT INTO galeri (title, category, image_url, description)
      VALUES 
      ('Air Terjun Kembar', 'Alam', 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80', 'Aliran air segar di pagi hari yang menyejukkan.'),
      ('Pagi Berembun', 'Alam', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', 'Kabut tebal menyelimuti puncak bukit di Selelos.'),
      ('Tenun Tradisional Sasak', 'Budaya', 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80', 'Proses pembuatan kain songket khas Lombok oleh warga lokal.'),
      ('Festival Musik Gendang Beleq', 'Budaya', 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80', 'Kemeriahan pembukaan pesta adat budaya tahunan.'),
      ('Agrowisata Durian Selelos', 'Kegiatan', 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?auto=format&fit=crop&w=800&q=80', 'Wisatawan menikmati durian lokal lezat langsung dari pohonnya.'),
      ('Panen Kopi Organik', 'Kegiatan', 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80', 'Biji kopi lereng pegunungan diproses pasca panen.');
    `;

    return NextResponse.json({ message: 'Database tables dropped, created and seeded successfully with Stays & Experiences.' });
  } catch (error: any) {
    console.error('Setup error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
