import {
  getCategoryByName,
  getShootCards,
  portfolioCategoryHref,
  shootCoverSrc,
  type PortfolioShootCard,
} from './portfolioData';
import {
  getTestimonialsForService,
  type ServiceSlug,
  type Testimonial,
} from './testimonialsData';
import {
  PRIMARY_CITY,
  PRIMARY_REGION,
  PRIMARY_STATE,
  PRIMARY_STATE_ABBR,
  SITE_NAME,
} from './siteConfig';

export type { ServiceSlug };

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceCollection = {
  name: string;
  price: string;
  detail: string;
};

export type ServiceDef = {
  slug: ServiceSlug;
  /** Page H1 / display name */
  name: string;
  /** Shorter label for nav */
  navLabel: string;
  /** Portfolio category name — must match portfolioData */
  portfolioCategory: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  body: string;
  galleryEyebrow: string;
  galleryHeading: string;
  pricingEyebrow: string;
  pricingHeading: string;
  pricingIntro?: string;
  collections: ServiceCollection[];
  faqs: ServiceFaq[];
  ctaHeadline: string;
  ctaButton: string;
  metaTitle: string;
  metaDescription: string;
};

export const SERVICE_DEFS: ServiceDef[] = [
  {
    slug: 'weddings',
    name: 'Wedding Photography',
    navLabel: 'Weddings',
    portfolioCategory: 'Weddings',
    eyebrow: 'Weddings',
    headline: 'Wedding photography that lets your day unfold',
    headlineAccent: 'naturally',
    intro:
      `There is nothing I love more than a wedding day. The vows, the nervous laughter, the hand squeeze nobody else sees—I want to be tucked into all of it, your third-wheel with a camera, so you can stay present. I am a wedding photographer based in ${PRIMARY_CITY}, photographing days across Spartanburg and the Upstate.`,
    body:
      'My wedding photography is documentary, with a soft hand—whether we are at Duncan Estate, downtown at Indigo Hall, or wherever your day actually lives. Formal portraits, yes—and the joke that cracks the room, the dance that goes too late. Happy to travel when the wedding is farther than home.',
    galleryEyebrow: 'the day, documented',
    galleryHeading: 'Wedding galleries worth lingering in',
    pricingEyebrow: 'how we cover it',
    pricingHeading: 'Investment',
    pricingIntro:
      'After a year of watching meaningful moments land after a strict eight-hour window, Liv simplified wedding collections to Whole-Day and Half-Day coverage—so you can stay present without watching the clock.',
    collections: [
      {
        name: 'Signature Whole Day',
        price: 'from $2,800',
        detail:
          '8+ hours with a second shooter, complimentary bridal or engagement session, timeline help, and a professional gallery. Begins when your wedding day begins.',
      },
      {
        name: 'Half-Day',
        price: '$1,800',
        detail:
          'About 6 hours—from roughly an hour before ceremony through send-off. The heart of the day, held with care.',
      },
      {
        name: 'Micro wedding & elopement',
        price: 'from $800',
        detail:
          'Starts at 3 hours. Intimate coverage for the two of you—or a small circle—wherever the day unfolds.',
      },
    ],
    faqs: [
      {
        question: 'How do I book?',
        answer:
          'Send a note through the contact form with your date and vision. Once the date is available and we are a good fit, you will receive a contract and a non-refundable 30% retainer to hold the day.',
      },
      {
        question: 'When will we receive our gallery?',
        answer:
          'Please allow 6–8 weeks for wedding galleries. You will receive a private professional online gallery when edits are complete.',
      },
      {
        question: 'What if we do not know how to pose?',
        answer:
          'Liv guides with a soft hand—natural prompts, playful direction, and space for real moments—so your photos feel timeless without stiff posing.',
      },
      {
        question: 'Do you provide RAW files?',
        answer:
          'No. Selecting and editing is part of the art. You receive a curated, professionally edited gallery.',
      },
      {
        question: 'Do you photograph Spartanburg and Chesnee venues?',
        answer:
          'Yes—estate days, downtown halls, churches, backyards, and new-to-me spaces around Chesnee and Spartanburg. If I have not been to your venue yet, I will still show up ready.',
      },
      {
        question: 'Do you travel?',
        answer:
          `Yes—anywhere. Locations within about 50 miles of ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} do not require travel fees. Inquire for destination pricing.`,
      },
    ],
    ctaHeadline: 'Ready to claim your wedding date?',
    ctaButton: 'Check availability',
    metaTitle: `Wedding Photography | ${SITE_NAME}`,
    metaDescription: `Documentary wedding photographer in ${PRIMARY_CITY}, ${PRIMARY_STATE}.`,
  },
  {
    slug: 'sessions',
    name: 'Lifestyle Sessions',
    navLabel: 'Sessions',
    portfolioCategory: 'Portraits',
    eyebrow: 'Sessions',
    headline: 'Lifestyle photography for the sweet,',
    headlineAccent: 'cuddly, and effortless',
    intro:
      `General sessions are built for couples, engagements, families, and everyday love—guided enough to feel confident, loose enough to laugh. I am a lifestyle photographer based in ${PRIMARY_CITY}, photographing around Spartanburg and the Upstate.`,
    body:
      'My portrait photography stays easy and documentary—whether we meet downtown, along Lake Bowen, or in your own backyard. Wear what feels like you, bring the people you love, and let the rest happen. Turnaround is typically about two weeks via a private online gallery.',
    galleryEyebrow: 'the session, documented',
    galleryHeading: 'Portrait galleries worth lingering in',
    pricingEyebrow: 'how we shoot it',
    pricingHeading: 'Investment',
    collections: [
      {
        name: 'Package 1',
        price: 'one hour',
        detail:
          'Two outfits, location & attire guide, professional editing, and a digital gallery.',
      },
      {
        name: 'Package 2',
        price: 'thirty minutes',
        detail:
          'One outfit, the same polish and care—shorter, still full of forever moments.',
      },
    ],
    faqs: [
      {
        question: 'Where should we meet?',
        answer:
          'Wherever feels like you—open fields, downtown Spartanburg, Lake Bowen, or your own backyard in Chesnee. Liv can suggest spots if you need ideas.',
      },
      {
        question: 'How should we prepare?',
        answer:
          'Wear what makes you feel like yourself, bring a second look if you booked Package 1, and trust the prompts. Awkwardness is welcome; that is often where the best frames live.',
      },
      {
        question: 'When is the gallery ready?',
        answer:
          'General sessions typically deliver in about two weeks via a private online gallery.',
      },
      {
        question: 'What is due to book?',
        answer:
          'A signed contract and a non-refundable 30% retainer hold your session date.',
      },
    ],
    ctaHeadline: 'Want a session that feels like you?',
    ctaButton: 'Inquire for a session',
    metaTitle: `Chesnee Lifestyle Photographer | ${SITE_NAME}`,
    metaDescription: `Lifestyle photographer in Chesnee, SC. Portrait photography for couples, families, maternity, and seniors—easy, guided sessions.`,
  },
];

