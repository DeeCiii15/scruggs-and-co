export type ServiceSlug =
  | 'engagement'
  | 'family'
  | 'maternity'
  | 'portraits'
  | 'seniors'
  | 'weddings';

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  /** Omit for a text-only note (no stamp photo). */
  portrait?: string;
  /** Which service pages should show this review */
  services: ServiceSlug[];
};

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      'Liv made us feel so comfortable—we laughed the whole day and still ended up with photos that feel like us. She caught the tiny details we would have missed.',
    name: 'Maddie & Cole',
    detail: 'Wedding · Whole-day coverage',
    portrait: '/images/wedding_1.jpg',
    services: ['weddings'],
  },
  {
    quote:
      'Our session felt playful, not posed. Liv guided us just enough and let the rest happen. The gallery is full of forever moments.',
    name: 'Paige & Kyle',
    detail: 'Lifestyle session',
    portrait: '/images/portrait_1.jpg',
    services: ['engagement', 'portraits'],
  },
  {
    quote:
      'From the first inquiry to the final gallery, Liv was warm, clear, and genuinely excited for our day. We would book her again in a heartbeat.',
    name: 'Kate & Davis',
    detail: 'Wedding · Half-day coverage',
    portrait: '/images/engagement_1.jpg',
    services: ['weddings', 'engagement'],
  },
  {
    quote:
      "Olivia was so nice and personable! She knew what she was doing and made sure our pictures turned out great! We will be using her again!",
    name: 'Kinley Blackwell',
    detail: 'Facebook',
    portrait: '/images/reviews/kinley-blackwell.png',
    services: ['engagement'],
  },
  {
    quote:
      'Olivia was absolutely fabulous! She made us feel completely comfortable, which made the shot so much more natural and fun. She was amazing at staging poses and capturing the sweet moments in between. Definitely an amazing photographer to work with.',
    name: 'Nikki & Roy Hunsberger',
    detail: 'Facebook',
    portrait: '/images/reviews/nikki-roy-hunsberger.png',
    services: ['engagement'],
  },
  {
    quote:
      "I've had three shoots with Olivia and all of them have come out amazing! She is really talented and outgoing. There is never an awkward moment with her. When she is taking photos, she poses me, makes me laugh, and makes the whole shoot a good time. I would recommend Olivia to anyone!",
    name: 'Ashley LeBrun',
    detail: 'Facebook',
    portrait: '/images/reviews/ashley-lebrun.png',
    services: ['portraits'],
  },
  {
    quote:
      "Olivia is a beautiful soul! She's professional and loves what she does! We loved our pictures and she's reasonably priced! Ten out of ten.",
    name: 'Taylor Williams',
    detail: 'Facebook',
    services: [],
  },
];

export function getTestimonialsForService(
  service: ServiceSlug,
): Testimonial[] {
  return TESTIMONIALS.filter((testimonial) =>
    testimonial.services.includes(service),
  );
}
