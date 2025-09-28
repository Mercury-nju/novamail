/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
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
    // 完全禁用缓存
    config.cache = false;
    // 禁用持久化缓存
    config.snapshot = {
      managedPaths: [],
      immutablePaths: [],
      buildDependencies: {
        hash: false,
        timestamp: false,
      },
      module: {
        timestamp: false,
      },
      resolve: {
        timestamp: false,
      },
      resolveBuildDependencies: {
        hash: false,
        timestamp: false,
      },
    };
    return config;
  },
}

module.exports = nextConfig
