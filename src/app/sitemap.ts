import type { MetadataRoute } from 'next';
import { getPortfolioSitemapEntries } from '@/lib/portfolioSeo';
import { getSiteUrl } from '@/lib/siteConfig';
import { getAllServiceSlugs, serviceHref } from '@/lib/servicesData';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/portfolio', priority: 0.85, changeFrequency: 'monthly' as const },
  ];

  const portfolioEntries = getPortfolioSitemapEntries();
  const serviceEntries = getAllServiceSlugs().map((slug) => ({
    path: serviceHref(slug),
    priority: 0.85,
  }));

  return [
    ...staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...portfolioEntries.map(({ path, priority }) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority,
    })),
    ...serviceEntries.map(({ path, priority }) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority,
    })),
  ];
}
