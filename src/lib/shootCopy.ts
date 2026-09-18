import {
  shootGalleryLabel,
  type PortfolioShootDef,
} from './portfolioShoots';
import { PRIMARY_CITY, PRIMARY_STATE_ABBR } from './siteConfig';

export type ShootCategoryCopy = {
  name: string;
  homeTagline: string;
  metaTitle?: string;
};

export type ShootVenue = {
  /** Slug tail: backyard, countryside, family-farm, furman-university… */
  key: string | null;
  /** Display name: Backyard, Family Farm, Adelaide Venue… */
  label: string;
  kind: 'setting' | 'named';
  /** Greenville, SC */
  city: string | null;
};

const SETTING_KEYS = new Set([
  'backyard',
  'countryside',
  'family-farm',
  'downtown',
  'field',
]);

const SESSION_PREFIXES = [
  'couples-portraits-',
  'family-portraits-',
  'senior-pictures-',
  'engagement-',
  'maternity-',
  'portraits-',
  'wedding-',
] as const;

const VENUE_LABELS: Record<string, string> = {
  backyard: 'Backyard',
  countryside: 'Countryside',
  'family-farm': 'Family Farm',
  downtown: 'Downtown',
  field: 'Field',
  'lake-robinson': 'Lake Robinson',
  'furman-university': 'Furman University',
  'adelaide-venue': 'Adelaide Venue',
  'the-venue-at-edgewood': 'The Venue at Edgewood',
  'falls-park': 'Falls Park',
  'lions-gate-manor': 'Lions Gate Manor',
};

function titleCase(value: string): string {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

/** City from slug (`lyman-sc-…` → `Lyman, SC`; `raleigh-nc-…` → `Raleigh, NC`). */
export function shootCityFromSlug(slug: string): string | null {
  const match = slug.match(/^([a-z]+(?:-[a-z]+)*)-(sc|nc)(?:-|$)/i);
  if (!match?.[1] || !match[2]) return null;
  return `${titleCase(match[1])}, ${match[2].toUpperCase()}`;
}

/** Last slug segment after city, state, and session type. */
export function slugVenueKey(slug: string): string | null {
  const stripped = slug.replace(/^[a-z]+(?:-[a-z]+)*-(sc|nc)-/i, '');
  if (!stripped || stripped === slug) return null;
  for (const prefix of SESSION_PREFIXES) {
    if (stripped.startsWith(prefix)) {
      return stripped.slice(prefix.length) || null;
    }
  }
  return stripped;
}

function formatVenueLabel(key: string): string {
  return VENUE_LABELS[key] ?? titleCase(key);
}

function venueKeyFromText(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '-');
}

export function shootVenue(shoot: PortfolioShootDef): ShootVenue {
  const city = shootCityFromSlug(shoot.slug);
  const fromSlug = slugVenueKey(shoot.slug);
  const raw = shoot.venue?.trim();
  const fromRaw = raw ? venueKeyFromText(raw) : null;

  const key = fromSlug ?? fromRaw;
  const slugIsSetting = Boolean(fromSlug && SETTING_KEYS.has(fromSlug));
  const rawIsSetting = Boolean(fromRaw && SETTING_KEYS.has(fromRaw));

  let label: string;
  if (slugIsSetting && fromSlug) {
    label = formatVenueLabel(fromSlug);
  } else if (raw && !rawIsSetting) {
    label = raw;
  } else if (fromSlug) {
    label = formatVenueLabel(fromSlug);
  } else if (raw) {
    label = raw;
  } else {
    label = city ?? `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`;
  }

  const kind: ShootVenue['kind'] =
    key && SETTING_KEYS.has(key) ? 'setting' : 'named';

  return { key, label, kind, city };
}

export function shootWho(shoot: PortfolioShootDef): string {
  const fromName = shoot.name?.trim();
  if (fromName) return fromName;
  const fromTitle = shoot.title?.trim();
  if (fromTitle) return fromTitle;
  return 'Gallery';
}

