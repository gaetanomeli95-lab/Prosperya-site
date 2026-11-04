import type { Metadata } from 'next';
import { site } from '@/data/company';
import { Hero } from '@/components/Hero';
import { SectionPositioning } from '@/components/SectionPositioning';
import { SectionIntro } from '@/components/SectionIntro';
import { SectionServices } from '@/components/SectionServices';
import { SectionMethod } from '@/components/SectionMethod';
import { SectionInternational } from '@/components/SectionInternational';
import { SectionExperience } from '@/components/SectionExperience';
import { SectionOperations } from '@/components/SectionOperations';
import { SectionCta } from '@/components/SectionCta';
import { SimposioHomeBanner } from '@/components/simposio/SimposioHomeBanner';

// Rigenerata ogni ora: il banner del simposio sparisce da solo a evento concluso.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      <Hero />
      <SimposioHomeBanner />
      <SectionPositioning />
      <SectionIntro />
      <SectionServices />
      <SectionMethod />
      <SectionInternational />
      <SectionExperience />
      <SectionOperations />
      <SectionCta />
    </>
  );
}
