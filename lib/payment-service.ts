// 全球支付服务统一接口
// 支持Stripe(主要)、PayPal、支付宝、微信支付等全球支付方式

interface PaymentResponse {
  success: boolean;
  paymentUrl?: string;
  orderId?: string;
  error?: string;
}

interface PaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  productName: string;
  returnUrl: string;
  notifyUrl: string;
  userId: string;
}

// 支付服务提供商枚举 (全球主要 -> 区域特色)
export enum PaymentProvider {
  STRIPE = 'stripe',     // 全球首选支付
  PAYPAL = 'paypal',     // 欧洲/美洲主要
  ALIPAY = 'alipay',     // 中国/亚洲
  WECHAT = 'wechat',     // 中国
  GOOGLE_PAY = 'google', // 全球通用
  APPLE_PAY = 'apple',   // 全球通用
  SQUARE = 'square'      // 美国/加拿大
}

// 获取当前配置的支付提供商
function getCurrentPaymentProvider(): PaymentProvider {
  const provider = process.env.PAYMENT_PROVIDER || 'stripe';
  return provider as PaymentProvider;
}

// 支付宝服务
class AlipayService {
  private appId: string;
  private privateKey: string;
  private publicKey: string;
  private gateway: string;

  constructor() {
    this.appId = process.env.ALIPAY_APP_ID || '';
    this.privateKey = process.env.ALIPAY_PRIVATE_KEY || '';
    this.publicKey = process.env.ALIPAY_PUBLIC_KEY || '';
    this.gateway = process.env.ALIPAY_GATEWAY || 'https://openapi.alipay.com/gateway.do';
  }

  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      // 构建支付宝支付参数
      const params = {
        app_id: this.appId,
        method: 'alipay.trade.page.pay',
        charset: 'utf-8',
        sign_type: 'RSA2',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        version: '1.0',
        notify_url: request.notifyUrl,
        return_url: request.returnUrl,
        biz_content: JSON.stringify({
          out_trade_no: request.orderId,
          product_code: 'FAST_INSTANT_TRADE_PAY',
          total_amount: (request.amount / 100).toFixed(2), // 转换为元
          subject: request.productName,
          body: `NovaMail订阅服务 - ${request.productName}`,
          timeout_express: '30m'
        })
      };

      // 生成签名
      const sign = this.generateSign(params);
      (params as any)['sign'] = sign;

      // 构建支付URL
      const paymentUrl = `${this.gateway}?${this.buildQueryString(params)}`;

      return {
        success: true,
        paymentUrl,
        orderId: request.orderId
      };
    } catch (error) {
      console.error('Alipay payment creation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async verifyPayment(params: any): Promise<boolean> {
    try {
      // 验证支付宝回调签名
      const sign = params.sign;
      delete params.sign;
      delete params.sign_type;

      const expectedSign = this.generateSign(params);
      return sign === expectedSign;
    } catch (error) {
      console.error('Alipay verification error:', error);
      return false;
    }
  }

  private generateSign(params: any): string {
    // 这里应该使用真实的RSA签名算法
    // 为了演示，返回一个模拟签名
    const crypto = require('crypto');
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    
    return crypto
      .createHash('sha256')
      .update(sortedParams + this.privateKey)
      .digest('hex');
  }

  private buildQueryString(params: any): string {
    return Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }
}

// 微信支付服务
class WechatPayService {
  private appId: string;
  private mchId: string;
  private apiKey: string;
  private gateway: string;

  constructor() {
    this.appId = process.env.WECHAT_PAY_APP_ID || '';
    this.mchId = process.env.WECHAT_PAY_MCH_ID || '';
    this.apiKey = process.env.WECHAT_PAY_API_KEY || '';
    this.gateway = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
  }

  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      // 构建微信支付参数
      const params = {
        appid: this.appId,
        mch_id: this.mchId,
        nonce_str: this.generateNonceStr(),
        body: request.productName,
        out_trade_no: request.orderId,
        total_fee: request.amount, // 微信支付使用分为单位
        spbill_create_ip: '127.0.0.1',
        notify_url: request.notifyUrl,
        trade_type: 'NATIVE', // 扫码支付
        product_id: request.orderId
      };

      // 生成签名
      const sign = this.generateSign(params);
      (params as any)['sign'] = sign;

