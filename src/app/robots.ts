import { MetadataRoute } from 'next';
import { site } from '@/data/company';

export default function robots(): MetadataRoute.Robots {
  const noindex = process.env.NEXT_PUBLIC_NOINDEX === 'true';

  return {
    rules: {
      userAgent: '*',
      allow: noindex ? undefined : '/',
      disallow: noindex ? '/' : undefined,
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
