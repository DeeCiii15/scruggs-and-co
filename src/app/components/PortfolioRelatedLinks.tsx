import Link from 'next/link';
import { getServiceByPortfolioCategory, serviceHref } from '@/lib/servicesData';

type PortfolioRelatedLinksProps = {
  /** Portfolio category display name, e.g. "Weddings" */
  categoryName: string;
  /** Reserved for shoot-level related links (same field as the TRR IA) */
  shootSlug?: string;
};

/**
 * Links from gallery / shoot pages to the matching service page—
 * worded so it’s clear these are about booking that kind of work, not more photos.
 */
export default function PortfolioRelatedLinks({
  categoryName,
}: PortfolioRelatedLinksProps) {
  const service = getServiceByPortfolioCategory(categoryName);
  if (!service) return null;

  return (
    <nav
      aria-label="Related photography services"
      className="flex flex-col items-stretch gap-2 sm:items-start"
    >
      <Link
        href={serviceHref(service.slug)}
        className="fl-link text-moss sm:text-base"
      >
        Learn about our {service.name.toLowerCase()} services →
      </Link>
    </nav>
  );
}
