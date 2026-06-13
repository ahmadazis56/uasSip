'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '/profil' },
    { name: 'Lestari', href: '/lestari' },
    { name: 'Wisata', href: '/wisata' },
    { name: 'Berita', href: '/berita' },
    { name: 'Galeri', href: '/galeri' },
    { name: 'Kontak', href: '/kontak' },
  ];

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    const baseClass = "text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ";
    const activeColor = "text-secondary font-bold";
    const normalColor = scrolled 
      ? "text-primary hover:text-secondary" 
      : "text-white/95 hover:text-secondary";
    return baseClass + (isActive ? activeColor : normalColor);
  };

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 flex justify-between items-center px-6 md:px-12 h-20 ${
          scrolled 
            ? 'bg-surface/90 backdrop-blur-md border-b border-surface-container/60 shadow-sm' 
            : 'bg-gradient-to-b from-black/50 to-transparent'
        }`}
      >
        {/* Mobile menu trigger */}
        <button 
          className={`md:hidden p-2 active:scale-95 transition-all ${
            scrolled ? 'text-primary' : 'text-white'
          }`} 
          onClick={toggleDrawer}
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        {/* Logo */}
        <Link href="/">
          <h1 className={`font-serif font-bold text-xl md:text-2xl tracking-wide transition-colors ${
            scrolled ? 'text-primary' : 'text-white'
          }`}>
            Desa Selelos
          </h1>
        </Link>
        
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={getLinkClass(link.href)}>
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <Link 
            href="/kontak" 
            className={`hidden sm:inline-block px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border hover:scale-105 active:scale-95 ${
              scrolled 
                ? 'bg-primary border-primary text-white hover:bg-secondary hover:border-secondary' 
                : 'bg-white/15 border-white/40 text-white hover:bg-secondary hover:border-secondary'
            }`}
          >
            Rencanakan Liburan
          </Link>
          <Link 
            href="/login" 
            className={`p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center ${
              scrolled ? 'text-primary' : 'text-white'
            }`}
            title="Portal Admin"
          >
            <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
          </Link>
        </div>
      </header>

      {/* Navigation Drawer (Mobile) */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[55] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 block' : 'opacity-0 hidden'
        }`}
        onClick={toggleDrawer}
      ></div>
      <aside 
        className={`fixed inset-y-0 left-0 z-[60] flex flex-col h-full w-80 rounded-r-2xl bg-surface shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-surface-container flex justify-between items-center bg-surface-container-low">
          <div>
            <h2 className="font-serif font-bold text-lg text-primary">Desa Selelos</h2>
            <p className="text-[9px] text-on-surface-variant font-medium tracking-wider uppercase">Lombok Utara</p>
          </div>
          <button className="text-on-surface p-1 hover:bg-surface-container rounded-full" onClick={toggleDrawer}>
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
        <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={toggleDrawer}
                className={`px-5 py-3.5 flex items-center rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-on-surface hover:bg-surface-container-low'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <Link
            href="/kontak"
            onClick={toggleDrawer}
            className="mt-4 mx-4 py-3 bg-secondary text-white text-center rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-primary transition-colors"
          >
            Rencanakan Liburan
          </Link>
        </nav>
      </aside>
    </>
  );
}
