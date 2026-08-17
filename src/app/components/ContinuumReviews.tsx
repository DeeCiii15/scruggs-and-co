'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TESTIMONIALS } from '@/lib/testimonialsData';

/**
 * Kind words pinned on the letter-paper ground — no envelopes, no carousel.
 */
export default function ContinuumReviews() {
  return (
    <section
      id="testimonials"
      className="fl-letters relative min-h-svh scroll-mt-24 overflow-hidden bg-paper px-5 py-16 sm:px-10 sm:py-20 lg:px-16"
    >
      <div className="relative z-[2] mx-auto max-w-6xl text-center">
        <p className="font-script text-5xl text-moss md:text-6xl">kind words</p>
        <p className="mt-3 font-display text-sm text-ink-soft sm:text-base">
          from the people in the pictures
        </p>
        <h2 className="sr-only">Letters from recent couples</h2>
      </div>

      <div className="fl-scatter mx-auto mt-10 max-w-6xl sm:mt-12">
        {TESTIMONIALS.map((review, i) => (
          <article key={review.name} className={`fl-note fl-note-${i + 1}`}>
            <div className="fl-note-stamp">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={review.portrait}
                  alt=""
                  fill
                  className="object-cover fl-photo-earth"
                  sizes="120px"
                />
              </div>
            </div>
            <blockquote className="fl-note-quote">{review.quote}</blockquote>
            <p className="fl-note-from font-script">{review.name}</p>
          </article>
        ))}
      </div>

      <div className="relative z-[2] mt-12 flex justify-center sm:mt-16">
        <Link href="/contact" className="fl-btn">
          Let&apos;s connect
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
