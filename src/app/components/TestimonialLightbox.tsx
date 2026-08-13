'use client';

import { useCallback, useEffect } from 'react';
import type { Testimonial } from '@/lib/testimonialsData';

type TestimonialLightboxProps = {
  testimonials: readonly Testimonial[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function NavIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
      />
    </svg>
  );
}

export default function TestimonialLightbox({
  testimonials,
  activeIndex,
  onClose,
  onNavigate,
}: TestimonialLightboxProps) {
  const testimonial = testimonials[activeIndex];
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < testimonials.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(activeIndex - 1);
  }, [activeIndex, hasPrev, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(activeIndex + 1);
  }, [activeIndex, hasNext, onNavigate]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [goNext, goPrev, onClose]);

  if (!testimonial) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-[3px] dark:bg-black/70"
        onClick={onClose}
        aria-label="Close review"
      />

      {hasPrev ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            goPrev();
          }}
          className="absolute left-2 top-1/2 z-[102] flex h-11 w-11 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-md transition hover:bg-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 sm:left-4"
          aria-label="Previous review"
        >
          <NavIcon direction="left" />
        </button>
      ) : null}

      {hasNext ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            goNext();
          }}
          className="absolute right-2 top-1/2 z-[102] flex h-11 w-11 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-md transition hover:bg-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 sm:right-4"
          aria-label="Next review"
        >
          <NavIcon direction="right" />
        </button>
      ) : null}

      <div
        className="relative z-[101] w-full max-w-[min(92vw,32rem)] max-h-[min(88vh,42rem)] overflow-y-auto rounded-sm border border-gray-200 bg-white p-7 shadow-lg sm:max-w-lg sm:p-9"
        role="dialog"
        aria-modal="true"
        aria-label={`Review from ${testimonial.name}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm transition hover:bg-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
          aria-label="Close"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <blockquote className="pr-8">
          <p className="font-sans text-base font-light italic leading-[1.85] text-gray-600 dark:text-gray-400 sm:text-lg sm:leading-[1.9]">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <footer className="mt-7 border-t border-gray-200 pt-5 dark:border-gray-700">
            <cite className="font-sans not-italic text-xl text-gray-900 dark:text-gray-500">
              {testimonial.name}
            </cite>
            <p className="mt-1.5 font-sans text-xs uppercase tracking-[0.14em] text-gray-600 dark:text-gray-400">
              {testimonial.detail}
            </p>
          </footer>
        </blockquote>

        {testimonials.length > 1 ? (
          <p className="mt-6 text-center font-sans text-xs tracking-wide text-gray-600 dark:text-gray-400">
            {activeIndex + 1} / {testimonials.length}
          </p>
        ) : null}
      </div>
    </div>
  );
}
