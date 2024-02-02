// 'use server'

import React from 'react'
import { revalidatePath } from 'next/cache'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getServerSession } from 'next-auth'
import { signIn } from 'next-auth/react'

import MangaChapter from '@/components/c-manga-chapter'
import MangaInfo from '@/components/c-manga-info'
import { getMangaByName, getUserFavorite } from '@/app/actions/manga-actions'
import { toggleUserFavoriteManga } from '@/app/actions/user-actions'
import authOptions from '@/shared/lib/options'

const Manga = async ({ params }: { params: { manka: string } }) => {
  const queryClient = new QueryClient()
  const decodedName = decodeURIComponent(params.manka)

  const manga = await getMangaByName(decodedName)
  const session = await getServerSession(authOptions)
  const favorite = await getUserFavorite(session?.user?.email as string, decodedName)

  console.log('Session', session)
  console.log('Favorite', favorite)
  const addFavorite = async (name: string) => {
    'use server'
    if (!session?.user?.email) {
      signIn()
    } else {
      await toggleUserFavoriteManga(session?.user?.email as string, name)
      revalidatePath(`/manka/${params.manka}`)
    }
  }

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
