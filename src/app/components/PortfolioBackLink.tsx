import Link from 'next/link';

type PortfolioBackLinkProps = {
  href: string;
  label: string;
};

export default function PortfolioBackLink({
  href,
  label,
}: PortfolioBackLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 font-sans text-sm text-moss transition hover:text-ink sm:w-fit sm:justify-start sm:text-base"
    >
      <svg
        className="h-5 w-5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {label}
    </Link>
  );
}
