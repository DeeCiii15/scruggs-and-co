/**
 * Social profile URLs — set in .env (public):
 * NEXT_PUBLIC_INSTAGRAM_URL, NEXT_PUBLIC_FACEBOOK_URL, NEXT_PUBLIC_PINTEREST_URL
 * NEXT_PUBLIC_GOOGLE_BUSINESS_URL
 *
 * Instagram is env-only. Facebook and Google Business Profile have defaults
 * so production still emits them if those vars are missing.
 */
export type SocialNetwork = 'instagram' | 'facebook' | 'pinterest';

export type SocialLink = {
  network: SocialNetwork;
  label: string;
  href: string;
};

/** Public Google Business Profile (Maps) — used in JSON-LD sameAs + hasMap */
export const GOOGLE_BUSINESS_PROFILE_URL =
  process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL?.trim() ||
  'https://maps.app.goo.gl/dCknc4GbYTMVNkpj8';

export function getSocialLinks(): SocialLink[] {
  const ig = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim();
  const fb =
    process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() ||
    'https://www.facebook.com/Scruggsandcophoto';
  const pin = process.env.NEXT_PUBLIC_PINTEREST_URL?.trim();

  const links: SocialLink[] = [];
  if (ig) links.push({ network: 'instagram', label: 'Instagram', href: ig });
  if (fb) links.push({ network: 'facebook', label: 'Facebook', href: fb });
  if (pin) links.push({ network: 'pinterest', label: 'Pinterest', href: pin });
  return links;
}

/** Profiles for LocalBusiness sameAs (social + Google Business Profile) */
export function getSameAsLinks(): string[] {
  return [...getSocialLinks().map((link) => link.href), GOOGLE_BUSINESS_PROFILE_URL];
}
