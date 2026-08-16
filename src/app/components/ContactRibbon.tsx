'use client';

import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  SITE_NAME,
} from '@/lib/siteConfig';
import { getSocialLinks } from '@/lib/siteSocial';
import { SocialNetworkIcon } from './SocialMediaIcons';

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M7.2 3.8h2.3c.5 0 .9.3 1 .8l.7 2.6c.1.5 0 1-.4 1.3L9.4 10c.8 1.6 2 2.9 3.6 3.6l.5-.5.9-1c.3-.4.8-.5 1.3-.4l2.6.7c.5.1.8.5.8 1v2.3c0 .6-.5 1.1-1.1 1.1C11.2 17.8 6.2 12.8 6.1 6.9c0-.6.5-1.1 1.1-1.1Z"
        stroke="currentColor"
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Linen-fold envelope — gentle curves, same weight as phone */
function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 8.2 12 14l8-5.8"
        stroke="currentColor"
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M5.2 6.5h13.6c.7 0 1.3.6 1.3 1.3v8.4c0 .7-.6 1.3-1.3 1.3H5.2c-.7 0-1.3-.6-1.3-1.3V7.8c0-.7.6-1.3 1.3-1.3Z"
        stroke="currentColor"
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M4 17.3 9.2 12"
        stroke="currentColor"
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.85}
      />
      <path
        d="M20 17.3 14.8 12"
        stroke="currentColor"
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.85}
      />
    </svg>
  );
}

function IconMat({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-gray-300 bg-white text-gray-900 sm:h-7 sm:w-7">
      {children}
    </span>
  );
}

function DesktopSocialRow() {
  const links = getSocialLinks();
  if (links.length === 0) return null;

  return (
    <>
      <span
        className="mx-2 hidden h-4 w-px shrink-0 bg-gray-300 dark:bg-gray-800 sm:block"
        aria-hidden
      />
      <div className="flex shrink-0 items-center justify-center gap-1 sm:justify-start sm:gap-0 sm:pr-1">
        {links.map((link) => (
          <a
            key={link.network}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl p-2 transition hover:bg-gray-100 active:bg-gray-100 dark:hover:bg-white/10 sm:min-h-0 sm:min-w-0 sm:rounded-full sm:p-1"
          >
            <IconMat>
              <SocialNetworkIcon
                network={link.network}
                className="h-[15px] w-[15px]"
              />
            </IconMat>
          </a>
        ))}
      </div>
    </>
  );
}

/** sm+ — horizontal pill with email and socials */
function DesktopRibbon() {
  return (
    <div className="pointer-events-none fixed bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] left-3 right-3 z-50 hidden sm:bottom-6 sm:left-auto sm:right-6 sm:block">
      <div className="pointer-events-auto mx-auto flex w-full max-w-full flex-col rounded-2xl border border-gray-300 bg-white/70 py-2 pl-2 pr-2 shadow-sm backdrop-blur-md dark:border-gray-700 dark:bg-gray-950/55 sm:w-max sm:min-w-[min(100%,28.5rem)] sm:max-w-[calc(100vw-0.75rem)] sm:flex-row sm:items-center sm:rounded-full sm:border-gray-300 sm:bg-white/55 sm:py-1.5 sm:pl-1.5 sm:pr-1.5 sm:dark:bg-gray-950/50">
        {CONTACT_PHONE_TEL ? (
          <>
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              aria-label={`Call ${CONTACT_PHONE}`}
              className="flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-xl px-2 py-2 transition hover:bg-gray-100 active:bg-gray-100 dark:hover:bg-white/10 sm:min-h-0 sm:justify-start sm:rounded-full sm:py-1 sm:pl-1 sm:pr-2"
            >
              <IconMat>
                <PhoneIcon className="h-[15px] w-[15px]" />
              </IconMat>
              <span className="min-w-0 text-center font-sans text-xs font-medium leading-snug text-gray-900 dark:text-gray-400 sm:text-left sm:text-xs sm:leading-tight">
                {CONTACT_PHONE}
              </span>
            </a>
            <span
              className="mx-1 hidden h-4 w-px shrink-0 bg-gray-300 sm:block"
              aria-hidden
            />
          </>
        ) : null}
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Inquiry%20from%20${encodeURIComponent(SITE_NAME)}`}
          aria-label={`Email ${CONTACT_EMAIL}`}
          className="flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-xl px-2 py-2 transition hover:bg-gray-100 active:bg-gray-100 dark:hover:bg-white/10 sm:min-h-0 sm:justify-start sm:rounded-full sm:py-1 sm:pl-1 sm:pr-2"
        >
          <IconMat>
            <MailIcon className="h-[15px] w-[15px]" />
          </IconMat>
          <span className="min-w-0 break-all text-center font-sans text-xs font-medium leading-snug text-gray-900 dark:text-gray-400 sm:break-normal sm:text-left sm:text-xs sm:leading-tight">
            {CONTACT_EMAIL}
          </span>
        </a>
        <DesktopSocialRow />
      </div>
    </div>
  );
}

const fabBubbleClass =
  'pointer-events-auto flex h-14 w-14 shrink-0 touch-manipulation items-center justify-center rounded-sm border border-gray-300 bg-white text-gray-900 shadow-lg transition-all duration-200 active:scale-95';

/** Mobile — phone icon; taps dial the business line. */
function MobileCallButton() {
  return (
    <a
      href={`tel:${CONTACT_PHONE_TEL}`}
      aria-label={CONTACT_PHONE ? `Call ${CONTACT_PHONE}` : 'Call'}
      className={`fixed bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] right-3 z-[80] sm:hidden ${fabBubbleClass}`}
    >
      <PhoneIcon className="h-6 w-6" />
    </a>
  );
}

export default function ContactRibbon() {
  return <MobileCallButton />;
}
