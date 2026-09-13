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
      className="scroll-mt-24 border-t border-ink/8 px-6 py-16 sm:px-10 lg:px-16 lg:py-24"
      aria-labelledby="service-galleries-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-script text-3xl text-moss">recent work</p>
          <h2
            id="service-galleries-heading"
            className="mt-2 font-display text-4xl text-ink md:text-5xl"
          >
            A closer look at {serviceName.toLowerCase()}
          </h2>
          <p className="mt-4 font-sans text-base font-light leading-[1.8] text-ink-soft">
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
            className="fl-link text-moss"
          >
            View all {serviceName.toLowerCase()} galleries →
          </Link>
        </div>
      </div>
    </section>
  );
}
