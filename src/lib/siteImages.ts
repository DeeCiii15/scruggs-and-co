/**
 * Site imagery — hero frames, brand marks, about/contact photos.
 * Paths are under public/ (sourced from scruggsandcophoto.com + generated brand assets).
 */

/** Legacy hero rotation slides */
export const HERO_SLIDES = [
  {
    src: '/images/hero_1.jpg',
    objectPosition: 'center 30%',
  },
  {
    src: '/images/hero_2.jpg',
    objectPosition: 'center center',
  },
  {
    src: '/images/hero_3.jpg',
    objectPosition: 'center 40%',
  },
  {
    src: '/images/hero_4.jpg',
    objectPosition: 'center center',
  },
  {
    src: '/images/hero_5.jpg',
    objectPosition: 'center 25%',
  },
] as const;

/**
 * Homepage hover mosaic — tiles around a clear center monogram cell.
 * Kept for easy swap-back while exploring heroes.
 */
export const MOSAIC_FRAMES = [
  {
    src: '/images/hero_1.jpg',
    objectPosition: 'center 30%',
    area: 'a',
    href: '/portfolio',
  },
  {
    src: '/images/hero_2.jpg',
    objectPosition: 'center center',
    area: 'b',
  },
  {
    src: '/images/hero_3.jpg',
    objectPosition: 'center 40%',
    area: 'c',
    href: '/portfolio/weddings',
  },
  {
    src: '/images/inspiration_1.jpg',
    objectPosition: 'center center',
    area: 'd',
  },
  {
    src: '/images/hero_4.jpg',
    objectPosition: 'center center',
    area: 'e',
  },
  {
    src: '/images/inspiration_2.jpg',
    objectPosition: 'center 35%',
    area: 'f',
    href: '/portfolio',
  },
  {
    src: '/images/hero_5.jpg',
    objectPosition: 'center 25%',
    area: 'g',
  },
  {
    src: '/images/inspiration_3.jpg',
    objectPosition: 'center center',
    area: 'h',
  },
  {
    src: '/images/contact.jpg',
    objectPosition: 'center 20%',
    area: 'i',
  },
  {
    src: '/images/about.jpg',
    objectPosition: 'center top',
    area: 'j',
  },
] as const;

/** Homepage curtain reveal — front parts, back shows through */
export const CURTAIN_IMAGES = {
  front: {
    src: '/images/hero_1.jpg',
    /**
     * Seam stays at screen center (with the monogram).
     * Shift/crop the photo so the gap between their arms lands on that center.
     */
    objectPosition: '12% 36%',
    scale: 1.22,
    /** Positive = move photo right so the arm-gap sits under the center seam */
    shiftX: '4%',
    seamPercent: 50,
  },
  back: {
    // Same couple — kiss under floral ceremony wreath/arch
    src: '/images/hero_4.jpg',
    objectPosition: 'center 40%',
    scale: 1,
  },
} as const;

/** Homepage scroll-scrub filmstrip — horizontal contact sheet */
export const FILMSTRIP_FRAMES = [
  {
    src: '/images/hero_1.jpg',
    objectPosition: 'center 30%',
    href: '/portfolio',
  },
  {
    src: '/images/hero_2.jpg',
    objectPosition: 'center center',
  },
  {
    src: '/images/hero_3.jpg',
    objectPosition: 'center 40%',
    href: '/portfolio/weddings',
  },
  {
    src: '/images/inspiration_1.jpg',
    objectPosition: 'center center',
  },
  {
    src: '/images/hero_4.jpg',
    objectPosition: 'center center',
  },
  {
    src: '/images/inspiration_2.jpg',
    objectPosition: 'center 35%',
    href: '/portfolio',
  },
  {
    src: '/images/hero_5.jpg',
    objectPosition: 'center 25%',
  },
  {
    src: '/images/inspiration_3.jpg',
    objectPosition: 'center center',
  },
  {
    src: '/images/contact.jpg',
    objectPosition: 'center 20%',
  },
  {
    src: '/images/about.jpg',
    objectPosition: 'center top',
  },
] as const;

export const SITE_IMAGES = {
  logo: '/images/logo.png',
  /** Same wordmark as footer — sage outlined SCRUGGS AND CO. PHOTO */
  logoNav: '/images/brand/scruggs-co-logo-lockup.svg',
  /** Script wordmark — Pinyon + Instrument, no botanical */
  logoScriptNav: '/images/brand/scruggs-co-script-nav.png',
  /** Light mark for dark photo overlays */
  logoOnDark: '/images/brand/scruggs-liv-logo-on-dark.png',
  /** Center monogram */
  logoMonogram: '/images/brand/scruggs-co-logo-monogram.png',
  /** White oval S — true vector (not the Artboard 2 PNG-mask export) */
  logoHero: '/images/brand/scruggs-co-hero-mark.svg',
  /** Sage oval S — same paths as logoHero, fill #929c7c */
  logoFooterMark: '/images/brand/scruggs-co-hero-mark-sage.svg',
  /** Footer wordmark only (sage outlined SCRUGGS AND CO. PHOTO; tagline is HTML) */
  logoFooter: '/images/brand/scruggs-co-logo-lockup.svg',
  heroField: '/images/inspiration_2.jpg',
  heroArch: '/images/inspiration_1.jpg',
  moodField: '/images/inspiration_1.jpg',
  moodArch: '/images/inspiration_2.jpg',
  moodFilm: '/images/inspiration_3.jpg',
  /** About section — Liv */
  photographer: '/images/about.jpg',
  /** Contact page main photo */
  contactPhoto: '/images/contact.jpg',
  contactSidebar: '/images/inspiration_2.jpg',
} as const;