export function serviceHref(slug: ServiceSlug): string {
  return `/services/${slug}`;
}

/** Nav / footer service list (session types share the lifestyle sessions page) */
export const FOOTER_SERVICE_LINKS = [
  { label: 'Couples', href: serviceHref('sessions') },
  { label: 'Family', href: serviceHref('sessions') },
  { label: 'Maternity', href: serviceHref('sessions') },
  { label: 'Portraits', href: serviceHref('sessions') },
  { label: 'Seniors / Graduation', href: serviceHref('sessions') },
  { label: 'Wedding', href: serviceHref('weddings') },
] as const;

export function getServiceBySlug(slug: string): ServiceDef | undefined {
  return SERVICE_DEFS.find((service) => service.slug === slug);
}

export function getServiceByPortfolioCategory(
  categoryName: string,
): ServiceDef | undefined {
  return SERVICE_DEFS.find(
    (service) => service.portfolioCategory === categoryName,
  );
}

export function getAllServiceSlugs(): ServiceSlug[] {
  return SERVICE_DEFS.map((service) => service.slug);
}

export function getServiceShootCards(service: ServiceDef): PortfolioShootCard[] {
  return getShootCards(service.portfolioCategory);
}

export function getServicePortfolioHref(service: ServiceDef): string {
  const category = getCategoryByName(service.portfolioCategory);
  return category ? portfolioCategoryHref(category.folder) : '/portfolio';
}

export function getServiceTestimonials(service: ServiceDef): Testimonial[] {
  return getTestimonialsForService(service.slug);
}

export function getServiceHeroImage(service: ServiceDef): string {
  const category = getCategoryByName(service.portfolioCategory);
  if (!category) return '/images/wedding_1.jpg';
  if (category.shoots.length > 0) {
    return shootCoverSrc(category.folder, category.shoots[0]!);
  }
  return category.coverSrc;
}

/** Distinct stills for procession chapters (falls back to hero when thin). */
export function getServiceChapterImages(service: ServiceDef): {
  intro: string;
  galleryPrimary: string;
  gallerySecondary: string | null;
  pricing: string;
  faq: string;
} {
  const shoots = getServiceShootCards(service);
  const srcs = shoots.map((shoot) => shoot.image);
  const hero = getServiceHeroImage(service);
  if (srcs[0] !== hero) srcs.unshift(hero);

  const at = (i: number) => srcs[i] ?? srcs[0] ?? hero;

  return {
    intro: at(0),
    galleryPrimary: at(0),
    gallerySecondary: srcs[1] ?? null,
    pricing: at(1),
    faq: at(2),
  };
}
