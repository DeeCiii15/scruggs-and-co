import { getSocialLinks } from '@/lib/siteSocial';
import {
  DEFAULT_OG_IMAGE_PATH,
  GEO_COORDINATES,
  getSiteUrl,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  PRIMARY_CITY,
  PRIMARY_REGION,
  PRIMARY_STATE,
  PRIMARY_STATE_ABBR,
  SERVICE_AREAS,
  SITE_DESCRIPTION,
  SITE_NAME,
} from '@/lib/siteConfig';

/** Local business + website schema for rich results */
export default function SiteJsonLd() {
  const url = getSiteUrl();
  const sameAs = getSocialLinks().map((link) => link.href);

  const business: Record<string, unknown> = {
    '@type': ['LocalBusiness', 'ProfessionalService', 'Photographer'],
    '@id': `${url}#business`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url,
    image: `${url}${DEFAULT_OG_IMAGE_PATH}`,
    email: CONTACT_EMAIL,
    ...(CONTACT_PHONE ? { telephone: CONTACT_PHONE } : {}),
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: PRIMARY_CITY,
      addressRegion: PRIMARY_STATE_ABBR,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO_COORDINATES.latitude,
      longitude: GEO_COORDINATES.longitude,
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: `${PRIMARY_REGION} region, ${PRIMARY_STATE}`,
      },
      ...SERVICE_AREAS.map((city) => ({
        '@type': 'City',
        name: `${city}, ${PRIMARY_STATE_ABBR}`,
      })),
    ],
    serviceType: [
      'Wedding photography',
      'Family photography',
      'Portrait photography',
      'Elopement photography',
      'Couples & engagement photography',
      'Motherhood photography',
      'Event photography',
    ],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${url}#website`,
        name: SITE_NAME,
        url,
        description: SITE_DESCRIPTION,
        publisher: { '@id': `${url}#business` },
      },
      business,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
