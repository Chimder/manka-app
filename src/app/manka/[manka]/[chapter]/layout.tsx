'use server'

import { redirect } from 'next/navigation'

import AsideBarChapter from '@/components/aside-bar-chapter'
import { getMangaByName } from '@/app/actions/manga-actions'

export default async function ChapterLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: {
    manka: string
    chapter: string
  }
}>) {
  const manga = await getMangaByName(params?.manka)
  if (!manga) redirect('/')
  return (
    <>
      <AsideBarChapter manga={manga} />
      {children}
    </>
  )
}
