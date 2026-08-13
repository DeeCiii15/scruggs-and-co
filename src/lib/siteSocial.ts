/**
 * Social profile URLs — set in .env (public):
 * NEXT_PUBLIC_INSTAGRAM_URL, NEXT_PUBLIC_FACEBOOK_URL, NEXT_PUBLIC_PINTEREST_URL
 *
 * Returns an empty array until you configure real profile links.
 */
export type SocialNetwork = 'instagram' | 'facebook' | 'pinterest';

export type SocialLink = {
  network: SocialNetwork;
  label: string;
  href: string;
};

export function getSocialLinks(): SocialLink[] {
  const ig = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim();
  const fb = process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim();
  const pin = process.env.NEXT_PUBLIC_PINTEREST_URL?.trim();

  const links: SocialLink[] = [];
  if (ig) links.push({ network: 'instagram', label: 'Instagram', href: ig });
  if (fb) links.push({ network: 'facebook', label: 'Facebook', href: fb });
  if (pin) links.push({ network: 'pinterest', label: 'Pinterest', href: pin });
  return links;
}
