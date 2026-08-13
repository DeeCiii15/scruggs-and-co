import Image from 'next/image';
import Link from 'next/link';
import { PORTFOLIO_HOME_CARDS } from '@/lib/portfolioData';

/**
 * Diptych galleries — wedding | portrait pairs with a single caption line each.
 */
export default function DiptychGalleries() {
  const weddings = PORTFOLIO_HOME_CARDS.find((c) => c.name === 'Weddings');
  const portraits = PORTFOLIO_HOME_CARDS.find((c) => c.name === 'Portraits');

  if (!weddings || !portraits) return null;

  return (
    <section id="portfolio" className="scroll-mt-24 bg-paper">
      <div className="border-y border-ink/8 px-6 py-12 text-center sm:px-10 sm:py-14">
        <p className="font-script text-3xl text-moss md:text-4xl">the work</p>
        <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl md:text-5xl">
          Galleries worth lingering in
        </h2>
        <Link href="/portfolio" className="fl-link mt-6 inline-flex text-moss">
          Browse all
          <span aria-hidden>→</span>
        </Link>
      </div>

      {/* Pair 1 — Weddings left, caption right */}
      <div className="grid lg:grid-cols-2">
        <Link
          href={weddings.href}
          className="group relative min-h-[22rem] bg-paper-deep sm:min-h-[28rem] lg:min-h-[min(72vh,38rem)]"
        >
          <Image
            src={weddings.image}
            alt={weddings.name}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </Link>
        <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-moss">
            featured
          </p>
          <h3 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            {weddings.name}
          </h3>
          <p className="mt-4 max-w-sm font-sans text-[0.95rem] font-light leading-relaxed text-ink-soft">
            {weddings.tagline}
          </p>
          <Link
            href={weddings.href}
            className="fl-link mt-8 inline-flex text-moss"
          >
            Enter gallery
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {/* Pair 2 — caption left, Portraits right (alternating) */}
      <div className="grid lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center px-6 py-12 sm:px-12 lg:order-1 lg:px-16">
          <h3 className="font-display text-3xl text-ink sm:text-4xl">
            {portraits.name}
          </h3>
          <p className="mt-4 max-w-sm font-sans text-[0.95rem] font-light leading-relaxed text-ink-soft">
            {portraits.tagline}
          </p>
          <Link
            href={portraits.href}
            className="fl-link mt-8 inline-flex text-moss"
          >
            Enter gallery
            <span aria-hidden>→</span>
          </Link>
        </div>
        <Link
          href={portraits.href}
          className="group relative order-1 min-h-[22rem] bg-paper-deep sm:min-h-[28rem] lg:order-2 lg:min-h-[min(72vh,38rem)]"
        >
          <Image
            src={portraits.image}
            alt={portraits.name}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </Link>
      </div>
    </section>
  );
}
