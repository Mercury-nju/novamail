import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

const providers: any[] = [
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
]

// Enable Google OAuth with real credentials
providers.unshift(GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID || "1081642412409-177t2l8f1ok1jro7xht5v90dvd6d30i8.apps.googleusercontent.com",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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5tU",
  authorization: {
    params: {
      scope: "openid email profile",
      prompt: "consent",
      access_type: "offline",
      response_type: "code"
    }
  }
}))


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
  providers,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
  },
  debug: true,
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('JWT Callback - User:', user, 'Account:', account)
      
      if (account?.provider === 'google' && user) {
        // For Google login, use Google profile data
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.image = user.image
        token.provider = 'google'
      } else if (user) {
        // For other login methods
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
        // Check if a user with the same Google account already exists
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

        // Check if a user with the same email already exists
        const existingEmailUser = await prisma.user.findUnique({
          where: {
            email: profile?.email
          }
        })

        if (existingEmailUser) {
          console.log('Found existing email user:', existingEmailUser.email)
          // Add Google account association for existing user
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

        // Create new user
        console.log('Creating new Google user:', profile?.email)
        return true
      }
      
      // Allow credentials login
      return true
    },
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after login
      if (url.includes('/api/auth/callback')) {
        return `${baseUrl}/dashboard`
      }
      // Allow callback URL
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allow callback URL from the same domain
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  }
}