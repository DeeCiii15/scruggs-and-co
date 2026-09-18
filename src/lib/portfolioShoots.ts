/**
 * Register each photo shoot here (folder must exist under public/images/galleries/).
 * Then run: npm run galleries:sync
 *
 * title       — on-page H1 + document title (Taylor-style: names at the place)
 * description — on-page blurb + meta description
 * name        — couple/client names for polaroid labels
 * venue       — venue or setting name
 */

export type PortfolioShootDef = {
  /** Folder name — must match public/images/galleries/{category}/{slug}/ */
  slug: string;
  /** Display title, e.g. "Katie & Cannon at Falls Park" */
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
      title: 'Brook & Ethan at the family farm',
      name: 'Brook & Ethan',
      venue: 'Family Farm',
      description:
        'Brook & Ethan’s family-farm wedding in Greenville, SC—an outdoor ceremony under the trees, sage dresses, cowboy boots, & joy you can hear from the back row.',
    },
    {
      slug: 'raleigh-nc-wedding-backyard',
      title: 'Autumn & Robby in a Raleigh backyard',
      name: 'Autumn & Robby',
      venue: 'Backyard',
      description:
        'Autumn & Robby’s backyard wedding in Raleigh, NC—glow sticks on the dance floor, a sparkly mini for the party, & a house full of the people who love them most.',
    },
    {
      slug: 'spartanburg-sc-wedding-adelaide-venue',
      title: 'Abby & Dawson at Adelaide Venue',
      name: 'Abby & Dawson Bishop',
      venue: 'Adelaide Venue',
      description:
        'Abby & Dawson at Adelaide Venue in Spartanburg, SC—getting-ready jitters, a Diet Coke on the settee, & the real in-between that made their day feel like them.',
    },
    {
      slug: 'townville-sc-wedding-the-venue-at-edgewood',
      title: 'Lillie & Jake at The Venue at Edgewood',
      name: 'Lillie & Jake',
      venue: 'The Venue at Edgewood',
      description:
        'Lillie & Jake at The Venue at Edgewood in Townville, SC—fall woods, a wooden deck, & a quiet forehead-to-forehead before walking back into the party.',
    },
  ],
  Engagement: [
    {
      slug: 'chesnee-sc-engagement-backyard',
      title: 'Garrett & Allie in a Chesnee backyard',
      name: 'Garrett & Allie',
      venue: 'Backyard',
      description:
        'Garrett & Allie’s backyard engagement in Chesnee, SC—string lights on the cabin, a brand-new ring, & easy smiles in the grass they already know by heart.',
    },
    {
      slug: 'greenville-sc-engagement-falls-park',
      title: 'Katie & Cannon at Falls Park',
      name: 'Katie & Cannon',
      venue: 'Falls Park',
      description:
        'Katie & Cannon at Falls Park in Greenville, SC—the down-on-one-knee surprise, her hands over her mouth, & all the shaking-happy seconds right after yes.',
    },
    {
      slug: 'spartanburg-sc-engagement-lions-gate-manor',
      title: 'Emily & Cole at Lions Gate Manor',
      name: 'Emily & Cole',
      venue: 'Lions Gate Manor',
      description:
        'Emily & Cole at Lions Gate Manor in Spartanburg, SC—a quiet forehead-to-forehead by the pond, woods all around, & the kind of still that doesn’t need a pose.',
    },
  ],
  Family: [
    {
      slug: 'lyman-sc-family-portraits-countryside',
      title: 'The Burnettes in the Lyman countryside',
      name: 'The Burnettes',
      venue: 'Countryside',
      description:
        'The Burnettes in the Lyman, SC countryside—a toddler on Dad’s shoulders, a baby on the hip, & a wooden fence with the whole evening stretching out behind them.',
    },
  ],
  Maternity: [
    {
      slug: 'hartsville-sc-maternity-lake-robinson',
      title: 'Cait & Davis at Lake Robinson',
      name: 'Cait & Davis',
      venue: 'Lake Robinson',
      description:
        'Cait & Davis at Lake Robinson in Hartsville, SC—bare feet in the grass, a hand on the bump, & late light on the water in this quiet season before baby.',
    },
  ],
  Portraits: [
    {
      slug: 'landrum-sc-portraits-countryside',
      title: 'Brooke & Kip in the Landrum countryside',
      name: 'Brooke & Kip',
      venue: 'Countryside',
      description:
        'Brooke & Kip in the Landrum, SC countryside—a cut hayfield, the mountain behind them, & spinning each other around until the sun drops.',
    },
    {
      slug: 'greenville-sc-couples-portraits-furman-university',
      title: 'Lilly & Tyler at Furman University',
      name: 'Lilly & Tyler',
      venue: 'Furman University',
      description:
        'Lilly & Tyler at Furman University in Greenville, SC—hand in hand past the lily pond, a look back over the shoulder, & an easy walk that needed no directing.',
    },
    {
      slug: 'greenville-sc-portraits-backyard',
      title: 'Hannah & Collin in a Greenville backyard',
      name: 'Hannah & Collin',
      venue: 'Backyard',
      description:
        'Hannah & Collin in a Greenville backyard—barefoot in the grass, crepe myrtle along the fence, & the kind of laugh you only get when nobody’s trying too hard.',
    },
    {
      slug: 'greenville-sc-portraits-furman-university',
      title: 'Katelyn at Furman University',
      name: 'Katelyn',
      venue: 'Furman University',
      description:
        'Katelyn at Furman University in Greenville, SC—perched on the lily-pond edge, evening light on the stone, & a smile that didn’t have to be asked for.',
    },
  ],
  Seniors: [
    {
      slug: 'greenville-sc-senior-pictures-furman-university',
      title: 'Searlait at Furman University',
      name: 'Searlait',
      venue: 'Furman University',
      description:
        'Searlait at Furman University in Greenville, SC—denim, sneakers, a little scarf, & late light by the garden pond that feels like her, not a yearbook pose.',
    },
  ],
};
