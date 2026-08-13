import {
  getShootPhotos,
  type PortfolioCategoryDef,
} from '@/lib/portfolioData';
import type { PortfolioShootDef } from '@/lib/portfolioShoots';
import { categoryMetadata, shootMetadata } from '@/lib/portfolioSeo';
import { getSiteUrl } from '@/lib/siteConfig';

type CategoryJsonLdProps = {
  category: PortfolioCategoryDef;
};

type ShootJsonLdProps = {
  category: PortfolioCategoryDef;
  shoot: PortfolioShootDef;
};

export function PortfolioCategoryJsonLd({ category }: CategoryJsonLdProps) {
  const base = getSiteUrl();
  const meta = categoryMetadata(category);
  const url = `${base}${meta.path}`;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: meta.title,
    description: meta.description,
    url,
    isPartOf: { '@id': `${base}#website` },
    about: {
      '@type': 'Thing',
      name: `${category.name} photography`,
    },
    provider: { '@id': `${base}#business` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function PortfolioShootJsonLd({ category, shoot }: ShootJsonLdProps) {
  const base = getSiteUrl();
  const meta = shootMetadata(category, shoot);
  const url = `${base}${meta.path}`;
  const photos = getShootPhotos(category.name, shoot.slug);

  const data = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: shoot.title,
    description: meta.description,
    url,
    author: { '@id': `${base}#business` },
    image: photos.map((photo) => `${base}${photo.src}`),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
