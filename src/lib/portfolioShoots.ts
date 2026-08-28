/**
 * Register each photo shoot here (folder must exist under public/images/galleries/).
 * Then run: npm run galleries:sync
 *
 * title       — shown under the shoot polaroid + used in page title & image alt text
 * description — optional; used for SEO meta description & blurb on the shoot page
 * name        — optional; couple/client names (e.g. "Maddie & Cole") for
 *               personalized copy on weddings & engagements when known
 * venue       — optional; venue or location name (e.g. "Duncan Estate")
 */

export type PortfolioShootDef = {
  /** Folder name — must match public/images/galleries/{category}/{slug}/ */
  slug: string;
  /** Display title, e.g. "Maddie & Cole" */
  title: string;
  /** SEO & on-page blurb */
  description?: string;
  /**
   * Optional couple or client name for personalized copy
   * (e.g. "Maddie & Cole") — mainly weddings & engagements.
   */
  name?: string;
  /** Optional venue or place name (e.g. "Duncan Estate", "Lake Bowen") */
  venue?: string;
};

/**
 * Short polaroid caption — first names only when `name` is set
 * (e.g. "Maddie & Cole Scruggs" → "Maddie & Cole").
 */
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
      venue: 'South Carolina',
      description:
        'Documentary wedding frames—vows, details, and the soft in-between that becomes the story you keep.',
    },
    {
      slug: 'golden-hour',
      title: 'Kate & Davis',
      name: 'Kate & Davis',
      venue: 'Upstate SC & beyond',
      description:
        'Warm light, quiet closeness, and celebration energy from full wedding days across the Carolinas.',
    },
  ],
  Engagement: [],
  Family: [],
  Maternity: [],
  Portraits: [
    {
      slug: 'lifestyle-sessions',
      title: 'Lifestyle Sessions',
      description:
        'Engagement and lifestyle portraits that feel easy, sweet, and true to you.',
    },
  ],
  Seniors: [],
};
