/**
 * Portfolio galleries: category → shoots → photos.
 *
 * Upload layout:
 *   public/images/galleries/{category-folder}/{shoot-slug}/
 *     cover.jpg or cover.jpeg   ← polaroid thumbnail + first gallery image
 *     01.jpg      ← gallery photo
 *     02.jpg      ← …
 *
 * Then register the shoot in portfolioShoots.ts and run: npm run galleries:sync
 */

import { SHOOTS_BY_CATEGORY, type PortfolioShootDef, shootGalleryLabel } from './portfolioShoots';
import galleryManifest from './galleryManifest.json';
import { shootHeadline, shootPageDescription, shootPlace, shootWho } from './shootCopy';
import { PRIMARY_CITY, PRIMARY_STATE_ABBR } from './siteConfig';

type ShootManifestEntry = { cover: string | null; photos: string[] };
type GalleryManifest = Record<string, Record<string, ShootManifestEntry>>;

const MANIFEST = galleryManifest as GalleryManifest;

function getShootManifest(
  categoryFolder: string,
  shootSlug: string,
): ShootManifestEntry | undefined {
  return MANIFEST[categoryFolder]?.[shootSlug];
}

export type PortfolioPhoto = {
  id: string;
  src: string;
  alt: string;
  category: string;
  shoot: string;
};

export type PortfolioCategoryDef = {
  name: string;
  /** On-page body blurb under the category H1 */
  description: string;
  /** Dedicated SEO / Open Graph description (≤160 chars preferred) */
  metaDescription: string;
  homeTagline: string;
  folder: string;
  coverSrc: string;
  shoots: PortfolioShootDef[];
  /** Visible H1 on the category page (defaults to name) */
  pageHeading?: string;
  /** Relative document title segment (template appends | SITE_NAME) */
  metaTitle?: string;
  /** Full document title when set (absolute — skips layout template) */
  documentTitle?: string;
};

export type PortfolioShootCard = {
  category: string;
  categoryFolder: string;
  slug: string;
  title: string;
  /** Short polaroid caption (first names when available) */
  label: string;
  description: string;
  image: string;
  href: string;
};

/** Category → folder under public/images/galleries/ */
export const GALLERY_UPLOAD_FOLDERS: Record<string, string> = {
  Weddings: 'weddings',
  Engagement: 'engagement',
  Family: 'family',
  Maternity: 'maternity',
  Portraits: 'portraits',
  Seniors: 'seniors',
};

/** Fallback polaroid covers when a category has no shoots yet */
const LEGACY_CATEGORY_COVERS: Record<string, string> = {
  Weddings: '/images/miscellaneous-site-photos/wedding_1.jpg',
  Engagement: '/images/miscellaneous-site-photos/engagement_1.jpg',
  Family: '/images/miscellaneous-site-photos/inspiration_3.jpg',
  Maternity: '/images/miscellaneous-site-photos/inspiration_1.jpg',
  Portraits: '/images/miscellaneous-site-photos/portrait_1.jpg',
  Seniors: '/images/miscellaneous-site-photos/hero_5.jpg',
};

export function shootImageSrc(
  categoryFolder: string,
  shootSlug: string,
  filename: string,
): string {
  return `/images/galleries/${categoryFolder}/${shootSlug}/${filename}`;
}

export function shootCoverSrc(
  categoryFolder: string,
  shoot: PortfolioShootDef,
): string {
  const manifest = getShootManifest(categoryFolder, shoot.slug);
  const file = manifest?.cover ?? manifest?.photos[0] ?? 'cover.jpg';
  return shootImageSrc(categoryFolder, shoot.slug, file);
}

export function shootGallerySrc(
  categoryFolder: string,
  shootSlug: string,
  filename: string,
): string {
  return shootImageSrc(categoryFolder, shootSlug, filename);
}

function getCategoryCoverSrc(
  categoryName: string,
  folder: string,
  shoots: PortfolioShootDef[],
): string {
  if (shoots.length > 0) {
    return shootCoverSrc(folder, shoots[0]!);
  }
  return (
    LEGACY_CATEGORY_COVERS[categoryName] ??
    `/images/galleries/${folder}/cover.jpg`
  );
}

function buildShootPhotos(
  categoryName: string,
  categoryFolder: string,
  shoot: PortfolioShootDef,
): PortfolioPhoto[] {
  const manifest = getShootManifest(categoryFolder, shoot.slug);
  if (!manifest) return [];

  const cover = manifest.cover;
  const rest = cover
    ? manifest.photos.filter((filename) => filename !== cover)
    : manifest.photos;
  const filenames = cover ? [cover, ...rest] : rest;
  if (!filenames.length) return [];

  return filenames.map((filename, i) => ({
    id: `${shoot.slug}-${i + 1}`,
    src: shootGallerySrc(categoryFolder, shoot.slug, filename),
    alt: `${shootWho(shoot)}, ${categoryName} photography in ${shootPlace(shoot)} — image ${i + 1}`,
    category: categoryName,
    shoot: shootWho(shoot),
  }));
}

