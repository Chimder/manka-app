import authOptions from '@/shared/lib/options'
import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'

const prisma = new PrismaClient()

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
