// Cloudflare Worker for Analytics API
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
    
    // 处理GET请求 - 获取分析数据
    if (request.method === 'GET') {
      try {
        const timeRange = url.searchParams.get('timeRange') || '30d'
        
        // 模拟从数据库获取分析数据
        // 在实际应用中，这里应该从真实的数据库查询统计数据
        const mockAnalytics = {
          totalEmails: 0,
          totalOpens: 0,
          totalClicks: 0,
          openRate: 0,
          clickRate: 0,
          unsubscribeRate: 0,
          bounceRate: 0,
          revenue: 0,
          conversions: 0
        }
        
        const mockChartData = []
        
        // 生成过去7天的图表数据
        for (let i = 6; i >= 0; i--) {
          const date = new Date()
          date.setDate(date.getDate() - i)
          mockChartData.push({
            date: date.toISOString().split('T')[0],
            emails: 0,
            opens: 0,
            clicks: 0
          })
        }
        
        return new Response(JSON.stringify({
          success: true,
          data: {
            analytics: mockAnalytics,
            chartData: mockChartData,
            timeRange
          }
        }), {
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
        
      } catch (error) {
        console.error('Analytics API Error:', error)
        
        return new Response(JSON.stringify({
          success: false,
          error: 'Failed to fetch analytics',
          details: error.message
        }), {
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
      }
    }
    
    return new Response('Method not allowed', { 
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
  }
}
