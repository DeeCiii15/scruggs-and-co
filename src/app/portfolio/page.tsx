import type { Metadata } from 'next';
import PortfolioHomeGallery from '../components/PortfolioHomeGallery';
import PortfolioPageShell from '../components/PortfolioPageShell';
import { resolveLegacyPortfolioRedirect } from '@/lib/portfolioSeo';
import { pageShareMeta } from '@/lib/shareMeta';
import {
  PRIMARY_CITY,
  PRIMARY_REGION,
  PRIMARY_STATE_ABBR,
  SITE_NAME,
} from '@/lib/siteConfig';
import { redirect } from 'next/navigation';

const PORTFOLIO_TITLE = `Photography Galleries in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} | ${SITE_NAME}`;
const PORTFOLIO_DESCRIPTION = `Wedding, engagement, family, maternity, portrait, & senior galleries from ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the Upstate. Natural light & honest color by ${SITE_NAME}.`;
const portfolioShare = pageShareMeta({
  title: PORTFOLIO_TITLE,
  description: `Browse wedding, engagement, family, maternity, portrait, & senior photography across the ${PRIMARY_REGION} & ${PRIMARY_STATE_ABBR}.`,
  url: '/portfolio',
});

export const metadata: Metadata = {
  title: {
    absolute: PORTFOLIO_TITLE,
  },
  description: PORTFOLIO_DESCRIPTION,
  alternates: { canonical: '/portfolio' },
  ...portfolioShare,
};

type PortfolioPageProps = {
  searchParams: Promise<{ category?: string; shoot?: string }>;
};

export default async function PortfolioPage({
  searchParams,
}: PortfolioPageProps) {
  const params = await searchParams;
  const legacyPath = resolveLegacyPortfolioRedirect(
    params.category,
    params.shoot,
  );
  if (legacyPath) redirect(legacyPath);

  return (
    <PortfolioPageShell>
      <section
        className="scroll-mt-24 border-t border-ink/8 px-5 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20"
        aria-label="Portfolio galleries"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-xl lg:mb-10">
            <p className="font-script text-3xl text-moss">galleries</p>
            <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">
              Photography galleries
            </h1>
            <p className="mt-4 font-sans text-sm font-light leading-relaxed text-ink-soft">
              Documentary wedding and lifestyle frames—linger, then wander
              deeper.
            </p>
          </div>
          <PortfolioHomeGallery variant="portfolio" />
        </div>
      </section>
    </PortfolioPageShell>
  );
}
