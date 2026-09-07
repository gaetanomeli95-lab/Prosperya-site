'use client';

import { useEffect } from 'react';

type SupportedLanguage = 'it' | 'en' | 'fr';

function getSelectedLanguage(): SupportedLanguage {
  const selected = window.localStorage.getItem('prosperya-language');
  return selected === 'en' || selected === 'fr' || selected === 'it' ? selected : 'it';
}

function shouldLoadTranslate() {
  const selected = getSelectedLanguage();
  return selected === 'en' || selected === 'fr';
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
        if (!TranslateElement || !shouldLoadTranslate()) return;

        const host = document.getElementById('google_translate_element');
        if (!host || host.childElementCount > 0) return;

        new TranslateElement(
          {
            pageLanguage: 'it',
            includedLanguages: 'en,fr',
            layout: TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element',
        );
      } catch {
        // The website remains usable if the external translator is unavailable.
      }
    };

    // Google Translate is loaded only when a translated language is actually
    // selected. Keeping it completely out of the Italian version prevents a
    // stale Google cookie or previous translation from re-applying itself.
    if (shouldLoadTranslate()) injectTranslateScript();

    const onLanguage = (event: Event) => {
      const detail = (event as CustomEvent<SupportedLanguage>).detail;
      if (detail === 'en' || detail === 'fr') injectTranslateScript();
    };
    window.addEventListener('prosperya:language-selected', onLanguage);

    const cleanGoogleUi = () => {
      document.querySelectorAll('iframe.goog-te-banner-frame').forEach((element) => element.remove());
      document.querySelectorAll('.goog-te-banner-frame').forEach((element) => element.remove());
      document.querySelectorAll('body > iframe').forEach((element) => {
        const iframe = element as HTMLIFrameElement;
        const className = typeof iframe.className === 'string' ? iframe.className : '';
        if (className.includes('goog-te')) iframe.remove();
      });
      if (document.body.style.top) document.body.style.top = '';
    };

    const observer = new MutationObserver(cleanGoogleUi);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    const interval = window.setInterval(cleanGoogleUi, 500);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
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
