/**
 * Register each gallery shoot here (folder must exist under public/images/galleries/).
 * Then run: npm run galleries:sync
 */

export type PortfolioShootDef = {
  /** Folder name — must match public/images/galleries/{category}/{slug}/ */
  slug: string;
  /** Display title */
  title: string;
  /** SEO & on-page blurb */
  description?: string;
  /** Optional client name for personalized copy */
  name?: string;
  /** Optional venue or place name */
  venue?: string;
};

/** Short polaroid caption — first names only when `name` is set */
export function shootGalleryLabel(shoot: PortfolioShootDef): string {
  const raw = shoot.name?.trim();
  if (!raw) return shoot.title;

  const normalized = raw.replace(/\s+and\s+/gi, ' & ');
  const parts = normalized.split(/\s*&\s*/).map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const first = parts[0]!.split(/\s+/)[0]!;
    const second = parts[1]!.split(/\s+/)[0]!;
    return `${first} & ${second}`;
  }

  return raw;
}

export const SHOOTS_BY_CATEGORY: Record<string, PortfolioShootDef[]> = {
  Weddings: [
    {
      slug: 'forever-moments',
      title: 'Maddie & Cole',
      name: 'Maddie & Cole',
      description:
        'Documentary wedding frames—vows, details, and the soft in-between that becomes the story you keep.',
      venue: 'South Carolina',
    },
    {
      slug: 'golden-hour',
      title: 'Kate & Davis',
      name: 'Kate & Davis',
      description:
        'Warm light, quiet closeness, and celebration energy from full wedding days across the Carolinas.',
      venue: 'Upstate SC & beyond',
    },
  ],
  Portraits: [
    {
      slug: 'lifestyle-sessions',
      title: 'Lifestyle Sessions',
      description:
        'Couples, engagement, and lifestyle portraits that feel easy, sweet, and true to you.',
    },
  ],
};
