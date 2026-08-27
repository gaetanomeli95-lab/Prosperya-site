'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { mainNav } from '@/data/navigation';
import { company } from '@/data/company';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-night/95 backdrop-blur shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3 group" aria-label={company.ragioneSociale}>
            <Image
              src="/brand/prosperya-logo.png"
              alt="Prosperya"
              width={44}
              height={44}
              className="h-9 w-9 lg:h-11 lg:w-11 object-contain"
              priority
            />
            <span className="text-white text-lg lg:text-xl font-heading font-semibold tracking-tight">
              PROSPERYA
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Navigazione principale">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-px after:bg-logo-magenta after:transition-all hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contatti/"
              className="inline-flex items-center justify-center rounded-sm bg-mediterranean px-4 py-2.5 text-sm font-medium text-white hover:bg-mediterranean-light transition-colors focus:outline-none focus:ring-2 focus:ring-logo-yellow focus:ring-offset-2 focus:ring-offset-night"
            >
              Parla con un advisor
            </Link>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-logo-yellow"
            aria-expanded={open}
            aria-label={open ? 'Chiudi menu' : 'Apri menu'}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-night/98 border-t border-white/10">
          <nav className="flex flex-col px-5 py-4 gap-3" aria-label="Menu mobile">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-white/90 hover:text-white py-2 border-b border-white/5"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contatti/"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-sm bg-mediterranean px-4 py-3 text-base font-medium text-white hover:bg-mediterranean-light"
            >
              Parla con un advisor
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
