// 'use server'

import React, { cache } from 'react'
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

// import MangaChapter from '@/components/c-manga-chapter'
// import MangaChapter from '@/components/c-manga-chapter'
import MangaInfo from '@/components/c-manga-info'
import { addFavorite, getAllMangaD, getMangaByName } from '@/app/actions/manga-actions'

const MangaChapter = dynamic(() => import('@/components/c-manga-chapter'))

export async function generateStaticParams() {
  const mangas = await getAllMangaD()
  return mangas.map(manga => ({
    manka: manga.name,
  }))
}

export const revalidate = 120

const Manga = cache(async ({ params }: { params: { manka: string } }) => {
  const queryClient = new QueryClient()
  const decodedName = decodeURIComponent(params.manka)
  const manga = await getMangaByName(decodedName)

  if (!manga) redirect('/')
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="overflow-x-hidden ">
        <MangaInfo manga={manga} addFavorite={addFavorite} />
        <MangaChapter manga={manga} />
      </main>
    </HydrationBoundary>
  )
})

export default Manga
