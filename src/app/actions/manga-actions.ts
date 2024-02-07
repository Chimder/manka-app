'use server'

import prisma from '@/shared/lib/prisma'
import type { AsyncReturnType } from 'type-fest'

export const getAllMangaD = async () => {
  try {
    const manga = await prisma.anime.findMany({ include: { chapters: true } })
    return manga
  } catch (error) {
    console.error('Error in getAllManga:', error)
    throw error
  }
}

export const getMangaByName = async (name: string) => {
  try {
    const manga = await prisma.anime.findFirst({
      where: { name: { contains: name, mode: 'insensitive' } },
      include: { chapters: true },
    })
    return manga
  } catch (error) {
    console.error('Error in getMangaByName:', error)
    throw error
  }
}

export type AnimeWithChapter = AsyncReturnType<typeof getMangaByName>

export const getMangaChapter = async (name: string, chapter: number) => {
  try {
    return prisma.chapter.findFirst({
      where: {
        animeName: name,
        chapter: chapter,
      },
    })
  } catch (error) {
    console.error('Error in getMangaChapter:', error)
    throw error
  }
}

export const getMangaPopular = async () => {
  try {
    return prisma.anime.findMany({
      take: 10,
      orderBy: { popularity: { sort: 'desc' } },
    })
  } catch (error) {
    console.error('Error in getMangaPopular:', error)
    throw error
  }
}

export const getMangaByGenres = async (
  genres?: string[],
  name?: string,
  status?: string,
  country?: string,
  orderField?: string,
  orderSort?: string,
  page?: number,
  perPage?: number,
) => {
  try {
    let orderBy: { [key: string]: string | undefined } = {}

    if (orderField && orderSort) {
      orderBy[orderField] = orderSort
    }
    const skip = page && perPage ? (page - 1) * perPage : 0

    let where: any = {
      name: { contains: name, mode: 'insensitive' },
      status: { contains: status },
      country: { contains: country },
    }
    if (genres && genres.length > 0) {
      where.genres = { hasEvery: genres }
    }
    return prisma.anime.findMany({
      where: where,
      orderBy: orderBy,
      skip: skip,
      take: perPage,
    })
  } catch (error) {
    console.error('Error in getMangaByGenres:', error)
    throw error
  }
}

export const addMangaRating = async (name: string, rating: number) => {
  try {
    const anime = await prisma.anime.findFirst({
      where: {
        name: name,
      },
    })
    if (!anime?.averageRating) {
      await prisma.anime.update({
        where: {
          name: name,
        },
        data: {
          averageRating: rating,
          ratingCount: 1,
        },
      })
    } else {
      const totalRating = anime.averageRating * anime.ratingCount! + rating
      const newRatingCount = anime.ratingCount! + 1
      const newAverageRating = totalRating / newRatingCount

      await prisma.anime.update({
        where: {
          name: name,
        },
        data: {
          averageRating: newAverageRating,
          ratingCount: newRatingCount,
        },
      })
    }
  } catch (error) {
    console.error('Error in addMangaRating:', error)
    throw error
  }
}

export const getUserFavorite = async (email: string, name: string) => {
  try {
    if (!email) {
      return null
    }
    const user = await prisma.user.findFirst({
      where: { email: email },
      select: { favorite: true },
    })
    if (!user?.favorite || user?.favorite.length === 0) {
      return null
    }
    const favoriteList = await prisma.anime.findMany({
      where: { name: { in: user?.favorite } },
      select: { name: true },
    })

    const favoriteNames = favoriteList.map((anime: { name: string }) => anime.name)

    return favoriteNames.includes(name)
  } catch (error) {
    console.error('Error in getUserFavorite:', error)
    throw error
  }
}

export const getUserFavoriteManga = async (email: string) => {
  try {
    if (!email) {
      return []
    }
    const user = await prisma.user.findFirst({
      where: { email: email },
      select: { favorite: true },
    })

    if (!user?.favorite || user?.favorite.length === 0) {
      return []
    }
    return prisma.anime.findMany({
      where: { name: { in: user?.favorite } },
      include: { chapters: true },
    })
  } catch (error) {
    console.error('Error in getUserFavoriteManga:', error)
    throw error
  }
}

export const addRating = async (rating: number, name: string) => {
  try {
    const anime = await prisma.anime.findFirst({
      where: {
        name: name,
      },
    })
    if (!anime?.averageRating) {
      await prisma.anime.update({
        where: {
          name: name,
        },
        data: {
          averageRating: rating,
          ratingCount: 1,
        },
      })
    } else {
      const totalRating = anime.averageRating * anime.ratingCount! + rating
      const newRatingCount = anime.ratingCount! + 1
      const newAverageRating = totalRating / newRatingCount

      await prisma.anime.update({
        where: {
          name: name,
        },
        data: {
          averageRating: newAverageRating,
          ratingCount: newRatingCount,
        },
      })
    }
  } catch (error) {
    console.error('Error in addRating:', error)
    throw error
  }
}
