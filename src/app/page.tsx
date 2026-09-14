import Link from 'next/link';
import Navigation from './components/Navigation';
import SiteFooter from './components/SiteFooter';
import HomeHeroSlideshow from './components/HomeHeroSlideshow';
import ProcessionIntro from './components/ProcessionIntro';
import ProcessionAbout from './components/ProcessionAbout';
import LedgerGalleries from './components/LedgerGalleries';
import ContinuumReviews from './components/ContinuumReviews';
import ReviewsJsonLd from './components/ReviewsJsonLd';
import {
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
} from '@/lib/siteConfig';
import { TESTIMONIALS } from '@/lib/testimonialsData';

/**
 * Home — rotating gallery hero + Procession intro/about + Ledger galleries + Continuum reviews.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-paper">
      <Navigation />

      <ReviewsJsonLd testimonials={TESTIMONIALS} />
      <main id="home">
        <HomeHeroSlideshow>
          <div className="px-6 pb-12 pt-24 sm:px-10 sm:pb-14 lg:px-16 lg:pb-16">
            <div className="mx-auto w-full max-w-6xl text-center sm:text-left">
              <div className="mx-auto max-w-md text-center sm:mx-0 sm:text-left">
                <h1 className="fl-fade-up-delay mt-4 block font-sans text-[0.65rem] font-medium uppercase tracking-[0.22em] text-fog/70">
                  {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} photographer · Weddings
                  & portraits
                </h1>
                <p className="fl-fade-up mx-auto mt-4 block max-w-md font-display text-xl italic leading-snug text-fog/92 sm:mx-0 sm:text-2xl md:text-[1.65rem]">
                  Forever moments, documented with heart.
                </p>
              </div>
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
        </HomeHeroSlideshow>

        <ProcessionIntro />
        <ProcessionAbout />
        <LedgerGalleries />
        <ContinuumReviews />
      </main>

      <SiteFooter />
    </div>
  );
}
