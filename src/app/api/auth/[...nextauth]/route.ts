import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const prisma = new PrismaClient()

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],

  callbacks: {
    async signIn({ user }: any) {
      const isUser = await prisma.user.findUnique({
        where: {
          email: user?.email,
        },
      })

      if (!isUser) {
        console.log('No User REggggg')
        await prisma.user.create({ data: user })
      } else {
        console.log('already created')
      }
      return true
    },
    async signOut() {
      console.log('Callback singOUT')
    },
  },
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
