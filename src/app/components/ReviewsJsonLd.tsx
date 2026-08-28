import { getSiteUrl } from '@/lib/siteConfig';
import type { Testimonial } from '@/lib/testimonialsData';

type ReviewsJsonLdProps = {
  testimonials: readonly Testimonial[];
};

/**
 * Review nodes for testimonials already visible on the page.
 * No reviewRating — quotes are not stored with 1–5 scores.
 */
export default function ReviewsJsonLd({ testimonials }: ReviewsJsonLdProps) {
  if (testimonials.length === 0) return null;

  const url = getSiteUrl();
  const data = {
    '@context': 'https://schema.org',
    '@graph': testimonials.map((testimonial) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: testimonial.name,
      },
      reviewBody: testimonial.quote,
      itemReviewed: { '@id': `${url}#business` },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
