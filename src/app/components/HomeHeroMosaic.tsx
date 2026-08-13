'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MOSAIC_FRAMES, SITE_IMAGES } from '@/lib/siteImages';
import { SITE_NAME } from '@/lib/siteConfig';

type HomeHeroMosaicProps = {
  children: ReactNode;
};

export default function HomeHeroMosaic({ children }: HomeHeroMosaicProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="mosaic-stage relative min-h-svh w-full overflow-hidden">
      <div
        className={`mosaic-grid absolute inset-0 z-[1] ${hovered ? 'is-active' : ''}`}
      >
        {MOSAIC_FRAMES.map((frame) => {
          const isHovered = hovered === frame.area;
          const href = 'href' in frame ? frame.href : undefined;
          const className = `mosaic-tile ${isHovered ? 'is-hovered' : ''}`;
          const style = { gridArea: frame.area };
          const handlers = {
            onMouseEnter: () => setHovered(frame.area),
            onMouseLeave: () => setHovered(null),
            onFocus: () => setHovered(frame.area),
            onBlur: () => setHovered(null),
          };

          const media = (
            <div className="mosaic-tile__media">
              <Image
                src={frame.src}
                alt=""
                fill
                className="object-cover"
                style={{ objectPosition: frame.objectPosition }}
                sizes="(max-width: 768px) 50vw, 33vw"
                unoptimized
                priority={
                  frame.area === 'a' || frame.area === 'c' || frame.area === 'e'
                }
              />
            </div>
          );

          if (href) {
            return (
              <Link
                key={frame.area}
                href={href}
                className={className}
                style={style}
                aria-label="View portfolio"
                {...handlers}
              >
                {media}
              </Link>
            );
          }

          return (
            <div
              key={frame.area}
              className={className}
              style={style}
              {...handlers}
            >
              {media}
            </div>
          );
        })}

        <div className="mosaic-center" style={{ gridArea: 'm' }}>
          <div className="mosaic-monogram">
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
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[40%] bg-gradient-to-t from-night via-night/50 to-transparent"
        aria-hidden
      />

      <div className="relative z-[4]">{children}</div>
    </section>
  );
}