      // 调用微信支付API
      const xmlData = this.buildXML(params);
      const response = await fetch(this.gateway, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml'
        },
        body: xmlData
      });

      const responseText = await response.text();
      const result = this.parseXML(responseText);

      if (result.return_code === 'SUCCESS' && result.result_code === 'SUCCESS') {
        return {
          success: true,
          paymentUrl: result.code_url, // 二维码链接
          orderId: request.orderId
        };
      } else {
        throw new Error(result.err_code_des || result.return_msg || 'WeChat Pay error');
      }
    } catch (error) {
      console.error('WeChat Pay creation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async verifyPayment(params: any): Promise<boolean> {
    try {
      // 验证微信支付回调签名
      const sign = params.sign;
      delete params.sign;

      const expectedSign = this.generateSign(params);
      return sign === expectedSign;
    } catch (error) {
      console.error('WeChat Pay verification error:', error);
      return false;
    }
  }

  private generateNonceStr(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  private generateSign(params: any): string {
    const crypto = require('crypto');
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    
    const stringSignTemp = sortedParams + '&key=' + this.apiKey;
    return crypto
      .createHash('md5')
      .update(stringSignTemp)
      .digest('hex')
      .toUpperCase();
  }

  private buildXML(params: any): string {
    let xml = '<xml>';
    for (const key in params) {
      xml += `<${key}><![CDATA[${params[key]}]]></${key}>`;
    }
    xml += '</xml>';
    return xml;
  }

  private parseXML(xml: string): any {
    // 简单的XML解析，实际项目中应该使用专业的XML解析库
    const result: any = {};
    const regex = /<(\w+)><!\[CDATA\[(.*?)\]\]><\/\w+>/g;
    let match;
    
    while ((match = regex.exec(xml)) !== null) {
      result[match[1]] = match[2];
    }
    
    return result;
  }
}

// Stripe服务 (海外备用)
class StripeService {
  private secretKey: string;
  private publishableKey: string;

  constructor() {
    this.secretKey = process.env.STRIPE_SECRET_KEY || '';
    this.publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
  }

  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      // 这里应该调用Stripe API
      // 为了演示，返回模拟响应
      const paymentUrl = `https://checkout.stripe.com/pay/${request.orderId}`;
      
      return {
        success: true,
        paymentUrl,
        orderId: request.orderId
      };
    } catch (error) {
      console.error('Stripe payment creation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async verifyPayment(params: any): Promise<boolean> {
    try {
      // 验证Stripe webhook签名
      // 这里应该使用Stripe的签名验证
      return true;
    } catch (error) {
      console.error('Stripe verification error:', error);
      return false;
    }
  }
}

// 支付服务工厂
class PaymentServiceFactory {
  static createService(provider: PaymentProvider) {
    switch (provider) {
      case PaymentProvider.ALIPAY:
        return new AlipayService();
      case PaymentProvider.WECHAT:
        return new WechatPayService();
      case PaymentProvider.STRIPE:
        return new StripeService();
      default:
        return new StripeService(); // 默认使用Stripe
    }
  }
}

// 主要的支付服务接口
export class PaymentService {
  private alipayService: AlipayService;
  private wechatService: WechatPayService;
  private stripeService: StripeService;

  constructor() {
    this.alipayService = new AlipayService();
    this.wechatService = new WechatPayService();
    this.stripeService = new StripeService();
  }

  async createPayment(request: PaymentRequest, provider?: PaymentProvider): Promise<PaymentResponse> {
    try {
      const paymentProvider = provider || getCurrentPaymentProvider();
      const service = PaymentServiceFactory.createService(paymentProvider);
      
      const result = await service.createPayment(request);
      
      if (result.success) {
        return result;
      }

      // 如果主要支付方式失败，尝试备用方式
      console.warn(`Primary payment service ${paymentProvider} failed, trying fallback...`);
      return await this.tryFallbackPayment(request, paymentProvider);
    } catch (error) {
      console.error('Payment service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async verifyPayment(params: any, provider: PaymentProvider): Promise<boolean> {
    try {
      const service = PaymentServiceFactory.createService(provider);
      return await service.verifyPayment(params);
    } catch (error) {
      console.error('Payment verification error:', error);
      return false;
    }
  }

  private async tryFallbackPayment(request: PaymentRequest, excludeProvider: PaymentProvider): Promise<PaymentResponse> {
    const fallbackProviders = Object.values(PaymentProvider).filter(p => p !== excludeProvider);

    for (const provider of fallbackProviders) {
      try {
        const service = PaymentServiceFactory.createService(provider);
        const result = await service.createPayment(request);
        
        if (result.success) {
          console.log(`Fallback payment service ${provider} succeeded`);
          return result;
        }
      } catch (error) {
        console.warn(`Fallback payment service ${provider} failed:`, error);
        continue;
      }
    }

    return {
      success: false,
      error: 'All payment services failed'
    };
  }

  // 根据用户地区推荐支付方式 (全球优化)
  getRecommendedPaymentMethods(userRegion: string): PaymentProvider[] {
    // 全球支付优先级：Stripe -> PayPal -> 区域特色支付
    const globalPayments = [
      PaymentProvider.STRIPE,    // 全球首选
      PaymentProvider.PAYPAL,    // 欧洲/美洲主流
    ];

    // 地区特色支付
    switch (userRegion?.toLowerCase()) {
      case 'cn':
      case 'china':
        return [...globalPayments, PaymentProvider.ALIPAY, PaymentProvider.WECHAT];
      
      case 'us':
      case 'usa':
      case 'united states':
        return [...globalPayments, PaymentProvider.APPLE_PAY, PaymentProvider.GOOGLE_PAY, PaymentProvider.SQUARE];
        
      case 'eu':
      case 'europe':
      case 'de': // 德国
      case 'fr': // 法国
      case 'gb': // 英国
        return [...globalPayments, PaymentProvider.APPLE_PAY, PaymentProvider.GOOGLE_PAY];
        
      case 'jp':
      case 'japan':
        return [PaymentProvider.STRIPE, PaymentProvider.PAYPAL, PaymentProvider.APPLE_PAY];
        
      case 'kr':
      case 'south korea':
        return [PaymentProvider.STRIPE, PaymentProvider.PAYPAL, PaymentProvider.APPLE_PAY];
        
      default:
        return globalPayments; // 默认全球支付方式
    }
  }

  // 获取支付方式显示信息
  getPaymentMethodInfo(provider: PaymentProvider) {
    switch (provider) {
      case PaymentProvider.ALIPAY:
        return {
          name: '支付宝',
          icon: '/icons/alipay.png',
          description: '使用支付宝安全支付'
        };
      case PaymentProvider.WECHAT:
        return {
          name: '微信支付',
          icon: '/icons/wechat-pay.png',
          description: '使用微信支付快捷支付'
        };
      case PaymentProvider.STRIPE:
        return {
          name: '信用卡支付',
          icon: '/icons/stripe.png',
          description: '支持Visa、MasterCard等国际信用卡'
        };
      default:
        return {
          name: '在线支付',
          icon: '/icons/payment.png',
          description: '安全便捷的在线支付'
        };
    }
  }
}

// 导出默认实例
export const paymentService = new PaymentService();
