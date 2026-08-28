import {
  getServiceHeroImage,
  serviceHref,
  type ServiceDef,
} from '@/lib/servicesData';
import { getSiteUrl, schemaAreaServed } from '@/lib/siteConfig';

type ServiceJsonLdProps = {
  service: ServiceDef;
};

/**
 * Service + WebPage schema for primary offering URLs.
 * `provider` points at the sitewide LocalBusiness node in the root layout.
 */
export default function ServiceJsonLd({ service }: ServiceJsonLdProps) {
  const url = getSiteUrl();
  const pageUrl = `${url}${serviceHref(service.slug)}`;
  const image = `${url}${getServiceHeroImage(service)}`;

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: service.metaTitle,
        description: service.metaDescription,
        isPartOf: { '@id': `${url}#website` },
        about: { '@id': `${pageUrl}#service` },
        primaryImageOfPage: image,
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        serviceType: service.name,
        name: service.name,
        description: service.metaDescription,
        url: pageUrl,
        image,
        provider: { '@id': `${url}#business` },
        areaServed: schemaAreaServed(),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
