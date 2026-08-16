export type ServiceSlug = 'weddings' | 'sessions';

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  portrait: string;
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
    services: ['sessions'],
  },
  {
    quote:
      'From the first inquiry to the final gallery, Liv was warm, clear, and genuinely excited for our day. We would book her again in a heartbeat.',
    name: 'Kate & Davis',
    detail: 'Wedding · Half-day coverage',
    portrait: '/images/engagement_1.jpg',
    services: ['weddings', 'sessions'],
  },
  {
    quote:
      'She has a way of making the in-between feel important. Our family gallery is the one we actually print.',
    name: 'The Harpers',
    detail: 'Family session',
    portrait: '/images/inspiration_3.jpg',
    services: ['sessions'],
  },
  {
    quote:
      'Quiet, unhurried, and so us. We still talk about how easy the whole evening felt.',
    name: 'Jordan & Elise',
    detail: 'Couples session',
    portrait: '/images/inspiration_2.jpg',
    services: ['sessions'],
  },
];

export function getTestimonialsForService(
  service: ServiceSlug,
): Testimonial[] {
  return TESTIMONIALS.filter((testimonial) =>
    testimonial.services.includes(service),
  );
}
