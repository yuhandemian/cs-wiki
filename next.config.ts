import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',

  // GitHub Pages 배포를 위한 basePath
  // 저장소 이름이 'CsWiki'가 아니라면 수정 필요
  basePath: '/CsWiki',

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
