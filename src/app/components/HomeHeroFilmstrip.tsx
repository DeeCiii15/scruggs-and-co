'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FILMSTRIP_FRAMES, SITE_IMAGES } from '@/lib/siteImages';
import { SITE_NAME } from '@/lib/siteConfig';

type HomeHeroFilmstripProps = {
  children: ReactNode;
};

export default function HomeHeroFilmstrip({ children }: HomeHeroFilmstripProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const updateProgress = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const scrollable = Math.max(rect.height - window.innerHeight, 1);
    const next = Math.min(1, Math.max(0, -rect.top / scrollable));
    setProgress(next);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setProgress(0);
      return;
    }

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        updateProgress();
        rafRef.current = null;
      });
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion, updateProgress]);

  // Track slides left as progress goes 0 → 1
  const trackShift = reduceMotion ? 0 : progress * -62;

  return (
    <section
      ref={sectionRef}
      className={`filmstrip-section relative w-full ${reduceMotion ? 'filmstrip-section--static' : ''}`}
    >
      <div className="filmstrip-sticky sticky top-0 h-svh w-full overflow-hidden">
        <div className="filmstrip-stage absolute inset-0" aria-hidden>
          <div
            ref={trackRef}
            className="filmstrip-track"
            style={{
              transform: `translate3d(${trackShift}%, -50%, 0)`,
            }}
          >
            {FILMSTRIP_FRAMES.map((frame, index) => {
              const href = 'href' in frame ? frame.href : undefined;
              const frameBody = (
                <div className="filmstrip-frame__media">
                  <Image
                    src={frame.src}
                    alt=""
                    fill
                    className="object-cover"
                    style={{ objectPosition: frame.objectPosition }}
                    sizes="(max-width: 768px) 55vw, 28vw"
                    unoptimized
                    priority={index < 3}
                  />
                </div>
              );

              if (href) {
                return (
                  <Link
                    key={`${frame.src}-${index}`}
                    href={href}
                    className="filmstrip-frame"
                    aria-label="View portfolio"
                  >
                    {frameBody}
                  </Link>
                );
              }

              return (
                <div
                  key={`${frame.src}-${index}`}
                  className="filmstrip-frame"
                  aria-hidden
                >
                  {frameBody}
                </div>
              );
            })}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center">
          <div className="filmstrip-monogram">
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
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[42%] bg-gradient-to-t from-night via-night/55 to-transparent"
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[3] w-[12%] bg-gradient-to-r from-night/70 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[3] w-[12%] bg-gradient-to-l from-night/70 to-transparent"
          aria-hidden
        />

        <div className="relative z-[4] flex h-full flex-col justify-end">
          {children}
        </div>

        {!reduceMotion && (
          <p className="pointer-events-none absolute bottom-6 left-1/2 z-[5] -translate-x-1/2 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-fog/45">
            Scroll
          </p>
        )}
      </div>
    </section>
  );
}
