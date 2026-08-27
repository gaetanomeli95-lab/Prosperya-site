'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { mainNav } from '@/data/navigation';
import { company } from '@/data/company';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-3 lg:py-5'}`}>
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative flex items-center justify-between h-16 lg:h-[72px] px-4 lg:px-6 transition-all duration-500 ${scrolled ? 'bg-night/92 backdrop-blur-xl border border-white/10 shadow-float' : 'bg-night/42 backdrop-blur-md border border-white/10'}`}>
          <Link href="/" className="flex items-center gap-3 group min-w-0" aria-label={company.ragioneSociale}>
            <span className="relative grid place-items-center h-10 w-10 lg:h-11 lg:w-11 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-white/15">
              <Image
                src="/brand/prosperya-logo.png"
                alt="Prosperya"
                width={44}
                height={44}
                className="h-full w-full object-contain scale-[1.08]"
                priority
              />
            </span>
            <span className="min-w-0">
              <span className="block text-white text-sm lg:text-[15px] font-semibold tracking-[0.18em] leading-none">PROSPERYA</span>
              <span className="hidden sm:block mt-1.5 text-[9px] uppercase tracking-[0.22em] text-white/45">Advisory · Governance · Growth</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Navigazione principale">
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-[13px] font-medium text-white/72 hover:text-white transition-colors">
                {item.label}
              </Link>
            ))}
            <Link
              href="/contatti/"
              className="group inline-flex items-center gap-2 border border-white/25 bg-white px-4 py-2.5 text-[13px] font-semibold text-night hover:bg-sand transition-colors"
            >
              Parla con un advisor
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden grid place-items-center h-10 w-10 text-white border border-white/15 bg-white/5"
            aria-expanded={open}
            aria-label={open ? 'Chiudi menu' : 'Apri menu'}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden mt-2 bg-night/98 backdrop-blur-xl border border-white/10 shadow-float">
            <nav className="flex flex-col px-5 py-5" aria-label="Menu mobile">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-[15px] font-medium text-white/85 py-4 border-b border-white/8"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contatti/"
                onClick={() => setOpen(false)}
                className="mt-5 inline-flex items-center justify-between bg-white px-4 py-3.5 text-sm font-semibold text-night"
              >
                Parla con un advisor <ArrowUpRight className="w-4 h-4" />
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
