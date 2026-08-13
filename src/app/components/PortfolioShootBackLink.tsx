'use client';

import { Suspense } from 'react';
import PortfolioBackLink from './PortfolioBackLink';

type PortfolioShootBackLinkProps = {
  /** Where the back link points (the shoot's own category gallery). */
  defaultHref: string;
  defaultLabel: string;
};

export default function PortfolioShootBackLink(
  props: PortfolioShootBackLinkProps,
) {
  return (
    <Suspense
      fallback={
        <PortfolioBackLink href={props.defaultHref} label={props.defaultLabel} />
      }
    >
      <PortfolioBackLink href={props.defaultHref} label={props.defaultLabel} />
    </Suspense>
  );
}
