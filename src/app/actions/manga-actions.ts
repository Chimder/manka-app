import prisma from '@/shared/lib/prisma'

export const getAllManga = async () => {
  const manga = await prisma.anime.findMany({ include: { chapters: true } })
  console.log(manga)
  return manga
}

export const getMangaByName = async (name: string) => {
  return prisma.anime.findFirst({
    where: { name: { contains: name, mode: 'insensitive' } },
    include: { chapters: true },
  })
}

export const getMangaChapter = async (name: string, chapter: number) => {
  return prisma.chapter.findFirst({
    where: {
      animeName: name,
      chapter: chapter,
    },
  })
}
export const getMangaPopular = () => {
  return prisma.anime.findMany({
    take: 10,
    orderBy: { popularity: { sort: 'desc' } },
  })
}

export const getMangaByGenres = async (
  genres: string[],
  name: string,
  status: string,
  country: string,
  orderField: string,
  orderSort: 'asc' | 'desc',
  cursor: number,
  perPage: number,
) => {
  const skip = cursor ? cursor * perPage : 0

  let orderBy: { [key: string]: 'asc' | 'desc' | undefined } = {}
  if (orderField && orderSort) {
    orderBy[orderField] = orderSort
  }
  const items = await prisma.anime.findMany({
    where: {
      name: { contains: name, mode: 'insensitive' },
       genres: { hasEvery: genres },
      status: { contains: status },
      country: { contains: country },
    },
    orderBy: orderBy,
    skip: skip,
    take: perPage + 1,
  })

  let nextCursor: typeof cursor | undefined = undefined
  if (items.length > perPage) {
    const nextItem = items.pop()
    nextCursor = cursor ? cursor + 1 : 1 // увеличиваем cursor на 1 с каждым новым запросом
  }

  return {
    items,
    nextCursor,
  }
}

export const addMangaRating = async (name: string, rating: number) => {
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
}

export const getUserFavorite = async (email: string, name: string) => {
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

  const favoriteNames = favoriteList.map(anime => anime.name)

  return favoriteNames.includes(name)
}

export const getUserFavoriteManga = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: { email: email },
    select: { favorite: true },
  })

  if (!user?.favorite || user?.favorite.length === 0) {
    return []
  }
  return prisma.anime.findMany({
    where: { name: { in: user?.favorite } },
  })
}

export const addRating = async (rating: number, name: string) => {
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
}