const CATEGORY_COPY: Omit<PortfolioCategoryDef, 'folder' | 'coverSrc' | 'shoots'>[] =
  [
    {
      name: 'Weddings',
      description:
        'Documentary wedding galleries—vows, details, golden light, and the soft in-between frames that become forever moments.',
      metaDescription:
        'Wedding photography portfolios from Chesnee, SC & the Upstate—documentary wedding-day galleries in natural light by Scruggs & Co Photo.',
      homeTagline: 'Documentary wedding days',
      pageHeading: 'Wedding photography galleries',
      metaTitle: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} Wedding Galleries`,
    },
    {
      name: 'Engagement',
      description:
        'Easy love, soft light, and room to laugh—engagement sessions that feel like you, not a pose.',
      metaDescription:
        'Engagement photography portfolios from Chesnee, SC & the Upstate—engagement galleries in honest light by Scruggs & Co Photo.',
      homeTagline: 'Easy love, soft light',
      pageHeading: 'Engagement photography galleries',
      metaTitle: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} Engagement Galleries`,
    },
    {
      name: 'Family',
      description:
        'The pile-on, the kid who will not look at the camera, the laugh when you stop trying—family galleries that look like you.',
      metaDescription:
        'Family photography portfolios from Chesnee, SC & the Upstate—unhurried family galleries in natural light by Scruggs & Co Photo.',
      homeTagline: 'The everyday forever moments',
      pageHeading: 'Family photography galleries',
      metaTitle: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} Family Galleries`,
    },
    {
      name: 'Maternity',
      description:
        'This quiet, anticipating season—bump, partner, and the feeling that everything is about to change.',
      metaDescription:
        'Maternity photography portfolios from Chesnee, SC & the Upstate—soft documentary bump galleries by Scruggs & Co Photo.',
      homeTagline: 'Quiet anticipation',
      pageHeading: 'Maternity photography galleries',
      metaTitle: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} Maternity Galleries`,
    },
    {
      name: 'Portraits',
      description:
        'Just you—soft light and room to breathe. Lifestyle portraits that feel like a compliment, not a performance.',
      metaDescription:
        'Portrait photography portfolios from Chesnee, SC & the Upstate—individual lifestyle galleries by Scruggs & Co Photo.',
      homeTagline: 'Lifestyle & portraits',
      pageHeading: 'Portrait photography galleries',
      metaTitle: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} Portrait Galleries`,
    },
    {
      name: 'Seniors',
      description:
        'Cap, gown, letter jacket, or just you at the end of this chapter—senior galleries that feel like now.',
      metaDescription:
        'Senior photography portfolios from Chesnee, SC & the Upstate—graduation & senior galleries by Scruggs & Co Photo.',
      homeTagline: 'This chapter, documented',
      pageHeading: 'Senior photography galleries',
      metaTitle: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} Senior Galleries`,
    },
  ];

export const PORTFOLIO_CATEGORY_DEFS: PortfolioCategoryDef[] = CATEGORY_COPY.map(
  (cat) => {
    const folder = GALLERY_UPLOAD_FOLDERS[cat.name]!;
    const shoots = SHOOTS_BY_CATEGORY[cat.name] ?? [];
    return {
      ...cat,
      folder,
      shoots,
      coverSrc: getCategoryCoverSrc(cat.name, folder, shoots),
    };
  },
);

export function getCategoryByName(name: string): PortfolioCategoryDef | undefined {
  return PORTFOLIO_CATEGORY_DEFS.find((c) => c.name === name);
}

export function getCategoryByFolder(
  folderSlug: string,
): PortfolioCategoryDef | undefined {
  return PORTFOLIO_CATEGORY_DEFS.find((c) => c.folder === folderSlug);
}

export function portfolioCategoryHref(categoryFolder: string): string {
  return `/portfolio/${categoryFolder}`;
}

export function portfolioShootHref(
  categoryFolder: string,
  shootSlug: string,
): string {
  return `/portfolio/${categoryFolder}/${shootSlug}`;
}

export function getShootInCategory(
  categoryName: string,
  shootSlug: string,
): PortfolioShootDef | undefined {
  return SHOOTS_BY_CATEGORY[categoryName]?.find((s) => s.slug === shootSlug);
}

export function getShootCards(categoryName: string): PortfolioShootCard[] {
  const category = getCategoryByName(categoryName);
  if (!category) return [];

  return category.shoots.map((shoot) => ({
    category: category.name,
    categoryFolder: category.folder,
    slug: shoot.slug,
    title: shootHeadline(shoot),
    label: shootGalleryLabel(shoot),
    description: shootPageDescription(category, shoot),
    image: shootCoverSrc(category.folder, shoot),
    href: portfolioShootHref(category.folder, shoot.slug),
  }));
}

export function getShootPhotos(
  categoryName: string,
  shootSlug: string,
): PortfolioPhoto[] {
  const category = getCategoryByName(categoryName);
  const shoot = getShootInCategory(categoryName, shootSlug);
  if (!category || !shoot) return [];
  return buildShootPhotos(category.name, category.folder, shoot);
}

export const PORTFOLIO_CATEGORIES_FOR_UI = PORTFOLIO_CATEGORY_DEFS.map((c) => ({
  name: c.name,
  description: c.description,
  image: c.coverSrc,
}));

export const PORTFOLIO_HOME_CARDS = PORTFOLIO_CATEGORY_DEFS.map((c) => ({
  name: c.name,
  image: c.coverSrc,
  tagline: c.homeTagline,
  href: portfolioCategoryHref(c.folder),
}));

export const PORTFOLIO_HOME_CARDS_CENTERED = (() => {
  const wedding = PORTFOLIO_HOME_CARDS.find((c) => c.name === 'Weddings')!;
  const rest = PORTFOLIO_HOME_CARDS.filter((c) => c.name !== 'Weddings');
  return [...rest.slice(0, 4), wedding, ...rest.slice(4)];
})();

/** Footer gallery nav — matches service portfolio categories */
export const FOOTER_PORTFOLIO_LINKS = (
  [
    ['Weddings', 'Weddings'],
    ['Engagement', 'Engagement'],
    ['Family', 'Family'],
    ['Maternity', 'Maternity'],
    ['Portraits', 'Portraits'],
    ['Seniors', 'Seniors'],
  ] as const
).map(([categoryName, label]) => ({
  label,
  href: portfolioCategoryHref(GALLERY_UPLOAD_FOLDERS[categoryName]!),
}));
