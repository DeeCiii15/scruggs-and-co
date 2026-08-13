'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TESTIMONIALS } from '@/lib/testimonialsData';

/**
 * Continuum-style reviews — quote over photo, no tall scrub (no black gap before footer).
 */
export default function ContinuumReviews() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (TESTIMONIALS.length < 2) return;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, []);

  const active = TESTIMONIALS[index] ?? TESTIMONIALS[0];

  return (
    <section
      id="testimonials"
      className="relative min-h-svh scroll-mt-24 overflow-hidden bg-paper"
    >
      <div className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-night">
        <div className="absolute inset-0" aria-hidden>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === index ? 1 : 0 }}
            >
              <Image
                src={t.portrait}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-night/65" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/85 via-night/40 to-night/50" />

        <div className="relative z-[1] px-6 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-3xl text-center">
            <p className="font-script text-3xl text-clay md:text-4xl">kind words</p>
            <h2 className="sr-only">What they still talk about</h2>

            <div className="mt-10" aria-live="polite">
              <p className="font-sans text-lg font-light leading-[1.75] text-fog sm:text-xl md:text-[1.35rem] md:leading-[1.7]">
                &ldquo;{active.quote}&rdquo;
              </p>
              <footer className="mt-8">
                <cite className="font-sans not-italic text-sm font-medium tracking-wide text-fog">
                  {active.name}
                </cite>
                <p className="mt-2 font-sans text-[0.65rem] uppercase tracking-[0.16em] text-clay">
                  {active.detail}
                </p>
              </footer>
            </div>

            <div className="mt-10 flex items-center justify-center gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label={`Show review from ${t.name}`}
                  aria-current={i === index ? true : undefined}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 w-7 rounded-full transition-colors ${
                    i === index ? 'bg-clay' : 'bg-fog/25 hover:bg-fog/40'
                  }`}
                />
              ))}
            </div>

            <Link
              href="/contact"
              className="fl-btn fl-btn-on-dark mt-12 inline-flex"
            >
              Reach out
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
