import { NextRequest, NextResponse } from 'next/server'

// 验证域名DNS记录
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const domainId = params.id
    
    // 这里应该从数据库或KV存储中获取域名信息
    // 暂时使用模拟数据
    const domain = {
      id: domainId,
      domain: 'example.com',
      status: 'pending'
    }

    if (!domain) {
      return NextResponse.json(
        { success: false, error: 'Domain not found' },
        { status: 404 }
      )
    }

    // 检查DNS记录
    const dnsCheck = await checkDNSRecords(domain.domain)
    
    if (dnsCheck.allVerified) {
      // 更新域名状态为已验证
      // 这里应该更新数据库或KV存储
      
      return NextResponse.json({
        success: true,
        message: 'Domain verified successfully',
        verificationRecords: dnsCheck.records
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'DNS records not properly configured',
        verificationRecords: dnsCheck.records,
        instructions: getDNSInstructions(domain.domain)
      })
    }
  } catch (error) {
    console.error('Failed to verify domain:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to verify domain' },
      { status: 500 }
    )
  }
}

// 检查DNS记录
async function checkDNSRecords(domain: string) {
  try {
    // 这里应该使用DNS查询库来检查实际的DNS记录
    // 暂时返回模拟数据
    const records = {
      spf: Math.random() > 0.3, // 70%概率通过
      dkim: Math.random() > 0.3,
      dmarc: Math.random() > 0.5
    }

    return {
      allVerified: records.spf && records.dkim && records.dmarc,
      records
    }
  } catch (error) {
    console.error('DNS check failed:', error)
    return {
      allVerified: false,
      records: {
        spf: false,
        dkim: false,
        dmarc: false
      }
    }
  }
}

// 获取DNS配置说明
function getDNSInstructions(domain: string) {
  return {
    spf: {
      type: 'TXT',
      name: '@',
      value: `v=spf1 include:_spf.resend.com ~all`,
      description: 'SPF记录用于验证发件人身份'
    },
    dkim: {
      type: 'CNAME',
      name: 'resend._domainkey',
      value: 'resend._domainkey.resend.com',
      description: 'DKIM记录用于邮件签名验证'
    },
    dmarc: {
      type: 'TXT',
      name: '_dmarc',
      value: `v=DMARC1; p=quarantine; rua=mailto:dmarc@${domain}`,
      description: 'DMARC记录用于邮件策略配置'
    }
  }
}
