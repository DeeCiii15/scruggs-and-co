import Navigation from './Navigation';
import SiteFooter from './SiteFooter';
import HomeStylePageIntro from './HomeStylePageIntro';

type PortfolioPageShellProps = {
  children: React.ReactNode;
};

export default function PortfolioPageShell({
  children,
}: PortfolioPageShellProps) {
  return (
    <div className="min-h-screen bg-paper">
      <Navigation />
      <HomeStylePageIntro />
      <main id="portfolio-main">{children}</main>
      <SiteFooter />
    </div>
  );
}
