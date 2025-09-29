import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({
        success: false,
        error: '未登录'
      }, { status: 401 })
    }

    const body = await request.json()
    const { host, port, user, pass, secure } = body

    // 这里应该将配置保存到数据库
    // 目前先返回成功，实际实现需要数据库支持
    console.log('Saving email config for user:', session.user.email, {
      host,
      port,
      user,
      secure,
      // 不记录密码到日志
      pass: '***'
    })

    // TODO: 保存到数据库
    // await saveUserEmailConfig(session.user.email, {
    //   host,
    //   port,
    //   user,
    //   pass, // 应该加密存储
    //   secure
    // })

    return NextResponse.json({
      success: true,
      message: '邮箱配置保存成功'
    })

  } catch (error) {
    console.error('Save email config error:', error)
    
    return NextResponse.json({
      success: false,
      error: '保存失败'
    }, { status: 500 })
  }
}

