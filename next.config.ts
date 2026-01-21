import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    domains: ['diggindie-images.s3.ap-northeast-2.amazonaws.com', 'i.scdn.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "diggindie-images.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "cdn.indistreet.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "diggindie-images.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'diggindie-images.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.indistreet.app',
        pathname: '/**', // 모든 경로 허용
      },
    ],
  },
};

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);
