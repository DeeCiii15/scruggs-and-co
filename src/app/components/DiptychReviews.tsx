import Image from 'next/image';
import Link from 'next/link';
import { TESTIMONIALS } from '@/lib/testimonialsData';

/**
 * Diptych reviews — quote | frame pairs, alternating down the page.
 */
export default function DiptychReviews() {
  return (
    <section id="testimonials" className="scroll-mt-24 bg-paper">
      <div className="border-t border-ink/8 px-6 py-12 text-center sm:px-10 sm:py-14">
        <p className="font-script text-3xl text-moss md:text-4xl">kind words</p>
        <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
          What they still talk about
        </h2>
      </div>

      {TESTIMONIALS.map((t, i) => {
        const imageLeft = i % 2 === 0;
        const quote = (
          <div className="flex flex-col justify-center px-6 py-14 sm:px-12 lg:px-16 xl:px-20">
            <blockquote>
              <p className="max-w-md font-display text-2xl italic leading-snug text-ink sm:text-[1.75rem] md:text-[1.95rem]">
                &ldquo;{t.quote}&rdquo;
              </p>
            </blockquote>
            <footer className="mt-8">
              <p className="font-sans text-sm font-medium tracking-wide text-ink">
                {t.name}
              </p>
              <p className="mt-2 text-[0.65rem] uppercase tracking-[0.16em] text-moss">
                {t.detail}
              </p>
            </footer>
          </div>
        );
        const frame = (
          <div className="relative min-h-[20rem] bg-paper-deep sm:min-h-[26rem] lg:min-h-[min(62vh,34rem)]">
            <Image
              src={t.portrait}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        );

        return (
          <div
            key={t.name}
            className="grid border-t border-ink/8 lg:grid-cols-2"
          >
            {imageLeft ? (
              <>
                <div className="order-1">{frame}</div>
                <div className="order-2">{quote}</div>
              </>
            ) : (
              <>
                <div className="order-2 lg:order-1">{quote}</div>
                <div className="order-1 lg:order-2">{frame}</div>
              </>
            )}
          </div>
        );
      })}

      <div className="flex justify-center border-t border-ink/8 px-6 py-14">
        <Link href="/contact" className="fl-btn">
          Reach out
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
