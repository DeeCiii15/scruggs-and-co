import Link from 'next/link';
import { getServiceByPortfolioCategory } from '@/lib/servicesData';
import { getLiveWeddingLocationForShoot } from '@/lib/weddingLocations';
import { PRIMARY_STATE_ABBR } from '@/lib/siteConfig';

type PortfolioRelatedLinksProps = {
  /** Portfolio category display name, e.g. "Motherhood" */
  categoryName: string;
  /** When set (and category is Weddings), may add a live location page link */
  shootSlug?: string;
};

/**
 * Links from gallery / shoot pages to service & location landing pages—
 * worded so it’s clear these are about booking that kind of work, not more photos.
 */
export default function PortfolioRelatedLinks({
  categoryName,
  shootSlug,
}: PortfolioRelatedLinksProps) {
  const service = getServiceByPortfolioCategory(categoryName);
  const location =
    categoryName === 'Weddings' && shootSlug
      ? getLiveWeddingLocationForShoot(shootSlug)
      : undefined;

  if (!service && !location) return null;

  // When a shoot maps to a live location page, prefer that over the general
  // wedding service link—the location page is more specific to their needs.
  const showService = service && !location;

  return (
    <nav
      aria-label="Related photography services"
      className="flex flex-col items-stretch gap-2 sm:items-start"
    >
      {showService ? (
        <Link
          href={`/services/${service.slug}`}
          className="font-sans text-sm font-light text-gray-900 underline decoration-gray-400 underline-offset-4 transition hover:text-gray-700 dark:text-gray-400 sm:text-base"
        >
          Learn about our {service.name.toLowerCase()} services →
        </Link>
      ) : null}
      {location ? (
        <Link
          href={location.path}
          className="font-sans text-sm font-light text-gray-900 underline decoration-gray-400 underline-offset-4 transition hover:text-gray-700 dark:text-gray-400 sm:text-base"
        >
          See details on {location.city}, {PRIMARY_STATE_ABBR} weddings →
        </Link>
      ) : null}
    </nav>
  );
}
