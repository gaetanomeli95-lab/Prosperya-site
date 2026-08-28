'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Mail, Phone, X } from 'lucide-react';
import { company } from '@/data/company';

interface ConsultationModalProps {
  open: boolean;
  onClose: () => void;
}

export function ConsultationModal({ open, onClose }: ConsultationModalProps) {
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-[#050708]/82 p-3 sm:items-center sm:p-6 md:backdrop-blur-sm" role="presentation" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden border border-white/12 bg-[#0B1011] text-white shadow-[0_35px_120px_rgba(0,0,0,.52)]"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sand/80 to-transparent" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-mediterranean/14 blur-3xl" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center border border-white/12 bg-white/[0.04] text-white/75 transition-colors hover:bg-white hover:text-night"
          aria-label="Chiudi"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative grid md:grid-cols-[1.25fr_.75fr]">
          <div className="p-6 sm:p-8 md:p-10 lg:p-12">
            <p className="eyebrow !text-sand/80">Private advisory</p>
            <h2 id="consultation-title" className="mt-5 max-w-xl text-4xl font-heading leading-[.98] !text-white sm:text-5xl">
              Una conversazione iniziale. Poi solo ciò che serve davvero.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-[1.75] !text-white/58 sm:text-base">
              Raccontaci il contesto, l’obiettivo e il livello di urgenza. Prosperya individuerà il percorso più coerente prima di proporre qualsiasi intervento.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {['Analisi del contesto', 'Priorità operative', 'Percorso dedicato'].map((item, index) => (
                <div key={item} className="border border-white/10 bg-white/[0.03] p-4">
                  <span className="font-heading italic text-lg text-sand">0{index + 1}</span>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[.12em] !text-white/72">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/[0.035] p-6 sm:p-8 md:border-l md:border-t-0 md:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[.22em] !text-white/34">Contatto diretto</p>

            <div className="mt-6 space-y-3">
              <a href={`tel:${company.telefono.replace(/\s/g, '')}`} className="group flex items-center justify-between gap-4 border-b border-white/10 py-4 !text-white/76 transition-colors hover:!text-white">
                <span className="flex items-center gap-3 text-sm"><Phone className="h-4 w-4 text-sand" />{company.telefono}</span>
                <ArrowUpRight className="h-4 w-4 opacity-45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a href={`mailto:${company.emailDirezione}`} className="group flex items-center justify-between gap-4 border-b border-white/10 py-4 !text-white/76 transition-colors hover:!text-white">
                <span className="flex min-w-0 items-center gap-3 text-sm"><Mail className="h-4 w-4 shrink-0 text-sand" /><span className="truncate">{company.emailDirezione}</span></span>
                <ArrowUpRight className="h-4 w-4 shrink-0 opacity-45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <Link
              href="/contatti/"
              onClick={onClose}
              className="group mt-8 flex min-h-13 w-full items-center justify-between bg-white px-5 py-4 text-sm font-semibold !text-night transition-colors hover:bg-sand"
            >
              Apri la richiesta consulenza
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <p className="mt-5 text-[11px] leading-relaxed !text-white/32">Nessun percorso preconfezionato: il primo confronto serve a capire se e come intervenire.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
