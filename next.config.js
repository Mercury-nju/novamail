/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  // 禁用构建缓存
  experimental: {
    webpackBuildWorker: false,
  },
  // 配置 webpack 禁用缓存
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.cache = false;
    }
    return config;
  },
}

module.exports = nextConfig
