'use server'

import prisma from '@/shared/lib/prisma'

export const isUser = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  })
}
export const getUserFavorite = async (email: string) => {
  return prisma.user.findFirst({
    where: { email: email },
    select: { favorite: true },
  })
}
export const checkOrCreateUser = async (id: string, email: string, name: string, image: string) => {
  const user = await isUser(email)
  if (!user) {
    return prisma.user.create({ data: { email: email, id: id, image: image, name: name } })
  } else {
    return console.log('already created')
  }
}

export const toggleUserFavoriteManga = async (email: string, name: string) => {
  const user = await getUserFavorite(email)
  if (!user) {
    throw new Error('User not found')
  }

  const isAnimeInFavorites = await user.favorite.includes(name)

  if (!isAnimeInFavorites) {
    const addpopular = await prisma.anime.update({
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
}

export const deleteUserAccount = async (email: string) => {
  // 'use server'
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
}
