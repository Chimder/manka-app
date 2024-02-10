import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import {prisma} from './prisma'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],

  callbacks: {
    async signIn({ account, profile }: any) {
      if (!profile?.email) {
        throw new Error('no profile')
      }
      await prisma.user.upsert({
        where: {
          email: profile.email,
        },
        create: {
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        },
        update: {
          name: profile.name,
        },
      })
      return true
    },
  },
}
export default authOptions
