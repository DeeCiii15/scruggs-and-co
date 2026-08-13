'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TESTIMONIALS,
  type Testimonial,
} from '@/lib/testimonialsData';
import TestimonialLightbox from './TestimonialLightbox';

function Chevron({ dir }: { dir: -1 | 1 }) {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {dir < 0 ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

type TestimonialsSectionProps = {
  id?: string;
  showContactCta?: boolean;
  testimonials?: readonly Testimonial[];
  eyebrow?: string;
  heading?: React.ReactNode;
  description?: string;
};

export default function TestimonialsSection({
  id = 'testimonials',
  showContactCta = true,
  testimonials = TESTIMONIALS,
  eyebrow = 'kind words',
  heading = <>What they still talk about</>,
  description = 'A few favorites from couples who trusted Liv with their forever moments.',
}: TestimonialsSectionProps) {
  const deckRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const scrollDeck = useCallback((dir: -1 | 1) => {
    const el = deckRef.current;
    if (!el) return;
    el.scrollBy({
      left: Math.min(el.clientWidth * 0.85, 480) * dir,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const el = deckRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      const atStart = el.scrollLeft <= 1;
      const atEnd = el.scrollLeft >= max - 1;
      if (e.deltaY > 0 && atEnd) return;
      if (e.deltaY < 0 && atStart) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section id={id} className="fl-night scroll-mt-24 px-5 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-script text-3xl text-clay md:text-4xl">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl text-fog md:text-4xl lg:text-[2.65rem]">
            {heading}
          </h2>
          <p className="mt-4 font-sans text-sm font-light leading-relaxed text-fog/65">
            {description}
          </p>
        </div>

        <div className="relative mt-14" role="region" aria-label="Client testimonials">
          <button
            type="button"
            onClick={() => scrollDeck(-1)}
            className="absolute left-0 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-fog/25 text-fog transition hover:border-clay hover:text-clay sm:flex"
            aria-label="Previous review"
          >
            <Chevron dir={-1} />
          </button>
          <button
            type="button"
            onClick={() => scrollDeck(1)}
            className="absolute right-0 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-fog/25 text-fog transition hover:border-clay hover:text-clay sm:flex"
            aria-label="Next review"
          >
            <Chevron dir={1} />
          </button>

          <div
            ref={deckRef}
            className="scrollbar-hide flex gap-5 overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory px-1 pb-2 sm:gap-7 sm:px-14"
          >
            {testimonials.map((t, i) => (
              <button
                key={`${t.name}-${i}`}
                type="button"
                onClick={() => setActiveIndex(i)}
                className="group w-[min(88vw,22rem)] shrink-0 snap-center border border-fog/12 bg-fog/[0.03] p-6 text-left transition hover:border-clay/50 sm:w-[24rem] sm:p-8"
                aria-label={`Read full review from ${t.name}`}
              >
                <div className="relative mb-5 h-14 w-14 overflow-hidden">
                  <Image
                    src={t.portrait}
                    alt=""
                    fill
                    className="object-cover opacity-90 transition group-hover:opacity-100"
                    sizes="56px"
                  />
                </div>
                <p className="font-display text-xl italic leading-snug text-fog/90 sm:text-[1.35rem]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 border-t border-fog/15 pt-4">
                  <cite className="font-sans not-italic text-sm font-medium tracking-wide text-fog">
                    {t.name}
                  </cite>
                  <p className="mt-1 text-[0.6rem] uppercase tracking-[0.16em] text-clay">
                    {t.detail}
                  </p>
                </footer>
              </button>
            ))}
          </div>
        </div>

        {activeIndex !== null ? (
          <TestimonialLightbox
            testimonials={testimonials}
            activeIndex={activeIndex}
            onClose={() => setActiveIndex(null)}
            onNavigate={setActiveIndex}
          />
        ) : null}

        {showContactCta && (
          <div className="mt-14 flex justify-center">
            <Link href="/contact" className="fl-btn fl-btn-on-dark">
              Reach out
              <span aria-hidden>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
