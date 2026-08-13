import Link from 'next/link';
import PortfolioShootGrid from './PortfolioShootGrid';
import type { PortfolioShootCard } from '@/lib/portfolioData';

type ServiceGallerySectionProps = {
  serviceName: string;
  portfolioHref: string;
  shoots: PortfolioShootCard[];
};

export default function ServiceGallerySection({
  serviceName,
  portfolioHref,
  shoots,
}: ServiceGallerySectionProps) {
  return (
    <section
      className="border-t border-gray-200 bg-gray-50 px-6 py-16 dark:border-gray-700 dark:bg-gray-900 sm:px-10 lg:px-16 lg:py-24"
      aria-labelledby="service-galleries-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Recent work</p>
          <h2
            id="service-galleries-heading"
            className="mt-4 font-sans text-2xl font-medium text-gray-900 dark:text-gray-100 md:text-3xl"
          >
            A closer look at {serviceName.toLowerCase()}
          </h2>
          <p className="mt-4 font-sans text-base font-light leading-[1.8] text-gray-600 dark:text-gray-400">
            Tap any gallery to see the full collection—or browse everything in
            the portfolio.
          </p>
        </div>

        <div className="mt-14">
          <PortfolioShootGrid shoots={shoots} categoryName={serviceName} />
        </div>

        <div className="mt-12 text-center">
          <Link
            href={portfolioHref}
            className="font-sans text-sm font-light text-gray-900 underline decoration-gray-400 underline-offset-4 transition hover:text-gray-700 dark:text-gray-400"
          >
            View all {serviceName.toLowerCase()} galleries →
          </Link>
        </div>
      </div>
    </section>
  );
}
