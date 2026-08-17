'use client';

import Link from 'next/link';
import { FOOTER_SERVICE_LINKS } from '@/lib/servicesData';
import { SERVICE_AREA_LABEL, SITE_NAME } from '@/lib/siteConfig';
import { SITE_IMAGES } from '@/lib/siteImages';
import { getSocialLinks } from '@/lib/siteSocial';
import { SocialNetworkIcon } from './SocialMediaIcons';

export default function SiteFooter() {
  const socialLinks = getSocialLinks();

  return (
    <footer className="border-t border-ink/10 bg-paper px-6 pb-14 pt-6 sm:px-10 sm:pb-16 sm:pt-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center">
          <Link
            href="/"
            aria-label={SITE_NAME}
            className="inline-flex flex-col items-center"
          >
            {/* Plain img — SVG stays vector-sharp on mobile (next/image can soft-blur marks) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SITE_IMAGES.logoFooterMark}
              alt=""
              width={1060}
              height={950}
              decoding="async"
              className="mb-1 h-24 w-auto overflow-visible object-contain sm:mb-1.5 sm:h-28"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SITE_IMAGES.logoFooter}
              alt=""
              width={1800}
              height={260}
              decoding="async"
              className="h-auto w-[min(22rem,90vw)] overflow-visible object-contain sm:w-[28rem]"
            />
            {/* Tagline in HTML — brand SVGs only had live Sweet Fancy / Baskerville */}
            <p className="mt-0.5 flex flex-wrap items-baseline justify-center gap-x-2.5 text-sage sm:gap-x-3">
              <span
                className="translate-y-[-0.06em] text-[0.62rem] uppercase tracking-[0.12em] sm:text-[0.78rem]"
                style={{
                  fontFamily:
                    "Palatino, 'Palatino Linotype', 'Book Antiqua', Georgia, serif",
                  fontWeight: 400,
                }}
              >
                CAPTURING LIFE&rsquo;S
              </span>
              <span
                className="font-script text-[1.55rem] leading-none sm:text-[1.95rem]"
                style={{
                  letterSpacing: '0.01em',
                  fontWeight: 400,
                  transform: 'skewX(-5deg)',
                  display: 'inline-block',
                }}
              >
                forever moments
              </span>
            </p>
          </Link>
          <p className="mt-4 max-w-sm font-sans text-xs font-light leading-relaxed text-sage">
            {SERVICE_AREA_LABEL}
          </p>
        </div>

        <nav aria-label="Services" className="flex flex-col items-center gap-3">
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.22em] text-sage">
            Services
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-y-2">
            {FOOTER_SERVICE_LINKS.map((link, index) => (
              <li key={link.label} className="inline-flex items-center">
                {index > 0 && (
                  <span aria-hidden className="mx-3 text-sage/40">
                    ·
                  </span>
                )}
                <Link
                  href={link.href}
                  className="fl-link !text-[0.58rem] !tracking-[0.12em] text-sage hover:text-moss sm:!text-[0.72rem] sm:!tracking-[0.16em]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {socialLinks.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.network}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex h-11 w-11 items-center justify-center border border-sage/45 text-sage transition hover:border-moss hover:text-moss"
              >
                <SocialNetworkIcon
                  network={link.network}
                  className="h-[17px] w-[17px]"
                />
              </a>
            ))}
          </div>
        )}

        <p className="text-[0.65rem] tracking-wide text-sage" suppressHydrationWarning>
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
