/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['lh3.googleusercontent.com'],
  },
  // 启用服务器端功能 (API routes)
  experimental: {
    webpackBuildWorker: false,
    serverComponentsExternalPackages: ['nodemailer'],
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
