'use client';

import { useCallback, useRef } from 'react';
import Image from 'next/image';
import { SITE_IMAGES } from '@/lib/siteImages';
import { smoothstep, useScrollOpen } from '../hooks/useScrollOpen';

/**
 * Contact intro — short inverse curtain (like Since 2019), then paper form below.
 */
export default function ContactIntroCurtain() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  const onOpen = useCallback((open: number) => {
    const t = smoothstep(Math.min(open / 0.75, 1));
    const gap = (1 - t) * 100;
    const copyOpacity = Math.min(Math.max((t - 0.28) / 0.4, 0), 1);

    if (leftRef.current) {
      leftRef.current.style.transform = `translate3d(-${gap}%, 0, 0)`;
    }
    if (rightRef.current) {
      rightRef.current.style.transform = `translate3d(${gap}%, 0, 0)`;
    }
    if (copyRef.current) {
      copyRef.current.style.opacity = String(copyOpacity);
      copyRef.current.style.transform = `translate3d(0, ${(1 - copyOpacity) * 18}px, 0)`;
    }
  }, []);

  useScrollOpen(sectionRef, onOpen, { trigger: 'visible' });

  return (
    <section
      ref={sectionRef}
      className="relative h-[calc(100svh+28vh)] w-full bg-paper"
      aria-label="Contact introduction"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-night">
        <div className="absolute inset-0" aria-hidden>
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
                className="object-cover"
                style={{ objectPosition: 'center 36%' }}
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
                className="object-cover"
                style={{ objectPosition: 'center 36%' }}
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-night/90 via-night/35 to-transparent" />

        <div
          ref={copyRef}
          className="relative z-[1] flex h-full flex-col justify-end px-6 pb-16 opacity-0 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24"
        >
          <div className="mx-auto w-full max-w-2xl lg:mx-0">
            <p className="font-script text-3xl text-clay md:text-4xl">say hello</p>
            <h1 className="mt-3 font-display text-3xl leading-snug text-fog sm:text-4xl md:text-[2.65rem]">
              Ready to connect?
            </h1>
            <p className="mt-5 max-w-lg font-sans text-sm font-light leading-[1.8] text-fog/80 md:text-base">
              Share your date, location, and the kind of day you are dreaming
              up—wedding, elopement, or lifestyle session. Liv reads every
              message.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
