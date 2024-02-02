export interface Manga {
  name: string
  img: string
  imgHeader: string
  describe: string
  genres: string[]
  author?: string
  country: string
  published: number
  averageRating?: number
  ratingCount?: number
  status: string
  popularity?: number
  id: number
  chapters: Chapter[]
}

export interface Chapter {
  chapter: number
  img: string[]
  name: string
  animeName: string
  createdAt: Date
  // anime: Anime;
}

export interface User {
  id: string
  name: string
  email: string
  image: string
  favorite: string[]
  createdAt: Date
}
