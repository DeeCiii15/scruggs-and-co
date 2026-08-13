import {
  PRIMARY_STATE,
  PRIMARY_STATE_ABBR,
  SERVICE_AREA_PAGE_LABEL,
} from './siteConfig';

/**
 * Service area location landing pages for the regional map.
 * Set `status: 'live'` when a city page ships.
 * Map x/y are percentage positions within the illustrated region.
 */
export type WeddingLocationStatus = 'live' | 'soon';

export type WeddingLocation = {
  id: string;
  city: string;
  path: string;
  status: WeddingLocationStatus;
  x: number;
  y: number;
  featured?: boolean;
};

export const WEDDING_LOCATIONS: WeddingLocation[] = [
  {
    id: 'chesnee',
    city: 'Chesnee',
    path: '/chesnee-sc-wedding-photography',
    status: 'soon',
    x: 48,
    y: 42,
    featured: true,
  },
  {
    id: 'spartanburg',
    city: 'Spartanburg',
    path: '/spartanburg-sc-wedding-photography',
    status: 'soon',
    x: 42,
    y: 52,
  },
  {
    id: 'greenville',
    city: 'Greenville',
    path: '/greenville-sc-wedding-photography',
    status: 'soon',
    x: 28,
    y: 48,
  },
  {
    id: 'greer',
    city: 'Greer',
    path: '/greer-sc-wedding-photography',
    status: 'soon',
    x: 34,
    y: 40,
  },
  {
    id: 'boiling-springs',
    city: 'Boiling Springs',
    path: '/boiling-springs-sc-wedding-photography',
    status: 'soon',
    x: 44,
    y: 36,
  },
  {
    id: 'gaffney',
    city: 'Gaffney',
    path: '/gaffney-sc-wedding-photography',
    status: 'soon',
    x: 58,
    y: 38,
  },
  {
    id: 'anderson',
    city: 'Anderson',
    path: '/anderson-sc-wedding-photography',
    status: 'soon',
    x: 22,
    y: 62,
  },
  {
    id: 'columbia',
    city: 'Columbia',
    path: '/columbia-sc-wedding-photography',
    status: 'soon',
    x: 62,
    y: 72,
  },
  {
    id: 'charleston',
    city: 'Charleston',
    path: '/charleston-sc-wedding-photography',
    status: 'soon',
    x: 72,
    y: 84,
  },
];

export function weddingLocationTitle(city: string, short = false): string {
  const place = short
    ? `${city}, ${PRIMARY_STATE_ABBR}`
    : `${city}, ${PRIMARY_STATE}`;
  return `${place} ${SERVICE_AREA_PAGE_LABEL}`;
}

export function getLiveWeddingLocations(): WeddingLocation[] {
  return WEDDING_LOCATIONS.filter((location) => location.status === 'live');
}

export function getWeddingLocationById(
  id: string,
): WeddingLocation | undefined {
  return WEDDING_LOCATIONS.find((location) => location.id === id);
}

/**
 * Match a shoot slug to a live location page when city landing pages ship.
 * Longer ids win so `lakeview` matches before a hypothetical `lake`.
 */
export function getLiveWeddingLocationForShoot(
  shootSlug: string,
): WeddingLocation | undefined {
  const live = [...getLiveWeddingLocations()].sort(
    (a, b) => b.id.length - a.id.length,
  );
  return live.find(
    (location) =>
      shootSlug === location.id ||
      shootSlug.startsWith(`${location.id}-`),
  );
}
