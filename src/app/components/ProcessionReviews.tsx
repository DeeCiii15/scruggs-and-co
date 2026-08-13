import Image from 'next/image';
import Link from 'next/link';
import { TESTIMONIALS } from '@/lib/testimonialsData';

/**
 * Procession chapter — three short vows, then a soft contact doorway.
 */
export default function ProcessionReviews() {
  return (
    <>
      <section
        id="testimonials"
        className="scroll-mt-24 bg-paper px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-script text-3xl text-moss md:text-4xl">kind words</p>
          <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            What they still talk about
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-12 sm:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="text-center md:text-left">
              <div className="relative mx-auto mb-6 h-14 w-14 overflow-hidden bg-paper-deep md:mx-0">
                <Image
                  src={t.portrait}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <blockquote>
                <p className="font-display text-xl italic leading-snug text-ink sm:text-[1.35rem]">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-5">
                <p className="text-sm font-medium tracking-wide text-ink">
                  {t.name}
                </p>
                <p className="mt-1 text-[0.6rem] uppercase tracking-[0.16em] text-moss">
                  {t.detail}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Soft CTA chapter */}
      <section className="relative flex min-h-[70svh] items-end bg-night sm:min-h-[75svh]">
        <Image
          src="/images/hero_4.jpg"
          alt=""
          fill
          className="object-cover object-[center_40%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-night/50" />
        <div className="relative z-[1] w-full px-6 pb-16 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-script text-3xl text-clay md:text-4xl">
              ready when you are
            </p>
            <h2 className="mt-3 font-display text-3xl text-fog sm:text-4xl">
              Let&apos;s document the forever moments.
            </h2>
            <Link
              href="/contact"
              className="fl-btn fl-btn-solid-light mt-10 inline-flex"
            >
              Reach out
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
