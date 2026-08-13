import type { SocialNetwork } from '@/lib/siteSocial';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth={1.35}
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx="12"
        cy="12"
        r="3.75"
        stroke="currentColor"
        strokeWidth={1.35}
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      {/* Classic “f”; translate = (12,12) − bbox center (13.6, 13.85) from path bounds */}
      <g transform="translate(-1.6 -1.85)">
        <path
          d="M14.5 8.5h2.2V6.2c0-.1 0-.2-.1-.3-.4-.2-1-.3-1.8-.3-2.2 0-3.7 1.4-3.7 4v2H8.5v3h3.5v7.5h3.4V15h2.8l.5-3h-3.3v-1.8c0-.9.2-1.5 1.5-1.5h1.6V8.5Z"
          fill="currentColor"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4a7.2 7.2 0 00-2.4 14c-.1-.9-.2-2 .1-2.9l.7-3s-.2-.4-.2-1c0-.9.5-1.6 1.2-1.6.6 0 .9.4.9 1 0 .6-.4 1.5-.6 2.3-.2.7.4 1.2 1.1 1.2 1.3 0 2.3-1.4 2.3-3.4 0-1.8-1.3-3-3.1-3-2.1 0-3.4 1.6-3.4 3.3 0 .6.2 1.3.5 1.6.1 0 .1.1.1.2l-.2.8c0 .2-.1.2-.3.1-1-.5-1.6-1.9-1.6-3.1 0-2.4 1.7-4.6 5-4.6 2.6 0 4.7 1.9 4.7 4.4 0 2.6-1.6 4.7-4 4.7-.8 0-1.5-.4-1.8-.9l-.5 1.8c-.2.6-.5 1.2-.9 1.7A7.2 7.2 0 0012 4Z"
        fill="currentColor"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Hub icon — mobile FAB for “socials” */
export function SocialHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="8" cy="12" r="2.25" stroke="currentColor" strokeWidth={1.35} />
      <circle cx="16" cy="7" r="2.25" stroke="currentColor" strokeWidth={1.35} />
      <circle cx="16" cy="17" r="2.25" stroke="currentColor" strokeWidth={1.35} />
      <path
        d="M10 11.2 13.5 8.3M10 12.8l3.5 2.9"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SocialNetworkIcon({
  network,
  className,
}: {
  network: SocialNetwork;
  className?: string;
}) {
  switch (network) {
    case 'instagram':
      return <InstagramIcon className={className} />;
    case 'facebook':
      return <FacebookIcon className={className} />;
    case 'pinterest':
      return <PinterestIcon className={className} />;
    default:
      return null;
  }
}
