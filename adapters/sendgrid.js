/**
 * SendGrid ESP Adapter
 * 使用API Key模式
 */

const axios = require('axios')
const BaseESPAdapter = require('./base')

class SendGridAdapter extends BaseESPAdapter {
  constructor(config = {}) {
    super(config)
    this.apiKey = config.apiKey || process.env.SENDGRID_API_KEY
  }

  /**
   * 验证配置
   */
  validateConfig() {
    return !!this.apiKey
  }

  /**
   * 检查授权状态
   */
  async checkAuth() {
    if (!this.validateConfig()) {
      return {
        authorized: false,
        error: 'SendGrid API Key未配置'
      }
    }

    try {
      // 验证API Key是否有效
      const response = await axios.get('https://api.sendgrid.com/v3/user/profile', {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      return {
        authorized: true,
        user_info: response.data
      }
    } catch (error) {
      if (error.response?.status === 401) {
        return {
          authorized: false,
          error: 'API Key无效或已过期'
        }
      }
      return {
        authorized: false,
        error: this.formatError(error)
      }
    }
  }

  /**
   * 创建邮件模板
   */
  async createTemplate({ name, html, subject = '' }) {
    try {
      // 检查授权状态
      const authCheck = await this.checkAuth()
      if (!authCheck.authorized) {
        return {
          success: false,
          error: authCheck.error
        }
      }

      // 创建模板数据
      const templateData = {
        name: name,
        generation: 'dynamic', // 动态模板
        html_content: html
      }

      // 如果有主题，添加到模板中
      if (subject) {
        templateData.subject = subject
      }

      // 调用SendGrid API创建模板
      const response = await axios.post(
        'https://api.sendgrid.com/v3/templates',
        templateData,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const template = response.data
      
      return {
        success: true,
        id: template.id,
        edit_url: `https://mc.sendgrid.com/dynamic-templates/${template.id}`,
        template_name: template.name
      }

    } catch (error) {
      console.error('SendGrid createTemplate error:', error.response?.data || error.message)
      return {
        success: false,
        error: this.formatError(error)
      }
    }
  }

  /**
   * 获取用户信息
   */
  async getUserInfo() {
    try {
      const authCheck = await this.checkAuth()
      if (!authCheck.authorized) {
        return null
      }

      const response = await axios.get('https://api.sendgrid.com/v3/user/profile', {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      return response.data
    } catch (error) {
      console.error('SendGrid getUserInfo error:', error.response?.data || error.message)
      return null
    }
  }
}

module.exports = SendGridAdapter
