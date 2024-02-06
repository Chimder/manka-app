'use server'

import React from 'react'

import { Scroll } from '@/components/scroll'
import { ScrollMost } from '@/components/scroll-most'

import { getMangaPopular, getMangaPopularD } from './actions/manga-actions'

export default async function Home() {
  // const manga = await getAllManga()

  const manga = await getMangaPopularD()

  return (
    <main className=" h-full w-full border-[1px] border-pink-600">
      <section className="items-center justify-center ">
        <Scroll></Scroll>
      </section>
      <section className="">
        <h1 className="text-4xl md:text-2xl">The most popular now</h1>
        <ScrollMost manga={manga}></ScrollMost>
      </section>
    </main>
  )
}
