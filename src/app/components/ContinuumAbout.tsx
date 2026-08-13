'use client';

import { useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_IMAGES } from '@/lib/siteImages';
import { BRAND_IMAGE_ALT } from '@/lib/siteConfig';
import { smoothstep, useScrollOpen } from '../hooks/useScrollOpen';

/**
 * Continuum beat — portrait + copy panel that settles quickly (no long blank scrub).
 */
export default function ContinuumAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const onOpen = useCallback((open: number) => {
    // Finish the part-in early so copy is readable right away
    const t = smoothstep(Math.min(open / 0.4, 1));
    const photoShift = t * 12;
    const panelX = (1 - t) * 55;

    if (photoRef.current) {
      photoRef.current.style.transform = `translate3d(-${photoShift}%, 0, 0)`;
    }
    if (panelRef.current) {
      panelRef.current.style.transform = `translate3d(${panelX}%, 0, 0)`;
      panelRef.current.style.opacity = String(0.65 + t * 0.35);
    }
  }, []);

  useScrollOpen(sectionRef, onOpen);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative h-[calc(100svh+20vh)] w-full scroll-mt-24 bg-night"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-night">
        <div
          ref={photoRef}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={SITE_IMAGES.photographer}
            alt={BRAND_IMAGE_ALT}
            fill
            className="object-cover object-[center_18%]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-night/50" />
        </div>

        <div
          ref={panelRef}
          className="absolute inset-y-0 right-0 z-[1] flex w-full max-w-xl flex-col justify-center bg-paper px-6 py-12 shadow-[-24px_0_48px_rgb(0_0_0_/_0.25)] will-change-transform sm:px-10 lg:max-w-[44%] lg:px-14"
          style={{ transform: 'translate3d(55%, 0, 0)', opacity: 0.65 }}
        >
          <p className="font-script text-4xl text-moss md:text-5xl">hello,</p>
          <h2 className="mt-2 font-display text-4xl leading-none text-ink sm:text-5xl md:text-6xl">
            I&apos;m Liv
          </h2>
          <p className="mt-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink-soft">
            Wedding & lifestyle photographer
          </p>
          <div className="mt-7 max-w-md space-y-4 font-sans text-[0.95rem] font-light leading-[1.85] text-ink-soft">
            <p>
              First off—hey. I am so happy you are here. There is nothing I love
              more than capturing life&apos;s golden, happy, wild moments while
              paying attention to the small details that make them uniquely
              yours.
            </p>
            <p>
              I am a lover of all things romantic, sweet, and laugh-inducing.
              Based in gorgeous South Carolina and glad to travel anywhere—I
              will gladly be your third wheel for the forever moments.
            </p>
          </div>
          <p className="mt-8 max-w-md border-t border-ink/10 pt-5 font-display text-lg italic leading-snug text-ink-soft md:text-xl">
            Photography started as a college student looking to connect—and
            became a love for art that evolves with every couple who trusts me
            with their day.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link href="/contact" className="fl-btn">
              Let&apos;s connect
            </Link>
            <Link href="/services/weddings" className="fl-link text-moss">
              Wedding collections
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
