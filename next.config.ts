import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',

  basePath: '/cs-wiki',

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
