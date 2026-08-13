'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/siteConfig';

type LogoNavProps = {
  href?: string;
  tabIndex?: number;
  className?: string;
};

/**
 * Nav wordmark — original botanical script for “Scruggs”,
 * Instrument Serif for “& Co.” + “Photography by Liv”. No flower.
 */
export default function LogoNav({
  href = '/',
  tabIndex,
  className = '',
}: LogoNavProps) {
  return (
    <Link
      href={href}
      className={`group relative z-10 flex min-w-0 shrink items-center overflow-visible ${className}`}
      aria-label={SITE_NAME}
      tabIndex={tabIndex}
    >
      <span className="flex flex-col items-start leading-none text-ink">
        <span className="relative inline-block">
          <Image
            src="/images/brand/scruggs-script-word.png"
            alt=""
            width={935}
            height={390}
            className="h-[2.85rem] w-auto md:h-[3.35rem]"
            unoptimized
            priority
            aria-hidden
          />
          <span className="absolute bottom-[0.15rem] right-0 translate-x-[0.15rem] font-display text-[0.72rem] tracking-[0.04em] text-ink md:bottom-[0.2rem] md:text-[0.82rem]">
            &amp; Co.
          </span>
        </span>
        <span className="mt-1 font-display text-[0.55rem] font-normal uppercase tracking-[0.28em] text-ink/70 md:mt-1.5 md:text-[0.62rem] md:tracking-[0.34em]">
          Photography by Liv
        </span>
      </span>
    </Link>
  );
}
