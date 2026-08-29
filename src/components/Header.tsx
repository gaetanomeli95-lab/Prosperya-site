'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { mainNav } from '@/data/navigation';
import { company } from '@/data/company';
import { ConsultationModal } from './ConsultationModal';
import { MiniBrandMark } from './MiniBrandMark';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

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
    if (media.matches) setOpen(false);
    media.addEventListener('change', closeOnDesktop);
    return () => media.removeEventListener('change', closeOnDesktop);
  }, []);

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, ''));

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-3 sm:py-4 lg:py-5'}`}>
        <div className={`mx-auto transition-all duration-500 ${scrolled ? 'max-w-[1440px] px-3 sm:px-6 lg:px-8' : 'max-w-[1500px] px-3 sm:px-6 lg:px-8'}`}>
          <div
            className={`relative flex items-center justify-between transition-all duration-500 ${
              scrolled
                ? 'h-[58px] border border-white/10 bg-[#080C0D]/94 px-3 shadow-[0_16px_52px_rgba(0,0,0,.25)] backdrop-blur-xl sm:px-4 xl:h-[62px] xl:px-5'
                : 'h-[64px] border-y border-white/10 bg-[#080C0D]/38 px-3 backdrop-blur-sm sm:px-4 xl:h-[68px] xl:px-2'
            }`}
          >
            <div className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-55'}`} />
            <div className={`pointer-events-none absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-sand/45 to-transparent transition-all duration-700 ${scrolled ? 'w-[72%]' : 'w-[42%]'}`} />

            <Link href="/" className="group relative z-10 flex min-w-0 items-center gap-3 xl:pr-6" aria-label={company.ragioneSociale}>
              <MiniBrandMark />
              <span className="min-w-0 border-l border-white/10 pl-3">
                <span className="block truncate text-[13px] font-semibold leading-none tracking-[0.21em] !text-white sm:text-sm">PROSPERYA</span>
                <span className="mt-1.5 hidden text-[8px] font-medium uppercase tracking-[0.23em] !text-white/42 sm:block 2xl:text-[9px]">Advisory · Governance · Growth</span>
              </span>
            </Link>

            <nav className="relative z-10 hidden h-full items-center xl:flex" aria-label="Navigazione principale">
              {mainNav.map((item, index) => {
                const legal = item.href === '/cookie-policy/' || item.href === '/privacy-policy/';
                const consultation = item.href === '/contatti/';
                const active = isActive(item.href);

                if (consultation) {
                  return (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => setConsultationOpen(true)}
                      className="group relative mx-4 inline-flex h-10 items-center gap-3 overflow-hidden border border-sand/35 px-4 text-[10px] font-semibold uppercase tracking-[0.15em] !text-white transition-all duration-300 hover:border-sand/80 2xl:mx-5 2xl:px-5 2xl:text-[11px]"
                    >
                      <span className="absolute inset-0 origin-left scale-x-0 bg-sand transition-transform duration-300 group-hover:scale-x-100" />
                      <span className="relative transition-colors group-hover:!text-night">{item.label}</span>
                      <ArrowUpRight className="relative h-3.5 w-3.5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-night" />
                    </button>
                  );
                }

                return (
                  <div key={item.href} className={`relative flex h-full items-center ${legal && index === 4 ? 'ml-1 border-l border-white/10 pl-2 2xl:pl-3' : ''}`}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`group relative flex h-full items-center px-2.5 text-[10px] font-medium uppercase tracking-[0.145em] transition-colors 2xl:px-3 2xl:text-[11px] ${
                        legal
                          ? active ? '!text-white/80' : '!text-white/38 hover:!text-white/70'
                          : active ? '!text-white' : '!text-white/64 hover:!text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {!legal && <span className={`absolute bottom-[12px] left-2.5 h-px bg-sand transition-all duration-300 2xl:left-3 ${active ? 'w-[calc(100%-1.25rem)] 2xl:w-[calc(100%-1.5rem)]' : 'w-0 group-hover:w-[calc(100%-1.25rem)] 2xl:group-hover:w-[calc(100%-1.5rem)]'}`} />}
                    </Link>
                  </div>
                );
              })}
            </nav>

            <button
              onClick={() => setOpen((value) => !value)}
              className="relative z-10 grid h-10 w-10 shrink-0 place-items-center border border-white/15 bg-white/[0.035] !text-white transition-all hover:border-white/30 hover:bg-white hover:!text-night xl:hidden"
              aria-expanded={open}
              aria-label={open ? 'Chiudi menu' : 'Apri menu'}
            >
              {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-40 bg-[#080C0D] xl:hidden">
            <div className="absolute inset-0 prosperya-grid opacity-25" />
            <div className="absolute right-[-8rem] top-10 h-[25rem] w-[25rem] rounded-full bg-mediterranean/10 blur-3xl" />
            <div className="absolute bottom-[-10rem] left-[-8rem] h-[28rem] w-[28rem] rounded-full bg-sand/[0.05] blur-3xl" />

            <div className="relative mx-auto flex min-h-[100svh] max-w-[1480px] flex-col px-5 pb-7 pt-24 sm:px-8 sm:pt-28">
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.24em] !text-white/38">Navigation / Prosperya</p>
                  <span className="font-heading italic text-sm text-sand/75">Palermo · Sicilia</span>
                </div>

                <nav aria-label="Menu mobile">
                  {mainNav.map((item, index) => {
                    const consultation = item.href === '/contatti/';
                    const legal = item.href === '/cookie-policy/' || item.href === '/privacy-policy/';
                    const active = isActive(item.href);

                    if (consultation) {
                      return (
                        <motion.button
                          key={item.href}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.04 + index * 0.03 }}
                          type="button"
                          onClick={() => { setOpen(false); setConsultationOpen(true); }}
                          className="group my-4 flex w-full items-center justify-between border border-sand/30 bg-sand/[0.07] px-4 py-4 text-left sm:px-5 sm:py-5"
                        >
                          <span>
                            <span className="block text-[8px] font-semibold uppercase tracking-[.22em] !text-sand/70">04 · Private advisory</span>
                            <span className="mt-2 block text-[1.7rem] font-heading leading-none !text-white sm:text-3xl">{item.label}</span>
                          </span>
                          <span className="grid h-10 w-10 place-items-center bg-sand !text-night"><ArrowUpRight className="h-4 w-4" /></span>
                        </motion.button>
                      );
                    }

                    return (
                      <motion.div key={item.href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 + index * 0.03 }}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={`group grid grid-cols-[34px_1fr_auto] items-center gap-2 border-b py-3.5 transition-colors sm:grid-cols-[46px_1fr_auto] sm:py-5 ${legal ? 'border-white/[0.06]' : 'border-white/10'} ${active ? 'bg-white/[0.025]' : ''}`}
                        >
                          <span className={`font-heading italic ${legal ? 'text-xs text-white/22' : 'text-base text-sand/60 sm:text-lg'}`}>0{index + 1}</span>
                          <span className={`${legal ? 'text-xs font-medium !text-white/50 sm:text-base' : 'text-[clamp(1.28rem,5.6vw,2.35rem)] font-heading leading-none !text-white'}`}>{item.label}</span>
                          <ArrowRight className={`transition-transform duration-300 group-hover:translate-x-1 ${legal ? 'h-3.5 w-3.5 text-white/20' : 'h-4 w-4 text-white/40'}`} />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              <div className="mt-5 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2 sm:items-end">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[.2em] !text-white/28">Direzione</p>
                  <a href={`mailto:${company.emailDirezione}`} className="mt-2 block text-sm !text-white/68 hover:!text-white">{company.emailDirezione}</a>
                </div>
                <p className="text-[8px] uppercase tracking-[.18em] !text-white/25 sm:text-right">Advisory · Governance · Growth</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConsultationModal open={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </>
  );
}
