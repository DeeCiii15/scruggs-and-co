import Image from 'next/image';
import Link from 'next/link';
import { TESTIMONIALS } from '@/lib/testimonialsData';

/**
 * Ledger reviews — typography-first pull quotes on paper (no dark scrub).
 */
export default function LedgerReviews() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-24 border-t border-ink/8 bg-paper px-5 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-script text-3xl text-moss md:text-4xl">kind words</p>
        <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
          What they still talk about
        </h2>
        <p className="mt-4 font-sans text-sm font-light leading-relaxed text-ink-soft">
          A few favorites from couples who trusted Liv with their forever
          moments.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-3xl space-y-16 sm:mt-20 sm:space-y-20">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="text-center">
            <div className="relative mx-auto mb-8 h-16 w-16 overflow-hidden bg-paper-deep sm:h-20 sm:w-20">
              <Image
                src={t.portrait}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <blockquote>
              <p className="font-display text-2xl italic leading-snug text-ink sm:text-[1.85rem] md:text-[2.05rem]">
                &ldquo;{t.quote}&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-7">
              <p className="font-sans text-sm font-medium tracking-wide text-ink">
                {t.name}
              </p>
              <p className="mt-2 text-[0.65rem] uppercase tracking-[0.16em] text-moss">
                {t.detail}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-16 flex justify-center sm:mt-20">
        <Link href="/contact" className="fl-btn">
          Reach out
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
