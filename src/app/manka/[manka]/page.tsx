// 'use server'

import React from 'react'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import authOptions from '@/shared/lib/options'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getServerSession } from 'next-auth'
import { signIn } from 'next-auth/react'

import MangaChapter from '@/components/c-manga-chapter'
import MangaInfo from '@/components/c-manga-info'
import {
  getMangaByName,
  getMangaByNameD,
  getUserFavorite,
  getUserFavoriteD,
} from '@/app/actions/manga-actions'
import { toggleUserFavoriteManga } from '@/app/actions/user-actions'

const Manga = async ({ params }: { params: { manka: string } }) => {
  const queryClient = new QueryClient()
  const decodedName = decodeURIComponent(params.manka)

  const session = await getServerSession(authOptions)
  const [manga, favorite] = await Promise.all([
    getMangaByNameD(decodedName),
    getUserFavoriteD(session?.user?.email as string, decodedName),
  ])

  const addFavorite = async (email: string, name: string) => {
    'use server'
    await toggleUserFavoriteManga(email, name)
    revalidatePath(`/manka/${params.manka}`)
  }

  if (!manga) redirect('/')
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="overflow-x-hidden ">
        <MangaInfo manga={manga} addFavorite={addFavorite} favorite={favorite} />
        <MangaChapter manga={manga} />
      </main>
    </HydrationBoundary>
  )
}

export default Manga
