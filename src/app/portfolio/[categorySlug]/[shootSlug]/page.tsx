import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PortfolioShootBackLink from '../../../components/PortfolioShootBackLink';
import PortfolioRelatedLinks from '../../../components/PortfolioRelatedLinks';
import { PortfolioShootJsonLd } from '../../../components/PortfolioGalleryJsonLd';
import PortfolioPageShell from '../../../components/PortfolioPageShell';
import PortfolioPhotoGrid from '../../../components/PortfolioPhotoGrid';
import {
  getCategoryByFolder,
  getShootInCategory,
  getShootPhotos,
  PORTFOLIO_CATEGORY_DEFS,
  portfolioCategoryHref,
} from '@/lib/portfolioData';
import { shootMetadata } from '@/lib/portfolioSeo';

type ShootPageProps = {
  params: Promise<{ categorySlug: string; shootSlug: string }>;
};

export function generateStaticParams() {
  return PORTFOLIO_CATEGORY_DEFS.flatMap((category) =>
    category.shoots.map((shoot) => ({
      categorySlug: category.folder,
      shootSlug: shoot.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: ShootPageProps): Promise<Metadata> {
  const { categorySlug, shootSlug } = await params;
  const category = getCategoryByFolder(categorySlug);
  const shoot = category
    ? getShootInCategory(category.name, shootSlug)
    : undefined;
  if (!category || !shoot) return {};

  const meta = shootMetadata(category, shoot);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.path },
    openGraph: meta.openGraph,
  };
}

export default async function PortfolioShootPage({ params }: ShootPageProps) {
  const { categorySlug, shootSlug } = await params;
  const category = getCategoryByFolder(categorySlug);
  const shoot = category
    ? getShootInCategory(category.name, shootSlug)
    : undefined;
  if (!category || !shoot) notFound();

  const photos = getShootPhotos(category.name, shoot.slug);

  return (
    <PortfolioPageShell>
      <PortfolioShootJsonLd category={category} shoot={shoot} />
      <section
        className="border-t border-gray-200 bg-gray-50 px-6 py-16 dark:border-gray-700 dark:bg-gray-900 sm:px-10 lg:px-16 lg:py-20"
        aria-label={shoot.title}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:mb-14">
            <div className="flex flex-col gap-4">
              <PortfolioShootBackLink
                defaultHref={portfolioCategoryHref(category.folder)}
                defaultLabel={`Back to ${category.name}`}
              />
              <PortfolioRelatedLinks
                categoryName={category.name}
                shootSlug={shoot.slug}
              />
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 sm:text-right">
                {category.name}
              </p>
              <h1 className="mt-2 font-sans text-2xl font-medium text-gray-900 dark:text-gray-100 md:text-3xl lg:text-[2.35rem]">
                {shoot.title}
              </h1>
              {shoot.description ? (
                <p className="mt-3 max-w-md font-sans text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400 sm:ml-auto sm:text-right">
                  {shoot.description}
                </p>
              ) : null}
            </div>
          </div>
          <PortfolioPhotoGrid photos={photos} />
        </div>
      </section>
    </PortfolioPageShell>
  );
}
