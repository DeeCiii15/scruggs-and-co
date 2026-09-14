import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  async redirects() {
    return [
      {
        source: "/pricing",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/experience",
        destination: "/services/wedding-photography",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/services/wedding-photography",
        permanent: true,
      },
      {
        source: "/investment",
        destination: "/services/wedding-photography",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/#about",
        permanent: true,
      },
      {
        source: "/services/sessions",
        destination: "/services/portrait-photography",
        permanent: true,
      },
      {
        source: "/services/couples",
        destination: "/services/engagement-photography",
        permanent: true,
      },
      {
        source: "/portfolio/couples",
        destination: "/portfolio/engagement",
        permanent: true,
      },
    ];
  },
  images: {
    /** Allow max quality for full-bleed heroes (default list tops out below 100). */
    qualities: [75, 80, 85, 90, 92, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images-pw.pixieset.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
