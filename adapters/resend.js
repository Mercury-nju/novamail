/**
 * Resend ESP Adapter
 * 使用API Key模式
 * 注意：Resend目前没有模板API，暂时返回功能未支持提示
 */

const axios = require('axios')
const BaseESPAdapter = require('./base')

class ResendAdapter extends BaseESPAdapter {
  constructor(config = {}) {
    super(config)
    this.apiKey = config.apiKey || process.env.RESEND_API_KEY
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
        error: 'Resend API Key未配置'
      }
    }

    try {
      // 验证API Key是否有效
      const response = await axios.get('https://api.resend.com/domains', {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      return {
        authorized: true,
        user_info: { domains: response.data.data }
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
   * 注意：Resend目前没有模板API，返回功能未支持提示
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

      // Resend目前没有模板API，返回功能未支持提示
      return {
        success: false,
        error: 'Resend目前不支持模板功能，请使用其他ESP或直接发送邮件'
      }

    } catch (error) {
      console.error('Resend createTemplate error:', error.response?.data || error.message)
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

      const response = await axios.get('https://api.resend.com/domains', {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      return {
        domains: response.data.data
      }
    } catch (error) {
      console.error('Resend getUserInfo error:', error.response?.data || error.message)
      return null
    }
  }
}

module.exports = ResendAdapter
