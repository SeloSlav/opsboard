import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    ppr: true,
    serverActions: true,
  },
  transpilePackages: [],
};

export default nextConfig;