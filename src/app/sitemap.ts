import { MetadataRoute } from 'next';
import { site } from '@/data/company';
import { services } from '@/data/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    'chi-siamo/',
    'servizi/',
    'internazionalizzazione/',
    'dicono-di-noi/',
    'contatti/',
    'simposio/',
    'privacy-policy/',
    'cookie-policy/',
  ];

  const serviceRoutes = services.map((s) => `servizi/${s.slug}/`);

  return [...routes, ...serviceRoutes].map((route) => ({
    url: `${site.url}/${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : route === 'simposio/' ? 0.9 : 0.7,
  }));
}
