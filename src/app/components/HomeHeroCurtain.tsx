'use client';

import {
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import Image from 'next/image';
import { CURTAIN_IMAGES, SITE_IMAGES } from '@/lib/siteImages';
import { SITE_NAME } from '@/lib/siteConfig';

type HomeHeroCurtainProps = {
  children: ReactNode;
};

/**
 * Scroll-driven curtain reveal.
 * Transforms are applied imperatively so they stay in sync with scroll
 * even if React batching lags; markup is identical on server + first paint.
 */
export default function HomeHeroCurtain({ children }: HomeHeroCurtainProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const monoRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const apply = (open: number) => {
      // Ease the parting so early scroll nudges the seam; full open at scrub end
      const t = Math.min(Math.max(open, 0), 1);
      const eased = t * t * (3 - 2 * t); // smoothstep
      // Panels are half-width, so 100% clears each side from the center line
      const slide = eased * 100;
      const copyOpacity = Math.min(Math.max((t - 0.28) / 0.4, 0), 1);
      const monoScale = 1 - eased * 0.08;
      const monoOpacity = 0.95 - eased * 0.2;

      if (leftRef.current) {
        leftRef.current.style.transform = `translate3d(-${slide}%, 0, 0)`;
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translate3d(${slide}%, 0, 0)`;
      }
      if (monoRef.current) {
        monoRef.current.style.opacity = String(monoOpacity);
        monoRef.current.style.transform = `translate3d(calc(-50% - 12px), 0, 0) scale(${monoScale})`;
      }
      if (copyRef.current) {
        copyRef.current.style.opacity = String(copyOpacity);
        copyRef.current.style.pointerEvents =
          copyOpacity > 0.35 ? 'auto' : 'none';
      }
      if (frontRef.current) {
        frontRef.current.style.pointerEvents = open > 0.5 ? 'none' : 'auto';
      }
      if (hintRef.current) {
        hintRef.current.style.opacity =
          open < 0.08 && !reduceMotionRef.current ? '1' : '0';
      }
    };

    if (reduceMotionRef.current) {
      apply(1);
      return;
    }

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      const open = Math.min(1, Math.max(0, -rect.top / scrollable));
      apply(open);
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        update();
        rafRef.current = null;
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('scroll', onScroll, true);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const openABit = () => {
    if (reduceMotionRef.current) return;
    window.scrollBy({ top: window.innerHeight * 0.2, behavior: 'smooth' });
  };

  const frontImageStyle = {
    objectPosition: CURTAIN_IMAGES.front.objectPosition,
    transform: `scale(${CURTAIN_IMAGES.front.scale}) translateX(${CURTAIN_IMAGES.front.shiftX})`,
  } as const;

  return (
    // Scrub just long enough for a paced open; paper track so unpinning
    // doesn't leave a black band before the intro.
    <section
      ref={sectionRef}
      className="relative h-[calc(100svh+55vh)] w-full bg-paper"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-night">
        <div className="absolute inset-0 z-0" aria-hidden>
          <Image
            src={CURTAIN_IMAGES.back.src}
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: CURTAIN_IMAGES.back.objectPosition }}
            sizes="100vw"
            unoptimized
            priority
          />
        </div>

        <div
          ref={frontRef}
          role="button"
          tabIndex={0}
          aria-label="Open curtains"
          className="absolute inset-0 z-[1] cursor-pointer"
          onClick={openABit}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              openABit();
            }
          }}
        >
          {/*
            True half-width panels that meet at the viewport center —
            same axis as the monogram — so the curtain opens from the logo.
          */}
          <div
            ref={leftRef}
            className="absolute inset-y-0 left-0 w-[calc(50%+1px)] overflow-hidden will-change-transform"
            aria-hidden
          >
            <div className="absolute inset-y-0 left-0 w-[200%]">
              <Image
                src={CURTAIN_IMAGES.front.src}
                alt=""
                fill
                className="origin-center object-cover"
                style={frontImageStyle}
                sizes="100vw"
                unoptimized
                priority
              />
            </div>
          </div>

          <div
            ref={rightRef}
            className="absolute inset-y-0 right-0 w-[calc(50%+1px)] overflow-hidden will-change-transform"
            aria-hidden
          >
            <div className="absolute inset-y-0 right-0 w-[200%]">
              <Image
                src={CURTAIN_IMAGES.front.src}
                alt=""
                fill
                className="origin-center object-cover"
                style={frontImageStyle}
                sizes="100vw"
                unoptimized
                priority
              />
            </div>
          </div>
        </div>

        {/* Monogram on the curtain seam; slight left optical nudge (asset weight sits right) */}
        <div
          ref={monoRef}
          className="pointer-events-none absolute top-[16vh] z-[2] w-[clamp(6rem,16vw,9.5rem)] drop-shadow-[0_10px_30px_rgb(0_0_0_/_0.45)] sm:top-[18vh]"
          style={{
            left: '50%',
            transform: 'translate3d(calc(-50% - 12px), 0, 0)',
          }}
        >
          <Image
            src={SITE_IMAGES.logoMonogram}
            alt={SITE_NAME}
            width={280}
            height={360}
            className="h-auto w-full fl-logo-monogram-on-photo"
            unoptimized
            priority
          />
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[22%] bg-gradient-to-t from-night/55 via-night/15 to-transparent"
          aria-hidden
        />

        <div
          ref={copyRef}
          className="pointer-events-none relative z-[4] flex h-full flex-col justify-end opacity-0"
        >
          {children}
        </div>

        <p
          ref={hintRef}
          className="pointer-events-none absolute bottom-6 left-1/2 z-[5] -translate-x-1/2 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-fog/50 transition-opacity duration-300"
        >
          Scroll or click
        </p>
      </div>
    </section>
  );
}
