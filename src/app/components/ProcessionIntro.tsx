'use client';

import { useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_IMAGES } from '@/lib/siteImages';
import { smoothstep, useScrollOpen } from '../hooks/useScrollOpen';

/**
 * Since 2019 — desktop: halves meet between their heads.
 * Mobile: her eye only, sliding in from the right.
 */
export default function ProcessionIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  const onOpen = useCallback((open: number) => {
    const t = smoothstep(Math.min(open / 0.75, 1));
    const gap = (1 - t) * 100;
    const copyOpacity = Math.min(Math.max((t - 0.35) / 0.4, 0), 1);
    const narrow =
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 639px)').matches;

    if (narrow) {
      if (mobileRef.current) {
        mobileRef.current.style.transform = `translate3d(${gap}%, 0, 0)`;
      }
    } else {
      if (leftRef.current) {
        leftRef.current.style.transform = `translate3d(-${gap}%, 0, 0)`;
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translate3d(${gap}%, 0, 0)`;
      }
    }
    if (copyRef.current) {
      copyRef.current.style.opacity = String(copyOpacity);
      copyRef.current.style.transform = `translate3d(0, ${(1 - copyOpacity) * 20}px, 0)`;
    }
  }, []);

  useScrollOpen(sectionRef, onOpen, { trigger: 'visible' });

  const imageStyle = {
    objectPosition: 'center 38%',
  } as const;

  return (
    <section
      ref={sectionRef}
      className="relative h-[calc(100svh+24vh)] w-full bg-paper"
      aria-label="Introduction"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-night">
        {/* Mobile — her half, full-bleed from the right (no leftover black) */}
        <div
          ref={mobileRef}
          className="absolute inset-0 overflow-hidden will-change-transform sm:hidden"
          style={{ transform: 'translate3d(100%, 0, 0)' }}
          aria-hidden
        >
          <div className="absolute inset-y-0 -left-[12%] right-0">
            <Image
              src={SITE_IMAGES.moodArch}
              alt=""
              fill
              className="object-cover fl-photo-earth"
              style={{ objectPosition: '72% 42%' }}
              sizes="120vw"
              priority
            />
          </div>
        </div>

        {/* Desktop / tablet — two halves meet */}
        <div className="absolute inset-0 hidden sm:block" aria-hidden>
          <div
            ref={leftRef}
            className="absolute inset-y-0 left-0 w-[calc(50%+1px)] overflow-hidden will-change-transform"
            style={{ transform: 'translate3d(-100%, 0, 0)' }}
          >
            <div className="absolute inset-y-0 left-0 w-[200%]">
              <Image
                src={SITE_IMAGES.moodArch}
                alt=""
                fill
                className="object-cover fl-photo-earth"
                style={imageStyle}
                sizes="100vw"
                priority
              />
            </div>
          </div>

          <div
            ref={rightRef}
            className="absolute inset-y-0 right-0 w-[calc(50%+1px)] overflow-hidden will-change-transform"
            style={{ transform: 'translate3d(100%, 0, 0)' }}
          >
            <div className="absolute inset-y-0 right-0 w-[200%]">
              <Image
                src={SITE_IMAGES.moodArch}
                alt=""
                fill
                className="object-cover fl-photo-earth"
                style={imageStyle}
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>

        <div className="fl-photo-wash z-[1]" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[50%] bg-gradient-to-t from-night/85 via-night/25 to-transparent" />

        <div
          ref={copyRef}
          className="absolute inset-0 z-[2] flex flex-col justify-end px-6 pb-16 opacity-0 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24"
        >
          <div className="mx-auto w-full max-w-2xl lg:mx-0">
            <p className="font-script text-3xl text-clay md:text-4xl">since 2019</p>
            <h2 className="mt-3 font-display text-3xl leading-snug text-fog sm:text-4xl md:text-[2.5rem]">
              Authentic, heartfelt documentary wedding and lifestyle{' '}
              <span className="font-script text-[1.35em] font-normal normal-case tracking-normal text-clay">
                photography
              </span>
              .
            </h2>
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
