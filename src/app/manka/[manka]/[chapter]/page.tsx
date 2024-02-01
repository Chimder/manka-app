'use server'

import React from 'react'

import { getMangaByName, getMangaChapter } from '@/app/actions/manga-actions'

const Chapter = async ({ params }: { params: { manka: string; chapter: string } }) => {
  const decodedName = decodeURIComponent(params?.manka)
  const chapter = await getMangaChapter(decodedName, Number(params?.chapter))
  const manga = await getMangaByName(decodedName)

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex flex-col ">
          {chapter?.img?.map((chap, i) => (
            <div key={i}>
              <img src={chap} alt="chap" />
            </div>
          ))}
        </div>
        {/* <AsideBarChapter manga={manga} /> */}
      </div>
    </>
  )
}

export default Chapter
