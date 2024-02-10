// 'use server'

import React, { cache } from 'react'
import { redirect } from 'next/navigation'

// const MangaChapter = dynamic(() => import('@/components/c-manga-chapter'))
import MangaChapter from '@/components/c-manga-chapter'
import MangaInfo from '@/components/c-manga-info'
import { getAllMangaD, getMangaByName } from '@/app/actions/manga-actions'

export async function generateStaticParams() {
  const mangas = await getAllMangaD()
  return mangas.map(manga => ({
    manka: manga.name,
  }))
}
export const dynamic = 'force-static'
export const revalidate = 120

const Manga = cache(async ({ params }: { params: { manka: string } }) => {
  console.log('PARA', params)
  const manga = await getMangaByName(params.manka)

  if (!manga) redirect('/')
  return (
    <main className="overflow-x-hidden ">
      <MangaInfo manga={manga} />
      <MangaChapter manga={manga} />
    </main>
  )
})

export default Manga
