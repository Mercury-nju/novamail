// CDN和静态资源优化配置
// 针对国内网络环境进行优化

interface CDNConfig {
  domain: string;
  regions: readonly string[];
  features: readonly string[];
}

// 国内CDN服务商配置
export const CDN_PROVIDERS = {
  aliyun: {
    domain: 'cdn.aliyuncs.com',
    regions: ['cn-beijing', 'cn-shanghai', 'cn-guangzhou', 'cn-shenzhen'],
    features: ['gzip', 'brotli', 'http2', 'cache-optimization']
  },
  tencent: {
    domain: 'cdn.qcloud.com',
    regions: ['ap-beijing', 'ap-shanghai', 'ap-guangzhou', 'ap-chengdu'],
    features: ['gzip', 'brotli', 'http2', 'smart-compression']
  },
  baidu: {
    domain: 'cdn.bcebos.com',
    regions: ['bj', 'gz', 'su', 'hk'],
    features: ['gzip', 'webp', 'http2', 'edge-cache']
  }
} as const;

// 静态资源优化配置
export const STATIC_ASSETS_CONFIG = {
  // 图片优化
  images: {
    formats: ['webp', 'avif', 'jpeg', 'png'],
    quality: 85,
    sizes: [320, 640, 768, 1024, 1280, 1920],
    lazy: true,
    placeholder: 'blur'
  },
  
  // CSS优化
  css: {
    minify: true,
    purge: true,
    critical: true,
    inline: true // 内联关键CSS
  },
  
  // JavaScript优化
  js: {
    minify: true,
    compress: true,
    treeshaking: true,
    splitting: true // 代码分割
  },
  
  // 字体优化
  fonts: {
    preload: ['woff2'],
    display: 'swap',
    subset: true // 字体子集化
  }
};

// 缓存策略配置
export const CACHE_CONFIG = {
  // 静态资源缓存
  static: {
    maxAge: 31536000, // 1年
    staleWhileRevalidate: 86400, // 1天
    patterns: ['/_next/static/**', '/images/**', '/icons/**']
  },
  
  // API缓存
  api: {
    maxAge: 300, // 5分钟
    staleWhileRevalidate: 60, // 1分钟
    patterns: ['/api/analytics/**', '/api/templates/**']
  },
  
  // 页面缓存
  pages: {
    maxAge: 3600, // 1小时
    staleWhileRevalidate: 300, // 5分钟
    patterns: ['/pricing', '/features', '/about']
  }
};

// 性能监控配置
export const PERFORMANCE_CONFIG = {
  // Core Web Vitals目标
  vitals: {
    LCP: 2.5, // Largest Contentful Paint (秒)
    FID: 100, // First Input Delay (毫秒)
    CLS: 0.1, // Cumulative Layout Shift
    FCP: 1.8, // First Contentful Paint (秒)
    TTFB: 0.8 // Time to First Byte (秒)
  },
  
  // 监控端点
  monitoring: {
    enabled: true,
    endpoint: '/api/performance',
    sampleRate: 0.1 // 10%采样率
  }
};

// 获取最佳CDN配置
export function getBestCDNConfig(userRegion: string = 'cn'): CDNConfig {
  // 根据用户地区选择最佳CDN
  if (userRegion.startsWith('cn') || userRegion === 'china') {
    // 国内用户优先使用阿里云CDN
    return CDN_PROVIDERS.aliyun;
  } else {
    // 海外用户可以使用其他CDN
    return CDN_PROVIDERS.aliyun; // 阿里云也有海外节点
  }
}

// 生成优化的资源URL
export function getOptimizedAssetUrl(
  path: string, 
  options: {
    width?: number;
    quality?: number;
    format?: string;
    cdn?: boolean;
  } = {}
): string {
  const { width, quality = 85, format = 'webp', cdn = true } = options;
  
  if (!cdn) {
    return path;
  }
  
  const cdnConfig = getBestCDNConfig();
  let url = `https://${cdnConfig.domain}${path}`;
  
  // 添加图片优化参数
  if (path.match(/\.(jpg|jpeg|png|webp)$/i)) {
    const params = new URLSearchParams();
    
    if (width) params.set('w', width.toString());
    if (quality) params.set('q', quality.toString());
    if (format) params.set('f', format);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
  }
  
  return url;
}