export function shootPlace(shoot: PortfolioShootDef): string {
  const venue = shootVenue(shoot);
  if (venue.kind === 'named' && venue.city && !venue.label.includes(venue.city)) {
    return `${venue.label} in ${venue.city}`;
  }
  if (venue.kind === 'setting' && venue.city) return venue.city;
  return venue.city ?? venue.label;
}

/** On-page H1 and HTML title — names plus place, same as Taylor Rose Reels. */
export function shootHeadline(shoot: PortfolioShootDef): string {
  const fromTitle = shoot.title?.trim();
  if (fromTitle && !fromTitle.includes('|')) return fromTitle;

  const who = shootGalleryLabel(shoot) || shootWho(shoot);
  const venue = shootVenue(shoot);
  if (venue.kind === 'setting') {
    if (venue.key === 'backyard' && venue.city) {
      return `${who} in a ${venue.city.replace(/,.*$/, '')} backyard`;
    }
    if (venue.key === 'backyard') return `${who} in a backyard`;
    if (venue.key === 'family-farm') return `${who} at the family farm`;
    if (venue.key === 'countryside' && venue.city) {
      return `${who} in the ${venue.city.replace(/,.*$/, '')} countryside`;
    }
    if (venue.key === 'countryside') return `${who} in the countryside`;
    if (venue.key === 'downtown' && venue.city) {
      return `${who} in Downtown ${venue.city.replace(/,.*$/, '')}`;
    }
    if (venue.key === 'downtown') return `${who} downtown`;
    return `${who} in the ${venue.label.toLowerCase()}`;
  }
  return `${who} at ${venue.label}`;
}

/** Document title matches the H1. Do not append the brand here. */
export function shootDocumentTitle(
  _category: ShootCategoryCopy,
  shoot: PortfolioShootDef,
): string {
  return shootHeadline(shoot);
}

function inSetting(shoot: PortfolioShootDef, venue: ShootVenue): string {
  const city = venue.city;
  if (venue.key === 'countryside' && city) return `the ${city} countryside`;
  if (venue.key === 'backyard' && city) return `a ${city} backyard`;
  if (venue.key === 'family-farm' && city) return `a family farm in ${city}`;
  if (venue.kind === 'named' && city) return `${venue.label} in ${city}`;
  if (venue.kind === 'named') return venue.label;
  return city ?? venue.label;
}

/**
 * Unique meta + on-page blurb from name, venue, session type, and city.
 */
export function shootPageDescription(
  category: ShootCategoryCopy,
  shoot: PortfolioShootDef,
): string {
  const custom = shoot.description?.trim();
  if (custom) return custom;

  const who = shootWho(shoot);
  const venue = shootVenue(shoot);
  const where = inSetting(shoot, venue);
  const couples = shoot.slug.includes('couples-portraits');

  switch (category.name) {
    case 'Family':
      return `${who} in ${where}—unhurried family portraits, real laughs, & room to just be yourselves.`;
    case 'Engagement':
      return `${who} in ${where}—easy love, soft light, & the quiet in-between that doesn’t need a pose.`;
    case 'Weddings':
      if (venue.key === 'backyard') {
        return `${who} said I do in ${where}—an easy celebration, honest light, & the people who love them most.`;
      }
      return `${who} at ${where}—vows, details, & the in-between, documented as it unfolded.`;
    case 'Maternity':
      return `${who} at ${where}—this quiet, anticipating season, photographed in natural light.`;
    case 'Portraits':
      if (couples) {
        return `${who} at ${where}—easy love, soft light, & room to laugh.`;
      }
      return `${who} in ${where}—lifestyle portraits in soft light, with room to breathe.`;
    case 'Seniors':
      return `${who} at ${where}—senior portraits that feel like you, not a yearbook pose.`;
    default:
      return `${who} — ${category.name.toLowerCase()} photography in ${where}.`;
  }
}
