import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    unoptimized: true,
    minimumCacheTTL: 2678400,

    domains: ['diggindie-images.s3.ap-northeast-2.amazonaws.com', 'i.scdn.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        pathname: '/**',
      },

      {
        protocol: "https",
        hostname: "i2o.scdn.co",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'diggindie-imgs.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
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
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.indistreet.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'diggindie-imgs.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.namu.wiki',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.indistreet.app',
        pathname: '/**', // 모든 경로 허용
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image-cdn-ak.spotifycdn.com', // 스포티파이 추가
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co', // 스포티파이의 또 다른 이미지 도메인 (자주 쓰임)
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // 유튜브
      },
      { protocol: 'https', hostname: 'namu.wiki' },
      { protocol: 'https', hostname: 'i2o.scdn.co' },
      {
        protocol: 'https',
        hostname: 'diggindie-imgs.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i2o.scdn.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);
