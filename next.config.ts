import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true
  },
  trailingSlash: false,
  generateEtags: false
};

export default nextConfig;
