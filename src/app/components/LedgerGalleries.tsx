'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PORTFOLIO_HOME_CARDS } from '@/lib/portfolioData';
import { serviceHref } from '@/lib/servicesData';

const SESSION_LINKS = [
  {
    name: 'Couples',
    tagline: 'Easy love, soft light',
    image: '/images/engagement_1.jpg',
    href: serviceHref('sessions'),
  },
  {
    name: 'Family',
    tagline: 'The everyday forever moments',
    image: '/images/inspiration_3.jpg',
    href: serviceHref('sessions'),
  },
  {
    name: 'Maternity',
    tagline: 'Quiet anticipation',
    image: '/images/inspiration_1.jpg',
    href: serviceHref('sessions'),
  },
  {
    name: 'Seniors / Graduation',
    tagline: 'This chapter, documented',
    image: '/images/hero_5.jpg',
    href: serviceHref('sessions'),
  },
] as const;

const CYCLE_MS = 3800;

/**
 * Label rail — Weddings fixed; bottom-right cycles sessions + portraits,
 * and snaps instantly when a rail label is hovered.
 */
export default function LedgerGalleries() {
  const weddings = PORTFOLIO_HOME_CARDS.find((c) => c.name === 'Weddings');
  const portraits = PORTFOLIO_HOME_CARDS.find((c) => c.name === 'Portraits');

  const cycleSlides = portraits
    ? [
        ...SESSION_LINKS,
        {
          name: portraits.name,
          tagline: portraits.tagline,
          image: portraits.image,
          href: portraits.href,
        },
      ]
    : [...SESSION_LINKS];

  const [cycleIndex, setCycleIndex] = useState(0);
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  useEffect(() => {
    if (hoveredName || cycleSlides.length < 2) return;
    const id = window.setInterval(() => {
      setCycleIndex((i) => (i + 1) % cycleSlides.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [hoveredName, cycleSlides.length]);

  if (!weddings || !portraits) return null;

  const hoveredSlide = cycleSlides.find((s) => s.name === hoveredName);
  const activeSlide = hoveredSlide ?? cycleSlides[cycleIndex]!;
  const activeRailName =
    hoveredName ??
    (SESSION_LINKS.some((s) => s.name === activeSlide.name)
      ? activeSlide.name
      : null);

  return (
    <section
      id="portfolio"
      className="scroll-mt-24 bg-paper px-5 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-5 sm:mb-20 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="font-script text-3xl text-moss md:text-4xl">the work</p>
            <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl md:text-5xl">
              Galleries worth lingering in
            </h2>
          </div>
          <Link href="/portfolio" className="fl-link shrink-0 text-moss">
            Browse all
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="relative mx-auto max-w-5xl pb-4 lg:pb-8">
          {/* Weddings — always the market focal */}
          <Link
            href={weddings.href}
            className="group relative z-[1] block w-[70%] overflow-hidden bg-paper-deep shadow-[0_24px_60px_rgb(20_22_18_/_0.12)] sm:w-full"
          >
            <div className="relative aspect-[4/5] sm:aspect-[5/6]">
              <Image
                src={weddings.image}
                alt={weddings.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/70 to-transparent p-6 sm:p-8">
              <p className="font-script text-2xl text-clay">featured</p>
              <h3 className="mt-1 font-display text-3xl text-fog sm:text-4xl">
                {weddings.name}
              </h3>
              <p className="mt-2 font-sans text-[0.65rem] font-medium uppercase tracking-[0.16em] text-fog/80">
                {weddings.tagline}
              </p>
            </div>
          </Link>

          {/* Cycling secondary — sessions + portraits */}
          <Link
            href={activeSlide.href}
            className="group relative z-[2] -mt-16 ml-auto block w-[72%] max-w-[19rem] overflow-hidden bg-paper-deep shadow-[0_24px_60px_rgb(20_22_18_/_0.14)] sm:-mt-28 sm:mr-0 sm:w-[78%] sm:max-w-md lg:-mt-36 lg:w-[42%] lg:max-w-none"
            aria-label={activeSlide.name}
          >
            <div className="relative aspect-[4/5]">
              {cycleSlides.map((slide) => (
                <Image
                  key={slide.name}
                  src={slide.image}
                  alt={slide.name}
                  fill
                  className={`object-cover transition-[opacity,transform] duration-700 group-hover:scale-[1.03] ${
                    activeSlide.name === slide.name
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                  sizes="(max-width: 1024px) 80vw, 32vw"
                  priority={slide.name === portraits.name}
                />
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/65 to-transparent p-5 sm:p-6">
              <h3 className="font-display text-2xl text-fog transition-opacity duration-500 sm:text-3xl">
                {activeSlide.name}
              </h3>
              <p className="mt-2 font-sans text-[0.65rem] font-medium uppercase tracking-[0.16em] text-fog/80">
                {activeSlide.tagline}
              </p>
            </div>
          </Link>
        </div>

        {/* Type-led session rail — drives the secondary card on hover */}
        <div className="relative mx-auto mt-10 max-w-5xl sm:mt-12">
          <p className="mb-5 font-sans text-[0.6rem] font-medium uppercase tracking-[0.2em] text-ink-soft">
            Sessions
          </p>

          <nav
            aria-label="Session galleries"
            className="flex flex-wrap items-baseline gap-x-3 gap-y-3 sm:gap-x-4"
            onMouseLeave={() => setHoveredName(null)}
          >
            {SESSION_LINKS.map((link, i) => (
              <span key={link.name} className="contents">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="select-none font-display text-xl text-ink/25 sm:text-2xl"
                  >
                    ·
                  </span>
                )}
                <Link
                  href={link.href}
                  onMouseEnter={() => {
                    setHoveredName(link.name);
                    const idx = cycleSlides.findIndex((s) => s.name === link.name);
                    if (idx >= 0) setCycleIndex(idx);
                  }}
                  onTouchStart={() => {
                    setHoveredName(link.name);
                    const idx = cycleSlides.findIndex((s) => s.name === link.name);
                    if (idx >= 0) setCycleIndex(idx);
                  }}
                  onFocus={() => {
                    setHoveredName(link.name);
                    const idx = cycleSlides.findIndex((s) => s.name === link.name);
                    if (idx >= 0) setCycleIndex(idx);
                  }}
                  onBlur={() => setHoveredName(null)}
                  className={`font-display text-2xl transition-colors duration-300 sm:text-3xl md:text-4xl ${
                    activeRailName === link.name
                      ? 'text-moss'
                      : hoveredName
                        ? 'text-ink/35'
                        : 'text-ink hover:text-moss'
                  }`}
                >
                  {link.name}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
