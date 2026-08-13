'use client';

import Image from 'next/image';
import { useCallback, useEffect } from 'react';
import type { PortfolioPhoto } from '@/lib/portfolioData';

type PortfolioPolaroidLightboxProps = {
  photos: PortfolioPhoto[];
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

export default function PortfolioPolaroidLightbox({
  photos,
  activeIndex,
  onClose,
  onNavigate,
}: PortfolioPolaroidLightboxProps) {
  const photo = photos[activeIndex];
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < photos.length - 1;

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

  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-[3px] transition-opacity dark:bg-black/70"
        onClick={onClose}
        aria-label="Close enlarged photo"
      />

      {hasPrev ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            goPrev();
          }}
          className="absolute left-2 top-1/2 z-[102] flex h-11 w-11 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-md transition hover:bg-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 sm:left-4"
          aria-label="Previous photo"
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
          aria-label="Next photo"
        >
          <NavIcon direction="right" />
        </button>
      ) : null}

      <div
        className="relative z-[101] w-full max-w-[min(92vw,34rem)]"
        role="dialog"
        aria-modal="true"
        aria-label={photo.alt}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-2 -top-2 z-10 flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-md transition hover:bg-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 sm:-right-3 sm:-top-3"
          aria-label="Close"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <div className="overflow-hidden rounded-sm border border-gray-200 bg-white">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-contain object-center"
              sizes="(max-width: 768px) 92vw, 34rem"
              priority
            />
          </div>
        </div>

        {photos.length > 1 ? (
          <p className="mt-3 text-center font-sans text-xs tracking-wide text-white/88 dark:text-gray-400">
            {activeIndex + 1} / {photos.length}
          </p>
        ) : null}
      </div>
    </div>
  );
}
