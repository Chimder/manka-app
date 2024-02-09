'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/shared/lib/prisma'
import { z } from 'zod'

export const isUser = async (email: string) => {
  try {
    if (!email) {
      throw new Error('Email not found')
    }
    return prisma.user.findUnique({
      where: {
        email: email,
      },
    })
  } catch (error) {
    console.error('Error in isUser:', error)
    throw error
  }
}

export const getUserFavorite = async (email: string) => {
  try {
    if (!email) {
      throw new Error('Email not found')
    }
    console.log('EMAIL', email)
    const user = await prisma.user.findFirst({
      where: { email: email },
      select: { favorite: true },
    })
    console.log('FINDUSER', user)
    return user
  } catch (error) {
    console.error('Error in getUserFavorite:', error)
    throw error
  }
}

export const checkOrCreateUser = async (id: string, email: string, name: string, image: string) => {
  try {
    const user = await isUser(email)
    if (!user) {
      return prisma.user.create({ data: { email: email, id: id, image: image, name: name } })
    } else {
      return console.log('already created')
    }
  } catch (error) {
    console.error('Error in checkOrCreateUser:', error)
    throw error
  }
}

export const toggleUserFavoriteMangaTest = async (formData: FormData) => {
  console.log('Formadata', formData)
  const schema = z.object({
    email: z.string().email(),
    name: z.string(),
  })
  const data = schema.parse({
    email: formData.get('email'),
    name: formData.get('name'),
  })
  const { email, name } = data

  try {
    if (!email) {
      throw new Error('Email not found')
    }
    const user = await getUserFavorite(email)
    console.log('USERNOTFOUND', user)
    if (!user?.favorite) {
      throw new Error('User not found')
    }

    const isAnimeInFavorites = user.favorite.includes(name)

    if (!isAnimeInFavorites) {
      await prisma.anime.update({
        where: { name: name },
        data: {
          popularity: +1 as number,
        },
      })
      await prisma.user.update({
        where: { email: email },
        data: {
          favorite: {
            push: name,
          },
        },
      })
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          favorite: {
            set: user.favorite.filter((anime: string) => anime !== name),
          },
        },
      })
    }
    revalidatePath('/manka')
  } catch (error) {
    console.error('Error in toggleUserFavoriteManga:', error)
    throw error
  }
}
export const toggleUserFavoriteManga = async (email: string, name: string) => {
  try {
    if (!email) {
      throw new Error('Email not found')
    }
    const user = await getUserFavorite(email)
    console.log('USERNOTFOUND', user)
    if (!user?.favorite) {
      throw new Error('User not found')
    }

    const isAnimeInFavorites = user.favorite.includes(name)

    if (!isAnimeInFavorites) {
      await prisma.anime.update({
        where: { name: name },
        data: {
          popularity: +1 as number,
        },
      })
      return prisma.user.update({
        where: { email: email },
        data: {
          favorite: {
            push: name,
          },
        },
      })
    } else {
      return prisma.user.update({
        where: { email: email },
        data: {
          favorite: {
            set: user.favorite.filter((anime: string) => anime !== name),
          },
        },
      })
    }
  } catch (error) {
    console.error('Error in toggleUserFavoriteManga:', error)
    throw error
  }
}

export const deleteUserAccount = async (email: string) => {
  try {
    console.log('USeRDELETE', email)
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    console.log('USER', user)
    if (!user) {
      return console.log('User not found')
    }
    return prisma.user.delete({
      where: {
        email: email,
      },
    })
  } catch (error) {
    console.error('Error in deleteUserAccount:', error)
    throw error
  }
}
