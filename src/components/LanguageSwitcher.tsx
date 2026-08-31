'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Globe2 } from 'lucide-react';

const languages = [
  { code: 'it', label: 'Italiano', short: 'IT' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'es', label: 'Español', short: 'ES' },
] as const;

type LanguageCode = (typeof languages)[number]['code'];

interface GoogleTranslateWindow extends Window {
  google?: {
    translate?: {
      TranslateElement?: new (
        options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
        elementId: string,
      ) => unknown;
    };
  };
  googleTranslateElementInit?: () => void;
}

function isLanguageCode(value: string | null): value is LanguageCode {
  return Boolean(value && languages.some((language) => language.code === value));
}

function getStoredLanguage(): LanguageCode {
  if (typeof window === 'undefined') return 'it';

  const stored = window.localStorage.getItem('prosperya-language');
  if (isLanguageCode(stored)) return stored;

  const match = document.cookie.match(/(?:^|; )googtrans=\/it\/([^;]+)/);
  const cookieLanguage = match?.[1] ?? null;
  if (isLanguageCode(cookieLanguage)) return cookieLanguage;

  return 'it';
}

function ensureTranslateHost() {
  let host = document.getElementById('google_translate_element');
  if (host) return host;

  host = document.createElement('div');
  host.id = 'google_translate_element';
  host.className = 'notranslate';
  host.setAttribute('translate', 'no');
  host.setAttribute('aria-hidden', 'true');
  host.style.position = 'fixed';
  host.style.width = '1px';
  host.style.height = '1px';
  host.style.overflow = 'hidden';
  host.style.opacity = '0';
  host.style.pointerEvents = 'none';
  host.style.left = '-9999px';
  document.body.appendChild(host);
  return host;
}

function expireCookie(name: string, domain?: string) {
  const domainPart = domain ? `; domain=${domain}` : '';
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainPart}; SameSite=Lax`;
}

function clearTranslationCookies() {
  expireCookie('googtrans');

  const hostname = window.location.hostname;
  if (hostname && hostname !== 'localhost') {
    expireCookie('googtrans', hostname);
    if (hostname.includes('.')) expireCookie('googtrans', `.${hostname}`);
  }
}

function setTranslationCookie(language: Exclude<LanguageCode, 'it'>) {
  clearTranslationCookies();
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `googtrans=/it/${language}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

export function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>('it');
  const rootRef = useRef<HTMLDivElement>(null);

  const loadTranslate = useCallback(() => {
    const translatedWindow = window as GoogleTranslateWindow;
    ensureTranslateHost();

    const initialize = () => {
      if (!translatedWindow.google?.translate?.TranslateElement) return;
      const element = ensureTranslateHost();
      if (element.childElementCount > 0) return;

      new translatedWindow.google.translate.TranslateElement(
        {
          pageLanguage: 'it',
          includedLanguages: languages.map((item) => item.code).join(','),
          autoDisplay: false,
        },
        'google_translate_element',
      );
    };

    translatedWindow.googleTranslateElementInit = initialize;

    if (translatedWindow.google?.translate?.TranslateElement) {
      initialize();
      return;
    }

    if (!document.querySelector('script[data-prosperya-translate]')) {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.dataset.prosperyaTranslate = 'true';
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const storedLanguage = getStoredLanguage();
    setLanguage(storedLanguage);
    if (storedLanguage !== 'it') loadTranslate();
  }, [loadTranslate]);

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
    if (nextLanguage === language) {
      setOpen(false);
      return;
    }

    window.localStorage.setItem('prosperya-language', nextLanguage);

    if (nextLanguage === 'it') {
      clearTranslationCookies();
    } else {
      setTranslationCookie(nextLanguage);
    }

    setLanguage(nextLanguage);
    setOpen(false);
    window.location.reload();
  };

  const current = languages.find((item) => item.code === language) ?? languages[0];

  return (
    <div
      ref={rootRef}
      className={`notranslate relative ${mobile ? 'w-full' : ''}`}
      translate="no"
      data-language-switcher
    >
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
          <Globe2 className={`${mobile ? 'h-4 w-4 text-sand' : 'h-3.5 w-3.5 text-sand/80'}`} />
          {mobile && <span className="text-[10px] font-semibold uppercase tracking-[.2em] !text-white/45">Lingua</span>}
          <span className={mobile ? 'ml-2 text-sm font-semibold !text-white' : 'text-[10px] font-bold !text-white/80'}>{current.short}</span>
        </span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Seleziona lingua"
          className={
            mobile
              ? 'mt-2 grid grid-cols-1 border border-white/10 bg-white/[0.03] p-1'
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
                className={`flex min-h-11 items-center justify-between gap-4 px-3 py-2 text-left transition-colors ${
                  active ? 'bg-sand/[0.09] !text-white' : '!text-white/65 hover:bg-white/[0.05] hover:!text-white'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`grid h-7 min-w-9 place-items-center border px-1.5 text-[9px] font-bold uppercase tracking-[.14em] ${active ? 'border-sand/40 bg-sand/[0.08] text-sand' : 'border-white/12 bg-white/[0.025] text-white/55'}`}>
                    {item.short}
                  </span>
                  <span className="text-xs font-medium">{item.label}</span>
                </span>
                {active && <Check className="h-3.5 w-3.5 text-sand" />}
              </button>
            );
          })}
          <p className="border-t border-white/10 px-3 py-2.5 text-[9px] leading-relaxed !text-white/35">Traduzione automatica</p>
        </div>
      )}
    </div>
  );
}
