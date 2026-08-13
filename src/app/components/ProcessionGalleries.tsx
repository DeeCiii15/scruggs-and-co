import Image from 'next/image';
import Link from 'next/link';
import { PORTFOLIO_HOME_CARDS } from '@/lib/portfolioData';

function Doorway({
  name,
  image,
  tagline,
  href,
  eyebrow,
}: {
  name: string;
  image: string;
  tagline: string;
  href: string;
  eyebrow?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-svh flex-col justify-end overflow-hidden bg-night"
    >
      <Image
        src={image}
        alt=""
        fill
        className="object-cover transition duration-[1.1s] group-hover:scale-[1.04]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-night/35 transition group-hover:bg-night/45" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-night/85 via-night/30 to-transparent" />
      <div className="relative z-[1] px-6 pb-16 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          {eyebrow ? (
            <p className="font-script text-3xl text-clay">{eyebrow}</p>
          ) : null}
          <h3 className="mt-2 font-display text-4xl text-fog md:text-5xl lg:text-6xl">
            {name}
          </h3>
          <p className="mt-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-fog/80">
            {tagline}
          </p>
          <p className="mt-8 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-fog/90">
            Enter gallery →
          </p>
        </div>
      </div>
    </Link>
  );
}

/**
 * Procession chapters — two full-viewport doorways into the work.
 */
export default function ProcessionGalleries() {
  const weddings = PORTFOLIO_HOME_CARDS.find((c) => c.name === 'Weddings');
  const portraits = PORTFOLIO_HOME_CARDS.find((c) => c.name === 'Portraits');

  if (!weddings || !portraits) return null;

  return (
    <div id="portfolio" className="scroll-mt-24">
      <div className="bg-paper px-6 py-10 text-center sm:py-12">
        <p className="font-script text-3xl text-moss">the work</p>
        <h2 className="mt-1 font-display text-2xl text-ink sm:text-3xl">
          Galleries worth lingering in
        </h2>
      </div>
      <Doorway
        name={weddings.name}
        image={weddings.image}
        tagline={weddings.tagline}
        href={weddings.href}
        eyebrow="featured"
      />
      <Doorway
        name={portraits.name}
        image={portraits.image}
        tagline={portraits.tagline}
        href={portraits.href}
      />
    </div>
  );
}
