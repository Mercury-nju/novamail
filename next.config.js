/** @type {import('next').NextConfig} */
const nextConfig = {
  // 暂时禁用静态导出以支持API路由和测试页面
  // output: 'export', // 注释掉静态导出
  trailingSlash: true, // Cloudflare Pages兼容
  
  // 图片优化配置
  images: {
    unoptimized: false, // 启用图片优化
    domains: [
      'lh3.googleusercontent.com', // Google
      'images.unsplash.com',        // Unsplash
      'cdn.jsdelivr.net',          // JSDelivr CDN
      'cdnjs.cloudflare.com',       // Cloudflare CDN
      'fonts.googleapis.com',       // Google Fonts
      'cdn.aliyuncs.com',          // Alibaba Cloud (retained)
      'cdn.qcloud.com',            // Tencent Cloud (retained)
      'cdn.bcebos.com'             // Baidu Cloud (retained)
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [320, 420, 768, 1024, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1年缓存
  },
  
          // 启用服务器端功能 (API routes)
          experimental: {
            webpackBuildWorker: false,
            serverComponentsExternalPackages: ['nodemailer'],
            // optimizeCss: true, // CSS优化 (暂时禁用避免critters问题)
            scrollRestoration: true, // 滚动位置恢复
          },
  
  // 压缩配置
  compress: true,
  
  // 性能优化
  swcMinify: true, // 使用SWC压缩
  
  // 国际化配置暂时禁用（避免路由冲突）
  // i18n: {
  //   locales: ['en', 'zh-CN'],
  //   defaultLocale: 'en',
  // },
  
  // 重定向配置 (全球用户友好)
  async redirects() {
    return [
      // 中文版隐私政策重定向
      {
        source: '/zh-CN/privacy',
        destination: '/privacy-policy-cn',
        permanent: false,
      },
      {
        source: '/zh-CN/terms',
        destination: '/terms-of-service-cn',
        permanent: false,
      },
    ];
  },
  
  // 响应头配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // 安全头
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // 性能头
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          // API缓存控制
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=60',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          // 静态资源长期缓存
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          // 图片资源缓存
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  
  // 配置 webpack
  webpack: (config, { dev, isServer }) => {
    // 生产环境优化
    if (!dev) {
      // 启用缓存
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      };
      
      // 代码分割优化
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      };
    } else {
      // 开发环境禁用缓存（保持原有逻辑）
      config.cache = false;
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
    }
    
    // 添加别名
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };
    
    return config;
  },
  
  // 环境变量配置
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // 输出配置 (兼容Cloudflare Pages)
  // output: 'export', // 已在上面启用
  // trailingSlash: true, // Cloudflare Pages兼容 (已在上面启用)
}

module.exports = nextConfig
