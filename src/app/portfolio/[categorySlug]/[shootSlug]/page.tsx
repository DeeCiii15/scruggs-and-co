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
import { shootHeadline, shootPageDescription } from '@/lib/shootCopy';

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
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: meta.path },
    openGraph: meta.openGraph,
    ...(meta.twitter ? { twitter: meta.twitter } : {}),
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
        className="scroll-mt-24 border-t border-ink/8 px-5 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20"
        aria-label={shootHeadline(shoot)}
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
              <p className="font-script text-3xl text-moss sm:text-right">
                {category.name}
              </p>
              <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">
                {shootHeadline(shoot)}
              </h1>
              <p className="mt-3 max-w-md font-sans text-sm font-light leading-relaxed text-ink-soft sm:ml-auto sm:text-right">
                {shootPageDescription(category, shoot)}
              </p>
            </div>
          </div>
          <PortfolioPhotoGrid photos={photos} />
        </div>
      </section>
    </PortfolioPageShell>
  );
}
