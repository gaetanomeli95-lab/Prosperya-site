import { company, site } from '@/data/company';

export function OrganizationJsonLd() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site.url}/#organization`,
        name: company.ragioneSociale,
        url: site.url,
        email: company.emailDirezione,
        telephone: company.telefono,
        vatID: company.pivaCf,
        address: {
          '@type': 'PostalAddress',
          streetAddress: company.sedeLegale,
          addressLocality: company.comune,
          postalCode: company.cap,
          addressRegion: company.regione,
          addressCountry: 'IT',
        },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${site.url}/#professional-service`,
        name: company.ragioneSociale,
        url: site.url,
        parentOrganization: { '@id': `${site.url}/#organization` },
        description: site.description,
        telephone: company.telefono,
        email: company.emailDirezione,
        address: {
          '@type': 'PostalAddress',
          streetAddress: company.sedeLegale,
          addressLocality: company.comune,
          postalCode: company.cap,
          addressRegion: company.regione,
          addressCountry: 'IT',
        },
        areaServed: [
          { '@type': 'Country', name: 'Italia' },
          { '@type': 'AdministrativeArea', name: 'Europa' },
          { '@type': 'AdministrativeArea', name: 'Area mediterranea' },
        ],
        knowsAbout: [
          'Governance',
          'Controllo di gestione',
          'Strategia e crescita',
          'Start Up',
          'Creazione NewCo',
          'Internazionalizzazione',
          'Ristrutturazione debiti',
          'Finanza agevolata',
          'Operazioni straordinarie',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: company.ragioneSociale,
        description: site.description,
        publisher: { '@id': `${site.url}/#organization` },
        inLanguage: 'it-IT',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
