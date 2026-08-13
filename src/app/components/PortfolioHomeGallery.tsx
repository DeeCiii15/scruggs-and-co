import Image from 'next/image';
import Link from 'next/link';
import { PORTFOLIO_HOME_CARDS } from '@/lib/portfolioData';
import { serviceHref } from '@/lib/servicesData';

type PortfolioHomeGalleryProps = {
  variant?: 'home' | 'portfolio';
};

const SESSION_CARDS = [
  {
    name: 'Couples',
    tagline: 'Easy love, soft light',
    image: '/images/engagement_1.jpg',
    href: serviceHref('sessions'),
  },
  {
    name: 'Family',
    tagline: 'The everyday forever moments',
    image: '/images/inspiration_3.jpg',
    href: serviceHref('sessions'),
  },
  {
    name: 'Maternity',
    tagline: 'Quiet anticipation',
    image: '/images/inspiration_1.jpg',
    href: serviceHref('sessions'),
  },
  {
    name: 'Seniors / Graduation',
    tagline: 'This chapter, documented',
    image: '/images/hero_5.jpg',
    href: serviceHref('sessions'),
  },
] as const;

/**
 * Featured 8/4 pair (Weddings + Portraits), then four smaller frames in a row.
 */
export default function PortfolioHomeGallery({
  variant = 'home',
}: PortfolioHomeGalleryProps) {
  const weddings = PORTFOLIO_HOME_CARDS.find((c) => c.name === 'Weddings');
  const portraits = PORTFOLIO_HOME_CARDS.find((c) => c.name === 'Portraits');
  const isHome = variant === 'home';

  if (!weddings || !portraits) return null;

  return (
    <div>
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-12 lg:gap-5">
        <Link
          href={weddings.href}
          className="group relative col-span-full block overflow-hidden bg-paper-deep lg:col-span-8"
        >
          <div
            className={`relative w-full overflow-hidden ${isHome ? 'aspect-[16/11] sm:aspect-[16/10]' : 'aspect-[16/10] sm:aspect-[16/9]'}`}
          >
            <Image
              src={weddings.image}
              alt={weddings.name}
              fill
              className="object-cover fl-media-zoom"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority={isHome}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/70 via-night/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <p className="font-script text-2xl text-clay sm:text-3xl">
                featured
              </p>
              <h2 className="mt-1 font-display text-3xl text-fog sm:text-4xl">
                {weddings.name}
              </h2>
              <p className="mt-2 max-w-sm font-sans text-[0.7rem] font-medium uppercase tracking-[0.16em] text-fog/75">
                {weddings.tagline}
              </p>
            </div>
          </div>
        </Link>

        <Link
          href={portraits.href}
          className="group relative col-span-full block overflow-hidden bg-paper-deep lg:col-span-4"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-auto lg:h-full">
            <Image
              src={portraits.image}
              alt={portraits.name}
              fill
              className="object-cover fl-media-zoom"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/65 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <h2 className="font-display text-2xl text-fog sm:text-3xl">
                {portraits.name}
              </h2>
              <p className="mt-2 font-sans text-[0.65rem] font-medium uppercase tracking-[0.16em] text-fog/75">
                {portraits.tagline}
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-8 sm:grid-cols-4 sm:gap-3">
        {SESSION_CARDS.map((card) => (
          <Link
            key={card.name}
            href={card.href}
            className="group relative block overflow-hidden bg-paper-deep"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={card.image}
                alt={card.name}
                fill
                className="object-cover fl-media-zoom"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/70 to-transparent px-2.5 py-2.5 sm:px-3 sm:py-3">
              <h2 className="font-display text-base text-fog sm:text-lg">
                {card.name}
              </h2>
              <p className="mt-0.5 font-sans text-[0.55rem] font-medium uppercase tracking-[0.14em] text-fog/75">
                {card.tagline}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
