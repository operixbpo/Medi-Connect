import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Preview assets are served from /public/assets; keep unoptimized for exact fidelity.
    unoptimized: true,
  },
};

export default nextConfig;
