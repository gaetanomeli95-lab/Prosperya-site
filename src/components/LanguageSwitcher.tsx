'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Globe2 } from 'lucide-react';

const languages = [
  { code: 'it', label: 'Italiano', short: 'IT', flag: 'it' },
  { code: 'en', label: 'English', short: 'EN', flag: 'gb' },
  { code: 'fr', label: 'Français', short: 'FR', flag: 'fr' },
] as const;

type LanguageCode = (typeof languages)[number]['code'];

function isLanguageCode(value: string | null): value is LanguageCode {
  return Boolean(value && languages.some((language) => language.code === value));
}

function FlagIcon({ code, size = 20 }: { code: string; size?: number }) {
  const height = Math.round(size * 0.75);
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt=""
      aria-hidden="true"
      width={size}
      height={height}
      loading="lazy"
      className="shrink-0 rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(255,255,255,.12)]"
      style={{ width: size, height }}
    />
  );
}

function setGoogTransCookie(language: LanguageCode) {
  const host = window.location.hostname;
  const value = language === 'it' ? '' : `/it/${language}`;
  const maxAge = language === 'it' ? 0 : 31536000;

  document.cookie = `googtrans=${value};path=/;max-age=${maxAge};SameSite=Lax`;
  if (host && host !== 'localhost') {
    document.cookie = `googtrans=${value};path=/;domain=.${host};max-age=${maxAge};SameSite=Lax`;
  }
}

function getGoogTransCookie(): LanguageCode {
  const match = document.cookie.match(/googtrans=\/it\/([a-zA-Z-]+)/);
  return isLanguageCode(match?.[1] ?? null) ? (match?.[1] as LanguageCode) : 'it';
}

export function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>('it');
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem('prosperya-language');
    const next = isLanguageCode(saved) ? saved : getGoogTransCookie();
    if (!isLanguageCode(saved) && saved) {
      window.localStorage.setItem('prosperya-language', 'it');
      setGoogTransCookie('it');
    }
    setLanguage(next);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const selectLanguage = (nextLanguage: LanguageCode) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem('prosperya-language', nextLanguage);
    setGoogTransCookie(nextLanguage);
    window.dispatchEvent(new CustomEvent('prosperya:language-selected', { detail: nextLanguage }));
    setOpen(false);
    window.location.reload();
  };

  const current = languages.find((item) => item.code === language) ?? languages[0];

  return (
    <div ref={rootRef} className={`relative ${mobile ? 'w-full' : 'shrink-0'}`} data-language-switcher>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={
          mobile
            ? 'flex min-h-12 w-full items-center justify-between border-y border-white/10 py-3 !text-white'
            : 'group inline-flex h-10 items-center gap-2.5 px-3 text-[10px] font-semibold uppercase tracking-[.14em] !text-white/65 transition-colors hover:!text-white'
        }
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Lingua del sito: ${current.label}`}
      >
        <span className="flex items-center gap-2.5">
          {mobile && <Globe2 className="h-4 w-4 text-sand" />}
          <FlagIcon code={current.flag} size={mobile ? 21 : 19} />
          {mobile && <span className="text-[10px] font-semibold uppercase tracking-[.2em] !text-white/45">Lingua</span>}
          <span className={mobile ? 'ml-1 text-sm font-semibold !text-white' : 'text-[10px] font-bold !text-white/80'}>{current.short}</span>
        </span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          {mobile && <div className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-sm" onClick={() => setOpen(false)} />}
          <div
            role="listbox"
            aria-label="Seleziona lingua"
            className={
              mobile
                ? 'fixed bottom-20 left-1/2 z-[80] w-[90vw] max-w-[320px] -translate-x-1/2 border border-white/12 bg-[#172326]/98 p-1.5 shadow-[0_22px_70px_rgba(0,0,0,.38)] backdrop-blur-2xl'
                : 'absolute right-0 top-[calc(100%+8px)] z-[80] min-w-[220px] border border-white/12 bg-[#172326]/98 p-1.5 shadow-[0_22px_70px_rgba(0,0,0,.34)] backdrop-blur-xl'
            }
          >
            {languages.map((item) => {
              const active = item.code === language;
              return (
                <button
                  key={item.code}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => selectLanguage(item.code)}
                  className={`flex min-h-11 w-full items-center justify-between gap-4 px-3 py-2 text-left transition-colors ${
                    active ? 'bg-sand/[0.09] !text-white' : '!text-white/65 hover:bg-white/[0.05] hover:!text-white'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <FlagIcon code={item.flag} size={21} />
                    <span>
                      <span className="block text-xs font-medium">{item.label}</span>
                      <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[.16em] !text-white/30">{item.short}</span>
                    </span>
                  </span>
                  {active && <Check className="h-3.5 w-3.5 text-sand" />}
                </button>
              );
            })}
            <p className="border-t border-white/10 px-3 py-2.5 text-[9px] leading-relaxed !text-white/35">Traduzione automatica Google</p>
          </div>
        </>
      )}
    </div>
  );
}
