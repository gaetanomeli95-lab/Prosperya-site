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
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1280px)');
    const closeOnDesktop = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) setOpen(false);
    };
    closeOnDesktop(media);
    media.addEventListener('change', closeOnDesktop);
    return () => media.removeEventListener('change', closeOnDesktop);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-3 xl:py-5'}`}>
      <div className="mx-auto max-w-[1480px] px-3 sm:px-6 lg:px-8">
        <div className={`relative flex h-16 items-center justify-between border border-white/12 bg-[#090D0E]/95 px-3 backdrop-blur-xl transition-all duration-500 sm:px-4 xl:h-[72px] xl:px-6 ${scrolled ? 'shadow-float' : 'shadow-[0_12px_40px_rgba(0,0,0,0.16)]'}`}>
          <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label={company.ragioneSociale}>
            <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-white/20 xl:h-11 xl:w-11">
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
              <span className="block truncate text-sm font-semibold leading-none tracking-[0.18em] !text-white xl:text-[15px]">PROSPERYA</span>
              <span className="mt-1.5 hidden text-[9px] uppercase tracking-[0.19em] !text-white/55 md:block xl:tracking-[0.22em]">Advisory · Governance · Growth</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 xl:flex 2xl:gap-7" aria-label="Navigazione principale">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative whitespace-nowrap text-[13px] font-medium !text-white/80 transition-colors hover:!text-white after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-sand after:transition-all hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contatti/"
              className="group inline-flex items-center gap-2 whitespace-nowrap bg-white px-4 py-2.5 text-[13px] font-semibold !text-night transition-colors hover:bg-sand"
            >
              Parla con un advisor
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 shrink-0 place-items-center border border-white/20 bg-white/5 !text-white xl:hidden"
            aria-expanded={open}
            aria-label={open ? 'Chiudi menu' : 'Apri menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="mt-2 max-h-[calc(100svh-6rem)] overflow-y-auto overscroll-contain border border-white/10 bg-[#090D0E]/98 shadow-float backdrop-blur-xl xl:hidden">
            <nav className="flex flex-col px-5 py-4" aria-label="Menu mobile">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/10 py-4 text-[15px] font-medium !text-white/90"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contatti/"
                onClick={() => setOpen(false)}
                className="mt-5 inline-flex min-h-12 items-center justify-between bg-white px-4 py-3.5 text-sm font-semibold !text-night"
              >
                Parla con un advisor <ArrowUpRight className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
