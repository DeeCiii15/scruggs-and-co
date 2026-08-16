'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FOOTER_SERVICE_LINKS } from '@/lib/servicesData';
import {
  CLIENT_GALLERY_LABEL,
  CLIENT_GALLERY_URL,
  SITE_NAME,
} from '@/lib/siteConfig';
import { SITE_IMAGES } from '@/lib/siteImages';

function MenuMark({ className = '' }: { className?: string }) {
  return (
    <span className={`flex flex-col items-center ${className}`}>
      <span className="flex w-[1.65rem] flex-col gap-[0.32rem]" aria-hidden>
        <span className="h-[1.5px] w-full bg-current" />
        <span className="h-[1.5px] w-full bg-current" />
        <span className="h-[1.5px] w-full bg-current" />
      </span>
      <span className="mt-2 font-display text-[0.58rem] leading-none tracking-[0.38em] text-current">
        Menu
      </span>
    </span>
  );
}

function MenuCloseIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function ServicesChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`ml-1 h-2.5 w-2.5 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [navPinned, setNavPinned] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const onServices = pathname.startsWith('/services');

  useEffect(() => {
    setMounted(true);
  }, []);

  const clearServicesCloseTimer = () => {
    if (servicesCloseTimer.current) {
      clearTimeout(servicesCloseTimer.current);
      servicesCloseTimer.current = null;
    }
  };

  const openServices = () => {
    clearServicesCloseTimer();
    setServicesOpen(true);
  };

  const scheduleCloseServices = () => {
    clearServicesCloseTimer();
    servicesCloseTimer.current = setTimeout(() => {
      setServicesOpen(false);
      servicesCloseTimer.current = null;
    }, 150);
  };

  const revealNav = () => {
    setNavPinned(true);
    setNavVisible(true);
  };

  useEffect(() => {
    const updateVisibility = () => {
      if (!isHome) {
        setNavVisible(true);
        return;
      }
      // Pinned by the corner menu, or after a bit of curtain scroll
      if (navPinned) {
        setNavVisible(true);
        return;
      }
      const threshold = window.innerHeight * 0.08;
      setNavVisible(window.scrollY > threshold);
    };
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, [isHome, navPinned]);

  useEffect(() => {
    clearServicesCloseTimer();
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
    setNavPinned(false);
  }, [pathname]);

  useEffect(() => {
    return () => clearServicesCloseTimer();
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        clearServicesCloseTimer();
        setServicesOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        clearServicesCloseTimer();
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [servicesOpen]);

  const showNav = mounted && (navVisible || mobileMenuOpen);
  // Keep the trigger available at the top of the home hero even if scroll
  // state flickers — hide only once the paper nav is actually showing.
  const showMenuTrigger = mounted && isHome && !showNav;

  const linkClass =
    'relative px-2.5 py-2 font-display text-[0.75rem] text-ink/75 transition hover:text-ink';

  const mobileLinkClass =
    'touch-manipulation border-b border-ink/10 px-1 py-4 font-display text-[0.82rem] text-ink';

  useEffect(() => {
    const onOpen = () => revealNav();
    window.addEventListener('scruggs:open-nav', onOpen);
    return () => window.removeEventListener('scruggs:open-nav', onOpen);
  }, []);

  return (
    <>
      {showMenuTrigger && (
        <button
          type="button"
          onClick={revealNav}
          className="fixed right-5 top-5 z-[70] p-0 text-fog transition hover:text-fog/80 sm:right-8 sm:top-6"
          aria-label="Open menu"
        >
          <MenuMark />
        </button>
      )}

      <nav
        className={`fixed left-0 right-0 top-0 z-[60] transition-all duration-500 ${
          mobileMenuOpen
            ? 'bottom-0 overflow-y-auto bg-paper'
            : 'overflow-visible border-b border-ink/10 bg-paper/90 backdrop-blur-md'
        } ${
          showNav
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
        aria-hidden={!showNav}
      >
      <div className="mx-auto max-w-7xl overflow-visible px-5 sm:px-10 lg:px-14">
        <div className="flex h-[4.75rem] items-center justify-between gap-4 overflow-visible pt-[env(safe-area-inset-top,0px)] md:h-[5.25rem]">
          <Link
            href="/"
            className="group relative z-10 flex min-w-0 shrink items-center overflow-visible"
            aria-label={SITE_NAME}
            tabIndex={showNav ? undefined : -1}
          >
            <Image
              src={SITE_IMAGES.logoNav}
              alt={SITE_NAME}
              width={1241}
              height={113}
              className="fl-logo-nav fl-logo-on-paper"
              unoptimized
              priority
            />
          </Link>

          <div className="hidden items-center justify-end gap-1 md:flex">
            <Link
              href="/#about"
              className={linkClass}
              tabIndex={showNav ? undefined : -1}
            >
              About
            </Link>
            <Link
              href="/portfolio"
              className={linkClass}
              tabIndex={showNav ? undefined : -1}
            >
              Portfolio
            </Link>

            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={scheduleCloseServices}
            >
              <button
                type="button"
                className={`${linkClass} inline-flex items-center ${onServices ? 'text-ink' : ''}`}
                aria-expanded={servicesOpen}
                aria-haspopup="menu"
                tabIndex={showNav ? undefined : -1}
                onClick={() => {
                  clearServicesCloseTimer();
                  setServicesOpen((open) => !open);
                }}
              >
                Services
                <ServicesChevron open={servicesOpen} />
              </button>

              {servicesOpen && (
                <div
                  role="menu"
                  aria-label="Photography services"
                  className="absolute left-1/2 top-full z-[70] w-52 -translate-x-1/2 pt-3"
                >
                  <div className="border border-ink/10 bg-fog p-2">
                    {FOOTER_SERVICE_LINKS.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        role="menuitem"
                        className="block px-3 py-2.5 font-display text-[0.72rem] text-ink/80 transition hover:bg-paper-deep hover:text-ink"
                        onClick={() => {
                          clearServicesCloseTimer();
                          setServicesOpen(false);
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className={linkClass}
              tabIndex={showNav ? undefined : -1}
            >
              Contact
            </Link>

            <span
              className="mx-2 h-3.5 w-px shrink-0 bg-ink/20 sm:mx-3"
              aria-hidden
            />

            <a
              href={CLIENT_GALLERY_URL}
              className={linkClass}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={showNav ? undefined : -1}
            >
              {CLIENT_GALLERY_LABEL}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative z-[61] flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center text-ink transition md:hidden"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            tabIndex={showNav ? undefined : -1}
          >
            {mobileMenuOpen ? (
              <MenuCloseIcon />
            ) : (
              <span className="flex w-6 flex-col gap-1.5" aria-hidden>
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
              </span>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="min-h-[calc(100dvh-4.75rem-env(safe-area-inset-top,0px))] border-t border-ink/10 bg-paper pb-10 pt-2 md:hidden">
            <div className="flex flex-col">
              <Link
                href="/#about"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                About
              </Link>
              <Link
                href="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                Portfolio
              </Link>
              <button
                type="button"
                className={`${mobileLinkClass} flex w-full items-center justify-between text-left`}
                aria-expanded={mobileServicesOpen}
                onClick={() => setMobileServicesOpen((open) => !open)}
              >
                Services
                <ServicesChevron open={mobileServicesOpen} />
              </button>
              {mobileServicesOpen && (
                <div className="mb-2 ml-3 flex flex-col border-l border-ink/15 pl-4">
                  {FOOTER_SERVICE_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-3 font-display text-[0.72rem] text-ink-soft"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                Contact
              </Link>
              <a
                href={CLIENT_GALLERY_URL}
                onClick={() => setMobileMenuOpen(false)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${mobileLinkClass} border-b-0 text-ink-soft`}
              >
                {CLIENT_GALLERY_LABEL}
              </a>
            </div>
          </div>
        )}
      </div>
      </nav>
    </>
  );
}
