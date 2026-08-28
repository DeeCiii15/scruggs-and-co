import type { Metadata } from 'next';
import {
  BRAND_IMAGE_ALT,
  DEFAULT_OG_IMAGE_PATH,
  SITE_NAME,
} from './siteConfig';

type PageShareInput = {
  title: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
};

/**
 * Complete Open Graph + Twitter kit for a page.
 * Child routes that set `openGraph` without `images` drop the layout photo
 * and leave Twitter titled as the homepage — always pass the full object.
 */
export function pageShareMeta({
  title,
  description,
  url,
  image = DEFAULT_OG_IMAGE_PATH,
  imageAlt = BRAND_IMAGE_ALT,
  type = 'website',
}: PageShareInput): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      type,
      locale: 'en_US',
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
