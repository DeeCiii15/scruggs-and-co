'use client';

import { useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PORTFOLIO_HOME_CARDS } from '@/lib/portfolioData';
import { smoothstep, useScrollOpen } from '../hooks/useScrollOpen';

function GalleryChapter({
  name,
  image,
  tagline,
  href,
  eyebrow,
  showLeadIn,
}: {
  name: string;
  image: string;
  tagline: string;
  href: string;
  eyebrow?: string;
  showLeadIn?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  const onOpen = useCallback((open: number) => {
    const t = smoothstep(Math.min(open / 0.3, 1));
    if (copyRef.current) {
      copyRef.current.style.opacity = String(0.6 + t * 0.4);
      copyRef.current.style.transform = `translate3d(0, ${(1 - t) * 14}px, 0)`;
    }
  }, []);

  useScrollOpen(sectionRef, onOpen);

  return (
    <section
      ref={sectionRef}
      className="relative h-[calc(100svh+14vh)] w-full bg-night"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-night">
        <div className="absolute inset-0">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-night/40" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-night/90 via-night/35 to-transparent" />

        <div
          ref={copyRef}
          className="relative z-[1] flex h-full flex-col justify-end px-6 pb-16 sm:px-10 sm:pb-20 lg:px-16"
          style={{ opacity: 0.6 }}
        >
          <div className="mx-auto w-full max-w-6xl">
            {showLeadIn ? (
              <div className="mb-8 max-w-xl">
                <p className="font-script text-3xl text-clay">the work</p>
                <p className="mt-1 font-display text-2xl text-fog/90 sm:text-3xl">
                  Galleries worth lingering in
                </p>
              </div>
            ) : null}
            {eyebrow ? (
              <p className="font-script text-3xl text-clay md:text-4xl">{eyebrow}</p>
            ) : null}
            <h3 className="mt-2 font-display text-4xl text-fog md:text-5xl lg:text-6xl">
              {name}
            </h3>
            <p className="mt-3 max-w-md text-[0.72rem] font-medium uppercase tracking-[0.18em] text-fog/85">
              {tagline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href={href}
                className="fl-btn fl-btn-solid-light pointer-events-auto inline-flex"
              >
                Enter gallery
                <span aria-hidden>→</span>
              </Link>
              {showLeadIn ? (
                <Link
                  href="/portfolio"
                  className="fl-link fl-link-on-dark pointer-events-auto"
                >
                  Browse all
                  <span aria-hidden>→</span>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Continuum beat — full-bleed category reveals, short scrub, early type.
 */
export default function ContinuumGalleries() {
  const weddings = PORTFOLIO_HOME_CARDS.find((c) => c.name === 'Weddings');
  const portraits = PORTFOLIO_HOME_CARDS.find((c) => c.name === 'Portraits');

  if (!weddings || !portraits) return null;

  return (
    <div id="portfolio" className="scroll-mt-24 bg-night">
      <GalleryChapter
        name={weddings.name}
        image={weddings.image}
        tagline={weddings.tagline}
        href={weddings.href}
        eyebrow="featured"
        showLeadIn
      />
      <GalleryChapter
        name={portraits.name}
        image={portraits.image}
        tagline={portraits.tagline}
        href={portraits.href}
      />
    </div>
  );
}
