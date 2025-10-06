import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

// 加密函数
function encrypt(text: string, key: string): string {
  const algorithm = 'aes-256-cbc'
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipher(algorithm, key)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return iv.toString('hex') + ':' + encrypted
}

// 解密函数
function decrypt(encryptedText: string, key: string): string {
  const algorithm = 'aes-256-cbc'
  const textParts = encryptedText.split(':')
  const iv = Buffer.from(textParts.shift()!, 'hex')
  const encryptedData = textParts.join(':')
  const decipher = crypto.createDecipher(algorithm, key)
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

// 获取当前用户ID
async function getCurrentUserId(request: NextRequest): Promise<string | null> {
  try {
    const sessionToken = request.cookies.get('next-auth.session-token')?.value
    if (sessionToken) {
      const session = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true }
      })
      return session?.userId || null
    }
    return null
  } catch (error) {
    console.error('Error getting user ID:', error)
    return null
  }
}

// 获取用户邮箱配置
export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId(request)
    
    if (!userId) {
      return NextResponse.json({
        success: false,
        error: 'User not authenticated'
      }, { status: 401 })
    }

    // 从数据库获取用户邮箱配置
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        emailConfig: true
      }
    })

    if (!user?.emailConfig) {
      return NextResponse.json({
        success: true,
        config: null
      })
    }

    // 解密配置
    const encryptionKey = process.env.ENCRYPTION_KEY || 'default-key'
    const decryptedConfig = JSON.parse(decrypt(user.emailConfig, encryptionKey))

    return NextResponse.json({
      success: true,
      config: {
        ...decryptedConfig,
        password: '***' // 不返回真实密码
      }
    })

  } catch (error) {
    console.error('Get email config error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get email configuration' 
      },
      { status: 500 }
    )
  }
}

// 保存用户邮箱配置
export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId(request)
    
    if (!userId) {
      return NextResponse.json({
        success: false,
        error: 'User not authenticated'
      }, { status: 401 })
    }

    const emailConfig = await request.json()

    // 验证必需字段
    if (!emailConfig.email || !emailConfig.password) {
      return NextResponse.json({
        success: false,
        error: 'Email and password are required'
      }, { status: 400 })
    }

    // 加密配置
    const encryptionKey = process.env.ENCRYPTION_KEY || 'default-key'
    const encryptedConfig = encrypt(JSON.stringify(emailConfig), encryptionKey)

    // 保存到数据库
    await prisma.user.update({
      where: { id: userId },
      data: {
        emailConfig: encryptedConfig
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Email configuration saved successfully'
    })

  } catch (error) {
    console.error('Save email config error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to save email configuration' 
      },
      { status: 500 }
    )
  }
}
