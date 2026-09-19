'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { HERO_SLIDES, SITE_IMAGES } from '@/lib/siteImages';
import { SITE_NAME } from '@/lib/siteConfig';
import HeroBridgeType from './HeroBridgeType';
import './home-hero-slideshow.css';

const INTERVAL_MS = 5000;
const FADE_MS = 900;

type HomeHeroSlideshowProps = {
  children: ReactNode;
};

type HeroSlide = (typeof HERO_SLIDES)[number];

function SlideFrame({
  slide,
  active,
  priority,
  reduceMotion,
}: {
  slide: HeroSlide;
  active: boolean;
  priority?: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${
        active ? 'z-[1]' : 'z-0'
      }`}
      style={{
        opacity: active ? 1 : 0,
        transition: reduceMotion ? undefined : `opacity ${FADE_MS}ms ease-out`,
      }}
    >
      <Image
        src={slide.src}
        alt=""
        fill
        className="fl-hero-slide"
        style={{
          objectFit: 'cover',
          objectPosition: slide.objectPosition,
        }}
        sizes="(max-width: 1023px) 160vh, 100vw"
        quality={95}
        priority={priority}
      />
    </div>
  );
}

function subscribeReducedMotion(onChange: (value: boolean) => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  onChange(mq.matches);
  const handler = () => onChange(mq.matches);
  if (typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }
  mq.addListener(handler);
  return () => mq.removeListener(handler);
}

/**
 * Full-viewport hero — gallery stills crossfade every few seconds.
 * All slides stay mounted so the next frame is already decoded.
 */
export default function HomeHeroSlideshow({ children }: HomeHeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => subscribeReducedMotion(setReduceMotion), []);

  useEffect(() => {
    if (HERO_SLIDES.length < 2) return;

    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      raf = window.requestAnimationFrame(tick);
      if (typeof document !== 'undefined' && document.hidden) {
        last = now;
        return;
      }
      if (now - last < INTERVAL_MS) return;
      last = now;
      setIndex((current) => (current + 1) % HERO_SLIDES.length);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <section className="relative h-svh w-full bg-night">
        <div className="fl-hero-stage relative h-svh w-full overflow-hidden bg-night">
          <div className="absolute inset-0 z-0" aria-hidden>
            {HERO_SLIDES.map((slide, idx) => (
              <SlideFrame
                key={slide.src}
                slide={slide}
                active={idx === index}
                priority={idx < 2}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>

          <div
            className="fl-brand-mark pointer-events-none absolute inset-x-0 top-[16vh] z-[2] flex justify-center overflow-visible sm:top-[18vh]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SITE_IMAGES.logoHero}
              alt={SITE_NAME}
              width={1024}
              height={892}
              decoding="async"
              fetchPriority="high"
              className="h-auto w-[clamp(7rem,22vw,9.5rem)] overflow-visible object-contain sm:drop-shadow-[0_10px_30px_rgb(0_0_0_/_0.45)]"
            />
          </div>

          <div className="fl-photo-wash z-[1]" aria-hidden />

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[28%] bg-gradient-to-t from-night/70 via-night/20 to-transparent"
            aria-hidden
          />

          <div className="absolute inset-0 z-[4] flex flex-col justify-end">
            {children}
          </div>
        </div>
      </section>
      <div className="relative z-[1] flex h-[22vh] items-center justify-center bg-paper px-6 sm:px-10">
        <HeroBridgeType />
      </div>
    </>
  );
}
