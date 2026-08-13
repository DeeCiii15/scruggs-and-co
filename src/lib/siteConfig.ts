/**
 * Canonical site URL for metadata, OG tags, sitemap, and JSON-LD.
 * Override in any environment: NEXT_PUBLIC_SITE_URL=https://yourdomain.com
 */
export const CANONICAL_SITE_URL = 'https://www.scruggsandcophoto.com';

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
  if (fromEnv) return fromEnv;

  if (process.env.VERCEL_ENV === 'production') {
    return CANONICAL_SITE_URL;
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, '')}`;
  return 'http://localhost:3000';
}

export const SITE_NAME = 'Scruggs & Co Photo';

export const PRIMARY_CITY = 'Chesnee';
export const PRIMARY_STATE = 'South Carolina';
export const PRIMARY_STATE_ABBR = 'SC';
export const PRIMARY_REGION = 'Upstate South Carolina';

/** Cities and towns commonly served in your service area */
export const SERVICE_AREAS = [
  'Chesnee',
  'Spartanburg',
  'Greenville',
  'Greer',
  'Boiling Springs',
  'Gaffney',
] as const;

/** Approximate center for local business schema — Chesnee, SC */
export const GEO_COORDINATES = {
  latitude: 35.1484,
  longitude: -81.8609,
} as const;

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
  'scruggsandcophoto@gmail.com';

/** Public booking line — set NEXT_PUBLIC_CONTACT_PHONE (e.g. 864-555-0100). */
export const CONTACT_PHONE =
  process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || '';

export const CONTACT_PHONE_TEL = CONTACT_PHONE.replace(/[^\d+]/g, '');

/** Existing-client proofing / delivery galleries (Pixieset). */
export const CLIENT_GALLERY_URL =
  process.env.NEXT_PUBLIC_CLIENT_GALLERY_URL?.trim() ||
  'https://scruggsandcophoto.pixieset.com';

export const CLIENT_GALLERY_LABEL = 'Your gallery';

export const BRAND_IMAGE_ALT = `${SITE_NAME} — documentary wedding & lifestyle photographer in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`;

export const SERVICE_AREA_LABEL = `Based in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} · Available worldwide`;

export const SITE_TAGLINE =
  'Authentic, heartfelt documentary wedding & lifestyle photography';

/** Default meta description (home + fallback) */
export const SITE_DESCRIPTION = `${SITE_NAME} captures intimate, sweet, forever moments across ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}, ${PRIMARY_REGION}, and beyond—weddings, elopements, and lifestyle sessions since 2019.`;

/** Generic label for service-area landing pages (map pins, location titles) */
export const SERVICE_AREA_PAGE_LABEL = 'Wedding Photography';

export const LOCAL_KEYWORDS = [
  `${PRIMARY_CITY} wedding photographer`,
  `${PRIMARY_REGION} wedding photographer`,
  `South Carolina documentary photographer`,
  `lifestyle photographer ${PRIMARY_STATE_ABBR}`,
  SITE_NAME,
] as const;

/** Used for Open Graph / Twitter when a page does not set its own image */
export const DEFAULT_OG_IMAGE_PATH = '/images/hero_1.jpg';
