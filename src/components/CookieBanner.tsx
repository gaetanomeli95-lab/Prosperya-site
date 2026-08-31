'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, X } from 'lucide-react';

const CONSENT_KEY = 'prosperya-cookie-consent-v1';

export type CookieConsent = 'essential' | 'all';

function saveConsent(value: CookieConsent) {
  window.localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent('prosperya:cookie-consent', { detail: value }));
}

export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    if (saved !== 'essential' && saved !== 'all') {
      const timer = window.setTimeout(() => setOpen(true), 450);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const choose = (value: CookieConsent) => {
    saveConsent(value);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[120] px-3 pb-3 sm:px-5 sm:pb-5" role="region" aria-label="Preferenze cookie">
      <div className="mx-auto max-w-[1180px] overflow-hidden border border-white/14 bg-[#142124]/[0.98] text-white shadow-[0_-20px_80px_rgba(5,8,9,.32)] backdrop-blur-xl">
        <div className="h-px bg-gradient-to-r from-logo-yellow via-logo-green to-logo-magenta" />
        <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10 lg:p-7">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.045]">
                <ShieldCheck className="h-4 w-4 text-sand" />
              </span>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[.22em] !text-white/42">Privacy & preferenze</p>
                <h2 className="mt-1 text-xl font-heading !text-white sm:text-2xl">Cookie, solo quando servono davvero.</h2>
              </div>
            </div>
            <p className="mt-4 text-xs leading-[1.75] !text-white/62 sm:text-sm">
              Usiamo le tecnologie necessarie al funzionamento del sito. Google Translate viene caricato solo con il tuo consenso oppure quando scegli volontariamente una lingua diversa dall’italiano.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-[.16em] !text-white/42">
              <Link href="/cookie-policy/" className="inline-flex items-center gap-1.5 transition-colors hover:!text-white">Cookie Policy <ArrowUpRight className="h-3 w-3" /></Link>
              <Link href="/privacy-policy/" className="inline-flex items-center gap-1.5 transition-colors hover:!text-white">Privacy Policy <ArrowUpRight className="h-3 w-3" /></Link>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[360px]">
            <button type="button" onClick={() => choose('essential')} className="min-h-12 border border-white/16 px-5 text-xs font-semibold uppercase tracking-[.13em] !text-white/72 transition-colors hover:border-white/35 hover:bg-white/[0.05] hover:!text-white">
              Solo necessari
            </button>
            <button type="button" onClick={() => choose('all')} className="min-h-12 bg-sand px-5 text-xs font-semibold uppercase tracking-[.13em] !text-night transition-colors hover:bg-white">
              Accetta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
