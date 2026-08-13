import PortfolioHomeGallery from '../components/PortfolioHomeGallery';
import PortfolioPageShell from '../components/PortfolioPageShell';
import { resolveLegacyPortfolioRedirect } from '@/lib/portfolioSeo';
import { redirect } from 'next/navigation';

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
              See the latest work
            </h1>
            <p className="mt-4 font-sans text-sm font-light leading-relaxed text-ink-soft">
              Documentary wedding and lifestyle frames—linger, then wander deeper.
            </p>
          </div>
          <PortfolioHomeGallery variant="portfolio" />
        </div>
      </section>
    </PortfolioPageShell>
  );
}
