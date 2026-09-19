'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { HERO_SLIDES, SITE_IMAGES } from '@/lib/siteImages';
import { SITE_NAME } from '@/lib/siteConfig';
import HeroBridgeType from './HeroBridgeType';
import './home-hero-slideshow.css';

const INTERVAL_MS = 5000;
const FADE_MS = 900;
const PRELOAD_NEXT_MS = 2000;

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
        /* Covering a tall phone means the bitmap is sized by height, not width. */
        sizes="(max-width: 1023px) 160vh, 100vw"
        quality={95}
        priority={priority}
      />
    </div>
  );
}

/**
 * Full-viewport hero — gallery stills crossfade every few seconds.
 * Only the active slide, the outgoing slide (during the fade), and the
 * upcoming slide (after first paint) are in the DOM.
 */
export default function HomeHeroSlideshow({ children }: HomeHeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [preloadNext, setPreloadNext] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const indexRef = useRef(0);
  indexRef.current = index;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion || HERO_SLIDES.length < 2) return;
    const idle = window.setTimeout(() => setPreloadNext(true), PRELOAD_NEXT_MS);
    return () => window.clearTimeout(idle);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || HERO_SLIDES.length < 2) return;
    const id = window.setInterval(() => {
      const current = indexRef.current;
      setOutgoing(current);
      setIndex((current + 1) % HERO_SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (outgoing === null) return;
    const id = window.setTimeout(() => setOutgoing(null), FADE_MS);
    return () => window.clearTimeout(id);
  }, [outgoing]);

  const next = (index + 1) % HERO_SLIDES.length;
  const mounted = new Set<number>([index]);
  if (outgoing !== null) mounted.add(outgoing);
  if (preloadNext && HERO_SLIDES.length > 1) mounted.add(next);

  return (
    <>
      <section className="relative h-svh w-full bg-night">
        <div className="fl-hero-stage relative h-svh w-full overflow-hidden bg-night">
          <div className="absolute inset-0 z-0" aria-hidden>
            {[...mounted].map((idx) => {
              const slide = HERO_SLIDES[idx];
              if (!slide) return null;
              return (
                <SlideFrame
                  key={slide.src}
                  slide={slide}
                  active={idx === index}
                  priority={idx === 0 && index === 0}
                  reduceMotion={reduceMotion}
                />
              );
            })}
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
