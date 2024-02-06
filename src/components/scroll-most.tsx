'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Anime } from '@/shared/db/schema'
import useEmblaCarousel from 'embla-carousel-react'

interface Props {
  manga: Anime[]
}
export function ScrollMost({ manga }: Props) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true })
  const onScroll = useCallback((emblaApi: any) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    setScrollProgress(progress * 100)
  }, [])
  useEffect(() => {
    if (!emblaApi) return

    onScroll(emblaApi)
    emblaApi.on('reInit', onScroll)
    emblaApi.on('scroll', onScroll)
  }, [emblaApi, onScroll])

  return (
    <div
      className="embla max-h-[340px] w-full rounded-xl pt-10 md:max-h-[300px] md:pt-2"
      ref={emblaRef}
    >
      <div className="embla__container ">
        {manga?.map((card, i: number) => (
          <div key={card.name} className="embla__slide h-full rounded-xl pr-8 md:pr-2">
            <div className="relative">
              <span className="absolute top-0 h-8 w-10 bg-orange-600 pl-4 pt-1">{i + 1}</span>
            </div>
            <Link href={`manka/${card.name}`} className="">
              <img className="max-w-[200px] rounded-xl md:max-w-[100px]" src={card.img} alt="" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
