import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',

  basePath: isProd ? '/cs-wiki' : '',
  assetPrefix: isProd ? '/cs-wiki' : '',

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
