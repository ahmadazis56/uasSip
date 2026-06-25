import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-white border-t border-white/5 w-full py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* About Column */}
        <div className="space-y-4">
          <h2 className="font-serif font-bold text-2xl tracking-wide">Desa Selelos</h2>
          <p className="text-xs text-white/70 leading-relaxed max-w-sm">
            Destinasi wisata unggulan berbasis alam dan budaya di kaki pegunungan yang asri
          </p>
          <div className="flex gap-3.5 pt-2">
            <span className="material-symbols-outlined text-secondary hover:text-white cursor-pointer transition-colors text-lg">photo_camera</span>
            <span className="material-symbols-outlined text-secondary hover:text-white cursor-pointer transition-colors text-lg">play_circle</span>
          </div>
        </div>

        {/* Empty middle column to match layout */}
        <div></div>

        {/* Get in Touch Column */}
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-secondary">Kontak dan Situs</h3>
          <ul className="space-y-3.5 text-xs text-white/70">
            <li className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-secondary text-base mt-0.5">location_on</span>
              <span className="leading-relaxed">Jl. Raya Pekatan, Desa Selelos, Kec. Tanjung, Lombok Utara, NTB</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-secondary text-base">call</span>
              <span>00000000000000</span>
            </li>
          </ul>
        </div>

      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/5 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-white/50">© 2026 Azis Alya Duwik</p>
        <div className="flex gap-6 text-[10px] text-white/50">
          <Link href="/login" className="hover:text-white">Admin Login</Link>
          <a href="#" className="hover:text-white">Kebijakan Privasi</a>
          <a href="#" className="hover:text-white">Syarat & Ketentuan</a>
        </div>
      </div>
    </footer>
  );
}
