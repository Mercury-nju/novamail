/**
 * Mailchimp ESP Adapter
 * 支持OAuth授权和模板创建
 */

const axios = require('axios')
const BaseESPAdapter = require('./base')

class MailchimpAdapter extends BaseESPAdapter {
  constructor(config = {}) {
    super(config)
    this.clientId = config.clientId || process.env.MAILCHIMP_CLIENT_ID
    this.clientSecret = config.clientSecret || process.env.MAILCHIMP_CLIENT_SECRET
    this.redirectUri = config.redirectUri || process.env.MAILCHIMP_REDIRECT_URI
    this.accessToken = config.accessToken
    this.dc = config.dc // Mailchimp数据中心标识
    this.apiKey = config.apiKey || process.env.MAILCHIMP_API_KEY
  }

  /**
   * 验证配置
   */
  validateConfig() {
    // 支持API Key模式或OAuth模式
    return !!(this.apiKey || (this.clientId && this.clientSecret && this.redirectUri))
  }

  /**
   * 获取OAuth授权URL
   */
  getAuthUrl() {
    if (!this.validateConfig()) {
      throw new Error('Mailchimp OAuth配置不完整')
    }

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: 'templates'
    })

    return `https://login.mailchimp.com/oauth2/authorize?${params.toString()}`
  }

  /**
   * 处理OAuth回调
   */
  async handleCallback(code) {
    try {
      // Mailchimp OAuth token请求需要使用URL编码格式
      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUri,
        code: code
      })

      const response = await axios.post('https://login.mailchimp.com/oauth2/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      const { access_token, dc } = response.data
      this.accessToken = access_token
      this.dc = dc

      return {
        success: true,
        access_token,
        dc
      }
    } catch (error) {
      console.error('Mailchimp OAuth callback error:', error.response?.data || error.message)
      return {
        success: false,
        error: this.formatError(error)
      }
    }
  }

  /**
   * 检查授权状态
   */
  async checkAuth() {
    // 如果使用API Key模式
    if (this.apiKey) {
      try {
        // 从API Key中提取数据中心
        const dc = this.apiKey.split('-').pop()
        
        // 验证API Key是否有效
        const response = await axios.get(`https://${dc}.api.mailchimp.com/3.0/`, {
          headers: {
            'Authorization': `Basic ${Buffer.from(`anystring:${this.apiKey}`).toString('base64')}`
          }
        })

        return {
          authorized: true,
          user_info: response.data,
          auth_type: 'api_key'
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

    // OAuth模式
    if (!this.accessToken || !this.dc) {
      return {
        authorized: false,
        error: '未授权，请先连接Mailchimp账户'
      }
    }

    try {
      // 验证token是否有效
      const response = await axios.get(`https://${this.dc}.api.mailchimp.com/3.0/`, {
        headers: {
          'Authorization': `OAuth ${this.accessToken}`
        }
      })

      return {
        authorized: true,
        user_info: response.data,
        auth_type: 'oauth'
      }
    } catch (error) {
      if (error.response?.status === 401) {
        return {
          authorized: false,
          error: 'token_expired'
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

      // 确定数据中心和认证方式
      let dc, authHeader
      
      if (this.apiKey) {
        // API Key模式
        dc = this.apiKey.split('-').pop()
        authHeader = `Basic ${Buffer.from(`anystring:${this.apiKey}`).toString('base64')}`
      } else {
        // OAuth模式
        dc = this.dc
        authHeader = `OAuth ${this.accessToken}`
      }

      // 创建模板数据
      const templateData = {
        name: name,
        html: html,
        folder_id: '', // 可选：指定文件夹
        type: 'user' // 用户创建的模板
      }

      // 如果有主题，添加到模板中
      if (subject) {
        templateData.subject_line = subject
      }

      // 调用Mailchimp API创建模板
      const response = await axios.post(
        `https://${dc}.api.mailchimp.com/3.0/templates`,
        templateData,
        {
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json'
          }
        }
      )

      const template = response.data
      
      return {
        success: true,
        id: template.id,
        edit_url: `https://${dc}.admin.mailchimp.com/templates/edit?id=${template.id}`,
        template_name: template.name
      }

    } catch (error) {
      console.error('Mailchimp createTemplate error:', error.response?.data || error.message)
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

      const response = await axios.get(`https://${this.dc}.api.mailchimp.com/3.0/`, {
        headers: {
          'Authorization': `OAuth ${this.accessToken}`
        }
      })

      return response.data
    } catch (error) {
      console.error('Mailchimp getUserInfo error:', error.response?.data || error.message)
      return null
    }
  }
}

module.exports = MailchimpAdapter
