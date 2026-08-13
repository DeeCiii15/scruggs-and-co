import type { Metadata } from 'next';
import {
  PRIMARY_CITY,
  PRIMARY_REGION,
  PRIMARY_STATE_ABBR,
  SITE_NAME,
} from '@/lib/siteConfig';

const PORTFOLIO_TITLE = `Photography Portfolio in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} | ${SITE_NAME}`;

export const metadata: Metadata = {
  title: {
    absolute: PORTFOLIO_TITLE,
  },
  description: `Wedding, elopement, engagement, portrait, & event galleries from ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the ${PRIMARY_REGION}. Natural light & honest color by ${SITE_NAME}.`,
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: PORTFOLIO_TITLE,
    description: `Browse wedding, elopement, engagement, portrait, & event photography across the ${PRIMARY_REGION} & ${PRIMARY_STATE_ABBR}.`,
    url: '/portfolio',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
