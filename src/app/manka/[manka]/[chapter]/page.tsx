'use server'

import React from 'react'

import { getMangaChapter } from '@/app/actions/manga-actions'

const Chapter = async ({ params }: { params: { manka: string; chapter: string } }) => {
  const decodedName = decodeURIComponent(params?.manka)
  const chapter = await getMangaChapter(decodedName, Number(params?.chapter))

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex flex-col ">
          {chapter?.img?.map((chap: string, i: number) => (
            <div key={i}>
              <img src={chap} alt="chap" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Chapter
