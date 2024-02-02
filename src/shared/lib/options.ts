import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import prisma from './prisma'

export const authOptions: AuthOptions = {
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
        await prisma.user.create({ data: user })
      } else {
        console.log('already created')
      }
      return true
    },
  },
}
export default authOptions
