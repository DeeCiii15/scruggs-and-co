'use client';

import Navigation from './components/Navigation';
import SiteFooter from './components/SiteFooter';
import HomeHeroCurtain from './components/HomeHeroCurtain';
import ProcessionIntro from './components/ProcessionIntro';
import ProcessionAbout from './components/ProcessionAbout';
import LedgerGalleries from './components/LedgerGalleries';
import ContinuumReviews from './components/ContinuumReviews';
import Link from 'next/link';
import {
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_NAME,
} from '@/lib/siteConfig';

/**
 * Home — curtain hero + Procession intro/about + Ledger galleries + Continuum reviews.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-paper">
      <Navigation />

      <main id="home">
        <HomeHeroCurtain>
          <div className="px-6 pb-12 pt-24 sm:px-10 sm:pb-14 lg:px-16 lg:pb-16">
            <div className="mx-auto w-full max-w-6xl text-center sm:text-left">
              <h1 className="sr-only">{SITE_NAME}</h1>
              <p className="fl-fade-up mx-auto max-w-md font-display text-xl italic leading-snug text-fog/92 sm:mx-0 sm:text-2xl md:text-[1.65rem]">
                Forever moments, documented with heart.
              </p>
              <p className="fl-fade-up-delay mt-4 font-sans text-[0.65rem] font-medium uppercase tracking-[0.22em] text-fog/70">
                {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}
              </p>
              <div className="fl-fade-up-delay-2 mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:justify-start">
                <Link href="/portfolio" className="fl-btn fl-btn-solid-light">
                  View the work
                  <span aria-hidden>→</span>
                </Link>
                <Link href="/contact" className="fl-link fl-link-on-dark">
                  Inquire
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </HomeHeroCurtain>

        <ProcessionIntro />
        <ProcessionAbout />
        <LedgerGalleries />
        <ContinuumReviews />
      </main>

      <SiteFooter />
    </div>
  );
}
