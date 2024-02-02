'use client'

import React, { useTransition } from 'react'
import useWindowSize from '@/shared/lib/isMobile'
import { cn } from '@/shared/lib/utils'
import { ReloadIcon } from '@radix-ui/react-icons'

import { Manga } from '@/types/manga'

import PublicationStatus from './publication-status'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

type Props = {
  manga: Manga
  addFavorite: (name: string) => Promise<void>
  favorite: boolean
}

const MangaInfo = ({ manga, addFavorite, favorite }: Props) => {
  const isMobile = useWindowSize()
  const [isPending, startTransition] = useTransition()

  return (
    <>
      <section className="max-h-[480px] lg:-z-10">
        {/* <div className="w-full lg:fixed  lg:top-0 lg:-z-40 lg:h-[48vh] md:w-[100vw] "> */}
        <div className="absolute left-0 top-[-80px] z-[-2] h-[640px] w-full">
          <img
            className="z-0 h-full w-full "
            src={isMobile ? manga?.img : manga?.imgHeader}
            alt=""
          />
          <div className="absolute inset-x-0 bottom-0 h-full bg-black/30 lg:z-40 lg:backdrop-blur-[1px] md:bg-gradient-light dark:md:bg-gradient-dark"></div>
        </div>
      </section>
      <section className="z-100 flex h-full w-full pt-[36vh] lg:pt-[30vh] md:pt-40 ">
        <div className="containerM flex w-full bg-background md:bg-transparent md:p-4">
          <div className="z-90 -mt-28 w-1/5 lg:mt-0 lg:backdrop-blur-md md:backdrop-blur-none">
            <img
              className="md: z-999 w-full self-end rounded-lg lg:rounded-none"
              src={manga?.img}
              alt=""
            />
          </div>
          <div className="z-100 w-4/5 lg:backdrop-blur-md md:backdrop-blur-none">
            <div className="flex items-center justify-between pt-2 ">
              <h1 className="relative flex px-5 py-0 text-3xl  drop-shadow-2xl lg:text-2xl md:px-2 md:text-lg md:text-white">
                {manga?.name}
              </h1>
              {/* <RatingStars {...manga}></RatingStars> */}
            </div>
            <div className="relative my-2.5 ml-5 flex w-full flex-wrap items-center lg:ml-2 md:ml-1">
              <Button
                onClick={() =>
                  startTransition(() => {
                    addFavorite(manga?.name)
                  })
                }
                className={cn(
                  favorite
                    ? 'bg-primary hover:bg-primary-foreground'
                    : 'bg-teal-600 hover:bg-teal-600/60',
                  'z-10 text-white md:py-0 sm:mr-3 sm:w-full',
                )}
              >
                {favorite ? 'Favorite' : 'Add To Favorite'}
                {isPending && <ReloadIcon className="ml-1 h-4 w-4 animate-spin" />}
              </Button>
              {manga?.genres.map((genres, i) => (
                <Badge
                  className="lg:-py-0 z-10 ml-3 cursor-default bg-badge text-white hover:bg-badge/70 lg:rounded-md lg:px-1 md:mt-2 sm:mt-1"
                  key={i}
                >
                  {genres}
                </Badge>
              ))}
              <PublicationStatus year={manga?.published} status={manga?.status} />
              {/* <DotPublication year={manga?.published} status={manga?.status} /> */}
            </div>
            <div className="mx-5 text-lg xl:text-[16px] lg:text-sm md:hidden">
              {manga?.describe}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MangaInfo
