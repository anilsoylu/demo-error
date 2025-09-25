import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  experimental: {
    browserDebugInfoInTerminal: true,
  },
};

export default nextConfig;
