import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build checks must never clobber the running dev server's .next dir:
  // run them with NEXT_DIST_DIR=.next-build (see package.json build:check).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Dev-only: allow phone testing via LAN IP and cloudflared tunnel.
  // Has no effect on production builds.
  allowedDevOrigins: ["192.168.0.103", "*.trycloudflare.com"],
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images-strategyguys.netlify.app" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "harleystreetmedicalwellness.co.uk" },
    ],
  },
};

export default nextConfig;
