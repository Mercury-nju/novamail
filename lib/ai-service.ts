// 全球AI服务统一接口
// 支持OpenAI(主要)/Claude/Gemini等全球AI，兼容中国AI服务

interface AIResponse {
  content: string;
  success: boolean;
  error?: string;
}

interface EmailGenerationRequest {
  emailMode: string;
  selectedTemplate: string;
  toneStyle: string;
  campaignData: any;
}

// AI服务提供商枚举 (全球优先)
export enum AIProvider {
  OPENAI = 'openai',             // OpenAI GPT (全球首选)
  ANTHROPIC = 'anthropic',       // Claude by Anthropic (全球)
  GOOGLE = 'google',             // Google Gemini (全球)
  DASHSCOPE = 'dashscope',       // 阿里云通义千问 (中国/亚洲)
  BAIDU = 'baidu',              // 百度文心一言 (中国)
  ZHIPU = 'zhipu',              // 智谱AI (中国)
}

// 获取当前配置的AI提供商
function getCurrentAIProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER || 'openai';
  return provider as AIProvider;
}

// 通义千问 (阿里云DashScope) 服务
class DashScopeService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.DASHSCOPE_API_KEY || '';
    this.baseUrl = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';
  }

  async generateEmail(request: EmailGenerationRequest): Promise<AIResponse> {
    try {
      const prompt = this.buildPrompt(request);
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'qwen-turbo',
          input: {
            messages: [
              {
                role: 'system',
                content: '你是一个专业的邮件营销专家，擅长创作吸引人的营销邮件内容。'
              },
              {
                role: 'user',
                content: prompt
              }
            ]
          },
          parameters: {
            temperature: 0.7,
            max_tokens: 1500,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`DashScope API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.output && data.output.choices && data.output.choices[0]) {
        return {
          content: data.output.choices[0].message.content,
          success: true
        };
      }

      throw new Error('Invalid response format from DashScope');
    } catch (error) {
      console.error('DashScope API error:', error);
      return {
        content: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private buildPrompt(request: EmailGenerationRequest): string {
    const { emailMode, selectedTemplate, toneStyle, campaignData } = request;
    
    return `请为我生成一封${toneStyle}风格的${selectedTemplate}邮件。

邮件类型: ${emailMode}
目标受众: ${campaignData.targetAudience || '潜在客户'}
主要目标: ${campaignData.campaignGoals || '提高用户参与度'}
产品/服务: ${campaignData.productService || '我们的服务'}

请生成包含以下内容的邮件:
1. 吸引人的邮件主题行
2. 个性化的开头问候
3. 引人入胜的正文内容
4. 明确的行动号召(CTA)
5. 专业的结尾

请确保内容符合中国用户的阅读习惯，语言自然流畅。

格式要求:
- 主题行单独一行，以"主题："开头
- 正文内容分段清晰
- CTA部分突出显示
- 总长度控制在500字以内`;
  }
}

// 百度文心一言服务
class BaiduService {
  private apiKey: string;
  private secretKey: string;
  private accessToken: string = '';

  constructor() {
    this.apiKey = process.env.BAIDU_API_KEY || '';
    this.secretKey = process.env.BAIDU_SECRET_KEY || '';
  }

  async generateEmail(request: EmailGenerationRequest): Promise<AIResponse> {
    try {
      // 获取access token
      if (!this.accessToken) {
        await this.getAccessToken();
      }

      const prompt = this.buildPrompt(request);
      
      const response = await fetch(`https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-bot-turbo?access_token=${this.accessToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_output_tokens: 1500,
        })
      });

      if (!response.ok) {
        throw new Error(`Baidu API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.result) {
        return {
          content: data.result,
          success: true
        };
      }

      throw new Error('Invalid response format from Baidu');
    } catch (error) {
      console.error('Baidu API error:', error);
      return {
        content: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async getAccessToken(): Promise<void> {
    try {
      const response = await fetch(`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${this.apiKey}&client_secret=${this.secretKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });

      const data = await response.json();
      this.accessToken = data.access_token;
    } catch (error) {
      console.error('Failed to get Baidu access token:', error);
      throw error;
    }
  }

  private buildPrompt(request: EmailGenerationRequest): string {
    const { emailMode, selectedTemplate, toneStyle, campaignData } = request;
    
    return `请为我生成一封${toneStyle}风格的${selectedTemplate}邮件。

邮件类型: ${emailMode}
目标受众: ${campaignData.targetAudience || '潜在客户'}
主要目标: ${campaignData.campaignGoals || '提高用户参与度'}
产品/服务: ${campaignData.productService || '我们的服务'}

请生成包含以下内容的邮件:
1. 吸引人的邮件主题行
2. 个性化的开头问候
3. 引人入胜的正文内容
4. 明确的行动号召(CTA)
5. 专业的结尾

请确保内容符合中国用户的阅读习惯，语言自然流畅。

格式要求:
- 主题行单独一行，以"主题："开头
- 正文内容分段清晰
- CTA部分突出显示
- 总长度控制在500字以内`;
  }
}

