import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import { site, company } from '@/data/company';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BrandIntro } from '@/components/BrandIntro';
import { OrganizationJsonLd } from '@/components/JsonLd';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-body',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-heading',
});

const noindex = process.env.NEXT_PUBLIC_NOINDEX === 'true';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: '%s — Prosperya S.R.L.' },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: company.ragioneSociale,
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
  robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={`${dmSans.variable} ${playfair.variable} min-h-screen flex flex-col`}>
        <OrganizationJsonLd />
        <BrandIntro />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