// 预加载关键资源
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;
  
  const criticalResources = [
    // 关键CSS
    '/_next/static/css/app.css',
    // 关键字体
    '/fonts/inter-var.woff2',
    // 关键图片
    '/images/logo.webp',
    '/images/hero-bg.webp'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = getOptimizedAssetUrl(resource);
    
    if (resource.endsWith('.css')) {
      link.as = 'style';
    } else if (resource.endsWith('.woff2')) {
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    } else if (resource.match(/\.(jpg|jpeg|png|webp)$/i)) {
      link.as = 'image';
    }
    
    document.head.appendChild(link);
  });
}

// 延迟加载非关键资源
export function lazyLoadResources() {
  if (typeof window === 'undefined') return;
  
  // 延迟加载第三方脚本
  const lazyScripts = [
    // 统计脚本
    { src: '/scripts/analytics.js', defer: true },
    // 客服脚本
    { src: '/scripts/customer-service.js', defer: true }
  ];
  
  // 页面加载完成后再加载
  window.addEventListener('load', () => {
    setTimeout(() => {
      lazyScripts.forEach(({ src, defer }) => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = defer;
        document.head.appendChild(script);
      });
    }, 2000); // 延迟2秒加载
  });
}

// 网络状况检测
export function detectNetworkCondition(): 'slow' | 'fast' | 'unknown' {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return 'unknown';
  }
  
  const connection = (navigator as any).connection;
  
  if (!connection) return 'unknown';
  
  // 根据有效带宽判断网络状况
  const effectiveType = connection.effectiveType;
  
  if (effectiveType === 'slow-2g' || effectiveType === '2g') {
    return 'slow';
  } else if (effectiveType === '3g') {
    return 'slow';
  } else {
    return 'fast';
  }
}

// 根据网络状况调整资源加载策略
export function adaptToNetworkCondition() {
  const networkCondition = detectNetworkCondition();
  
  if (networkCondition === 'slow') {
    // 慢网络：减少资源质量，延迟非关键资源
    return {
      imageQuality: 60,
      enableLazyLoading: true,
      deferNonCritical: true,
      reduceAnimations: true
    };
  } else {
    // 快网络：正常质量
    return {
      imageQuality: 85,
      enableLazyLoading: true,
      deferNonCritical: false,
      reduceAnimations: false
    };
  }
}

// 性能监控
export class PerformanceMonitor {
  private metrics: Map<string, number> = new Map();
  
  // 记录性能指标
  recordMetric(name: string, value: number) {
    this.metrics.set(name, value);
    
    // 发送到监控端点（采样）
    if (Math.random() < PERFORMANCE_CONFIG.monitoring.sampleRate) {
      this.sendMetric(name, value);
    }
  }
  
  // 发送指标到服务器
  private async sendMetric(name: string, value: number) {
    try {
      await fetch(PERFORMANCE_CONFIG.monitoring.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          metric: name,
          value,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location.href
        })
      });
    } catch (error) {
      console.warn('Failed to send performance metric:', error);
    }
  }
  
  // 监控Core Web Vitals
  monitorWebVitals() {
    if (typeof window === 'undefined') return;
    
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.recordMetric('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // FID (First Input Delay)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        this.recordMetric('FID', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });
    
    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      this.recordMetric('CLS', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }
  
  // 获取所有指标
  getAllMetrics() {
    return Object.fromEntries(this.metrics);
  }
}

// 导出性能监控实例
export const performanceMonitor = new PerformanceMonitor();

// 初始化性能优化
export function initPerformanceOptimization() {
  if (typeof window === 'undefined') return;
  
  // 预加载关键资源
  preloadCriticalResources();
  
  // 延迟加载非关键资源
  lazyLoadResources();
  
  // 开始性能监控
  performanceMonitor.monitorWebVitals();
  
  // 根据网络状况调整策略
  const networkAdaptation = adaptToNetworkCondition();
  console.log('Network adaptation:', networkAdaptation);
}



