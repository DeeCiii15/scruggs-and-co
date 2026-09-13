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
  /** Optional still used as the intro photo when it is not a gallery cover */
  heroImage?: string;
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
  /** Used in the FAQ H2: “Straight answers about {faqLabel}” */
  faqLabel: string;
};

function sessionCollections(
  fullDetail: string,
  miniDetail: string,
): ServiceCollection[] {
  return [
    {
      name: 'Full session',
      price: 'one hour',
      detail: fullDetail,
    },
    {
      name: 'Mini session',
      price: 'thirty minutes',
      detail: miniDetail,
    },
  ];
}

export const SERVICE_DEFS: ServiceDef[] = [
  {
    slug: 'engagement',
    name: 'Engagement Photography',
    navLabel: 'Engagement',
    portfolioCategory: 'Engagement',
    heroImage: '/images/miscellaneous-site-photos/engagement_1.jpg',
    eyebrow: 'Engagement photography',
    headline: 'That feels like the two of you,',
    headlineAccent: 'not a pose',
    intro: `Easy love, soft light, and room to laugh. I photograph engagements around ${PRIMARY_CITY}, Spartanburg, and the ${PRIMARY_REGION}—guided enough that you never feel stranded, loose enough that it still feels like a date.`,
    body: 'Wear what feels like you, pick a place that already means something (or let me suggest one)—golden hour at Lake Bowen, a stroll through downtown Spartanburg, or the covered bridge out toward Landrum—and forget about performing for the camera. I will prompt, joke, and step back so the in-between—the hand squeeze, the almost-kiss—has space to happen. Galleries typically arrive in about two weeks.',
    galleryEyebrow: 'the two of you, documented',
    galleryHeading: 'Engagement galleries worth lingering in',
    pricingEyebrow: 'how we shoot it',
    pricingHeading: 'Investment',
    collections: sessionCollections(
      'Two outfits, a location and attire guide, professional editing, and a private digital gallery—time to wander, reset, and actually enjoy each other.',
      'One outfit, the same polish and care. A shorter window that still holds forever moments—perfect for an anniversary or a just-because evening.',
    ),
    faqs: [
      {
        question: 'Where should we meet for an engagement session?',
        answer:
          'Wherever already feels like you—open fields, downtown Spartanburg, Lake Bowen, or your own backyard in Chesnee. If you want ideas, Liv will suggest spots that match the light and the mood.',
      },
      {
        question: 'We are not models. Will it feel awkward?',
        answer:
          'That is the point of a documentary approach. Liv uses simple prompts instead of stiff posing, so the session feels more like hanging out than performing. Awkwardness is welcome; that is often where the best frames live.',
      },
      {
        question: 'Is this only for engagements?',
        answer:
          'Engagements are the heart of it, and anniversaries or just-because evenings are welcome too. If you are also planning a wedding day, mention the date so we can talk coverage together.',
      },
      {
        question: 'When is the gallery ready?',
        answer:
          'Engagement sessions typically deliver in about two weeks via a private online gallery.',
      },
      {
        question: 'What is due to book?',
        answer:
          'A signed contract and a non-refundable 30% retainer hold your session date.',
      },
    ],
    ctaHeadline: 'Want a session that feels like the two of you?',
    ctaButton: 'Inquire for an engagement session',
    metaTitle: `Engagement Photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} | ${SITE_NAME}`,
    metaDescription: `Engagement photographer in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Easy, documentary sessions around Spartanburg and the ${PRIMARY_REGION}.`,
    faqLabel: 'engagements',
  },
  {
    slug: 'family',
    name: 'Family Portrait Photography',
    navLabel: 'Family',
    portfolioCategory: 'Family',
    heroImage: '/images/miscellaneous-site-photos/inspiration_3.jpg',
    eyebrow: 'Family portrait photography',
    headline: 'For the everyday,',
    headlineAccent: 'forever moments',
    intro: `The pile-on on the couch, the kid who will not look at the camera, the way everyone actually laughs when you stop trying—that is the gallery I want you to have. I am a family photographer based in ${PRIMARY_CITY}, photographing around Spartanburg and the Upstate.`,
    body: 'Sessions stay easy and documentary, whether we meet in your backyard in Chesnee or Boiling Springs, wander Hatcher Garden, or spend a Saturday along Lake Bowen. Bring the whole crew, the baby, the grandparents if they are in town. You do not need matching outfits or a perfect plan—just show up as you are. Galleries typically arrive in about two weeks.',
    galleryEyebrow: 'the people you love, documented',
    galleryHeading: 'Family galleries worth lingering in',
    pricingEyebrow: 'how we shoot it',
    pricingHeading: 'Investment',
    collections: sessionCollections(
      'Two outfits if you want a change, a location and attire guide, professional editing, and a private gallery with room for the whole crew to settle in.',
      'One look, the same care—long enough for real connection, short enough for little attention spans.',
    ),
    faqs: [
      {
        question: 'What if our kids will not sit still?',
        answer:
          'They do not have to. Liv photographs movement, snuggles, and the in-between—not a lineup. Play is useful. Bribery is optional. The goal is a gallery that looks like your family, not a catalog.',
      },
      {
        question: 'How many people can we include?',
        answer:
          'Immediate family is the heart of it, and extra grandparents or cousins are welcome. Mention the headcount when you inquire so we can choose a location and timeframe that still feels unhurried.',
      },
      {
        question: 'Where should we meet?',
        answer:
          'Home, a favorite park, downtown Spartanburg, Lake Bowen, or a backyard in Chesnee. Liv can suggest spots if you need a starting place.',
      },
      {
        question: 'When is the gallery ready?',
        answer:
          'Family sessions typically deliver in about two weeks via a private online gallery.',
      },
      {
        question: 'What is due to book?',
        answer:
          'A signed contract and a non-refundable 30% retainer hold your session date.',
      },
    ],
    ctaHeadline: 'Want a family gallery you will actually print?',
    ctaButton: 'Inquire for a family session',
    metaTitle: `Family Portrait Photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} | ${SITE_NAME}`,
    metaDescription: `Family photographer in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Documentary family sessions around Spartanburg and the ${PRIMARY_REGION}—easy, unhurried, true to you.`,
    faqLabel: 'family sessions',
  },
  {
    slug: 'maternity',
    name: 'Maternity Photography',
    navLabel: 'Maternity',
    portfolioCategory: 'Maternity',
    heroImage: '/images/miscellaneous-site-photos/inspiration_1.jpg',
    eyebrow: 'Maternity photography',
    headline: 'For this quiet,',
    headlineAccent: 'anticipating season',
    intro: `This chapter is slow and huge at the same time. I photograph maternity sessions in ${PRIMARY_CITY} and across the ${PRIMARY_REGION} with a soft, documentary hand—partner, bump, and the feeling that everything is about to change.`,
    body: 'We can keep it intimate (just you, or you and your person) or bring older siblings into the frame. Soft light at Hatcher Garden, a quiet stretch of Lake Bowen, or a field closer to home in Chesnee all work beautifully. Dress however you feel beautiful; I will help with location and light. Most families book sometime in the third trimester, when the bump is here and you still feel like moving. Galleries typically arrive in about two weeks.',
    galleryEyebrow: 'this season, documented',
    galleryHeading: 'Maternity galleries worth lingering in',
    pricingEyebrow: 'how we shoot it',
    pricingHeading: 'Investment',
    collections: sessionCollections(
      'Two looks, a location and attire guide, professional editing, and a private gallery—time to linger in the light and include a partner or older kids if you want them there.',
      'One look, unhurried and close. A shorter window that still holds the tenderness of this season.',
    ),
    faqs: [
      {
        question: 'When in pregnancy should we book?',
        answer:
          'Most clients photograph between 28 and 36 weeks, when the bump is full and you still feel comfortable moving. Reach out earlier if you want a specific date on the calendar—third-trimester weekends book up.',
      },
      {
        question: 'Can my partner or other children join?',
        answer:
          'Yes. Maternity sessions can be just you, the two of you, or the whole family. Mention who is coming when you inquire so we can pace the session around energy and nap schedules.',
      },
      {
        question: 'What should I wear?',
        answer:
          'Wear what makes you feel like yourself—fitted, flowy, or a mix. Liv can share an attire guide and location ideas around Chesnee, Spartanburg, and Lake Bowen.',
      },
      {
        question: 'When is the gallery ready?',
        answer:
          'Maternity sessions typically deliver in about two weeks via a private online gallery.',
      },
      {
        question: 'What is due to book?',
        answer:
          'A signed contract and a non-refundable 30% retainer hold your session date.',
      },
    ],
    ctaHeadline: 'Want this season held with care?',
    ctaButton: 'Inquire for a maternity session',
    metaTitle: `Maternity Photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} | ${SITE_NAME}`,
    metaDescription: `Maternity photographer in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Soft, documentary bump sessions around Spartanburg and the ${PRIMARY_REGION}.`,
    faqLabel: 'maternity',
  },
  {
    slug: 'portraits',
    name: 'Portrait Photography',
    navLabel: 'Portraits',
    portfolioCategory: 'Portraits',
    heroImage: '/images/miscellaneous-site-photos/portrait_1.jpg',
    eyebrow: 'Portrait photography',
    headline: 'That still feels like',
    headlineAccent: 'you',
    intro: `Not a stiff headshot. A lifestyle portrait session for one person—or a small handful—who wants photographs that feel easy, true, and a little cinematic. I am based in ${PRIMARY_CITY} and photograph around Spartanburg and the Upstate.`,
    body: 'We will pick a place that fits you, talk through outfits, and keep the direction light—Cottonwood Trail, a quiet corner of downtown Spartanburg, or a still street in Inman. These frames work for personal keepsakes, a new chapter, or a simple “I want to remember this year.” Turnaround is typically about two weeks via a private online gallery.',
    galleryEyebrow: 'you, documented',
    galleryHeading: 'Portrait galleries worth lingering in',
    pricingEyebrow: 'how we shoot it',
    pricingHeading: 'Investment',
    collections: sessionCollections(
      'Two outfits, a location and attire guide, professional editing, and a digital gallery with time to change, wander, and settle into the light.',
      'One outfit, the same polish—shorter, still full of frames that feel like you.',
    ),
    faqs: [
      {
        question: 'Is this for one person or a group?',
        answer:
          'Portrait sessions are built for one person, or a very small group when it still feels like a portrait—not a full family story. Families, engagements, and seniors have their own pages if that is a better fit.',
      },
      {
        question: 'Where should we meet?',
        answer:
          'Open fields, downtown Spartanburg, Lake Bowen, or a quiet corner closer to Chesnee. Liv can suggest locations that match the light and how you want the gallery to feel.',
      },
      {
        question: 'How should I prepare?',
        answer:
          'Wear what makes you feel like yourself, bring a second look if you booked a full session, and trust the prompts. You do not need to know how to pose.',
      },
      {
        question: 'When is the gallery ready?',
        answer:
          'Portrait sessions typically deliver in about two weeks via a private online gallery.',
      },
      {
        question: 'What is due to book?',
        answer:
          'A signed contract and a non-refundable 30% retainer hold your session date.',
      },
    ],
    ctaHeadline: 'Want portraits that feel like you?',
    ctaButton: 'Inquire for a portrait session',
    metaTitle: `Portrait Photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} | ${SITE_NAME}`,
    metaDescription: `Lifestyle portrait photographer in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Easy, guided sessions around Spartanburg and the ${PRIMARY_REGION}.`,
    faqLabel: 'portraits',
  },
  {
    slug: 'seniors',
    name: 'Senior & Graduation Photography',
    navLabel: 'Seniors / Graduation',
    portfolioCategory: 'Seniors',
    heroImage: '/images/miscellaneous-site-photos/hero_5.jpg',
    eyebrow: 'Senior photography',
    headline: 'For this chapter,',
    headlineAccent: 'documented',
    intro: `Cap, gown, letter jacket, or just you at the end of high school—this is a session for the person you are right now. I photograph seniors and graduates in ${PRIMARY_CITY}, Spartanburg, and across the ${PRIMARY_REGION}.`,
    body: 'We can keep it classic, a little playful, or both—cap and gown at Chesnee High, a letter jacket around Spartanburg, or golden hour at Lake Blalock. Bring a second outfit if you booked a full session, invite a friend for a few frames if that feels like you, and let the rest happen. Galleries typically arrive in about two weeks—in time for announcements, gifts, and the last bulletin board of the year.',
    galleryEyebrow: 'this chapter, documented',
    galleryHeading: 'Senior galleries worth lingering in',
    pricingEyebrow: 'how we shoot it',
    pricingHeading: 'Investment',
    collections: sessionCollections(
      'Two outfits (cap and gown plus something that feels like you), a location and attire guide, professional editing, and a private digital gallery.',
      'One look—gown, casual, or both if we keep it simple—with the same care in a tighter window.',
    ),
    faqs: [
      {
        question: 'When should we book senior photos?',
        answer:
          'Spring and early fall light is beautiful around the Upstate, and summer works if that is when you are home. Book a few months ahead if you want a specific weekend before graduation.',
      },
      {
        question: 'Can we include cap and gown?',
        answer:
          'Yes. Full sessions have room for cap and gown plus a second outfit. Mini sessions usually stick to one look—we will make a plan that still feels like you.',
      },
      {
        question: 'Can a friend or sibling join for a few photos?',
        answer:
          'A few extra frames are welcome. If you want a full second person throughout, that starts to look like an engagement or family session—we can sort it out when you inquire.',
      },
      {
        question: 'When is the gallery ready?',
        answer:
          'Senior sessions typically deliver in about two weeks via a private online gallery.',
      },
      {
        question: 'What is due to book?',
        answer:
          'A signed contract and a non-refundable 30% retainer hold your session date.',
      },
    ],
    ctaHeadline: 'Ready to document this chapter?',
    ctaButton: 'Inquire for a senior session',
    metaTitle: `Senior Photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} | ${SITE_NAME}`,
    metaDescription: `Senior and graduation photographer in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Documentary senior sessions around Spartanburg and the ${PRIMARY_REGION}.`,
    faqLabel: 'senior sessions',
  },
  {
    slug: 'weddings',
    name: 'Wedding Photography',
    navLabel: 'Wedding',
    portfolioCategory: 'Weddings',
    eyebrow: 'Wedding photography',
    headline: 'Letting your day unfold',
    headlineAccent: 'naturally',
    intro: `There is nothing I love more than a wedding day. The vows, the nervous laughter, the hand squeeze nobody else sees—I want to be tucked into all of it, your third-wheel with a camera, so you can stay present. I am a wedding photographer based in ${PRIMARY_CITY}, photographing days across Spartanburg and the Upstate.`,
    body: 'My wedding photography is documentary, with a soft hand—whether we are at Duncan Estate, downtown at Indigo Hall, something quieter at Glendale Shoals, or wherever your day actually lives. Formal portraits, yes—and the joke that cracks the room, the dance that goes too late. Happy to travel when the wedding is farther than home.',
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
        question: 'How do I book a wedding date?',
        answer:
          'Send a note through the contact form with your date and vision. Once the date is available and we are a good fit, you will receive a contract and a non-refundable 30% retainer to hold the day.',
      },
      {
        question: 'When will we receive our wedding gallery?',
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
        question: 'Do you travel for weddings?',
        answer: `Yes—anywhere. Locations within about 50 miles of ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} do not require travel fees. Inquire for destination pricing.`,
      },
    ],
    ctaHeadline: 'Ready to claim your wedding date?',
    ctaButton: 'Check availability',
    metaTitle: `Wedding Photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} | ${SITE_NAME}`,
    metaDescription: `Documentary wedding photographer in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Whole-day, half-day, and elopement coverage across Spartanburg and the ${PRIMARY_REGION}.`,
    faqLabel: 'weddings',
  },
];

export function serviceHref(slug: ServiceSlug): string {
  return `/services/${slug}`;
}

/** Nav / footer service list — one URL per offering */
export const FOOTER_SERVICE_LINKS = SERVICE_DEFS.map((service) => ({
  label: service.navLabel,
  href: serviceHref(service.slug),
}));

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
  if (service.heroImage) return service.heroImage;
  const category = getCategoryByName(service.portfolioCategory);
  if (!category) return '/images/miscellaneous-site-photos/wedding_1.jpg';
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
