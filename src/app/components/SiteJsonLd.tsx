import { getSameAsLinks, GOOGLE_BUSINESS_PROFILE_URL } from '@/lib/siteSocial';
import { SITE_IMAGES } from '@/lib/siteImages';
import {
  DEFAULT_OG_IMAGE_PATH,
  GEO_COORDINATES,
  getSiteUrl,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  PHOTOGRAPHER_FAMILY_NAME,
  PHOTOGRAPHER_GIVEN_NAME,
  PHOTOGRAPHER_JOB_TITLE,
  PHOTOGRAPHER_LEGAL_NAME,
  PHOTOGRAPHER_PREFERRED_NAME,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  schemaAreaServed,
  SITE_DESCRIPTION,
  SITE_NAME,
} from '@/lib/siteConfig';

/** Local business + photographer identity for rich results */
export default function SiteJsonLd() {
  const url = getSiteUrl();
  const sameAs = getSameAsLinks();
  const personId = `${url}#person`;
  const businessId = `${url}#business`;

  const person: Record<string, unknown> = {
    '@type': 'Person',
    '@id': personId,
    name: PHOTOGRAPHER_LEGAL_NAME,
    givenName: PHOTOGRAPHER_GIVEN_NAME,
    familyName: PHOTOGRAPHER_FAMILY_NAME,
    alternateName: [
      PHOTOGRAPHER_PREFERRED_NAME,
      `${PHOTOGRAPHER_PREFERRED_NAME} ${PHOTOGRAPHER_FAMILY_NAME}`,
    ],
    jobTitle: PHOTOGRAPHER_JOB_TITLE,
    description: `${PHOTOGRAPHER_LEGAL_NAME} (${PHOTOGRAPHER_PREFERRED_NAME}) is the ${PHOTOGRAPHER_JOB_TITLE.toLowerCase()} behind ${SITE_NAME} in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
    url,
    image: `${url}${SITE_IMAGES.photographer}`,
    worksFor: { '@id': businessId },
    homeLocation: {
      '@type': 'Place',
      name: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: PRIMARY_CITY,
        addressRegion: PRIMARY_STATE_ABBR,
        addressCountry: 'US',
      },
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  const business: Record<string, unknown> = {
    '@type': ['LocalBusiness', 'ProfessionalService', 'Photographer'],
    '@id': businessId,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url,
    image: `${url}${DEFAULT_OG_IMAGE_PATH}`,
    email: CONTACT_EMAIL,
    ...(CONTACT_PHONE ? { telephone: CONTACT_PHONE } : {}),
    priceRange: '$$',
    founder: { '@id': personId },
    employee: { '@id': personId },
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
    areaServed: schemaAreaServed(),
    hasMap: GOOGLE_BUSINESS_PROFILE_URL,
    serviceType: [
      'Wedding photography',
      'Engagement photography',
      'Family photography',
      'Maternity photography',
      'Portrait photography',
      'Senior and graduation photography',
      'Elopement photography',
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
        publisher: { '@id': businessId },
      },
      business,
      person,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
