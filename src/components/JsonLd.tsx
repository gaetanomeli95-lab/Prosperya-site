import { company } from '@/data/company';

export function OrganizationJsonLd() {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: company.ragioneSociale,
    description:
      'Prosperya affianca imprenditori, aziende e investitori in governance, strategia, controllo, crescita e sviluppo internazionale.',
    url: company.sito,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.sedeLegale,
      addressLocality: 'Altavilla Milicia',
      postalCode: company.cap,
      addressRegion: company.regione,
      addressCountry: 'IT',
    },
    telephone: company.telefono,
    email: company.emailDirezione,
    vatID: company.pivaCf,
    sameAs: [company.sito],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
