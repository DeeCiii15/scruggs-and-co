'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { HERO_SLIDES } from '@/lib/siteImages';

const INTERVAL_MS = 6500;
const FADE_MS = 700;

type HomeHeroSlideshowProps = {
  children: ReactNode;
};

export default function HomeHeroSlideshow({ children }: HomeHeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion || HERO_SLIDES.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <section className="relative min-h-svh w-full">
      <div className="absolute inset-0" aria-hidden>
        {HERO_SLIDES.map((slide, idx) => {
          const active = idx === index;
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 overflow-hidden ${active ? 'z-[1]' : 'z-0'}`}
              style={{
                opacity: active ? 1 : 0,
                transition: reduceMotion
                  ? undefined
                  : `opacity ${FADE_MS}ms ease-out`,
              }}
            >
              <Image
                src={slide.src}
                alt=""
                fill
                className={`object-cover ${active && !reduceMotion ? 'fl-image-settle' : ''}`}
                style={{ objectPosition: slide.objectPosition }}
                sizes="100vw"
                unoptimized
                priority={idx === 0}
                fetchPriority={active ? 'high' : 'low'}
              />
            </div>
          );
        })}
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-night/80 via-night/25 to-night/30"
        aria-hidden
      />
      <div className="relative z-[3]">{children}</div>
    </section>
  );
}
