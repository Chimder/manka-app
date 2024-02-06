'use server'

import React from 'react'
import Link from 'next/link'
import { formatCreatedAt } from '@/shared/lib/data-format'

import AnimeRecomend from './anime.recomend'

type Props = {
  manga: any
}

const MangaChapter = ({ manga }: Props) => {
  console.log('CHAPERS', manga?.Chapter)
  return (
    <section className="containerM z-100 mx-auto h-full w-full bg-background pt-2.5 md:bg-transparent">
      <div className="flex md:flex-col ">
        <aside className="w-1/5 flex-col md:flex md:w-full md:items-center md:pt-4">
          <AnimeRecomend name={manga.name} />
        </aside>
        <div className="w-4/5 px-5 md:w-full md:px-0">
          <span className="lg:text-md text-xl font-semibold md:px-4">Chapters</span>
          <div className="pt-3 md:px-4 md:pb-14">
            {manga?.Chapter?.map((chap: any) => (
              <Link
                className="my-2 flex items-center justify-between rounded-sm bg-accent p-4 md:my-1 md:py-3"
                key={chap.name}
                href={`/manka/${manga?.name}/${chap.chapter}`}
              >
                <div className="lg:text-sm">
                  Ch. {chap.chapter} - {chap.name}
                </div>
                <div className="lg:text-sm">{formatCreatedAt(chap.createdAt.toDateString())}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MangaChapter
