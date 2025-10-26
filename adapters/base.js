/**
 * Base ESP Adapter
 * 所有ESP适配器的基类，定义统一的接口规范
 */

class BaseESPAdapter {
  constructor(config = {}) {
    this.config = config
    this.name = this.constructor.name
  }

  /**
   * 创建邮件模板
   * @param {Object} params - 模板参数
   * @param {string} params.name - 模板名称
   * @param {string} params.html - HTML内容
   * @param {string} params.subject - 邮件主题（可选）
   * @returns {Promise<Object>} 返回结果 { success: boolean, id?: string, edit_url?: string, error?: string }
   */
  async createTemplate({ name, html, subject }) {
    throw new Error('createTemplate method must be implemented by subclass')
  }

  /**
   * 检查授权状态
   * @returns {Promise<Object>} 返回结果 { authorized: boolean, error?: string }
   */
  async checkAuth() {
    throw new Error('checkAuth method must be implemented by subclass')
  }

  /**
   * 获取授权URL（仅OAuth类型ESP需要）
   * @returns {string} 授权URL
   */
  getAuthUrl() {
    throw new Error('getAuthUrl method must be implemented by OAuth ESP')
  }

  /**
   * 处理OAuth回调（仅OAuth类型ESP需要）
   * @param {string} code - 授权码
   * @returns {Promise<Object>} 返回结果 { success: boolean, access_token?: string, error?: string }
   */
  async handleCallback(code) {
    throw new Error('handleCallback method must be implemented by OAuth ESP')
  }

  /**
   * 验证配置
   * @returns {boolean} 配置是否有效
   */
  validateConfig() {
    return true
  }

  /**
   * 格式化错误信息
   * @param {Error|string} error - 错误对象或错误信息
   * @returns {string} 格式化的错误信息
   */
  formatError(error) {
    if (typeof error === 'string') return error
    if (error.response) {
      return error.response.data?.message || error.response.statusText || 'API请求失败'
    }
    return error.message || '未知错误'
  }
}

module.exports = BaseESPAdapter
