import { NextRequest, NextResponse } from 'next/server'

// 调用DashScope AI API
async function callDashScopeAI(userRequest: string, businessName: string, productService: string, targetAudience: string) {
  try {
    const apiKey = process.env.DASHSCOPE_API_KEY || 'sk-9bf19547ddbd4be1a87a7a43cf251097';
    
    // 检测用户输入的语言 - 默认英文，只有明确中文输入才用中文
    const detectLanguage = (text: string) => {
      if (!text) return 'en';
      // 检测中文字符
      const chineseRegex = /[\u4e00-\u9fff]/;
      const chineseCount = (text.match(chineseRegex) || []).length;
      const totalChars = text.length;
      
      // 更严格的中文检测：中文字符占比必须超过50%，或者包含明确的中文词汇
      const chineseWords = ['产品', '服务', '公司', '用户', '客户', '活动', '促销', '发布', '反馈', '维护', '营销', '邮件', '请', '帮我', '生成', '写', '创建'];
      const hasChineseWords = chineseWords.some(word => text.includes(word));
      
      // 只有当中文占比超过50%或包含明确中文词汇时才认为是中文
      return (chineseCount / totalChars > 0.5) || hasChineseWords ? 'zh' : 'en';
    };

    const detectedLanguage = detectLanguage(userRequest);
    
    // 根据检测到的语言生成相应的提示词
    const prompt = detectedLanguage === 'zh' 
      ? `你是NovaMail的AI助手，NovaMail是一个专业的邮件营销平台，帮助用户创建、发送和管理邮件营销活动。

产品信息：
- 品牌：NovaMail
- 功能：邮件模板设计、邮件发送、营销活动管理、数据分析
- 目标用户：企业、营销人员、电商卖家、内容创作者
- 核心价值：简化邮件营销流程，提高营销效果

请根据用户的问题提供专业、有用的回答。如果问题与邮件营销相关，请结合NovaMail的功能给出具体建议；如果是其他问题，请基于你的知识提供准确回答。

用户问题：${userRequest}

请用中文回答，提供详细、实用的建议。`
      : `You are NovaMail's AI assistant. NovaMail is a professional email marketing platform that helps users create, send, and manage email marketing campaigns.

Product Information:
- Brand: NovaMail
- Features: Email template design, email sending, marketing campaign management, data analytics
- Target Users: Businesses, marketers, e-commerce sellers, content creators
- Core Value: Simplify email marketing processes and improve marketing effectiveness

Please provide professional and helpful answers based on user questions. If the question is related to email marketing, please provide specific suggestions combining NovaMail's features; if it's other questions, please provide accurate answers based on your knowledge.

User Question: ${userRequest}

Please respond in English with detailed and practical advice.`;

    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-DashScope-SSE': 'enable'
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        input: {
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        },
        parameters: {
          temperature: 0.7,
          max_tokens: 2000
        }
      })
    });

    if (!response.ok) {
      throw new Error(`DashScope API error: ${response.status}`);
    }

    // 处理SSE流响应
    const text = await response.text();
    console.log('DashScope raw response:', text.substring(0, 200));
    
    // 解析SSE流
    const lines = text.split('\n');
    let lastContent = '';
    
    for (const line of lines) {
      if (line.startsWith('data:')) {
        const data = line.substring(5).trim();
        if (data === '[DONE]') break;
        
        try {
          const parsed = JSON.parse(data);
          console.log('Parsed SSE data:', parsed);
          
          // 处理DashScope API的响应格式
          if (parsed.output && parsed.output.text) {
            lastContent = parsed.output.text;
          } else if (parsed.output && parsed.output.choices && parsed.output.choices[0]) {
            lastContent = parsed.output.choices[0].message?.content || parsed.output.choices[0].text;
          }
        } catch (e) {
          console.log('SSE parsing error for line:', line);
          // 忽略解析错误，继续处理下一行
        }
      }
    }
    
    if (lastContent) {
      return {
        message: lastContent
      };
    } else {
      throw new Error('No valid content found in SSE stream');
    }
    
  } catch (error) {
    console.error('DashScope AI call failed:', error);
    // 回退到本地生成
    const fallbackResponse = generateAIResponse(userRequest, businessName, productService, targetAudience);
    return {
      message: fallbackResponse.response
    };
  }
}

