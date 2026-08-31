'use client';

import { useEffect } from 'react';

const supportedLanguages = ['it', 'en', 'fr', 'de', 'es'];

function getRequestedLanguage() {
  const saved = window.localStorage.getItem('prosperya-language');
  if (saved && supportedLanguages.includes(saved)) return saved;

  const match = document.cookie.match(/googtrans=\/it\/([a-zA-Z-]+)/);
  const cookieLanguage = match?.[1];
  return cookieLanguage && supportedLanguages.includes(cookieLanguage) ? cookieLanguage : 'it';
}

function removeGoogleChrome() {
  document.querySelectorAll('iframe.goog-te-banner-frame').forEach((element) => element.remove());
  document.querySelectorAll('.goog-te-banner-frame').forEach((element) => element.remove());
  document.querySelectorAll('.VIpgJd-ZVi9od-ORHb-OEVmcd').forEach((element) => element.remove());

  document.querySelectorAll('body > iframe').forEach((element) => {
    const iframe = element as HTMLIFrameElement;
    const className = typeof iframe.className === 'string' ? iframe.className : '';
    if (className.includes('goog-te-banner')) iframe.remove();
  });

  if (document.body.style.top) document.body.style.top = '';
  if (document.documentElement.style.top) document.documentElement.style.top = '';
}

function applySavedLanguage() {
  const requestedLanguage = getRequestedLanguage();
  if (requestedLanguage === 'it') return true;

  const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (!combo) return false;

  if (combo.value !== requestedLanguage) {
    combo.value = requestedLanguage;
    combo.dispatchEvent(new Event('change', { bubbles: true }));
  }

  return true;
}

export function GoogleTranslateBridge() {
  useEffect(() => {
    const translatedWindow = window as typeof window & {
      google?: any;
      googleTranslateElementInit?: () => void;
    };

    translatedWindow.googleTranslateElementInit = () => {
      try {
        const TranslateElement = translatedWindow.google?.translate?.TranslateElement;
        if (!TranslateElement) return;

        const host = document.getElementById('google_translate_element');
        if (!host || host.childElementCount > 0) return;

        new TranslateElement(
          {
            pageLanguage: 'it',
            includedLanguages: 'it,en,fr,de,es',
            layout: TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element',
        );

        window.setTimeout(() => {
          applySavedLanguage();
          removeGoogleChrome();
        }, 150);

        window.setTimeout(() => {
          applySavedLanguage();
          removeGoogleChrome();
        }, 700);
      } catch {
        // Keep the website usable if Google Translate is temporarily unavailable.
      }
    };

    if (!document.getElementById('google-translate-script-src')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script-src';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    } else if (translatedWindow.google?.translate?.TranslateElement) {
      translatedWindow.googleTranslateElementInit?.();
    }

    const observer = new MutationObserver(() => {
      removeGoogleChrome();
      applySavedLanguage();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    const interval = window.setInterval(() => {
      removeGoogleChrome();
      applySavedLanguage();
    }, 500);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }} />
      <style>{`
        .goog-te-banner-frame { display: none !important; }
        .goog-te-gadget { display: none !important; }
        .goog-logo-link { display: none !important; }
        .goog-te-spinner-pos { display: none !important; }
        body { top: 0 !important; }
        .goog-tooltip { display: none !important; }
        .goog-tooltip:hover { display: none !important; }
        .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
        #goog-gt-tt { display: none !important; }
        .goog-te-balloon-frame { display: none !important; }
        iframe.goog-te-banner-frame { display: none !important; height: 0 !important; width: 0 !important; }
        body > .skiptranslate { display: none !important; }
      `}</style>
    </>
  );
}
