'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CalendarDays, Clock3, Mail, MessageCircle, X } from 'lucide-react';
import { company } from '@/data/company';
import { consultationConfig, startupConsultationConfig } from '@/data/consultations';

interface ConsultationModalProps {
  open: boolean;
  onClose: () => void;
}

export function ConsultationModal({ open, onClose }: ConsultationModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const frame = window.requestAnimationFrame(() => {
      dialogRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] overflow-y-auto overscroll-contain bg-[#050708]/84 md:backdrop-blur-sm"
      role="presentation"
      onMouseDown={onClose}
    >
      <div className="flex min-h-full items-start justify-center p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-[max(.75rem,env(safe-area-inset-top))] sm:items-center sm:p-6">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="consultation-title"
          onMouseDown={(event) => event.stopPropagation()}
          className="relative my-auto max-h-[calc(100svh-1.5rem)] w-full max-w-3xl overflow-y-auto overscroll-contain border border-white/12 bg-[#172326] text-white shadow-[0_35px_120px_rgba(0,0,0,.42)] sm:max-h-[calc(100svh-3rem)]"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sand/80 to-transparent" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-mediterranean/14 blur-3xl" />

          <button
            type="button"
            onClick={onClose}
            className="sticky right-4 top-4 z-20 ml-auto mr-4 mt-4 grid h-11 w-11 place-items-center border border-white/15 bg-[#172326]/95 !text-white/80 shadow-[0_8px_28px_rgba(0,0,0,.24)] backdrop-blur transition-colors hover:bg-white hover:!text-night"
            aria-label="Chiudi"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative -mt-11 grid md:grid-cols-[1.3fr_.7fr]">
            <div className="p-6 pt-16 sm:p-8 sm:pt-16 md:p-9 md:pt-16 lg:p-10 lg:pt-16">
              <p className="eyebrow !text-sand/80">Scegli la consulenza</p>
              <h2 id="consultation-title" className="mt-4 max-w-xl text-[clamp(2.6rem,10vw,4.6rem)] font-heading leading-[.94] tracking-[-.035em] !text-white">
                Due percorsi. <span className="italic !text-white/68">Due modalità.</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-[1.75] !text-white/66 sm:text-base">
                La consulenza Start Up è gratuita. La consulenza di Finanza Agevolata ha un costo di €{consultationConfig.price} {consultationConfig.vatLabel.toLowerCase()}.
              </p>

              <div className="mt-7 space-y-3">
                <a
                  href={startupConsultationConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="group relative block overflow-hidden border border-[#E8D39E] bg-[#E7D4A6] p-5 text-night shadow-[0_18px_50px_rgba(207,177,119,.15)] transition-transform duration-300 hover:-translate-y-0.5 sm:p-6"
                >
                  <div className="pointer-events-none absolute -right-8 -top-10 font-heading text-[8rem] italic leading-none text-night/[0.05]">0</div>
                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-[.2em] text-night/58">Start Up</span>
                        <span className="border border-night/20 bg-night px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.18em] !text-white">Consulenza gratuita</span>
                      </div>
                      <p className="mt-4 text-[2.6rem] font-heading leading-[.9] tracking-[-.035em] text-night sm:text-5xl">Gratuita.</p>
                    </div>
                    <span className="grid h-11 w-11 shrink-0 place-items-center border border-night/15 bg-night text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="relative mt-5 grid gap-3 border-t border-night/15 pt-4 sm:grid-cols-2">
                    <div className="flex items-start gap-2.5">
                      <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-night/58" />
                      <p className="text-xs font-medium leading-[1.6] text-night/72">{startupConsultationConfig.durationLabel}</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-night/58" />
                      <p className="text-xs font-medium leading-[1.6] text-night/72">{startupConsultationConfig.availableDays}<br />{startupConsultationConfig.availableHours}</p>
                    </div>
                  </div>
                  <div className="relative mt-4 flex items-center justify-between gap-4 border-t border-night/10 pt-4">
                    <span className="text-[10px] font-bold uppercase tracking-[.16em] text-night/70">Prenota gratuitamente</span>
                    <span className="text-xs text-night/50">Cal.com ↗</span>
                  </div>
                </a>

                <a
                  href={consultationConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="group block border border-white/12 bg-white/[0.035] p-5 transition-colors hover:border-sand/35 hover:bg-white/[0.055]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[.2em] !text-white/40">Finanza Agevolata</p>
                      <p className="mt-3 text-3xl font-heading !text-white">€{consultationConfig.price} <span className="font-body text-[9px] font-semibold uppercase tracking-[.15em] !text-white/38">{consultationConfig.vatLabel}</span></p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-sand/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <div className="mt-4 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-2">
                    <div className="flex items-start gap-2.5"><Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sand/70" /><p className="text-[11px] leading-[1.6] !text-white/55">{consultationConfig.durationLabel}</p></div>
                    <div className="flex items-start gap-2.5"><CalendarDays className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sand/70" /><p className="text-[11px] leading-[1.6] !text-white/55">{consultationConfig.availableDays}<br />{consultationConfig.availableHours}</p></div>
                  </div>
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[10px] uppercase tracking-[.14em] !text-white/38">
                <Link href="/servizi/startup/" onClick={onClose} className="transition-colors hover:!text-white">Dettagli Start Up</Link>
                <Link href="/servizi/finanza-agevolata/" onClick={onClose} className="transition-colors hover:!text-white">Dettagli Finanza Agevolata</Link>
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/[0.035] p-6 sm:p-8 md:border-l md:border-t-0 md:p-8 lg:p-9">
              <p className="text-[10px] font-semibold uppercase tracking-[.22em] !text-white/40">Altri servizi</p>
              <p className="mt-4 text-sm leading-[1.75] !text-white/62">Per gli altri servizi il primo confronto resta gratuito e viene gestito tramite richiesta diretta.</p>

              <div className="mt-6 space-y-3">
                <a href={company.whatsappHref} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 border-b border-white/10 py-4 !text-white/72 transition-colors hover:!text-white">
                  <span className="flex items-center gap-3 text-sm"><MessageCircle className="h-4 w-4 text-[#25D366]" />WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4 opacity-45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a href={company.gmailComposeHref} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 border-b border-white/10 py-4 !text-white/72 transition-colors hover:!text-white">
                  <span className="flex min-w-0 items-center gap-3 text-sm"><Mail className="h-4 w-4 shrink-0 text-sand" /><span className="truncate">Email</span></span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 opacity-45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              <Link href="/contatti/" onClick={onClose} className="group mt-7 flex min-h-13 w-full items-center justify-between bg-white px-5 py-4 text-sm font-semibold !text-night transition-colors hover:bg-sand">
                Richiedi una consulenza
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              <p className="mt-5 text-[11px] leading-relaxed !text-white/38">Il modulo raccoglie anche i dati aziendali necessari, inclusa la P. IVA.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
