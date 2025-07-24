import type { NextConfig } from 'next';

const withPWA = require('next-pwa')({
  dest: 'public', // service worker 파일을 public/ 에 생성
  disable: process.env.NODE_ENV === 'development', // 개발 모드에서는 SW 비활성화
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],
});

const nextConfig: NextConfig = {};

export default withPWA(nextConfig);
