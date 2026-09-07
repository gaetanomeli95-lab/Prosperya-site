'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { mainNav } from '@/data/navigation';
import { company } from '@/data/company';
import { consultationConfig, startupConsultationConfig } from '@/data/consultations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MiniBrandMark } from './MiniBrandMark';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const consultationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
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
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    media.addEventListener('change', closeOnDesktop);
    return () => media.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!consultationOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!consultationRef.current?.contains(event.target as Node)) setConsultationOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setConsultationOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [consultationOpen]);

  useEffect(() => {
    setConsultationOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.replace(/\/$/, ''));
  };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ${scrolled ? 'py-2' : 'py-3 sm:py-4 lg:py-5'}`}>
        <div className="mx-auto max-w-[1480px] px-3 sm:px-6 lg:px-8">
          <div
            className={`relative flex items-center justify-between overflow-visible border transition-all duration-500 ${
              scrolled
                ? 'h-[60px] border-white/10 bg-[#080C0D]/92 px-3 shadow-[0_18px_60px_rgba(0,0,0,.28)] backdrop-blur-xl sm:px-4 xl:h-[64px] xl:px-5'
                : 'h-[64px] border-white/10 bg-[#080C0D]/68 px-3 shadow-[0_12px_45px_rgba(0,0,0,.14)] backdrop-blur-md sm:px-4 xl:h-[70px] xl:px-5'
            }`}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-sand/0 via-sand/30 to-sand/0 opacity-70" />

            <Link href="/" className="group relative z-10 flex min-w-0 items-center gap-3" aria-label={company.ragioneSociale}>
              <MiniBrandMark />
              <span className="min-w-0 border-l border-white/10 pl-3">
                <span className="block truncate text-[13px] font-semibold leading-none tracking-[0.2em] !text-white sm:text-sm">PROSPERYA</span>
                <span className="mt-1.5 hidden text-[8px] font-medium uppercase tracking-[0.22em] !text-white/45 sm:block 2xl:text-[9px]">
                  {company.payoff}
                </span>
              </span>
            </Link>

            <div className="relative z-10 hidden h-full items-center xl:flex">
              <nav className="flex h-full items-center" aria-label="Navigazione principale">
                {mainNav.map((item) => {
                  const legal = item.href === '/cookie-policy/' || item.href === '/privacy-policy/';
                  const consultation = item.href === '/contatti/';
                  const active = isActive(item.href);

                  if (consultation) {
                    return (
                      <div key={item.href} ref={consultationRef} className="relative flex h-full items-center">
                        <button
                          type="button"
                          onClick={() => setConsultationOpen((value) => !value)}
                          className="group mx-3 inline-flex h-10 items-center gap-3 border border-sand/45 bg-sand/[0.06] px-4 text-[11px] font-semibold uppercase tracking-[0.12em] !text-white transition-all duration-300 hover:border-sand hover:bg-sand hover:!text-night 2xl:mx-4 2xl:px-5"
                          aria-expanded={consultationOpen}
                          aria-haspopup="menu"
                        >
                          {item.label}
                          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${consultationOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {consultationOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -6, scale: 0.985 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -4, scale: 0.99 }}
                              transition={{ duration: 0.18 }}
                              role="menu"
                              className="absolute right-3 top-[calc(100%+8px)] z-[90] w-[330px] border border-white/12 bg-[#111A1C]/98 p-1.5 shadow-[0_24px_70px_rgba(0,0,0,.36)] backdrop-blur-xl 2xl:right-4"
                            >
                              <p className="px-3 pb-2 pt-2 text-[9px] font-semibold uppercase tracking-[.2em] !text-white/32">Scegli il percorso</p>

                              <a
                                href={startupConsultationConfig.bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                role="menuitem"
                                onClick={() => setConsultationOpen(false)}
                                className="group flex items-center justify-between gap-4 border-t border-white/10 px-3 py-3.5 transition-colors hover:bg-white/[0.045]"
                              >
                                <span>
                                  <span className="block text-sm font-semibold !text-white">Start Up</span>
                                  <span className="mt-1 block text-[10px] tracking-[.04em] !text-white/42">1 ora · Mercoledì pomeriggio</span>
                                </span>
                                <span className="flex shrink-0 items-center gap-2">
                                  <span className="text-[9px] font-bold uppercase tracking-[.14em] text-sand">Gratuita</span>
                                  <ArrowUpRight className="h-3.5 w-3.5 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </span>
                              </a>

                              <a
                                href={consultationConfig.bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                role="menuitem"
                                onClick={() => setConsultationOpen(false)}
                                className="group flex items-center justify-between gap-4 border-t border-white/10 px-3 py-3.5 transition-colors hover:bg-white/[0.045]"
                              >
                                <span>
                                  <span className="block text-sm font-semibold !text-white">Finanza agevolata</span>
                                  <span className="mt-1 block text-[10px] tracking-[.04em] !text-white/42">1 ora · Martedì pomeriggio</span>
                                </span>
                                <span className="flex shrink-0 items-center gap-2">
                                  <span className="text-[9px] font-bold uppercase tracking-[.14em] text-sand">€{consultationConfig.price} · IVA incl.</span>
                                  <ArrowUpRight className="h-3.5 w-3.5 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </span>
                              </a>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <div key={item.href} className={`relative flex h-full items-center ${item.href === '/cookie-policy/' ? 'ml-1 border-l border-white/10 pl-2 2xl:pl-3' : ''}`}>
                      <Link
                        href={item.href}
                        className={`group relative flex h-full items-center px-2 text-[10px] font-medium uppercase tracking-[0.11em] transition-colors 2xl:px-2.5 2xl:text-[11px] ${
                          legal
                            ? active ? '!text-white' : '!text-white/45 hover:!text-white/75'
                            : active ? '!text-white' : '!text-white/68 hover:!text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        {!legal && (
                          <span className={`absolute bottom-[14px] left-2 h-px bg-sand transition-all duration-300 2xl:left-2.5 ${active ? 'w-[calc(100%-1rem)] 2xl:w-[calc(100%-1.25rem)]' : 'w-0 group-hover:w-[calc(100%-1rem)] 2xl:group-hover:w-[calc(100%-1.25rem)]'}`} />
                        )}
                      </Link>
                    </div>
                  );
                })}
              </nav>

              <div className="ml-2 border-l border-white/10 pl-1 2xl:ml-3 2xl:pl-2">
                <LanguageSwitcher />
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-2 xl:hidden">
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>
              <button
                onClick={() => setOpen((value) => !value)}
                className="grid h-10 w-10 shrink-0 place-items-center border border-white/15 bg-white/[0.04] !text-white transition-colors hover:bg-white hover:!text-night"
                aria-expanded={open}
                aria-label={open ? 'Chiudi menu' : 'Apri menu'}
              >
                {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#080C0D] xl:hidden"
          >
            <div className="absolute inset-0 prosperya-grid opacity-30" />
            <div className="absolute right-[-8rem] top-10 h-[25rem] w-[25rem] rounded-full bg-mediterranean/10 blur-3xl" />
            <div className="absolute bottom-[-10rem] left-[-8rem] h-[28rem] w-[28rem] rounded-full bg-sand/[0.05] blur-3xl" />

            <div className="relative mx-auto flex min-h-[100svh] max-w-[1480px] flex-col px-5 pb-24 pt-24 sm:px-8 sm:pt-28 lg:pb-8">
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.24em] !text-white/40">Navigation / Prosperya</p>
                  <span className="font-heading italic text-sm text-sand/80">Palermo · Sicilia</span>
                </div>

                <nav aria-label="Menu mobile">
                  {mainNav.map((item, index) => {
                    const consultation = item.href === '/contatti/';
                    const legal = item.href === '/cookie-policy/' || item.href === '/privacy-policy/';
                    const active = isActive(item.href);

                    if (consultation) {
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 + index * 0.035 }}
                          className="my-5 border border-sand/25 bg-sand/[0.045]"
                        >
                          <button
                            type="button"
                            onClick={() => setConsultationOpen((value) => !value)}
                            className="flex w-full items-center justify-between px-4 py-4 text-left sm:px-5"
                            aria-expanded={consultationOpen}
                          >
                            <span>
                              <span className="block text-[9px] font-semibold uppercase tracking-[.22em] !text-sand/65">05 · Private advisory</span>
                              <span className="mt-1.5 block text-2xl font-heading !text-white sm:text-3xl">{item.label}</span>
                            </span>
                            <ChevronDown className={`h-4 w-4 text-sand/80 transition-transform ${consultationOpen ? 'rotate-180' : ''}`} />
                          </button>

                          <AnimatePresence initial={false}>
                            {consultationOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22 }}
                                className="overflow-hidden border-t border-white/10"
                              >
                                <a
                                  href={startupConsultationConfig.bookingUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => {
                                    setConsultationOpen(false);
                                    setOpen(false);
                                  }}
                                  className="flex items-center justify-between gap-4 px-4 py-4 sm:px-5"
                                >
                                  <span>
                                    <span className="block text-sm font-semibold !text-white">Start Up</span>
                                    <span className="mt-1 block text-[10px] !text-white/40">Mercoledì · 1 ora</span>
                                  </span>
                                  <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.14em] text-sand">Gratuita <ArrowUpRight className="h-3.5 w-3.5" /></span>
                                </a>
                                <a
                                  href={consultationConfig.bookingUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => {
                                    setConsultationOpen(false);
                                    setOpen(false);
                                  }}
                                  className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-4 sm:px-5"
                                >
                                  <span>
                                    <span className="block text-sm font-semibold !text-white">Finanza agevolata</span>
                                    <span className="mt-1 block text-[10px] !text-white/40">Martedì · 1 ora</span>
                                  </span>
                                  <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.14em] text-sand">€{consultationConfig.price} · IVA incl. <ArrowUpRight className="h-3.5 w-3.5" /></span>
                                </a>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    }

                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + index * 0.035 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={`group grid grid-cols-[38px_1fr_auto] items-center gap-2 border-b py-4 transition-colors sm:grid-cols-[46px_1fr_auto] sm:py-5 ${legal ? 'border-white/[0.06]' : 'border-white/10'} ${active ? 'bg-white/[0.025]' : ''}`}
                        >
                          <span className={`font-heading italic ${legal ? 'text-sm text-white/25' : 'text-lg text-sand/65'}`}>0{index + 1}</span>
                          <span className={`${legal ? 'text-sm font-medium !text-white/55 sm:text-base' : 'text-[clamp(1.45rem,6vw,2.45rem)] font-heading leading-none !text-white'}`}>{item.label}</span>
                          <ArrowRight className={`transition-transform duration-300 group-hover:translate-x-1 ${legal ? 'h-3.5 w-3.5 text-white/25' : 'h-4 w-4 text-white/45'}`} />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="mt-6 sm:hidden">
                  <LanguageSwitcher mobile />
                </div>
              </div>

              <div className="mt-6 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2 sm:items-end">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[.2em] !text-white/30">Contatti</p>
                  <a href={company.gmailComposeHref} target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm !text-white/70 hover:!text-white">{company.emailPubblica}</a>
                </div>
                <p className="text-[9px] uppercase tracking-[.18em] !text-white/28 sm:text-right">{company.payoff}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
