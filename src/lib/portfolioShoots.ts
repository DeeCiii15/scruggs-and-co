/**
 * Register each photo shoot here (folder must exist under public/images/galleries/).
 * Then run: npm run galleries:sync
 *
 * title       — fallback heading if `name` is not set; used in some alt text
 * description — optional override; unique title + blurb are generated from
 *               name, venue, slug, and category copy in portfolioData.ts
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
      slug: 'greenville-sc-wedding-family-farm',
      title: 'Brook & Ethan | Family Farm Wedding in Greenville, SC',
      name: 'Brook & Ethan',
      venue: 'Family Farm',
    },
    {
      slug: 'raleigh-nc-wedding-backyard',
      title: 'Autumn & Robby | Backyard Wedding in Raleigh, NC',
      name: 'Autumn & Robby',
      venue: 'Backyard',
    },
    {
      slug: 'spartanburg-sc-wedding-adelaide-venue',
      title: 'Abby & Dawson | Wedding at Adelaide Venue in Spartanburg, SC',
      name: 'Abby & Dawson Bishop',
      venue: 'Adelaide Venue',
    },
    {
      slug: 'townville-sc-wedding-the-venue-at-edgewood',
      title: 'Lillie & Jake | Wedding at The Venue at Edgewood in Townville, SC',
      name: 'Lillie & Jake',
      venue: 'The Venue at Edgewood',
    },
  ],
  Engagement: [],
  Family: [
    {
      slug: 'lyman-sc-family-portraits-countryside',
      title: 'The Burnettes | Countryside Family Portraits in Lyman, SC',
      name: 'The Burnettes',
      venue: 'Countryside',
    },
  ],
  Maternity: [
    {
      slug: 'hartsville-sc-maternity-lake-robinson',
      title: 'Cait & Davis | Maternity at Lake Robinson in Hartsville, SC',
      name: 'Cait & Davis',
      venue: 'Lake Robinson',
    },
  ],
  Portraits: [
    {
      slug: 'landrum-sc-portraits-countryside',
      title: 'Brooke & Kip | Countryside Portraits in Landrum, SC',
      name: 'Brooke & Kip',
      venue: 'Countryside',
    },
    {
      slug: 'greenville-sc-couples-portraits-furman-university',
      title: 'Lilly & Tyler | Couples Portraits at Furman University in Greenville, SC',
      name: 'Lilly & Tyler',
      venue: 'Furman University',
    },
    {
      slug: 'greenville-sc-portraits-backyard',
      title: 'Hannah & Collin | Backyard Portraits in Greenville, SC',
      name: 'Hannah & Collin',
      venue: 'Backyard',
    },
    {
      slug: 'greenville-sc-portraits-furman-university',
      title: 'Katelyn | Portraits at Furman University in Greenville, SC',
      name: 'Katelyn',
      venue: 'Furman University',
    },
  ],
  Seniors: [
    {
      slug: 'greenville-sc-senior-pictures-furman-university',
      title: 'Searlait | Senior Pictures at Furman University in Greenville, SC',
      name: 'Searlait',
      venue: 'Furman University',
    },
  ],
};