// 智谱AI服务
class ZhipuService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.ZHIPU_API_KEY || '';
    this.baseUrl = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
  }

  async generateEmail(request: EmailGenerationRequest): Promise<AIResponse> {
    try {
      const prompt = this.buildPrompt(request);
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'glm-4',
          messages: [
            {
              role: 'system',
              content: '你是一个专业的邮件营销专家，擅长创作吸引人的营销邮件内容。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1500,
        })
      });

      if (!response.ok) {
        throw new Error(`Zhipu API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        return {
          content: data.choices[0].message.content,
          success: true
        };
      }

      throw new Error('Invalid response format from Zhipu');
    } catch (error) {
      console.error('Zhipu API error:', error);
      return {
        content: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private buildPrompt(request: EmailGenerationRequest): string {
    const { emailMode, selectedTemplate, toneStyle, campaignData } = request;
    
    return `请为我生成一封${toneStyle}风格的${selectedTemplate}邮件。

邮件类型: ${emailMode}
目标受众: ${campaignData.targetAudience || '潜在客户'}
主要目标: ${campaignData.campaignGoals || '提高用户参与度'}
产品/服务: ${campaignData.productService || '我们的服务'}

请生成包含以下内容的邮件:
1. 吸引人的邮件主题行
2. 个性化的开头问候
3. 引人入胜的正文内容
4. 明确的行动号召(CTA)
5. 专业的结尾

请确保内容符合中国用户的阅读习惯，语言自然流畅。

格式要求:
- 主题行单独一行，以"主题："开头
- 正文内容分段清晰
- CTA部分突出显示
- 总长度控制在500字以内`;
  }
}

// OpenAI服务 (备用)
class OpenAIService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1/chat/completions';
  }

  async generateEmail(request: EmailGenerationRequest): Promise<AIResponse> {
    try {
      const prompt = this.buildPrompt(request);
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a professional email marketing expert who specializes in creating engaging marketing email content.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1500,
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        return {
          content: data.choices[0].message.content,
          success: true
        };
      }

      throw new Error('Invalid response format from OpenAI');
    } catch (error) {
      console.error('OpenAI API error:', error);
      return {
        content: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private buildPrompt(request: EmailGenerationRequest): string {
    const { emailMode, selectedTemplate, toneStyle, campaignData } = request;
    
    return `Please generate a ${toneStyle} style ${selectedTemplate} email.

Email Type: ${emailMode}
Target Audience: ${campaignData.targetAudience || 'potential customers'}
Main Goal: ${campaignData.campaignGoals || 'increase user engagement'}
Product/Service: ${campaignData.productService || 'our service'}

Please generate an email with the following content:
1. Attractive email subject line
2. Personalized greeting
3. Engaging body content
4. Clear call-to-action (CTA)
5. Professional closing

Format requirements:
- Subject line on a separate line, starting with "Subject:"
- Clear paragraph structure for body content
- Highlighted CTA section
- Keep total length under 500 words`;
  }
}

// AI服务工厂
class AIServiceFactory {
  static createService(provider: AIProvider) {
    switch (provider) {
      case AIProvider.DASHSCOPE:
        return new DashScopeService();
      case AIProvider.BAIDU:
        return new BaiduService();
      case AIProvider.ZHIPU:
        return new ZhipuService();
        case AIProvider.OPENAI:
        return new OpenAIService();
      case AIProvider.ANTHROPIC:
        return new OpenAIService(); // 使用OpenAI作为Claude的临时替代
      case AIProvider.GOOGLE:
        return new OpenAIService(); // 使用OpenAI作为Gemini的临时替代
      default:
        return new OpenAIService(); // 默认使用OpenAI
    }
  }
}

// 主要的AI服务接口
export class AIService {
  private service: DashScopeService | BaiduService | ZhipuService | OpenAIService;

  constructor() {
    const provider = getCurrentAIProvider();
    this.service = AIServiceFactory.createService(provider);
  }

  async generateEmail(request: EmailGenerationRequest): Promise<AIResponse> {
    try {
      // 首先尝试主要服务
      const result = await this.service.generateEmail(request);
      
      if (result.success) {
        return result;
      }

      // 如果主要服务失败，尝试备用服务
      console.warn('Primary AI service failed, trying fallback...');
      return await this.tryFallbackServices(request);
    } catch (error) {
      console.error('AI service error:', error);
      return this.generateFallbackContent(request);
    }
  }

  private async tryFallbackServices(request: EmailGenerationRequest): Promise<AIResponse> {
    const currentProvider = getCurrentAIProvider();
    const fallbackProviders = Object.values(AIProvider).filter(p => p !== currentProvider);

    for (const provider of fallbackProviders) {
      try {
        const service = AIServiceFactory.createService(provider);
        const result = await service.generateEmail(request);
        
        if (result.success) {
          console.log(`Fallback service ${provider} succeeded`);
          return result;
        }
      } catch (error) {
        console.warn(`Fallback service ${provider} failed:`, error);
        continue;
      }
    }

    // 所有服务都失败，返回备用内容
    return this.generateFallbackContent(request);
  }

  private generateFallbackContent(request: EmailGenerationRequest): AIResponse {
    const { emailMode, selectedTemplate, toneStyle, campaignData } = request;
    
    const fallbackContent = `主题：${campaignData.productService || '我们的服务'} - 特别优惠等您来享

亲爱的朋友，

希望这封邮件能为您带来美好的一天！

我们很高兴向您介绍我们的${campaignData.productService || '优质服务'}。作为${campaignData.targetAudience || '我们的重要客户'}，您将享受到：

✨ 专业的服务体验
✨ 优质的产品质量  
✨ 贴心的客户支持

我们的目标是${campaignData.campaignGoals || '为您提供最好的服务体验'}。

🎯 立即行动
点击下方链接，了解更多详情或联系我们的专业团队。

[了解更多] [立即咨询]

感谢您的关注与支持！

此致
敬礼

${campaignData.companyName || 'NovaMail团队'}

---
如果您不希望收到此类邮件，请点击[取消订阅]`;

    return {
      content: fallbackContent,
      success: true
    };
  }
}

// 导出默认实例
export const aiService = new AIService();
