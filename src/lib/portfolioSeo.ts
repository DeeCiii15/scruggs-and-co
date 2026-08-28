import {
  getCategoryByName,
  getShootInCategory,
  PORTFOLIO_CATEGORY_DEFS,
  shootCoverSrc,
  type PortfolioCategoryDef,
} from './portfolioData';
import type { PortfolioShootDef } from './portfolioShoots';
import { pageShareMeta } from './shareMeta';
import {
  DEFAULT_OG_IMAGE_PATH,
  PRIMARY_CITY,
  PRIMARY_REGION,
  PRIMARY_STATE_ABBR,
  SITE_NAME,
} from './siteConfig';

export function portfolioCategoryPath(categoryFolder: string): string {
  return `/portfolio/${categoryFolder}`;
}

export function portfolioShootPath(
  categoryFolder: string,
  shootSlug: string,
): string {
  return `/portfolio/${categoryFolder}/${shootSlug}`;
}

export function categoryMetadata(category: PortfolioCategoryDef) {
  const path = portfolioCategoryPath(category.folder);
  const description = category.metaDescription;
  const ogTitle =
    category.documentTitle ??
    `${category.metaTitle ?? category.pageHeading ?? `${category.name} Portfolio`} | ${SITE_NAME}`;
  const share = pageShareMeta({
    title: ogTitle,
    description,
    url: path,
    image: category.coverSrc || DEFAULT_OG_IMAGE_PATH,
    imageAlt: `${category.name} photography by ${SITE_NAME}`,
  });

  if (category.documentTitle) {
    return {
      title: { absolute: category.documentTitle },
      description,
      path,
      openGraph: share.openGraph,
      twitter: share.twitter,
    };
  }

  const title =
    category.metaTitle ??
    category.pageHeading ??
    `${category.name} Portfolio`;
  return {
    title,
    description,
    path,
    openGraph: share.openGraph,
    twitter: share.twitter,
  };
}

export function shootMetadata(
  category: PortfolioCategoryDef,
  shoot: PortfolioShootDef,
) {
  const title = shoot.title;
  const description =
    shoot.description?.trim() ||
    `${shoot.title} — ${category.name.toLowerCase()} photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the ${PRIMARY_REGION} by ${SITE_NAME}.`;
  const path = portfolioShootPath(category.folder, shoot.slug);
  const cover = shootCoverSrc(category.folder, shoot);
  const share = pageShareMeta({
    title: `${title} | ${category.name} | ${SITE_NAME}`,
    description: description.slice(0, 200),
    url: path,
    image: cover || DEFAULT_OG_IMAGE_PATH,
    imageAlt: `${shoot.title} — ${category.name} by ${SITE_NAME}`,
  });

  return {
    title,
    description: description.slice(0, 160),
    path,
    openGraph: share.openGraph,
    twitter: share.twitter,
  };
}

export type PortfolioSitemapEntry = {
  path: string;
  priority: number;
};

/** All indexable portfolio URLs for sitemap.xml */
export function getPortfolioSitemapEntries(): PortfolioSitemapEntry[] {
  const entries: PortfolioSitemapEntry[] = [
    { path: '/portfolio', priority: 0.85 },
  ];

  for (const category of PORTFOLIO_CATEGORY_DEFS) {
    if (category.shoots.length === 0) continue;
    entries.push({
      path: portfolioCategoryPath(category.folder),
      priority: 0.8,
    });
    for (const shoot of category.shoots) {
      entries.push({
        path: portfolioShootPath(category.folder, shoot.slug),
        priority: 0.75,
      });
    }
  }

  return entries;
}

export function resolveLegacyPortfolioRedirect(
  categoryName: string | undefined,
  shootSlug: string | undefined,
): string | null {
  if (!categoryName) return null;
  const category = getCategoryByName(categoryName);
  if (!category) return null;
  if (shootSlug) {
    const shoot = getShootInCategory(categoryName, shootSlug);
    if (!shoot) return portfolioCategoryPath(category.folder);
    return portfolioShootPath(category.folder, shoot.slug);
  }
  return portfolioCategoryPath(category.folder);
}
