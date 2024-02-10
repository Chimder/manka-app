'use client'

import React from 'react'
import { useFiLter } from '@/shared/Store/filter'
import useStore from '@/shared/Store/useStore'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BadgeList } from '@/components/badge-list'
import { MangaList } from '@/components/c-manga-list'
import { DropDownMenuN } from '@/components/drop-down-menu'

// export const dynamic = 'force-dynamic'
function mangaSearch() {
  const filter = useStore(useFiLter, state => state)

  const handleTag = (tag: string, category: string) => {
    if (category === 'genres') {
      filter?.setGenresTag(tag)
    } else if (category === 'lang') {
      filter?.setLangTag(tag)
    } else if (category === 'status') {
      filter?.setStatus(tag)
    } else if (category === 'sort') {
      filter?.setSort(tag)
    }
  }

  const on = (e: React.MouseEvent<HTMLButtonElement>, category: string) => {
    const button = e.target as HTMLButtonElement
    handleTag(button.innerText, category)
  }


  return (
    <main className="containerM h-full w-full overflow-x-hidden">
      <section className="w-full md:block md:px-10 sm:px-4">
        <h1 className="pb-2 text-2xl">Advaced Manga Search</h1>

        <div className="flex w-full items-center justify-between pb-4 md:block md:pb-0">
          <div className="w-full">
            <Input
              className="focus:border-1 w-full bg-button focus:border-primary"
              value={filter?.inputValue}
              onChange={e => filter?.setInputValue(e.target.value)}
            />
          </div>
          <div className="flex md:flex md:flex-col">
            <DropDownMenuN on={on} />
          </div>
        </div>

        <div className="flex w-full justify-between md:mt-[2px]">
          <div className="md:hidden">
            <BadgeList handleTag={handleTag} />
          </div>
          <div className="md:w-full">
            <Button
              onClick={() => filter?.resetTag()}
              className="rounded-lg bg-red-800/80  px-12 py-4 text-red-400 hover:bg-red-800/40 md:w-full "
            >
              Reset
            </Button>
          </div>
        </div>
      </section>

      <MangaList />
    </main>
  )
}

export default mangaSearch
