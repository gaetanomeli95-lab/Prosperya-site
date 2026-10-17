'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const GA_ID = 'G-LLMYW2BHV4';
const CONSENT_KEY = 'prosperya-cookie-consent-v1';
const CONSENT_EVENT = 'prosperya:cookie-consent';

export function GoogleAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(window.localStorage.getItem(CONSENT_KEY) === 'all');
    const onConsent = (event: Event) => {
      setAllowed((event as CustomEvent<string>).detail === 'all');
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  if (!allowed) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}