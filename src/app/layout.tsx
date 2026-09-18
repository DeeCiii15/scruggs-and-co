import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Cabin, IBM_Plex_Mono, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";
import ContactRibbon from "./components/ContactRibbon";
import SiteJsonLd from "./components/SiteJsonLd";
import { pageShareMeta } from "@/lib/shareMeta";
import {
  getSiteUrl,
  LOCAL_KEYWORDS,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/siteConfig";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["200", "400"],
  variable: "--font-typewriter",
  display: "swap",
});

const saintDelafield = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script-face",
  display: "swap",
});

const cabin = Cabin({
  subsets: ["latin"],
  variable: "--font-cabin",
  display: "swap",
});

const siteUrl = getSiteUrl();

const HOME_PAGE_TITLE = `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} Photographer | Weddings & Portraits | ${SITE_NAME}`;
const homeShare = pageShareMeta({
  title: HOME_PAGE_TITLE,
  description: SITE_DESCRIPTION,
  url: "/",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: HOME_PAGE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [...LOCAL_KEYWORDS],
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  openGraph: homeShare.openGraph,
  twitter: homeShare.twitter,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: '/favicon.svg?v=2', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-48x48.png?v=2', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png?v=2', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-144x144.png?v=2', sizes: '144x144', type: 'image/png' },
      { url: '/icon-192.png?v=2', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico?v=2', sizes: '48x48', type: 'image/x-icon' },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png?v=2',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.ico?v=2',
  },
  manifest: '/site.webmanifest',
  formatDetection: {
    telephone: false,
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plexMono.variable} ${saintDelafield.variable} ${cabin.variable}`}
    >
      <body className="antialiased font-sans text-ink bg-paper">
        <SiteJsonLd />
        <div className="relative z-10 min-h-dvh overflow-x-clip max-sm:pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))]">
          {children}
        </div>
        <ContactRibbon />
        <Analytics />
      </body>
    </html>
  );
}
