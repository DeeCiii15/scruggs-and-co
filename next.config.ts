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
        destination: "/services/weddings",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/services/weddings",
        permanent: true,
      },
      {
        source: "/investment",
        destination: "/services/weddings",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/#about",
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
