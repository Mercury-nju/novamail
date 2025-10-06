// Cloudflare Worker for Contacts Import
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    
    // 处理CORS预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        }
      })
    }
    
    // 只处理POST请求
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
    }

    try {
      const formData = await request.formData()
      const csvFile = formData.get('csvFile')
      
      if (!csvFile) {
        return new Response(JSON.stringify({
          success: false,
          message: 'CSV file is required'
        }), {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
      }

      // 读取CSV文件内容
      const csvText = await csvFile.text()
      const lines = csvText.split('\n').filter(line => line.trim())
      
      if (lines.length < 2) {
        return new Response(JSON.stringify({
          success: false,
          message: 'CSV file must contain at least a header and one data row'
        }), {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
      }

      // 解析CSV
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
      const contacts = []
      const errors = []

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''))
        const row = {}
        
        headers.forEach((header, index) => {
          row[header] = values[index] || ''
        })

        // 验证必填字段
        if (!row.email || !row.name) {
          errors.push({
            row: row,
            error: 'Missing required fields (name, email)'
          })
          continue
        }

        // 验证邮箱格式
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        if (!emailRegex.test(row.email)) {
          errors.push({
            row: row,
            error: 'Invalid email format'
          })
          continue
        }

        contacts.push({
          name: row.name.trim(),
          email: row.email.toLowerCase().trim(),
          tags: row.tags ? row.tags.split(',').map(tag => tag.trim()) : [],
          customFields: Object.keys(row)
            .filter(key => !['name', 'email', 'tags'].includes(key))
            .reduce((obj, key) => {
              obj[key] = row[key]
              return obj
            }, {})
        })
      }

      if (contacts.length === 0) {
        return new Response(JSON.stringify({
          success: false,
          message: 'No valid contacts found in CSV file',
          errors
        }), {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
      }

      // 模拟创建联系人（在实际应用中，这里应该保存到数据库）
      const createdContacts = contacts.map((contact, index) => ({
        id: `contact_${Date.now()}_${index}`,
        ...contact,
        status: 'active',
        createdAt: new Date().toISOString(),
        source: 'csv_import'
      }))

      return new Response(JSON.stringify({
        success: true,
        message: 'CSV import completed',
        data: {
          totalProcessed: contacts.length,
          created: createdContacts.length,
          duplicates: 0,
          errors: errors.length,
          contacts: createdContacts,
          duplicateEmails: [],
          importErrors: errors
        }
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })

    } catch (error) {
      console.error('CSV import error:', error)
      
      return new Response(JSON.stringify({
        success: false,
        message: 'Failed to import contacts from CSV',
        error: error.message
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
  }
}
