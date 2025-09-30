import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      httpOptions: {
        timeout: 30000,
        headers: {
          'User-Agent': 'NovaMail/1.0'
        }
      }
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
          image: user.image,
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('JWT Callback - User:', user, 'Account:', account)
      
      if (account?.provider === 'google' && user) {
        // 对于Google登录，使用Google profile的数据
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.image = user.image
        token.provider = 'google'
      } else if (user) {
        // 对于其他登录方式
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.image = user.image
      }
      
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }
      
      return token
    },
    async session({ session, token }) {
      console.log('Session Callback - Token:', token, 'Session:', session)
      if (token && session.user) {
        (session.user as any).id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.image as string
        (session as any).accessToken = token.accessToken
      }
      return session
    },
    async signIn({ user, account, profile }) {
      console.log('SignIn Callback - User:', user, 'Account:', account, 'Profile:', profile)
      
      if (account?.provider === 'google') {
        // 检查是否已存在相同Google账户的用户
        const existingUser = await prisma.user.findFirst({
          where: {
            accounts: {
              some: {
                provider: 'google',
                providerAccountId: account.providerAccountId
              }
            }
          },
          include: {
            accounts: true
          }
        })

        if (existingUser) {
          console.log('Found existing Google user:', existingUser.email)
          return true
        }

        // 检查是否已存在相同邮箱的用户
        const existingEmailUser = await prisma.user.findUnique({
          where: {
            email: profile?.email
          }
        })

        if (existingEmailUser) {
          console.log('Found existing email user:', existingEmailUser.email)
          // 为现有用户添加Google账户关联
          await prisma.account.create({
            data: {
              userId: existingEmailUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              expires_at: account.expires_at,
              refresh_token: account.refresh_token,
              scope: account.scope,
              token_type: account.token_type,
              id_token: account.id_token
            }
          })
          return true
        }

        // 创建新用户
        console.log('Creating new Google user:', profile?.email)
        return true
      }
      
      // 允许凭据登录
      return true
    },
    async redirect({ url, baseUrl }) {
      // 登录后重定向到仪表板
      if (url.includes('/api/auth/callback')) {
        return `${baseUrl}/dashboard`
      }
      // 允许回调 URL
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // 允许相同域名的回调 URL
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  }
}