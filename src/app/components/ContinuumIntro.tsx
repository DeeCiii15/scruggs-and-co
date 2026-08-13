'use client';

import { useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_IMAGES } from '@/lib/siteImages';
import { smoothstep, useScrollOpen } from '../hooks/useScrollOpen';

/**
 * Continuum beat — full-bleed frame with early, readable copy.
 * Short scrub so it doesn’t leave blank track between sections.
 */
export default function ContinuumIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  const onOpen = useCallback((open: number) => {
    const t = smoothstep(Math.min(open / 0.35, 1));
    if (copyRef.current) {
      copyRef.current.style.opacity = String(0.55 + t * 0.45);
      copyRef.current.style.transform = `translate3d(0, ${(1 - t) * 16}px, 0)`;
    }
  }, []);

  useScrollOpen(sectionRef, onOpen);

  return (
    <section
      ref={sectionRef}
      className="relative h-[calc(100svh+16vh)] w-full bg-night"
      aria-label="Introduction"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-night">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={SITE_IMAGES.moodArch}
            alt=""
            fill
            className="object-cover object-[center_40%]"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-night/45" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-night/90 via-night/40 to-transparent" />

        <div
          ref={copyRef}
          className="relative z-[1] flex h-full flex-col justify-end px-6 pb-16 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24"
          style={{ opacity: 0.55 }}
        >
          <div className="mx-auto w-full max-w-3xl">
            <p className="font-script text-3xl text-clay md:text-4xl">since 2019</p>
            <h2 className="mt-3 font-display text-3xl leading-[1.12] text-fog sm:text-4xl md:text-[2.75rem]">
              Intimate, sweet, and a little wild.
            </h2>
            <p className="mt-5 max-w-lg font-sans text-[1rem] font-light leading-[1.8] text-fog/90">
              Documentary wedding and lifestyle photography for the cuddly,
              effortless, and perfectly imperfect. Liv stays present for the
              golden moments—and the quiet ones in between.
            </p>
            <Link
              href="/#about"
              className="fl-link fl-link-on-dark pointer-events-auto mt-8 inline-flex"
            >
              Meet Liv
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
