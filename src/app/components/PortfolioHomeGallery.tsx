import Image from 'next/image';
import Link from 'next/link';
import { PORTFOLIO_HOME_CARDS_CENTERED } from '@/lib/portfolioData';

type PortfolioHomeGalleryProps = {
  variant?: 'home' | 'portfolio';
};

/**
 * Category grid — one card per gallery type (H3 entity titles).
 */
export default function PortfolioHomeGallery({
  variant = 'home',
}: PortfolioHomeGalleryProps) {
  const isHome = variant === 'home';

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
      {PORTFOLIO_HOME_CARDS_CENTERED.map((card, i) => (
        <Link
          key={card.name}
          href={card.href}
          className={`group relative block fl-print ${
            i % 2 === 0 ? 'fl-print-tilt-left' : 'fl-print-tilt-right'
          }`}
        >
          <div
            className={`relative w-full overflow-hidden ${
              isHome ? 'aspect-[3/4]' : 'aspect-[4/5] sm:aspect-[3/4]'
            }`}
          >
            <Image
              src={card.image}
              alt={card.name}
              fill
              className="object-cover fl-media-zoom"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/70 via-night/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
              <h3 className="font-display text-lg text-fog sm:text-2xl">
                {card.name}
              </h3>
              <p className="mt-0.5 font-sans text-[0.65rem] italic text-fog/75 sm:text-xs">
                {card.tagline}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
