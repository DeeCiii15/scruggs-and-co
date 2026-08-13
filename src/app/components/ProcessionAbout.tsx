'use client';

import { useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_IMAGES } from '@/lib/siteImages';
import { BRAND_IMAGE_ALT } from '@/lib/siteConfig';
import { smoothstep, useScrollOpen } from '../hooks/useScrollOpen';

function AboutCopy() {
  return (
    <>
      <p className="font-script text-4xl text-moss md:text-5xl">hello,</p>
      <h2 className="mt-2 font-display text-4xl leading-none text-ink sm:text-5xl md:text-6xl">
        I&apos;m Liv
      </h2>
      <p className="mt-3 font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink-soft">
        Wedding & lifestyle photographer
      </p>
      <div className="mt-7 max-w-md space-y-4 font-sans text-[0.92rem] font-light leading-[1.8] text-ink-soft sm:text-[0.95rem]">
        <p>
          First off—hey! I am so happy you are here! I cannot wait to meet you
          and bring your story to life. There&apos;s absolutely nothing I love
          more than capturing life&apos;s golden, happy, wild moments while also
          paying attention to all the wonderful small details that make your
          moments unique.
        </p>
        <p>
          I am a lover of all things romantic, sweet, and laugh-inducing, so I
          will gladly be your &ldquo;third-wheel&rdquo; to capture all these
          things that make my heart gushy.
        </p>
        <p>
          I am currently based in the gorgeous state of South Carolina, but
          I&apos;m so down to travel anywhere! What I love most about photography
          is the fact that I am the one who can capture those ultra-real moments
          that we get to experience with this amazing life we live!
        </p>
        <p>
          Whatever your heart desires, I am here for it! I want to bring out the
          perfect imperfectness of you! Your uniqueness and imperfectness are
          what make you YOU! I love formal shoots but will also be here to joke,
          laugh, and dance with you!
        </p>
        <p>
          If these sound like qualities you are looking for for your next
          photographer, then let&apos;s capture those forever moments.
        </p>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <Link href="/contact" className="fl-btn">
          Let&apos;s connect
        </Link>
        <Link href="/services/weddings" className="fl-link text-moss">
          Wedding collections
          <span aria-hidden>→</span>
        </Link>
      </div>
    </>
  );
}

/**
 * Meet Liv — mobile: portrait + copy slide in from the left.
 * Desktop: sticky split, portrait slides in from the right.
 */
export default function ProcessionAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  const onOpen = useCallback((open: number) => {
    const desktop =
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 1024px)').matches;
    const t = smoothstep(Math.min(open / (desktop ? 0.55 : 0.28), 1));
    const fromRight = (1 - t) * 100;
    const copyOpacity = Math.min(Math.max((t - 0.15) / 0.45, 0), 1);

    if (!desktop) {
      if (mobileRef.current) {
        mobileRef.current.style.transform = `translate3d(-${fromRight}%, 0, 0)`;
      }
      return;
    }

    if (photoRef.current) {
      photoRef.current.style.transform = `translate3d(${fromRight}%, 0, 0)`;
    }
    if (copyRef.current) {
      copyRef.current.style.opacity = String(0.35 + copyOpacity * 0.65);
    }
  }, []);

  useScrollOpen(sectionRef, onOpen, { trigger: 'visible' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full scroll-mt-24 overflow-x-clip bg-paper lg:h-[calc(100svh+32vh)]"
    >
      {/* Mobile / tablet — photo + copy slide in from the left */}
      <div
        ref={mobileRef}
        className="bg-paper will-change-transform lg:hidden"
        style={{ transform: 'translate3d(-100%, 0, 0)' }}
      >
        <Image
          src={SITE_IMAGES.photographer}
          alt={BRAND_IMAGE_ALT}
          width={1600}
          height={2000}
          className="h-[70svh] w-full object-cover object-[center_38%]"
          sizes="100vw"
          quality={95}
          priority
        />
        <div className="px-6 py-10 sm:px-12 sm:py-14">
          <AboutCopy />
        </div>
      </div>

      {/* Desktop — sticky split, portrait slides in from the right */}
      <div className="sticky top-0 hidden h-svh w-full overflow-hidden bg-paper lg:grid lg:grid-cols-2">
        <div
          ref={photoRef}
          className="relative h-full will-change-transform"
          style={{ transform: 'translate3d(100%, 0, 0)' }}
        >
          <Image
            src={SITE_IMAGES.photographer}
            alt={BRAND_IMAGE_ALT}
            fill
            className="object-cover object-[center_28%]"
            sizes="50vw"
            quality={95}
          />
        </div>

        <div
          ref={copyRef}
          className="flex min-h-0 flex-col justify-center overflow-y-auto bg-paper px-14 py-14 opacity-35 xl:px-16"
        >
          <AboutCopy />
        </div>
      </div>
    </section>
  );
}
