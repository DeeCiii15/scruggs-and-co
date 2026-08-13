'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FOOTER_SERVICE_LINKS } from '@/lib/servicesData';
import { SERVICE_AREA_LABEL, SITE_NAME } from '@/lib/siteConfig';
import { SITE_IMAGES } from '@/lib/siteImages';
import { getSocialLinks } from '@/lib/siteSocial';
import { SocialNetworkIcon } from './SocialMediaIcons';

export default function SiteFooter() {
  const socialLinks = getSocialLinks();

  return (
    <footer className="border-t border-ink/10 bg-paper px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center">
          <Link href="/" aria-label={SITE_NAME} className="inline-flex">
            <Image
              src={SITE_IMAGES.logoMonogram}
              alt={SITE_NAME}
              width={280}
              height={360}
              className="h-28 w-auto fl-logo-monogram-on-paper sm:h-32"
              unoptimized
            />
          </Link>
          <p className="mt-4 max-w-sm font-sans text-xs font-light leading-relaxed text-ink-soft">
            {SERVICE_AREA_LABEL}
          </p>
        </div>

        <nav aria-label="Services" className="flex flex-col items-center gap-3">
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.22em] text-ink-soft">
            Services
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-y-2">
            {FOOTER_SERVICE_LINKS.map((link, index) => (
              <li key={link.label} className="inline-flex items-center">
                {index > 0 && (
                  <span aria-hidden className="mx-3 text-ink/25">
                    ·
                  </span>
                )}
                <Link
                  href={link.href}
                  className="fl-link text-ink-soft hover:text-moss"
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
                className="flex h-11 w-11 items-center justify-center border border-ink/15 text-ink transition hover:border-moss hover:text-moss"
              >
                <SocialNetworkIcon
                  network={link.network}
                  className="h-[17px] w-[17px]"
                />
              </a>
            ))}
          </div>
        )}

        <p className="text-[0.65rem] tracking-wide text-ink-soft" suppressHydrationWarning>
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
