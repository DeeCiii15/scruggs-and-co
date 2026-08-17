'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { PortfolioShootCard } from '@/lib/portfolioData';

const CYCLE_MS = 3800;

type ServiceGalleryRailProps = {
  shoots: PortfolioShootCard[];
  portfolioHref: string;
  serviceName: string;
};

/**
 * Type rail of shoot names that swaps a single still (home session-rail language).
 */
export default function ServiceGalleryRail({
  shoots,
  portfolioHref,
  serviceName,
}: ServiceGalleryRailProps) {
  const [cycleIndex, setCycleIndex] = useState(0);
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  useEffect(() => {
    if (hoveredName || shoots.length < 2) return;
    const id = window.setInterval(() => {
      setCycleIndex((i) => (i + 1) % shoots.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [hoveredName, shoots.length]);

  if (shoots.length === 0) {
    return (
      <p className="font-sans text-sm font-light text-ink-soft">
        Galleries for {serviceName.toLowerCase()} are on the way.
      </p>
    );
  }

  const hovered = shoots.find((s) => s.label === hoveredName);
  const active = hovered ?? shoots[cycleIndex]!;

  return (
    <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
      <Link
        href={active.href}
        className="group relative block overflow-hidden bg-paper-deep shadow-[0_24px_60px_rgb(20_22_18_/_0.12)] lg:col-span-5"
        aria-label={active.title}
      >
        <div className="relative aspect-[4/5]">
          {shoots.map((shoot) => (
            <Image
              key={shoot.slug}
              src={shoot.image}
              alt={shoot.title}
              fill
              className={`object-cover transition-[opacity,transform] duration-700 group-hover:scale-[1.03] ${
                active.slug === shoot.slug ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 1024px) 90vw, 40vw"
            />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/70 to-transparent p-5 sm:p-6">
          <p className="font-display text-2xl text-fog sm:text-3xl">
            {active.label}
          </p>
        </div>
      </Link>

      <div className="lg:col-span-7">
        <nav
          aria-label={`${serviceName} galleries`}
          className="flex flex-wrap items-baseline gap-x-3 gap-y-3 sm:gap-x-4"
          onMouseLeave={() => setHoveredName(null)}
        >
          {shoots.map((shoot, i) => (
            <span key={shoot.slug} className="contents">
              {i > 0 && (
                <span
                  aria-hidden
                  className="select-none font-display text-lg text-ink/25 sm:text-2xl"
                >
                  ·
                </span>
              )}
              <Link
                href={shoot.href}
                onMouseEnter={() => {
                  setHoveredName(shoot.label);
                  const idx = shoots.findIndex((s) => s.slug === shoot.slug);
                  if (idx >= 0) setCycleIndex(idx);
                }}
                onFocus={() => {
                  setHoveredName(shoot.label);
                  const idx = shoots.findIndex((s) => s.slug === shoot.slug);
                  if (idx >= 0) setCycleIndex(idx);
                }}
                onBlur={() => setHoveredName(null)}
                className={`font-display text-xl transition-colors duration-300 sm:text-3xl md:text-4xl ${
                  active.slug === shoot.slug
                    ? 'text-moss'
                    : hoveredName
                      ? 'text-ink/35'
                      : 'text-ink hover:text-moss'
                }`}
              >
                {shoot.label}
              </Link>
            </span>
          ))}
        </nav>
        <Link href={portfolioHref} className="fl-link mt-10 text-moss">
          Browse all
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