// AI对话响应生成函数（备用）
function generateAIResponse(userRequest: string, businessName: string, productService: string, targetAudience: string) {
  // 智能解析用户请求
  const request = userRequest.toLowerCase()
  
  // 提取关键信息
  const business = businessName || 'Your Business'
  const product = productService || 'Your Product/Service'
  const audience = targetAudience || 'Valued Customer'
  
  let response = ''
  
  // 根据用户问题提供智能回复
  if (request.includes('你好') || request.includes('hello') || request.includes('hi')) {
    response = `你好！我是你的AI助手，很高兴为你服务！我可以帮助你解答各种问题，包括邮件营销、技术问题、生活建议等等。请告诉我你需要什么帮助？`
  } else if (request.includes('天气') || request.includes('weather')) {
    response = `很抱歉，我无法获取实时天气信息。建议你查看天气预报应用或网站获取准确的天气信息。如果你需要其他帮助，我很乐意为你服务！`
  } else if (request.includes('时间') || request.includes('time')) {
    response = `我无法获取实时时间信息。建议你查看你的设备时钟或询问语音助手。如果你有其他问题，我很乐意帮助你！`
  } else if (request.includes('人工智能') || request.includes('ai') || request.includes('artificial intelligence')) {
    response = `人工智能（AI）是计算机科学的一个分支，旨在创建能够执行通常需要人类智能的任务的系统。AI包括机器学习、深度学习、自然语言处理等技术。

**AI的主要应用领域：**
• 自然语言处理（如聊天机器人、翻译）
• 计算机视觉（如图像识别、自动驾驶）
• 机器学习（如推荐系统、预测分析）
• 语音识别和生成
• 机器人技术

**AI的发展趋势：**
• 大语言模型（如GPT、ChatGPT）
• 多模态AI（结合文本、图像、音频）
• 边缘AI（在设备上运行）
• 可解释AI（提高透明度）

你对AI的哪个方面特别感兴趣？我可以为你详细介绍！`
  } else if (request.includes('编程') || request.includes('programming') || request.includes('代码') || request.includes('code')) {
    response = `编程是创建计算机程序的过程！我很乐意帮助你学习编程。

**热门编程语言：**
• JavaScript - 网页开发
• Python - 数据科学、AI
• Java - 企业应用
• C++ - 系统编程
• Go - 云原生应用

**学习建议：**
• 选择一门语言深入学习
• 多做实践项目
• 阅读优秀代码
• 参与开源项目
• 持续学习新技术

你想学习哪种编程语言？或者有什么具体的编程问题需要帮助？`
  } else if (request.includes('邮件') || request.includes('email') || request.includes('营销') || request.includes('marketing')) {
    response = `邮件营销是一个强大的数字营销工具！让我为你介绍一些关键策略：

**邮件营销最佳实践：**
• 建立高质量的邮件列表
• 个性化邮件内容
• 优化邮件主题行
• 移动端友好设计
• 定期清理无效邮箱

**提高打开率的技巧：**
• 使用吸引人的主题行
• 选择最佳发送时间
• 分段发送给不同用户群体
• A/B测试不同版本

**内容策略：**
• 提供有价值的内容
• 保持品牌一致性
• 包含明确的行动号召
• 定期发送但不过度

你想了解邮件营销的哪个具体方面？我可以提供更详细的建议！`
  } else if (request.includes('帮助') || request.includes('help')) {
    response = `我很乐意帮助你！作为AI助手，我可以协助你处理各种问题：

**我可以帮助你：**
• 回答问题（技术、生活、学习等）
• 提供建议和解决方案
• 解释概念和原理
• 协助学习和研究
• 创意和灵感

**使用建议：**
• 描述你的具体问题
• 提供相关背景信息
• 说明你的目标或需求
• 随时提出后续问题

请告诉我你需要什么帮助，我会尽力为你提供有用的信息和建议！`
  } else {
    // 通用智能回复
    response = `感谢你的问题！虽然我无法获取实时信息或执行外部操作，但我可以为你提供一般性的建议和信息。

**我可以帮助你：**
• 解释概念和原理
• 提供学习建议
• 分享最佳实践
• 解答技术问题
• 提供创意想法

如果你有具体的问题，请详细描述，我会尽力为你提供有用的回答。你也可以尝试：
• 重新表述你的问题
• 提供更多背景信息
• 询问相关的其他问题

有什么我可以帮助你的吗？`
  }
  
  return { response }
}

export async function POST(request: NextRequest) {
  try {
    // 性能监控
    const startTime = Date.now()
    
    // 解析请求体
    const body = await request.json()
    const { userRequest, businessName, productService, targetAudience } = body
    
    // 输入验证
    if (!userRequest || userRequest.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: 'User request is required',
        message: 'Please provide a description of what you want to know about email marketing'
      }, { status: 400 })
    }
    
    // 调用DashScope AI API
    const aiResponse = await callDashScopeAI(
      userRequest.trim(),
      businessName || 'Your Business',
      productService || 'Our Service',
      targetAudience || 'Valued Customer'
    )
    
    // 性能监控
    const processingTime = Date.now() - startTime
    
    // 返回响应
    return NextResponse.json({
      success: true,
      message: aiResponse.message,
      timestamp: new Date().toISOString(),
      processingTime: `${processingTime}ms`
    })
    
  } catch (error: any) {
    console.error('AI Generation Error:', error)
    console.error('Error details:', error?.message)
    console.error('Error stack:', error?.stack)
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: `Failed to generate AI response: ${error?.message || 'Unknown error'}`,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
