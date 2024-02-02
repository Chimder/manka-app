'use server'

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
  const decodedName = decodeURIComponent(params?.manka)
  const manga = await getMangaByName(decodedName)
  return (
    <>
      <AsideBarChapter manga={manga} />
      {children}
    </>
  )
}
