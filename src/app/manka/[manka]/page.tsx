// 'use server'

import React from 'react'
import { redirect } from 'next/navigation'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import MangaChapter from '@/components/c-manga-chapter'
import MangaInfo from '@/components/c-manga-info'
import { getMangaByName } from '@/app/actions/manga-actions'
import { toggleUserFavoriteManga } from '@/app/actions/user-actions'

const Manga = async ({ params }: { params: { manka: string } }) => {
  const queryClient = new QueryClient()
  const decodedName = decodeURIComponent(params.manka)
  const manga = await getMangaByName(decodedName)

  const addFavorite = async (email: string, name: string) => {
    'use server'
    await toggleUserFavoriteManga(email, name)
  }

  if (!manga) redirect('/')
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="overflow-x-hidden ">
        <MangaInfo manga={manga} addFavorite={addFavorite} />
        <MangaChapter manga={manga} />
      </main>
    </HydrationBoundary>
  )
}

export default Manga
