'use client';

import { useEffect } from 'react';

type TranslateConstructor = new (
  options: {
    pageLanguage: string;
    includedLanguages: string;
    autoDisplay: boolean;
  },
  elementId: string,
) => unknown;

interface GoogleTranslateWindow extends Window {
  google?: {
    translate?: {
      TranslateElement?: TranslateConstructor;
    };
  };
  googleTranslateElementInit?: () => void;
}

const bannerSelectors = [
  'iframe.goog-te-banner-frame',
  '.goog-te-banner-frame',
  '.VIpgJd-ZVi9od-ORHb-OEVmcd',
  'body > .skiptranslate',
];

function removeGoogleChrome() {
  bannerSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => element.remove());
  });

  document.querySelectorAll('body > iframe').forEach((element) => {
    const iframe = element as HTMLIFrameElement;
    const className = typeof iframe.className === 'string' ? iframe.className : '';
    const src = iframe.getAttribute('src') ?? '';
    if (className.includes('goog-te') || src.includes('translate.google')) iframe.remove();
  });

  document.documentElement.style.top = '0px';
  document.body.style.top = '0px';
  document.body.style.position = '';
}

export function GoogleTranslateBridge() {
  useEffect(() => {
    const translatedWindow = window as GoogleTranslateWindow;

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
            autoDisplay: false,
          },
          'google_translate_element',
        );

        window.setTimeout(removeGoogleChrome, 50);
      } catch {
        // Google Translate is an enhancement: the site must remain usable if it fails.
      }
    };

    if (!document.getElementById('prosperya-google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'prosperya-google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    } else if (translatedWindow.google?.translate?.TranslateElement) {
      translatedWindow.googleTranslateElementInit?.();
    }

    removeGoogleChrome();

    const observer = new MutationObserver(removeGoogleChrome);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    const interval = window.setInterval(removeGoogleChrome, 400);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div id="google_translate_element" className="notranslate" translate="no" aria-hidden="true" />
      <style>{`
        #google_translate_element,
        .goog-te-banner-frame,
        iframe.goog-te-banner-frame,
        .goog-te-gadget,
        .goog-logo-link,
        .goog-te-spinner-pos,
        .goog-tooltip,
        #goog-gt-tt,
        .goog-te-balloon-frame,
        .VIpgJd-ZVi9od-ORHb-OEVmcd,
        body > .skiptranslate {
          display: none !important;
          visibility: hidden !important;
          width: 0 !important;
          height: 0 !important;
          min-height: 0 !important;
        }

        html,
        body {
          top: 0 !important;
        }

        .goog-text-highlight {
          background: transparent !important;
          box-shadow: none !important;
        }
      `}</style>
    </>
  );
}
