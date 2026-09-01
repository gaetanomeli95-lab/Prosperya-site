'use client';

import { useEffect } from 'react';

function shouldLoadTranslate() {
  const selected = window.localStorage.getItem('prosperya-language');
  const consent = window.localStorage.getItem('prosperya-cookie-consent-v1');
  return selected && selected !== 'it' ? true : consent === 'all';
}

function injectTranslateScript() {
  if (document.getElementById('google-translate-script-src')) return;
  const script = document.createElement('script');
  script.id = 'google-translate-script-src';
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.head.appendChild(script);
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
            includedLanguages: 'it,en,fr',
            layout: TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element',
        );
      } catch {
        // The website remains usable if the external translator is unavailable.
      }
    };

    if (shouldLoadTranslate()) injectTranslateScript();

    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail === 'all') injectTranslateScript();
    };

    const onLanguage = () => injectTranslateScript();
    window.addEventListener('prosperya:cookie-consent', onConsent);
    window.addEventListener('prosperya:language-selected', onLanguage);

    const observer = new MutationObserver(() => {
      document.querySelectorAll('iframe.goog-te-banner-frame').forEach((element) => element.remove());
      document.querySelectorAll('.goog-te-banner-frame').forEach((element) => element.remove());
      document.querySelectorAll('body > iframe').forEach((element) => {
        const iframe = element as HTMLIFrameElement;
        const className = typeof iframe.className === 'string' ? iframe.className : '';
        if (className.includes('goog-te')) iframe.remove();
      });
      if (document.body.style.top) document.body.style.top = '';
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    const interval = window.setInterval(() => {
      document.querySelectorAll('iframe.goog-te-banner-frame').forEach((element) => element.remove());
      document.querySelectorAll('.goog-te-banner-frame').forEach((element) => element.remove());
      if (document.body.style.top) document.body.style.top = '';
    }, 500);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
      window.removeEventListener('prosperya:cookie-consent', onConsent);
      window.removeEventListener('prosperya:language-selected', onLanguage);
    };
  }, []);

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }} />
      <style dangerouslySetInnerHTML={{ __html: `
        .goog-te-banner-frame { display: none !important; }
        .goog-te-gadget { display: none !important; }
        .goog-logo-link { display: none !important; }
        .goog-te-spinner-pos { display: none !important; }
        body { top: 0 !important; position: static !important; }
        .goog-tooltip { display: none !important; }
        .goog-tooltip:hover { display: none !important; }
        .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
        #goog-gt-tt { display: none !important; }
        .goog-te-balloon-frame { display: none !important; }
        iframe.goog-te-banner-frame { display: none !important; height: 0 !important; width: 0 !important; }
        .skiptranslate { display: none !important; }
        body > .skiptranslate { display: none !important; }
      ` }} />
    </>
  );
}
