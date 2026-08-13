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
      className="inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-sm border border-gray-300 bg-white px-7 py-3 font-sans text-xl text-gray-900 transition hover:bg-gray-50 sm:w-fit sm:justify-start sm:px-8 sm:text-2xl"
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
